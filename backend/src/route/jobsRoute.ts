import { Router } from "express";
import { authenticateJWT } from "../middleware/authMiddleware";
import {
  createJobs,
  deleteJobs,
  getJobById,
  getJobs,
  updateJobs,
} from "../controller/jobController";

const router = Router();

router.get("/", authenticateJWT, getJobs);
router.post("/", authenticateJWT, createJobs);
router.get("/:id", authenticateJWT, getJobById);
router.put("/:id", authenticateJWT, updateJobs);
router.delete("/:id", authenticateJWT, deleteJobs);

export default router;
