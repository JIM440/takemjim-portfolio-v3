"use client";

import { createPortal } from "react-dom";
import { useEffect, useId, useState } from "react";
import { NavLink } from "@/components/nav-link";
import { ThemeToggle } from "@/components/theme-toggle";
import { contactSocial } from "@/lib/site-data";

export type NavItem = {
  href: string;
  label: string;
};

type MobileNavProps = {
  items: NavItem[];
  onOpenChange?: (open: boolean) => void;
};

export function MobileNav({ items, onOpenChange }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const panelId = useId();

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    onOpenChange?.(open);
  }, [open, onOpenChange]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const { body, documentElement } = document;
    const scrollY = window.scrollY;
    const prevBodyOverflow = body.style.overflow;
    const prevBodyPosition = body.style.position;
    const prevBodyTop = body.style.top;
    const prevBodyWidth = body.style.width;
    const prevHtmlOverflow = documentElement.style.overflow;

    documentElement.style.overflow = "hidden";
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
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);

  const overlay =
    mounted &&
    createPortal(
      <>
        {open ? (
          <div
            className="mobile-nav__backdrop mobile-nav__backdrop--open"
            aria-hidden={false}
            onClick={close}
          />
        ) : null}

        <div
          id={panelId}
          className={`mobile-nav__drawer ${open ? "mobile-nav__drawer--open" : ""}`}
          role="dialog"
          aria-modal="true"
          aria-hidden={!open}
        >
          <div className="mobile-nav__drawer-head">
            <span className="mobile-nav__drawer-label">Menu</span>
            <button type="button" className="mobile-nav__close" onClick={close} aria-label="Close menu">
              <span aria-hidden className="mobile-nav__close-icon" />
            </button>
          </div>

          <nav className="mobile-nav__drawer-nav" aria-label="Mobile primary navigation">
            <ul className="mobile-nav__list">
              {items.map((item) => (
                <li key={item.href}>
                  <NavLink
                    href={item.href}
                    className="mobile-nav__link"
                    activeClassName="mobile-nav__link--active"
                    onClick={close}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-4 border-t border-[color:var(--line)] pt-6">
              <ThemeToggle className="w-fit" />
              <a
                href={contactSocial.cvHref}
                target="_blank"
                rel="noopener noreferrer"
                className="font-[family-name:var(--font-body)] text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--fg)] underline underline-offset-4"
                onClick={close}
              >
                Resume
              </a>
            </div>
          </nav>
        </div>
      </>,
      document.body,
    );

  return (
    <>
      <div className="mobile-nav">
        <button
          type="button"
          className="mobile-nav__toggle"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span aria-hidden className="mobile-nav__icon" data-open={open} />
        </button>
      </div>
      {overlay}
    </>
  );
}
