# agentum-mcp

> **Zero-Configuration Model Context Protocol (MCP) Stdio Bridge** for [Agentum](https://agentum.asimplek.cloud) — Deterministic EU & US Corporate Entity Resolution (**GLEIF LEI**, **US SEC EDGAR CIK/EIN**, **Lithuania Registrų centras JAR**), live **European Commission VIES VAT** validation, and **OFAC SDN + EU Financial Sanctions + UN Security Council** screening.

Includes **5 free calls per day** automatically (no API keys or signups required) and inline **Dual-402** micropayments (**Coinbase x402 v2** USDC on Base + **Stripe / Tempo MPP**).

---

## One-Click Setup for AI Assistants

### 1. Claude Desktop (`claude_desktop_config.json`)
Add to `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS) or `%APPDATA%\Claude\claude_desktop_config.json` (Windows):

```json
{
  "mcpServers": {
    "agentum": {
      "command": "npx",
      "args": ["-y", "agentum-mcp"]
    }
  }
}
```

### 2. Cursor IDE (`.mcp.json` or Settings)
Add to `.mcp.json` in your project root:

```json
{
  "mcpServers": {
    "agentum": {
      "command": "npx",
      "args": ["-y", "agentum-mcp"]
    }
  }
}
```

### 3. Claude Code CLI
Claude Code supports remote Streamable HTTP directly:

```bash
claude mcp add --transport http agentum https://agentum.asimplek.cloud/mcp
```
Or via stdio:
```bash
claude mcp add agentum npx -y agentum-mcp
```

### 4. Zed & Windsurf
Add `agentum-mcp` to your editor MCP configuration using `npx -y agentum-mcp`.

---

## Available Tools

- `resolve_entity`: Deterministically resolves corporate entities worldwide (GLEIF LEI, US SEC EDGAR CIK, LT JAR code, EU VAT, company domain, or fuzzy name matching).
- `verify_eu_vat`: Validates EU VAT numbers in real-time against the European Commission VIES database.
- `screen_sanctions`: Screens companies and individuals against 26,650+ live records from US OFAC SDN, EU Financial Sanctions, and the UN Security Council.

---

## Environment Variables

- `AGENTUM_URL`: Override the remote MCP endpoint (defaults to `https://agentum.asimplek.cloud/mcp`).
- `AGENTUM_TIMEOUT`: HTTP request timeout in milliseconds (default: `30000`).
- `DEBUG`: Set to `1` to output connection diagnostics to `stderr`.

---

## License

MIT © 2026 Algimantas Krasauskas / Agentum Network
