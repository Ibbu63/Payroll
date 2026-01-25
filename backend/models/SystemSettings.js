import mongoose from "mongoose";

const systemSettingsSchema = new mongoose.Schema(
  {
    orgName: String,
    currency: String,
    timezone: String,
    financialYear: String,
    payrollCycle: String,

    overtimeRate: Number,
    employerContribution: Number,
    taxRegime: String,
    allowNegativePay: Boolean,

    enableRegistration: Boolean,
    autoApproveEmployees: Boolean,
    requireFinalizeApproval: Boolean,
    sessionTimeout: Number,

    enableAuditLogs: Boolean,
    auditRetention: Number,
    allowAuditExport: Boolean
  },
  { timestamps: true }
);

export default mongoose.model("SystemSettings", systemSettingsSchema);
