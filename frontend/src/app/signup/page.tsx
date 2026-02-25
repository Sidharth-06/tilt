"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signup } from "@/lib/api";
import { setToken } from "@/lib/auth";

export default function SignupPage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const result = await signup(email, password, name);
            setToken(result.token);
            router.push("/dashboard");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Signup failed");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#f8fafc] px-4 font-sans text-slate-900">
            <div className="w-full max-w-md bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-slate-100 mt-8 mb-8">
                <div className="mb-8 text-center flex flex-col items-center">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400 text-xl font-bold text-white shadow-md shadow-cyan-200">
                        T
                    </div>
                    <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Get started free</h1>
                    <p className="mt-1 text-sm text-slate-500">
                        Start managing your affiliate programs in minutes
                    </p>
                </div>

                {error && (
                    <div className="mb-6 rounded-lg bg-red-50 border border-red-100 p-4 text-sm text-red-600 font-medium text-center relative">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full name</label>
                        <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Alex Morgan"
                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100 shadow-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email address</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@company.com"
                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100 shadow-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Password</label>
                        <input
                            type="password"
                            required
                            minLength={8}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Min. 8 characters"
                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100 shadow-sm"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-6 w-full rounded-xl bg-cyan-400 py-3 text-sm font-bold text-white shadow-md shadow-cyan-200 transition-all hover:bg-cyan-500 hover:shadow-cyan-300 disabled:opacity-50"
                    >
                        {loading ? "Creating account..." : "Create Tilt account"}
                    </button>
                    <p className="text-center text-xs text-slate-400 mt-4 leading-relaxed">
                        By signing up, you agree to our Terms of Service and Privacy Policy.
                    </p>
                </form>

                <p className="mt-8 text-center text-sm font-medium text-slate-500">
                    Already have an account?{" "}
                    <Link href="/login" className="text-cyan-600 hover:text-cyan-700 transition-colors">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
}
