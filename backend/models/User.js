import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    password: { type: String, required: true },

    role: {
      type: String,
      enum: ["ADMIN", "HR", "PAYROLL_MANAGER", "EMPLOYEE"],
      required: true
    },

    isApproved: {
      type: Boolean,
      default: false
    },

    approvalStatus: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED"],
      default: "PENDING"
    },

    department: {
      type: String,
      default: null
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    },

    // 🔽 HR-NEEDED ADDITIONS (no breaking changes)

    employeeId: {
      type: String,
      unique: true,
      sparse: true // allows null for HR/Admin users
    },

    employmentStatus: {
      type: String,
      enum: ["ACTIVE", "ON_HOLD", "EXITED"],
      default: "ACTIVE"
    },

    joiningDate: {
      type: Date,
      default: null
    },

    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
