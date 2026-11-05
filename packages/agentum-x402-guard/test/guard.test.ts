import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { VERSION, chainHintForNetwork, createAgentumGuard, normalizeAddress, type GuardWarning } from "../src/index.js";
import { CLEAN_EVM, SANCTIONED_EVM, ctx, screenServer } from "./helpers.js";

const BASE = "https://agentum.test";

describe("createAgentumGuard", () => {
  test("allows a CLEAR address and posts the contract body", async () => {
    const { fetchImpl, calls } = screenServer();
    const guard = createAgentumGuard({ baseUrl: `${BASE}/`, fetchImpl });
    expect(await guard(ctx(CLEAN_EVM))).toBeUndefined();
    expect(calls.length).toBe(1);
    expect(calls[0].url).toBe(`${BASE}/v1/compliance/screen-address`);
    expect(calls[0].method).toBe("POST");
    expect(calls[0].body).toEqual({ address: CLEAN_EVM, chain: "evm" });
  });

  test("aborts on EXACT_MATCH with a reason naming entity and list", async () => {
    const { fetchImpl } = screenServer();
    const guard = createAgentumGuard({ baseUrl: BASE, fetchImpl });
    const result = await guard(ctx(SANCTIONED_EVM));
    expect(result).toBeDefined();
    expect(result!.abort).toBe(true);
    expect(result!.reason).toContain("EXAMPLE MIXER LLC");
    expect(result!.reason).toContain("OFAC_SDN");
    expect(result!.reason).toContain("OFAC-12345");
    expect(result!.reason).toContain(SANCTIONED_EVM);
  });

  test("caches verdicts: second call for the same address makes no request", async () => {
    const { fetchImpl, calls } = screenServer();
    const guard = createAgentumGuard({ baseUrl: BASE, fetchImpl });
    await guard(ctx(CLEAN_EVM));
    await guard(ctx(CLEAN_EVM));
    expect(calls.length).toBe(1);
    expect((await guard(ctx(SANCTIONED_EVM)))!.abort).toBe(true);
    expect((await guard(ctx(SANCTIONED_EVM)))!.abort).toBe(true);
    expect(calls.length).toBe(2);
  });

  test("EVM cache key is case-insensitive", async () => {
    const { fetchImpl, calls } = screenServer();
    const guard = createAgentumGuard({ baseUrl: BASE, fetchImpl });
    const checksummed = "0x8576AcC5C05D6Ce88f4e49bf65BdF0C62F91353C";
    expect((await guard(ctx(checksummed)))!.abort).toBe(true);
    expect((await guard(ctx(SANCTIONED_EVM)))!.abort).toBe(true);
    expect(calls.length).toBe(1);
  });

  test("non-EVM addresses are cached case-sensitively and sent as-is", async () => {
    const { fetchImpl, calls } = screenServer();
    const guard = createAgentumGuard({ baseUrl: BASE, fetchImpl });
    const sol = "9wB1xQbMmZyFfJ7Kq3hV1nYpUtR2dE5sGcLaXoNzTk4";
    await guard(ctx(sol, "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp"));
    await guard(ctx(sol.toLowerCase(), "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp"));
    expect(calls.length).toBe(2);
    expect(calls[0].body).toEqual({ address: sol, chain: "solana" });
  });

  test("cache entries expire after cacheTtlMs", async () => {
    const { fetchImpl, calls } = screenServer();
    const guard = createAgentumGuard({ baseUrl: BASE, fetchImpl, cacheTtlMs: 20 });
    await guard(ctx(CLEAN_EVM));
    await new Promise((r) => setTimeout(r, 40));
    await guard(ctx(CLEAN_EVM));
    expect(calls.length).toBe(2);
  });

  test("skipAddresses bypasses the request (case-insensitive for EVM)", async () => {
    const { fetchImpl, calls } = screenServer();
    const guard = createAgentumGuard({ baseUrl: BASE, fetchImpl, skipAddresses: [SANCTIONED_EVM.toUpperCase().replace("0X", "0x")] });
    expect(await guard(ctx(SANCTIONED_EVM))).toBeUndefined();
    expect(calls.length).toBe(0);
  });

  test("sends the default and a custom User-Agent", async () => {
    const a = screenServer();
    await createAgentumGuard({ baseUrl: BASE, fetchImpl: a.fetchImpl })(ctx(CLEAN_EVM));
    expect(a.calls[0].headers["user-agent"]).toBe(`agentum-x402-guard/${VERSION}`);
    const b = screenServer();
    await createAgentumGuard({ baseUrl: BASE, fetchImpl: b.fetchImpl, userAgent: "my-agent/1" })(ctx(CLEAN_EVM));
    expect(b.calls[0].headers["user-agent"]).toBe("my-agent/1");
  });

  test("VERSION matches package.json", () => {
    const pkg = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8"));
    expect(VERSION).toBe(pkg.version);
  });

  test("onUnknown allow (default) pays but warns; block aborts; UNKNOWN is not cached", async () => {
    const warnings: GuardWarning[] = [];
    const s1 = screenServer({ unknown: true });
    const allow = createAgentumGuard({ baseUrl: BASE, fetchImpl: s1.fetchImpl, onWarning: (w) => warnings.push(w) });
    expect(await allow(ctx(CLEAN_EVM))).toBeUndefined();
    expect(await allow(ctx(CLEAN_EVM))).toBeUndefined();
    expect(s1.calls.length).toBe(2);
    expect(warnings.length).toBe(2);
    expect(warnings[0]).toMatchObject({ kind: "unknown", allowed: true, address: CLEAN_EVM });

    const s2 = screenServer({ unknown: true });
    const blockWarnings: GuardWarning[] = [];
    const block = createAgentumGuard({ baseUrl: BASE, fetchImpl: s2.fetchImpl, onUnknown: "block", onWarning: (w) => blockWarnings.push(w) });
    const result = await block(ctx(CLEAN_EVM));
    expect(result!.abort).toBe(true);
    expect(result!.reason).toContain("onUnknown");
    expect(blockWarnings[0]).toMatchObject({ kind: "unknown", allowed: false });
  });

  test("failMode open (default) allows on network error and HTTP 500, with onWarning", async () => {
    const warnings: GuardWarning[] = [];
    const boom: typeof fetch = async () => {
      throw new Error("ECONNRESET");
    };
    const g1 = createAgentumGuard({ baseUrl: BASE, fetchImpl: boom, onWarning: (w) => warnings.push(w) });
    expect(await g1(ctx(CLEAN_EVM))).toBeUndefined();
    const g2 = createAgentumGuard({ baseUrl: BASE, fetchImpl: async () => new Response("oops", { status: 500 }), onWarning: (w) => warnings.push(w) });
    expect(await g2(ctx(CLEAN_EVM))).toBeUndefined();
    expect(warnings.map((w) => w.kind)).toEqual(["error", "error"]);
    expect(warnings[0].message).toContain("ECONNRESET");
    expect(warnings[1].message).toContain("500");
    expect(warnings.every((w) => w.allowed)).toBe(true);
  });

  test("failMode closed aborts on network error and HTTP 500, errors are not cached", async () => {
    const warnings: GuardWarning[] = [];
    let n = 0;
    const flaky: typeof fetch = async () => {
      n++;
      throw new Error("ETIMEDOUT");
    };
    const g1 = createAgentumGuard({ baseUrl: BASE, fetchImpl: flaky, failMode: "closed", onWarning: (w) => warnings.push(w) });
    const r1 = await g1(ctx(CLEAN_EVM));
    expect(r1!.abort).toBe(true);
    expect(r1!.reason).toContain("closed");
    await g1(ctx(CLEAN_EVM));
    expect(n).toBe(2);
    const g2 = createAgentumGuard({ baseUrl: BASE, fetchImpl: async () => new Response("oops", { status: 500 }), failMode: "closed", onWarning: (w) => warnings.push(w) });
    expect((await g2(ctx(CLEAN_EVM)))!.abort).toBe(true);
    expect(warnings.length).toBe(3);
    expect(warnings.every((w) => !w.allowed)).toBe(true);
  });

  test("malformed server body is treated as an error", async () => {
    const guard = createAgentumGuard({ baseUrl: BASE, fetchImpl: async () => Response.json({ hello: "world" }), failMode: "closed" });
    expect((await guard(ctx(CLEAN_EVM)))!.abort).toBe(true);
  });

  test("HTTP 400 (unscreenable address) follows onUnknown, not failMode", async () => {
    const warnings: GuardWarning[] = [];
    const fetchImpl: typeof fetch = async () => new Response(JSON.stringify({ error: "invalid address" }), { status: 400 });
    const open = createAgentumGuard({ baseUrl: BASE, fetchImpl, failMode: "closed", onWarning: (w) => warnings.push(w) });
    expect(await open(ctx("not-an-address", "foo:bar"))).toBeUndefined();
    expect(warnings[0].kind).toBe("unscreenable");
    const block = createAgentumGuard({ baseUrl: BASE, fetchImpl, onUnknown: "block" });
    expect((await block(ctx("not-an-address")))!.abort).toBe(true);
  });

  test("a throwing onWarning never breaks the decision", async () => {
    const guard = createAgentumGuard({ baseUrl: BASE, fetchImpl: async () => new Response("x", { status: 500 }), onWarning: () => { throw new Error("cb"); } });
    expect(await guard(ctx(CLEAN_EVM))).toBeUndefined();
  });

  test("chain hint: eip155 -> evm, solana -> solana, other -> omitted", async () => {
    expect(chainHintForNetwork("eip155:84532")).toBe("evm");
    expect(chainHintForNetwork("solana:5eykt")).toBe("solana");
    expect(chainHintForNetwork("tron:mainnet")).toBeUndefined();
    const { fetchImpl, calls } = screenServer();
    const guard = createAgentumGuard({ baseUrl: BASE, fetchImpl });
    await guard(ctx("TXyz1234567890abcdefghijklmnopqrstu", "tron:mainnet"));
    expect(calls[0].body).toEqual({ address: "TXyz1234567890abcdefghijklmnopqrstu" });
  });

  test("normalizeAddress lowercases only EVM addresses", () => {
    expect(normalizeAddress("0xABCDEF0123456789abcdef0123456789ABCDEF01")).toBe("0xabcdef0123456789abcdef0123456789abcdef01");
    expect(normalizeAddress("bc1QAbC")).toBe("bc1QAbC");
  });
});
