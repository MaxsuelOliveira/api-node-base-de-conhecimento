const crypto = require("crypto");
const { createSigner, createVerifier } = require("fast-jwt");
const secret = process.env.JWT_SECRET || "secretdesenvolvimento";

const sign = createSigner({ key: secret });
const verify = createVerifier({ key: secret });

function md5Hash(text) {
  return crypto.createHash("md5").update(text).digest("hex");
}

function generateToken(payload) {
  const now = Math.floor(Date.now() / 1000);
  return sign({ ...payload, iat: now, exp: now + 7 * 24 * 60 * 60 });
}

function verifyToken(token) {
  try {
    return verify(token);
  } catch {
    return null;
  }
}

function decodeToken(token) {
  try {
    return verify(token);
  } catch (err) {
    return null;
  }
}

module.exports = { generateToken, verifyToken, decodeToken, md5Hash };
