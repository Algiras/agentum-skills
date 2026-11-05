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

test("signMessage produces valid 65-byte hex signature verifiable by public key", async () => {
  const privKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
  const addr = privateKeyToAddress(privKey);
  const msg = "Agentum x402 Micropayment Auth";
  const { signature, r, s, v } = await signMessage(msg, privKey);
  assert.ok(signature.startsWith("0x"));
  assert.equal(signature.length, 132); // 65 bytes = 130 hex chars + 0x
  assert.ok(r.startsWith("0x"));
  assert.ok(s.startsWith("0x"));
  assert.ok(v === 27 || v === 28);
  assert.equal(await verifySignature(msg, signature, addr), true);
});

test("verifySignature rejects wrong message, wrong address, zero signature, and malformed signature", async () => {
  const privKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
  const addr = privateKeyToAddress(privKey);
  const msg = "Valid Message";
  const { signature } = await signMessage(msg, privKey);

  // 1. Rejects wrong message
  assert.equal(await verifySignature("Wrong Message", signature, addr), false);

  // 2. Rejects wrong address
  assert.equal(await verifySignature(msg, signature, "0x0000000000000000000000000000000000000001"), false);

  // 3. Rejects zero signature (65 bytes of 0x00)
  const zeroSig = "0x" + "00".repeat(65);
  assert.equal(await verifySignature(msg, zeroSig, addr), false);

  // 4. Rejects malformed signature
  assert.equal(await verifySignature(msg, "0x1234", addr), false);
  assert.equal(await verifySignature(msg, null, addr), false);
  assert.equal(await verifySignature(msg, "", addr), false);
});

test("verifySignature verifies independently produced standard Ethereum signed message", async () => {
  // Test vector: known standard personal_sign signature
  const signerAddress = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
  const msg = "Agentum Standard Test Message";
  // Generated using standard EIP-191 personal_sign with privKey 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
  const expectedSig = "0x902c2ec5ed2a3ece8349f97f1caf92744db317e707d08790eff0ad5a41e2513730523f56ab594505da6aab88815620b705eaf5feaf5fb62e03b5be6bb240a6631c";
  assert.equal(await verifySignature(msg, expectedSig, signerAddress), true);
  assert.equal(await verifySignature("Tampered message", expectedSig, signerAddress), false);
});
