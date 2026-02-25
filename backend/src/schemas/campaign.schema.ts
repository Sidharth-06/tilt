import { z } from "zod";

export const createCampaignSchema = z.object({
    name: z.string().min(1, "Name is required").max(200),
    description: z.string().max(2000).default(""),
    status: z.enum(["ACTIVE", "PAUSED", "ENDED"]).default("ACTIVE"),
    basePayout: z.coerce.number().min(0, "Payout must be non-negative").default(0),
});

export const updateCampaignSchema = z.object({
    name: z.string().min(1).max(200).optional(),
    description: z.string().max(2000).optional(),
    status: z.enum(["ACTIVE", "PAUSED", "ENDED"]).optional(),
    basePayout: z.coerce.number().min(0).optional(),
});

export const campaignIdParam = z.object({
    id: z.string().uuid("Invalid campaign ID"),
});

export type CreateCampaignInput = z.infer<typeof createCampaignSchema>;
export type UpdateCampaignInput = z.infer<typeof updateCampaignSchema>;
