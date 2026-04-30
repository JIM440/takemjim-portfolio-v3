"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AdminSidebar } from "@/components/admin/admin-sidebar";

export function AdminGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (pathname === "/admin/sign-in") {
      setReady(true);
      return;
    }

    let cancelled = false;

    fetch("/api/admin/session", { credentials: "include" })
      .then((res) => res.json())
      .then((data: { ok?: boolean }) => {
        if (cancelled) return;
        if (!data.ok) {
          router.replace("/admin/sign-in");
          return;
        }
        setReady(true);
      })
      .catch(() => {
        if (!cancelled) {
          router.replace("/admin/sign-in");
        }
      });

    return () => {
      cancelled = true;
    };
  }, [pathname, router]);

  if (!ready) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[color:var(--bg)] px-6 py-24">
        <span
          className="h-10 w-10 animate-spin rounded-full border-2 border-[color:var(--line-strong)] border-t-[color:var(--fg-soft)]"
          aria-hidden
        />
        <p className="font-[family-name:var(--font-body)] text-xs font-semibold uppercase tracking-[0.28em] text-[color:var(--muted-label)]">
          Checking session…
        </p>
      </div>
    );
  }

  if (pathname === "/admin/sign-in") {
    return <>{children}</>;
  }

  return (
    <div className="admin-app landing-page">
      <AdminSidebar />
      <div className="admin-app__main">
        <div className="admin-app__content">{children}</div>
      </div>
    </div>
  );
}
