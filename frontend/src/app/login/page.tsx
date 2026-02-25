"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { login } from "@/lib/api";
import { setToken } from "@/lib/auth";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const result = await login(email, password);
            setToken(result.token);
            router.push("/dashboard");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Login failed");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#f8fafc] px-4 font-sans text-slate-900">
            <div className="w-full max-w-md bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-slate-100">
                {/* Logo */}
                <div className="mb-8 text-center flex flex-col items-center">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400 text-xl font-bold text-white shadow-md shadow-cyan-200">
                        T
                    </div>
                    <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Welcome back</h1>
                    <p className="mt-1 text-sm text-slate-500">
                        Sign in to Tilt to manage your referral programs
                    </p>
                </div>

                {error && (
                    <div className="mb-6 rounded-lg bg-red-50 border border-red-100 p-4 text-sm text-red-600 font-medium text-center relative">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email address</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100 shadow-sm"
                        />
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-1.5">
                            <label className="block text-sm font-semibold text-slate-700">Password</label>
                            <Link href="#" className="text-xs font-semibold text-cyan-600 hover:text-cyan-700">Forgot password?</Link>
                        </div>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100 shadow-sm"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-2 w-full rounded-xl bg-cyan-400 py-3 text-sm font-bold text-white shadow-md shadow-cyan-200 transition-all hover:bg-cyan-500 hover:shadow-cyan-300 disabled:opacity-50"
                    >
                        {loading ? "Signing in..." : "Sign in to Tilt"}
                    </button>
                </form>

                <p className="mt-8 text-center text-sm font-medium text-slate-500">
                    Don&apos;t have an account?{" "}
                    <Link href="/signup" className="text-cyan-600 hover:text-cyan-700 transition-colors">
                        Sign up for free
                    </Link>
                </p>
            </div>
        </div>
    );
}
