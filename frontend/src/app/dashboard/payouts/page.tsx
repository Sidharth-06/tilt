"use client";

import { useEffect, useState } from "react";
import { listCampaigns } from "@/lib/api";
import { getToken } from "@/lib/auth";

interface Campaign {
    id: string;
    name: string;
    basePayout: string;
    stats: { clicks: number; conversions: number; estimatedPayout: number };
}

export default function PayoutsPage() {
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

    const totalPayout = campaigns.reduce((sum, c) => sum + c.stats.estimatedPayout, 0);
    const pendingPayout = totalPayout * 0.35; // Demo: 35% pending
    const paidPayout = totalPayout - pendingPayout;

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-extrabold text-slate-900">Payouts</h1>
                <p className="text-sm text-slate-500 mt-1">View your payout history and pending balances.</p>
            </div>

            {/* Payout Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <p className="text-sm font-medium text-slate-500">Total Earned</p>
                    <p className="text-3xl font-extrabold text-slate-900 mt-1">${totalPayout.toFixed(2)}</p>
                </div>
                <div className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-6 shadow-sm">
                    <p className="text-sm font-medium text-emerald-700">Paid Out</p>
                    <p className="text-3xl font-extrabold text-emerald-600 mt-1">${paidPayout.toFixed(2)}</p>
                </div>
                <div className="rounded-2xl border border-amber-100 bg-amber-50/50 p-6 shadow-sm">
                    <p className="text-sm font-medium text-amber-700">Pending</p>
                    <p className="text-3xl font-extrabold text-amber-600 mt-1">${pendingPayout.toFixed(2)}</p>
                </div>
            </div>

            {/* Payout History */}
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                <div className="border-b border-slate-100 bg-slate-50 px-6 py-4">
                    <h2 className="font-bold text-slate-900">Payout History</h2>
                </div>
                {loading ? (
                    <div className="flex justify-center py-12">
                        <div className="h-6 w-6 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent" />
                    </div>
                ) : campaigns.length === 0 ? (
                    <div className="px-6 py-12 text-center text-slate-500">No payout history yet. Start generating conversions!</div>
                ) : (
                    <div className="divide-y divide-slate-100">
                        {campaigns.filter(c => c.stats.estimatedPayout > 0).map((c) => (
                            <div key={c.id} className="flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                                        $
                                    </div>
                                    <div>
                                        <p className="font-semibold text-slate-900">{c.name}</p>
                                        <p className="text-xs text-slate-500">{c.stats.conversions} conversions × ${Number(c.basePayout).toFixed(2)}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-emerald-600">${c.stats.estimatedPayout.toFixed(2)}</p>
                                    <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                                        Processed
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
