import Link from "next/link";
import type { CSSProperties } from "react";
import {
  defaultFeaturedProjectSlugs,
  HOME_SELECTED_WORKS_COUNT,
  orderProjectsByFeaturedSlugs,
} from "@/lib/featured-projects";
import { PROJECT_CARD_CYCLE_IMAGES } from "@/lib/landing-project-card-images";
import { projects } from "@/lib/site-data";
import { SelectedWorkCard } from "@/components/landing/selected-work-card";

export function SelectedWorks() {
  const displayProjects = orderProjectsByFeaturedSlugs(
    projects,
    defaultFeaturedProjectSlugs(projects),
  ).slice(0, HOME_SELECTED_WORKS_COUNT);

  return (
    <section className="landing-container landing-stack-xl py-24 md:py-32 landing-animate-fade-up">
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end landing-animate-fade">
        <h2 className="landing-display-lg">
          <span className="text-[color:var(--fg)]">Selected </span>
          <span className="italic">Works</span>
        </h2>
        <Link
          href="/projects"
          className="border-b border-solid border-black pb-1 font-[family-name:var(--font-body)] text-[10px] uppercase tracking-[0.1em] text-[color:var(--fg)]"
        >
          View all projects
        </Link>
      </div>

      <div className="grid gap-16 min-[800px]:grid-cols-2 min-[800px]:gap-x-16 min-[800px]:gap-y-18 landing-stagger">
        {displayProjects.map((project, index) => (
          <div
            key={project.slug}
            className="landing-animate-fade-up h-full"
            style={{ "--stagger-i": index } as CSSProperties}
          >
            <SelectedWorkCard
              project={project}
              imageSrc={PROJECT_CARD_CYCLE_IMAGES[index % PROJECT_CARD_CYCLE_IMAGES.length]!}
            />
          </div>
        ))}
      </div>
    </section>
  );
}