#!/usr/bin/env node
/**
 * Agentum MCP — Stdio to Remote Streamable HTTP Bridge
 * with Autonomous Base EVM Wallet & Micropayment Management
 *
 * Exposes Agentum's remote MCP server (https://agentum.asimplek.cloud/mcp)
 * over local standard input/output (stdio) for Claude Desktop, Cursor, Zed,
 * Windsurf, and custom AI agent harnesses.
 *
 * Zero external dependencies. Requires Node.js >= 18.0.0.
 */

const readline = require("node:readline");
const { loadConfig, saveConfig, getEffectiveAgentId, resolveNetwork, NETWORKS } = require("../lib/config.js");
const { generateWallet, importWallet, checkBalances } = require("../lib/wallet.js");
const { parse402Challenge, buildSignedX402Payload } = require("../lib/x402-signer.js");

const PKG_VERSION = "0.2.1";
const DEFAULT_ENDPOINT = "https://agentum.asimplek.cloud/mcp";

const args = process.argv.slice(2);

// Handle version
if (args.includes("--version") || args.includes("-v")) {
  console.log(PKG_VERSION);
  process.exit(0);
}

// Handle help
if (args.includes("--help") || args.includes("-h")) {
  console.error(`Agentum MCP Bridge & Wallet Manager (v${PKG_VERSION})

Usage:
  npx -y agentum-mcp                                       Start stdio MCP bridge (default)
  npx -y agentum-mcp status                                Check quota countdown & wallet configuration
  npx -y agentum-mcp wallet generate                       Generate a new EVM agent wallet for Base
  npx -y agentum-mcp wallet import <key>                   Import an existing EVM private key
  npx -y agentum-mcp wallet address                        Print active wallet public address
  npx -y agentum-mcp wallet balance                        Query real-time Base ETH & USDC balances via RPC
  npx -y agentum-mcp wallet export                         Export private key
  npx -y agentum-mcp config set-network <mainnet|sepolia>  Switch network (Base Mainnet or Sepolia testnet)

Options:
  --help, -h       Show this help message
  --version, -v    Show version number

Environment Variables:
  AGENTUM_PRIVATE_KEY  Override EVM private key for x402 autonomous micropayments
  AGENTUM_NETWORK      Network ID (eip155:8453 for Base Mainnet, eip155:84532 for Sepolia)
  AGENTUM_URL          Remote MCP server endpoint (default: ${DEFAULT_ENDPOINT})
  AGENTUM_TIMEOUT      Request timeout in milliseconds (default: 30000)
  DEBUG                Set to 1 to enable verbose stderr logging
`);
  process.exit(0);
}

// Subcommands router
const command = args[0];

if (command === "status") {
  handleStatus();
} else if (command === "wallet") {
  handleWallet(args.slice(1));
} else if (command === "config") {
  handleConfig(args.slice(1));
} else {
  // Default: start stdio bridge
  startBridge();
}

async function handleStatus() {
  const config = loadConfig();
  const effectiveAgentId = getEffectiveAgentId(config);
  const net = config.networkConfig;

  console.log(`========================================`);
  console.log(`Agentum Status (v${PKG_VERSION})`);
  console.log(`========================================`);
  console.log(`Config File:     ${config.filePath}`);
  console.log(`Effective ID:    ${effectiveAgentId}`);
  console.log(`Network:         ${net.name} (${net.id})`);
  console.log(`RPC Endpoint:    ${net.rpcUrl}`);
  console.log(`Remote MCP URL:  ${config.remoteUrl}`);
  console.log(`Wallet Status:   ${config.address ? "Configured (" + config.address + ")" : "Not configured (5 free calls/day active)"}`);

  if (config.address) {
    console.log(`\nFetching on-chain balances...`);
    const balances = await checkBalances(config.address, net);
    if (balances.error) {
      console.error(`Warning: ${balances.error}`);
    }
    console.log(`Base ETH (Gas):  ${balances.eth} ETH`);
    console.log(`Base USDC:       ${balances.usdc} USDC`);
    if (net.isTestnet && net.faucets) {
      console.log(`\nFree Testnet Faucets:`);
      net.faucets.forEach((f) => console.log(`  • ${f}`));
    }
  } else {
    console.log(`\nTo enable autonomous micropayments beyond the free tier:`);
    console.log(`  Run: npx agentum-mcp wallet generate`);
  }
  process.exit(0);
}

async function handleWallet(walletArgs) {
  const sub = walletArgs[0];
  const config = loadConfig();

  if (sub === "generate") {
    if (config.privateKey) {
      console.error(`A wallet is already configured: ${config.address}`);
      console.error(`To replace it, run: npx agentum-mcp wallet import <privateKey>`);
      process.exit(1);
    }
    const wallet = generateWallet();
    saveConfig({ privateKey: wallet.privateKey });
    console.log(`\nAutonomous Agent Wallet Generated Successfully!`);
    console.log(`========================================`);
    console.log(`Public Address:  ${wallet.address}`);
    console.log(`Network:         ${config.networkConfig.name}`);
    console.log(`Saved to:        ${config.filePath} (mode 0600)`);
    console.log(`========================================`);
    console.log(`\nNext Steps:`);
    console.log(`1. Fund this address with ~$1.00 of USDC on ${config.networkConfig.name}`);
    console.log(`2. Check balance anytime with: npx agentum-mcp wallet balance`);
    process.exit(0);
  }

  if (sub === "import") {
    const key = walletArgs[1];
    if (!key) {
      console.error(`Usage: npx agentum-mcp wallet import <privateKey>`);
      process.exit(1);
    }
    try {
      const wallet = importWallet(key);
      saveConfig({ privateKey: wallet.privateKey });
      console.log(`Wallet imported successfully!`);
      console.log(`Public Address: ${wallet.address}`);
      process.exit(0);
    } catch (err) {
      console.error(`Failed to import wallet: ${err.message}`);
      process.exit(1);
    }
  }

  if (sub === "address") {
    if (config.address) {
      console.log(config.address);
    } else {
      console.log(`No wallet configured. Run: npx agentum-mcp wallet generate`);
    }
    process.exit(0);
  }

  if (sub === "balance") {
    if (!config.address) {
      console.error(`No wallet configured. Run: npx agentum-mcp wallet generate`);
      process.exit(1);
    }
    console.log(`Checking balance for ${config.address} on ${config.networkConfig.name}...`);
    const balances = await checkBalances(config.address, config.networkConfig);
    console.log(`Base ETH (Gas): ${balances.eth} ETH`);
    console.log(`Base USDC:      ${balances.usdc} USDC`);
    if (balances.error) {
      console.error(`Warning: ${balances.error}`);
    }
    if (config.networkConfig.isTestnet && config.networkConfig.faucets) {
      console.log(`\nFree Testnet Faucets:`);
      config.networkConfig.faucets.forEach((f) => console.log(`  • ${f}`));
    }
    process.exit(0);
  }

  if (sub === "export") {
    if (!config.privateKey) {
      console.error(`No wallet configured.`);
      process.exit(1);
    }
    console.log(`Address:     ${config.address}`);
    console.log(`Private Key: ${config.privateKey}`);
    process.exit(0);
  }

  console.error(`Unknown wallet command: ${sub || ""}\nUsage: wallet <generate|import|address|balance|export>`);
  process.exit(1);
}

function handleConfig(configArgs) {
  const sub = configArgs[0];
  if (sub === "set-network") {
    const net = configArgs[1];
    if (!net) {
      console.error(`Usage: npx agentum-mcp config set-network <mainnet|sepolia>`);
      process.exit(1);
    }
    const resolved = resolveNetwork(net);
    saveConfig({ network: resolved.id });
    console.log(`Network updated to: ${resolved.name} (${resolved.id})`);
    process.exit(0);
  }
  console.error(`Unknown config command: ${sub || ""}\nUsage: config set-network <mainnet|sepolia>`);
  process.exit(1);
}

function startBridge() {
  const config = loadConfig();
  const endpoint = process.env.AGENTUM_URL || config.remoteUrl || DEFAULT_ENDPOINT;
  const timeoutMs = parseInt(process.env.AGENTUM_TIMEOUT || "30000", 10);
  const debug = process.env.DEBUG === "1" || process.env.DEBUG === "true";
  const effectiveAgentId = getEffectiveAgentId(config);

  function log(...msgs) {
    if (debug) {
      process.stderr.write(`[agentum-mcp] ${msgs.join(" ")}\n`);
    }
  }

  let sessionId = null;

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
  });

  log(`Bridge active -> ${endpoint} (Agent ID: ${effectiveAgentId})`);

  rl.on("line", async (line) => {
    const trimmed = line.trim();
    if (!trimmed) return;

    let request;
    try {
      request = JSON.parse(trimmed);
    } catch {
      const errorResponse = {
        jsonrpc: "2.0",
        id: null,
        error: { code: -32700, message: "Parse error: invalid JSON-RPC payload" },
      };
      process.stdout.write(JSON.stringify(errorResponse) + "\n");
      return;
    }

    const isNotification = request.id === undefined || request.id === null;

    try {
      const headers = {
        "Content-Type": "application/json",
        "User-Agent": `agentum-mcp-bridge/${PKG_VERSION}`,
        "X-Agent-Id": effectiveAgentId,
      };
      if (sessionId) {
        headers["Mcp-Session-Id"] = sessionId;
      }

      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), timeoutMs);

      let res = await fetch(endpoint, {
        method: "POST",
        headers,
        body: JSON.stringify(request),
        signal: controller.signal,
      });
      clearTimeout(timer);

      const newSessionId = res.headers.get("mcp-session-id");
      if (newSessionId) {
        sessionId = newSessionId;
      }

      if (res.status === 204 || (res.status === 200 && res.headers.get("content-length") === "0")) {
        return;
      }

      const rawHeaders = {};
      res.headers.forEach((v, k) => {
        rawHeaders[k] = v;
      });

      let data = await res.json().catch(() => ({}));
      const paymentRequiredHeader = rawHeaders["payment-required"] || rawHeaders["x-payment-required"];
      const isPaymentChallenge =
        res.status === 402 ||
        Boolean(paymentRequiredHeader) ||
        Boolean(data?.result?._meta?.paymentRequired);

      // Handle payment challenge autonomously
      if (isPaymentChallenge) {
        const challenge = parse402Challenge(rawHeaders, data);

        if (challenge && config.privateKey) {
          log(`Payment challenge received on ${challenge.network}. Signing autonomous x402 micropayment...`);
          try {
            const signedB64 = await buildSignedX402Payload(challenge, config.privateKey, config.network);
            headers["X-PAYMENT"] = signedB64;
            headers["PAYMENT-SIGNATURE"] = signedB64;

            const retryController = new AbortController();
            const retryTimer = setTimeout(() => retryController.abort(), timeoutMs);

            const retryRes = await fetch(endpoint, {
              method: "POST",
              headers,
              body: JSON.stringify(request),
              signal: retryController.signal,
            });
            clearTimeout(retryTimer);

            const retryData = await retryRes.json().catch(() => ({}));
            const retryPaymentHeader = retryRes.headers.get("payment-required");

            if (retryRes.status === 200 && !retryPaymentHeader && !retryData?.result?._meta?.paymentRequired) {
              process.stdout.write(JSON.stringify(retryData) + "\n");
              return;
            }

            // Retry was not successful (e.g. insufficient on-chain USDC)
            log(`Payment retry failed with status ${retryRes.status}`);
          } catch (signErr) {
            log(`Auto-payment signing failed: ${signErr.message}`);
          }

          // Return structured JSON-RPC error response if retry failed
          if (!isNotification) {
            const failedResponse = {
              jsonrpc: "2.0",
              id: request.id,
              result: {
                content: [
                  {
                    type: "text",
                    text: `Payment authorization failed or wallet has insufficient funds on ${config.networkConfig.name}.\n\nActive Wallet: ${config.address}\nRequired: 0.05 USDC + small gas\n\nCheck balance: npx agentum-mcp wallet balance`,
                  },
                ],
                isError: true,
              },
            };
            process.stdout.write(JSON.stringify(failedResponse) + "\n");
            return;
          }
        } else if (!config.privateKey && !isNotification) {
          // Friendly guidance for LLMs and developers
          const quotaExceededResponse = {
            jsonrpc: "2.0",
            id: request.id,
            result: {
              content: [
                {
                  type: "text",
                  text: `Daily free quota (5 calls) exhausted. To enable autonomous micropayments (0.05 USDC/call on Base), configure a wallet by running:\n\n  npx -y agentum-mcp wallet generate\n\nOr fund your existing wallet address: ${effectiveAgentId}`,
                },
              ],
              isError: true,
            },
          };
          process.stdout.write(JSON.stringify(quotaExceededResponse) + "\n");
          return;
        }
      }

      process.stdout.write(JSON.stringify(data) + "\n");
    } catch (err) {
      log(`Forwarding failed: ${err.message}`);
      if (!isNotification) {
        const errorResponse = {
          jsonrpc: "2.0",
          id: request.id,
          error: {
            code: -32603,
            message: `Agentum Bridge Error: ${err.message}`,
          },
        };
        process.stdout.write(JSON.stringify(errorResponse) + "\n");
      }
    }
  });

  rl.on("close", () => {
    log("Stdin closed, exiting.");
    process.exit(0);
  });

  process.on("SIGINT", () => process.exit(0));
  process.on("SIGTERM", () => process.exit(0));
}
