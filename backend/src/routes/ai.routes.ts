import { Router } from "express";
import { authMiddleware } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { campaignIdParam } from "../schemas/campaign.schema.js";
import * as aiController from "../controllers/ai.controller.js";

const router = Router();

// All AI routes require authentication
router.use(authMiddleware);

router.get(
    "/:id/insights",
    validate(campaignIdParam, "params"),
    aiController.getInsight,
);

export default router;
