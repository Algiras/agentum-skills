# Agentum — Registry Submissions, Platform Listings & Discovery Records

This document tracks all platforms, AI assistant ecosystems, MCP directories, search engines, and agent protocols where Agentum (`https://agentum.asimplek.cloud`) is published, submitted, and discoverable.

---

## 0. Worldwide Registry Coverage Architecture (249 ISO Countries)

Agentum implements a deterministic 4-tier coverage taxonomy covering all 249 ISO 3166-1 alpha-2 nations, queryable dynamically via `GET /v1/coverage` and MCP resource `agentum://registries/coverage`:

| Level | Name | Description | Count | Sources & Capabilities |
| :--- | :--- | :--- | :--- | :--- |
| **L3** | **Enriched** | Live corporate registry + national bank account ownership & VAT registers | 3 countries | **Poland** (CEIDG/KRS + Biała lista VAT bank accounts), **Czech Republic** (ARES + Unreliable VAT Payers bank accounts), **Lithuania** (JAR + EU VIES). |
| **L2** | **Verified** | Live official open-government or public company registries with zero scraping | 14+ countries | **United Kingdom** (Companies House), **Switzerland** (ZEFIX), **Australia** (ABR), **Singapore** (ACRA), **United States** (SEC EDGAR), **France** (Recherche Entreprises), **Norway** (Brønnøysundregistrene), **Finland** (PRH Virre), **New Zealand** (NZBN), **Brazil** (Receita Federal CNPJ), **Canada** (Corporations Canada), **Japan** (National Tax Agency), **Global** (GLEIF LEI). |
| **L1** | **Validated** | Table-driven national identifier checksum validation & legal form detection | 40+ countries | Deterministic Modulo-10, Modulo-11, Luhn, ISO 7064, and Mod-97 checksums for SIREN/SIRET, OrgNr, IČO, CNPJ, NZBN, Y-tunnus, etc. Prevents querying upstream on corrupt IDs. |
| **L0** | **Screened** | Trigram & fuzzy screening against consolidated global sanctions | **249 countries** | Universal baseline: OFAC SDN, EU Consolidated Financial Sanctions (FSF), UN Security Council lists. |

**Paid Source Router:** When public open data is unavailable or when instructed via `allowPaidSources: true`, Agentum routes requests through a cost-aware `SourceRouter` utilizing `OpenCorporates` with strict client budget caps ($0.05/call max).

---

## 1. AI Assistant Ecosystems & Marketplaces

| Platform | Listing Type | Identifier / URL | Status | Notes |
| :--- | :--- | :--- | :--- | :--- |
| **Anthropic Claude** | Marketplace Plugin & Skill | Skill: `skill_014hwyXJPU7QQT2vwCxeigqb`<br>Plugin: `plugin_01CHyD4QsSSe7qeqHcSKULai` | **Active & Installed** | Configured via `.claude-plugin/marketplace.json` on `Algiras/agentum-skills`. Auto-updates on git push. CLI: `claude mcp add --transport http agentum https://agentum.asimplek.cloud/mcp`. |
| **OpenAI ChatGPT** | Custom MCP Plugin & Actions | App: `agentum-entity-resolver`<br>Manifest: `/.well-known/ai-plugin.json` | **Active & Installed** | Installed via ChatGPT Settings → Plugins Settings with custom icon `logo.png` (256x256). Backed by dynamic OAuth 2.1 handshake (`/oauth/authorize`, `/oauth/token`). |
| **Mistral AI (Le Chat)** | Custom Workspace Connector & Skill | Connector: `agentum_entity_sanctions_resolver_88d5`<br>Skill: `01a1a329-4924-71f6-8c49-7c1b9ce53cb5` | **Active & Connected** | 3 read-only tools verified on live connector. Streamable HTTP SSE transport at `https://agentum.asimplek.cloud/mcp`. |
| **Google Gemini & Antigravity** | Gemini CLI Extension & Agent Skills | Repo: `Algiras/agentum-skills`<br>Manifest: `gemini-extension.json`<br>Context: `GEMINI.md` | **Active & Discoverable** | Tagged with GitHub topic `gemini-cli-extension`. Zero-config install: `gemini extension install Algiras/agentum-skills`. |
| **Cursor / Windsurf** | IDE MCP Plugin & Skill | Config: `.cursor-plugin/plugin.json`<br>Servers: `.mcp.json` | **Active** | Supports instant one-click connection to remote Streamable HTTP MCP server. |

---

## 2. Model Context Protocol (MCP) Directories & Registries

| Registry | Standard / Manifest | Namespace / Key | Status | Verification & Submission Details |
| :--- | :--- | :--- | :--- | :--- |
| **Official MCP Registry** (`modelcontextprotocol.io`) | `server.json` & `.mcp/server.json` | `io.github.algiras/agentum-entity-resolver` | **Published** | Mapped to `https://github.com/Algiras/agentum-skills` with remote Streamable HTTP transport and active status. |
| **Awesome MCP Servers** (`mcpservers.org`) | Web Form Submission | Category: `finance`<br>Remote: `https://agentum.asimplek.cloud/mcp` | **Submitted** | Submitted via Chrome session on `mcpservers.org/submit`. Confirmed with "Submission Successful! Review within 2 weeks". Email: `kras.algim@gmail.com`. |
| **Glama.ai** | `glama.json` (Root) | `agentum-entity-resolver` | **Published** | Configured with MIT license, repository backlink, and categories: `compliance`, `financial-services`, `developer-tools`. Automated crawler indexing. |
| **Smithery.ai** | `smithery.yaml` (Root) | `agentum-entity-resolver` | **Published** | Configured for direct non-proxied Streamable HTTP transport at `https://agentum.asimplek.cloud/mcp`. |
| **NPM Global Registry** | `https://www.npmjs.com/package/agentum-mcp`<br>`https://www.npmjs.com/package/agentum-langchain` | `agentum-mcp@0.2.2`<br>`agentum-langchain@0.1.0` | **Live & Published** | Enables zero-config launch: `npx -y agentum-mcp` for Claude Desktop, Cursor, Zed, Windsurf, plus LangChain Toolkit, Vercel AI SDK, and OpenAI function calling adapters. |
| **PulseMCP** (`pulsemcp.com`) | Official Registry Mirror | `io.github.algiras/agentum-entity-resolver` | **Auto-Synced via Registry** | Manual submissions paused by PulseMCP since Sept 2026. PulseMCP pulls directly from the Official MCP Registry `server.json`. |

---

## 3. Search Engine Optimization (SEO) & LLM Web Search Crawlers

| Search Engine / Bot | Mechanism | Endpoints / Keys | Status | Verification Details |
| :--- | :--- | :--- | :--- | :--- |
| **Bing & Microsoft Copilot** | IndexNow API Submission | Key: `e4c8b2d1f9a34e5687b1c0d4f2a59e71`<br>Location: `https://agentum.asimplek.cloud/e4c8b2d1f9a34e5687b1c0d4f2a59e71.txt` | **Accepted (202)** | All 13 core URLs submitted directly to `https://www.bing.com/indexnow` and `https://api.indexnow.org/indexnow`. Returns `202 Accepted`. Automated via `bun scripts/submit-indexnow.ts`. |
| **ChatGPT Search / SearchGPT** | IndexNow & OAI-SearchBot | `robots.txt` + `sitemap.xml` | **Indexed via Bing** | OAI-SearchBot allowed in `robots.txt`. Receives indexing feeds directly via Bing IndexNow pipeline. |
| **Perplexity AI** | PerplexityBot & IndexNow | `robots.txt` + `sitemap.xml` | **Active & Allowed** | Explicitly allowed in `robots.txt`. Submitted via IndexNow consortium. |
| **Google Search & Google-Extended** | XML Sitemap & Dynamic HTML Verification | Sitemap: `/sitemap.xml`<br>Dynamic: `/google*.html`<br>Bot: `Google-Extended` allowed | **Active & Ready** | `Sitemap: https://agentum.asimplek.cloud/sitemap.xml` published. Dynamic wildcard verification route active on `/google*.html` for instant Google Search Console property claiming. |
| **Anthropic ClaudeBot** | ClaudeBot & anthropic-ai | `robots.txt` + `llms.txt` | **Active & Allowed** | Explicitly allowed in `robots.txt`. |

---

## 4. Machine-to-Machine (A2A) & Autonomous Agent Micropayment Protocols

| Protocol | Coordinate | Description | Status |
| :--- | :--- | :--- | :--- |
| **Agent-to-Agent (A2A)** | `https://agentum.asimplek.cloud/.well-known/agent.json` | Google / A2A Standard Agent Card exposing capabilities, pricing, and schemas. | **Live** |
| **MCP Server Card** | `https://agentum.asimplek.cloud/.well-known/mcp/server-card` | MCP 2025-03-26 server card for automated discovery. | **Live** |
| **Coinbase x402 Bazaar** | `https://agentum.asimplek.cloud/.well-known/x402.json` | Autonomous agent discovery for Base mainnet USDC micropayments. | **Live** |
| **Stripe / Tempo MPP** | `https://agentum.asimplek.cloud/.well-known/mpp.json` | Machine Payments Protocol directory for automated agent wallets. | **Live** |
| **LLMs.txt Standard** | `https://agentum.asimplek.cloud/llms.txt`<br>`https://agentum.asimplek.cloud/llms-full.txt` | Universal markdown guide for LLMs, scrapers, and agents. | **Live** |
| **OpenAPI 3.1** | `https://agentum.asimplek.cloud/openapi.json` | Complete machine-readable REST API schema. | **Live** |
| **Agent Skills CLI** | `npx skills add Algiras/agentum-skills` | Package manager distribution via `skills.sh`. | **Live** |

---

## 5. Platform-by-Platform Refresh & Update Procedures

When releasing new versions (such as v0.2.0 with global registries and LangChain adapters):

### A. Mistral AI (Le Chat)
- **Connector (`agentum_entity_sanctions_resolver_88d5`):**
  - Configured at `https://chat.mistral.ai` → **Workspace Settings** → **Connectors**.
  - Points dynamically to `https://agentum.asimplek.cloud/mcp` (Streamable HTTP).
  - *Action:* Automatic! Once Railway is deployed, Mistral fetches the updated `tools/list` on its next probe.
- **Skill (`01a1a329-4924-71f6-8c49-7c1b9ce53cb5`):**
  - View at `https://chat.mistral.ai/skills/01a1a329-4924-71f6-8c49-7c1b9ce53cb5`.
  - *Action:* Click **Edit Skill** → upload the newly generated `dist/agentum-skill.zip` (containing the updated `skills/entity-compliance-resolver/SKILL.md`) or update the description to reflect global registries (UK, Switzerland, Australia, Singapore, US, EU, and worldwide LEI).

### B. OpenAI ChatGPT
- **Custom GPT Actions:**
  - In ChatGPT → **Explore GPTs** → **Edit Agentum GPT** → **Configure** → **Actions**.
  - *Action:* Click **"Import from URL"** → enter `https://agentum.asimplek.cloud/openapi.json`. ChatGPT will re-fetch the OpenAPI 3.1 specification containing the latest national registry schemas and x402 payment extensions.
- **Plugin Manifest:**
  - Points to `https://agentum.asimplek.cloud/.well-known/ai-plugin.json`.
  - *Action:* Dynamic. Updates automatically with backend deployment.

### C. Anthropic Claude
- **Claude Skill (`skill_014hwyXJPU7QQT2vwCxeigqb`):**
  - Navigate to `https://claude.ai/customize/skills` (or project settings).
  - *Action:* Re-upload `dist/agentum-skill.zip` to refresh the active skill instructions.
- **Claude Marketplace Plugin (`plugin_01CHyD4QsSSe7qeqHcSKULai`):**
  - Linked to GitHub repository `Algiras/agentum-skills` via `.claude-plugin/marketplace.json` and `.claude-plugin/plugin.json`.
  - *Action:* Automatically synchronizes upon `git push` to `Algiras/agentum-skills`.
- **Claude Code CLI:**
  - Connect directly: `claude mcp add --transport http agentum https://agentum.asimplek.cloud/mcp`.

### D. Google Gemini & Antigravity
- **Gemini CLI Extension:**
  - Manifest: `gemini-extension.json` + `GEMINI.md`.
  - *Action:* Synced on push to `Algiras/agentum-skills`. Users run `gemini extension update agentum-entity-resolver` or reinstall via `gemini extension install Algiras/agentum-skills`.

### E. MCP Directories (Glama, Smithery, Official Registry)
- **Smithery:** Non-proxied HTTP transport configured in `smithery.yaml`. Auto-crawls `https://agentum.asimplek.cloud/mcp`.
- **Glama:** Configured in `glama.json`. Auto-crawls on git push.
- **Official MCP Registry:** Tracks `server.json` and `.mcp/server.json`. Auto-synced from repo.
