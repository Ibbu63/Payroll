import User from "../models/User.js";
import AccessRequest from "../models/AccessRequest.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/**
 * ============================
 * REGISTER USER → REQUEST ACCESS
 * ============================
 * Creates entry in AccessRequest (NOT User)
 */
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, department } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields required" });
    }

    // Prevent duplicate users
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Prevent duplicate access requests
    const existingRequest = await AccessRequest.findOne({
      email,
      approvalStatus: "PENDING"
    });

    if (existingRequest) {
      return res
        .status(409)
        .json({ message: "Access request already submitted" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await AccessRequest.create({
      name,
      email,
      password: hashedPassword,
      requestedRole: role,     // ✅ FIX
      department,
      approvalStatus: "PENDING"
    });

    res.status(201).json({
      message: "Access request submitted. Await admin approval."
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


/**
 * ============================
 * LOGIN USER (ONLY APPROVED USERS)
 * ============================
 */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    console.log("LOGIN USER FOUND:", user);

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("PASSWORD MATCH:", isMatch);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    console.log("USER STATUS:", user.status);

    if (!user.isApproved) {
  return res.status(403).json({
    message: "Account pending admin approval"
  });
}


    console.log("✅ PASSED APPROVAL CHECK");

    const token = jwt.sign(
      { userId: user._id.toString(), role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        status: user.status
      }
    });

  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
