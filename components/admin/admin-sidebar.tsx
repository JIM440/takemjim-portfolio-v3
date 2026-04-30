"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { profile } from "@/lib/site-data";
import { Dialog } from "@/components/ui/dialog";

const links = [
  { href: "/admin/blog", label: "Blog" },
  { href: "/admin/messages", label: "Messages" },
  { href: "/admin/testimonials", label: "Testimonials" },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [showSignOut, setShowSignOut] = useState(false);

  return (
    <aside className="admin-sidebar">
      <Dialog
        open={showSignOut}
        title="Sign out?"
        description="You will need to sign in again to access the administrative area."
        confirmLabel="Sign out"
        cancelLabel="Cancel"
        onCancel={() => setShowSignOut(false)}
        onConfirm={async () => {
          await fetch("/api/admin/logout", { method: "POST", credentials: "include" });
          window.location.href = "/admin/sign-in";
        }}
      />

      <div className="admin-sidebar__brand">
        <span className="admin-sidebar__title">{profile.name}</span>
        <span className="admin-sidebar__hint">Studio · Content</span>
      </div>
      <nav className="admin-sidebar__nav" aria-label="Admin">
        {links.map((link) => {
          const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={active ? "admin-sidebar__link is-active" : "admin-sidebar__link"}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
      <div className="admin-sidebar__footer flex flex-col gap-3">
        <button
          type="button"
          className="admin-sidebar__exit text-left"
          onClick={() => setShowSignOut(true)}
        >
          Sign out
        </button>
        <Link href="/" className="admin-sidebar__exit">
          Back to site
        </Link>
      </div>
    </aside>
  );
}
