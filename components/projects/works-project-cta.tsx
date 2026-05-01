import Link from "next/link";
import { profile } from "@/lib/site-data";

export function WorksProjectCta() {
  return (
    <section className="border-t border-(--line-strong) bg-(--bg) text-(--fg)">
      <div className="landing-container py-20 md:py-28 lg:py-32">
        <div className="mx-auto max-w-[40rem] text-center">
          <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.65rem,4vw,2.65rem)] font-normal italic leading-snug tracking-tight text-(--fg-soft)">
            Let&apos;s talk about your project
          </h2>
          <Link
            href="/contact?intent=project-request&subject=I%20would%20like%20to%20start%20a%20project%20with%20you"
            className="mt-12 inline-flex items-center gap-4 border border-(--line-strong) bg-transparent px-9 py-5 font-[family-name:var(--font-display)] text-[10px] font-normal uppercase tracking-[0.22em] text-(--fg-soft) transition-opacity hover:opacity-85 sm:px-12 sm:text-[11px]"
          >
            <span>I would like to start a project with you</span>
            <span aria-hidden className="text-base font-light leading-none">
              →
            </span>
          </Link>
        </div>

        <div className="mt-20 grid gap-12 border-t border-(--line) pt-14 sm:grid-cols-2 lg:mt-24 lg:grid-cols-3 lg:gap-10 lg:pt-16">
          <div className="border-t border-(--line-strong) pt-5 lg:border-t-0 lg:pt-0">
            <p className="font-[family-name:var(--font-body)] text-[10px] font-semibold uppercase tracking-[0.28em] text-(--muted-label)">
              Location
            </p>
            <p className="mt-4 font-[family-name:var(--font-body)] text-sm leading-relaxed text-(--muted) md:text-base">
              {profile.location}
            </p>
          </div>
          <div className="border-t border-(--line-strong) pt-5 lg:border-t-0 lg:pt-0">
            <p className="font-[family-name:var(--font-body)] text-[10px] font-semibold uppercase tracking-[0.28em] text-(--muted-label)">
              Availability
            </p>
            <p className="mt-4 font-[family-name:var(--font-body)] text-sm leading-relaxed text-(--muted) md:text-base">
              {profile.availability}
            </p>
          </div>
          <div className="border-t border-(--line-strong) pt-5 lg:border-t-0 lg:pt-0">
            <p className="font-[family-name:var(--font-body)] text-[10px] font-semibold uppercase tracking-[0.28em] text-(--muted-label)">
              Inquiries
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="mt-4 block font-[family-name:var(--font-body)] text-sm text-(--fg-soft) underline-offset-4 hover:opacity-90 md:text-base"
            >
              {profile.email}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
