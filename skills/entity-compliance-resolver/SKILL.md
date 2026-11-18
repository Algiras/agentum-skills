---
name: entity-compliance-resolver
description: Verify suppliers using company registry resolution, optional EU VAT validation and sanctions screening with Agentum MCP or REST. Use for supplier onboarding and counterparty checks; inspect source coverage and request human review of uncertain or potential matches.
---

# Agentum — Deterministic Global Corporate Entity, VAT & Sanctions Resolver

Use **Agentum** (`https://agentum.asimplek.cloud`) for deterministic, authoritative corporate identity resolution and compliance checks across global jurisdictions.

Registry availability depends on the server configuration. UK Companies House is verified locally; hosted UK access is not yet confirmed. Australian ABR and New Zealand NZBN are disabled without credentials; Japan NTA is pending approval. GLEIF lookup can still return LEI holders in these countries. Check `/v1/coverage` for the connected server’s current registry coverage.

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
- 🇸🇬 **Singapore:** ACRA Business Registry (UEN 9/10-char)
- 🇺🇸 **United States:** SEC EDGAR (CIK 10-digit / EIN)
- 🇪🇺 **European Union:** National business registries (e.g. Lithuania Registrų centras JAR)
- 🌐 **Worldwide:** GLEIF Global Legal Entity Identifier (20-char ISO 17442)
- **Input:**
  ```json
  {
    "query": "Nestle SA",
    "jurisdiction": "CH",
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
Combines company resolution, optional EU VIES VAT verification and sanctions screening for supplier onboarding. Returns a decision-support verdict (`APPROVED`, `FLAGGED_FOR_REVIEW`, or `REJECTED`) with source coverage, screening details and an audit trail. VAT is not checked if omitted. Review uncertain or potential matches; a result is not a legal compliance determination.
- **Input:**
  ```json
  {
    "name": "Siemens AG",
    "country": "DE",
    "vatNumber": "DE129274202"
  }
  ```

### 5. `verify_bank_payee` (`POST /v1/compliance/verify-bank-payee`) — `$0.003/call`
Validates International Bank Account Numbers (IBAN) using ISO 13616 specifications and MOD-97 checksum validation. Checks whether the IBAN country matches the expected jurisdiction. An IBAN checksum or country match does not establish account ownership; check ownership fields only where a supported register is available.
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
      { "query": "Nestle SA", "country": "CH" }
    ]
  }
  ```

## Access and payment

Check the connected deployment's [payment guide](https://agentum.asimplek.cloud/pay.md) for current free-tier limits, prices and available payment methods. The hosted service supports x402; prepaid card credits depend on deployment configuration. Do not assume MPP is enabled.

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
