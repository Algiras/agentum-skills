# Agentum — EU & US Corporate Entity, VAT & Sanctions Resolver (Gemini Extension)

Use the `agentum` MCP server (`https://agentum.asimplek.cloud/mcp`) for deterministic corporate identity resolution and compliance checks across European and US jurisdictions.

## Available MCP Tools
- `resolve_entity`: Resolve a company by registration code, LEI (ISO 17442), EU VAT number, US SEC CIK, US EIN, Lithuania JAR code, domain name, or legal name across GLEIF, SEC EDGAR, and EU national registries.
- `verify_vat`: Validate an EU VAT number in real time against the European Commission VIES database and link it to the registered corporate entity.
- `screen_sanctions`: Screen an entity or individual name and identifiers against OFAC SDN, EU Consolidated Financial Sanctions, and UN Security Council lists with Cyrillic/Greek homoglyph normalization and trigram similarity scoring.

## Compact Token-Saving Mode & MCP Resources
- Pass `_meta: { "compact": true }` in `tools/call` arguments to receive a compact summary and a `resource_link` (`agentum://results/{requestId}`) for full JSON inspection.
- Direct MCP resource templates:
  - `agentum://entity/{query}/compact`
  - `agentum://entity/{query}`
  - `agentum://vat/{vatNumber}`
  - `agentum://sanctions/{name}`
  - `agentum://pricing`
  - `agentum://jurisdictions`
