import type { CSSProperties } from "react";
import { AppPhoto } from "@/components/landing/app-photo";
import { serviceOfferings } from "@/lib/site-data";

const competencyImages = [
  "/competencies/web_new.jpg",
  "/competencies/mobile_new.png",
  "/competencies/design_new.png",
] as const;

export function AboutServices() {
  return (
    <section className="landing-band py-16 md:py-20 lg:py-24 about-services">
      <div className="landing-container landing-stack-lg landing-animate-fade-up">
        <div className="landing-stack-sm landing-animate-fade">
          <p className="landing-eyebrow">Core competencies</p>
          <h2 className="landing-display-md max-w-[42rem] text-[color:var(--fg-soft)]">Services I offer</h2>
        </div>

        <div className="grid gap-12 md:grid-cols-2 xl:grid-cols-3 landing-stagger">
          {serviceOfferings.map((item, index) => (
            <article
              key={item.title}
              className="overflow-hidden border border-[color:var(--line)] landing-animate-fade-up"
              style={{ "--stagger-i": index } as CSSProperties}
            >
              <div className="overflow-hidden">
                <AppPhoto
                  src={competencyImages[index % competencyImages.length]!}
                  alt=""
                  className="aspect-[639/377] w-full"
                  imgClassName="absolute inset-0 h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-col px-3 py-4 md:px-3 md:py-5">
                <h3 className="font-[family-name:var(--font-display)] text-[1.95rem] font-normal leading-tight tracking-tight text-[color:var(--fg-soft)] md:text-[2.15rem]">
                  {item.title}
                </h3>
                <p className="font-[family-name:var(--font-body)] text-sm leading-relaxed text-[color:var(--muted)] md:text-[1.02rem]">
                  {item.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
