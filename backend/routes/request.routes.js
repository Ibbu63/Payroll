import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { adminOnly } from "../middlewares/admin.middleware.js";
import {
  createRequest,
  getPendingRequests,
  approveUser,
  rejectUser
} from "../controllers/request.controller.js";

const router = express.Router();

/**
 * CREATE ACCESS REQUEST
 * Public (used by Postman / signup flow)
 */
router.post("/", createRequest);

/**
 * ADMIN: View pending requests
 */
router.get("/", protect, adminOnly, getPendingRequests);

/**
 * ADMIN: Approve request
 */
router.put("/:id/approve", protect, adminOnly, approveUser);

/**
 * ADMIN: Reject request
 */
router.put("/:id/reject", protect, adminOnly, rejectUser);

export default router;
