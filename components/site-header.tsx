"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { MobileNav } from "@/components/mobile-nav";
import { NavLink } from "@/components/nav-link";
import { ThemeToggle } from "@/components/theme-toggle";
import { contactSocial, navigation, profile } from "@/lib/site-data";

const mobileNavItems = [{ href: "/", label: "Home" }, ...navigation];
const desktopNavItems = [{ href: "/", label: "Home" }, ...navigation];

export function SiteHeader() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <header className="figma-header">
      <div className="figma-header__inner">
        <Link href="/" className="figma-header__logo">
          <Image
            src="/jim.png"
            alt=""
            width={36}
            height={36}
            className="figma-header__logo-mark"
            sizes="36px"
          />
          <span className="figma-header__logo-text">{profile.name}</span>
        </Link>

        <nav className="figma-header__nav" aria-label="Primary navigation">
          <ul className="figma-header__list">
            {desktopNavItems.map((item) => (
              <li key={item.href}>
                <NavLink href={item.href} className="figma-header__link" activeClassName="figma-header__link--active">
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className={mobileNavOpen ? "hidden items-center gap-3 lg:flex" : "hidden items-center gap-3 md:flex"}>
          <ThemeToggle />
          <a
            href={contactSocial.cvHref}
            target="_blank"
            rel="noopener noreferrer"
            className="figma-header__resume"
          >
            Download CV
          </a>
        </div>

        <MobileNav items={mobileNavItems} onOpenChange={setMobileNavOpen} />
      </div>
    </header>
  );
}
