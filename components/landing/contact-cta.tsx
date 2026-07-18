import { Suspense } from "react";
import { ContactForm } from "@/components/contact/contact-form";
import { contactSocial, profile } from "@/lib/site-data";

export function ContactCta() {
  const mailtoHref = `mailto:${profile.email}`;

  return (
    <section className="landing-band py-24 md:py-32">
      <div className="landing-container grid w-full gap-10 sm:gap-12 lg:grid-cols-2 lg:gap-14 xl:gap-16">
        <div className="flex min-w-0 flex-col gap-8 sm:gap-10">
          <header>
            <p className="section-label">Contact</p>
            <h2 className="mt-4 max-w-[22ch] font-[family-name:var(--font-display)] text-[clamp(2.5rem,5vw,3.75rem)] font-normal leading-[1.05] tracking-tight text-[color:var(--fg-soft)]">
              Let&apos;s build something clear and useful.
            </h2>
          </header>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={mailtoHref}
              className="group flex items-center gap-3 font-[family-name:var(--font-body)] text-lg font-medium tracking-tight text-[color:var(--fg-soft)] underline underline-offset-8 decoration-[color:var(--muted-label)] transition-colors hover:decoration-[color:var(--fg)] sm:text-2xl"
            >
              {profile.email}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-5 transition-transform group-hover:translate-x-1 sm:size-6"
                aria-hidden="true"
              >
                <path d="M5 12h14m-7-7 7 7-7 7" />
              </svg>
            </a>
          </div>

          <nav
            aria-label="Social profiles and messaging"
            className="flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-[color:var(--line)] pt-8"
          >
            <a
              href={contactSocial.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-[family-name:var(--font-body)] text-xs font-medium uppercase tracking-[0.14em] text-[color:var(--muted)] underline underline-offset-4 transition-colors hover:text-[color:var(--fg)]"
            >
              WhatsApp
            </a>
            {contactSocial.social.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-[family-name:var(--font-body)] text-xs font-medium uppercase tracking-[0.14em] text-[color:var(--muted)] underline-offset-4 transition-colors hover:text-[color:var(--fg)]"
              >
                {item.label}
              </a>
            ))}
            <a
              href={contactSocial.cvHref}
              target="_blank"
              rel="noopener noreferrer"
              className="font-[family-name:var(--font-body)] text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--fg)] underline underline-offset-4"
            >
              Download CV
            </a>
          </nav>
        </div>

        <aside className="min-w-0 pt-10 sm:pt-12 lg:pt-0">
          <Suspense
            fallback={
              <p className="text-sm text-[color:var(--muted)]" role="status">
                Loading form…
              </p>
            }
          >
            <ContactForm />
          </Suspense>
        </aside>
      </div>
    </section>
  );
}

