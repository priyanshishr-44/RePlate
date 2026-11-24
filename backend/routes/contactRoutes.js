const express = require("express");
const ContactMessage = require("../models/ContactMessage");
const { protect, allowRoles } = require("../middleware/auth");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: "Name, email, subject and message are required." });
    }
    const contact = await ContactMessage.create({ name, email, subject, message });
    res.status(201).json({ message: "Your message has been received.", contactId: contact._id });
  } catch (error) {
    res.status(500).json({ message: "Could not send your message." });
  }
});

router.get("/", protect, allowRoles("admin"), async (req, res) => {
  const messages = await ContactMessage.find().sort({ createdAt: -1 });
  res.json({ messages });
});

router.patch("/:id/status", protect, allowRoles("admin"), async (req, res) => {
  if (!["read", "closed"].includes(req.body.status)) {
    return res.status(400).json({ message: "Invalid message status." });
  }
  const message = await ContactMessage.findByIdAndUpdate(
    req.params.id, { status: req.body.status }, { new: true, runValidators: true }
  );
  if (!message) return res.status(404).json({ message: "Message not found." });
  res.json({ message: "Message updated.", contact: message });
});

module.exports = router;
