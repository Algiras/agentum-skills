import { describe, expect, test } from "bun:test";
import { AgentumPaymentRefusedError, agentumActionProvider, atomicUsdcToUsd, createPaymentClient } from "../src/index.js";
import { FAKE_ADDRESS, FAKE_SIGNATURE, FakeEvmWalletProvider, PAY_TO, b64, decodeB64, paymentRequired, receipt, scriptedFetch } from "./helpers.js";

const RESOURCE = "https://agentum.test/v1/compliance/check-vendor";

describe("x402 payment flow", () => {
  test("402 → sign with the wallet → retry with PAYMENT-SIGNATURE → result carries the receipt", async () => {
    const serverResult = { vendorName: "Siemens AG", verdict: "APPROVED", riskLevel: "CLEAR", confidence: 0.97 };
    const { fetchImpl, calls } = scriptedFetch([
      (call) => {
        expect(call.headers["payment-signature"]).toBeUndefined();
        const challenge = paymentRequired(RESOURCE, "10000", "0.010");
        return new Response(JSON.stringify(challenge), {
          status: 402,
          headers: { "Content-Type": "application/json", "PAYMENT-REQUIRED": b64(challenge) },
        });
      },
      (call) => {
        expect(call.headers["payment-signature"]).toBeDefined();
        return Response.json(serverResult, { headers: { "PAYMENT-RESPONSE": b64(receipt()) } });
      },
    ]);

    const provider = agentumActionProvider({ baseUrl: "https://agentum.test", fetchImpl });
    const wallet = new FakeEvmWalletProvider();
    const checkVendor = provider.getActions(wallet).find((a) => a.name === "AgentumActionProvider_check_vendor")!;

    const output = JSON.parse(await checkVendor.invoke({ name: "Siemens AG", country: "DE" }));

    expect(calls.length).toBe(2);
    expect(calls[0].body).toEqual({ name: "Siemens AG", country: "DE" });
    expect(calls[1].body).toEqual({ name: "Siemens AG", country: "DE" });
    expect(calls[1].url).toBe(RESOURCE);

    const paymentPayload = decodeB64<any>(calls[1].headers["payment-signature"]);
    expect(paymentPayload.x402Version).toBe(2);
    expect(paymentPayload.accepted.scheme).toBe("exact");
    expect(paymentPayload.accepted.network).toBe("eip155:8453");
    expect(paymentPayload.accepted.amount).toBe("10000");
    expect(paymentPayload.accepted.payTo).toBe(PAY_TO);
    expect(paymentPayload.payload.signature).toBe(FAKE_SIGNATURE);
    expect(paymentPayload.payload.authorization.from.toLowerCase()).toBe(FAKE_ADDRESS);
    expect(paymentPayload.payload.authorization.to.toLowerCase()).toBe(PAY_TO.toLowerCase());
    expect(paymentPayload.payload.authorization.value).toBe("10000");

    expect(wallet.typedDataSigned.length).toBe(1);
    const typed = wallet.typedDataSigned[0] as any;
    expect(typed.primaryType).toBe("TransferWithAuthorization");
    expect(typed.domain.name).toBe("USD Coin");
    expect(typed.domain.chainId).toBe(8453);

    expect(output.verdict).toBe("APPROVED");
    expect(output.x402Receipt.success).toBe(true);
    expect(output.x402Receipt.transaction).toBe(receipt().transaction);
    expect(output.x402Receipt.network).toBe("eip155:8453");
  });

  test("refuses to pay above maxPriceUsd and does not retry", async () => {
    const { fetchImpl, calls } = scriptedFetch([
      () => {
        const challenge = paymentRequired("https://agentum.test/v1/entity/batch-resolve", "25000", "0.025");
        return new Response(JSON.stringify(challenge), { status: 402, headers: { "PAYMENT-REQUIRED": b64(challenge) } });
      },
    ]);
    const provider = agentumActionProvider({ baseUrl: "https://agentum.test", fetchImpl }); // default maxPriceUsd 0.02
    const wallet = new FakeEvmWalletProvider();
    const batch = provider.getActions(wallet).find((a) => a.name === "AgentumActionProvider_batch_resolve")!;

    const failure = await batch.invoke({ items: [{ query: "Grab Holdings", country: "SG" }] }).catch((e) => e);

    expect(failure).toBeInstanceOf(AgentumPaymentRefusedError);
    expect(failure.requestedUsd).toBe(0.025);
    expect(failure.maxPriceUsd).toBe(0.02);
    expect(failure.message).toContain("maxPriceUsd");
    expect(calls.length).toBe(1);
    expect(wallet.typedDataSigned.length).toBe(0);
  });

  test("a raised maxPriceUsd lets the same call through", async () => {
    const { fetchImpl, calls } = scriptedFetch([
      () => {
        const challenge = paymentRequired("https://agentum.test/v1/entity/batch-resolve", "25000", "0.025");
        return new Response(JSON.stringify(challenge), { status: 402, headers: { "PAYMENT-REQUIRED": b64(challenge) } });
      },
      () => Response.json({ total: 1, resolvedCount: 1, results: [] }, { headers: { "PAYMENT-RESPONSE": b64(receipt()) } }),
    ]);
    const provider = agentumActionProvider({ baseUrl: "https://agentum.test", fetchImpl, maxPriceUsd: 0.05 });
    const batch = provider.getActions(new FakeEvmWalletProvider()).find((a) => a.name === "AgentumActionProvider_batch_resolve")!;
    const output = JSON.parse(await batch.invoke({ items: [{ query: "Grab Holdings" }] }));
    expect(calls.length).toBe(2);
    expect(output.total).toBe(1);
    expect(output.x402Receipt.payer).toBe(FAKE_ADDRESS);
  });

  test("a guard option aborts payment creation before signing and lets approved payments through", async () => {
    const challenge = () => {
      const c = paymentRequired(RESOURCE, "10000", "0.010");
      return new Response(JSON.stringify(c), { status: 402, headers: { "PAYMENT-REQUIRED": b64(c) } });
    };
    const seen: string[] = [];
    const blocking = scriptedFetch([challenge]);
    const wallet = new FakeEvmWalletProvider();
    const blocked = agentumActionProvider({
      baseUrl: "https://agentum.test",
      fetchImpl: blocking.fetchImpl,
      guard: async ({ selectedRequirements }) => {
        seen.push(selectedRequirements.payTo);
        return { abort: true, reason: "sanctioned test payee" };
      },
    });
    const action = blocked.getActions(wallet).find((a) => a.name === "AgentumActionProvider_check_vendor")!;
    await expect(action.invoke({ name: "Siemens AG" })).rejects.toThrow("sanctioned test payee");
    expect(seen).toEqual([PAY_TO]);
    expect(blocking.calls.length).toBe(1);
    expect(wallet.typedDataSigned.length).toBe(0);

    const allowing = scriptedFetch([challenge, () => Response.json({ verdict: "APPROVED" }, { headers: { "PAYMENT-RESPONSE": b64(receipt()) } })]);
    const allowed = agentumActionProvider({ baseUrl: "https://agentum.test", fetchImpl: allowing.fetchImpl, guard: async () => undefined });
    const out = JSON.parse(await allowed.getActions(wallet).find((a) => a.name === "AgentumActionProvider_check_vendor")!.invoke({ name: "Siemens AG" }));
    expect(out.verdict).toBe("APPROVED");
    expect(wallet.typedDataSigned.length).toBe(1);
  });

  test("the x402 client is registered on the configured network only", async () => {
    const signer = { address: FAKE_ADDRESS, signTypedData: async () => FAKE_SIGNATURE };
    const client = createPaymentClient(signer, "base-mainnet", 0.02);
    const sepoliaChallenge = paymentRequired(RESOURCE, "5000", "0.005", "eip155:84532");
    await expect(client.createPaymentPayload(sepoliaChallenge as any)).rejects.toThrow();
    const mainnetChallenge = paymentRequired(RESOURCE, "5000", "0.005", "eip155:8453");
    const payload = await client.createPaymentPayload(mainnetChallenge as any);
    expect(payload.accepted.network).toBe("eip155:8453");
  });

  test("invalid maxPriceUsd is rejected at construction", () => {
    expect(() => agentumActionProvider({ maxPriceUsd: -1 })).toThrow("maxPriceUsd");
    expect(() => agentumActionProvider({ maxPriceUsd: Number.NaN })).toThrow("maxPriceUsd");
  });

  test("atomicUsdcToUsd converts 6-decimal USDC amounts", () => {
    expect(atomicUsdcToUsd("5000")).toBe(0.005);
    expect(atomicUsdcToUsd("25000")).toBe(0.025);
    expect(atomicUsdcToUsd("1000000")).toBe(1);
  });
});
