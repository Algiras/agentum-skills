const test = require("node:test");
const assert = require("node:assert/strict");
const { spawnSync } = require("node:child_process");
const path = require("node:path");

const binPath = path.resolve(__dirname, "../bin/agentum-mcp.js");

test("CLI --help displays wallet and payment commands", () => {
  const result = spawnSync("node", [binPath, "--help"], { encoding: "utf-8" });
  assert.equal(result.status, 0);
  assert.ok(result.stderr.includes("wallet generate") || result.stdout.includes("wallet generate"));
  assert.ok(result.stderr.includes("status") || result.stdout.includes("status"));
});

test("CLI status returns quota info and wallet state", () => {
  const result = spawnSync("node", [binPath, "status"], { encoding: "utf-8" });
  assert.equal(result.status, 0);
  const out = result.stdout + result.stderr;
  assert.ok(out.includes("Agentum Status") || out.includes("Wallet Address"));
});

test("CLI wallet address prints 0x address or unconfigured notice", () => {
  const result = spawnSync("node", [binPath, "wallet", "address"], { encoding: "utf-8" });
  assert.equal(result.status, 0);
  const out = result.stdout + result.stderr;
  assert.ok(out.includes("0x") || out.includes("No wallet configured"));
});
