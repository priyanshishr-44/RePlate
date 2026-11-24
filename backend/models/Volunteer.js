const mongoose = require("mongoose");

const volunteerSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  area: { type: String, required: true, trim: true },
  availability: { type: String, required: true },
  motivation: { type: String, trim: true, maxlength: 2000 },
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" }
}, { timestamps: true });

module.exports = mongoose.model("Volunteer", volunteerSchema);
