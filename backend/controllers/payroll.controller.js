import PayrollRun from "../models/PayrollRun.js";

// GET PAYROLL RUNS READY FOR PAYROLL
export const getPayrollRuns = async (req, res) => {
  try {
    const runs = await PayrollRun.find({
      status: { $in: ["READY_FOR_PAYROLL", "PROCESSING"] }
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: runs.length,
      data: runs
    });
  } catch (error) {
    console.error("Error fetching payroll runs:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch payroll runs"
    });
  }
};

// START PAYROLL PROCESSING
export const startPayroll = async (req, res) => {
  try {
    const { remarks } = req.body;
    const run = await PayrollRun.findById(req.params.id);

    if (!run) {
      return res.status(404).json({
        success: false,
        message: "Payroll run not found"
      });
    }

    if (run.status !== "READY_FOR_PAYROLL") {
      return res.status(400).json({
        success: false,
        message: "Payroll run is not ready to start"
      });
    }

    run.status = "PROCESSING";
    run.processedBy = req.user._id;

    if (remarks && remarks.trim() !== "") {
      run.remarks = remarks.trim();
      run.remarksUpdatedAt = new Date();
    }

    await run.save();

    return res.status(200).json({
      success: true,
      message: "Payroll processing started",
      data: run
    });
  } catch (error) {
    console.error("Error starting payroll:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to start payroll"
    });
  }
};

// COMPLETE PAYROLL
export const completePayroll = async (req, res) => {
  try {
    const { remarks } = req.body;
    const run = await PayrollRun.findById(req.params.id);

    if (!run) {
      return res.status(404).json({
        success: false,
        message: "Payroll run not found"
      });
    }

    if (run.status !== "PROCESSING") {
      return res.status(400).json({
        success: false,
        message: "Payroll run is not in processing state"
      });
    }

    run.status = "COMPLETED";

    if (remarks && remarks.trim() !== "") {
      run.remarks = remarks.trim();
      run.remarksUpdatedAt = new Date();
    }

    await run.save();

    return res.status(200).json({
      success: true,
      message: "Payroll completed successfully",
      data: run
    });
  } catch (error) {
    console.error("Error completing payroll:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to complete payroll"
    });
  }
};

// SEND PAYROLL TO ADMIN
export const sendToAdmin = async (req, res) => {
  try {
    const run = await PayrollRun.findById(req.params.id);

    if (!run) {
      return res.status(404).json({
        success: false,
        message: "Payroll run not found"
      });
    }

    if (run.status !== "COMPLETED") {
      return res.status(400).json({
        success: false,
        message: "Payroll must be completed before sending to admin"
      });
    }

    run.status = "SENT_TO_ADMIN";
    await run.save();

    return res.status(200).json({
      success: true,
      message: "Payroll sent to admin",
      data: run
    });
  } catch (error) {
    console.error("Error sending payroll to admin:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to send payroll to admin"
    });
  }
};
