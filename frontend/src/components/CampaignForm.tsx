"use client";

import { useState } from "react";
import { createCampaign } from "@/lib/api";
import { getToken } from "@/lib/auth";

interface CampaignFormProps {
    onSuccess: () => void;
    onCancel: () => void;
}

export default function CampaignForm({ onSuccess, onCancel }: CampaignFormProps) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [basePayout, setBasePayout] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const token = getToken();
            if (!token) return;

            await createCampaign(
                {
                    name,
                    description,
                    basePayout: basePayout ? parseFloat(basePayout) : 0,
                },
                token,
            );
            onSuccess();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to create campaign");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
            <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
                <h2 className="text-xl font-extrabold text-slate-900">New Campaign</h2>
                <p className="mt-1 text-sm font-medium text-slate-500">
                    Set up a new referral campaign with a custom payout.
                </p>

                {error && (
                    <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm font-medium text-red-600 border border-red-100">{error}</div>
                )}

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-slate-700">Campaign Name</label>
                        <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. Summer Referral Blast"
                            className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-900 placeholder-slate-400 outline-none transition-colors focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 shadow-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Optional description..."
                            rows={3}
                            className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-900 placeholder-slate-400 outline-none transition-colors focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 resize-none shadow-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700">
                            Base Payout ($)
                        </label>
                        <input
                            type="number"
                            min="0"
                            step="0.01"
                            value={basePayout}
                            onChange={(e) => setBasePayout(e.target.value)}
                            placeholder="25.00"
                            className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-900 placeholder-slate-400 outline-none transition-colors focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 shadow-sm"
                        />
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="rounded-xl px-5 py-2.5 text-sm font-bold text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="rounded-xl bg-cyan-400 px-6 py-2.5 text-sm font-bold text-white shadow-md shadow-cyan-200 transition-all hover:bg-cyan-500 hover:shadow-cyan-300 disabled:opacity-50 flex justify-center items-center"
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                    Creating...
                                </span>
                            ) : (
                                "Create Campaign"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
