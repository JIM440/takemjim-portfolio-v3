import { aboutPage, profile, contactSocial } from "@/lib/site-data";
import { AppPhoto } from "@/components/landing/app-photo";

export function AboutHero() {
  return (
    <section className="landing-container pt-32 pb-16 md:pt-48 md:pb-24">
      <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16 landing-animate-fade-up">
        <div className="lg:col-span-7">
          <p className="landing-eyebrow mb-8 landing-animate-fade">About me</p>
          <h1 className="font-[family-name:var(--font-display)] text-[clamp(3.5rem,9vw,8rem)] font-normal leading-[0.85] tracking-tight text-[color:var(--fg)]">
            {profile.name}.
          </h1>
          <p className="landing-body-lg mt-10 max-w-[42rem] leading-relaxed text-[color:var(--muted)] landing-animate-fade-up [--anim-delay:0.1s]">
            {aboutPage.heroLede}
          </p>

          <div className="mt-12 w-fit border-t border-[color:var(--line)] pt-8 lg:mt-16 landing-animate-fade-up [--anim-delay:0.15s]">
            <div className="flex flex-wrap gap-x-10 gap-y-4">
              {contactSocial.social.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-[family-name:var(--font-body)] text-[10px] font-bold uppercase tracking-[0.2em] text-[color:var(--muted-label)] transition-colors hover:text-[color:var(--fg)]"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={contactSocial.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-[family-name:var(--font-body)] text-[10px] font-bold uppercase tracking-[0.2em] text-[color:var(--muted-label)] transition-colors hover:text-[color:var(--fg)]"
              >
                WhatsApp
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="font-[family-name:var(--font-body)] text-[10px] font-bold uppercase tracking-[0.2em] text-[color:var(--muted-label)] transition-colors hover:text-[color:var(--fg)]"
              >
                Email
              </a>
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
        </div>

        <div className="lg:col-span-5 landing-animate-fade [--anim-delay:0.12s]">
          <div className="border border-[color:var(--line)] bg-[color:var(--surface-strong)] p-3 lg:p-4">
            <AppPhoto
              src="/jim/takemjim.png"
              alt="Takem Jim portrait"
              className="aspect-[4/5] w-full"
              imgClassName="absolute inset-0 h-full w-full object-cover"
              priority
              sizes="(min-width: 1024px) 34vw, 100vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
