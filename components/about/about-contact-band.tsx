import Link from "next/link";
import { aboutPage, profile } from "@/lib/site-data";

/** Contact strip inspired by editorialAbout layouts: ruled top, split headline, email / location */
export function AboutContactBand() {
  const { sectionMark, bandLabel, headlineLead, headlineAccent, description } = aboutPage.contactBand;

  return (
    <section className="bg-[color:var(--surface-muted)] [--about-accent:var(--fg-soft)]">
      <div className="landing-container py-16 md:py-24 landing-animate-fade-up">
        <div className="flex items-baseline justify-between gap-4 landing-animate-fade">
          <span className="font-[family-name:var(--font-body)] text-sm font-medium tabular-nums text-[color:var(--about-accent)]">
            {sectionMark}
          </span>
          <span className="font-[family-name:var(--font-body)] text-[10px] font-semibold uppercase tracking-[0.28em] text-[#78716c]">
            {bandLabel}
          </span>
        </div>

        <div className="mt-12 grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(2.25rem,5vw,3.75rem)] font-normal leading-[1.05] tracking-tight text-[color:var(--fg)]">
              <span className="block">{headlineLead}</span>
              <span className="block italic text-[color:var(--about-accent)]">{headlineAccent}</span>
            </h2>
            <p className="mt-8 max-w-xl font-[family-name:var(--font-body)] text-[color:var(--muted)] leading-relaxed">
              {description}
            </p>
          </div>

          <div className="flex flex-col border-t border-[color:var(--line-strong)] landing-animate-fade-up [--anim-delay:0.08s]">
            <div className="grid gap-2 border-b border-[color:var(--line-strong)] py-8">
              <span className="font-[family-name:var(--font-body)] text-[10px] font-semibold uppercase tracking-[0.24em] text-[#78716c]">
                Email
              </span>
              <a
                href={`mailto:${profile.email}`}
                className="font-[family-name:var(--font-display)] text-xl text-[color:var(--fg-soft)] underline-offset-4 hover:opacity-90 md:text-2xl"
              >
                {profile.email}
              </a>
            </div>
            <div className="grid gap-2 py-8">
              <span className="font-[family-name:var(--font-body)] text-[10px] font-semibold uppercase tracking-[0.24em] text-[#78716c]">
                Location
              </span>
              <p className="font-[family-name:var(--font-display)] text-xl text-[color:var(--fg-soft)] md:text-2xl">
                {profile.location}
              </p>
            </div>
            <Link
              href="/contact"
              className="mt-4 inline-flex w-fit border-b border-[color:var(--fg)] pb-1 font-[family-name:var(--font-body)] text-[10px] uppercase tracking-[0.14em] text-[color:var(--fg)]"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
