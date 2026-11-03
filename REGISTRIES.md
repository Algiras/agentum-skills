# Agentum — Registry Submissions, Platform Listings & Discovery Records

This document tracks all platforms, AI assistant ecosystems, MCP directories, search engines, and agent protocols where Agentum (`https://agentum.asimplek.cloud`) is published, submitted, and discoverable.

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
| **NPM Global Registry** | `https://www.npmjs.com/package/agentum-mcp` | `agentum-mcp@0.1.0` | **Live & Published** | Published via automated GitHub Actions CI. Enables zero-config launch: `npx -y agentum-mcp` for Claude Desktop, Cursor, Zed, and Windsurf. |
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
