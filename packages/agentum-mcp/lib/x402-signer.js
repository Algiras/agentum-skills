/**
 * Agentum MCP — Official x402 v2 Challenge Signer & Payload Builder
 * Powered by @x402/core, @x402/evm, and viem.
 * Parses HTTP 402 PAYMENT-REQUIRED challenges and signs standard EIP-3009/Permit2 payment authorizations.
 */

const { privateKeyToAccount } = require("viem/accounts");
const { ExactEvmScheme } = require("@x402/evm");
const { x402Client } = require("@x402/core/client");
const { decodePaymentRequiredHeader } = require("@x402/core/http");
const { privateKeyToAddress } = require("./crypto.js");

const DEFAULT_MAX_AMOUNT_CAP = 50000n; // 50,000 atomic units = 0.05 USDC

function parse402Challenge(headers, body) {
  let rawHeader = null;

  if (headers && typeof headers === "object") {
    for (const [k, v] of Object.entries(headers)) {
      const lower = k.toLowerCase();
      if (lower === "payment-required" || lower === "x-payment-required") {
        rawHeader = v;
        break;
      }
    }
  }

  let payload = null;

  if (rawHeader) {
    try {
      payload = decodePaymentRequiredHeader(rawHeader);
    } catch {
      try {
        const decoded = Buffer.from(rawHeader, "base64").toString("utf-8");
        payload = JSON.parse(decoded);
      } catch {
        try {
          payload = JSON.parse(rawHeader);
        } catch {
          payload = null;
        }
      }
    }
  }

  if (!payload && body && typeof body === "object") {
    if (body.result && body.result._meta && body.result._meta.paymentRequired) {
      payload = body.result._meta.paymentRequired.x402 || body.result._meta.paymentRequired;
    } else if (body.error && body.error.data) {
      payload = body.error.data.x402 || body.error.data.challenge?.x402 || null;
    } else if (body.x402) {
      payload = body.x402;
    } else if (body.paymentRequired) {
      payload = body.paymentRequired.x402 || body.paymentRequired;
    }
  }

  if (!payload || typeof payload !== "object") {
    return null;
  }

  const accepts = Array.isArray(payload.accepts) ? payload.accepts : [];
  const exact = accepts.find((a) => a.scheme === "exact") || accepts[0];

  if (!exact) {
    return null;
  }

  return {
    x402Version: payload.x402Version || 2,
    scheme: exact.scheme || "exact",
    network: exact.network || "eip155:8453",
    amount: String(exact.amount || exact.maxAmountRequired || "5000"),
    asset: exact.asset || "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
    payTo: exact.payTo || "0xea7f1083bacf69d3e3aa0c02ad5fbe4f09024f1e",
    maxTimeoutSeconds: exact.maxTimeoutSeconds || 300,
    extra: exact.extra || { name: exact.network === "eip155:8453" ? "USD Coin" : "USDC", version: "2" },
    resource: payload.resource || {},
  };
}

async function buildSignedX402Payload(challenge, privateKey, targetNetwork, maxAmountCap = DEFAULT_MAX_AMOUNT_CAP) {
  if (challenge.amount) {
    const requested = BigInt(challenge.amount);
    const cap = BigInt(maxAmountCap);
    if (requested > cap) {
      throw new Error(`402 challenge requested amount (${challenge.amount}) exceeds safety cap (${cap})`);
    }
  }

  const formattedKey = privateKey.startsWith("0x") ? privateKey : `0x${privateKey}`;
  const account = privateKeyToAccount(formattedKey);
  const client = new x402Client();
  const scheme = new ExactEvmScheme(account);
  client.register("eip155:*", scheme);

  const network = targetNetwork || challenge.network || "eip155:8453";
  const reqChallenge = {
    x402Version: challenge.x402Version || 2,
    resource: challenge.resource || {},
    accepts: [
      {
        scheme: challenge.scheme || "exact",
        network,
        amount: String(challenge.amount || "5000"),
        asset: challenge.asset || "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
        payTo: challenge.payTo || "0xea7f1083bacf69d3e3aa0c02ad5fbe4f09024f1e",
        maxTimeoutSeconds: challenge.maxTimeoutSeconds || 300,
        extra: challenge.extra || {
          name: network === "eip155:8453" ? "USD Coin" : "USDC",
          version: "2",
        },
      },
    ],
  };

  const payload = await client.createPaymentPayload(reqChallenge);

  // Preserve top-level compatibility fields so all server implementations understand it
  payload.payer = account.address;
  payload.signature = payload.payload?.signature;
  payload.scheme = payload.accepted?.scheme;
  payload.network = payload.accepted?.network;
  payload.amount = payload.accepted?.amount;
  payload.asset = payload.accepted?.asset;
  payload.payTo = payload.accepted?.payTo;

  return Buffer.from(JSON.stringify(payload)).toString("base64");
}

module.exports = {
  parse402Challenge,
  buildSignedX402Payload,
  DEFAULT_MAX_AMOUNT_CAP,
};
