# Agentum — Global Corporate Entity, VAT & Sanctions Resolver (Gemini Extension)

Use the `agentum` MCP server (`https://agentum.asimplek.cloud/mcp`) for deterministic corporate identity resolution, EU VIES VAT verification, and sanctions screening across global jurisdictions.

## Available MCP Tools
- `resolve_entity`: Resolve a company across national registries (UK Companies House CRN, Swiss ZEFIX UID, Australian ABR ABN/ACN, Singapore ACRA UEN, US SEC EDGAR CIK/EIN, Lithuania Registrų centras JAR, European Union Registries, and Worldwide GLEIF LEI).
- `verify_eu_vat`: Validate an EU VAT number in real time against the European Commission VIES database and link it to the registered corporate entity.
- `screen_sanctions`: Screen an entity or individual name and identifiers against OFAC SDN, EU Consolidated Financial Sanctions, and UN Security Council lists with Cyrillic/Greek homoglyph normalization and trigram similarity scoring.
- `check_vendor`: 1-shot vendor KYB due diligence returning APPROVED, FLAGGED_FOR_REVIEW, or REJECTED with multi-factor audit trail (registry status, VIES VAT match, bank ownership, sanctions).
- `verify_bank_payee`: Validate IBAN ISO-13616 Mod-97 checksum, country alignment, and payee tax ID ownership in supported jurisdictions (e.g. Poland White List, Czech VAT register).
- `batch_resolve`: Concurrently resolve multiple companies across national registries in one call.

## Compact Token-Saving Mode & MCP Resources
- Pass `_meta: { "compact": true }` in `tools/call` arguments to receive a compact summary and a `resource_link` (`agentum://results/{requestId}`) for full JSON inspection.
- Direct MCP resource templates:
  - `agentum://entity/{query}/compact`
  - `agentum://entity/{query}`
  - `agentum://vat/{vatNumber}`
  - `agentum://sanctions/{name}`
  - `agentum://registries/coverage`
  - `agentum://pricing`
  - `agentum://jurisdictions`
