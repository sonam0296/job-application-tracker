import { Router } from "express";
import { authenticateJWT } from "../middleware/authMiddleware";
import {
  createJobs,
  deleteJobs,
  getJobById,
  getJobs,
  updateJobs,
} from "../controller/jobController";
import { validate } from "../middleware/validate";
import { jobSchema } from "../validation/jobValidation";

const router = Router();

router.post("/", authenticateJWT, validate(jobSchema), createJobs);
router.get("/", authenticateJWT, getJobs);
router.get("/:id", authenticateJWT, getJobById);
router.put("/:id", authenticateJWT, updateJobs);
router.delete("/:id", authenticateJWT, deleteJobs);

export default router;
