/**
 * Agentum MCP — x402 v2 Challenge Signer & Payload Builder
 * Parses HTTP 402 PAYMENT-REQUIRED challenges and signs payment authorizations.
 */

const { privateKeyToAddress, signMessage } = require("./crypto.js");

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

  if (!payload && body && typeof body === "object") {
    if (body.error && body.error.data) {
      payload = body.error.data.x402 || body.error.data.challenge?.x402 || null;
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
    payTo: exact.payTo || "0x000000000000000000000000000000000000dEaD",
    resource: payload.resource || {},
  };
}

function buildSignedX402Payload(challenge, privateKey, targetNetwork) {
  const payer = privateKeyToAddress(privateKey);
  const timestamp = Math.floor(Date.now() / 1000);
  const network = targetNetwork || challenge.network || "eip155:8453";

  // Construct canonical payment authorization string
  const authMessage = [
    "Agentum x402 Micropayment Auth",
    `Version: ${challenge.x402Version || 2}`,
    `Network: ${network}`,
    `Amount: ${challenge.amount}`,
    `PayTo: ${challenge.payTo}`,
    `Payer: ${payer}`,
    `Timestamp: ${timestamp}`,
  ].join("\n");

  const { signature } = signMessage(authMessage, privateKey);

  const payload = {
    x402Version: challenge.x402Version || 2,
    scheme: challenge.scheme || "exact",
    network,
    asset: challenge.asset,
    amount: challenge.amount,
    payTo: challenge.payTo,
    payer,
    timestamp,
    signature,
    authMessage,
  };

  return Buffer.from(JSON.stringify(payload)).toString("base64");
}

module.exports = {
  parse402Challenge,
  buildSignedX402Payload,
};
