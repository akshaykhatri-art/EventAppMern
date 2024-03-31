import { Router } from "express";
const router = Router();
import {
  createEvent,
  deleteEvent,
  updateEvent,
} from "../controllers/eventController.js";
import verifyToken from "../middleware/authmiddleware.js";
import upload from "../middleware/imagemiddleware.js";

router.post("/", verifyToken, upload.array("eventImages", 10), createEvent);
router.put("/:id", verifyToken, updateEvent);
router.delete("/:id", verifyToken, deleteEvent);

export default router;
