
const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  latitude: {
    type: Number,
    min: -90,
    max: 90
  },
  longitude: {
    type: Number,
    min: -180,
    max: 180
  },
  address: {
    type: String,
    trim: true
  }
}, { _id: false });

const liveLocationSchema = new mongoose.Schema({
  latitude: {
    type: Number,
    min: -90,
    max: 90
  },
  longitude: {
    type: Number,
    min: -180,
    max: 180
  },
  updatedAt: Date
}, { _id: false });

const trackingPointSchema = new mongoose.Schema({
  latitude: Number,
  longitude: Number,
  recordedAt: {
    type: Date,
    default: Date.now
  }
}, { _id: false });

const donationSchema = new mongoose.Schema({
  donor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  foodType: {
    type: String,
    required: true,
    trim: true
  },

  category: {
    type: String,
    required: true
  },

  quantity: {
    type: String,
    required: true
  },

  servings: {
    type: Number,
    min: 1
  },

  prepDate: {
    type: String,
    required: true
  },

  bestBefore: {
    type: String,
    required: true
  },

  address: {
    type: String,
    required: true
  },

  contactName: {
    type: String,
    required: true
  },

  phone: {
    type: String,
    required: true
  },

  email: {
    type: String,
    lowercase: true,
    trim: true
  },

  status: {
    type: String,
    enum: [
      "available",
      "requested",
      "assigned",
      "picked_up",
      "delivered",
      "rejected"
    ],
    default: "available"
  },

  assignedNgo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null
  },

  // Volunteer must have an authenticated User account.
  assignedVolunteer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null
  },

  // Donor pickup location
  pickupLocation: {
    type: locationSchema,
    default: () => ({})
  },

  // NGO delivery destination
  destinationLocation: {
    type: locationSchema,
    default: () => ({})
  },

  // Latest volunteer GPS position
  liveLocation: {
    type: liveLocationSchema,
    default: () => ({})
  },

  trackingActive: {
    type: Boolean,
    default: false
  },

  trackingStartedAt: {
    type: Date,
    default: null
  },

  trackingStoppedAt: {
    type: Date,
    default: null
  },

  trackingHistory: {
    type: [trackingPointSchema],
    default: []
  },

  requestNote: {
    type: String,
    trim: true,
    maxlength: 1000
  }

}, { timestamps: true });

module.exports = mongoose.model("Donation", donationSchema);
