import AccessRequest from "../models/AccessRequest.js";
import User from "../models/User.js";

export const getPendingRequests = async (req, res) => {
  const requests = await AccessRequest.find({ status: "pending" });
  res.json(requests);
};

export const approveUser = async (req, res) => {
  const request = await AccessRequest.findById(req.params.id);

  if (!request || request.status !== "pending") {
    return res.status(400).json({ message: "Invalid request" });
  }

  await User.create({
    name: request.name,
    email: request.email,
    password: request.password,
    role: request.role,
    isActive: true
  });

  request.status = "approved";
  await request.save();

  res.json({ message: "User approved successfully" });
};

// GET ALL USERS WAITING FOR APPROVAL
export const getPendingUsers = async (req, res) => {
  try {
    const users = await User.find({
      isApproved: false,
      role: { $in: ["HR", "PAYROLL_MANAGER"] }
    }).select("-password");

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};