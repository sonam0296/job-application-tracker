import { Router } from "express";
import { login, register } from "../controller/authController";
import { validate } from "../middleware/validate";
import { loginSchema, registerSchema } from "../validation/authValidation";

const router = Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
// router.post("/refresh", refreshToken);
// router.post("/logout", logout);

// // example protected route
// router.get("/me", requireAuth, me);
// router.get("/profile", userProfile);

export default router;
