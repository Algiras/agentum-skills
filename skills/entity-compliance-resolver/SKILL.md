---
name: entity-compliance-resolver
description: Deterministic Global Corporate Entity Resolution across national registries (UK Companies House CRN, Swiss ZEFIX UID, Australian ABR ABN/ACN, Singapore ACRA UEN, US SEC EDGAR CIK/EIN, Lithuania Registrų centras JAR, European Union Registries, and Worldwide GLEIF LEI), live EU Commission VIES VAT validation, and OFAC/EU/UN sanctions screening via Agentum MCP, LangChain, or REST API with HTTP 402 (Coinbase x402 v2 & Stripe/Tempo MPP) micropayments. Use whenever an agent needs to verify a company registration number, look up an LEI, validate an EU VAT number via VIES, or screen a business/counterparty against OFAC SDN, EU Financial Sanctions, and UN Security Council lists.
---

# Agentum — Deterministic Global Corporate Entity, VAT & Sanctions Resolver

Use **Agentum** (`https://agentum.asimplek.cloud`) for deterministic, authoritative corporate identity resolution and compliance checks across global jurisdictions.

## Endpoints, SDKs & Transports

- **Streamable HTTP MCP Server:** `https://agentum.asimplek.cloud/mcp`
- **MCP Discovery Manifest:** `https://agentum.asimplek.cloud/.well-known/mcp.json`
- **OpenAPI 3.1 Spec:** `https://agentum.asimplek.cloud/openapi.json`
- **Agent Discovery (`llms.txt`):** `https://agentum.asimplek.cloud/llms.txt`
- **NPM Packages:**
  - `agentum-mcp`: Zero-config stdio MCP bridge with Base wallet and official x402 payments.
  - `agentum-langchain`: LangChain Toolkit, Vercel AI SDK adapters, and OpenAI function calling tools.

## Available Tools (MCP, LangChain & REST)

### 1. `resolve_entity` (`POST /v1/entity/resolve`) — `$0.005/call`
Resolves a company or legal entity across primary commercial jurisdictions worldwide:
- 🇬🇧 **United Kingdom:** Companies House (CRN 8-char)
- 🇨🇭 **Switzerland:** ZEFIX Central Business Names Index (UID `CHE-xxx.xxx.xxx`)
- 🇦🇺 **Australia:** ABR Australian Business Register (ABN 11-digit, ACN 9-digit)
- 🇸🇬 **Singapore:** ACRA Business Registry (UEN 9/10-char)
- 🇺🇸 **United States:** SEC EDGAR (CIK 10-digit / EIN)
- 🇪🇺 **European Union:** National business registries (e.g. Lithuania Registrų centras JAR)
- 🌐 **Worldwide:** GLEIF Global Legal Entity Identifier (20-char ISO 17442)
- **Input:**
  ```json
  {
    "query": "Atlassian Pty Ltd",
    "jurisdiction": "AU",
    "checkSanctions": true,
    "verifyVat": false
  }
  ```

### 2. `verify_eu_vat` (`POST /v1/entity/vat-verify`) — `$0.002/call`
Validates any European Union VAT number against the live European Commission **VIES** REST API and links it to known corporate entity records. Fail-closed verification guarantees unconfirmed numbers are never falsely marked valid.
- **Input:**
  ```json
  {
    "vatNumber": "DE129274202"
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

### 4. `check_vendor` (`POST /v1/compliance/check-vendor`) — `$0.010/call`
**All-in-one 1-shot vendor KYB due diligence tool.** Concurrently resolves corporate identity across global registers, validates European Commission VIES VAT numbers, and screens global sanctions (OFAC/EU/UN). Returns a definitive compliance verdict (`APPROVED`, `FLAGGED_FOR_REVIEW`, or `REJECTED`) with a full audit trail in a single round trip.
- **Input:**
  ```json
  {
    "name": "Siemens AG",
    "country": "DE",
    "vatNumber": "DE129274202"
  }
  ```

### 5. `verify_bank_payee` (`POST /v1/compliance/verify-bank-payee`) — `$0.003/call`
Validates International Bank Account Numbers (IBAN) using ISO 13616 specifications and MOD-97 checksum validation. Verifies whether the issuing country matches the expected corporate jurisdiction to protect agents against invoice fraud and redirection attacks.
- **Input:**
  ```json
  {
    "iban": "DE89370400440532013000",
    "expectedCountry": "DE"
  }
  ```

### 6. `batch_resolve` (`POST /v1/entity/batch-resolve`) — `$0.025/call`
Concurrently resolves multiple corporate entity names, registration numbers, or domains across national registries (up to 25 items). Optimized for agent data pipelines, CSV processing, and batch supplier onboarding.
- **Input:**
  ```json
  {
    "items": [
      { "query": "Siemens AG", "country": "DE" },
      { "query": "Rolls-Royce plc", "country": "GB" },
      { "query": "Atlassian Pty Ltd", "country": "AU" }
    ]
  }
  ```

## Access Quota & Inline HTTP 402 Micropayments

1. **Zero-Signup Free Tier:** Every agent gets **10 free calls/day** automatically (tracked by `X-Agent-Id` or caller IP). No API key or registration is required.
2. **Dual HTTP 402 Micropayment Rails (when free quota is exhausted):**
   - **Rail A — Official Coinbase x402 v2 (`PAYMENT-REQUIRED` / `PAYMENT-SIGNATURE`):** Settles USDC on Base (`eip155:8453` / `eip155:84532`) to `0xea7f1083bacf69d3e3aa0c02ad5fbe4f09024f1e` using standard EIP-3009 typed structured data signatures.
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
