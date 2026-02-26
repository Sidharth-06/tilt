"use client";

import { useEffect, useState } from "react";
import { listCampaigns } from "@/lib/api";
import { getToken } from "@/lib/auth";
import Link from "next/link";

interface Campaign {
    id: string;
    name: string;
    description: string | null;
    status: string;
    referralToken: string;
    basePayout: string;
    createdAt: string;
    stats: { clicks: number; conversions: number; estimatedPayout: number };
}

export default function AffiliatesPage() {
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = getToken();
        if (!token) return;
        listCampaigns(token).then((data) => {
            setCampaigns(data);
            setLoading(false);
        });
    }, []);

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-extrabold text-slate-900">Affiliates</h1>
                    <p className="text-sm text-slate-500 mt-1">Manage your affiliate campaigns and track referral performance.</p>
                </div>
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <div className="h-8 w-8 animate-spin rounded-full border-[3px] border-cyan-400 border-t-transparent" />
                </div>
            ) : campaigns.length === 0 ? (
                <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
                    <div className="mx-auto h-16 w-16 rounded-full bg-cyan-50 flex items-center justify-center text-2xl mb-4">👥</div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">No affiliates yet</h3>
                    <p className="text-sm text-slate-500">Create your first campaign to start tracking affiliate referrals.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {campaigns.map((c) => {
                        const statusColor = c.status === "ACTIVE"
                            ? "bg-emerald-50 text-emerald-700"
                            : c.status === "PAUSED"
                                ? "bg-amber-50 text-amber-700"
                                : "bg-slate-100 text-slate-600";
                        return (
                            <Link
                                key={c.id}
                                href={`/dashboard/${c.id}`}
                                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-all group"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-100 text-cyan-600 font-bold text-lg">
                                        {c.name.charAt(0).toUpperCase()}
                                    </div>
                                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColor}`}>{c.status}</span>
                                </div>
                                <h3 className="font-bold text-slate-900 group-hover:text-cyan-600 transition-colors">{c.name}</h3>
                                <p className="text-xs text-slate-500 mt-1 line-clamp-2">{c.description || "No description"}</p>
                                <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-3 gap-2 text-center">
                                    <div>
                                        <p className="text-lg font-extrabold text-slate-900">{c.stats.clicks}</p>
                                        <p className="text-[10px] text-slate-500 uppercase tracking-wider">Clicks</p>
                                    </div>
                                    <div>
                                        <p className="text-lg font-extrabold text-slate-900">{c.stats.conversions}</p>
                                        <p className="text-[10px] text-slate-500 uppercase tracking-wider">Conv.</p>
                                    </div>
                                    <div>
                                        <p className="text-lg font-extrabold text-cyan-600">${c.stats.estimatedPayout.toFixed(0)}</p>
                                        <p className="text-[10px] text-slate-500 uppercase tracking-wider">Payout</p>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
