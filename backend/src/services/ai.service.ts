import OpenAI from "openai";
import { config } from "../config.js";
import { logger } from "../lib/logger.js";

interface CampaignStats {
    name: string;
    clicks: number;
    conversions: number;
    estimatedPayout: number;
}

const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: config.OPENROUTER_API_KEY,
    defaultHeaders: {
        "HTTP-Referer": config.FRONTEND_URL,
        "X-Title": "Referral Dashboard",
    },
});

/**
 * Generate an AI insight for a campaign using OpenRouter (Llama 3.2 3B).
 * Falls back to a deterministic mock if no API key is configured or on error.
 */
export async function generateInsight(campaign: CampaignStats): Promise<string> {
    if (!config.OPENROUTER_API_KEY) {
        return generateMockInsight(campaign);
    }

    return callOpenRouter(campaign);
}

async function callOpenRouter(campaign: CampaignStats): Promise<string> {
    const conversionRate =
        campaign.clicks > 0 ? ((campaign.conversions / campaign.clicks) * 100).toFixed(1) : "0";

    try {
        const completion = await openai.chat.completions.create({
            model: "arcee-ai/trinity-large-preview:free",
            messages: [
                {
                    role: "system",
                    content:
                        "You are a SaaS analytics assistant. Given campaign referral data, provide a concise 1-2 paragraph insight about performance and one actionable recommendation. Be specific with numbers. Do not use markdown formatting.",
                },
                {
                    role: "user",
                    content: `Campaign "${campaign.name}" stats:\n- Total clicks: ${campaign.clicks}\n- Total conversions: ${campaign.conversions}\n- Conversion rate: ${conversionRate}%\n- Estimated payout: $${campaign.estimatedPayout.toFixed(2)}\n\nProvide a brief performance summary and one actionable recommendation.`,
                },
            ],
            max_tokens: 300,
            temperature: 0.7,
        });

        const content = completion.choices[0]?.message?.content;
        return content ?? "Unable to generate insight.";
    } catch (err) {
        logger.error("OpenRouter API call failed, falling back to mock", {
            error: (err as Error).message,
        });
        return generateMockInsight(campaign);
    }
}

function generateMockInsight(campaign: CampaignStats): string {
    const conversionRate =
        campaign.clicks > 0 ? ((campaign.conversions / campaign.clicks) * 100).toFixed(1) : "0.0";

    const performanceLevel =
        Number(conversionRate) > 10 ? "strong" : Number(conversionRate) > 3 ? "moderate" : "below average";

    return (
        `Campaign "${campaign.name}" is showing ${performanceLevel} performance with a ${conversionRate}% conversion rate ` +
        `(${campaign.conversions} conversions from ${campaign.clicks} clicks). ` +
        `The estimated payout stands at $${campaign.estimatedPayout.toFixed(2)}. ` +
        (Number(conversionRate) < 5
            ? `Consider optimizing the referral landing page or increasing the base payout to incentivize higher-quality referrals. ` +
            `A/B testing different call-to-action messages could also help improve the conversion funnel.`
            : `This is a healthy conversion rate. To scale further, consider expanding the campaign to additional referral partners ` +
            `and monitor whether the cost-per-acquisition remains sustainable as volume increases.`)
    );
}
