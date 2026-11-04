/**
 * Example: Native OpenAI SDK Function Calling with Agentum
 *
 * Demonstrates how to use Agentum with the official OpenAI SDK (without LangChain or external frameworks).
 *
 * Requirements:
 *   npm install openai agentum-langchain
 *
 * Run with:
 *   export OPENAI_API_KEY="sk-..."
 *   bun run examples/openai-native-agent.ts
 */

import OpenAI from "openai";
import { AgentumClient, getAgentumOpenAITools } from "../packages/agentum-langchain/src/index.js";

async function main() {
  console.log("=== Agentum + Native OpenAI Function Calling ===");

  const client = new AgentumClient({
    baseUrl: process.env.AGENTUM_URL || "https://agentum.asimplek.cloud",
    // Optional: Pass EVM private key for autonomous x402 settlement on Base USDC:
    // privateKey: process.env.BASE_PRIVATE_KEY,
  });

  const tools = getAgentumOpenAITools();

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.warn("Notice: OPENAI_API_KEY is not set. Executing direct client calls:\n");
    console.log("1. Resolving 'Revolut Bank UAB' (Lithuania / EU):");
    const revolut = await client.resolveEntity({ query: "Revolut Bank UAB", jurisdiction: "LT", verifyVat: true });
    console.log(JSON.stringify(revolut, null, 2));
    return;
  }

  const openai = new OpenAI({ apiKey });
  const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
    {
      role: "user",
      content: "Please check company registration and sanctions for 'Atlassian' in Australia (ABN) and 'Nestle' in Switzerland (UID).",
    },
  ];

  console.log("Calling OpenAI chat completion with Agentum tools...\n");
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages,
    tools,
  });

  const responseMessage = response.choices[0].message;
  messages.push(responseMessage);

  if (responseMessage.tool_calls && responseMessage.tool_calls.length > 0) {
    for (const toolCall of responseMessage.tool_calls) {
      if (toolCall.type !== "function") continue;
      const fnName = toolCall.function.name;
      const args = JSON.parse(toolCall.function.arguments);
      console.log(`Executing tool call: ${fnName}(${JSON.stringify(args)})`);

      let result: any = null;
      if (fnName === "resolve_entity") {
        result = await client.resolveEntity(args);
      } else if (fnName === "verify_eu_vat") {
        result = await client.verifyVat(args);
      } else if (fnName === "screen_sanctions") {
        result = await client.screenSanctions(args);
      }

      messages.push({
        role: "tool",
        tool_call_id: toolCall.id,
        content: JSON.stringify(result),
      });
    }

    const finalResponse = await openai.chat.completions.create({
      model: "gpt-4o",
      messages,
    });

    console.log("\n=== Final Response ===");
    console.log(finalResponse.choices[0].message.content);
  } else {
    console.log(responseMessage.content);
  }
}

main().catch(console.error);
