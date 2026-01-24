import express from "express";
import { createRequest, getAllRequests } from "../controllers/requestController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", createRequest);
router.get("/", protect, getAllRequests);

export default router;
