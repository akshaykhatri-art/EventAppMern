import { Router } from "express";
const router = Router();
import {
  register,
  login,
  verifyOTP,
  logout,
  forgotPassword,
  resetPassword,
  updatePassword,
} from "../controllers/authController.js";

router.post("/register", register);
router.post("/login", login);
router.post("/verify-otp", verifyOTP);
router.post("/logout", logout);

router.post("/forgot-password", forgotPassword); // P
router.post("/reset-password", resetPassword); // p
router.post("/update-password", updatePassword);

export default router;
