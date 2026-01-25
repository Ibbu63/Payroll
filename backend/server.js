import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";

// page routes
import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import requestRoutes from "./routes/request.routes.js";
import payrollRoutes from "./routes/payroll.routes.js";
import payrollOverviewRoutes from "./routes/payroll.overview.routes.js";
import adminSettingsRoutes from "./routes/admin.settings.routes.js";


dotenv.config();

const app = express();

// DB
connectDB();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true
  })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/request", requestRoutes);
app.use("/api/payroll", payrollRoutes);
app.use("/api/payroll-overview", payrollOverviewRoutes);
app.use("/api/admin/settings", adminSettingsRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("Payroll API running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
