import User from "../models/User.js";
import AccessRequest from "../models/AccessRequest.js";
import PayrollRun from "../models/PayrollRun.js";

// HR CREATES PAYROLL RUN
export const createPayrollRun = async (req, res) => {
  try {
    const { batchId, department, employeeCount, grossPay } = req.body;

    if (!batchId || !department || !employeeCount || !grossPay) {
      return res.status(400).json({ message: "All fields required" });
    }

    const run = await PayrollRun.create({
      batchId,
      department,
      employeeCount,
      grossPay,
      status: "HR_APPROVED"
    });

    res.status(201).json(run);
  } catch (err) {
    res.status(500).json({ message: "Failed to create payroll run" });
  }
};

// HR APPROVES PAYROLL
export const approvePayrollRun = async (req, res) => {
  try {
    const run = await PayrollRun.findById(req.params.id);

    if (!run) {
      return res.status(404).json({ message: "Payroll run not found" });
    }

    if (run.status !== "HR_APPROVED") {
      return res.status(400).json({ message: "Payroll not in HR approved state" });
    }

    run.status = "READY_FOR_PAYROLL";
    await run.save();

    res.json(run);
  } catch (err) {
    res.status(500).json({ message: "Failed to approve payroll" });
  }
};

/**
 * 📊 HR Dashboard Data
 * GET /api/hr/dashboard
 */

export const getHRDashboard = async (req, res) => {
  try {
    // ✅ Count all approved users (any role)
    const totalUsers = await User.countDocuments({
      approvalStatus: "APPROVED",
    });

    // ✅ Role-wise counts
    const totalEmployees = await User.countDocuments({
      role: "EMPLOYEE",
      approvalStatus: "APPROVED",
    });

    const totalHR = await User.countDocuments({
      role: "HR",
      approvalStatus: "APPROVED",
    });

    const totalPayrollManagers = await User.countDocuments({
      role: "PAYROLL",
      approvalStatus: "APPROVED",
    });

    // ✅ Pending access requests
    const pendingApprovals = await AccessRequest.countDocuments({
      status: "PENDING",
    });

    res.json({
      totalUsers,
      totalEmployees,
      totalHR,
      totalPayrollManagers,
      pendingApprovals,
    });
  } catch (error) {
    console.error("HR dashboard error:", error);
    res.status(500).json({
      message: "Failed to load HR dashboard data",
    });
  }
};