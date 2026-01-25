import express from "express";
import SystemSettings from "../models/SystemSettings.js";
import { protect, verifyAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

/* GET SETTINGS */
router.get("/", protect, verifyAdmin, async (req, res) => {
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
});

/* UPDATE SETTINGS */
router.put("/", protect, verifyAdmin, async (req, res) => {
  const updated = await SystemSettings.findOneAndUpdate(
    {},
    req.body,
    { new: true, upsert: true }
  );

  res.status(200).json(updated);
});

export default router;
