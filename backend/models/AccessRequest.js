import mongoose from "mongoose";

const accessRequestSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["HR", "PAYROLL_MANAGER", "EMPLOYEE"],
      required: true
    },
    status: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED"],
      default: "PENDING"
    }
  },
  { timestamps: true }
);

/**
 * 🔑 THIS LINE PREVENTS OverwriteModelError
 */
export default mongoose.models.AccessRequest ||
  mongoose.model("AccessRequest", accessRequestSchema);
