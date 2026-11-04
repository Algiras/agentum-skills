/**
 * Agentum — LangChain Structured Tools & Toolkit
 */

import { tool, StructuredTool, BaseToolkit } from "@langchain/core/tools";
import { z } from "zod";
import {
  AgentumClient,
  type AgentumClientConfig,
  type ResolveEntityInput,
  type VerifyVatInput,
  type ScreenSanctionsInput,
} from "./client.js";

export const ResolveEntitySchema = z.object({
  query: z
    .string()
    .describe(
      "Company legal name, registration number (UK CRN, Swiss UID, Australian ABN/ACN, Singapore UEN, Lithuanian JAR, US SEC CIK/EIN), LEI (20-character ISO 17442), EU VAT number, or corporate domain."
    ),
  jurisdiction: z
    .string()
    .optional()
    .describe(
      "Optional 2-letter ISO 3166-1 alpha-2 country code (e.g. 'GB', 'CH', 'AU', 'SG', 'US', 'LT', 'DE', 'FR'). Inferred automatically if omitted."
    ),
  checkSanctions: z
    .boolean()
    .optional()
    .describe(
      "Set true to perform integrated OFAC SDN, EU Financial Sanctions, and UN Consolidated screening on the resolved entity."
    ),
  verifyVat: z
    .boolean()
    .optional()
    .describe(
      "Set true to perform European Commission VIES live VAT validation if an EU VAT number is associated."
    ),
});

export const VerifyVatSchema = z.object({
  vatNumber: z
    .string()
    .describe(
      "Full European Union VAT number including 2-letter country prefix (e.g., 'DE129274202', 'IE6388047V', 'LT100004278519')."
    ),
});

export const ScreenSanctionsSchema = z.object({
  name: z
    .string()
    .describe(
      "Legal entity name or individual full name to screen against OFAC SDN, EU Financial Sanctions, and UN Security Council Consolidated lists."
    ),
  country: z
    .string()
    .optional()
    .describe("Optional 2-letter ISO country code to filter candidate matches (e.g. 'RU', 'BY', 'IR')."),
  threshold: z
    .number()
    .optional()
    .describe(
      "Fuzzy similarity score threshold between 0.0 and 1.0 (default: 0.75). Lower values catch looser phonetic/transliteration matches."
    ),
});

export function createResolveEntityTool(client: AgentumClient): StructuredTool {
  return tool(
    async (input: ResolveEntityInput) => {
      const result = await client.resolveEntity(input);
      return JSON.stringify(result, null, 2);
    },
    {
      name: "resolve_entity",
      description:
        "Authoritative deterministic corporate identity resolution across global registries (UK Companies House, Swiss ZEFIX, Australian ABR, Singapore ACRA, US SEC EDGAR, European Registries, and Worldwide GLEIF LEI). Resolves registration number, legal form, status, registered address, tax ID, and LEI.",
      schema: ResolveEntitySchema,
    }
  );
}

export function createVerifyVatTool(client: AgentumClient): StructuredTool {
  return tool(
    async (input: VerifyVatInput) => {
      const result = await client.verifyVat(input);
      return JSON.stringify(result, null, 2);
    },
    {
      name: "verify_eu_vat",
      description:
        "Validates any European Union VAT number against the live European Commission VIES database. Returns validity, registered legal name, registered address, and request timestamp.",
      schema: VerifyVatSchema,
    }
  );
}

export function createScreenSanctionsTool(client: AgentumClient): StructuredTool {
  return tool(
    async (input: ScreenSanctionsInput) => {
      const result = await client.screenSanctions(input);
      return JSON.stringify(result, null, 2);
    },
    {
      name: "screen_sanctions",
      description:
        "Screens companies and individuals against 26,650+ records from the US Treasury OFAC SDN List, EU Consolidated Financial Sanctions, and UN Security Council Consolidated List using Cyrillic/Greek homoglyph normalization and word-window trigram similarity.",
      schema: ScreenSanctionsSchema,
    }
  );
}

export function createAgentumTools(
  clientOrConfig?: AgentumClient | AgentumClientConfig
): StructuredTool[] {
  const client =
    clientOrConfig instanceof AgentumClient
      ? clientOrConfig
      : new AgentumClient(clientOrConfig);

  return [
    createResolveEntityTool(client),
    createVerifyVatTool(client),
    createScreenSanctionsTool(client),
  ];
}

export class AgentumToolkit extends BaseToolkit {
  tools: StructuredTool[];
  readonly client: AgentumClient;

  constructor(config?: AgentumClientConfig) {
    super();
    this.client = new AgentumClient(config);
    this.tools = createAgentumTools(this.client);
  }

  getTools(): StructuredTool[] {
    return this.tools;
  }
}
