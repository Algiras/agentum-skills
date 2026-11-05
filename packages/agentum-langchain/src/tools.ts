/**
 * Agentum — LangChain Structured Tools & Toolkit
 */

import { tool, StructuredTool, BaseToolkit } from "@langchain/core/tools";
import { z } from "zod";
import {
  AgentumClient,
  type AgentumClientConfig,
  type BatchResolveInput,
  type CheckVendorInput,
  type ResolveEntityInput,
  type ScreenSanctionsInput,
  type VerifyBankPayeeInput,
  type VerifyVatInput,
} from "./client.js";

export const ResolveEntitySchema = z.object({
  includeCompanyEvents: z.boolean().optional().describe("Include recent official company notices where available (France BODACC); notices do not establish current status or ownership."),
  query: z
    .string()
    .describe(
      "Company legal name, registration number (UK CRN, Swiss UID, Singapore UEN, Lithuanian JAR, US SEC CIK/EIN), LEI (20-character ISO 17442), EU VAT number, or corporate domain."
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

export const CheckVendorSchema = z.object({
  name: z.string().describe("Legal or trade name of the vendor to verify."),
  country: z
    .string()
    .optional()
    .describe("Optional 2-letter ISO country code (e.g. 'DE', 'GB', 'US', 'CH', 'AU', 'SG')."),
  vatNumber: z
    .string()
    .optional()
    .describe("Optional EU VAT number including country prefix (e.g. 'DE129274202')."),
  registrationNumber: z
    .string()
    .optional()
    .describe("Optional company number (UK CRN, Swiss UID, Singapore UEN, US CIK, LEI)."),
  domain: z.string().optional().describe("Optional primary corporate web domain (e.g. 'siemens.com')."),
});

export const VerifyBankPayeeSchema = z.object({
  iban: z
    .string()
    .describe("International Bank Account Number (IBAN), spaces permitted (e.g. 'DE89370400440532013000')."),
  expectedCountry: z
    .string()
    .optional()
    .describe("Expected 2-letter ISO country code of the corporate payee to verify against invoice fraud."),
  payeeName: z.string().optional().describe("Optional payee legal name to check against bank account jurisdiction."),
});

export const BatchResolveSchema = z.object({
  items: z
    .array(
      z.object({
        query: z.string().describe("Company name, registration number, or domain to resolve."),
        country: z.string().optional().describe("Optional 2-letter ISO country code."),
        jurisdiction: z.string().optional().describe("Alias for country."),
      })
    )
    .min(1)
    .max(25)
    .describe("List of entities to resolve concurrently (1 to 25 items)."),
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
        "Authoritative deterministic corporate identity resolution across global registries (UK Companies House, Swiss ZEFIX, Singapore ACRA, US SEC EDGAR, European Registries, and Worldwide GLEIF LEI). Resolves registration number, legal form, status, registered address, tax ID, and LEI.",
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

export function createCheckVendorTool(client: AgentumClient): StructuredTool {
  return tool(
    async (input: CheckVendorInput) => {
      const result = await client.checkVendor(input);
      return JSON.stringify(result, null, 2);
    },
    {
      name: "check_vendor",
      description:
        "All-in-one autonomous KYB vendor due diligence tool. Concurrently resolves corporate identity across global registers, validates European Commission VIES VAT numbers, and screens global sanctions (OFAC/EU/UN). Returns a definitive compliance verdict (APPROVED, FLAGGED_FOR_REVIEW, or REJECTED) with a full audit trail in a single round trip.",
      schema: CheckVendorSchema,
    }
  );
}

export function createVerifyBankPayeeTool(client: AgentumClient): StructuredTool {
  return tool(
    async (input: VerifyBankPayeeInput) => {
      const result = await client.verifyBankPayee(input);
      return JSON.stringify(result, null, 2);
    },
    {
      name: "verify_bank_payee",
      description:
        "Validates International Bank Account Numbers (IBAN) using ISO 13616 specifications and MOD-97 checksum validation. Verifies whether the issuing country matches the expected corporate jurisdiction to prevent invoice fraud and redirection attacks.",
      schema: VerifyBankPayeeSchema,
    }
  );
}

export function createBatchResolveTool(client: AgentumClient): StructuredTool {
  return tool(
    async (input: BatchResolveInput) => {
      const result = await client.batchResolve(input);
      return JSON.stringify(result, null, 2);
    },
    {
      name: "batch_resolve",
      description:
        "Concurrently resolves multiple corporate entity names, registration numbers, or domains across national registries. Optimized for agent data pipelines, CSV processing, and batch supplier onboarding.",
      schema: BatchResolveSchema,
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
    createCheckVendorTool(client),
    createVerifyBankPayeeTool(client),
    createBatchResolveTool(client),
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
