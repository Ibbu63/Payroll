import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

const hashedPassword = await bcrypt.hash("admin123", 10);

await User.create({
  name: "Admin",
  email: "admin@test.com",
  password: hashedPassword,
  role: "admin",
  isActive: true
});

console.log("✅ Admin created successfully");
process.exit();
