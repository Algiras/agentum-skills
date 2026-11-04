const test = require("node:test");
const assert = require("node:assert/strict");
const { keccak256, privateKeyToAddress, signMessage, verifySignature } = require("../lib/crypto.js");

test("keccak256 matches Ethereum test vector for empty string", () => {
  const hash = keccak256("");
  assert.equal(hash, "0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470");
});

test("privateKeyToAddress derives correct Ethereum address from known private key", () => {
  // Known test key
  const privKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
  const expectedAddr = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
  const addr = privateKeyToAddress(privKey);
  assert.equal(addr.toLowerCase(), expectedAddr.toLowerCase());
});

test("signMessage produces valid 65-byte hex signature verifiable by public key", () => {
  const privKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
  const addr = privateKeyToAddress(privKey);
  const msg = "Agentum x402 Micropayment Auth";
  const { signature } = signMessage(msg, privKey);
  assert.ok(signature.startsWith("0x"));
  assert.equal(signature.length, 132); // 65 bytes = 130 hex chars + 0x
  assert.equal(verifySignature(msg, signature, addr), true);
});
