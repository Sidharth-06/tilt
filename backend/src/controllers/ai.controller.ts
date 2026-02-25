import { Request, Response, NextFunction } from "express";
import * as campaignService from "../services/campaign.service.js";
import * as aiService from "../services/ai.service.js";

/** GET /api/campaigns/:id/insights — AI-generated campaign insight */
export async function getInsight(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {
        const campaign = await campaignService.getCampaign(req.params.id, req.user!.id);
        const stats = campaign.stats;

        const insight = await aiService.generateInsight({
            name: campaign.name,
            clicks: stats.clicks,
            conversions: stats.conversions,
            estimatedPayout: stats.estimatedPayout,
        });

        res.json({ insight, stats });
    } catch (err) {
        next(err);
    }
}
