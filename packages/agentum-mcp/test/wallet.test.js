const test = require("node:test");
const assert = require("node:assert/strict");
const { generateWallet, importWallet, checkBalances } = require("../lib/wallet.js");

test("generateWallet creates random 32-byte private key and valid address", () => {
  const w1 = generateWallet();
  const w2 = generateWallet();
  assert.notEqual(w1.privateKey, w2.privateKey);
  assert.ok(w1.privateKey.startsWith("0x"));
  assert.equal(w1.privateKey.length, 66);
  assert.ok(w1.address.startsWith("0x"));
  assert.equal(w1.address.length, 42);
});

test("importWallet validates and imports existing private key", () => {
  const privKey = "ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
  const w = importWallet(privKey);
  assert.equal(w.address.toLowerCase(), "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266");
  assert.equal(w.privateKey, "0x" + privKey);
});

test("checkBalances calls JSON-RPC eth_getBalance and eth_call for USDC", async () => {
  const mockFetch = async (url, opts) => {
    const body = JSON.parse(opts.body);
    if (body.method === "eth_getBalance") {
      return { ok: true, json: async () => ({ result: "0xde0b6b3a7640000" }) }; // 1.0 ETH
    }
    if (body.method === "eth_call") {
      return { ok: true, json: async () => ({ result: "0x00000000000000000000000000000000000000000000000000000000004c4b40" }) }; // 5,000,000 atomic units = 5.0 USDC
    }
    return { ok: false };
  };

  const netConfig = {
    rpcUrl: "https://mainnet.base.org",
    usdcAddress: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
  };
  const balances = await checkBalances("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", netConfig, mockFetch);
  assert.equal(balances.eth, "1.0000");
  assert.equal(balances.usdc, "5.00");
});

test("checkBalances captures HTTP non-200 or RPC errors in error field", async () => {
  const failingFetch = async () => ({
    ok: false,
    status: 429,
    statusText: "Too Many Requests",
    json: async () => ({ error: { message: "Rate limit exceeded" } }),
  });

  const netConfig = {
    rpcUrl: "https://mainnet.base.org",
    usdcAddress: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
  };
  const balances = await checkBalances("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", netConfig, failingFetch);
  assert.ok(balances.error);
  assert.ok(balances.error.includes("429") || balances.error.includes("Rate limit"));
});
