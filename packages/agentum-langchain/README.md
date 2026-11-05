# Agentum LangChain Toolkit (`agentum-langchain`)

Registry availability depends on the server configuration. UK Companies House is verified locally; hosted UK access is not yet confirmed. Australian ABR and New Zealand NZBN are disabled without credentials; Japan NTA is pending approval. GLEIF lookup can still return LEI holders in these countries. Check `/v1/coverage` for the connected server’s current registry coverage.

[![npm version](https://img.shields.io/npm/v/agentum-langchain.svg)](https://www.npmjs.com/package/agentum-langchain)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Official LangChain and multi-provider AI agent toolkit for [Agentum](https://agentum.asimplek.cloud) — Authoritative, deterministic corporate entity resolution across global national registries (**UK Companies House**, **Swiss ZEFIX**, **Singapore ACRA**, **US SEC EDGAR**, **European Union Registries**, and **Worldwide GLEIF LEI**), live **European Commission VIES VAT** validation, and **OFAC SDN / EU Financial / UN Sanctions** screening.

Includes **zero-signup free tier** (10 calls/day) and autonomous micropayment settlement via Coinbase **x402 v2** on Base USDC.

---

## Installation

```bash
npm install agentum-langchain @langchain/core zod
```

---

## Quickstart: LangChain ReAct Agent

```typescript
import { ChatOpenAI } from "@langchain/openai";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { AgentumToolkit } from "agentum-langchain";

// 1. Initialize Agentum Toolkit (10 free calls/day out-of-the-box)
const toolkit = new AgentumToolkit({
  // Optional: Provide private key to autonomously pay $0.005/call on Base when free tier is exhausted
  // privateKey: process.env.BASE_PRIVATE_KEY,
});

// 2. Bind tools to any LangChain LLM
const llm = new ChatOpenAI({ model: "gpt-4o", temperature: 0 });
const agent = createReactAgent({
  llm,
  tools: toolkit.getTools(),
});

// 3. Run multi-jurisdictional compliance investigation
const response = await agent.invoke({
  messages: [
    {
      role: "user",
      content: "Verify Grab Holdings in Singapore (UEN) and Nestle in Switzerland (UID), and check sanctions.",
    },
  ],
});

console.log(response.messages[response.messages.length - 1].content);
```

---

## Available Tools

The toolkit exposes 3 LangChain `StructuredTool` instances:

### 1. `resolve_entity`
Resolves companies across global registries by legal name, national registration number, LEI, EU VAT number, or corporate domain.
- **National Registry Coverage:**
  - 🇬🇧 **United Kingdom:** Companies House (CRN 8-char)
  - 🇨🇭 **Switzerland:** ZEFIX Central Business Names Index (UID `CHE-xxx.xxx.xxx`)
  - 🇸🇬 **Singapore:** ACRA Business Registry (UEN 9/10-char)
  - 🇺🇸 **United States:** SEC EDGAR (CIK 10-digit / EIN)
  - 🇪🇺 **European Union:** National business registers & VIES VAT
  - 🌐 **Worldwide:** GLEIF Global Legal Entity Identifier (20-char ISO 17442)
- **Parameters:**
  - `query` (string, required): Company name, registration code, LEI, or domain.
  - `jurisdiction` (string, optional): 2-letter ISO country code (`'GB'`, `'CH'`, `'AU'`, `'SG'`, `'US'`, `'LT'`, etc.).
  - `checkSanctions` (boolean, optional): Set true to automatically screen resolved entity against OFAC/EU/UN.
  - `verifyVat` (boolean, optional): Set true to check EU VAT validity.

### 2. `verify_eu_vat`
Direct validation against live European Commission **VIES** REST service.
- **Parameters:**
  - `vatNumber` (string, required): Full EU VAT number (e.g. `'DE129274202'`, `'IE6388047V'`).

### 3. `screen_sanctions`
Screens entities and individuals against **26,650+ records** from the **US Treasury OFAC SDN List**, **EU Consolidated Financial Sanctions**, and **UN Security Council Consolidated List**.
- **Parameters:**
  - `name` (string, required): Name to screen.
  - `country` (string, optional): ISO country filter (e.g. `'RU'`, `'BY'`).
  - `threshold` (number, optional): Trigram similarity threshold (default `0.75`).

---

## Adapters for Other Frameworks

### Vercel AI SDK (`ai`)

```typescript
import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { createAgentumAiTools } from "agentum-langchain";

const { text } = await generateText({
  model: openai("gpt-4o"),
  tools: createAgentumAiTools({
    // privateKey: process.env.BASE_PRIVATE_KEY, // optional x402 auto-pay
  }),
  prompt: "Look up Nestlé in Switzerland via ZEFIX and check if there are sanctions hits.",
});

console.log(text);
```

### Native OpenAI Function Calling

```typescript
import OpenAI from "openai";
import { AgentumClient, getAgentumOpenAITools } from "agentum-langchain";

const openai = new OpenAI();
const client = new AgentumClient();

const response = await openai.chat.completions.create({
  model: "gpt-4o",
  messages: [{ role: "user", content: "Resolve Revolut Bank UAB and verify its VAT number" }],
  tools: getAgentumOpenAITools(),
});

// Handle tool calls using client.resolveEntity, client.verifyVat, client.screenSanctions
```

---

## Configuration Options

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `baseUrl` | `string` | `"https://agentum.asimplek.cloud"` | Agentum service base URL. |
| `agentId` | `string` | Auto-generated | Identifier passed in `X-Agent-Id` header to track daily free quota. |
| `privateKey` | `string` | `undefined` | 32-byte EVM private key (`0x...`). When set, automatically signs standard EIP-3009 402 micropayments on Base USDC ($0.005/call) via `@x402/fetch` after the free tier is exhausted. |
| `network` | `string` | `"eip155:8453"` | Payment network (`"eip155:8453"` for Base Mainnet, `"eip155:84532"` for Base Sepolia). |
| `fetchImpl` | `typeof fetch` | `globalThis.fetch` | Custom fetch implementation. |

---

## License

MIT © [Algimantas Krasauskas](https://github.com/Algiras) / [Agentum](https://agentum.asimplek.cloud)

## Optional company notices (0.3.0)

`resolveEntity({ query: "891506057", jurisdiction: "FR", includeCompanyEvents: true })` opts into official French BODACC notices on servers supporting this option. The tool and OpenAI schema expose the same flag. Notices are historical evidence and do not establish current status or ownership. The core change is merged; hosted deployment has not yet been verified. See [release evidence](../../docs/company-events-and-official-sanctions.md).
