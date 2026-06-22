"use client";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function HRLoginPage() {
  const [state, setState] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("loading");
    setError("");
    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/hr/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.get("email"), password: form.get("password") }),
      });
      const json = await res.json();
      if (!res.ok) { setError(json.error || "Login failed"); setState("error"); return; }
      router.push("/hr");
      router.refresh();
    } catch { setError("Network error. Try again."); setState("error"); }
  }

  return (
    <div className="min-h-screen bg-[var(--navy)] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <p className="text-[var(--gold)] text-xs font-semibold tracking-[0.3em] uppercase mb-2">Omega Contracting</p>
          <h1 className="font-serif text-3xl font-semibold text-white">HR Portal</h1>
          <p className="text-white/50 text-sm mt-2">Sign in to access recruitment dashboard</p>
        </div>
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
              <input name="email" type="email" required autoComplete="email"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--gold)] focus:border-[var(--gold)] outline-none transition"
                placeholder="hr@omega-tc.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <input name="password" type="password" required autoComplete="current-password"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--gold)] focus:border-[var(--gold)] outline-none transition"
                placeholder="••••••••" />
            </div>
            {error && <p className="text-red-500 text-sm bg-red-50 px-3 py-2 rounded-lg">{error}</p>}
            <button type="submit" disabled={state === "loading"}
              className="w-full flex items-center justify-center gap-2 bg-[var(--gold)] hover:bg-yellow-600 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-60">
              {state === "loading" ? <><Loader2 size={16} className="animate-spin" />Signing in...</> : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
