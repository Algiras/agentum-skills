# Agentum — Global Corporate Entity, VAT & Sanctions Resolver for AI Agents

> **Zero-Signup Streamable HTTP MCP Server & REST API** for deterministic corporate entity resolution across global national registries (**UK Companies House**, **Swiss ZEFIX**, **Australian ABR**, **Singapore ACRA**, **US SEC EDGAR**, **European Registries**, and **Worldwide GLEIF LEI**), live **EU Commission VIES VAT** validation, and **OFAC SDN + EU Financial Sanctions + UN Security Council** screening (`26,650+` live records).

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![MCP Server](https://img.shields.io/badge/MCP-Streamable%20HTTP-blueviolet)](https://agentum.asimplek.cloud/mcp)
[![Dual 402](https://img.shields.io/badge/Payments-x402%20v2%20%7C%20MPP-green)](https://agentum.asimplek.cloud/.well-known/x402.json)
[![Claude Plugin](https://img.shields.io/badge/Claude-Marketplace%20Sync-orange)](https://github.com/Algiras/agentum-skills)
[![Gemini Extension](https://img.shields.io/badge/Gemini-CLI%20Extension-blue)](gemini-extension.json)

---

## Agent Discovery & Platform Connection

### 1. Anthropic Claude (Claude Code, Desktop & Web)
- **Claude Code CLI:**
  ```bash
  claude mcp add --transport http agentum https://agentum.asimplek.cloud/mcp
  ```
- **Claude Plugin Marketplace:**
  Sync directly from GitHub: [`Algiras/agentum-skills`](https://github.com/Algiras/agentum-skills). The `.claude-plugin/marketplace.json` manifest installs the `agentum-entity-resolver` plugin automatically.

### 2. OpenAI ChatGPT
- **Custom MCP Server / Actions:**
  Go to **ChatGPT Settings → Plugins / Custom MCP Servers → Add Server**:
  - **Server URL:** `https://agentum.asimplek.cloud/mcp`
  - **Auth:** OAuth 2.1 auto-negotiation (`https://agentum.asimplek.cloud/oauth/authorize`) or None.
  - **Manifest Discovery:** `https://agentum.asimplek.cloud/.well-known/ai-plugin.json`

### 3. Mistral AI (Le Chat)
- **Custom Connectors:**
  Go to **Mistral Le Chat → Workspace Connections → Add Connector**:
  - **URL:** `https://agentum.asimplek.cloud/mcp`
  - **Transport:** Streamable HTTP / Server-Sent Events (SSE)
- **Skills CLI:**
  ```bash
  npx skills add Algiras/agentum-skills
  ```

### 4. Google Gemini & Antigravity
- **Gemini CLI Extension:**
  ```bash
  gemini extension install Algiras/agentum-skills
  ```
  *(Uses `gemini-extension.json` and `GEMINI.md` system context)*

### 5. Cursor IDE & Generic MCP Clients
Add to `.mcp.json` or `claude_desktop_config.json`:
```json
{
  "mcpServers": {
    "agentum": {
      "type": "http",
      "url": "https://agentum.asimplek.cloud/mcp"
    }
  }
}
```

### 6. Autonomous Agent-to-Agent (A2A) & Protocol Registries
Autonomous agents can discover and inspect capabilities programmatically via well-known schemas:
- **A2A Agent Card:** `https://agentum.asimplek.cloud/.well-known/agent.json`
- **MCP Server Card:** `https://agentum.asimplek.cloud/.well-known/mcp/server-card`
- **Coinbase x402 Bazaar (Base USDC):** `https://agentum.asimplek.cloud/.well-known/x402.json`
- **Stripe / Tempo MPP Registry:** `https://agentum.asimplek.cloud/.well-known/mpp.json`
- **OpenAPI 3.1 Spec:** `https://agentum.asimplek.cloud/openapi.json`
- **LLM Scraper Guide:** `https://agentum.asimplek.cloud/llms.txt` & `https://agentum.asimplek.cloud/llms-full.txt`

---

## Tools & Micropayments (Dual-402)

Every caller receives **5 free calls per day** automatically (tracked by `X-Agent-Id` or IP). Beyond the free quota, calls return an **HTTP 402 Payment Required** response with challenges for both rails:
1. **Coinbase x402 v2:** Native settlement in USDC on Base (`base-mainnet` or `base-sepolia`).
2. **Stripe / Tempo Machine Payments Protocol (MPP):** Standard `Payment` challenge header with instant receipt issuance.

| Tool (MCP) | HTTP Endpoint | Free Tier | Price | Description |
| :--- | :--- | :--- | :--- | :--- |
| `resolve_entity` | `POST /v1/entity/resolve` | 5 calls/day | `$0.005` | Resolve company worldwide by LEI, VAT, CIK/EIN, UK CRN, CH UID, AU ABN/ACN, SG UEN, domain, or fuzzy legal name |
| `verify_eu_vat` | `POST /v1/entity/vat-verify` | 5 calls/day | `$0.002` | Live European Commission VIES VAT validation + entity cross-reference |
| `screen_sanctions` | `POST /v1/entity/sanctions-screen` | 5 calls/day | `$0.002` | Screen against 26,650+ OFAC SDN, EU Financial Sanctions & UN SC targets (homoglyph & trigram resistant) |
| `check_vendor` | `POST /v1/compliance/check-vendor` | 5 calls/day | `$0.010` | 1-shot KYB due diligence returning APPROVED, FLAGGED_FOR_REVIEW, or REJECTED with multi-factor audit trail |
| `verify_bank_payee` | `POST /v1/compliance/verify-bank-payee` | 5 calls/day | `$0.003` | ISO-13616 Mod-97 IBAN checksum validation and country alignment check |
| `batch_resolve` | `POST /v1/entity/batch-resolve` | 5 calls/day | `$0.025` | Concurrently resolve multiple companies across national registries in one call |

---

## Full MCP 2025-03-26 Protocol Suite

- **Streamable HTTP Transport:** Full SSE streaming on `GET /mcp`, batch JSON-RPC support on `POST /mcp`, session termination on `DELETE /mcp`.
- **Tools with Compact Optimization:** Supports `_meta.compact: true` returning token-saving summaries alongside deep-link resource URIs (`agentum://results/{requestId}`).
- **Dynamic Resources:**
  - `agentum://entity/{query}` & `agentum://entity/{query}/compact`
  - `agentum://vat/{vatNumber}`
  - `agentum://sanctions/{name}`
  - `agentum://results/{requestId}`
  - `agentum://pricing`, `agentum://jurisdictions`
- **Prompts:** `kyb_due_diligence_report`, `sanctions_escalation_review`, `vendor_onboarding_check`.
- **Interactive Elicitation & Sampling:** Inline `_meta.elicitation` for schema-driven human/agent payment authorization, and `_meta.samplingRequest` for AI sanctions adjudication.

---

## License

MIT © 2026 Algimantas Krasauskas / Agentum
