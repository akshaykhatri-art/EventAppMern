import { Router } from "express";
const router = Router();
import { register } from "../controllers/authController.js";

router.post("/register", register);

export default router;
