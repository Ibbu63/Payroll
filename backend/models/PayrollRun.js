import mongoose from "mongoose";

const payrollRunSchema = new mongoose.Schema(
  {
    batchId: {
      type: String,
      required: true,
      unique: true
    },

    department: {
      type: String,
      required: true
    },

    employeeCount: {
      type: Number,
      required: true
    },

    grossPay: {
      type: Number,
      required: true
    },

    status: {
      type: String,
      enum: [
        "HR_APPROVED",
        "READY_FOR_PAYROLL",
        "PROCESSING",
        "COMPLETED",
        "SENT_TO_ADMIN"
      ],
      default: "HR_APPROVED"
    },

    processedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    },

    // ✅ NEW
    remarks: {
      type: String,
      trim: true,
      default: ""
    },

    remarksUpdatedAt: {
      type: Date,
      default: null
    }
  },
  { timestamps: true }
);

export default mongoose.model("PayrollRun", payrollRunSchema);
