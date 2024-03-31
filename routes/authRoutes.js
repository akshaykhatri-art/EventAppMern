import { Router } from "express";
const router = Router();
import { register, login, verifyOTP } from "../controllers/authController.js";

router.post("/register", register);
router.post("/login", login);
router.post("/verify-otp", verifyOTP);

export default router;
