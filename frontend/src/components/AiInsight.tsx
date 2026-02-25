"use client";

import { useState, useEffect } from "react";
import { getInsight, type InsightResponse } from "@/lib/api";
import { getToken } from "@/lib/auth";

interface AiInsightProps {
    campaignId: string;
}

export default function AiInsight({ campaignId }: AiInsightProps) {
    const [data, setData] = useState<InsightResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function fetchInsight() {
        setLoading(true);
        setError("");

        try {
            const token = getToken();
            if (!token) return;
            const result = await getInsight(campaignId, token);
            setData(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to load insight");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchInsight();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [campaignId]);

    return (
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm flex flex-col h-full relative overflow-hidden">
            {/* Subtle decorative gradient at top */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-400 to-fuchsia-400"></div>

            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 bg-slate-50">
                <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-100 to-fuchsia-100 text-fuchsia-600 text-lg shadow-inner">
                        ✨
                    </span>
                    <h3 className="font-bold text-slate-900">AI Insight</h3>
                </div>
                <button
                    onClick={fetchInsight}
                    disabled={loading}
                    className="text-xs font-semibold text-cyan-600 transition-colors hover:text-cyan-700 disabled:opacity-50"
                >
                    {loading ? "Analyzing..." : "Refresh Analysis"}
                </button>
            </div>

            <div className="px-6 py-6 flex-1 flex flex-col justify-center">
                {loading && (
                    <div className="flex flex-col items-center justify-center py-8 gap-4">
                        <div className="h-8 w-8 animate-spin rounded-full border-[3px] border-cyan-400 border-t-transparent shadow-sm" />
                        <p className="text-sm font-medium text-slate-500">Our AI is analyzing your performance...</p>
                    </div>
                )}

                {error && (
                    <div className="rounded-lg bg-red-50 p-4 border border-red-100 self-start w-full">
                        <p className="text-sm font-medium text-red-600">{error}</p>
                    </div>
                )}

                {data && !loading && (
                    <p className="text-sm leading-relaxed text-slate-600">
                        {data.insight}
                    </p>
                )}
            </div>
        </div>
    );
}
