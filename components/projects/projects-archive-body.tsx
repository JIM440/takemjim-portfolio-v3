"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { SelectedWorkCard } from "@/components/landing/selected-work-card";
import { ProjectsArchiveToolbar } from "@/components/projects/projects-archive-toolbar";
import { WorksFeaturedHero } from "@/components/projects/works-featured-hero";
import { orderProjectsByFeaturedSlugs, WORKS_PAGE_GRID_COUNT } from "@/lib/featured-projects";
import { PROJECT_CARD_CYCLE_IMAGES } from "@/lib/landing-project-card-images";
import { useAdminFeaturedSlugs } from "@/hooks/use-admin-featured-slugs";
import { projects } from "@/lib/site-data";

const PROJECT_CATEGORIES = [...new Set(projects.map((p) => p.category))].sort();

/** Cards after the blog-style hero (hero shows item 0). */
const MAX_CARDS_AFTER_HERO = WORKS_PAGE_GRID_COUNT;

export function ProjectsArchiveBody() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category")?.trim();
  const { slugs } = useAdminFeaturedSlugs();

  const ordered = useMemo(() => orderProjectsByFeaturedSlugs(projects, slugs), [slugs]);

  const filtered = useMemo(() => {
    const raw = categoryParam?.toLowerCase();
    if (!raw || raw === "all") return ordered;
    return ordered.filter((p) => p.category.toLowerCase() === raw);
  }, [ordered, categoryParam]);

  const featuredProject = filtered[0] ?? null;
  const gridProjects = filtered.slice(1, 1 + MAX_CARDS_AFTER_HERO);

  return (
    <>
      {featuredProject ? <WorksFeaturedHero project={featuredProject} /> : null}

      <div className="blog-archive-main">
        <div className="mb-12 max-w-3xl space-y-4 border-b border-[color:var(--line)] pb-10">
          <p className="font-[family-name:var(--font-body)] text-[10px] font-semibold uppercase tracking-[0.28em] text-(--muted)">
            Portfolio
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.85rem,4vw,2.85rem)] font-normal leading-tight tracking-tight text-(--fg-soft)">
            Solutions I&apos;ve Crafted
          </h2>
          <p className="font-[family-name:var(--font-body)] text-base leading-relaxed text-(--muted) md:text-[1.05rem]">
            Explore the projects where I&apos;ve transformed ideas into reality, creating impactful solutions tailored to
            meet real-world needs.
          </p>
        </div>

        <ProjectsArchiveToolbar categories={PROJECT_CATEGORIES} active={categoryParam} />

        {featuredProject || gridProjects.length > 0 ? (
          <div className="mt-12 pb-16 md:pb-24">
            <div className="grid gap-16 min-[800px]:grid-cols-2 min-[800px]:gap-x-16 min-[800px]:gap-y-18">
              {gridProjects.map((project, index) => (
                <SelectedWorkCard
                  key={project.slug}
                  project={project}
                  imageSrc={PROJECT_CARD_CYCLE_IMAGES[index % PROJECT_CARD_CYCLE_IMAGES.length]!}
                />
              ))}
            </div>
          </div>
        ) : (
          <p className="blog-archive-empty mt-12">No projects in this category yet.</p>
        )}
      </div>
    </>
  );
}
