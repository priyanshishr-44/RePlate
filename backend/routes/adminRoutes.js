const express = require("express");
const User = require("../models/User");
const Donation = require("../models/Donation");
const FoodRequest = require("../models/FoodRequest");
const Volunteer = require("../models/Volunteer");
const ContactMessage = require("../models/ContactMessage");
const { protect, allowRoles } = require("../middleware/auth");

const router = express.Router();
router.use(protect, allowRoles("admin"));

router.get("/stats", async (req, res) => {
  const [users, donors, ngos, donations, pendingDonations, requests, volunteers, messages] = await Promise.all([
    User.countDocuments(), User.countDocuments({ role: "donor" }), User.countDocuments({ role: "ngo" }),
    Donation.countDocuments(), Donation.countDocuments({ status: "available" }),
    FoodRequest.countDocuments(), Volunteer.countDocuments(), ContactMessage.countDocuments({ status: "unread" })
  ]);
  res.json({ stats: { users, donors, ngos, donations, pendingDonations, requests, volunteers, unreadMessages: messages } });
});

router.get("/users", async (req, res) => {
  const users = await User.find().select("-password").sort({ createdAt: -1 });
  res.json({ users });
});

router.patch("/users/:id/active", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found." });
  if (String(user._id) === String(req.user._id)) return res.status(400).json({ message: "You cannot disable your own account." });
  user.isActive = Boolean(req.body.isActive);
  await user.save();
  res.json({ message: "User account updated.", user: { id: user._id, isActive: user.isActive } });
});

module.exports = router;
