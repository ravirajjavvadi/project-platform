import express from "express";
import { adminLogin } from "../controllers/authController.js"; // Must match controller name

const router = express.Router();

router.post("/login", adminLogin);

export default router;