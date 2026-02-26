"use client";

import { useEffect, useState } from "react";
import { getMe } from "@/lib/api";
import { getToken } from "@/lib/auth";

interface User {
    id: string;
    email: string;
    name: string | null;
    createdAt: string;
}

export default function SettingsPage() {
    const [user, setUser] = useState<User | null>(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        const token = getToken();
        if (!token) return;
        getMe(token).then((data) => {
            setUser(data);
            setName(data.name || "");
            setEmail(data.email);
        });
    }, []);

    function handleSave(e: React.FormEvent) {
        e.preventDefault();
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    }

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-extrabold text-slate-900">General Settings</h1>
                <p className="text-sm text-slate-500 mt-1">Manage your account preferences and profile information.</p>
            </div>

            <div className="max-w-2xl space-y-8">
                {/* Profile Card */}
                <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                    <div className="border-b border-slate-100 bg-slate-50 px-6 py-4">
                        <h2 className="font-bold text-slate-900">Profile Information</h2>
                    </div>
                    <form onSubmit={handleSave} className="p-6 space-y-5">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">Full Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-900 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 shadow-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-900 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 shadow-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">Account ID</label>
                            <input
                                type="text"
                                value={user?.id || ""}
                                readOnly
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-slate-500 outline-none cursor-not-allowed"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">Member Since</label>
                            <input
                                type="text"
                                value={user ? new Date(user.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : ""}
                                readOnly
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-slate-500 outline-none cursor-not-allowed"
                            />
                        </div>
                        <div className="pt-2">
                            <button
                                type="submit"
                                className="rounded-xl bg-cyan-400 px-6 py-2.5 text-sm font-bold text-white shadow-md shadow-cyan-200 transition-all hover:bg-cyan-500 hover:shadow-cyan-300"
                            >
                                {saved ? "✓ Saved!" : "Save Changes"}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Danger Zone */}
                <div className="rounded-2xl border border-red-200 bg-white shadow-sm overflow-hidden">
                    <div className="border-b border-red-100 bg-red-50 px-6 py-4">
                        <h2 className="font-bold text-red-700">Danger Zone</h2>
                    </div>
                    <div className="p-6 flex items-center justify-between">
                        <div>
                            <p className="font-semibold text-slate-900">Delete Account</p>
                            <p className="text-sm text-slate-500">Once you delete your account, there is no going back.</p>
                        </div>
                        <button className="rounded-xl border border-red-300 bg-white px-5 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 transition-colors">
                            Delete Account
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
