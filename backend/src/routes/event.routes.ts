import { Router } from "express";
import { validate } from "../middleware/validate.js";
import { authMiddleware } from "../middleware/auth.js";
import { convertSchema, referralParamsSchema } from "../schemas/event.schema.js";
import { campaignIdParam } from "../schemas/campaign.schema.js";
import * as eventController from "../controllers/event.controller.js";

const router = Router();

export default router;

// These are mounted separately in index.ts because they use different base paths

/** Public referral click handler — mounted at /r/:campaignId/:token */
export const referralRouter = Router();
referralRouter.get(
    "/:campaignId/:token",
    validate(referralParamsSchema, "params"),
    eventController.handleClick,
);

/** Public conversion endpoint — mounted at /api/convert */
export const convertRouter = Router();
convertRouter.post("/", validate(convertSchema), eventController.handleConversion);

/** Authenticated event listing — mounted at /api/campaigns/:id/events */
export const eventsListRouter = Router({ mergeParams: true });
eventsListRouter.get(
    "/",
    authMiddleware,
    validate(campaignIdParam, "params"),
    eventController.listEvents,
);
