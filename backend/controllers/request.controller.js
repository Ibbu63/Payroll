import bcrypt from "bcryptjs";
import AccessRequest from "../models/AccessRequest.js";
import User from "../models/User.js";

export const requestAccess = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await AccessRequest.create({
      name,
      email,
      password: hashedPassword,
      role,
      status: "pending",
      createdAt: new Date()
    });

    res.status(201).json({
      message: "Access request submitted. Await admin approval."
    });
  } catch (error) {
    console.error("Request access error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
