/**
 * Agentum MCP — Secure Configuration & Storage Manager
 * Stores local credentials, persistent agent ID, and network selection
 * in ~/.agentum/config.json with mode 0600.
 */

const fs = require("node:fs");
const path = require("node:path");
const os = require("node:os");
const crypto = require("node:crypto");
const { privateKeyToAddress, normalizePrivateKey } = require("./crypto.js");

const DEFAULT_CONFIG_DIR = path.join(os.homedir(), ".agentum");
const DEFAULT_CONFIG_PATH = path.join(DEFAULT_CONFIG_DIR, "config.json");

const NETWORKS = {
  "eip155:8453": {
    id: "eip155:8453",
    alias: ["mainnet", "base"],
    name: "Base Mainnet",
    chainId: 8453,
    rpcUrl: "https://mainnet.base.org",
    usdcAddress: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
    explorerUrl: "https://basescan.org",
    isTestnet: false,
  },
  "eip155:84532": {
    id: "eip155:84532",
    alias: ["sepolia", "base-sepolia", "testnet"],
    name: "Base Sepolia Testnet",
    chainId: 84532,
    rpcUrl: "https://sepolia.base.org",
    usdcAddress: "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
    explorerUrl: "https://sepolia.basescan.org",
    isTestnet: true,
    faucets: [
      "https://faucet.circle.com/",
      "https://www.alchemy.com/faucets/base-sepolia",
    ],
  },
};

function resolveNetwork(input) {
  if (!input) return NETWORKS["eip155:8453"];
  const lower = String(input).trim().toLowerCase();
  if (NETWORKS[lower]) return NETWORKS[lower];
  for (const net of Object.values(NETWORKS)) {
    if (net.alias.includes(lower)) return net;
  }
  return NETWORKS["eip155:8453"];
}

function generateDefaultAgentId() {
  return "agent_" + crypto.randomBytes(8).toString("hex");
}

function loadConfig(customPath) {
  const filePath = customPath || DEFAULT_CONFIG_PATH;
  let stored = {};

  if (fs.existsSync(filePath)) {
    try {
      const raw = fs.readFileSync(filePath, "utf-8");
      stored = JSON.parse(raw);
    } catch {
      stored = {};
    }
  }

  if (!stored || typeof stored !== "object" || Array.isArray(stored)) {
    stored = {};
  }

  const agentId = stored.agentId || generateDefaultAgentId();
  const rawKey = process.env.AGENTUM_PRIVATE_KEY || stored.privateKey || null;
  const networkInput = process.env.AGENTUM_NETWORK || stored.network || "eip155:8453";
  const networkConfig = resolveNetwork(networkInput);

  let address = null;
  let privateKey = null;

  if (rawKey) {
    try {
      address = privateKeyToAddress(rawKey);
      privateKey = rawKey.startsWith("0x") ? rawKey : "0x" + rawKey;
    } catch {
      // Invalid key ignored, stays null
    }
  }

  return {
    filePath,
    agentId,
    privateKey,
    address,
    network: networkConfig.id,
    networkConfig,
    remoteUrl: stored.remoteUrl || process.env.AGENTUM_URL || "https://agentum.asimplek.cloud/mcp",
  };
}

function saveConfig(updates, customPath) {
  const filePath = customPath || DEFAULT_CONFIG_PATH;
  const dirPath = path.dirname(filePath);

  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true, mode: 0o700 });
  }
  try {
    fs.chmodSync(dirPath, 0o700);
  } catch {
    // Best effort on non-POSIX
  }

  let current = {};
  if (fs.existsSync(filePath)) {
    try {
      current = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    } catch {
      current = {};
    }
  }

  if (!current || typeof current !== "object" || Array.isArray(current)) {
    current = {};
  }

  if (!current.agentId) {
    current.agentId = generateDefaultAgentId();
  }

  if (updates.privateKey !== undefined) {
    if (updates.privateKey) {
      const normalized = normalizePrivateKey(updates.privateKey);
      current.privateKey = "0x" + normalized;
    } else {
      delete current.privateKey;
    }
  }

  if (updates.network !== undefined) {
    current.network = resolveNetwork(updates.network).id;
  }

  if (updates.remoteUrl !== undefined) {
    current.remoteUrl = updates.remoteUrl;
  }

  fs.writeFileSync(filePath, JSON.stringify(current, null, 2) + "\n", {
    mode: 0o600,
    encoding: "utf-8",
  });
  // Ensure mode 0600 even if file pre-existed with different umask
  try {
    fs.chmodSync(filePath, 0o600);
  } catch {
    // Best effort on non-POSIX
  }
}

function getEffectiveAgentId(config) {
  if (config.address) {
    return config.address;
  }
  return config.agentId;
}

module.exports = {
  DEFAULT_CONFIG_PATH,
  NETWORKS,
  resolveNetwork,
  loadConfig,
  saveConfig,
  getEffectiveAgentId,
};
