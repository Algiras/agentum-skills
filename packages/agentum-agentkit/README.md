# Agentum AgentKit Action Provider (`agentum-agentkit`)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

A [Coinbase AgentKit](https://github.com/coinbase/agentkit) action provider that gives your agent
[Agentum](https://agentum.asimplek.cloud)'s compliance tools: deterministic corporate entity
resolution across global registries (UK Companies House, Swiss ZEFIX, Singapore ACRA, US SEC EDGAR,
EU national registers, worldwide GLEIF LEI), live EU VIES VAT validation, OFAC / EU / UN sanctions
screening, one-shot KYB vendor checks, IBAN payee verification and batch resolution.

Every call is paid **per request, in USDC on Base, from the agent's own AgentKit wallet** using the
[x402](https://x402.org) protocol. There is nothing to sign up for and no API key: the first calls
each day are free, and after that the provider answers the server's HTTP 402 challenge
automatically with an EIP-3009 authorization signed by the wallet. Prices are a fraction of a cent.

---

## Installation

```bash
npm install agentum-agentkit @coinbase/agentkit zod
```

`@coinbase/agentkit` (>= 0.10) and `zod` (3.x) are peer dependencies; `@x402/fetch`, `@x402/evm`
and `@x402/core` are bundled as regular dependencies.

If you compile your own TypeScript that *extends* this provider, add
`"experimentalDecorators": true` and `"emitDecoratorMetadata": true` to your `tsconfig.json`
(the published `dist/` is already compiled, so plain consumers need nothing extra).

---

## Quickstart (10 lines)

```typescript
import { AgentKit, CdpEvmWalletProvider } from "@coinbase/agentkit";
import { agentumActionProvider } from "agentum-agentkit";

const walletProvider = await CdpEvmWalletProvider.configureWithWallet({
  apiKeyId: process.env.CDP_API_KEY_ID!,
  apiKeySecret: process.env.CDP_API_KEY_SECRET!,
  walletSecret: process.env.CDP_WALLET_SECRET!,
  networkId: "base-mainnet",                    // the wallet needs a little USDC on Base
});
const agentKit = await AgentKit.from({ walletProvider, actionProviders: [agentumActionProvider()] });
const actions = agentKit.getActions();         // hand these to LangChain, Vercel AI SDK, MCP, ...
```

Then use one of the AgentKit framework extensions as usual, for example
`getLangChainTools(agentKit)` from `@coinbase/agentkit-langchain` or
`getVercelAITools(agentKit)` from `@coinbase/agentkit-vercel-ai-sdk`.

### With a viem wallet instead of CDP

```typescript
import { AgentKit, ViemWalletProvider } from "@coinbase/agentkit";
import { createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { base } from "viem/chains";
import { agentumActionProvider } from "agentum-agentkit";

const account = privateKeyToAccount(process.env.BASE_PRIVATE_KEY as `0x${string}`);
const walletProvider = new ViemWalletProvider(createWalletClient({ account, chain: base, transport: http() }));
const agentKit = await AgentKit.from({ walletProvider, actionProviders: [agentumActionProvider()] });
```

Any `EvmWalletProvider` works (`CdpEvmWalletProvider`, `CdpSmartWalletProvider`,
`ViemWalletProvider`, `PrivyEvmWalletProvider`, ...): the provider only calls
`walletProvider.toSigner()` and asks it to sign an EIP-712 typed message. It never sees a private
key and never sends an on-chain transaction itself; settlement is done by the x402 facilitator.

---

## Actions

AgentKit prefixes action names with the provider class, so the agent sees
`AgentumActionProvider_<name>`.

| Action | Endpoint | Price per call | What it does |
| :--- | :--- | :--- | :--- |
| `resolve_entity` | `POST /v1/entity/resolve` | $0.005 | Resolve a company by name, registration number, LEI, EU VAT or domain across global registries; optional sanctions, VAT, officers, beneficial owners, parent LEI and company events. |
| `verify_eu_vat` | `POST /v1/entity/vat-verify` | $0.005 | Live European Commission VIES validation of an EU VAT number. |
| `screen_sanctions` | `POST /v1/entity/sanctions-screen` | $0.005 | Screen a company or person against OFAC SDN, EU Financial Sanctions and UN Consolidated lists. |
| `check_vendor` | `POST /v1/compliance/check-vendor` | $0.010 | One-shot KYB: registry resolution + VIES + sanctions with an APPROVED / FLAGGED_FOR_REVIEW / REJECTED verdict and audit trail. |
| `verify_bank_payee` | `POST /v1/compliance/verify-bank-payee` | $0.003 | IBAN structure and MOD-97 check, country match against the expected payee jurisdiction, optional ownership check against public registers. |
| `batch_resolve` | `POST /v1/entity/batch-resolve` | $0.025 | Resolve up to 25 entities in one call. Above the default `maxPriceUsd` (0.02); raise it to enable. |

| `screen_address` | `POST /v1/compliance/screen-address` | $0.002 | Use when about to send funds: exact-match screening of a crypto address (EVM, Bitcoin, Tron, Solana, ...) against the OFAC SDN digital-currency-address entries. Returns `EXACT_MATCH`, `CLEAR` or `UNKNOWN` (never CLEAR from an empty index). |

Input schemas mirror the REST request bodies exactly; see
<https://agentum.asimplek.cloud/openapi.json>. Live prices: <https://agentum.asimplek.cloud/pricing>.

Each action returns the server's JSON result as a string. When the call was paid, the JSON also
carries an `x402Receipt` object (`transaction`, `network`, `payer`) decoded from the server's
`PAYMENT-RESPONSE` header, so the agent can log what it spent.

---

## Pricing, free tier and payment

- **Free tier:** the server allows a small number of free calls per day per agent (currently 5,
  see `/pricing`), metered by the `X-Agent-Id` header the provider sends. Free calls need no
  wallet balance and produce no receipt.
- **Paid calls:** when the quota is used up, the server answers `402 Payment Required` with an
  x402 v2 `PAYMENT-REQUIRED` header (exact scheme, USDC on Base `eip155:8453`). The provider signs
  the authorization with the AgentKit wallet, retries once with `PAYMENT-SIGNATURE`, and the
  facilitator settles the USDC transfer. Payment is **per call** and only for the exact amount the
  server quoted, which is also echoed as `extra.priceUsd`.
- **Spend cap:** `maxPriceUsd` (default **0.02**) is checked before anything is signed. If the
  server asks for more, the action throws `AgentumPaymentRefusedError` with the quoted and allowed
  amounts, and no retry or signature happens. The x402 client's own default spend control
  (`$1` per payment on recognised assets) stays active underneath.
- **What the wallet needs:** USDC on Base mainnet. No ETH for gas is required for the exact scheme
  because the facilitator broadcasts the `transferWithAuthorization` transaction.

---

## Guard every payment against OFAC-listed addresses

The `screen_address` action lets the agent ask "is it safe to pay this address?". To make that
automatic for every x402 payment the agent signs, install the guard from
[`agentum-x402-guard`](../agentum-x402-guard) as the provider's `guard` option. It screens each
payment's `payTo` before anything is signed and aborts on an exact OFAC SDN match:

```typescript
import { agentumActionProvider } from "agentum-agentkit";
import { createAgentumGuard } from "agentum-x402-guard";

const agentKit = await AgentKit.from({
  walletProvider,
  actionProviders: [
    agentumActionProvider({
      guard: createAgentumGuard({
        // Agentum's own payTo is not screened (avoids a screening loop on the paid retry).
        skipAddresses: ["<agentum payTo from the 402 challenge>"],
        onWarning: (w) => console.warn("[agentum-guard]", w.message),
      }),
    }),
  ],
});
```

The guard runs after the `maxPriceUsd` check and before signing. On a match the call fails with
`Payment creation aborted: Agentum guard blocked payment to 0x...: address is an exact match for
"<entity>" on OFAC_SDN ...` and no signature is created. The same hook can be installed on any
other x402 client with `client.onBeforePaymentCreation(createAgentumGuard())`. See the guard's
README for `onUnknown`, `failMode`, caching and `fetchImpl` (to pay for screening with your own
x402 fetch).

---

## Configuration

```typescript
agentumActionProvider({
  baseUrl: "https://agentum.asimplek.cloud", // default
  maxPriceUsd: 0.02,                         // refuse to pay more than this per call
  timeoutMs: 30_000,                         // per request, including the paid retry
  network: "base-mainnet",                   // or "base-sepolia" against a test server
  agentId: "my-procurement-agent",           // X-Agent-Id used to meter the free tier
  fetchImpl: fetch,                          // custom fetch for proxies or tests
});
```

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `baseUrl` | `string` | `"https://agentum.asimplek.cloud"` | Agentum server base URL. |
| `maxPriceUsd` | `number` | `0.02` | Highest USD price the agent may pay for one call. |
| `timeoutMs` | `number` | `30000` | Request timeout (applies to the paid retry as well). |
| `network` | `"base-mainnet" \| "base-sepolia"` | `"base-mainnet"` | Network the server settles on; also drives `supportsNetwork`. |
| `agentId` | `string` | random | Identifier sent as `X-Agent-Id`. |
| `fetchImpl` | `typeof fetch` | `globalThis.fetch` | Custom fetch implementation. |
| `guard` | `(ctx) => Promise<void \| { abort: true; reason: string }>` | none | Pre-payment hook, e.g. `createAgentumGuard()` from `agentum-x402-guard`. |

`supportsNetwork` returns `true` only for the configured Base network (`networkId` `base-mainnet`
or `chainId` `8453` by default), so AgentKit will not offer the actions to a wallet on another chain.

---

## Development

```bash
cd packages/agentum-agentkit
npm install
bun run build   # tsc → dist/
bun test        # unit tests, no network or chain access needed
```

Research notes on the AgentKit and x402 APIs this package targets live in
[`docs/findings.md`](./docs/findings.md).

---

## License

MIT © [Algimantas Krasauskas](https://github.com/Algiras) / [Agentum](https://agentum.asimplek.cloud)
