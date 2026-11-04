# agentum-mcp

> **Zero-Configuration Model Context Protocol (MCP) Stdio Bridge** for [Agentum](https://agentum.asimplek.cloud) — Deterministic EU & US Corporate Entity Resolution (**GLEIF LEI**, **US SEC EDGAR CIK/EIN**, **Lithuania Registrų centras JAR**), live **European Commission VIES VAT** validation, and **OFAC SDN + EU Financial Sanctions + UN Security Council** screening.

Includes **5 free calls per day** automatically (no API keys or signups required) and built-in **autonomous Base EVM wallet management** for inline **Coinbase x402 v2** USDC micropayments (0.05 USDC/call) beyond the free tier.

Zero external dependencies. Requires Node.js >= 18.0.0.

---

## Autonomous Micropayments & Wallet CLI

When your daily free quota is exceeded, `agentum-mcp` can automatically sign and pay 402 challenges via an autonomous agent wallet on **Base**, so Claude or Cursor never gets interrupted.

```bash
# Check current free quota status & wallet configuration
npx agentum-mcp status

# Generate a new autonomous Base agent wallet (saved to ~/.agentum/config.json with mode 0600)
npx agentum-mcp wallet generate

# Check real-time on-chain Base ETH (gas) and Base USDC balances
npx agentum-mcp wallet balance

# Import an existing EVM private key
npx agentum-mcp wallet import <privateKey>

# Print public wallet address for funding
npx agentum-mcp wallet address

# Switch network between Base Mainnet and Base Sepolia Testnet
npx agentum-mcp config set-network sepolia
npx agentum-mcp config set-network mainnet
```

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

## Configuration & Environment Variables

- `AGENTUM_PRIVATE_KEY`: Override the EVM private key for x402 autonomous micropayments.
- `AGENTUM_NETWORK`: Set target network (`eip155:8453` for Base Mainnet, `eip155:84532` for Base Sepolia).
- `AGENTUM_URL`: Override the remote MCP endpoint (default: `https://agentum.asimplek.cloud/mcp`).
- `AGENTUM_TIMEOUT`: HTTP request timeout in milliseconds (default: `30000`).
- `DEBUG`: Set to `1` to output diagnostics to `stderr`.

---

## License

MIT © 2026 Algimantas Krasauskas / Agentum Network
