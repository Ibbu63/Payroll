import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Fix for ES modules (__dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * GET /api/employee/payslip/download?month=September&year=2023
 */
router.get("/download", protect, (req, res) => {
  const { month, year } = req.query;

  if (!month || !year) {
    return res.status(400).json({
      message: "Month and year are required",
    });
  }

  // Build filename safely
  const fileName = `Payslip_${month}_${year}.docx`;

  const filePath = path.join(
    __dirname,
    "..",
    "documents",
    "payslips",
    "Payslip_January_2026.pdf"
  );

  console.log("Looking for payslip:", filePath);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({
      message: "Payslip not found for selected month",
    });
  }

  res.download(filePath, fileName);
});

export default router;
