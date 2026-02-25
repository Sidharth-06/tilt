import React from "react";

interface StatsCardProps {
    label: string;
    value: string | number;
    icon?: React.ReactNode;
    trend?: string;
    color?: "cyan" | "emerald" | "rose" | "indigo";
}

export default function StatsCard({ label, value, icon, trend, color = "indigo" }: StatsCardProps) {
    const colorStyles = {
        cyan: "from-cyan-400 to-cyan-300 text-cyan-500 bg-cyan-50",
        emerald: "from-emerald-400 to-emerald-300 text-emerald-500 bg-emerald-50",
        rose: "from-rose-400 to-rose-300 text-rose-500 bg-rose-50",
        indigo: "from-indigo-400 to-indigo-300 text-indigo-500 bg-indigo-50",
    };

    return (
        <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
            <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-semibold text-slate-500">{label}</p>
                {icon && (
                    <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${colorStyles[color].split("bg-")[1] ? `bg-${colorStyles[color].split("bg-")[1]}` : "bg-slate-100"}`}>
                        {typeof icon === "string" ? (
                            <span className="text-sm">{icon}</span>
                        ) : (
                            <div className={`text-${color}-500 w-4 h-4`}>{icon}</div>
                        )}
                    </div>
                )}
            </div>

            <div className="flex items-baseline gap-3">
                <h3 className="text-3xl font-extrabold text-slate-900">{value}</h3>
                {trend && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-600">
                        {trend.includes("-") ? (
                            <svg className="w-3 h-3 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6" /></svg>
                        ) : (
                            <svg className="w-3 h-3 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                        )}
                        {trend}
                    </span>
                )}
            </div>

            {/* Decorative Sparkline */}
            <div className="absolute bottom-0 left-0 right-0 h-10 opacity-20 pointer-events-none">
                <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 20">
                    <path
                        d="M0 20 Q 25 5, 50 15 T 100 5 L 100 20 Z"
                        fill={`url(#gradient-${color})`}
                    />
                    <defs>
                        <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="currentColor" className={`text-${color}-500`} stopOpacity="1" />
                            <stop offset="100%" stopColor="currentColor" className={`text-${color}-500`} stopOpacity="0" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>
        </div>
    );
}
