import User from "../models/User.js";
import AccessRequest from "../models/AccessRequest.js";

/**
 * GET USERS FOR ADMIN (User Management Page)
 * - Returns users
 * - Attaches access requests (if any)
 */
export const getUsersForAdmin = async (req, res) => {
  try {
    const users = await User.aggregate([
      {
        $lookup: {
          from: "accessrequests",
          localField: "_id",
          foreignField: "user",
          as: "requests"
        }
      }
    ]);

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET ALL PENDING ACCESS REQUESTS (optional standalone API)
 */
export const getPendingRequests = async (req, res) => {
  try {
    const requests = await AccessRequest.find({ status: "PENDING" })
      .populate("user", "name email role")
      .sort({ createdAt: -1 });

    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch pending requests" });
  }
};

/**
 * APPROVE ACCESS REQUEST
 * - Updates existing user role
 * - Marks request as APPROVED
 */
export const approveAccessRequest = async (req, res) => {
  try {
    const request = await AccessRequest.findById(req.params.id);

    if (!request || request.status !== "PENDING") {
      return res.status(400).json({ message: "Invalid or already processed request" });
    }

    // Update existing user
    await User.findByIdAndUpdate(request.user, {
      role: request.requestedRole,
      status: "APPROVED"
    });

    request.status = "APPROVED";
    request.reviewedBy = req.user._id;
    request.reviewedAt = new Date();
    await request.save();

    res.status(200).json({ message: "Access request approved" });
  } catch (error) {
    res.status(500).json({ message: "Approval failed" });
  }
};

/**
 * REJECT ACCESS REQUEST
 */
export const rejectAccessRequest = async (req, res) => {
  try {
    const request = await AccessRequest.findById(req.params.id);

    if (!request || request.status !== "PENDING") {
      return res.status(400).json({ message: "Invalid or already processed request" });
    }

    request.status = "REJECTED";
    request.reviewedBy = req.user._id;
    request.reviewedAt = new Date();
    await request.save();

    res.status(200).json({ message: "Access request rejected" });
  } catch (error) {
    res.status(500).json({ message: "Rejection failed" });
  }
};
