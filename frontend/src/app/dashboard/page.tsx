"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { listCampaigns, type Campaign } from "@/lib/api";
import { getToken, isAuthenticated } from "@/lib/auth";
import CampaignTable from "@/components/CampaignTable";
import CampaignForm from "@/components/CampaignForm";
import StatsCard from "@/components/StatsCard";

export default function DashboardPage() {
    const router = useRouter();
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);

    async function fetchCampaigns() {
        try {
            const token = getToken();
            if (!token) return;
            const data = await listCampaigns(token);
            setCampaigns(data);
        } catch {
            router.push("/login");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (!isAuthenticated()) {
            router.push("/login");
            return;
        }
        fetchCampaigns();
    }, [router]);

    const totals = campaigns.reduce(
        (acc, c) => ({
            clicks: acc.clicks + c.stats.clicks,
            conversions: acc.conversions + c.stats.conversions,
            payout: acc.payout + c.stats.estimatedPayout,
        }),
        { clicks: 0, conversions: 0, payout: 0 },
    );

    const overallRate =
        totals.clicks > 0 ? ((totals.conversions / totals.clicks) * 100).toFixed(1) : "0.0";

    if (loading) {
        return (
            <div className="flex h-[80vh] items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent" />
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-6xl py-4 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Dashboard Overview</h1>
                    <p className="mt-1 text-sm text-slate-500">
                        Welcome back. Here's what's happening with your affiliate campaigns today.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="rounded-lg bg-white border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-50 hover:text-slate-900 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                        Export
                    </button>
                    <button
                        onClick={() => setShowForm(true)}
                        className="rounded-lg bg-cyan-400 px-5 py-2 text-sm font-bold text-white shadow-md shadow-cyan-200 transition-all hover:bg-cyan-500 hover:shadow-cyan-300 flex items-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                        New Campaign
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                <StatsCard
                    label="Estimated Payouts"
                    value={`$${totals.payout.toFixed(2)}`}
                    color="cyan"
                    trend="+12.5%"
                />
                <StatsCard
                    label="Total Clicks"
                    value={totals.clicks.toLocaleString()}
                    color="emerald"
                    trend="+5.2%"
                />
                <StatsCard
                    label="Total Conversions"
                    value={totals.conversions.toLocaleString()}
                    color="rose"
                    trend="-1.2%"
                />
            </div>

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-slate-900 tracking-tight">Recent Affiliate Sign-ups</h2>
                        <p className="text-sm text-slate-500">A detailed view of your latest partners and their performance.</p>
                    </div>
                    <button className="text-sm font-semibold text-cyan-600 hover:text-cyan-700 transition-colors">
                        View all
                    </button>
                </div>
                <CampaignTable campaigns={campaigns} />
            </div>

            {showForm && (
                <CampaignForm
                    onSuccess={() => {
                        setShowForm(false);
                        fetchCampaigns();
                    }}
                    onCancel={() => setShowForm(false)}
                />
            )}
        </div>
    );
}
