import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { adminOnly } from "../middlewares/admin.middleware.js";
import AccessRequest from "../models/AccessRequest.js";
import User from "../models/User.js";

const router = express.Router();

/* ======================
   Admin Dashboard
====================== */
router.get("/dashboard", protect, adminOnly, (req, res) => {
  res.json({
    message: "Welcome Admin",
    admin: req.user.name
  });
});

/* ======================
   Access Requests
====================== */

// GET all pending access requests
router.get("/access-requests", protect, adminOnly, async (req, res) => {
  const requests = await AccessRequest.find({ status: "PENDING" });
  res.json(requests);
});

// APPROVE access request
router.put("/access-requests/:id/approve", protect, adminOnly, async (req, res) => {
  const request = await AccessRequest.findById(req.params.id);

  if (!request) {
    return res.status(404).json({ message: "Request not found" });
  }

  // Create user
  await User.create({
    name: request.name,
    email: request.email,
    password: request.password, // must already be hashed
    role: request.role,
    isApproved: true,
    approvalStatus: "APPROVED"
  });

  // Update request status
  request.status = "APPROVED";
  await request.save();

  res.json({ message: "Access approved successfully" });
});

// REJECT access request
router.put("/access-requests/:id/reject", protect, adminOnly, async (req, res) => {
  const request = await AccessRequest.findById(req.params.id);

  if (!request) {
    return res.status(404).json({ message: "Request not found" });
  }

  request.status = "REJECTED";
  await request.save();

  res.json({ message: "Access rejected" });
});

export default router;
