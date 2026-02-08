import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { adminOnly } from "../middlewares/admin.middleware.js";

import {
  getUsersForAdmin,
  getPendingRequests,
  approveAccessRequest,
  rejectAccessRequest
} from "../controllers/admin.controller.js";

const router = express.Router();

/* ======================
   Admin Dashboard
====================== */

router.get("/dashboard", protect, adminOnly, (req, res) => {
  res.json({
    message: "Welcome Admin",
    admin: req.user.name
  });
});

/* ======================
   User Management
====================== */

// MAIN API USED BY UserManagement.jsx
router.get("/users", protect, adminOnly, getUsersForAdmin);

// Optional: fetch only pending requests
router.get("/access-requests", protect, adminOnly, getPendingRequests);

// Approve request
router.put("/access-requests/:id/approve", protect, adminOnly, approveAccessRequest);

// Reject request
router.put("/access-requests/:id/reject", protect, adminOnly, rejectAccessRequest);

export default router;
