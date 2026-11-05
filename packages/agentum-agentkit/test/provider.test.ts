import { describe, expect, test } from "bun:test";
import {
  AGENTUM_ENDPOINTS,
  AgentumActionProvider,
  BatchResolveSchema,
  CheckVendorSchema,
  DEFAULT_BASE_URL,
  DEFAULT_MAX_PRICE_USD,
  ResolveEntitySchema,
  ScreenAddressSchema,
  ScreenSanctionsSchema,
  VerifyBankPayeeSchema,
  VerifyVatSchema,
  agentumActionProvider,
} from "../src/index.js";
import { FakeEvmWalletProvider, scriptedFetch } from "./helpers.js";

const EXPECTED_ACTIONS: Record<string, unknown> = {
  AgentumActionProvider_resolve_entity: ResolveEntitySchema,
  AgentumActionProvider_verify_eu_vat: VerifyVatSchema,
  AgentumActionProvider_screen_sanctions: ScreenSanctionsSchema,
  AgentumActionProvider_check_vendor: CheckVendorSchema,
  AgentumActionProvider_verify_bank_payee: VerifyBankPayeeSchema,
  AgentumActionProvider_batch_resolve: BatchResolveSchema,
  AgentumActionProvider_screen_address: ScreenAddressSchema,
};

describe("AgentumActionProvider", () => {
  test("factory applies defaults: public base URL, base-mainnet, maxPriceUsd 0.02", () => {
    const provider = agentumActionProvider();
    expect(provider).toBeInstanceOf(AgentumActionProvider);
    expect(provider.name).toBe("agentum");
    expect(provider.client.baseUrl).toBe(DEFAULT_BASE_URL);
    expect(provider.client.maxPriceUsd).toBe(DEFAULT_MAX_PRICE_USD);
    expect(provider.network).toBe("base-mainnet");
  });

  test("lists exactly seven actions with AgentKit-prefixed names and the REST schemas", () => {
    const provider = agentumActionProvider();
    const actions = provider.getActions(new FakeEvmWalletProvider());

    expect(actions.length).toBe(7);
    expect(actions.map((a) => a.name).sort()).toEqual(Object.keys(EXPECTED_ACTIONS).sort());
    for (const action of actions) {
      expect(action.schema).toBe(EXPECTED_ACTIONS[action.name]);
      expect(action.description.length).toBeGreaterThan(40);
      expect(typeof action.invoke).toBe("function");
    }
    expect(Object.keys(AGENTUM_ENDPOINTS).length).toBe(7);
    const screen = actions.find((a) => a.name === "AgentumActionProvider_screen_address")!;
    expect(screen.description.length).toBeLessThanOrEqual(600);
    expect(screen.description).toContain("Use when about to send funds");
    expect(screen.description).toContain("$0.002");
  });

  test("ScreenAddressSchema accepts an address with optional chain and rejects bad input", () => {
    expect(ScreenAddressSchema.safeParse({ address: "0x2222222222222222222222222222222222222222" }).success).toBe(true);
    expect(ScreenAddressSchema.safeParse({ address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh", chain: "bitcoin" }).success).toBe(true);
    expect(ScreenAddressSchema.safeParse({ address: "" }).success).toBe(false);
    expect(ScreenAddressSchema.safeParse({ address: "0x22", chain: "dogecoin" }).success).toBe(false);
  });

  test("schemas accept the documented REST inputs and reject invalid ones", () => {
    expect(ResolveEntitySchema.safeParse({ query: "Nestle SA", jurisdiction: "CH", checkSanctions: true }).success).toBe(true);
    expect(ResolveEntitySchema.safeParse({}).success).toBe(false);
    expect(VerifyVatSchema.safeParse({ vatNumber: "DE129274202" }).success).toBe(true);
    expect(VerifyVatSchema.safeParse({ vatNumber: "DE" }).success).toBe(false);
    expect(ScreenSanctionsSchema.safeParse({ name: "Rosneft", country: "RU", threshold: 0.8 }).success).toBe(true);
    expect(ScreenSanctionsSchema.safeParse({ name: "Rosneft", threshold: 2 }).success).toBe(false);
    expect(CheckVendorSchema.safeParse({ name: "Siemens AG", country: "DE", domain: "siemens.com" }).success).toBe(true);
    expect(VerifyBankPayeeSchema.safeParse({ iban: "DE89 3704 0044 0532 0130 00", expectedCountry: "DE" }).success).toBe(true);
    expect(VerifyBankPayeeSchema.safeParse({ iban: "DE89" }).success).toBe(false);
    expect(BatchResolveSchema.safeParse({ items: [{ query: "Grab Holdings", country: "SG" }] }).success).toBe(true);
    expect(BatchResolveSchema.safeParse({ items: [] }).success).toBe(false);
    expect(BatchResolveSchema.safeParse({ items: Array.from({ length: 26 }, () => ({ query: "x" })) }).success).toBe(false);
  });

  test("supportsNetwork is true only for the configured Base network", () => {
    const mainnet = agentumActionProvider();
    expect(mainnet.supportsNetwork({ protocolFamily: "evm", networkId: "base-mainnet", chainId: "8453" })).toBe(true);
    expect(mainnet.supportsNetwork({ protocolFamily: "evm", chainId: "8453" })).toBe(true);
    expect(mainnet.supportsNetwork({ protocolFamily: "evm", networkId: "base-sepolia", chainId: "84532" })).toBe(false);
    expect(mainnet.supportsNetwork({ protocolFamily: "evm", networkId: "ethereum-mainnet", chainId: "1" })).toBe(false);
    expect(mainnet.supportsNetwork({ protocolFamily: "svm", networkId: "solana-mainnet" })).toBe(false);
    expect(mainnet.supportsNetwork({ protocolFamily: "evm" })).toBe(false);

    const sepolia = agentumActionProvider({ network: "base-sepolia" });
    expect(sepolia.supportsNetwork({ protocolFamily: "evm", networkId: "base-sepolia", chainId: "84532" })).toBe(true);
    expect(sepolia.supportsNetwork({ protocolFamily: "evm", networkId: "base-mainnet", chainId: "8453" })).toBe(false);
  });

  test("an action POSTs the validated args to the right endpoint and returns the JSON result", async () => {
    const serverResult = { resolved: true, confidence: 0.98, entity: { legalName: "ATLASSIAN PTY LTD", jurisdiction: "AU" } };
    const { fetchImpl, calls } = scriptedFetch([() => Response.json(serverResult)]);
    const provider = agentumActionProvider({ baseUrl: "https://agentum.test/", fetchImpl, agentId: "test-agent" });
    const wallet = new FakeEvmWalletProvider();
    const resolve = provider.getActions(wallet).find((a) => a.name === "AgentumActionProvider_resolve_entity")!;

    const output = await resolve.invoke({ query: "ATLASSIAN PTY LTD", jurisdiction: "AU", checkSanctions: true });

    expect(calls.length).toBe(1);
    expect(calls[0].url).toBe("https://agentum.test/v1/entity/resolve");
    expect(calls[0].method).toBe("POST");
    expect(calls[0].headers["content-type"]).toBe("application/json");
    expect(calls[0].headers["x-agent-id"]).toBe("test-agent");
    expect(calls[0].headers["payment-signature"]).toBeUndefined();
    expect(calls[0].body).toEqual({ query: "ATLASSIAN PTY LTD", jurisdiction: "AU", checkSanctions: true });
    expect(JSON.parse(output)).toEqual(serverResult);
    expect(wallet.typedDataSigned.length).toBe(0);
  });

  test("every action maps to its REST path", async () => {
    const inputs: Record<string, unknown> = {
      AgentumActionProvider_resolve_entity: { query: "Nestle" },
      AgentumActionProvider_verify_eu_vat: { vatNumber: "DE129274202" },
      AgentumActionProvider_screen_sanctions: { name: "Rosneft" },
      AgentumActionProvider_check_vendor: { name: "Siemens AG" },
      AgentumActionProvider_verify_bank_payee: { iban: "DE89370400440532013000" },
      AgentumActionProvider_batch_resolve: { items: [{ query: "Grab" }] },
      AgentumActionProvider_screen_address: { address: "0x2222222222222222222222222222222222222222", chain: "evm" },
    };
    const { fetchImpl, calls } = scriptedFetch(Array.from({ length: 7 }, () => () => Response.json({ ok: true })));
    const provider = agentumActionProvider({ baseUrl: "https://agentum.test", fetchImpl });
    const actions = provider.getActions(new FakeEvmWalletProvider());
    for (const action of actions) {
      expect(JSON.parse(await action.invoke(inputs[action.name]))).toEqual({ ok: true });
    }
    const paths = calls.map((c) => new URL(c.url).pathname).sort();
    expect(paths).toEqual(Object.values(AGENTUM_ENDPOINTS).slice().sort());
  });

  test("screen_address maps to its REST path and returns the screening result", async () => {
    const verdict = { sanctioned: false, riskLevel: "CLEAR", address: "0x2222222222222222222222222222222222222222", addressType: "EVM", matches: [] };
    const { fetchImpl, calls } = scriptedFetch([() => Response.json(verdict)]);
    const provider = agentumActionProvider({ baseUrl: "https://agentum.test", fetchImpl });
    const action = provider.getActions(new FakeEvmWalletProvider()).find((a) => a.name === "AgentumActionProvider_screen_address")!;
    const output = await action.invoke({ address: verdict.address, chain: "evm" });
    expect(new URL(calls[0].url).pathname).toBe("/v1/compliance/screen-address");
    expect(calls[0].body).toEqual({ address: verdict.address, chain: "evm" });
    expect(JSON.parse(output)).toEqual(verdict);
  });

  test("non-2xx responses surface as AgentumApiError with status and body", async () => {
    const { fetchImpl } = scriptedFetch([() => new Response("upstream registry down", { status: 503 })]);
    const provider = agentumActionProvider({ baseUrl: "https://agentum.test", fetchImpl });
    const action = provider.getActions(new FakeEvmWalletProvider()).find((a) => a.name === "AgentumActionProvider_verify_eu_vat")!;
    await expect(action.invoke({ vatNumber: "DE129274202" })).rejects.toMatchObject({
      name: "AgentumApiError",
      status: 503,
      endpoint: "/v1/entity/vat-verify",
    });
  });
});
