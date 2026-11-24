const mongoose = require("mongoose");

const foodRequestSchema = new mongoose.Schema({
  donation: { type: mongoose.Schema.Types.ObjectId, ref: "Donation", required: true },
  ngo: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  message: { type: String, trim: true, maxlength: 1000 },
  status: { type: String, enum: ["pending", "approved", "rejected", "completed"], default: "pending" }
}, { timestamps: true });

foodRequestSchema.index({ donation: 1, ngo: 1 }, { unique: true });

module.exports = mongoose.model("FoodRequest", foodRequestSchema);
