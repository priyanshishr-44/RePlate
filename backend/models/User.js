
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },

  organizationName: {
    type: String,
    trim: true,
    maxlength: 150
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },

  password: {
    type: String,
    required: true,
    select: false
  },

  // Added volunteer role
  role: {
    type: String,
    enum: ["donor", "ngo", "admin", "volunteer"],
    required: true
  },

  phone: {
    type: String,
    trim: true
  },

  address: {
    type: String,
    trim: true
  },

  // Volunteer verification and account status
  isVerified: {
    type: Boolean,
    default: false
  },

  isActive: {
    type: Boolean,
    default: true
  },

  // Password reset fields
  passwordResetToken: {
    type: String,
    select: false
  },

  passwordResetExpires: {
    type: Date,
    select: false
  }

}, {
  timestamps: true
});

module.exports = mongoose.model("User", userSchema);
