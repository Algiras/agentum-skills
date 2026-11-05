/**
 * Test doubles: a fake AgentKit EVM wallet provider with a deterministic signer and
 * helpers that build x402 v2 challenge / receipt headers exactly like the Agentum server
 * (src/adapters/outbound/payments/x402.adapter.ts).
 */

import { EvmWalletProvider } from "@coinbase/agentkit";
import type { Network } from "@coinbase/agentkit";

export const FAKE_ADDRESS = "0x1111111111111111111111111111111111111111" as const;
export const FAKE_SIGNATURE = (`0x${"ab".repeat(64)}1b`) as `0x${string}`;
export const PAY_TO = "0x2222222222222222222222222222222222222222";
export const BASE_USDC = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913";

export class FakeEvmWalletProvider extends EvmWalletProvider {
  readonly typedDataSigned: unknown[] = [];

  constructor(private readonly network: Network = { protocolFamily: "evm", networkId: "base-mainnet", chainId: "8453" }) {
    super();
  }

  getAddress(): string {
    return FAKE_ADDRESS;
  }
  getNetwork(): Network {
    return this.network;
  }
  getName(): string {
    return "fake_evm_wallet_provider";
  }
  async getBalance(): Promise<bigint> {
    return 0n;
  }
  async nativeTransfer(): Promise<string> {
    return "0x";
  }
  async sign(): Promise<`0x${string}`> {
    return FAKE_SIGNATURE;
  }
  async signMessage(): Promise<`0x${string}`> {
    return FAKE_SIGNATURE;
  }
  async signTypedData(typedData: unknown): Promise<`0x${string}`> {
    this.typedDataSigned.push(typedData);
    return FAKE_SIGNATURE;
  }
  async signTransaction(): Promise<`0x${string}`> {
    return FAKE_SIGNATURE;
  }
  async sendTransaction(): Promise<`0x${string}`> {
    return "0x";
  }
  async waitForTransactionReceipt(): Promise<unknown> {
    return {};
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async readContract(): Promise<any> {
    throw new Error("readContract is not available in the fake wallet");
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getPublicClient(): any {
    throw new Error("getPublicClient is not available in the fake wallet");
  }
}

export function b64(value: unknown): string {
  return Buffer.from(JSON.stringify(value)).toString("base64");
}

export function decodeB64<T = Record<string, unknown>>(value: string): T {
  return JSON.parse(Buffer.from(value, "base64").toString("utf8")) as T;
}

/** Mirrors the server's PAYMENT-REQUIRED payload for a resource priced in USDC atomic units. */
export function paymentRequired(resourceUrl: string, atomicUnits: string, priceUsd: string, network = "eip155:8453") {
  return {
    x402Version: 2,
    error: "Payment Required",
    resource: { url: resourceUrl, description: "Agentum paid endpoint", mimeType: "application/json" },
    accepts: [
      {
        scheme: "exact",
        network,
        maxAmountRequired: atomicUnits,
        amount: atomicUnits,
        asset: BASE_USDC,
        payTo: PAY_TO,
        maxTimeoutSeconds: 300,
        extra: { name: "USD Coin", version: "2", priceUsd },
      },
    ],
  };
}

export function receipt(network = "eip155:8453") {
  return {
    success: true,
    transaction: "0x" + "cd".repeat(32),
    network,
    payer: FAKE_ADDRESS,
    rail: "X402",
    settledAt: "2026-11-05T00:00:00.000Z",
  };
}

export interface RecordedCall {
  url: string;
  method: string;
  headers: Record<string, string>;
  body: unknown;
}

/**
 * Builds a fetch double that replays `responses` in order and records each request
 * (headers and parsed JSON body) so tests can assert on the 402 → pay → retry flow.
 */
export function scriptedFetch(responses: Array<(call: RecordedCall) => Response>) {
  const calls: RecordedCall[] = [];
  const fetchImpl: typeof fetch = async (input, init) => {
    const request = new Request(input, init);
    const headers: Record<string, string> = {};
    request.headers.forEach((value, key) => {
      headers[key.toLowerCase()] = value;
    });
    const text = await request.text();
    const call: RecordedCall = { url: request.url, method: request.method, headers, body: text ? JSON.parse(text) : undefined };
    calls.push(call);
    const next = responses[calls.length - 1];
    if (!next) throw new Error(`Unexpected fetch call #${calls.length} to ${request.url}`);
    return next(call);
  };
  return { fetchImpl, calls };
}
