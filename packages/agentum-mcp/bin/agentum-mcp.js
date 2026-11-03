#!/usr/bin/env node
/**
 * Agentum MCP — Stdio to Remote Streamable HTTP Bridge
 *
 * Exposes Agentum's remote MCP server (https://agentum.asimplek.cloud/mcp)
 * over local standard input/output (stdio) for Claude Desktop, Cursor, Zed,
 * Windsurf, and custom AI agent harnesses.
 *
 * Zero external dependencies. Requires Node.js >= 18.0.0 or Bun.
 */

const readline = require("node:readline");

const PKG_VERSION = "0.1.0";
const DEFAULT_ENDPOINT = "https://agentum.asimplek.cloud/mcp";

const args = process.argv.slice(2);
if (args.includes("--version") || args.includes("-v")) {
  console.log(PKG_VERSION);
  process.exit(0);
}

if (args.includes("--help") || args.includes("-h")) {
  console.error(`Agentum MCP Stdio Bridge (v${PKG_VERSION})
Usage:
  npx -y agentum-mcp [options]

Options:
  --help, -h       Show this help message
  --version, -v    Show version number

Environment Variables:
  AGENTUM_URL      Remote MCP server endpoint (default: ${DEFAULT_ENDPOINT})
  AGENTUM_TIMEOUT  Request timeout in milliseconds (default: 30000)
  DEBUG            Set to 1 to enable verbose stderr logging

Configuration for Claude Desktop (claude_desktop_config.json):
{
  "mcpServers": {
    "agentum": {
      "command": "npx",
      "args": ["-y", "agentum-mcp"]
    }
  }
}
`);
  process.exit(0);
}

const endpoint = process.env.AGENTUM_URL || DEFAULT_ENDPOINT;
const timeoutMs = parseInt(process.env.AGENTUM_TIMEOUT || "30000", 10);
const debug = process.env.DEBUG === "1" || process.env.DEBUG === "true";

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

log(`Bridge active -> ${endpoint}`);

rl.on("line", async (line) => {
  const trimmed = line.trim();
  if (!trimmed) return;

  let request;
  try {
    request = JSON.parse(trimmed);
  } catch (err) {
    const errorResponse = {
      jsonrpc: "2.0",
      id: null,
      error: {
        code: -32700,
        message: "Parse error: invalid JSON-RPC payload",
      },
    };
    process.stdout.write(JSON.stringify(errorResponse) + "\n");
    return;
  }

  // Notification without id: fire and forget
  const isNotification = request.id === undefined || request.id === null;

  try {
    const headers = {
      "Content-Type": "application/json",
      "User-Agent": `agentum-mcp-bridge/${PKG_VERSION}`,
    };
    if (sessionId) {
      headers["Mcp-Session-Id"] = sessionId;
    }

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    const res = await fetch(endpoint, {
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
      // Void response for notifications
      return;
    }

    const data = await res.json();
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
