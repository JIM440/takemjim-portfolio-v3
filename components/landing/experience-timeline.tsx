import type { CSSProperties } from "react";
import type { ProfessionalTimelineRole } from "@/lib/site-data";
import { contactSocial, professionalTimeline } from "@/lib/site-data";

type ExperienceTimelineProps = {
  roles?: ProfessionalTimelineRole[];
};

export function ExperienceTimeline({ roles = professionalTimeline }: ExperienceTimelineProps) {
  return (
    <section className="landing-band landing-band--muted bg-[color:var(--input-bg)] py-24 md:py-48">
      <div className="landing-container landing-animate-fade-up">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4 landing-animate-fade">
            <h2 className="landing-display-md tracking-tight">
              <span className="block">Professional</span>
              <span className="block">Background</span>
            </h2>
            <div className="mt-10">
              <a
                href={contactSocial.cvHref}
                target="_blank"
                rel="noopener noreferrer"
                className="font-[family-name:var(--font-body)] text-[10px] font-bold uppercase tracking-[0.2em] text-[color:var(--fg)] transition-opacity hover:opacity-60 underline underline-offset-4"
              >
                Download CV
              </a>
            </div>
          </div>
          <div className="lg:col-span-8 landing-stagger">
            {roles.map((role: ProfessionalTimelineRole, i: number) => (
              <article
                key={role.title}
                className={`landing-animate-fade-up grid gap-6 border-[color:var(--line-strong)] py-12 md:grid-cols-4 md:gap-8 ${i > 0 ? "border-t" : ""}`}
                style={{ "--stagger-i": i } as CSSProperties}
              >
                <p className="font-[family-name:var(--font-body)] text-xs uppercase tracking-[0.2em] text-[color:var(--muted)]">
                  {role.range}
                </p>
                <div className="md:col-span-3">
                  <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                    <h3 className="landing-serif-title text-[1.875rem] leading-snug">
                      {role.title}
                    </h3>
                    <p className="shrink-0 font-[family-name:var(--font-body)] text-xs uppercase tracking-[0.1em] text-[color:var(--fg)] opacity-60">
                      {role.org}
                    </p>
                  </div>
                  <p className="landing-body-md mt-4 max-w-2xl">{role.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

