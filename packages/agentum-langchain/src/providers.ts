/**
 * Agentum — Adapters for Other AI Providers (Vercel AI SDK & OpenAI Native Function Calling)
 */

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
import {
  BatchResolveSchema,
  CheckVendorSchema,
  ResolveEntitySchema,
  ScreenSanctionsSchema,
  VerifyBankPayeeSchema,
  VerifyVatSchema,
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
        "Authoritative deterministic corporate identity resolution across global registries (UK Companies House, Swiss ZEFIX, Singapore ACRA, US SEC EDGAR, European Registries, and Worldwide GLEIF LEI).",
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
    check_vendor: {
      description:
        "All-in-one autonomous KYB vendor due diligence tool. Concurrently resolves corporate identity across global registers, validates European Commission VIES VAT numbers, and screens global sanctions (OFAC/EU/UN). Returns a definitive compliance verdict (APPROVED, FLAGGED_FOR_REVIEW, or REJECTED) with a full audit trail in a single round trip.",
      parameters: CheckVendorSchema,
      execute: async (args: CheckVendorInput) => client.checkVendor(args),
    },
    verify_bank_payee: {
      description:
        "Validates International Bank Account Numbers (IBAN) using ISO 13616 specifications and MOD-97 checksum validation. Verifies whether the issuing country matches the expected corporate jurisdiction to prevent invoice fraud and redirection attacks.",
      parameters: VerifyBankPayeeSchema,
      execute: async (args: VerifyBankPayeeInput) => client.verifyBankPayee(args),
    },
    batch_resolve: {
      description:
        "Concurrently resolves multiple corporate entity names, registration numbers, or domains across national registries. Optimized for agent data pipelines, CSV processing, and batch supplier onboarding.",
      parameters: BatchResolveSchema,
      execute: async (args: BatchResolveInput) => client.batchResolve(args),
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
          "Authoritative deterministic corporate identity resolution across global registries (UK Companies House, Swiss ZEFIX, Singapore ACRA, US SEC EDGAR, European Registries, and Worldwide GLEIF LEI).",
        parameters: {
          type: "object",
          properties: {
            query: {
              type: "string",
              description:
                "Company legal name, registration number (UK CRN, Swiss UID, Singapore UEN, Lithuanian JAR, US SEC CIK/EIN), LEI, EU VAT number, or corporate domain.",
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
            includeCompanyEvents: {
              type: "boolean",
              description: "Include recent official company notices where available (France BODACC); dated evidence, not a current-status verdict.",
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
    {
      type: "function" as const,
      function: {
        name: "check_vendor",
        description:
          "All-in-one autonomous KYB vendor due diligence tool. Concurrently resolves corporate identity across global registers, validates European Commission VIES VAT numbers, and screens global sanctions (OFAC/EU/UN). Returns a definitive compliance verdict (APPROVED, FLAGGED_FOR_REVIEW, or REJECTED) with a full audit trail in a single round trip.",
        parameters: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "Legal or trade name of the vendor to verify.",
            },
            country: {
              type: "string",
              description: "Optional 2-letter ISO country code (e.g. 'DE', 'GB', 'US', 'CH', 'AU', 'SG').",
            },
            vatNumber: {
              type: "string",
              description: "Optional EU VAT number including country prefix (e.g. 'DE129274202').",
            },
            registrationNumber: {
              type: "string",
              description: "Optional national registration number (CRN, UID, ABN, UEN, CIK, LEI).",
            },
            domain: {
              type: "string",
              description: "Optional primary corporate web domain (e.g. 'siemens.com').",
            },
          },
          required: ["name"],
        },
      },
    },
    {
      type: "function" as const,
      function: {
        name: "verify_bank_payee",
        description:
          "Validates International Bank Account Numbers (IBAN) using ISO 13616 specifications and MOD-97 checksum validation. Verifies whether the issuing country matches the expected corporate jurisdiction to prevent invoice fraud and redirection attacks.",
        parameters: {
          type: "object",
          properties: {
            iban: {
              type: "string",
              description: "International Bank Account Number (IBAN), spaces permitted.",
            },
            expectedCountry: {
              type: "string",
              description: "Expected 2-letter ISO country code of the corporate payee.",
            },
            payeeName: {
              type: "string",
              description: "Optional payee legal name to check against bank account jurisdiction.",
            },
          },
          required: ["iban"],
        },
      },
    },
    {
      type: "function" as const,
      function: {
        name: "batch_resolve",
        description:
          "Concurrently resolves multiple corporate entity names, registration numbers, or domains across national registries. Optimized for agent data pipelines, CSV processing, and batch supplier onboarding.",
        parameters: {
          type: "object",
          properties: {
            items: {
              type: "array",
              description: "List of entities to resolve concurrently (1 to 25 items).",
              items: {
                type: "object",
                properties: {
                  query: {
                    type: "string",
                    description: "Company name, registration number, or domain to resolve.",
                  },
                  country: {
                    type: "string",
                    description: "Optional 2-letter ISO country code.",
                  },
                },
                required: ["query"],
              },
            },
          },
          required: ["items"],
        },
      },
    },
  ];
}
