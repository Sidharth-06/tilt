const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

interface FetchOptions extends RequestInit {
    token?: string;
}

class ApiError extends Error {
    constructor(
        public status: number,
        message: string,
        public details?: unknown,
    ) {
        super(message);
        this.name = "ApiError";
    }
}

async function request<T>(path: string, options: FetchOptions = {}): Promise<T> {
    const { token, ...fetchOptions } = options;

    const headers: Record<string, string> = {
        "Content-Type": "application/json",
        ...(options.headers as Record<string, string>),
    };

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    const res = await fetch(`${API_BASE}${path}`, {
        ...fetchOptions,
        headers,
    });

    if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new ApiError(res.status, body.error || "Request failed", body.details);
    }

    // 204 No Content
    if (res.status === 204) return undefined as T;

    return res.json();
}

// --- Auth ---
export interface AuthResponse {
    user: { id: string; email: string; name: string; createdAt: string };
    token: string;
}

export function signup(email: string, password: string, name: string) {
    return request<AuthResponse>("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({ email, password, name }),
    });
}

export function login(email: string, password: string) {
    return request<AuthResponse>("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
    });
}

export function getMe(token: string) {
    return request<AuthResponse["user"]>("/api/auth/me", { token });
}

// --- Campaigns ---
export interface CampaignStats {
    clicks: number;
    conversions: number;
    estimatedPayout: number;
}

export interface Campaign {
    id: string;
    name: string;
    description: string;
    status: "ACTIVE" | "PAUSED" | "ENDED";
    basePayout: string;
    referralToken: string;
    createdAt: string;
    updatedAt: string;
    stats: CampaignStats;
}

export function listCampaigns(token: string) {
    return request<Campaign[]>("/api/campaigns", { token });
}

export function getCampaign(id: string, token: string) {
    return request<Campaign>(`/api/campaigns/${id}`, { token });
}

export function createCampaign(
    data: { name: string; description?: string; basePayout?: number },
    token: string,
) {
    return request<Campaign>("/api/campaigns", {
        method: "POST",
        body: JSON.stringify(data),
        token,
    });
}

export function updateCampaign(
    id: string,
    data: Partial<{ name: string; description: string; status: string; basePayout: number }>,
    token: string,
) {
    return request<Campaign>(`/api/campaigns/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        token,
    });
}

export function deleteCampaign(id: string, token: string) {
    return request<void>(`/api/campaigns/${id}`, { method: "DELETE", token });
}

// --- Events ---
export interface Event {
    id: string;
    campaignId: string;
    type: "CLICK" | "CONVERSION";
    ipHash: string | null;
    userAgent: string | null;
    referenceId: string | null;
    createdAt: string;
}

export function listEvents(campaignId: string, token: string, limit = 50) {
    return request<{ events: Event[]; total: number }>(
        `/api/campaigns/${campaignId}/events?limit=${limit}`,
        { token },
    );
}

// --- AI Insights ---
export interface InsightResponse {
    insight: string;
    stats: CampaignStats;
}

export function getInsight(campaignId: string, token: string) {
    return request<InsightResponse>(`/api/campaigns/${campaignId}/insights`, { token });
}

// --- Simulation (Demo) ---
export function simulateConversion(campaignId: string, referralToken: string) {
    const referenceId = `demo-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    return request<{ message: string; event: Event }>("/api/convert", {
        method: "POST",
        body: JSON.stringify({ campaignId, token: referralToken, referenceId }),
    });
}
