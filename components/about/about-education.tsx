import type { CSSProperties } from "react";
import { educationTimeline } from "@/lib/site-data";

export function AboutEducation() {
  return (
    <section className="landing-container py-20 md:py-28 landing-animate-fade-up">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4 landing-animate-fade">
          <p className="landing-eyebrow">Education</p>
          <h2 className="landing-display-md mt-6 tracking-tight">Academic path</h2>
        </div>
        <div className="lg:col-span-8 landing-stagger">
          {educationTimeline.map((item, index) => (
            <article
              key={`${item.degree}-${item.range}`}
              className={`grid gap-5 border-[color:var(--line-strong)] py-9 md:grid-cols-4 md:gap-8 landing-animate-fade-up ${
                index > 0 ? "border-t" : ""
              }`}
              style={{ "--stagger-i": index } as CSSProperties}
            >
              <p className="font-[family-name:var(--font-body)] text-xs uppercase tracking-[0.2em] text-[color:var(--muted)]">
                {item.range}
              </p>
              <div className="md:col-span-3">
                <h3 className="landing-serif-title text-[1.75rem] leading-snug">{item.degree}</h3>
                <p className="mt-3 font-[family-name:var(--font-body)] text-xs uppercase tracking-[0.14em] text-[color:var(--fg)] opacity-60">
                  {item.institution}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
