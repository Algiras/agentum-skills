# Agentum — Global Corporate Entity, VAT & Sanctions Resolver (Mistral AI Integration)

Connect **Agentum** to Mistral AI agents, **Le Chat**, and applications built on the Mistral AI API.

## 1. Mistral Le Chat (Custom Agent / Action)

You can add Agentum directly as an Action or Custom Connector in Mistral Le Chat:

1. Open **Mistral Le Chat** → **Agents** → **Create Agent**.
2. Under **Tools / Actions**, select **Add OpenAPI Action** or **Add Connector**.
3. Provide the OpenAPI Schema URL:
   ```text
   https://agentum.asimplek.cloud/openapi.json
   ```
4. **Authentication:** Select **None** (Agentum includes a zero-signup free tier of 5 calls/day, with optional x402 / Stripe micropayments beyond).
5. Save the Agent. Your Mistral agent can now deterministically resolve companies, verify VAT numbers, and screen sanctions in conversation.

## 2. Mistral AI API (Function Calling via OpenAPI)

When building with the `@mistralai/mistralai` Python or TypeScript SDK:

```typescript
import { Mistral } from "@mistralai/mistralai";

const client = new Mistral({ apiKey: process.env.MISTRAL_API_KEY });

// Fetch Agentum OpenAPI tool definitions
const res = await fetch("https://agentum.asimplek.cloud/openapi.json");
const openApi = await res.json();

// Convert OpenAPI paths to Mistral function calling definitions
// Or invoke Agentum REST endpoints directly:
const vendorCheck = await fetch("https://agentum.asimplek.cloud/v1/compliance/check-vendor", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name: "Siemens AG",
    country: "DE",
    vatNumber: "DE129274202"
  })
}).then(r => r.json());

console.log("Vendor verdict:", vendorCheck.verdict);
```

## 3. Streamable HTTP MCP Connector

If your Mistral environment or orchestration client supports Model Context Protocol (MCP):
- **MCP Server URL:** `https://agentum.asimplek.cloud/mcp`
- **Transport:** Streamable HTTP / Server-Sent Events (SSE)
- **Manifest:** `https://agentum.asimplek.cloud/.well-known/mcp.json`

## Available Tools

1. `resolve_entity`: Deterministic corporate registry lookup across US, UK, EU-27, Switzerland, Australia, Singapore, Japan, Norway, Brazil, Canada, New Zealand, and Worldwide GLEIF LEI.
2. `verify_eu_vat`: Live European Commission VIES VAT number validation with linked corporate records.
3. `screen_sanctions`: Multi-source screening across OFAC SDN, EU Financial Sanctions, and UN Security Council targets.
4. `check_vendor`: 1-shot vendor due diligence returning `APPROVED`, `FLAGGED_FOR_REVIEW`, or `REJECTED` with full audit trail.
5. `verify_bank_payee`: IBAN Mod-97 validation and country alignment check.
6. `batch_resolve`: Concurrent resolution of up to 25 companies in one round trip.
