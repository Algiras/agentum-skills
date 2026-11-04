const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const os = require("node:os");
const { loadConfig, saveConfig, getEffectiveAgentId } = require("../lib/config.js");

const testDir = path.join(os.tmpdir(), "agentum-config-test-" + Date.now());
const testConfigPath = path.join(testDir, "config.json");

test("loadConfig returns safe defaults when config file does not exist", () => {
  const cfg = loadConfig(testConfigPath);
  assert.equal(cfg.network, "eip155:8453");
  assert.ok(cfg.agentId.startsWith("agent_"));
  assert.equal(cfg.privateKey, null);
  assert.equal(cfg.address, null);
});

test("saveConfig writes config file with mode 0600", () => {
  saveConfig({ privateKey: "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80" }, testConfigPath);
  assert.ok(fs.existsSync(testConfigPath));
  const stat = fs.statSync(testConfigPath);
  assert.equal(stat.mode & 0o777, 0o600);
  const reloaded = loadConfig(testConfigPath);
  assert.equal(reloaded.privateKey, "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80");
  assert.equal(reloaded.address.toLowerCase(), "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266");
});

test("getEffectiveAgentId uses address if wallet exists or falls back to persistent agentId", () => {
  const cfg = loadConfig(testConfigPath);
  const agentId = getEffectiveAgentId(cfg);
  assert.equal(agentId.toLowerCase(), "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266");
});

test("loadConfig handles corrupt null JSON safely without throwing", () => {
  const corruptPath = path.join(testDir, "corrupt.json");
  fs.writeFileSync(corruptPath, "null\n");
  const cfg = loadConfig(corruptPath);
  assert.ok(cfg.agentId.startsWith("agent_"));
  assert.equal(cfg.privateKey, null);
});

test("saveConfig handles privateKey with leading/trailing whitespace", () => {
  const wsPath = path.join(testDir, "ws.json");
  saveConfig({ privateKey: "  0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80  " }, wsPath);
  const reloaded = loadConfig(wsPath);
  assert.equal(reloaded.privateKey, "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80");
  assert.equal(reloaded.address.toLowerCase(), "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266");
});

test("saveConfig ensures directory has 0700 permissions even if pre-created", () => {
  const preDir = path.join(os.tmpdir(), "agentum-precreated-" + Date.now());
  fs.mkdirSync(preDir, { mode: 0o777 });
  const cfgPath = path.join(preDir, "config.json");
  saveConfig({ network: "eip155:8453" }, cfgPath);
  const dirStat = fs.statSync(preDir);
  assert.equal(dirStat.mode & 0o777, 0o700);
});
