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

export default function CommissionsPage() {
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

    const totalCommissions = campaigns.reduce((sum, c) => sum + c.stats.estimatedPayout, 0);
    const totalConversions = campaigns.reduce((sum, c) => sum + c.stats.conversions, 0);

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-extrabold text-slate-900">Commissions</h1>
                <p className="text-sm text-slate-500 mt-1">Track commissions earned across all your campaigns.</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <p className="text-sm font-medium text-slate-500">Total Commissions</p>
                    <p className="text-3xl font-extrabold text-slate-900 mt-1">${totalCommissions.toFixed(2)}</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <p className="text-sm font-medium text-slate-500">Total Conversions</p>
                    <p className="text-3xl font-extrabold text-slate-900 mt-1">{totalConversions}</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <p className="text-sm font-medium text-slate-500">Active Campaigns</p>
                    <p className="text-3xl font-extrabold text-slate-900 mt-1">{campaigns.length}</p>
                </div>
            </div>

            {/* Commissions Table */}
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-slate-100 bg-slate-50">
                            <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Campaign</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Rate</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Conversions</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Commission Earned</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {loading ? (
                            <tr><td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                                <div className="flex justify-center"><div className="h-6 w-6 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent" /></div>
                            </td></tr>
                        ) : campaigns.length === 0 ? (
                            <tr><td colSpan={4} className="px-6 py-12 text-center text-slate-500">No commission data yet.</td></tr>
                        ) : (
                            campaigns.map((c) => (
                                <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 font-semibold text-slate-900">{c.name}</td>
                                    <td className="px-6 py-4 text-slate-600">${Number(c.basePayout).toFixed(2)} / conv.</td>
                                    <td className="px-6 py-4 text-slate-600">{c.stats.conversions}</td>
                                    <td className="px-6 py-4 font-bold text-emerald-600">${c.stats.estimatedPayout.toFixed(2)}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
