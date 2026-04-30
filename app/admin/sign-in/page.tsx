"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminSignInPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/admin/session", { credentials: "include" })
      .then((res) => res.json())
      .then((data: { ok?: boolean }) => {
        if (cancelled || !data.ok) return;
        router.replace("/admin/blog");
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [router]);

  return (
    <main className="landing-page flex min-h-screen flex-col justify-center px-5 py-24">
      <div className="landing-container">
        <div className="mx-auto max-w-lg border border-[color:var(--line-strong)] bg-[color:var(--surface-strong)] px-8 py-12 shadow-[var(--shadow)] md:px-12 md:py-14">
          <div className="flex items-center gap-4">
            <span className="h-px w-12 bg-[color:var(--line-strong)]" aria-hidden />
            <p className="font-[family-name:var(--font-body)] text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[color:var(--muted-label)]">
              Admin sign in
            </p>
          </div>

          <h1 className="mt-10 font-[family-name:var(--font-display)] text-[clamp(2.25rem,5vw,3.25rem)] font-normal leading-[0.98] tracking-tight text-[color:var(--fg-soft)]">
            Welcome back
          </h1>
          <p className="mt-6 font-[family-name:var(--font-body)] text-base leading-relaxed text-[color:var(--muted)]">
            Enter your admin password from <span className="text-[color:var(--fg-soft)]">.env.local</span> to manage blog
            posts, messages, and testimonials.
          </p>

          <form
            className="mt-12 flex flex-col gap-6"
            onSubmit={async (event) => {
              event.preventDefault();
              setError("");
              setPending(true);
              try {
                const res = await fetch("/api/admin/login", {
                  method: "POST",
                  credentials: "include",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ password }),
                });
                const data = (await res.json().catch(() => ({}))) as { error?: string };

                if (!res.ok) {
                  setError(data.error ?? "Sign in failed.");
                  setPending(false);
                  return;
                }

                router.replace("/admin/blog");
              } catch {
                setError("Could not reach the server.");
                setPending(false);
              }
            }}
          >
            <label className="flex flex-col gap-3">
              <span className="font-[family-name:var(--font-body)] text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[color:var(--muted-label)]">
                Password
              </span>
              <input
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="h-[3.35rem] w-full border border-[color:var(--line-strong)] bg-[color:var(--bg-muted)] px-5 font-[family-name:var(--font-body)] text-[1rem] text-[color:var(--fg)] outline-none placeholder:text-[color:var(--input-placeholder)] focus:border-[color:var(--fg)] focus:shadow-[0_0_0_1px_color-mix(in_oklab,var(--fg)_35%,transparent)]"
              />
            </label>
            {error ? (
              <p className="font-[family-name:var(--font-body)] text-sm text-red-400" role="alert">
                {error}
              </p>
            ) : null}
            <button
              type="submit"
              disabled={pending}
              className="h-[3.35rem] w-full border border-[color:var(--line-strong)] bg-[color:var(--fg-soft)] font-[family-name:var(--font-body)] text-[0.78rem] font-semibold uppercase tracking-[0.22em] text-[color:var(--bg)] transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {pending ? "Signing in…" : "Sign in"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
