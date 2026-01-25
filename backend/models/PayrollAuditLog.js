import mongoose from "mongoose";

const PayrollAuditLogSchema = new mongoose.Schema(
  {
    period: {
      type: String,
      required: true
    },
    action: {
      type: String,
      required: true
    },
    performedBy: {
      type: String,
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  },
  { versionKey: false }
);

const PayrollAuditLog = mongoose.model(
  "PayrollAuditLog",
  PayrollAuditLogSchema
);

export default PayrollAuditLog;
