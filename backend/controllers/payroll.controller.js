import PayrollRun from "../models/PayrollRun.js";

// GET PAYROLL RUNS READY FOR PAYROLL
export const getPayrollRuns = async (req, res) => {
  const runs = await PayrollRun.find({
    status: { $in: ["READY_FOR_PAYROLL", "PROCESSING"] }
  });
  res.json(runs);
};

// START PAYROLL PROCESSING
export const startPayroll = async (req, res) => {
  const run = await PayrollRun.findById(req.params.id);

  if (!run)
    return res.status(404).json({ message: "Payroll run not found" });

  if (run.status !== "READY_FOR_PAYROLL") {
    return res.status(400).json({ message: "Invalid payroll state" });
  }

  run.status = "PROCESSING";
  run.processedBy = req.user._id;
  await run.save();

  res.json({ message: "Payroll processing started" });
};

// COMPLETE PAYROLL
export const completePayroll = async (req, res) => {
  const run = await PayrollRun.findById(req.params.id);

  if (!run)
    return res.status(404).json({ message: "Payroll run not found" });

  if (run.status !== "PROCESSING") {
    return res.status(400).json({ message: "Payroll not in processing state" });
  }

  run.status = "COMPLETED";
  await run.save();

  res.json({ message: "Payroll completed" });
};

// SEND TO ADMIN
export const sendToAdmin = async (req, res) => {
  const run = await PayrollRun.findById(req.params.id);

  if (!run)
    return res.status(404).json({ message: "Payroll run not found" });

  if (run.status !== "COMPLETED") {
    return res.status(400).json({ message: "Payroll not completed yet" });
  }

  run.status = "SENT_TO_ADMIN";
  await run.save();

  res.json({ message: "Payroll sent to admin" });
};
