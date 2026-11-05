# Research findings: Coinbase AgentKit action providers and x402 client (Nov 2026)

Recorded on 2026-11-05 while building `agentum-agentkit`. Versions below are the ones the
package was built and tested against. The type definitions were read from the installed packages
because the CDP docs pages for AgentKit core concepts
(`docs.cdp.coinbase.com/agent-kit/core-concepts/*`) now return "Page Not Found"; the AgentKit
README on GitHub is the current reference.

## Versions targeted

| Package | Version on npm `latest` | Role in this package |
| :--- | :--- | :--- |
| `@coinbase/agentkit` | 0.10.4 (pins `viem` 2.38.3, `zod` ^3.23.8, `reflect-metadata` ^0.2.2) | peer dependency; supplies `ActionProvider`, `CreateAction`, `EvmWalletProvider`, `Network` |
| `@x402/fetch` | 2.30.0 | `wrapFetchWithPayment`, `x402Client`, `decodePaymentResponseHeader` |
| `@x402/evm` | 2.30.0 | `ExactEvmScheme` (exact scheme, EIP-3009 / Permit2), `ClientEvmSigner` type |
| `@x402/core` | 2.30.0 | `PaymentRequirements` type, hooks and policies (re-exported through `@x402/fetch`) |
| `zod` | 3.25.76 | schemas (AgentKit's `Action.schema` is typed as zod 3 `z.ZodSchema`) |

Sources: <https://registry.npmjs.org/@coinbase/agentkit/latest>,
<https://registry.npmjs.org/@x402/fetch/latest>, <https://registry.npmjs.org/@x402/evm/latest>.
The unscoped `x402-fetch` / `x402` packages are the v1 generation; the sibling
`packages/agentum-langchain` already uses the scoped `@x402/*` v2 packages (2.28.x), so this
package follows the same family at 2.30.x.

## AgentKit TypeScript: custom action providers

Source of truth: the package README at
<https://github.com/coinbase/agentkit/blob/main/typescript/agentkit/README.md>
("Creating an Action Provider", "Adding Actions to your Action Provider") and the contributing guide
<https://github.com/coinbase/agentkit/blob/main/CONTRIBUTING-TYPESCRIPT.md>, cross-checked against
`node_modules/@coinbase/agentkit/dist/action-providers/*.d.ts|js`.

- A provider is a class extending `ActionProvider<TWalletProvider extends WalletProvider>` and
  calling `super(name, [])`. It must implement `supportsNetwork(network: Network): boolean`, where
  `Network = { protocolFamily: string; networkId?: string; chainId?: string }`. AgentKit's own
  `base-mainnet` / `base-sepolia` network ids map to chain ids `8453` / `84532`
  (`dist/network/network.js`).
- Actions are instance methods decorated with `@CreateAction({ name, description, schema })`.
  The method signature is either `(args)` or `(walletProvider, args)`; the decorator reads
  `design:paramtypes` metadata and treats the method as wallet-aware when a parameter type is
  `WalletProvider` or a subclass (`EvmWalletProvider` qualifies). This requires
  `experimentalDecorators` and `emitDecoratorMetadata` in `tsconfig.json` and `reflect-metadata`
  loaded at runtime. Bun 1.4.x honours both flags, so `bun test` runs against `src/` directly.
- `ActionProvider.getActions(walletProvider)` returns `Action[]` of
  `{ name, description, schema, invoke }`. The decorator prefixes the action name with the class
  name, so this package's actions are `AgentumActionProvider_resolve_entity` etc. Every invocation
  also fires a best-effort AgentKit analytics event (`sendAnalyticsEvent` to
  `https://cca-lite.coinbase.com`, wrapped in try/catch) carrying the wallet provider name,
  address and network; this is AgentKit behaviour, not something this package adds.
- `customActionProvider([...])` is the decorator-free alternative (class name `custom`, so actions
  would be `CustomActionProvider_<name>` and `supportsNetwork` always returns true). Not used
  because the brief asks for a named provider with a network check.
- Wiring: `AgentKit.from({ walletProvider, actionProviders: [agentumActionProvider()] })`; the
  framework extensions (`@coinbase/agentkit-langchain`, `@coinbase/agentkit-vercel-ai-sdk`,
  `@coinbase/agentkit-model-context-protocol`, OpenAI Agents SDK) consume `agentKit.getActions()`.
- Contribution path for an upstream listing: add
  `typescript/agentkit/src/action-providers/<name>/` with `<name>ActionProvider.ts`, `schemas.ts`,
  `<name>ActionProvider.test.ts`, `index.ts`, `README.md`; export it from
  `src/action-providers/index.ts`; run `pnpm run changeset` (patch, past-tense summary) and commit
  the `.changeset/` file; sign commits; open a PR against `coinbase/agentkit` `main`.

## Wallet provider to x402 signer

`EvmWalletProvider` (`dist/wallet-providers/evmWalletProvider.d.ts`) declares abstract `sign`,
`signMessage`, `signTypedData(typedData)`, `signTransaction`, `sendTransaction`,
`waitForTransactionReceipt`, `readContract`, `getPublicClient`, plus the base `getAddress`,
`getNetwork`, `getName`, `getBalance`, `nativeTransfer`. It also has a concrete
`toSigner(): LocalAccount` built with viem's `toAccount(...)` that forwards `signTypedData` to the
wallet provider. A viem `LocalAccount` satisfies x402's `ClientEvmSigner`
(`{ address; signTypedData(message) }`; optional `readContract` / `signTransaction` only matter for
EIP-2612 / ERC-20 approval sponsoring), so the package does:

```ts
const signer = walletProvider.toSigner();                       // any EvmWalletProvider
const client = new x402Client().register("eip155:8453", new ExactEvmScheme(signer));
const payingFetch = wrapFetchWithPayment(fetch, client);
```

This works for `CdpEvmWalletProvider`, `CdpSmartWalletProvider`, `ViemWalletProvider`,
`PrivyEvmWalletProvider` and any other EVM provider without the package ever seeing a private key.

## x402 v2 client behaviour (`@x402/fetch` 2.30.0)

Read from `node_modules/@x402/fetch/dist/cjs/index.js` and `@x402/core/dist/cjs/*.d.ts`.

- `wrapFetchWithPayment(fetch, client)` sends the request; on `402` it reads the
  `PAYMENT-REQUIRED` header (base64 JSON `PaymentRequired { x402Version, resource, accepts[], extensions? }`,
  JSON body as fallback), applies policies and the selector to pick one `PaymentRequirements`
  (`{ scheme, network, asset, amount, payTo, maxTimeoutSeconds, extra }`), calls
  `client.createPaymentPayload`, base64-encodes the payload into `PAYMENT-SIGNATURE`, retries once,
  then decodes `PAYMENT-RESPONSE` via `processPaymentResult`. It throws
  `"Payment already attempted"` if the original request already carried a payment header.
- `x402Client` hooks: `onBeforePaymentCreation(ctx => { abort: true, reason })`,
  `onAfterPaymentCreation`, `onPaymentCreationFailure`, `onPaymentResponse`;
  `registerPolicy((version, reqs) => reqs)` filters accepts;
  `setSpendControls({ maxAmountPerPayment })` caps recognised default assets (default `$1`).
  The `maxPriceUsd` option in this package is enforced in `onBeforePaymentCreation` using
  `extra.priceUsd` when the server declares it, falling back to the atomic USDC amount
  (6 decimals). The abort reason carries a marker that `AgentumClient` turns into
  `AgentumPaymentRefusedError`, so the agent sees a clear message and no signature is produced.
- `ExactEvmScheme(signer)` needs no RPC for the base EIP-3009 flow: it builds a
  `TransferWithAuthorization` typed-data message with domain
  `{ name, version, chainId, verifyingContract }` taken from `accepts[i].extra.name/version` and
  `asset`, signs it with `signer.signTypedData`, and returns
  `payload = { signature, authorization: { from, to, value, validAfter, validBefore, nonce } }`.
  This is why the tests run the real x402 client against a fake wallet whose `signTypedData`
  returns a fixed signature.
- `decodePaymentResponseHeader(value)` (from `@x402/core/http`, re-exported by `@x402/fetch`)
  decodes the base64 settlement receipt `{ success, transaction, network, payer, ... }` that the
  Agentum server returns in `PAYMENT-RESPONSE`.

## Agentum server contract (checked live on 2026-11-05)

`GET https://agentum.asimplek.cloud/pricing`:

| Tool | Path | Price (USD) |
| :--- | :--- | :--- |
| resolve_entity | POST /v1/entity/resolve | 0.005 |
| verify_eu_vat | POST /v1/entity/vat-verify | 0.005 |
| screen_sanctions | POST /v1/entity/sanctions-screen | 0.005 |
| check_vendor | POST /v1/compliance/check-vendor | 0.010 |
| verify_bank_payee | POST /v1/compliance/verify-bank-payee | 0.003 |
| batch_resolve | POST /v1/entity/batch-resolve | 0.025 |

`freeCallsPerDay: 5`, rails `x402` and `mpp`. The server challenge
(`src/adapters/outbound/payments/x402.adapter.ts`) is
`accepts[0] = { scheme: "exact", network: X402_NETWORK, amount, asset: USDC, payTo,
maxTimeoutSeconds: 300, extra: { name: "USD Coin", version: "2", priceUsd } }` with USDC
`0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913` on `eip155:8453` and
`0x036CbD53842c5426634e7929541eC2318f3dCF7e` on `eip155:84532`.
