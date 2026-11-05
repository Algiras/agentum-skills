/**
 * End to end: the real x402 client (built by agentum-agentkit's createPaymentClient, i.e. the same
 * onBeforePaymentCreation wiring users get) + the guard, against a mock server that answers 402
 * for the paid resource and implements the screen_address contract for the guard.
 */
import { describe, expect, test } from "bun:test";
// Resolved from agentum-agentkit's installed dependencies so the guard package needs no x402 devDependencies.
import { wrapFetchWithPayment } from "../../agentum-agentkit/node_modules/@x402/fetch";
import { createPaymentClient } from "../../agentum-agentkit/src/client.js";
import { createAgentumGuard } from "../src/index.js";
import { CLEAN_EVM, SANCTIONED_EVM, clearResult, matchResult } from "./helpers.js";

const USDC = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913";
const SIGNER_ADDRESS = "0x1111111111111111111111111111111111111111" as const;
const SIGNATURE = (`0x${"ab".repeat(64)}1b`) as `0x${string}`;
const RESOURCE = "https://paid.test/v1/thing";

function paidServer(payTo: string) {
  const log: { url: string; hasPayment: boolean; userAgent: string | null }[] = [];
  const fetchImpl: typeof fetch = async (input, init) => {
    const request = new Request(input, init);
    const url = new URL(request.url);
    log.push({ url: request.url, hasPayment: request.headers.has("payment-signature"), userAgent: request.headers.get("user-agent") });
    if (url.pathname === "/v1/compliance/screen-address") {
      const { address } = JSON.parse(await request.text());
      return Response.json(address.toLowerCase() === SANCTIONED_EVM ? matchResult(SANCTIONED_EVM) : clearResult(address.toLowerCase()));
    }
    if (!request.headers.has("payment-signature")) {
      const challenge = {
        x402Version: 2,
        error: "Payment Required",
        resource: { url: RESOURCE, description: "paid", mimeType: "application/json" },
        accepts: [
          {
            scheme: "exact",
            network: "eip155:8453",
            amount: "10000",
            asset: USDC,
            payTo,
            maxTimeoutSeconds: 300,
            extra: { name: "USD Coin", version: "2", priceUsd: "0.010" },
          },
        ],
      };
      return new Response(JSON.stringify(challenge), {
        status: 402,
        headers: { "Content-Type": "application/json", "PAYMENT-REQUIRED": Buffer.from(JSON.stringify(challenge)).toString("base64") },
      });
    }
    return Response.json({ ok: true });
  };
  return { fetchImpl, log };
}

function setup(payTo: string, guardOptions: Parameters<typeof createAgentumGuard>[0] = {}) {
  const server = paidServer(payTo);
  const signed: unknown[] = [];
  const signer = {
    address: SIGNER_ADDRESS,
    signTypedData: async (message: unknown) => {
      signed.push(message);
      return SIGNATURE;
    },
  };
  const guard = createAgentumGuard({ baseUrl: "https://guard.test", fetchImpl: server.fetchImpl, ...guardOptions });
  const payingFetch = wrapFetchWithPayment(server.fetchImpl, createPaymentClient(signer, "base-mainnet", 0.02, guard as any));
  return { payingFetch, signed, server };
}

describe("guard + real x402 client", () => {
  test("a sanctioned payTo creates NO signature and the paid request is never retried", async () => {
    const { payingFetch, signed, server } = setup(SANCTIONED_EVM);
    const failure = await payingFetch(RESOURCE, { method: "POST", body: "{}" }).catch((e) => e);
    expect(failure).toBeInstanceOf(Error);
    expect(String(failure.message)).toContain("EXAMPLE MIXER LLC");
    expect(String(failure.message)).toContain("OFAC_SDN");
    expect(signed.length).toBe(0);
    expect(server.log.filter((l) => l.hasPayment).length).toBe(0);
    expect(server.log.filter((l) => l.url === RESOURCE).length).toBe(1);
  });

  test("a clean payTo is screened once, signed, and the paid retry succeeds", async () => {
    const { payingFetch, signed, server } = setup(CLEAN_EVM);
    const response = await payingFetch(RESOURCE, { method: "POST", body: "{}" });
    expect(response.status).toBe(200);
    expect(signed.length).toBe(1);
    const screens = server.log.filter((l) => l.url.endsWith("/v1/compliance/screen-address"));
    expect(screens.length).toBe(1);
    expect(screens[0].userAgent).toStartWith("agentum-x402-guard/");
    await payingFetch(RESOURCE, { method: "POST", body: "{}" });
    expect(server.log.filter((l) => l.url.endsWith("/v1/compliance/screen-address")).length).toBe(1);
  });

  test("failMode closed with an unreachable screening server blocks signing", async () => {
    const server = paidServer(CLEAN_EVM);
    const signed: unknown[] = [];
    const signer = { address: SIGNER_ADDRESS, signTypedData: async (m: unknown) => (signed.push(m), SIGNATURE) };
    const guard = createAgentumGuard({
      baseUrl: "https://guard.test",
      failMode: "closed",
      fetchImpl: async () => {
        throw new Error("ENOTFOUND");
      },
    });
    const payingFetch = wrapFetchWithPayment(server.fetchImpl, createPaymentClient(signer, "base-mainnet", 0.02, guard as any));
    await expect(payingFetch(RESOURCE, { method: "POST", body: "{}" })).rejects.toThrow("failMode");
    expect(signed.length).toBe(0);
  });
});
