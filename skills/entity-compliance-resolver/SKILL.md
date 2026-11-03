---
name: entity-compliance-resolver
description: Deterministic EU & US corporate entity resolution (GLEIF LEI, Lithuania Registrų centras JAR, US SEC EDGAR CIK/EIN), live EU Commission VIES VAT validation, and OFAC/EU/UN sanctions screening via Agentum MCP or REST API with HTTP 402 (Coinbase x402 v2 & Stripe/Tempo MPP) micropayments. Use whenever an agent needs to verify a company registration number, look up an LEI or CIK, validate an EU VAT number via VIES, or screen a business/counterparty against OFAC SDN, EU Financial Sanctions, and UN Security Council lists.
---

# Agentum — EU & US Corporate Entity, VAT & Sanctions Resolver

Use **Agentum** (`https://agentum.up.railway.app`) for deterministic, authoritative corporate identity resolution and compliance checks across European and US jurisdictions.

## Endpoints & Transports

- **Streamable HTTP MCP Server:** `https://agentum.up.railway.app/mcp`
- **MCP Discovery Manifest:** `https://agentum.up.railway.app/.well-known/mcp.json`
- **OpenAPI 3.1 Spec:** `https://agentum.up.railway.app/openapi.json`
- **Agent Discovery (`llms.txt`):** `https://agentum.up.railway.app/llms.txt`

## Available Tools (MCP & REST)

### 1. `resolve_entity` (`POST /v1/entity/resolve`) — `$0.005/call`
Resolves a company or legal entity by registration code, LEI (20-char ISO 17442), EU VAT number, US SEC CIK, US EIN, Lithuania JAR code (9-digit), domain name, or fuzzy legal name (with Baltic/European diacritic & legal-form normalization).
- **Input:**
  ```json
  {
    "query": "NVIDIA CORP",
    "jurisdictionHint": "US",
    "checkSanctions": true,
    "verifyVat": false
  }
  ```

### 2. `verify_eu_vat` (`POST /v1/entity/vat-verify`) — `$0.002/call`
Validates any European Union VAT number against the live European Commission **VIES** REST API and links it to known corporate entity records.
- **Input:**
  ```json
  {
    "vatNumber": "IE6388047V"
  }
  ```

### 3. `screen_sanctions` (`POST /v1/entity/sanctions-screen`) — `$0.002/call`
Screens an entity or individual against **26,650+ live records** from the **US Treasury OFAC SDN List**, **EU Consolidated Financial Sanctions**, and **UN Security Council Consolidated List** using exact registration ID matching, Cyrillic/Greek homoglyph normalization, and word-window trigram similarity.
- **Input:**
  ```json
  {
    "name": "GAZPROMBANK OJSC",
    "country": "RU",
    "threshold": 0.75
  }
  ```

## Access Quota & Inline HTTP 402 Micropayments

1. **Zero-Signup Free Tier:** Every agent gets **10 free calls/day** automatically (tracked by `X-Agent-Id` or caller IP). No API key or registration is required.
2. **Dual HTTP 402 Micropayment Rails (when free quota is exhausted):**
   - **Rail A — Coinbase x402 v2 (`PAYMENT-REQUIRED` / `PAYMENT-SIGNATURE`):** Settles USDC on Base (`eip155:8453` / `eip155:84532`) to `0xea7f1083bacf69d3e3aa0c02ad5fbe4f09024f1e`.
   - **Rail B — Stripe + Tempo Machine Payments Protocol (`WWW-Authenticate: Payment` / `Authorization: Payment`):** Accepts Stripe `PaymentIntent` (`pi_...`), Stripe Shared Payment Tokens (`spt_...`), or HMAC-signed MPP tokens.
   - **MCP `_meta` Payment Bridge:** When calling tools over `/mcp`, pass payment credentials inside `params._meta.x402Payment` or `params._meta.mppPayment`.

## Full MCP Protocol Flows (`/mcp`)

- **Compact Mode & Resource Links (`_meta.compact: true`):** Pass `_meta: { "compact": true }` in `tools/call` to receive a token-saving compact summary plus a `resource_link` (`agentum://results/{requestId}`) that can be expanded on demand via `resources/read` without re-paying.
- **Direct Compact Resources (`resources/read`):**
  - `agentum://entity/{query}/compact` — Minimal corporate card (`< 250` bytes)
  - `agentum://entity/{query}` — Full canonical corporate & compliance record
  - `agentum://vat/{vatNumber}` — Live EU VIES VAT record
  - `agentum://sanctions/{name}` — OFAC/EU/UN sanctions report
  - `agentum://pricing` & `agentum://jurisdictions`
- **MCP Prompts (`prompts/list`, `prompts/get`):**
  - `kyb_due_diligence_report` (`companyName`, `jurisdiction`, `vatNumber`)
  - `sanctions_escalation_review` (`entityName`, `country`)
  - `vendor_onboarding_check` (`vendorName`, `vatOrTaxId`)
- **MCP Elicitation & Sampling:**
  - Automatically attaches `_meta.elicitation` (`elicitation/create` JSON Schema form) on 402 payment challenges or ambiguous entity queries (`_meta.elicitIfAmbiguous: true`).
  - Automatically attaches `_meta.samplingRequest` (`sampling/createMessage` LLM adjudication request) on sanctions hits or when `_meta.enableSampling: true` is passed.

