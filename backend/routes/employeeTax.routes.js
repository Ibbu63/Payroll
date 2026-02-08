import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

// ES module dirname fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.get("/form16", protect, (req, res) => {
  const filePath = path.join(
    __dirname,
    "..",
    "documents",
    "form16",
    "Form16.docx"   // ⚠️ EXACT NAME
  );

  console.log("Looking for file at:", filePath);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ message: "Form 16 not found" });
  }

  res.download(filePath, "Form 16.docx");
});

export default router;
