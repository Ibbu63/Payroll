import express from "express";
import PayrollOverview from "../models/PayrollOverview.js";
import PayrollAuditLog from "../models/PayrollAuditLog.js";

// ✅ CORRECT MIDDLEWARE IMPORTS (MATCH YOUR FOLDER)
import { protect } from "../middlewares/auth.middleware.js";
import { adminOnly } from "../middlewares/admin.middleware.js";

const router = express.Router();

/**
 * 📥 CREATE / SEED PAYROLL DATA
 */
router.post("/", async (req, res) => {
  try {
    const data = await PayrollOverview.create(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * 🔒 FINALIZE PAYROLL (ADMIN ONLY)
 */
router.put(
  "/finalize/:period",
  protect,
  adminOnly,
  async (req, res) => {
    try {
      const { period } = req.params;

      const payroll = await PayrollOverview.findOne({ period });

      if (!payroll) {
        return res.status(404).json({ message: "Payroll not found" });
      }

      if (payroll.verified !== 100) {
        return res.status(400).json({
          message: "Payroll must be 100% verified before finalizing"
        });
      }

      if (payroll.finalized) {
        return res.status(400).json({
          message: "Payroll already finalized"
        });
      }

      payroll.finalized = true;
      await payroll.save();

      await PayrollAuditLog.create({
        period,
        action: "FINALIZED",
        performedBy: req.user.email
      });

      res.json({ message: "Payroll cycle finalized successfully" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

/**
 * 🧾 AUDIT LOGS (ADMIN ONLY)
 */
router.get(
  "/audit/logs",
  protect,
  adminOnly,
  async (req, res) => {
    try {
      const logs = await PayrollAuditLog.find()
        .sort({ createdAt: -1 })
        .limit(50);

      res.json(logs);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

/**
 * 📄 GET PAYROLL BY PERIOD
 * ⚠️ MUST BE LAST
 */
router.get("/:period", async (req, res) => {
  try {
    const overview = await PayrollOverview.findOne({
      period: req.params.period
    });

    if (!overview) {
      return res.status(404).json({ message: "No data found" });
    }

    res.json(overview);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
