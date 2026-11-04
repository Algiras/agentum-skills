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

test("buildSignedX402Payload constructs cryptographically valid signed x402 header", () => {
  const challenge = {
    x402Version: 2,
    scheme: "exact",
    network: "eip155:8453",
    amount: "5000",
    asset: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
    payTo: "0x000000000000000000000000000000000000dEaD",
  };
  const privKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
  const b64 = buildSignedX402Payload(challenge, privKey, "eip155:8453");
  const decoded = JSON.parse(Buffer.from(b64, "base64").toString("utf-8"));
  assert.equal(decoded.x402Version, 2);
  assert.equal(decoded.payer.toLowerCase(), "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266");
  assert.ok(decoded.signature.startsWith("0x"));
  assert.equal(decoded.signature.length, 132);
});
