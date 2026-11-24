
const express = require("express");
const mongoose = require("mongoose");

const Donation = require("../models/Donation");
const FoodRequest = require("../models/FoodRequest");
const User = require("../models/User");

const { protect, allowRoles } = require("../middleware/auth");

const router = express.Router();

// Check whether a user can view a donation
function canViewDonation(donation, user) {
  const userId = String(user._id);

  if (user.role === "admin") return true;

  if (user.role === "donor") {
    return String(donation.donor?._id || donation.donor) === userId;
  }

  if (user.role === "ngo") {
    return String(donation.assignedNgo?._id || donation.assignedNgo) === userId;
  }

  if (user.role === "volunteer") {
    return String(donation.assignedVolunteer?._id || donation.assignedVolunteer) === userId;
  }

  return false;
}

// Validate GPS coordinates
function validCoordinates(latitude, longitude) {
  return (
    Number.isFinite(Number(latitude)) &&
    Number.isFinite(Number(longitude)) &&
    Number(latitude) >= -90 &&
    Number(latitude) <= 90 &&
    Number(longitude) >= -180 &&
    Number(longitude) <= 180
  );
}

// GET ALL DONATIONS
router.get("/", protect, async (req, res) => {
  try {
    let filter = {};

    if (req.user.role === "donor") {
      filter.donor = req.user._id;
    } else if (req.user.role === "ngo") {
      filter = {
        $or: [
          { status: "available" },
          { assignedNgo: req.user._id }
        ]
      };
    } else if (req.user.role === "volunteer") {
      filter.assignedVolunteer = req.user._id;
    }

    const donations = await Donation.find(filter)
      .populate("donor", "name organizationName email")
      .populate("assignedNgo", "name organizationName email")
      .populate("assignedVolunteer", "name email phone")
      .sort({ createdAt: -1 });

    res.json({ donations });
  } catch (error) {
    res.status(500).json({ message: "Could not load donations." });
  }
});

// CREATE DONATION
router.post("/", protect, allowRoles("donor"), async (req, res) => {
  try {
    const {
      foodType,
      category,
      quantity,
      servings,
      prepDate,
      bestBefore,
      address,
      contactName,
      phone,
      email,
      pickupLocation
    } = req.body;

    if (
      !foodType ||
      !category ||
      !quantity ||
      !prepDate ||
      !bestBefore ||
      !address ||
      !contactName ||
      !phone
    ) {
      return res.status(400).json({
        message: "Please complete all required donation fields."
      });
    }

    if (
      pickupLocation &&
      !validCoordinates(
        pickupLocation.latitude,
        pickupLocation.longitude
      )
    ) {
      return res.status(400).json({
        message: "Invalid pickup GPS coordinates."
      });
    }

    const donation = await Donation.create({
      donor: req.user._id,
      foodType,
      category,
      quantity,
      servings: servings ? Number(servings) : undefined,
      prepDate,
      bestBefore,
      address,
      contactName,
      phone,
      email,
      pickupLocation
    });

    res.status(201).json({
      message: "Donation submitted successfully.",
      donation
    });
  } catch (error) {
    res.status(500).json({
      message: "Could not submit donation.",
      error: error.message
    });
  }
});

// GET MY REQUESTS
router.get("/requests/mine", protect, allowRoles("ngo", "admin"), async (req, res) => {
  try {
    const filter =
      req.user.role === "admin"
        ? {}
        : { ngo: req.user._id };

    const requests = await FoodRequest.find(filter)
      .populate("donation")
      .populate("ngo", "name organizationName email")
      .sort({ createdAt: -1 });

    res.json({ requests });
  } catch (error) {
    res.status(500).json({
      message: "Could not load pickup requests."
    });
  }
});

// ADMIN APPROVES OR REJECTS NGO REQUEST
router.patch("/requests/:requestId", protect, allowRoles("admin"), async (req, res) => {
  try {
    const { status } = req.body;

    if (!["approved", "rejected", "completed"].includes(status)) {
      return res.status(400).json({
        message: "Invalid request status."
      });
    }

    const request = await FoodRequest.findById(req.params.requestId);

    if (!request) {
      return res.status(404).json({
        message: "Request not found."
      });
    }

    const donation = await Donation.findById(request.donation);

    if (!donation) {
      return res.status(404).json({
        message: "Donation not found."
      });
    }

    if (status === "approved") {
      if (donation.status !== "requested") {
        return res.status(409).json({
          message: "This donation is no longer awaiting approval."
        });
      }

      donation.status = "assigned";
      donation.assignedNgo = request.ngo;
    }

    if (status === "rejected") {
      donation.status = "available";
      donation.assignedNgo = undefined;
    }

    if (status === "completed") {
      donation.status = "delivered";
      donation.trackingActive = false;
      donation.trackingStoppedAt = new Date();
    }

    request.status = status;

    await donation.save();
    await request.save();

    res.json({
      message: "Request updated successfully.",
      request,
      donation
    });
  } catch (error) {
    res.status(500).json({
      message: "Could not update request.",
      error: error.message
    });
  }
});

// NGO REQUESTS A DONATION
router.post("/:id/request", protect, allowRoles("ngo"), async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: "Invalid donation ID."
      });
    }

    const donation = await Donation.findOneAndUpdate(
      {
        _id: req.params.id,
        status: "available"
      },
      {
        $set: {
          status: "requested",
          requestNote: req.body.message || ""
        }
      },
      { new: true }
    );

    if (!donation) {
      return res.status(409).json({
        message: "This donation is no longer available."
      });
    }

    try {
      const request = await FoodRequest.create({
        donation: donation._id,
        ngo: req.user._id,
        message: req.body.message || ""
      });

      return res.status(201).json({
        message: "Pickup request submitted.",
        request
      });
    } catch (error) {
      await Donation.findByIdAndUpdate(donation._id, {
        $set: { status: "available", requestNote: "" }
      });

      if (error.code === 11000) {
        return res.status(409).json({
          message: "You have already requested this donation."
        });
      }

      throw error;
    }
  } catch (error) {
    res.status(500).json({
      message: "Could not submit pickup request."
    });
  }
});

// ADMIN ASSIGNS APPROVED VOLUNTEER
router.patch("/:id/assign-volunteer", protect, allowRoles("admin"), async (req, res) => {
  try {
    const { volunteerId } = req.body;

    if (!mongoose.isValidObjectId(req.params.id) ||
        !mongoose.isValidObjectId(volunteerId)) {
      return res.status(400).json({
        message: "Invalid donation or volunteer ID."
      });
    }

    const donation = await Donation.findById(req.params.id);

    if (!donation) {
      return res.status(404).json({
        message: "Donation not found."
      });
    }

    if (donation.status !== "assigned") {
      return res.status(400).json({
        message: "Approve an NGO request before assigning a volunteer."
      });
    }

    const volunteer = await User.findOne({
      _id: volunteerId,
      role: "volunteer",
      isActive: true
    });

    if (!volunteer) {
      return res.status(404).json({
        message: "Active volunteer account not found."
      });
    }

    donation.assignedVolunteer = volunteer._id;
    await donation.save();

    res.json({
      message: "Volunteer assigned successfully.",
      donation
    });
  } catch (error) {
    res.status(500).json({
      message: "Could not assign volunteer."
    });
  }
});

// VOLUNTEER STARTS TRACKING
router.post("/:id/tracking/start", protect, allowRoles("volunteer"), async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);

    if (!donation) {
      return res.status(404).json({
        message: "Donation not found."
      });
    }

    if (String(donation.assignedVolunteer) !== String(req.user._id)) {
      return res.status(403).json({
        message: "This donation is not assigned to you."
      });
    }

    if (donation.status === "delivered") {
      return res.status(400).json({
        message: "This donation has already been delivered."
      });
    }

    donation.trackingActive = true;
    donation.trackingStartedAt = new Date();
    donation.trackingStoppedAt = undefined;

    await donation.save();

    res.json({
      message: "Live tracking started. Share your GPS location.",
      trackingActive: donation.trackingActive
    });
  } catch (error) {
    res.status(500).json({
      message: "Could not start tracking."
    });
  }
});

// VOLUNTEER SENDS ACTUAL GPS LOCATION
router.post("/:id/tracking/location", protect, allowRoles("volunteer"), async (req, res) => {
  try {
    const { latitude, longitude } = req.body;

    if (!validCoordinates(latitude, longitude)) {
      return res.status(400).json({
        message: "Valid GPS latitude and longitude are required."
      });
    }

    const donation = await Donation.findById(req.params.id);

    if (!donation) {
      return res.status(404).json({
        message: "Donation not found."
      });
    }

    if (String(donation.assignedVolunteer) !== String(req.user._id)) {
      return res.status(403).json({
        message: "You are not assigned to this donation."
      });
    }

    if (!donation.trackingActive) {
      return res.status(400).json({
        message: "Please start tracking first."
      });
    }

    const location = {
      latitude: Number(latitude),
      longitude: Number(longitude),
      updatedAt: new Date()
    };

    donation.liveLocation = location;

    donation.trackingHistory.push({
      latitude: location.latitude,
      longitude: location.longitude,
      recordedAt: location.updatedAt
    });

    // Keep only the latest 500 GPS points
    if (donation.trackingHistory.length > 500) {
      donation.trackingHistory =
        donation.trackingHistory.slice(-500);
    }

    await donation.save();

    res.json({
      message: "GPS location updated.",
      liveLocation: donation.liveLocation
    });
  } catch (error) {
    res.status(500).json({
      message: "Could not update GPS location."
    });
  }
});

// VOLUNTEER STOPS TRACKING
router.post("/:id/tracking/stop", protect, allowRoles("volunteer"), async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);

    if (!donation) {
      return res.status(404).json({
        message: "Donation not found."
      });
    }

    if (String(donation.assignedVolunteer) !== String(req.user._id)) {
      return res.status(403).json({
        message: "You are not assigned to this donation."
      });
    }

    donation.trackingActive = false;
    donation.trackingStoppedAt = new Date();

    await donation.save();

    res.json({
      message: "Live tracking stopped.",
      trackingActive: false
    });
  } catch (error) {
    res.status(500).json({
      message: "Could not stop tracking."
    });
  }
});

// DONOR / NGO / VOLUNTEER / ADMIN VIEW LIVE LOCATION
router.get("/:id/tracking", protect, async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: "Invalid donation ID."
      });
    }

    const donation = await Donation.findById(req.params.id)
      .populate("donor", "name email")
      .populate("assignedNgo", "name organizationName email")
      .populate("assignedVolunteer", "name email phone");

    if (!donation) {
      return res.status(404).json({
        message: "Donation not found."
      });
    }

    if (!canViewDonation(donation, req.user)) {
      return res.status(403).json({
        message: "You are not allowed to view this tracking information."
      });
    }

    res.json({
      donation: {
        _id: donation._id,
        foodType: donation.foodType,
        address: donation.address,
        status: donation.status,
        donor: donation.donor,
        assignedNgo: donation.assignedNgo,
        assignedVolunteer: donation.assignedVolunteer,
        pickupLocation: donation.pickupLocation,
        destinationLocation: donation.destinationLocation,
        liveLocation: donation.liveLocation,
        trackingActive: donation.trackingActive,
        trackingStartedAt: donation.trackingStartedAt,
        trackingStoppedAt: donation.trackingStoppedAt,
        trackingHistory: donation.trackingHistory
      }
    });
  } catch (error) {
    res.status(500).json({
      message: "Could not load tracking information."
    });
  }
});

// UPDATE DONATION STATUS
router.patch("/:id/status", protect, allowRoles("admin", "donor", "volunteer"), async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "available",
      "rejected",
      "picked_up",
      "delivered"
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid status."
      });
    }

    const donation = await Donation.findById(req.params.id);

    if (!donation) {
      return res.status(404).json({
        message: "Donation not found."
      });
    }

    if (req.user.role === "donor") {
      if (String(donation.donor) !== String(req.user._id)) {
        return res.status(403).json({
          message: "You can only update your own donations."
        });
      }

      if (!["available", "rejected"].includes(status)) {
        return res.status(403).json({
          message: "You cannot set this donation status."
        });
      }
    }

    if (req.user.role === "volunteer") {
      if (String(donation.assignedVolunteer) !== String(req.user._id)) {
        return res.status(403).json({
          message: "This donation is not assigned to you."
        });
      }

      if (!["picked_up", "delivered"].includes(status)) {
        return res.status(403).json({
          message: "You cannot set this donation status."
        });
      }
    }

    donation.status = status;

    if (status === "delivered") {
      donation.trackingActive = false;
      donation.trackingStoppedAt = new Date();
    }

    await donation.save();

    res.json({
      message: "Donation status updated.",
      donation
    });
  } catch (error) {
    res.status(500).json({
      message: "Could not update donation status."
    });
  }
});

// GET SINGLE DONATION
router.get("/:id", protect, async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: "Invalid donation ID."
      });
    }

    const donation = await Donation.findById(req.params.id)
      .populate("donor", "name organizationName email")
      .populate("assignedNgo", "name organizationName email")
      .populate("assignedVolunteer", "name email phone");

    if (!donation) {
      return res.status(404).json({
        message: "Donation not found."
      });
    }

    if (!canViewDonation(donation, req.user)) {
      return res.status(403).json({
        message: "Access denied."
      });
    }

    res.json({ donation });
  } catch (error) {
    res.status(500).json({
      message: "Could not load donation."
    });
  }
});

module.exports = router;
