import type { CSSProperties } from "react";

const quotes = [
  {
    text: (
      <>
        <p className="mb-0">&ldquo;The level of precision brought to our</p>
        <p className="mb-0">design system was unprecedented. A</p>
        <p className="mb-0">true partner in defining our digital</p>
        <p>future.&rdquo;</p>
      </>
    ),
    attr: "Marcus Thorne — CTO, Nexus",
  },
  {
    text: (
      <>
        <p className="mb-0">&ldquo;Simplified our entire product suite. The</p>
        <p className="mb-0">focus on monochrome clarity reduced</p>
        <p>our user cognitive load significantly.&rdquo;</p>
      </>
    ),
    attr: "Elena Vance — Product Lead, Aether",
  },
  {
    text: (
      <>
        <p className="mb-0">&ldquo;A uniquely technical perspective on</p>
        <p className="mb-0">mobile UX. The resulting app feels</p>
        <p className="mb-0">native, snappy, and intentional in</p>
        <p>every interaction.&rdquo;</p>
      </>
    ),
    attr: "Julian Moss — Founder, Helios",
  },
  {
    text: (
      <>
        <p className="mb-0">&ldquo;Rare to find an engineer who speaks</p>
        <p className="mb-0">design so fluently. The collaboration</p>
        <p className="mb-0">process was seamless and the output</p>
        <p>exceptional.&rdquo;</p>
      </>
    ),
    attr: "Sasha Grey — Lead Designer, Prism",
  },
];

export function ClientVoices() {
  return (
    <section className="landing-container py-24 md:py-32 landing-animate-fade-up">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4 landing-animate-fade">
          <h2 className="landing-display-md text-[2.25rem] leading-tight md:text-4xl">
            <span className="block">Client</span>
            <span className="block">Voices</span>
          </h2>
        </div>
        <div className="grid gap-12 sm:grid-cols-2 lg:col-span-8 landing-stagger">
          {quotes.map((q, index) => (
            <figure
              key={q.attr}
              className="landing-animate-fade-up border-l border-solid border-[#e2e2e2] pl-8"
              style={{ "--stagger-i": index } as CSSProperties}
            >
              <div className="font-[family-name:var(--font-body)] text-lg leading-relaxed text-[color:var(--muted)]">
                {q.text}
              </div>
              <figcaption className="mt-8 font-[family-name:var(--font-body)] text-[10px] uppercase tracking-[0.08em] text-[color:var(--fg)]">
                {q.attr}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
