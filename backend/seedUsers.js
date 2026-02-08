import mongoose from "mongoose";
import User from "./models/User.js";

await mongoose.connect("mongodb://127.0.0.1:27017/payroll");

await User.insertMany([
  { name: "Admin", email: "admin@test.com", password: "x", role: "ADMIN" },
  { name: "Payroll", email: "pay@test.com", password: "x", role: "PAYROLL_MANAGER" },
  { name: "Emp1", email: "e1@test.com", password: "x", role: "EMPLOYEE" },
  { name: "Emp2", email: "e2@test.com", password: "x", role: "EMPLOYEE" },
]);

console.log("Users seeded");
process.exit();
