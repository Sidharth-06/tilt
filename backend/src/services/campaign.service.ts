import { PrismaClient } from "@prisma/client";
import { nanoid } from "nanoid";
import { AppError } from "../middleware/errorHandler.js";
import type { CreateCampaignInput, UpdateCampaignInput } from "../schemas/campaign.schema.js";

const prisma = new PrismaClient();

export async function listCampaigns(userId: string) {
    const campaigns = await prisma.campaign.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        include: {
            _count: { select: { events: true } },
        },
    });

    // Fetch aggregated stats for each campaign
    const campaignsWithStats = await Promise.all(
        campaigns.map(async (campaign) => {
            const stats = await getStats(campaign.id);
            return { ...campaign, stats };
        }),
    );

    return campaignsWithStats;
}

export async function getCampaign(id: string, userId: string) {
    const campaign = await prisma.campaign.findUnique({ where: { id } });

    if (!campaign) {
        throw new AppError(404, "Campaign not found");
    }
    if (campaign.userId !== userId) {
        throw new AppError(403, "You do not own this campaign");
    }

    const stats = await getStats(campaign.id);
    return { ...campaign, stats };
}

export async function createCampaign(userId: string, input: CreateCampaignInput) {
    const referralToken = nanoid(12);

    const campaign = await prisma.campaign.create({
        data: {
            userId,
            name: input.name,
            description: input.description,
            status: input.status,
            basePayout: input.basePayout,
            referralToken,
        },
    });

    return campaign;
}

export async function updateCampaign(id: string, userId: string, input: UpdateCampaignInput) {
    const existing = await prisma.campaign.findUnique({ where: { id } });

    if (!existing) {
        throw new AppError(404, "Campaign not found");
    }
    if (existing.userId !== userId) {
        throw new AppError(403, "You do not own this campaign");
    }

    const campaign = await prisma.campaign.update({
        where: { id },
        data: input,
    });

    return campaign;
}

export async function deleteCampaign(id: string, userId: string) {
    const existing = await prisma.campaign.findUnique({ where: { id } });

    if (!existing) {
        throw new AppError(404, "Campaign not found");
    }
    if (existing.userId !== userId) {
        throw new AppError(403, "You do not own this campaign");
    }

    await prisma.campaign.delete({ where: { id } });
}

export async function getStats(campaignId: string) {
    const [clicks, conversions, campaign] = await Promise.all([
        prisma.event.count({ where: { campaignId, type: "CLICK" } }),
        prisma.event.count({ where: { campaignId, type: "CONVERSION" } }),
        prisma.campaign.findUnique({
            where: { id: campaignId },
            select: { basePayout: true },
        }),
    ]);

    const basePayout = campaign?.basePayout ? Number(campaign.basePayout) : 0;
    const estimatedPayout = conversions * basePayout;

    return { clicks, conversions, estimatedPayout };
}
