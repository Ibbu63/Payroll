import mongoose from "mongoose";

const accessRequestSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    requestedRole: {
      type: String,
      enum: ["admin","HR", "PAYROLL", "PAYROLL_MANAGER","EMPLOYEE"],
      required: true
    },
    department: {
      type: String
    },
    status: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED"],
      default: "PENDING"
    }
  },
  { timestamps: true }
);

export default mongoose.model("AccessRequest", accessRequestSchema);
