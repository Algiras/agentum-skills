# Agentum Examples & Framework Cookbooks

Real-world code examples demonstrating how autonomous AI agents integrate Agentum for deterministic global corporate entity resolution, EU VAT verification, and OFAC/EU/UN sanctions screening.

All examples work with **5 free calls per day** out of the box (zero signup required), with seamless automatic fallback to **Coinbase x402 v2 (USDC on Base)** or **Stripe/Tempo MPP** for production high-volume workloads.

---

## Example Catalog

| File | Framework / Language | What It Does | Run Command |
| :--- | :--- | :--- | :--- |
| [`vendor-onboarding-agent.ts`](./vendor-onboarding-agent.ts) | **TypeScript / Bun / Node** | End-to-end B2B vendor KYB pipeline validating VAT, resolving LEI/company number, screening sanctions, and issuing an automated verdict (`APPROVED`, `FLAGGED_FOR_REVIEW`, `REJECTED`). | `bun run examples/vendor-onboarding-agent.ts` |
| [`langchain-agent.ts`](./langchain-agent.ts) | **LangChain (TypeScript)** | Uses `agentum-langchain` with LangChain's `createReactAgent` or tool calling agent to resolve global entities across UK, CH, AU, SG, US, and EU. | `bun run examples/langchain-agent.ts` |
| [`langchain-python-agent.py`](./langchain-python-agent.py) | **LangChain (Python)** | Uses Python LangChain and `AgentumToolkit` to query corporate registries dynamically in an agent reasoning loop. | `python examples/langchain-python-agent.py` |
| [`crewai-due-diligence.py`](./crewai-due-diligence.py) | **CrewAI (Python)** | Multi-agent team: a **Compliance Analyst Agent** and an **Executive Risk Auditor** collaborating on due diligence. | `python examples/crewai-due-diligence.py` |
| [`openai-native-agent.ts`](./openai-native-agent.ts) | **OpenAI SDK (TypeScript)** | Direct OpenAI function calling agent with tool definitions pointing to Agentum's endpoints. | `bun run examples/openai-native-agent.ts` |
| [`vercel-ai-sdk-agent.ts`](./vercel-ai-sdk-agent.ts) | **Vercel AI SDK** | Integrates Agentum tools with Vercel's `generateText` and streaming tool execution. | `bun run examples/vercel-ai-sdk-agent.ts` |

---

## 1. Automated Vendor Onboarding Pipeline

```typescript
import { verifyVendor } from "./vendor-onboarding-agent";

const report = await verifyVendor({
  name: "Siemens AG",
  vatNumber: "DE129274202",
  country: "DE"
});

console.log(report.verdict); // "APPROVED"
console.log(report.lei);     // "W38RGI023J3WT1HWRP32"
```

## 2. LangChain Integration

```typescript
import { AgentumToolkit } from "agentum-langchain";
import { ChatOpenAI } from "@langchain/openai";

const toolkit = new AgentumToolkit({
  baseUrl: "https://agentum.asimplek.cloud"
});
const tools = toolkit.getTools();
// tools: [resolve_entity, verify_eu_vat, screen_sanctions]
```

## 3. Python CrewAI Due Diligence

```python
from crewai import Agent, Task, Crew
from agentum_langchain import AgentumToolkit

toolkit = AgentumToolkit(base_url="https://agentum.asimplek.cloud")
tools = toolkit.get_tools()

auditor = Agent(
    role="Corporate KYB Compliance Officer",
    goal="Deterministically verify corporate vendor identities and screen sanctions",
    tools=tools,
    verbose=True
)
```

## 4. MCP Zero-Config Stdio Bridge

For Claude Desktop, Cursor, Zed, and Windsurf:

```bash
# Direct run
npx -y agentum-mcp

# Query wallet status and free tier quota
npx -y agentum-mcp status

# Inspect autonomous Base EVM agent wallet
npx -y agentum-mcp wallet address
```
