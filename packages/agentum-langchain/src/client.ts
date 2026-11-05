/**
 * Agentum — Client with Dual-402 Autonomous Micropayment Support
 */

import { ExactEvmScheme } from "@x402/evm";
import { x402Client, wrapFetchWithPayment } from "@x402/fetch";
import { privateKeyToAccount } from "viem/accounts";

export interface AgentumClientConfig {
  baseUrl?: string;
  agentId?: string;
  privateKey?: string;
  network?: string;
  timeoutMs?: number;
  fetchImpl?: typeof fetch;
}

export interface ResolveEntityInput {
  query: string;
  jurisdiction?: string;
  country?: string;
  jurisdictionHint?: string;
  checkSanctions?: boolean;
  verifyVat?: boolean;
  includeCompanyEvents?: boolean;
}

export interface VerifyVatInput {
  vatNumber: string;
}

export interface ScreenSanctionsInput {
  name: string;
  country?: string;
  threshold?: number;
}

export interface CheckVendorInput {
  name: string;
  country?: string;
  vatNumber?: string;
  registrationNumber?: string;
  domain?: string;
}

export interface VerifyBankPayeeInput {
  iban: string;
  expectedCountry?: string;
  payeeName?: string;
}

export interface BatchResolveInput {
  items: Array<{ query: string; country?: string; jurisdiction?: string }>;
}

export class AgentumClient {
  readonly baseUrl: string;
  readonly agentId: string;
  private readonly fetchFn: typeof fetch;

  constructor(config: AgentumClientConfig = {}) {
    this.baseUrl = (config.baseUrl || "https://agentum.asimplek.cloud").replace(/\/$/, "");
    this.agentId = config.agentId || `langchain-agent-${Math.random().toString(36).slice(2, 10)}`;

    const baseFetch = config.fetchImpl || fetch;

    if (config.privateKey) {
      const formattedKey = (
        config.privateKey.startsWith("0x") ? config.privateKey : `0x${config.privateKey}`
      ) as `0x${string}`;
      const account = privateKeyToAccount(formattedKey);
      const client = new x402Client();
      client.register("eip155:*", new ExactEvmScheme(account));
      this.fetchFn = wrapFetchWithPayment(baseFetch, client);
    } else {
      this.fetchFn = baseFetch;
    }
  }

  private async postJson(endpoint: string, body: unknown): Promise<any> {
    const url = `${this.baseUrl}${endpoint}`;
    const res = await this.fetchFn(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Agent-Id": this.agentId,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errorText = await res.text().catch(() => "");
      throw new Error(`Agentum API error HTTP ${res.status}: ${errorText || res.statusText}`);
    }

    return await res.json();
  }

  async resolveEntity(input: ResolveEntityInput): Promise<any> {
    const payload = {
      query: input.query,
      jurisdiction: input.jurisdiction || input.country || input.jurisdictionHint,
      checkSanctions: input.checkSanctions ?? false,
      verifyVat: input.verifyVat ?? false,
      ...(input.includeCompanyEvents !== undefined ? { includeCompanyEvents: input.includeCompanyEvents } : {}),
    };
    return this.postJson("/v1/entity/resolve", payload);
  }

  async verifyVat(input: VerifyVatInput): Promise<any> {
    return this.postJson("/v1/entity/vat-verify", { vatNumber: input.vatNumber });
  }

  async screenSanctions(input: ScreenSanctionsInput): Promise<any> {
    return this.postJson("/v1/entity/sanctions-screen", {
      name: input.name,
      country: input.country,
      threshold: input.threshold ?? 0.75,
    });
  }

  async checkVendor(input: CheckVendorInput): Promise<any> {
    return this.postJson("/v1/compliance/check-vendor", input);
  }

  async verifyBankPayee(input: VerifyBankPayeeInput): Promise<any> {
    return this.postJson("/v1/compliance/verify-bank-payee", input);
  }

  async batchResolve(input: BatchResolveInput): Promise<any> {
    return this.postJson("/v1/entity/batch-resolve", input);
  }
}
