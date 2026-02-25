"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { getCampaign, listEvents, deleteCampaign, simulateConversion, type Campaign, type Event } from "@/lib/api";
import { getToken, isAuthenticated } from "@/lib/auth";
import StatsCard from "@/components/StatsCard";
import EventList from "@/components/EventList";
import AiInsight from "@/components/AiInsight";

export default function CampaignDetailPage() {
    const router = useRouter();
    const params = useParams();
    const campaignId = params.id as string;

    const [campaign, setCampaign] = useState<Campaign | null>(null);
    const [events, setEvents] = useState<Event[]>([]);
    const [totalEvents, setTotalEvents] = useState(0);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState(false);
    const [copied, setCopied] = useState(false);

    // Demo simulation state
    const [simulating, setSimulating] = useState<"click" | "conversion" | null>(null);
    const [simMessage, setSimMessage] = useState<string | null>(null);

    const refreshData = useCallback(async () => {
        try {
            const token = getToken()!;
            const [campaignData, eventsData] = await Promise.all([
                getCampaign(campaignId, token),
                listEvents(campaignId, token),
            ]);
            setCampaign(campaignData);
            setEvents(eventsData.events);
            setTotalEvents(eventsData.total);
        } catch {
            /* ignore refresh errors */
        }
    }, [campaignId]);

    useEffect(() => {
        if (!isAuthenticated()) {
            router.push("/login");
            return;
        }

        async function fetchData() {
            try {
                const token = getToken()!;
                const [campaignData, eventsData] = await Promise.all([
                    getCampaign(campaignId, token),
                    listEvents(campaignId, token),
                ]);
                setCampaign(campaignData);
                setEvents(eventsData.events);
                setTotalEvents(eventsData.total);
            } catch {
                router.push("/dashboard");
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [campaignId, router]);

    async function handleDelete() {
        if (!confirm("Are you sure you want to delete this campaign? This action cannot be undone.")) {
            return;
        }
        setDeleting(true);
        try {
            const token = getToken()!;
            await deleteCampaign(campaignId, token);
            router.push("/dashboard");
        } catch {
            setDeleting(false);
        }
    }

    function copyReferralLink() {
        if (!campaign) return;
        const link = `${window.location.origin}/r/${campaign.id}/${campaign.referralToken}`;
        navigator.clipboard.writeText(link);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    async function handleSimulateClick() {
        if (!campaign) return;
        setSimulating("click");
        setSimMessage(null);
        try {
            await fetch(`/r/${campaign.id}/${campaign.referralToken}`);
            setSimMessage("✅ Click recorded!");
            await refreshData();
        } catch {
            setSimMessage("❌ Failed to simulate click");
        } finally {
            setSimulating(null);
            setTimeout(() => setSimMessage(null), 3000);
        }
    }

    async function handleSimulateConversion() {
        if (!campaign) return;
        setSimulating("conversion");
        setSimMessage(null);
        try {
            await simulateConversion(campaign.id, campaign.referralToken);
            setSimMessage("✅ Conversion recorded!");
            await refreshData();
        } catch {
            setSimMessage("❌ Failed to simulate conversion");
        } finally {
            setSimulating(null);
            setTimeout(() => setSimMessage(null), 3000);
        }
    }

    if (loading || !campaign) {
        return (
            <div className="flex h-[80vh] items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-[3px] border-cyan-400 border-t-transparent shadow-sm" />
            </div>
        );
    }

    const referralLink = `${window.location.origin}/r/${campaign.id}/${campaign.referralToken}`;
    const rate =
        campaign.stats.clicks > 0
            ? ((campaign.stats.conversions / campaign.stats.clicks) * 100).toFixed(1)
            : "0.0";

    return (
        <div className="mx-auto max-w-6xl py-4 space-y-8">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                <Link href="/dashboard" className="hover:text-slate-900 transition-colors">
                    Dashboard
                </Link>
                <span>/</span>
                <span className="text-slate-900">{campaign.name}</span>
            </div>

            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">{campaign.name}</h1>
                        <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold border ${campaign.status === "ACTIVE"
                                ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                                : campaign.status === "PAUSED"
                                    ? "bg-amber-50 text-amber-700 border-amber-100"
                                    : "bg-slate-100 text-slate-700 border-slate-200"
                                }`}
                        >
                            <span className={`h-1.5 w-1.5 rounded-full ${campaign.status === "ACTIVE" ? "bg-emerald-500" : campaign.status === "PAUSED" ? "bg-amber-500" : "bg-slate-400"}`}></span>
                            {campaign.status}
                        </span>
                    </div>
                    {campaign.description && (
                        <p className="mt-1.5 text-sm text-slate-500">{campaign.description}</p>
                    )}
                </div>
                <button
                    onClick={handleDelete}
                    disabled={deleting}
                    className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition-all hover:bg-red-100 hover:border-red-300 disabled:opacity-50 shadow-sm"
                >
                    {deleting ? "Deleting..." : "Delete Campaign"}
                </button>
            </div>

            {/* Referral Link */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Referral Link
                </p>
                <div className="flex items-center gap-3">
                    <code className="flex-1 overflow-x-auto rounded-xl bg-slate-50 border border-slate-100 px-5 py-3 text-sm text-cyan-700 font-mono shadow-inner">
                        {referralLink}
                    </code>
                    <button
                        onClick={copyReferralLink}
                        className="shrink-0 rounded-xl bg-slate-100 border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-200 shadow-sm"
                    >
                        {copied ? "Copied! ✓" : "Copy"}
                    </button>
                </div>
            </div>

            {/* Demo Simulation Panel */}
            <div className="rounded-2xl border-2 border-cyan-100 bg-cyan-50/50 p-6 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 blur-[2px] pointer-events-none text-9xl">🧪</div>
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-xl">🧪</span>
                        <h3 className="text-base font-bold text-slate-900">Live Demo Sandbox</h3>
                        <span className="text-sm font-medium text-slate-500 hidden sm:inline">— simulate the referral funnel in real-time</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-4">
                        <button
                            onClick={handleSimulateClick}
                            disabled={simulating !== null}
                            className="group relative rounded-xl border border-blue-200 bg-blue-50 px-6 py-3 text-sm font-bold text-blue-700 transition-all hover:bg-blue-100 hover:border-blue-300 shadow-sm disabled:opacity-50"
                        >
                            <span className="flex items-center gap-2">
                                🖱️ {simulating === "click" ? "Simulating..." : "Simulate Click"}
                            </span>
                        </button>
                        <span className="text-slate-400 font-bold">→</span>
                        <button
                            onClick={handleSimulateConversion}
                            disabled={simulating !== null}
                            className="group relative rounded-xl border border-emerald-200 bg-emerald-50 px-6 py-3 text-sm font-bold text-emerald-700 transition-all hover:bg-emerald-100 hover:border-emerald-300 shadow-sm disabled:opacity-50"
                        >
                            <span className="flex items-center gap-2">
                                💰 {simulating === "conversion" ? "Simulating..." : "Simulate Conversion"}
                            </span>
                        </button>
                        {simMessage && (
                            <span className={`ml-2 text-sm font-bold animate-pulse ${simMessage.includes("✅") ? "text-emerald-600" : "text-red-600"}`}>
                                {simMessage}
                            </span>
                        )}
                    </div>
                    <p className="mt-4 text-xs font-medium text-slate-500 max-w-2xl">
                        Click → records a referral link visit. Conversion → records a completed action (signup, purchase). Each conversion generates payout.
                    </p>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <StatsCard label="Total Clicks" value={campaign.stats.clicks.toLocaleString()} color="emerald" trend="Active link metrics" />
                <StatsCard label="Conversions" value={campaign.stats.conversions.toLocaleString()} color="rose" trend="Completed actions" />
                <StatsCard
                    label="Conversion Rate"
                    value={`${rate}%`}
                    color="indigo"
                    icon={<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>}
                />
                <StatsCard
                    label="Est. Payout"
                    value={`$${campaign.stats.estimatedPayout.toFixed(2)}`}
                    color="cyan"
                    trend={`$${Number(campaign.basePayout).toFixed(2)} per conversion`}
                />
            </div>

            {/* AI Insight + Events */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 items-start">
                <AiInsight campaignId={campaignId} />
                <EventList events={events} total={totalEvents} />
            </div>
        </div>
    );
}
