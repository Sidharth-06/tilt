"use client";

import Link from "next/link";
import type { Campaign } from "@/lib/api";

interface CampaignTableProps {
    campaigns: Campaign[];
}

const statusStyles: Record<string, { bg: string; text: string; dot: string }> = {
    ACTIVE: { bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500" },
    PAUSED: { bg: "bg-amber-50", text: "text-amber-700", dot: "bg-amber-500" },
    ENDED: { bg: "bg-slate-100", text: "text-slate-700", dot: "bg-slate-400" },
};

export default function CampaignTable({ campaigns }: CampaignTableProps) {
    if (campaigns.length === 0) {
        return (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center shadow-sm">
                <p className="text-lg font-semibold text-slate-900">No campaigns yet</p>
                <p className="mt-1 text-sm text-slate-500">
                    Create your first campaign to start tracking referrals.
                </p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full whitespace-nowrap text-left text-sm">
                <thead className="bg-slate-50 text-slate-500 text-xs font-semibold uppercase tracking-wider border-b border-slate-200">
                    <tr>
                        <th className="px-6 py-4">Campaign Context</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right">Clicks</th>
                        <th className="px-6 py-4 text-right">Conversions</th>
                        <th className="px-6 py-4 text-right">Payout Gen.</th>
                        <th className="px-6 py-4 text-right">Conv. Rate</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {campaigns.map((campaign) => {
                        const rate =
                            campaign.stats.clicks > 0
                                ? ((campaign.stats.conversions / campaign.stats.clicks) * 100).toFixed(1)
                                : "0.0";
                        const style = statusStyles[campaign.status] || statusStyles.ENDED;

                        return (
                            <tr key={campaign.id} className="transition-colors hover:bg-slate-50/80 group">
                                <td className="px-6 py-4">
                                    <Link href={`/dashboard/${campaign.id}`} className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-cyan-100 text-cyan-600 font-bold">
                                            {campaign.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-slate-900 group-hover:text-cyan-600 transition-colors">
                                                {campaign.name}
                                            </p>
                                            <p className="text-xs text-slate-500">
                                                {campaign.description || `Token: ${campaign.referralToken}`}
                                            </p>
                                        </div>
                                    </Link>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold border ${style.bg} ${style.text} border-transparent`}>
                                        <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`}></span>
                                        {campaign.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right font-medium text-slate-900">
                                    {campaign.stats.clicks.toLocaleString()}
                                </td>
                                <td className="px-6 py-4 text-right font-medium text-slate-900">
                                    {campaign.stats.conversions.toLocaleString()}
                                </td>
                                <td className="px-6 py-4 text-right font-semibold text-slate-900">
                                    ${campaign.stats.estimatedPayout.toFixed(2)}
                                </td>
                                <td className="px-6 py-4 text-right font-medium text-slate-500">
                                    {rate}%
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
