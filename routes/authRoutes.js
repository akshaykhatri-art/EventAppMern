import { Router } from "express";
const router = Router();
import {
  register,
  login,
  verifyOTP,
  logout,
} from "../controllers/authController.js";

router.post("/register", register);
router.post("/login", login);
router.post("/verify-otp", verifyOTP);
router.post("/logout", logout);

export default router;
