import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { hrOnly } from "../middlewares/hr.middleware.js";
import { getHRDashboard } from "../controllers/hr.controller.js";
import User from "../models/User.js";

const router = express.Router();

/**
 * 📊 HR Dashboard
 * GET /api/hr/dashboard
 */
router.get("/dashboard", protect, hrOnly, getHRDashboard);

/**
 * 👥 Get all employees
 * GET /api/hr/employees
 */
router.get("/employees", protect, hrOnly, async (req, res) => {
  try {
    const users = await User.find({
      approvalStatus: "APPROVED",
      role: {
        $in: ["EMPLOYEE", "HR", "PAYROLL_MANAGER", "employee", "hr", "payroll_manager"],
      },
    }).select("-password");

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
});


/**
 * ⏳ Pending approvals
 * GET /api/hr/approvals
 */
router.get("/approvals", protect, hrOnly, async (req, res) => {
  try {
    const pendingUsers = await User.find({
      approvalStatus: "PENDING"
    }).select("-password");

    res.json(pendingUsers);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch approvals" });
  }
});

/**
 * ✅ Approve employee
 */
router.patch("/approve/:id", protect, hrOnly, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.approvalStatus = "APPROVED";
    user.approvedBy = req.user._id;
    await user.save();

    res.json({ message: "User approved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Approval failed" });
  }
});

/**
 * ❌ Reject employee
 */
router.patch("/reject/:id", protect, hrOnly, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.approvalStatus = "REJECTED";
    user.approvedBy = req.user._id;
    await user.save();

    res.json({ message: "User rejected" });
  } catch (error) {
    res.status(500).json({ message: "Rejection failed" });
  }
});

export default router;
