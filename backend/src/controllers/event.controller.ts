import { Request, Response, NextFunction } from "express";
import * as eventService from "../services/event.service.js";

/** GET /r/:campaignId/:token — public referral link handler */
export async function handleClick(
    req: Request<{ campaignId: string; token: string }>,
    res: Response,
    next: NextFunction,
) {
    try {
        const { campaignId, token } = req.params;
        const ip = req.ip || req.socket.remoteAddress || "unknown";
        const userAgent = req.get("user-agent") || "unknown";

        await eventService.recordClick(campaignId, token, ip, userAgent);

        // In production this would redirect to a landing page.
        // For the demo, return JSON confirmation.
        res.json({ message: "Click recorded", campaignId });
    } catch (err) {
        next(err);
    }
}

/** POST /api/convert — idempotent conversion endpoint */
export async function handleConversion(req: Request, res: Response, next: NextFunction) {
    try {
        const ip = req.ip || req.socket.remoteAddress || "unknown";
        const { event, created } = await eventService.recordConversion(req.body, ip);

        res.status(created ? 201 : 200).json({
            message: created ? "Conversion recorded" : "Conversion already recorded (idempotent)",
            event,
        });
    } catch (err) {
        next(err);
    }
}

/** GET /api/campaigns/:id/events — list events for a campaign */
export async function listEvents(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {
        const limit = Math.min(Number(req.query.limit) || 50, 100);
        const offset = Number(req.query.offset) || 0;
        const result = await eventService.listEvents(req.params.id, req.user!.id, limit, offset);
        res.json(result);
    } catch (err) {
        next(err);
    }
}
