import { Router } from "express";
import { login, register } from "../controller/authController";

const router = Router();

router.post("/register", register);
router.post("/login", login);
// router.post("/refresh", refreshToken);
// router.post("/logout", logout);

// // example protected route
// router.get("/me", requireAuth, me);
// router.get("/profile", userProfile);

export default router;
