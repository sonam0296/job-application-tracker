import { Router } from "express";
import authRoute from "./authRoute";
import applicationsRoute from "./applicationsRoute";
import usersRoute from "./usersRoute";
import jobsRoute from "./jobsRoute";

const router = Router();

router.use("/auth", authRoute);
router.use("/applications", applicationsRoute);
router.use("/users", usersRoute);
router.use("/jobs", jobsRoute);

export default router;
