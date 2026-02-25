import { Request, Response, NextFunction } from "express";
import * as campaignService from "../services/campaign.service.js";

export async function list(req: Request, res: Response, next: NextFunction) {
    try {
        const campaigns = await campaignService.listCampaigns(req.user!.id);
        res.json(campaigns);
    } catch (err) {
        next(err);
    }
}

export async function get(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {
        const campaign = await campaignService.getCampaign(req.params.id, req.user!.id);
        res.json(campaign);
    } catch (err) {
        next(err);
    }
}

export async function create(req: Request, res: Response, next: NextFunction) {
    try {
        const campaign = await campaignService.createCampaign(req.user!.id, req.body);
        res.status(201).json(campaign);
    } catch (err) {
        next(err);
    }
}

export async function update(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {
        const campaign = await campaignService.updateCampaign(req.params.id, req.user!.id, req.body);
        res.json(campaign);
    } catch (err) {
        next(err);
    }
}

export async function remove(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {
        await campaignService.deleteCampaign(req.params.id, req.user!.id);
        res.status(204).end();
    } catch (err) {
        next(err);
    }
}
