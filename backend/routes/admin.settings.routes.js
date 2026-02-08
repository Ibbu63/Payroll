import express from "express";
import SystemSettings from "../models/SystemSettings.js";
import { protect } from "../middlewares/auth.middleware.js";
import { adminOnly } from "../middlewares/admin.middleware.js";

const router = express.Router();

/**
 * GET SYSTEM SETTINGS (ADMIN ONLY)
 */
router.get("/", protect, adminOnly, async (req, res) => {
  try {
    let settings = await SystemSettings.findOne();

    if (!settings) {
      settings = await SystemSettings.create({
        orgName: "Enterprise HR Pvt Ltd",
        currency: "INR",
        timezone: "Asia/Kolkata",
        financialYear: "April",
        payrollCycle: "Monthly",
        overtimeRate: 150,
        employerContribution: 12,
        taxRegime: "New",
        allowNegativePay: false,
        enableRegistration: true,
        autoApproveEmployees: false,
        requireFinalizeApproval: true,
        sessionTimeout: 30,
        enableAuditLogs: true,
        auditRetention: 90,
        allowAuditExport: true
      });
    }

    res.status(200).json(settings);
  } catch (error) {
    console.error("Fetch settings error:", error.message);
    res.status(500).json({ message: "Failed to fetch system settings" });
  }
});

/**
 * UPDATE SYSTEM SETTINGS (ADMIN ONLY)
 */
router.put("/", protect, adminOnly, async (req, res) => {
  try {
    const updated = await SystemSettings.findOneAndUpdate(
      {},
      req.body,
      { new: true, upsert: true }
    );

    res.status(200).json(updated);
  } catch (error) {
    console.error("Update settings error:", error.message);
    res.status(500).json({ message: "Failed to update system settings" });
  }
});

export default router;
