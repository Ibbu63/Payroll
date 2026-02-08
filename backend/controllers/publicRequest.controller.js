import AccessRequest from "../models/AccessRequest.js";

export const createPublicAccessRequest = async (req, res) => {
  try {
    const { name, email, password, requestedRole, reason } = req.body;

    if (!name || !email || !password || !requestedRole) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (requestedRole === "ADMIN") {
      return res.status(403).json({ message: "Invalid role request" });
    }

    const existing = await AccessRequest.findOne({
      email,
      status: "PENDING"
    });

    if (existing) {
      return res.status(409).json({ message: "Request already pending" });
    }

    await AccessRequest.create({
      name,
      email,
      password,
      requestedRole,
      reason,
      status: "PENDING"
    });

    res.status(201).json({ message: "Access request submitted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
