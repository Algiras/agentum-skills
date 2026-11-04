/**
 * Agentum MCP — Wallet Operations & On-Chain Balance Checker
 * Creates and imports EVM wallets and checks Base ETH and USDC balances via RPC.
 */

const crypto = require("node:crypto");
const { privateKeyToAddress, normalizePrivateKey, keccak256 } = require("./crypto.js");

function generateWallet() {
  const rawBytes = crypto.randomBytes(32);
  const privateKey = "0x" + rawBytes.toString("hex");
  const address = privateKeyToAddress(privateKey);
  return { privateKey, address };
}

function importWallet(inputKey) {
  const normalized = normalizePrivateKey(inputKey);
  const privateKey = "0x" + normalized;
  const address = privateKeyToAddress(privateKey);
  return { privateKey, address };
}

// ERC-20 balanceOf(address) selector: keccak256("balanceOf(address)") -> 0x70a08231
const BALANCE_OF_SELECTOR = "0x70a08231";

function encodeBalanceOfCall(address) {
  const cleanAddr = address.toLowerCase().replace(/^0x/, "");
  const paddedAddr = cleanAddr.padStart(64, "0");
  return BALANCE_OF_SELECTOR + paddedAddr;
}

async function checkBalances(address, networkConfig, fetchImpl = fetch) {
  const rpcUrl = networkConfig.rpcUrl;
  const usdcContract = networkConfig.usdcAddress;

  const results = {
    address,
    network: networkConfig.name,
    eth: "0.0000",
    usdc: "0.00",
    error: null,
  };

  try {
    const signal = typeof AbortSignal !== "undefined" && AbortSignal.timeout
      ? AbortSignal.timeout(10000)
      : undefined;

    // 1. Get ETH balance
    const ethPayload = {
      jsonrpc: "2.0",
      id: 1,
      method: "eth_getBalance",
      params: [address, "latest"],
    };

    const ethRes = await fetchImpl(rpcUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ethPayload),
      signal,
    });

    if (!ethRes.ok) {
      results.error = `HTTP ${ethRes.status}: ${ethRes.statusText || "RPC request failed"}`;
    } else {
      const data = await ethRes.json().catch(() => ({}));
      if (data.error) {
        results.error = data.error.message || "ETH balance RPC error";
      } else if (data.result && typeof data.result === "string") {
        const wei = BigInt(data.result);
        const ethVal = Number(wei) / 1e18;
        results.eth = ethVal.toFixed(4);
      }
    }

    // 2. Get USDC balance (ERC-20 with 6 decimals)
    if (usdcContract && !results.error) {
      const usdcPayload = {
        jsonrpc: "2.0",
        id: 2,
        method: "eth_call",
        params: [
          {
            to: usdcContract,
            data: encodeBalanceOfCall(address),
          },
          "latest",
        ],
      };

      const usdcRes = await fetchImpl(rpcUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usdcPayload),
        signal,
      });

      if (!usdcRes.ok) {
        results.error = `HTTP ${usdcRes.status}: ${usdcRes.statusText || "USDC RPC request failed"}`;
      } else {
        const data = await usdcRes.json().catch(() => ({}));
        if (data.error) {
          results.error = data.error.message || "USDC balance RPC error";
        } else if (data.result && typeof data.result === "string" && data.result !== "0x") {
          const atomic = BigInt(data.result);
          const usdcVal = Number(atomic) / 1e6;
          results.usdc = usdcVal.toFixed(2);
        }
      }
    }
  } catch (err) {
    results.error = err.message || "Failed to reach RPC endpoint";
  }

  return results;
}

module.exports = {
  generateWallet,
  importWallet,
  checkBalances,
  encodeBalanceOfCall,
};
