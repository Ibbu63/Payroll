import bcrypt from "bcryptjs";
import AccessRequest from "../models/AccessRequest.js";
import User from "../models/User.js";

/**
 * CREATE ACCESS REQUEST
 * POST /api/access-requests
 */
export const createRequest = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Prevent duplicate requests or users
    const existingUser = await User.findOne({ email });
    const existingRequest = await AccessRequest.findOne({ email });

    if (existingUser || existingRequest) {
      return res.status(400).json({ message: "User or request already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const request = await AccessRequest.create({
      name,
      email,
      password: hashedPassword,
      requestedRole: role,               // 🔴 FIXED (no requestedRole confusion)
      status: "PENDING"
    });

    res.status(201).json({
      message: "Access request submitted successfully",
      request
    });
  } 
  catch (error) {
  console.error("createRequest FULL ERROR:", error);
  res.status(500).json({
    message: error.message,
    stack: error.stack
  });
}
};

/**
 * GET pending requests
 * GET /api/access-requests
 */
export const getPendingRequests = async (req, res) => {
  try {
    const requests = await AccessRequest.find({ status: "PENDING" }).sort({
      createdAt: -1
    });
    res.status(200).json(requests);
  } catch (error) {
    console.error("getPendingRequests error:", error);
    res.status(500).json({ message: "Failed to fetch requests" });
  }
};

/**
 * APPROVE request
 * PUT /api/access-requests/:id/approve
 */
export const approveUser = async (req, res) => {
  try {
    const request = await AccessRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    await User.create({
      name: request.name,
      email: request.email,
      password: request.password, // already hashed
      role: request.requestedRole,
      approvalStatus: "APPROVED",
      isApproved: true
    });

    await AccessRequest.findByIdAndDelete(req.params.id);

    res.json({ message: "User approved successfully" });
  } catch (error) {
    console.error("approveUser error:", error);
    res.status(500).json({ message: "Approval failed" });
  }
};

/**
 * REJECT request
 * PUT /api/access-requests/:id/reject
 */
export const rejectUser = async (req, res) => {
  try {
    await AccessRequest.findByIdAndDelete(req.params.id);
    res.json({ message: "Request rejected" });
  } catch (error) {
    console.error("rejectUser error:", error);
    res.status(500).json({ message: "Rejection failed" });
  }
};
