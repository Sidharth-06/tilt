import { PrismaClient } from "@prisma/client";
import crypto from "crypto";
import { AppError } from "../middleware/errorHandler.js";
import type { ConvertInput } from "../schemas/event.schema.js";

const prisma = new PrismaClient();

/** Hash an IP address for privacy-safe storage */
function hashIp(ip: string): string {
    return crypto.createHash("sha256").update(ip).digest("hex").slice(0, 16);
}

/**
 * Record a click event when someone visits a referral link.
 * Returns the campaign so we can redirect appropriately.
 */
export async function recordClick(campaignId: string, token: string, ip: string, userAgent: string) {
    const campaign = await prisma.campaign.findUnique({ where: { id: campaignId } });

    if (!campaign || campaign.referralToken !== token) {
        throw new AppError(404, "Invalid referral link");
    }

    await prisma.event.create({
        data: {
            campaignId,
            type: "CLICK",
            ipHash: hashIp(ip),
            userAgent: userAgent.slice(0, 500),
        },
    });

    return campaign;
}

/**
 * Record a conversion event. Uses referenceId for idempotency —
 * if the same referenceId has already been recorded, return the existing event
 * without creating a duplicate.
 */
export async function recordConversion(input: ConvertInput, ip: string) {
    const campaign = await prisma.campaign.findUnique({ where: { id: input.campaignId } });

    if (!campaign || campaign.referralToken !== input.token) {
        throw new AppError(404, "Invalid referral link or campaign");
    }

    // Check for existing conversion with same referenceId (idempotency)
    const existing = await prisma.event.findUnique({
        where: { referenceId: input.referenceId },
    });

    if (existing) {
        return { event: existing, created: false };
    }

    const event = await prisma.event.create({
        data: {
            campaignId: input.campaignId,
            type: "CONVERSION",
            referenceId: input.referenceId,
            ipHash: hashIp(ip),
        },
    });

    return { event, created: true };
}

/** Fetch recent events for a campaign (paginated) */
export async function listEvents(campaignId: string, userId: string, limit = 50, offset = 0) {
    // Verify ownership
    const campaign = await prisma.campaign.findUnique({ where: { id: campaignId } });
    if (!campaign) {
        throw new AppError(404, "Campaign not found");
    }
    if (campaign.userId !== userId) {
        throw new AppError(403, "You do not own this campaign");
    }

    const [events, total] = await Promise.all([
        prisma.event.findMany({
            where: { campaignId },
            orderBy: { createdAt: "desc" },
            take: limit,
            skip: offset,
        }),
        prisma.event.count({ where: { campaignId } }),
    ]);

    return { events, total };
}
