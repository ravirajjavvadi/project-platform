import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import { 
  createProject, 
  getProjects, 
  updateProject, 
  deleteProject 
} from "../controllers/projectController.js";

const router = express.Router();

// Publicly view projects, but only Admins can create them
router.route("/")
  .get(getProjects) 
  .post(protect, admin, createProject); 

// Admin only: Update and Delete specific projects
router.route("/:id")
  .put(protect, admin, updateProject)
  .delete(protect, admin, deleteProject);

export default router;