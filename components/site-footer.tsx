import Link from "next/link";
import { contactSocial, profile } from "@/lib/site-data";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[color:var(--line)] bg-[color:var(--bg)] py-12 md:py-16">
      <div className="landing-container flex flex-col items-center justify-between gap-8 sm:flex-row sm:gap-6">
        <p className="font-[family-name:var(--font-body)] text-[10px] font-medium uppercase tracking-[0.2em] text-[color:var(--muted)]">
          &copy; <time dateTime={String(year)} suppressHydrationWarning>{year}</time> {profile.name}
        </p>

        <nav className="flex flex-wrap items-center gap-x-10 gap-y-4">
          <a
            href={contactSocial.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-[family-name:var(--font-body)] text-[10px] font-bold uppercase tracking-[0.2em] text-[color:var(--fg)] hover:opacity-70"
          >
            WhatsApp
          </a>
          <a
            href={contactSocial.cvHref}
            target="_blank"
            rel="noopener noreferrer"
            className="font-[family-name:var(--font-body)] text-[10px] font-bold uppercase tracking-[0.2em] text-[color:var(--fg)] underline underline-offset-4 hover:opacity-70"
          >
            CV
          </a>
          <Link
            href="/blog"
            className="font-[family-name:var(--font-body)] text-[10px] font-bold uppercase tracking-[0.2em] text-[color:var(--fg)] hover:opacity-70"
          >
            Blog
          </Link>
          {contactSocial.social.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-[family-name:var(--font-body)] text-[10px] font-bold uppercase tracking-[0.2em] text-[color:var(--fg)] hover:opacity-70"
            >
              {s.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
