import { Router } from "express";
import { getModelMetrics } from "../controllers/analytics.controller.js";

const router = Router();

router.get("/metrics", getModelMetrics);

export default router;
