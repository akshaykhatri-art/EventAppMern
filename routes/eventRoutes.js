import { Router } from "express";
const router = Router();
import { createEvent } from "../controllers/eventController.js";
import verifyToken from "../middleware/authmiddleware.js";
import upload from "../middleware/imagemiddleware.js";

router.post("/", verifyToken, upload.array("eventImages", 10), createEvent);

export default router;
