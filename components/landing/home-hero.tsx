import Link from "next/link";
import { landingAssets } from "@/lib/figma-landing-assets";
import { profile, contactSocial } from "@/lib/site-data";
import { AppPhoto } from "./app-photo";

export function HomeHero() {
  const heroSentence =
    "I build web and mobile products that help businesses present themselves clearly, automate everyday processes, and turn ideas into useful software.";

  return (
    <section className="landing-hero flex items-center py-28 md:py-32 lg:py-36">
      <div className="landing-container">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          {/* Left Column: Content */}
          <div className="flex flex-col lg:col-span-7">
            <h1 className="font-[family-name:var(--font-display)] text-6xl font-normal leading-tight text-[color:var(--fg-soft)] md:text-8xl">
              {profile.name}.
            </h1>

            <p className="max-w-[36rem] font-[family-name:var(--font-body)] text-base leading-relaxed text-[color:var(--muted)] md:text-lg">
              {heroSentence}
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="w-full bg-[color:var(--accent)] px-10 py-5 text-center font-[family-name:var(--font-body)] text-[10px] font-bold uppercase tracking-[0.15em] text-[color:var(--bg)] transition-opacity hover:opacity-90 sm:w-auto"
              >
                Contact me
              </Link>
              <Link
                href="/projects"
                className="w-full border border-[color:var(--line-strong)] bg-[color:var(--surface-strong)] px-10 py-5 text-center font-[family-name:var(--font-body)] text-[10px] font-bold uppercase tracking-[0.15em] text-[color:var(--fg)] transition-colors hover:bg-[color:var(--accent)] hover:text-[color:var(--bg)] sm:w-auto"
              >
                View work
              </Link>
            </div>

            {/* Actions Bar (Socials, WhatsApp, CV) */}
            <div className="mt-16 w-fit border-t border-[color:var(--line)] pt-8">
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
                  href={contactSocial.cvHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-[family-name:var(--font-body)] text-[10px] font-bold uppercase tracking-[0.2em] text-[color:var(--fg)] transition-opacity hover:opacity-60 underline underline-offset-4"
                >
                  Download CV
                </a>
              </div>
            </div>

            {/* Meta Row */}
            <div className="mt-12">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[color:var(--muted-label)]">Focus</p>
                  <p className="mt-2 text-sm font-medium text-[color:var(--fg)]">Software Development</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[color:var(--muted-label)]">Education</p>
                  <p className="mt-2 text-sm font-medium text-[color:var(--fg)]">Masters</p>
                </div>

              </div>
            </div>
          </div>

          {/* Right Column: Portrait with Frame */}
          <div className="lg:col-span-5">
            <div className="border border-[color:var(--line)] bg-[color:var(--surface-strong)] p-3 lg:p-4">
              <div className="overflow-hidden bg-[color:var(--bg-muted)]">
                <AppPhoto
                  src={landingAssets.heroPortrait}
                  alt="Takem Jim portrait"
                  className="aspect-[4/5] w-full"
                  imgClassName="absolute inset-0 h-full w-full object-cover"
                  priority
                  sizes="(min-width: 1024px) 34vw, 100vw"
                />
              </div>
              <div className="mt-4 flex items-center justify-between font-[family-name:var(--font-body)] text-[9px] uppercase tracking-[0.2em] text-[color:var(--muted-label)]">
                <span>{profile.name}</span>
                <span className="text-[color:var(--fg)]">{profile.title}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



