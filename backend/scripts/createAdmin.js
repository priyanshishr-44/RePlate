require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const email = (process.env.ADMIN_EMAIL || "").toLowerCase().trim();
    const password = process.env.ADMIN_PASSWORD || "";
    if (!email || password.length < 12) {
      throw new Error("Set ADMIN_EMAIL and an ADMIN_PASSWORD of at least 12 characters in .env");
    }
    let admin = await User.findOne({ email });
    const hash = await bcrypt.hash(password, 12);
    if (admin) {
      admin.name = process.env.ADMIN_NAME || "RePlate Admin";
      admin.role = "admin";
      admin.password = hash;
      admin.isActive = true;
      await admin.save();
      console.log("Admin account updated.");
    } else {
      await User.create({
        name: process.env.ADMIN_NAME || "RePlate Admin",
        email, password: hash, role: "admin", isVerified: true
      });
      console.log("Admin account created.");
    }
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
})();
