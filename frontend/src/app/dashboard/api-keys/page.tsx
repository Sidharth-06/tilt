"use client";

import { useState } from "react";

export default function ApiKeysPage() {
    const [keys] = useState([
        { id: "1", name: "Production Key", key: "tilt_live_••••••••••••7f3a", created: "Feb 20, 2026", lastUsed: "2 hours ago", status: "active" },
        { id: "2", name: "Development Key", key: "tilt_test_••••••••••••9b2c", created: "Feb 18, 2026", lastUsed: "5 days ago", status: "active" },
    ]);
    const [showCreate, setShowCreate] = useState(false);
    const [newKeyName, setNewKeyName] = useState("");

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-extrabold text-slate-900">API Keys</h1>
                    <p className="text-sm text-slate-500 mt-1">Manage API keys for programmatic access to your Tilt account.</p>
                </div>
                <button
                    onClick={() => setShowCreate(!showCreate)}
                    className="rounded-xl bg-cyan-400 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-cyan-200 transition-all hover:bg-cyan-500"
                >
                    + Create API Key
                </button>
            </div>

            {showCreate && (
                <div className="rounded-2xl border border-cyan-200 bg-cyan-50/50 p-6 mb-6 shadow-sm">
                    <h3 className="font-bold text-slate-900 mb-3">Create New API Key</h3>
                    <div className="flex gap-3">
                        <input
                            type="text"
                            value={newKeyName}
                            onChange={(e) => setNewKeyName(e.target.value)}
                            placeholder="Key name, e.g. Production"
                            className="flex-1 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-900 placeholder-slate-400 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 shadow-sm"
                        />
                        <button className="rounded-xl bg-cyan-400 px-6 py-2.5 text-sm font-bold text-white shadow-md shadow-cyan-200 hover:bg-cyan-500 transition-all">
                            Generate
                        </button>
                    </div>
                </div>
            )}

            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-slate-100 bg-slate-50">
                            <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Key</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Created</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Last Used</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {keys.map((apiKey) => (
                            <tr key={apiKey.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4 font-semibold text-slate-900">{apiKey.name}</td>
                                <td className="px-6 py-4">
                                    <code className="text-sm bg-slate-100 text-slate-700 px-2 py-1 rounded-lg font-mono">{apiKey.key}</code>
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-500">{apiKey.created}</td>
                                <td className="px-6 py-4 text-sm text-slate-500">{apiKey.lastUsed}</td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                                        Active
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <button className="text-xs font-semibold text-red-500 hover:text-red-700 transition-colors">Revoke</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
