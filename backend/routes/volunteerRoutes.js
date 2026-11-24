const express = require("express");
const Volunteer = require("../models/Volunteer");
const { protect, allowRoles } = require("../middleware/auth");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, phone, email, area, availability, motivation } = req.body;
    if (!name || !phone || !email || !area || !availability) {
      return res.status(400).json({ message: "Please complete all required fields." });
    }
    const volunteer = await Volunteer.create({ name, phone, email, area, availability, motivation });
    res.status(201).json({ message: "Volunteer application submitted.", volunteer });
  } catch (error) {
    res.status(500).json({ message: "Could not submit application." });
  }
});

router.get("/", protect, allowRoles("admin"), async (req, res) => {
  const volunteers = await Volunteer.find().sort({ createdAt: -1 });
  res.json({ volunteers });
});

router.patch("/:id/status", protect, allowRoles("admin"), async (req, res) => {
  if (!["approved", "rejected"].includes(req.body.status)) {
    return res.status(400).json({ message: "Invalid status." });
  }
  const volunteer = await Volunteer.findByIdAndUpdate(
    req.params.id, { status: req.body.status }, { new: true, runValidators: true }
  );
  if (!volunteer) return res.status(404).json({ message: "Application not found." });
  res.json({ message: "Application updated.", volunteer });
});

module.exports = router;
