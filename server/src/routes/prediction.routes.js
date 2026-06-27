import { Router } from "express";
import {
  createPrediction,
  deleteHistoryItem,
  getFormMetadata,
  getHistory,
  getHistoryById,
} from "../controllers/prediction.controller.js";

const router = Router();

router.get("/metadata", getFormMetadata);
router.post("/", createPrediction);
router.get("/history", getHistory);
router.get("/history/:id", getHistoryById);
router.delete("/history/:id", deleteHistoryItem);

export default router;
