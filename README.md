# Agentum — EU & US Corporate Entity, VAT & Sanctions Resolver for AI Agents

> **Zero-Signup Streamable HTTP MCP Server & REST API** for deterministic corporate entity resolution (**GLEIF LEI**, **US SEC EDGAR CIK/EIN**, **Lithuania Registrų centras JAR**), live **EU Commission VIES VAT** validation, and **OFAC SDN + EU Financial Sanctions + UN Security Council** screening (`26,650+` live records).

---

## Quick Connect (MCP & Skills)

### 1. Claude Code / Cursor / Antigravity / MCP Clients
Add the remote Streamable HTTP MCP server directly — no API keys or local installation required:

```bash
claude mcp add --transport http agentum https://agentum.up.railway.app/mcp
```

Or in `.mcp.json` / `claude_desktop_config.json`:
```json
{
  "mcpServers": {
    "agentum": {
      "type": "http",
      "url": "https://agentum.up.railway.app/mcp"
    }
  }
}
```

### 2. Agent Skills CLI (`skills.sh`)
```bash
npx skills add agentum/agentum-skills
```

---

## Live Coordinates

| Resource | URL |
| :--- | :--- |
| **Streamable HTTP MCP** | `https://agentum.up.railway.app/mcp` |
| **MCP Discovery** | `https://agentum.up.railway.app/.well-known/mcp.json` |
| **OpenAPI 3.1 Spec** | `https://agentum.up.railway.app/openapi.json` |
| **LLM Discovery (`llms.txt`)** | `https://agentum.up.railway.app/llms.txt` |
| **Health & Feature Status** | `https://agentum.up.railway.app/health` |

---

## Tools & Pricing

Every agent receives **10 free calls/day** automatically (`X-Agent-Id` or IP). Beyond the daily free quota, Agentum returns a **Dual HTTP 402** challenge supporting both **Coinbase x402 v2** (USDC on Base) and **Stripe / Tempo Machine Payments Protocol (MPP)**:

| Tool (MCP) | HTTP Endpoint | Price | Description |
| :--- | :--- | :--- | :--- |
| `resolve_entity` | `POST /v1/entity/resolve` | `$0.005` | Resolve EU/US company by LEI, EU VAT, US CIK/EIN, LT JAR code, domain, or fuzzy legal name |
| `verify_eu_vat` | `POST /v1/entity/vat-verify` | `$0.002` | Live European Commission VIES VAT validation + entity cross-reference |
| `screen_sanctions` | `POST /v1/entity/sanctions-screen` | `$0.002` | Screen against 26,650+ OFAC SDN, EU Financial Sanctions & UN SC targets (homoglyph & trigram resistant) |

---

## Full MCP Protocol Capabilities (`/mcp`)

- **Tools (`tools/list`, `tools/call`):** Supports `_meta.compact: true` for token-saving responses with `resource_link` (`agentum://results/{requestId}`), plus `_meta.x402Payment` and `_meta.mppPayment` for inline HTTP 402 settlement.
- **Resources & Templates (`resources/list`, `resources/templates/list`, `resources/read`):**
  - `agentum://entity/{query}/compact` (compact corporate summary)
  - `agentum://entity/{query}` (full canonical entity + compliance profile)
  - `agentum://vat/{vatNumber}` (live EU VIES VAT check)
  - `agentum://sanctions/{name}` (OFAC/EU/UN sanctions check)
  - `agentum://results/{requestId}` (cached full tool output)
  - `agentum://pricing`, `agentum://registries/coverage`, `agentum://jurisdictions`
- **Prompts (`prompts/list`, `prompts/get`):** `kyb_due_diligence_report`, `sanctions_escalation_review`, `vendor_onboarding_check`.
- **Elicitation & Sampling (`elicitation/prepare`, `sampling/prepare`, `_meta.elicitation`, `_meta.samplingRequest`):** Structured JSON Schema elicitation for ambiguous entities or payment approval, and LLM sampling payloads for sanctions risk adjudication.
- **Completions (`completion/complete`):** Autocomplete for `jurisdiction`, `country`, and company names.

