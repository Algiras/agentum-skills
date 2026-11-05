const test = require("node:test");
const assert = require("node:assert/strict");
const { parse402Challenge, buildSignedX402Payload } = require("../lib/x402-signer.js");

test("parse402Challenge parses base64 PAYMENT-REQUIRED header and JSON-RPC body", () => {
  const challengeObj = {
    x402Version: 2,
    accepts: [
      {
        scheme: "exact",
        network: "eip155:8453",
        amount: "5000",
        asset: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
        payTo: "0x000000000000000000000000000000000000dEaD",
      },
    ],
  };
  const headerVal = Buffer.from(JSON.stringify(challengeObj)).toString("base64");
  const parsed = parse402Challenge({ "payment-required": headerVal });
  assert.ok(parsed);
  assert.equal(parsed.amount, "5000");
  assert.equal(parsed.payTo, "0x000000000000000000000000000000000000dEaD");
  assert.equal(parsed.network, "eip155:8453");
});

test("parse402Challenge parses challenge from MCP result._meta.paymentRequired body", () => {
  const mcpBody = {
    jsonrpc: "2.0",
    id: 1,
    result: {
      isError: true,
      content: [{ type: "text", text: "Daily free quota exhausted" }],
      _meta: {
        paymentRequired: {
          x402: {
            x402Version: 2,
            accepts: [{
              scheme: "exact",
              network: "eip155:8453",
              amount: "5000",
              asset: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
              payTo: "0x000000000000000000000000000000000000dEaD",
            }],
          },
        },
      },
    },
  };
  const parsed = parse402Challenge({}, mcpBody);
  assert.ok(parsed);
  assert.equal(parsed.amount, "5000");
  assert.equal(parsed.payTo, "0x000000000000000000000000000000000000dEaD");
});

test("buildSignedX402Payload constructs cryptographically valid signed x402 header", async () => {
  const challenge = {
    x402Version: 2,
    scheme: "exact",
    network: "eip155:8453",
    amount: "5000",
    asset: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
    payTo: "0x000000000000000000000000000000000000dEaD",
    maxTimeoutSeconds: 300,
  };
  const privKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
  const b64 = await buildSignedX402Payload(challenge, privKey, "eip155:8453");
  const decoded = JSON.parse(Buffer.from(b64, "base64").toString("utf-8"));
  assert.equal(decoded.x402Version, 2);
  assert.equal(decoded.payer.toLowerCase(), "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266");
  assert.ok(decoded.signature.startsWith("0x"));
  assert.equal(decoded.signature.length, 132);
  assert.ok(decoded.payload.authorization);
  assert.equal(decoded.payload.authorization.from.toLowerCase(), "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266");
});

test("buildSignedX402Payload throws when challenge amount exceeds safety cap", async () => {
  const challenge = {
    x402Version: 2,
    scheme: "exact",
    network: "eip155:8453",
    amount: "1000000", // 1.00 USDC > 0.05 USDC cap
    asset: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
    payTo: "0x000000000000000000000000000000000000dEaD",
  };
  const privKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
  await assert.rejects(
    async () => await buildSignedX402Payload(challenge, privKey, "eip155:8453"),
    /exceeds safety cap/
  );
});

test("buildSignedX402Payload throws on network mismatch rather than rewriting challenge network", async () => {
  const sepoliaChallenge = {
    x402Version: 2,
    scheme: "exact",
    network: "eip155:84532", // Base Sepolia
    amount: "5000",
    asset: "0x036CbD53842c5426634e7929541eC2318f3dCF7e", // Sepolia USDC
    payTo: "0x000000000000000000000000000000000000dEaD",
  };
  const privKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";

  // Wallet configured for Base mainnet (eip155:8453) MUST fail fast when server requires Sepolia (eip155:84532)
  await assert.rejects(
    async () => await buildSignedX402Payload(sepoliaChallenge, privKey, "eip155:8453"),
    /Wallet network mismatch: configured eip155:8453 does not match server requirement eip155:84532/
  );
});

test("buildSignedX402Payload signs matching Base Sepolia testnet challenge cleanly", async () => {
  const sepoliaChallenge = {
    x402Version: 2,
    scheme: "exact",
    network: "eip155:84532", // Base Sepolia
    amount: "5000",
    asset: "0x036CbD53842c5426634e7929541eC2318f3dCF7e", // Sepolia USDC
    payTo: "0x000000000000000000000000000000000000dEaD",
  };
  const privKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";

  const b64 = await buildSignedX402Payload(sepoliaChallenge, privKey, "eip155:84532");
  const decoded = JSON.parse(Buffer.from(b64, "base64").toString("utf-8"));
  assert.equal(decoded.network, "eip155:84532");
  assert.equal(decoded.asset, "0x036CbD53842c5426634e7929541eC2318f3dCF7e");
  assert.ok(decoded.signature.startsWith("0x"));
});

test("parse402Challenge selects network matching configured targetNetwork when multiple options exist", () => {
  const challengeObj = {
    x402Version: 2,
    accepts: [
      {
        scheme: "exact",
        network: "eip155:8453",
        amount: "5000",
        asset: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
      },
      {
        scheme: "exact",
        network: "eip155:84532",
        amount: "5000",
        asset: "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
      },
    ],
  };
  const parsedSepolia = parse402Challenge({}, challengeObj, "eip155:84532");
  assert.equal(parsedSepolia.network, "eip155:84532");
  assert.equal(parsedSepolia.asset, "0x036CbD53842c5426634e7929541eC2318f3dCF7e");

  const parsedMainnet = parse402Challenge({}, challengeObj, "eip155:8453");
  assert.equal(parsedMainnet.network, "eip155:8453");
  assert.equal(parsedMainnet.asset, "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913");
});
