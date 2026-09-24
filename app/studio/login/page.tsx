"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/studio/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Invalid username or password");
        setLoading(false);
        return;
      }
      const next = searchParams.get("next") || "/studio";
      router.push(next);
      router.refresh();
    } catch {
      setError("Something went wrong. Try again.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-burgundy flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <p className="font-heading text-3xl text-gold mb-1">AustinG</p>
          <p className="font-body text-xs tracking-[0.25em] uppercase text-white/50">
            Studio
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-md p-8 shadow-xl shadow-black/20"
        >
          <div className="mb-5">
            <label
              htmlFor="username"
              className="block font-body text-[11px] tracking-[0.15em] uppercase text-burgundy/60 mb-2"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-sm border border-burgundy/15 px-3 py-2.5 font-body text-sm text-burgundy outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block font-body text-[11px] tracking-[0.15em] uppercase text-burgundy/60 mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-sm border border-burgundy/15 px-3 py-2.5 font-body text-sm text-burgundy outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
              required
            />
          </div>

          {error && (
            <p className="font-body text-xs text-red-600 mb-4 -mt-2">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-burgundy text-white font-body text-xs tracking-[0.15em] uppercase py-3 rounded-sm hover:bg-burgundy/90 transition-colors disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function StudioLoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
