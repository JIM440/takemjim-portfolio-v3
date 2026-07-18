import { contactSocial } from "@/lib/site-data";

export function AboutSplit() {
  return (
    <section className="landing-container py-24 md:py-40 landing-animate-fade-up">
      <div className="flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
        <div className="landing-animate-fade lg:w-[42%] lg:min-w-0">
          <p className="landing-practitioner-label">Passion and perspective</p>
          <h2 className="landing-about-headline mt-8">
            <span className="italic">I build software that automates business processes and brings product ideas to life.</span>
          </h2>
        </div>
        <div className="flex flex-col justify-end gap-8 landing-animate-fade-up [--anim-delay:0.08s] lg:w-[50%] lg:min-w-0">
          <p className="landing-body-about max-w-none">
            I am passionate about using AI and software development to reduce repetitive work, showcase businesses clearly, and create dependable web, mobile, and AI-enabled systems that stay useful as they grow.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="/contact"
              className="bg-[color:var(--accent)] px-10 py-4 font-[family-name:var(--font-body)] text-xs uppercase tracking-[0.2em] text-[color:var(--bg)] transition-opacity hover:opacity-90"
            >
              Contact me
            </a>
            <a
              href={contactSocial.cvHref}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[color:var(--line-strong)] bg-[color:var(--surface-strong)] px-10 py-4 font-[family-name:var(--font-body)] text-xs uppercase tracking-[0.2em] text-[color:var(--fg)] transition-colors hover:bg-[color:var(--fg)] hover:text-[color:var(--bg)]"
            >
              Download CV
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
