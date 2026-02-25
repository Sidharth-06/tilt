import { Router } from "express";
import { validate } from "../middleware/validate.js";
import { signupSchema, loginSchema } from "../schemas/auth.schema.js";
import { authMiddleware } from "../middleware/auth.js";
import * as authController from "../controllers/auth.controller.js";

const router = Router();

router.post("/signup", validate(signupSchema), authController.signup);
router.post("/login", validate(loginSchema), authController.login);
router.get("/me", authMiddleware, authController.getMe);

export default router;
