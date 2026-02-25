import { z } from "zod";

export const convertSchema = z.object({
    campaignId: z.string().uuid("Invalid campaign ID"),
    token: z.string().min(1, "Referral token is required"),
    referenceId: z.string().min(1, "Reference ID is required for idempotency"),
});

export const referralParamsSchema = z.object({
    campaignId: z.string().uuid("Invalid campaign ID"),
    token: z.string().min(1, "Token is required"),
});

export type ConvertInput = z.infer<typeof convertSchema>;
