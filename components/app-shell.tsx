"use client";

import { usePathname } from "next/navigation";
import { ScrollToTop } from "@/components/scroll-to-top";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <>
      {!isAdmin ? <SiteHeader /> : null}
      <div className="flex min-h-0 w-full min-w-0 flex-1 flex-col">{children}</div>
      {!isAdmin ? <SiteFooter /> : null}
      <ScrollToTop />
    </>
  );
}
