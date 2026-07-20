"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";

function ResendLinkForm() {
  const searchParams = useSearchParams();
  const invalidLink  = searchParams.get("reason") === "invalid";
  const [email, setEmail]   = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [msg, setMsg]       = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res  = await fetch("/api/resend-link", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMsg(data.error ?? "Något gick fel.");
        setStatus("error");
      } else {
        setMsg(data.message);
        setStatus("ok");
      }
    } catch {
      setMsg("Kunde inte kontakta servern. Försök igen.");
      setStatus("error");
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6">
      <div className="max-w-md w-full flex flex-col gap-6">
        <div className="text-center flex flex-col items-center gap-3">
          {invalidLink && (
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl px-4 py-3 w-full">
              <p className="text-yellow-300 text-sm">Din länk är ogiltig eller har gått ut. Begär en ny nedan.</p>
            </div>
          )}
          <h1 className="text-2xl font-semibold text-white tracking-tight">Skicka länken igen</h1>
          <p className="text-white/50 text-sm leading-relaxed">
            Ange din e-postadress så skickar vi din personliga dashboard-länk på nytt.
          </p>
        </div>

        {status === "ok" ? (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
            <p className="text-white text-sm">{msg}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              type="email"
              required
              placeholder="din@email.se"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm outline-none focus:border-white/30 transition-colors"
            />
            {status === "error" && (
              <p className="text-red-400 text-xs">{msg}</p>
            )}
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full py-3 rounded-full bg-[#E8440A] text-white text-sm font-medium hover:bg-[#d13d09] transition-colors disabled:opacity-50"
            >
              {status === "loading" ? "Skickar..." : "Skicka länken →"}
            </button>
          </form>
        )}

        <p className="text-center text-white/30 text-xs">
          Behöver du hjälp?{" "}
          <a href="mailto:support@bellemartinee.se" className="text-white/50 hover:text-white transition-colors">
            support@bellemartinee.se
          </a>
        </p>
      </div>
    </div>
  );
}

export default function ResendLinkPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0a0a0a]" />}>
      <ResendLinkForm />
    </Suspense>
  );
}
