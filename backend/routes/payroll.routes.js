import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { payrollOnly } from "../middlewares/payroll.middleware.js";
import {
  getPayrollRuns,
  startPayroll,
  completePayroll,
  sendToAdmin
} from "../controllers/payroll.controller.js";

const router = express.Router();

router.get("/runs", protect, payrollOnly, getPayrollRuns);
router.post("/start/:id", protect, payrollOnly, startPayroll);
router.post("/complete/:id", protect, payrollOnly, completePayroll);
router.post("/send/:id", protect, payrollOnly, sendToAdmin);

export default router;
