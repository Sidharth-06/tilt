import { Router } from "express";
import { validate } from "../middleware/validate.js";
import { authMiddleware } from "../middleware/auth.js";
import { createCampaignSchema, updateCampaignSchema, campaignIdParam } from "../schemas/campaign.schema.js";
import * as campaignController from "../controllers/campaign.controller.js";

const router = Router();

// All campaign routes require authentication
router.use(authMiddleware);

router.get("/", campaignController.list);
router.post("/", validate(createCampaignSchema), campaignController.create);
router.get("/:id", validate(campaignIdParam, "params"), campaignController.get);
router.put("/:id", validate(campaignIdParam, "params"), validate(updateCampaignSchema), campaignController.update);
router.delete("/:id", validate(campaignIdParam, "params"), campaignController.remove);

export default router;
