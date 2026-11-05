# agentum-x402-guard

Pre-payment OFAC address guard for [x402](https://x402.org) clients. Before your agent signs a
payment, the guard screens the payment's `payTo` address through
[Agentum](https://agentum.asimplek.cloud)'s `screen_address` tool and **aborts payment creation**
on an exact match against the official OFAC SDN digital-currency-address entries.

- Plugs into `x402Client.onBeforePaymentCreation(...)` (`@x402/core` >= 2.30).
- Only ever sees public addresses. No keys, signatures or balances.
- No runtime dependencies. Verdicts are cached in memory per address (24 h default).
- Honest scope: exact match on the official OFAC list. Not behavioural or cluster risk.

## Install

```bash
npm install agentum-x402-guard
```

## Usage

```typescript
import { x402Client, wrapFetchWithPayment } from "@x402/fetch";
import { ExactEvmScheme } from "@x402/evm";
import { createAgentumGuard } from "agentum-x402-guard";

const client = new x402Client();
client.register("eip155:8453", new ExactEvmScheme(signer));
client.onBeforePaymentCreation(
  createAgentumGuard({
    onWarning: (w) => console.warn("[agentum-guard]", w.kind, w.message),
  })
);
const payingFetch = wrapFetchWithPayment(fetch, client);
```

When the payee is sanctioned, `payingFetch` rejects with an error like:

```
Payment creation aborted: Agentum guard blocked payment to 0x8576...: address is an exact match for
"EXAMPLE MIXER LLC" on OFAC_SDN (OFAC-12345; programs CYBER2). No payment was signed.
```

The hook returns `{ abort: true, reason }` on a match and `undefined` otherwise, which is exactly
the `BeforePaymentCreationHook` contract of `@x402/core`.

### With Coinbase AgentKit

`agentum-agentkit` accepts the hook directly: `agentumActionProvider({ guard: createAgentumGuard() })`.
It also exposes a `screen_address` action so the agent can check an address on demand.

### Paying for screening

Screening costs $0.002 per call after Agentum's daily free tier. Pass your own paying fetch to
settle it from the same wallet, and skip Agentum's own `payTo` so the screening payment does not
screen itself:

```typescript
const payingFetch = wrapFetchWithPayment(fetch, screeningClient); // a client WITHOUT the guard
client.onBeforePaymentCreation(
  createAgentumGuard({ fetchImpl: payingFetch, skipAddresses: ["<Agentum payTo>"] })
);
```

## Options

| Option | Default | Description |
| :--- | :--- | :--- |
| `baseUrl` | `https://agentum.asimplek.cloud` | Agentum server. Calls `POST {baseUrl}/v1/compliance/screen-address`. |
| `fetchImpl` | global `fetch` | Fetch used for screening (e.g. your x402 paying fetch). |
| `cacheTtlMs` | `86400000` (24 h) | In-memory verdict cache per normalized address (EVM lowercased, others as-is). `0` disables. `UNKNOWN` verdicts and errors are never cached. |
| `onUnknown` | `"allow"` | `"allow"` or `"block"` when the address index is empty/unsynced (`riskLevel: "UNKNOWN"`) or the address cannot be parsed (HTTP 400). `onWarning` is always called. |
| `failMode` | `"open"` | `"open"` allows payment on network errors, timeouts, non-2xx responses and malformed bodies (plus `onWarning`); `"closed"` aborts. |
| `skipAddresses` | `[]` | Addresses never screened, e.g. Agentum's own payTo. |
| `userAgent` | `agentum-x402-guard/<version>` | Sent as `User-Agent` so guard traffic is distinguishable. |
| `timeoutMs` | `10000` | Per-request timeout. |
| `onWarning` | none | `(warning: { kind: "unknown" \| "unscreenable" \| "error"; address; network; message; allowed }) => void` for every degraded path. |

The `network` of the payment requirements maps to the optional `chain` hint: `eip155:*` sends
`"evm"`, `solana:*` sends `"solana"`, anything else sends no hint and the server auto-detects.

## Verdicts

| `riskLevel` | Guard behaviour |
| :--- | :--- |
| `EXACT_MATCH` | Abort with a reason naming the matched entity, list and programs. |
| `CLEAR` | Allow. |
| `UNKNOWN` | `onUnknown` decides; `onWarning` is called. UNKNOWN is never treated as CLEAR. |

## Development

```bash
npm install --registry=https://registry.npmjs.org
bun run build && bun test
```

The tests run against a mock server implementing the `screen_address` contract. The end-to-end
test imports the x402 client wiring from `../agentum-agentkit`, so install that package's
dependencies first.

## License

MIT
