/**
 * Example: LangChain Agent with Agentum Corporate Entity & Compliance Toolkit
 *
 * Demonstrates an autonomous LangChain ReAct agent resolving companies across
 * global jurisdictions (UK, Switzerland, Australia, Singapore, US, EU) and screening sanctions.
 *
 * Requirements:
 *   npm install agentum-langchain @langchain/openai @langchain/langgraph @langchain/core zod
 *
 * Run with:
 *   export OPENAI_API_KEY="sk-..."
 *   bun run examples/langchain-agent.ts
 */

import { AgentumToolkit } from "../packages/agentum-langchain/src/index.js";

async function main() {
  console.log("=== Agentum + LangChain Autonomous Due-Diligence Agent ===");

  // 1. Initialize Agentum toolkit with zero-signup free tier
  const toolkit = new AgentumToolkit({
    baseUrl: process.env.AGENTUM_URL || "https://agentum.asimplek.cloud",
    // Optional: Pass an EVM private key to pay $0.005 on Base via x402 when free tier is exhausted
    // privateKey: process.env.BASE_PRIVATE_KEY,
  });

  const tools = toolkit.getTools();
  console.log(`Loaded ${tools.length} LangChain tools: ${tools.map((t) => t.name).join(", ")}`);

  // Check for LangChain LLM packages
  let ChatOpenAI: any;
  let createReactAgent: any;
  try {
    const openaiPkg = await import("@langchain/openai");
    ChatOpenAI = openaiPkg.ChatOpenAI;
    const langgraphPkg = await import("@langchain/langgraph/prebuilt");
    createReactAgent = langgraphPkg.createReactAgent;
  } catch {
    // Packages not yet installed
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey || !ChatOpenAI || !createReactAgent) {
    console.warn("\nNotice: OPENAI_API_KEY or @langchain/openai not detected.");
    console.log("Demonstrating direct LangChain StructuredTool invocation across global registries:\n");

    const resolveTool = tools.find((t) => t.name === "resolve_entity")!;
    console.log("1. Invoking resolve_entity directly for 'Atlassian Pty Ltd' (Australia ABR):");
    const resAu = await resolveTool.invoke({ query: "Atlassian Pty Ltd", jurisdiction: "AU" });
    console.log(resAu);

    console.log("\n2. Invoking resolve_entity for 'Nestle SA' (Swiss ZEFIX):");
    const resCh = await resolveTool.invoke({ query: "Nestle SA", jurisdiction: "CH" });
    console.log(resCh);

    console.log("\n(To run the full agent with LLM, install @langchain/openai and set OPENAI_API_KEY)");
    return;
  }

  const llm = new ChatOpenAI({
    model: "gpt-4o",
    temperature: 0,
  });

  // 3. Create the LangChain ReAct Agent
  const agent = createReactAgent({
    llm,
    tools,
  });

  // 4. Run multi-entity compliance verification
  const userQuery = `
Please perform a complete KYB compliance verification for these 3 prospective counterparties:
1. "Grab Holdings" in Singapore
2. "Atlassian" in Australia
3. "Siemens" in Germany (VAT: DE129274202)

For each company:
- Resolve their official registration number and legal status
- Verify VAT validity if available
- Screen for any active OFAC/EU/UN sanctions hits
`;

  console.log(`\nDispatching query to agent...\n`);
  const result = await agent.invoke({
    messages: [{ role: "user", content: userQuery }],
  });

  const finalMessage = result.messages[result.messages.length - 1];
  console.log("\n=== Final Agent Response ===");
  console.log(finalMessage.content);
}

main().catch(console.error);
