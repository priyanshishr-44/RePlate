const express = require("express");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const User = require("../models/User");
const { protect } = require("../middleware/auth");
const { createToken, publicUser } = require("../utils/token");

const router = express.Router();

// Public registration is limited to donor and NGO accounts.
router.post("/register", async (req, res) => {
  try {
    const { name, organizationName, email, password, role, phone, address } = req.body;
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "Name, email, password and role are required." });
    }
    if (!["donor", "ngo"].includes(role)) {
      return res.status(403).json({ message: "Admin accounts cannot be created through public registration." });
    }
    if (password.length < 8) {
      return res.status(400).json({ message: "Password must contain at least 8 characters." });
    }
    const normalizedEmail = email.toLowerCase().trim();
    if (await User.findOne({ email: normalizedEmail })) {
      return res.status(409).json({ message: "An account with this email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      name: name.trim(),
      organizationName,
      email: normalizedEmail,
      password: hashedPassword,
      role,
      phone,
      address
    });

    const token = createToken(user);
    return res.status(201).json({ message: "Account created successfully.", token, user: publicUser(user) });
  } catch (error) {
    return res.status(500).json({ message: "Could not create account.", error: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({ message: "Email, password and role are required." });
    }
    if (!["donor", "ngo", "admin"].includes(role)) {
      return res.status(400).json({ message: "Invalid account role." });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() }).select("+password");
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Incorrect email or password." });
    }
    if (user.role !== role) {
      return res.status(403).json({ message: `This account is registered as ${user.role}, not ${role}.` });
    }
    if (!user.isActive) return res.status(403).json({ message: "Your account has been disabled." });

    const token = createToken(user);
    return res.json({ message: "Login successful.", token, user: publicUser(user) });
  } catch (error) {
    return res.status(500).json({ message: "Login failed.", error: error.message });
  }
});

router.get("/me", protect, (req, res) => {
  res.json({ user: publicUser(req.user) });
});

// Generates a reset token. In this starter project it is logged on the server;
// connect an email provider before using this flow outside local development.
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required." });
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (user) {
      const resetToken = crypto.randomBytes(32).toString("hex");
      user.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
      user.passwordResetExpires = Date.now() + 15 * 60 * 1000;
      await user.save();
      console.log(`Password reset token for ${user.email}: ${resetToken}`);
    }
    return res.json({ message: "If an account exists, password reset instructions will be sent." });
  } catch (error) {
    return res.status(500).json({ message: "Could not process password reset." });
  }
});

router.post("/reset-password/:token", async (req, res) => {
  try {
    const hashedToken = crypto.createHash("sha256").update(req.params.token).digest("hex");
    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() }
    }).select("+password");
    if (!user) return res.status(400).json({ message: "Reset token is invalid or expired." });
    if (!req.body.password || req.body.password.length < 8) {
      return res.status(400).json({ message: "New password must contain at least 8 characters." });
    }
    user.password = await bcrypt.hash(req.body.password, 12);
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    res.json({ message: "Password updated successfully. Please log in." });
  } catch (error) {
    res.status(500).json({ message: "Could not reset password." });
  }
});

module.exports = router;
