/**
 * Agentum — x402-paying HTTP client built from an AgentKit wallet signer.
 *
 * The client POSTs to the Agentum REST API. When the server answers HTTP 402 with a
 * `PAYMENT-REQUIRED` header (x402 v2, exact scheme, USDC on Base), `@x402/fetch`
 * signs an EIP-3009 authorization with the wallet signer and retries with a
 * `PAYMENT-SIGNATURE` header. A `PAYMENT-RESPONSE` receipt header on the paid
 * response is decoded and attached to the result as `x402Receipt`.
 */

import { ExactEvmScheme } from "@x402/evm";
import { wrapFetchWithPayment, x402Client, decodePaymentResponseHeader } from "@x402/fetch";
import type { ClientEvmSigner } from "@x402/evm";
import type { PaymentRequirements } from "@x402/core/types";

export const DEFAULT_BASE_URL = "https://agentum.asimplek.cloud";
export const DEFAULT_MAX_PRICE_USD = 0.02;
export const DEFAULT_TIMEOUT_MS = 30_000;

/** Payment networks the Agentum server can be configured for. */
export type AgentumNetworkId = "base-mainnet" | "base-sepolia";

export const NETWORK_TO_CAIP2: Record<AgentumNetworkId, `eip155:${string}`> = {
  "base-mainnet": "eip155:8453",
  "base-sepolia": "eip155:84532",
};

export const NETWORK_TO_CHAIN_ID: Record<AgentumNetworkId, string> = {
  "base-mainnet": "8453",
  "base-sepolia": "84532",
};

/** USDC has 6 decimals on every EVM chain the server supports. */
const USDC_DECIMALS = 6;
/**
 * A pre-payment guard hook, e.g. the result of `createAgentumGuard()` from `agentum-x402-guard`.
 * Same shape as @x402/core's BeforePaymentCreationHook: return `{ abort: true, reason }` to stop signing.
 */
export type PaymentGuard = (context: { selectedRequirements: PaymentRequirements }) => Promise<void | { abort: true; reason: string }>;

const REFUSAL_MARKER = "[agentum-agentkit:max-price-exceeded]";

export interface AgentumClientOptions {
  /** Agentum server base URL. Defaults to https://agentum.asimplek.cloud. */
  baseUrl?: string;
  /** Highest price (USD) the agent may pay for a single call. Defaults to 0.02. */
  maxPriceUsd?: number;
  /** Per-request timeout in milliseconds (covers the paid retry as well). Defaults to 30000. */
  timeoutMs?: number;
  /** Payment network the server is configured for. Defaults to "base-mainnet". */
  network?: AgentumNetworkId;
  /** Custom fetch implementation (tests, proxies). Defaults to globalThis.fetch. */
  fetchImpl?: typeof fetch;
  /** Identifier sent as X-Agent-Id so the server can meter the free tier. */
  agentId?: string;
  /**
   * Optional pre-payment guard installed on the paying client (runs after the maxPriceUsd check,
   * before anything is signed). Pass `createAgentumGuard()` from `agentum-x402-guard` to screen
   * every payTo address against OFAC and abort on an exact match.
   */
  guard?: PaymentGuard;
}

/** Thrown when the server asks for more than `maxPriceUsd` for a single call. */
export class AgentumPaymentRefusedError extends Error {
  constructor(
    readonly requestedUsd: number,
    readonly maxPriceUsd: number,
    readonly requirements: PaymentRequirements
  ) {
    super(
      `Agentum asked for $${requestedUsd.toFixed(6)} USDC for this call but maxPriceUsd is $${maxPriceUsd}. ` +
        `Raise maxPriceUsd in agentumActionProvider({ maxPriceUsd }) to allow it.`
    );
    this.name = "AgentumPaymentRefusedError";
  }
}

/** Thrown for any non-2xx response that was not resolved by payment. */
export class AgentumApiError extends Error {
  constructor(readonly status: number, readonly body: string, readonly endpoint: string) {
    super(`Agentum API error HTTP ${status} on ${endpoint}: ${body || "(empty body)"}`);
    this.name = "AgentumApiError";
  }
}

export interface X402Receipt {
  success: boolean;
  transaction?: string;
  network?: string;
  payer?: string;
  [key: string]: unknown;
}

export interface AgentumResponse {
  result: unknown;
  /** Present only when the call was settled via x402 (free-tier calls carry no receipt). */
  receipt?: X402Receipt;
}

export function atomicUsdcToUsd(amount: string): number {
  const atomic = BigInt(amount);
  return Number(atomic) / 10 ** USDC_DECIMALS;
}

/**
 * Builds an x402Client for one signer that refuses to pay more than `maxPriceUsd`.
 * Exported so tests (and operators) can inspect the policy without an HTTP round trip.
 */
export function createPaymentClient(
  signer: ClientEvmSigner,
  network: AgentumNetworkId,
  maxPriceUsd: number,
  guard?: PaymentGuard
): x402Client {
  const client = new x402Client();
  client.register(NETWORK_TO_CAIP2[network], new ExactEvmScheme(signer));
  client.onBeforePaymentCreation(async ({ selectedRequirements }) => {
    const requestedUsd = priceInUsd(selectedRequirements);
    if (requestedUsd > maxPriceUsd) {
      return {
        abort: true,
        reason: `${REFUSAL_MARKER}${JSON.stringify({ requestedUsd, maxPriceUsd, requirements: selectedRequirements })}`,
      };
    }
  });
  if (guard) client.onBeforePaymentCreation(async (context) => guard(context));
  return client;
}

function priceInUsd(requirements: PaymentRequirements): number {
  const declared = requirements.extra?.priceUsd;
  if (typeof declared === "string" || typeof declared === "number") {
    const parsed = Number(declared);
    if (Number.isFinite(parsed)) return parsed;
  }
  return atomicUsdcToUsd(requirements.amount);
}

function rethrowRefusal(error: unknown): never {
  const message = error instanceof Error ? error.message : String(error);
  const index = message.indexOf(REFUSAL_MARKER);
  if (index >= 0) {
    try {
      const payload = JSON.parse(message.slice(index + REFUSAL_MARKER.length));
      throw new AgentumPaymentRefusedError(payload.requestedUsd, payload.maxPriceUsd, payload.requirements);
    } catch (parsed) {
      if (parsed instanceof AgentumPaymentRefusedError) throw parsed;
    }
  }
  throw error;
}

export class AgentumClient {
  readonly baseUrl: string;
  readonly maxPriceUsd: number;
  readonly timeoutMs: number;
  readonly network: AgentumNetworkId;
  readonly agentId: string;
  readonly guard?: PaymentGuard;
  private readonly baseFetch: typeof fetch;
  private readonly payingFetchByAddress = new Map<string, ReturnType<typeof wrapFetchWithPayment>>();

  constructor(options: AgentumClientOptions = {}) {
    this.baseUrl = (options.baseUrl ?? DEFAULT_BASE_URL).replace(/\/$/, "");
    this.maxPriceUsd = options.maxPriceUsd ?? DEFAULT_MAX_PRICE_USD;
    this.timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS;
    this.network = options.network ?? "base-mainnet";
    this.agentId = options.agentId ?? `agentkit-${Math.random().toString(36).slice(2, 10)}`;
    this.guard = options.guard;
    this.baseFetch = options.fetchImpl ?? ((input, init) => fetch(input, init));
    if (!(this.maxPriceUsd >= 0)) throw new Error("maxPriceUsd must be a non-negative number");
  }

  /** Returns a fetch that pays 402 challenges with `signer`, cached per wallet address. */
  payingFetchFor(signer: ClientEvmSigner): ReturnType<typeof wrapFetchWithPayment> {
    const key = signer.address.toLowerCase();
    let paying = this.payingFetchByAddress.get(key);
    if (!paying) {
      paying = wrapFetchWithPayment(this.baseFetch, createPaymentClient(signer, this.network, this.maxPriceUsd, this.guard));
      this.payingFetchByAddress.set(key, paying);
    }
    return paying;
  }

  async post(endpoint: string, body: unknown, signer: ClientEvmSigner): Promise<AgentumResponse> {
    const url = `${this.baseUrl}${endpoint}`;
    const payingFetch = this.payingFetchFor(signer);
    let response: Response;
    try {
      response = await payingFetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-Agent-Id": this.agentId,
        },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(this.timeoutMs),
      });
    } catch (error) {
      rethrowRefusal(error);
    }

    if (!response.ok) {
      const text = await response.text().catch(() => "");
      throw new AgentumApiError(response.status, text, endpoint);
    }

    const result = await response.json();
    const receiptHeader = response.headers.get("PAYMENT-RESPONSE");
    if (!receiptHeader) return { result };
    try {
      const receipt = decodePaymentResponseHeader(receiptHeader) as X402Receipt;
      return { result, receipt };
    } catch {
      return { result };
    }
  }
}
