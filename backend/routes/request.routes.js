import express from "express";
import { requestAccess } from "../controllers/request.controller.js";

const router = express.Router();

router.post("/request-access", requestAccess);

export default router;
