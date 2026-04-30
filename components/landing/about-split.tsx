import { contactSocial, profile } from "@/lib/site-data";

export function AboutSplit() {
  return (
    <section className="landing-container py-24 md:py-40 landing-animate-fade-up">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5 landing-animate-fade">
          <p className="landing-practitioner-label">Passion and perspective</p>
          <h2 className="landing-about-headline mt-8">
            <span className="italic">I am passionate about AI, cloud, and system design.</span>
          </h2>
        </div>
        <div className="flex flex-col justify-end gap-8 lg:col-span-6 lg:col-start-7 landing-animate-fade-up [--anim-delay:0.08s]">
          <p className="landing-body-about max-w-xl">
            I am a software engineer based in {profile.location} who enjoys building across web, mobile, AI, and cloud systems. I focus on software that stays dependable as it grows. I am actively learning, building and growing in this field. I focus on delivering quality work that you can trust for your project.
          </p>
          <div className="flex flex-wrap gap-4">
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
