"use client";

import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
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
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const panelId = useId();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) {
      return;
    }

    const { body, documentElement } = document;
    const scrollY = window.scrollY;
    const prevBodyOverflow = body.style.overflow;
    const prevBodyPosition = body.style.position;
    const prevBodyTop = body.style.top;
    const prevBodyWidth = body.style.width;
    const prevHtmlOverflow = documentElement.style.overflow;

    document.documentElement.style.overflow = "hidden";
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";

    return () => {
      documentElement.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
      body.style.position = prevBodyPosition;
      body.style.top = prevBodyTop;
      body.style.width = prevBodyWidth;
      window.scrollTo(0, scrollY);
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) {
      return;
    }

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
      }
    };

    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);

  const sidebarContent = (
    <>
      <div className="admin-sidebar__brand">
        <span className="admin-sidebar__title">{profile.name}</span>
        <span className="admin-sidebar__hint">Studio &middot; Content</span>
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
    </>
  );

  const closeMobile = () => setMobileOpen(false);

  const mobileDrawer =
    mounted &&
    createPortal(
      <>
        {mobileOpen ? (
          <div
            className="admin-sidebar-backdrop is-open"
            aria-hidden
            onClick={closeMobile}
          />
        ) : null}

        <aside
          id={panelId}
          className={
            mobileOpen ? "admin-sidebar admin-sidebar--drawer is-open" : "admin-sidebar admin-sidebar--drawer"
          }
          role="dialog"
          aria-modal="true"
          aria-hidden={!mobileOpen}
        >
          <div className="admin-sidebar__drawer-head">
            <span className="admin-sidebar__hint">Menu</span>
            <button
              type="button"
              className="admin-sidebar__close"
              onClick={closeMobile}
              aria-label="Close admin menu"
            >
              <span aria-hidden className="admin-sidebar__close-icon" />
            </button>
          </div>

          <nav className="admin-sidebar__drawer-nav" aria-label="Mobile admin navigation">
            <ul className="admin-sidebar__mobile-list">
              {links.map((link) => {
                const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={
                        active ? "admin-sidebar__mobile-link is-active" : "admin-sidebar__mobile-link"
                      }
                      onClick={closeMobile}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="mt-8 flex flex-col gap-4 border-t border-[color:var(--line)] pt-6">
              <button
                type="button"
                className="admin-sidebar__mobile-action text-left"
                onClick={() => {
                  closeMobile();
                  setShowSignOut(true);
                }}
              >
                Sign out
              </button>
              <Link href="/" className="admin-sidebar__mobile-action" onClick={closeMobile}>
                Back to site
              </Link>
            </div>
          </nav>
        </aside>
      </>,
      document.body,
    );

  return (
    <>
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

      <div className="admin-sidebar-mobile">
        <div className="min-w-0">
          <span className="admin-sidebar__title block">{profile.name}</span>
          <span className="admin-sidebar__hint mt-1 block">Studio &middot; Content</span>
        </div>
        <button
          type="button"
          className="admin-sidebar-mobile__toggle"
          onClick={() => setMobileOpen(true)}
          aria-expanded={mobileOpen}
          aria-controls={panelId}
          aria-label="Open admin menu"
        >
          <span className="sr-only">{mobileOpen ? "Close menu" : "Open menu"}</span>
          <span aria-hidden className="admin-sidebar-mobile__icon" data-open={mobileOpen} />
        </button>
      </div>

      {mobileDrawer}

      <aside className="admin-sidebar admin-sidebar--desktop">{sidebarContent}</aside>
    </>
  );
}
