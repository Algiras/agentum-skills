/**
 * Agentum — Adapters for Other AI Providers (Vercel AI SDK & OpenAI Native Function Calling)
 */

import {
  AgentumClient,
  type AgentumClientConfig,
  type ResolveEntityInput,
  type VerifyVatInput,
  type ScreenSanctionsInput,
} from "./client.js";
import {
  ResolveEntitySchema,
  VerifyVatSchema,
  ScreenSanctionsSchema,
} from "./tools.js";

/**
 * Generates tool definitions compatible with Vercel AI SDK (`ai` package).
 * Usage:
 * ```ts
 * import { generateText } from "ai";
 * import { openai } from "@ai-sdk/openai";
 * import { createAgentumAiTools } from "agentum-langchain";
 *
 * const result = await generateText({
 *   model: openai("gpt-4o"),
 *   tools: createAgentumAiTools(),
 *   prompt: "Verify Grab Holdings in Singapore and check sanctions",
 * });
 * ```
 */
export function createAgentumAiTools(clientOrConfig?: AgentumClient | AgentumClientConfig) {
  const client =
    clientOrConfig instanceof AgentumClient
      ? clientOrConfig
      : new AgentumClient(clientOrConfig);

  return {
    resolve_entity: {
      description:
        "Authoritative deterministic corporate identity resolution across global registries (UK Companies House, Swiss ZEFIX, Australian ABR, Singapore ACRA, US SEC EDGAR, European Registries, and Worldwide GLEIF LEI).",
      parameters: ResolveEntitySchema,
      execute: async (args: ResolveEntityInput) => client.resolveEntity(args),
    },
    verify_eu_vat: {
      description:
        "Validates any European Union VAT number against the live European Commission VIES database.",
      parameters: VerifyVatSchema,
      execute: async (args: VerifyVatInput) => client.verifyVat(args),
    },
    screen_sanctions: {
      description:
        "Screens companies and individuals against OFAC SDN, EU Financial Sanctions, and UN Security Council Consolidated lists.",
      parameters: ScreenSanctionsSchema,
      execute: async (args: ScreenSanctionsInput) => client.screenSanctions(args),
    },
  };
}

/**
 * Generates raw JSON Schema function definitions compatible with OpenAI, Anthropic, or Mistral native tool calling.
 */
export function getAgentumOpenAITools() {
  return [
    {
      type: "function" as const,
      function: {
        name: "resolve_entity",
        description:
          "Authoritative deterministic corporate identity resolution across global registries (UK Companies House, Swiss ZEFIX, Australian ABR, Singapore ACRA, US SEC EDGAR, European Registries, and Worldwide GLEIF LEI).",
        parameters: {
          type: "object",
          properties: {
            query: {
              type: "string",
              description:
                "Company legal name, registration number (UK CRN, Swiss UID, Australian ABN/ACN, Singapore UEN, Lithuanian JAR, US SEC CIK/EIN), LEI, EU VAT number, or corporate domain.",
            },
            jurisdiction: {
              type: "string",
              description:
                "Optional 2-letter ISO country code (e.g. 'GB', 'CH', 'AU', 'SG', 'US', 'LT'). Inferred automatically if omitted.",
            },
            checkSanctions: {
              type: "boolean",
              description: "Set true to perform integrated sanctions screening.",
            },
            verifyVat: {
              type: "boolean",
              description: "Set true to perform EU VIES VAT verification.",
            },
          },
          required: ["query"],
        },
      },
    },
    {
      type: "function" as const,
      function: {
        name: "verify_eu_vat",
        description:
          "Validates any European Union VAT number against the live European Commission VIES database.",
        parameters: {
          type: "object",
          properties: {
            vatNumber: {
              type: "string",
              description: "Full EU VAT number including country prefix (e.g., 'DE129274202').",
            },
          },
          required: ["vatNumber"],
        },
      },
    },
    {
      type: "function" as const,
      function: {
        name: "screen_sanctions",
        description:
          "Screens companies and individuals against OFAC SDN, EU Financial Sanctions, and UN Security Council Consolidated lists.",
        parameters: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "Legal entity name or individual full name to screen.",
            },
            country: {
              type: "string",
              description: "Optional 2-letter ISO country code to filter candidate matches.",
            },
            threshold: {
              type: "number",
              description: "Fuzzy similarity score threshold between 0.0 and 1.0 (default: 0.75).",
            },
          },
          required: ["name"],
        },
      },
    },
  ];
}
