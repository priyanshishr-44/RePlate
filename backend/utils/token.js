const jwt = require("jsonwebtoken");

function createToken(user) {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
  );
}

function publicUser(user) {
  return {
    id: user._id,
    name: user.name,
    organizationName: user.organizationName,
    email: user.email,
    role: user.role,
    isVerified: user.isVerified
  };
}

module.exports = { createToken, publicUser };
