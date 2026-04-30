import type { CSSProperties } from "react";
import { aboutPage } from "@/lib/site-data";
import { AppPhoto } from "@/components/landing/app-photo";
import { landingAssets } from "@/lib/figma-landing-assets";

/**
 * Passion section: Headline + Story text on the left, Portrait image on the right.
 */
export function AboutPassionSplit() {
  const { headlineLead, headlineAccent, paragraphs } = aboutPage.passionSection;
  const displayParagraphs = paragraphs.slice(0, 3);

  return (
    <section className="landing-container py-20 md:py-32 landing-animate-fade-up">
      <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16 xl:gap-24">
        {/* Left: Headline & Text Content */}
        <div className="flex flex-col gap-10 lg:col-span-7">
          <h2 className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,5vw,4rem)] font-normal leading-none tracking-tight landing-animate-fade">
            <span className="block text-[color:var(--fg)]">{headlineLead}</span>
            <span className="italic text-[color:var(--fg)]">{headlineAccent}</span>
          </h2>

          <div className="flex flex-col gap-8 landing-stagger">
            {displayParagraphs.map((p, i) => (
              <p
                key={i}
                className="landing-body-lg m-0 text-[color:var(--muted)] leading-relaxed landing-animate-fade-up"
                style={{ "--stagger-i": i } as CSSProperties}
              >
                {p}
              </p>
            ))}
          </div>
        </div>

        {/* Right: Portrait Image */}
        <div className="lg:col-span-5 landing-animate-fade [--anim-delay:0.15s] lg:sticky lg:top-32">
          <div className="border border-[color:var(--line)] bg-[color:var(--surface-strong)] p-3 lg:p-4 shadow-sm">
            <AppPhoto
              src={'/jim/jim2.png'}
              alt="Takem Jim Portrait"
              className="aspect-[4/5] w-full"
              imgClassName="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
