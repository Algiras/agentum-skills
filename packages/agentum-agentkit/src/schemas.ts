/**
 * Agentum — AgentKit action input schemas.
 *
 * These mirror the REST request bodies accepted by the Agentum HTTP API
 * (see https://agentum.asimplek.cloud/openapi.json and src/domain/entity.ts in the
 * Agentum repository). Field names are forwarded to the server unchanged.
 */

import { z } from "zod";

export const ResolveEntitySchema = z
  .object({
    query: z
      .string()
      .min(1)
      .describe(
        "Company legal name, registration number (UK CRN, Swiss UID, Singapore UEN, Lithuanian JAR, US SEC CIK/EIN), LEI (20-character ISO 17442), EU VAT number, or corporate domain."
      ),
    jurisdiction: z
      .string()
      .optional()
      .describe(
        "Optional 2-letter ISO 3166-1 alpha-2 country code (e.g. 'GB', 'CH', 'SG', 'US', 'LT', 'DE', 'FR'). Inferred automatically if omitted."
      ),
    country: z.string().optional().describe("Alias for jurisdiction."),
    checkSanctions: z
      .boolean()
      .optional()
      .describe("Set true to screen the resolved entity against OFAC SDN, EU Financial Sanctions and UN Consolidated lists."),
    verifyVat: z
      .boolean()
      .optional()
      .describe("Set true to validate an associated EU VAT number against the live European Commission VIES service."),
    includeParent: z
      .boolean()
      .optional()
      .describe("Include direct and ultimate parent LEI relationships from GLEIF when available."),
    includeOfficers: z
      .boolean()
      .optional()
      .describe("Include corporate directors, executives and officers when the registry exposes them."),
    includeBeneficialOwners: z
      .boolean()
      .optional()
      .describe("Include current beneficial owners (e.g. UK Persons with Significant Control) when available."),
    includeCompanyEvents: z
      .boolean()
      .optional()
      .describe(
        "Include recent official company notices where available (France BODACC); notices are dated evidence, not a current-status verdict."
      ),
    allowPaidSources: z
      .boolean()
      .optional()
      .describe("Allow fallback to commercial aggregators when official registries are paywalled or unavailable."),
  })
  .strip()
  .describe("Input for resolving a single corporate entity across global registries.");

export const VerifyVatSchema = z
  .object({
    vatNumber: z
      .string()
      .min(4)
      .describe("Full EU VAT number including the 2-letter country prefix (e.g. 'DE129274202', 'IE6388047V', 'LT100004278519')."),
  })
  .strip()
  .describe("Input for live EU VIES VAT validation.");

export const ScreenSanctionsSchema = z
  .object({
    name: z
      .string()
      .min(1)
      .describe("Legal entity name or individual full name to screen against OFAC SDN, EU Financial Sanctions and UN Consolidated lists."),
    country: z.string().optional().describe("Optional 2-letter ISO country code to narrow candidate matches (e.g. 'RU', 'BY', 'IR')."),
    registrationNumber: z.string().optional().describe("Optional company registration number, LEI or tax ID."),
    threshold: z
      .number()
      .min(0.1)
      .max(1)
      .optional()
      .describe("Fuzzy similarity threshold between 0.1 and 1.0 (default 0.75). Lower values catch looser transliteration matches."),
  })
  .strip()
  .describe("Input for sanctions screening.");

export const CheckVendorSchema = z
  .object({
    name: z.string().min(1).describe("Legal or trade name of the vendor / counterparty to verify."),
    country: z.string().optional().describe("Optional 2-letter ISO country code (e.g. 'DE', 'GB', 'US', 'CH', 'SG')."),
    vatNumber: z.string().optional().describe("Optional EU VAT number including country prefix (e.g. 'DE129274202')."),
    registrationNumber: z.string().optional().describe("Optional national registration number (CRN, UID, UEN, CIK or LEI)."),
    domain: z.string().optional().describe("Optional primary corporate web domain (e.g. 'siemens.com')."),
  })
  .strip()
  .describe("Input for a one-shot KYB vendor due-diligence check.");

export const VerifyBankPayeeSchema = z
  .object({
    iban: z.string().min(10).describe("International Bank Account Number (IBAN), spaces permitted (e.g. 'DE89 3704 0044 0532 0130 00')."),
    expectedCountry: z
      .string()
      .optional()
      .describe("Expected 2-letter ISO country code of the payee's corporate jurisdiction, used to detect invoice redirection fraud."),
    payeeName: z.string().optional().describe("Optional legal payee name to cross-check against the bank account jurisdiction."),
    payeeTaxId: z
      .string()
      .optional()
      .describe("Optional national tax / business registration number (e.g. Polish NIP, Czech ICO) to verify account ownership against public registers."),
  })
  .strip()
  .describe("Input for IBAN and payee verification.");

export const BatchResolveSchema = z
  .object({
    items: z
      .array(
        z.object({
          query: z.string().min(1).describe("Company name, registration number or domain to resolve."),
          country: z.string().optional().describe("Optional 2-letter ISO country code."),
          jurisdiction: z.string().optional().describe("Alias for country."),
        })
      )
      .min(1)
      .max(25)
      .describe("Entities to resolve concurrently (1 to 25 items)."),
  })
  .strip()
  .describe("Input for batch entity resolution.");

export const ScreenAddressSchema = z
  .object({
    address: z
      .string()
      .min(1)
      .describe("Blockchain address to screen against the OFAC SDN digital-currency-address entries (EVM 0x..., Bitcoin, Tron, Solana, Litecoin, ...)."),
    chain: z
      .enum(["evm", "bitcoin", "tron", "solana", "litecoin", "other"])
      .optional()
      .describe("Optional chain family hint. EVM addresses apply to every EVM chain (Base, Arbitrum, ...); omit to auto-detect."),
  })
  .strip()
  .describe("Input for pre-payment crypto address sanctions screening.");

export type ScreenAddressInput = z.infer<typeof ScreenAddressSchema>;
export type ResolveEntityInput = z.infer<typeof ResolveEntitySchema>;
export type VerifyVatInput = z.infer<typeof VerifyVatSchema>;
export type ScreenSanctionsInput = z.infer<typeof ScreenSanctionsSchema>;
export type CheckVendorInput = z.infer<typeof CheckVendorSchema>;
export type VerifyBankPayeeInput = z.infer<typeof VerifyBankPayeeSchema>;
export type BatchResolveInput = z.infer<typeof BatchResolveSchema>;
