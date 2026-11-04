/**
 * Example: Vercel AI SDK (`ai`) with Agentum Compliance Tools
 *
 * Demonstrates an AI agent using Vercel AI SDK function calling to perform
 * automated vendor due-diligence across global company registries.
 *
 * Requirements:
 *   npm install ai @ai-sdk/openai agentum-langchain zod
 *
 * Run with:
 *   export OPENAI_API_KEY="sk-..."
 *   bun run examples/vercel-ai-sdk-agent.ts
 */

import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { createAgentumAiTools } from "../packages/agentum-langchain/src/index.js";

async function main() {
  console.log("=== Agentum + Vercel AI SDK Compliance Agent ===");

  const tools = createAgentumAiTools({
    baseUrl: process.env.AGENTUM_URL || "https://agentum.asimplek.cloud",
    // Optional: Pass EVM private key to autonomously pay via x402 on Base USDC:
    // privateKey: process.env.BASE_PRIVATE_KEY,
  });

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.warn("Notice: OPENAI_API_KEY not set. Testing tool execution directly:\n");
    console.log("Resolving 'Barclays' in UK (Companies House):");
    const barclays = await tools.resolve_entity.execute({ query: "Barclays", jurisdiction: "GB" });
    console.log(JSON.stringify(barclays, null, 2));
    return;
  }

  const prompt = `
You are a senior compliance officer.
Please investigate and report on:
1. "Nestle" in Switzerland
2. "Siemens" in Germany (VAT: DE129274202)

For each:
- Confirm legal name, registration number, and corporate status
- Verify VAT validity if available
- Screen for any sanctions matches
- Provide a clear final compliance verdict (APPROVED or FLAGGED)
`;

  console.log("Executing generateText with Agentum tools...\n");
  const { text, steps } = await generateText({
    model: openai("gpt-4o"),
    tools,
    maxSteps: 5,
    prompt,
  });

  console.log(`Completed in ${steps.length} step(s).\n`);
  console.log("=== Agent Compliance Verdict ===");
  console.log(text);
}

main().catch(console.error);
