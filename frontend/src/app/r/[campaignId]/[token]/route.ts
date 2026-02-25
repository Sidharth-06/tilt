import { NextRequest, NextResponse } from "next/server";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

/**
 * Referral click proxy — forwards /r/:campaignId/:token to the backend
 * click-tracking endpoint, so referral links work from either port.
 */
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ campaignId: string; token: string }> },
) {
    const { campaignId, token } = await params;

    try {
        // Forward the click to the backend
        const backendRes = await fetch(`${API_BASE}/r/${campaignId}/${token}`, {
            headers: {
                "user-agent": request.headers.get("user-agent") || "unknown",
                "x-forwarded-for": request.headers.get("x-forwarded-for") || "unknown",
            },
        });

        const data = await backendRes.json();
        return NextResponse.json(data);
    } catch {
        // If backend is unreachable, still confirm to the user
        return NextResponse.json(
            { message: "Referral link processed", campaignId },
            { status: 200 },
        );
    }
}
