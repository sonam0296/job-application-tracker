import { Router } from "express";
import authRoute from "./authRoute";
import applicationsRoute from "./applicationsRoute";
import usersRoute from "./usersRoute";

const router = Router();

router.use("/auth", authRoute);
router.use("/applications", applicationsRoute);
router.use("/users", usersRoute);

export default router;
