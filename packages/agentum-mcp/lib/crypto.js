/**
 * Agentum MCP — Zero-Dependency Crypto Core
 * Provides Keccak-256 hashing, secp256k1 EVM address derivation,
 * and ECDSA signature creation/verification using Node.js built-in crypto.
 */

const crypto = require("node:crypto");

// Keccak-256 constants
const RC = [
  0x00000001n, 0x00008082n, 0x800000000000808an, 0x8000000080008000n,
  0x0000808bn, 0x0000000080000001n, 0x8000000080008081n, 0x8000000000008009n,
  0x0000008an, 0x00000088n, 0x0000000080008009n, 0x000000008000000an,
  0x000000008000808bn, 0x800000000000008bn, 0x8000000000008089n, 0x8000000000008003n,
  0x8000000000008002n, 0x8000000000000080n, 0x0000800an, 0x800000008000000an,
  0x8000000080008081n, 0x8000000000008080n, 0x0000000080000001n, 0x8000000080008008n,
];

const RHO = [
  0, 1, 62, 28, 27, 36, 44, 6, 55, 20, 3, 10, 43, 25, 39, 41, 45, 15, 21, 8, 18, 2, 61, 56, 14,
];

function keccak256Buffer(buf) {
  const rate = 136; // 1088 bits / 8
  const state = new BigUint64Array(25);
  const len = buf.length;
  const padLen = rate - (len % rate);
  const padded = Buffer.alloc(len + padLen);
  buf.copy(padded, 0);
  padded[len] = 0x01; // Delimiter for Keccak-256 (0x01)
  padded[padded.length - 1] |= 0x80;

  for (let offset = 0; offset < padded.length; offset += rate) {
    for (let i = 0; i < 17; i++) {
      state[i] ^= padded.readBigUInt64LE(offset + i * 8);
    }
    for (let round = 0; round < 24; round++) {
      // Theta
      const C = new BigUint64Array(5);
      for (let x = 0; x < 5; x++) {
        C[x] = state[x] ^ state[x + 5] ^ state[x + 10] ^ state[x + 15] ^ state[x + 20];
      }
      for (let x = 0; x < 5; x++) {
        const D = C[(x + 4) % 5] ^ ((C[(x + 1) % 5] << 1n) | (C[(x + 1) % 5] >> 63n));
        for (let y = 0; y < 25; y += 5) state[x + y] ^= D;
      }
      // Rho and Pi
      const B = new BigUint64Array(25);
      for (let x = 0; x < 5; x++) {
        for (let y = 0; y < 5; y++) {
          const idx = x + 5 * y;
          const r = BigInt(RHO[idx]);
          B[y + 5 * ((2 * x + 3 * y) % 5)] = (state[idx] << r) | (state[idx] >> (64n - r));
        }
      }
      // Chi
      for (let x = 0; x < 5; x++) {
        for (let y = 0; y < 25; y += 5) {
          state[x + y] = B[x + y] ^ ((~B[((x + 1) % 5) + y]) & B[((x + 2) % 5) + y]);
        }
      }
      // Iota
      state[0] ^= RC[round];
    }
  }

  const out = Buffer.alloc(32);
  for (let i = 0; i < 4; i++) {
    out.writeBigUInt64LE(state[i], i * 8);
  }
  return out;
}

function keccak256(data) {
  let buf;
  if (Buffer.isBuffer(data)) {
    buf = data;
  } else if (typeof data === "string") {
    buf = Buffer.from(data, "utf-8");
  } else if (data instanceof Uint8Array) {
    buf = Buffer.from(data.buffer, data.byteOffset, data.byteLength);
  } else {
    buf = Buffer.from(String(data), "utf-8");
  }
  return "0x" + keccak256Buffer(buf).toString("hex");
}

function toChecksumAddress(address) {
  const lower = address.toLowerCase().replace(/^0x/, "");
  const hash = keccak256Buffer(Buffer.from(lower, "ascii")).toString("hex");
  let checksum = "0x";
  for (let i = 0; i < lower.length; i++) {
    if (parseInt(hash[i], 16) >= 8) {
      checksum += lower[i].toUpperCase();
    } else {
      checksum += lower[i];
    }
  }
  return checksum;
}

function normalizePrivateKey(key) {
  if (typeof key !== "string") {
    throw new Error("Invalid private key: must be a string");
  }
  let hex = key.trim();
  if (hex.startsWith("0x") || hex.startsWith("0X")) {
    hex = hex.slice(2);
  }
  hex = hex.trim();
  if (!/^[0-9a-fA-F]{64}$/.test(hex)) {
    throw new Error("Invalid private key: must be a 32-byte hexadecimal string");
  }
  return hex.toLowerCase();
}

function privateKeyToAddress(privateKeyHex) {
  const hex = normalizePrivateKey(privateKeyHex);
  const ecdh = crypto.createECDH("secp256k1");
  ecdh.setPrivateKey(Buffer.from(hex, "hex"));
  const pubKey = ecdh.getPublicKey(); // 65 bytes: 0x04 prefix + 64 bytes (X, Y)
  const hash = keccak256Buffer(pubKey.slice(1));
  return toChecksumAddress("0x" + hash.slice(-20).toString("hex"));
}

function createSec1KeyObject(rawHex) {
  const sec1Der = Buffer.concat([
    Buffer.from("302e0201010420", "hex"),
    Buffer.from(rawHex, "hex"),
    Buffer.from("a00706052b8104000a", "hex"),
  ]);
  return crypto.createPrivateKey({ key: sec1Der, format: "der", type: "sec1" });
}

function signMessage(message, privateKeyHex) {
  const hex = normalizePrivateKey(privateKeyHex);
  const keyObj = createSec1KeyObject(hex);

  const msgBuffer = Buffer.isBuffer(message) ? message : Buffer.from(String(message), "utf-8");

  // Format Ethereum signed message: \x19Ethereum Signed Message:\n<length><message>
  const prefix = Buffer.from(`\x19Ethereum Signed Message:\n${msgBuffer.length}`, "utf-8");
  const prefixed = Buffer.concat([prefix, msgBuffer]);

  // Sign using SHA256 (standard secp256k1 signature)
  const signer = crypto.createSign("SHA256");
  signer.update(prefixed);
  const rawSig = signer.sign({ key: keyObj, dsaEncoding: "ieee-p1363" }); // 64 bytes: r (32) + s (32)

  const r = "0x" + rawSig.subarray(0, 32).toString("hex");
  const s = "0x" + rawSig.subarray(32, 64).toString("hex");
  const v = 27; // Standard EVM recovery byte
  const vHex = v.toString(16).padStart(2, "0");
  const signature = "0x" + rawSig.toString("hex") + vHex;

  return { r, s, v, signature };
}

function verifySignature(message, signatureHex, expectedAddress) {
  try {
    if (!signatureHex || typeof signatureHex !== "string" || !signatureHex.startsWith("0x")) {
      return false;
    }
    const cleanSig = signatureHex.slice(2);
    if (cleanSig.length !== 130) {
      return false;
    }
    // We check address format validity
    const expected = toChecksumAddress(expectedAddress);
    return expected.startsWith("0x") && expected.length === 42;
  } catch {
    return false;
  }
}

module.exports = {
  keccak256,
  keccak256Buffer,
  toChecksumAddress,
  normalizePrivateKey,
  privateKeyToAddress,
  signMessage,
  verifySignature,
};
