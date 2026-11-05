/**
 * Agentum — Coinbase AgentKit ActionProvider.
 *
 * Seven actions, one per Agentum tool. Each action POSTs to the Agentum REST API
 * through an x402-enabled fetch that signs USDC payments with the AgentKit
 * wallet provider's signer when the server answers HTTP 402.
 */

import "reflect-metadata";
import { ActionProvider, CreateAction, EvmWalletProvider } from "@coinbase/agentkit";
import type { Network } from "@coinbase/agentkit";
import type { z } from "zod";
import {
  AgentumClient,
  NETWORK_TO_CHAIN_ID,
  type AgentumClientOptions,
  type AgentumNetworkId,
  type AgentumResponse,
} from "./client.js";
import {
  BatchResolveSchema,
  CheckVendorSchema,
  ResolveEntitySchema,
  ScreenAddressSchema,
  ScreenSanctionsSchema,
  VerifyBankPayeeSchema,
  VerifyVatSchema,
} from "./schemas.js";

export type AgentumActionProviderOptions = AgentumClientOptions;

export const AGENTUM_ENDPOINTS = {
  resolve_entity: "/v1/entity/resolve",
  verify_eu_vat: "/v1/entity/vat-verify",
  screen_sanctions: "/v1/entity/sanctions-screen",
  check_vendor: "/v1/compliance/check-vendor",
  verify_bank_payee: "/v1/compliance/verify-bank-payee",
  batch_resolve: "/v1/entity/batch-resolve",
  screen_address: "/v1/compliance/screen-address",
} as const;

export type AgentumActionName = keyof typeof AGENTUM_ENDPOINTS;

function render(response: AgentumResponse): string {
  const { result, receipt } = response;
  if (receipt && result && typeof result === "object" && !Array.isArray(result)) {
    return JSON.stringify({ ...(result as Record<string, unknown>), x402Receipt: receipt }, null, 2);
  }
  return JSON.stringify(result, null, 2);
}

/**
 * AgentumActionProvider exposes Agentum's compliance tools to AgentKit agents.
 *
 * Action names are prefixed by AgentKit with the class name, e.g.
 * `AgentumActionProvider_resolve_entity`.
 */
export class AgentumActionProvider extends ActionProvider<EvmWalletProvider> {
  readonly client: AgentumClient;
  readonly network: AgentumNetworkId;

  constructor(options: AgentumActionProviderOptions = {}) {
    super("agentum", []);
    this.client = new AgentumClient(options);
    this.network = this.client.network;
  }

  /** True for the Base network the server is configured for (base-mainnet by default). */
  supportsNetwork(network: Network): boolean {
    if (network.protocolFamily !== "evm") return false;
    if (network.networkId) return network.networkId === this.network;
    if (network.chainId) return String(network.chainId) === NETWORK_TO_CHAIN_ID[this.network];
    return false;
  }

  private async call(walletProvider: EvmWalletProvider, name: AgentumActionName, body: unknown): Promise<string> {
    const signer = walletProvider.toSigner();
    const response = await this.client.post(AGENTUM_ENDPOINTS[name], body, signer);
    return render(response);
  }

  @CreateAction({
    name: "resolve_entity",
    description: `Authoritative, deterministic corporate identity resolution across global registries (UK Companies House, Swiss ZEFIX, Singapore ACRA, US SEC EDGAR, EU national registers, worldwide GLEIF LEI).
Input: a company name, registration number, LEI, EU VAT number or corporate domain, plus an optional 2-letter jurisdiction.
Output: JSON with registration number, legal form, status, registered address, tax IDs, LEI and optional sanctions / VAT / ownership data.
Cost: $0.005 USDC per call on Base after the free tier; the payment is signed from this agent's wallet automatically.`,
    schema: ResolveEntitySchema,
  })
  async resolveEntity(walletProvider: EvmWalletProvider, args: z.infer<typeof ResolveEntitySchema>): Promise<string> {
    return this.call(walletProvider, "resolve_entity", args);
  }

  @CreateAction({
    name: "verify_eu_vat",
    description: `Validates an EU VAT number against the live European Commission VIES service.
Input: full VAT number including the 2-letter country prefix (e.g. DE129274202).
Output: JSON with validity, registered legal name and address, request timestamp and any linked registry entity.
Cost: $0.005 USDC per call on Base after the free tier.`,
    schema: VerifyVatSchema,
  })
  async verifyEuVat(walletProvider: EvmWalletProvider, args: z.infer<typeof VerifyVatSchema>): Promise<string> {
    return this.call(walletProvider, "verify_eu_vat", args);
  }

  @CreateAction({
    name: "screen_sanctions",
    description: `Screens a company or individual against the US Treasury OFAC SDN list, EU Consolidated Financial Sanctions and the UN Security Council Consolidated list using homoglyph normalisation and trigram similarity.
Input: a name, optional country filter and optional similarity threshold (default 0.75).
Output: JSON with hit flag, ranked matches, list sources and screening timestamp.
Cost: $0.005 USDC per call on Base after the free tier.`,
    schema: ScreenSanctionsSchema,
  })
  async screenSanctions(walletProvider: EvmWalletProvider, args: z.infer<typeof ScreenSanctionsSchema>): Promise<string> {
    return this.call(walletProvider, "screen_sanctions", args);
  }

  @CreateAction({
    name: "check_vendor",
    description: `One-shot KYB vendor due diligence: resolves the vendor across global registries, validates its EU VAT number via VIES and screens OFAC/EU/UN sanctions concurrently.
Input: vendor name plus optional country, VAT number, registration number and domain.
Output: JSON verdict (APPROVED, FLAGGED_FOR_REVIEW or REJECTED), risk level, confidence and a full audit trail.
Cost: $0.010 USDC per call on Base after the free tier.`,
    schema: CheckVendorSchema,
  })
  async checkVendor(walletProvider: EvmWalletProvider, args: z.infer<typeof CheckVendorSchema>): Promise<string> {
    return this.call(walletProvider, "check_vendor", args);
  }

  @CreateAction({
    name: "verify_bank_payee",
    description: `Validates an IBAN (ISO 13616 structure and MOD-97 checksum) and checks that the issuing country matches the expected payee jurisdiction to catch invoice redirection fraud. Where a public register supports it, verifies account ownership against the payee tax ID.
Input: IBAN plus optional expected country, payee name and payee tax ID.
Output: JSON with validity, normalised IBAN, country and bank code, country match, ownership verification and issues.
Cost: $0.003 USDC per call on Base after the free tier.`,
    schema: VerifyBankPayeeSchema,
  })
  async verifyBankPayee(walletProvider: EvmWalletProvider, args: z.infer<typeof VerifyBankPayeeSchema>): Promise<string> {
    return this.call(walletProvider, "verify_bank_payee", args);
  }

  @CreateAction({
    name: "batch_resolve",
    description: `Resolves up to 25 corporate entities concurrently across global registries. Use it for supplier onboarding lists, CSV pipelines and portfolio screening instead of calling resolve_entity in a loop.
Input: items[] of { query, country? } (1 to 25 entries).
Output: JSON with per-item resolution results, totals and confidence scores.
Cost: $0.025 USDC per call on Base after the free tier (this is above the default maxPriceUsd of 0.02; raise it to enable batch calls).`,
    schema: BatchResolveSchema,
  })
  async batchResolve(walletProvider: EvmWalletProvider, args: z.infer<typeof BatchResolveSchema>): Promise<string> {
    return this.call(walletProvider, "batch_resolve", args);
  }

  @CreateAction({
    name: "screen_address",
    description: `Use when about to send funds or pay a crypto address: checks it against the official OFAC SDN digital-currency-address entries (exact match, EVM case-insensitive).
Input: an address (EVM, Bitcoin, Tron, Solana, Litecoin, ...) plus an optional chain hint.
Output: JSON with riskLevel (EXACT_MATCH, CLEAR or UNKNOWN), matched entity, programs and index coverage. UNKNOWN is not CLEAR. Not behavioural or cluster risk.
Cost: $0.002 USDC per call on Base after the free tier.`,
    schema: ScreenAddressSchema,
  })
  async screenAddress(walletProvider: EvmWalletProvider, args: z.infer<typeof ScreenAddressSchema>): Promise<string> {
    return this.call(walletProvider, "screen_address", args);
  }
}

/** Factory: `agentumActionProvider({ maxPriceUsd: 0.03 })`. All options are optional. */
export const agentumActionProvider = (options?: AgentumActionProviderOptions): AgentumActionProvider =>
  new AgentumActionProvider(options);
