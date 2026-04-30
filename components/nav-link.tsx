"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/** Primary nav: home is exact; other items match prefix (e.g. /blog/post → Blog). */
export function navPathMatches(pathname: string, href: string): boolean {
  const normalized =
    pathname.length > 1 && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
  if (href === "/") {
    return normalized === "/" || normalized === "";
  }
  return normalized === href || normalized.startsWith(`${href}/`);
}

type NavLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  activeClassName?: string;
  onClick?: () => void;
};

export function NavLink({ href, children, className = "", activeClassName = "", onClick }: NavLinkProps) {
  const pathname = usePathname();
  const active = navPathMatches(pathname, href);
  const merged = [className, active ? activeClassName : ""].filter(Boolean).join(" ");

  return (
    <Link href={href} className={merged} onClick={onClick} aria-current={active ? "page" : undefined}>
      {children}
    </Link>
  );
}
