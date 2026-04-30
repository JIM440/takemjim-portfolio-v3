import type { Project } from "@/lib/site-data";

/** Admin localStorage slots + default featured picks */
export const MAX_FEATURED_PROJECTS = 6;

/** Home “Selected works” grid */
export const HOME_SELECTED_WORKS_COUNT = 4;

/** Works page grid (same card layout as home) */
export const WORKS_PAGE_GRID_COUNT = 8;

const DEFAULT_HOME_FEATURED_SLUGS = [
  "reepls",
  "pawtaker",
  "internship-management-system",
  "cost-estimate",
] as const;

/** Default slugs for home + projects archive when admin localStorage is empty. */
export function defaultFeaturedProjectSlugs(projectList: Project[]): string[] {
  const bySlug = new Map(projectList.map((p) => [p.slug, p]));
  const curated = DEFAULT_HOME_FEATURED_SLUGS.filter((slug) => bySlug.has(slug));
  const remainder = projectList
    .map((p) => p.slug)
    .filter((slug) => !curated.includes(slug as (typeof DEFAULT_HOME_FEATURED_SLUGS)[number]));
  return [...curated, ...remainder].slice(0, MAX_FEATURED_PROJECTS);
}

/**
 * Puts slugs from admin/home first (in order), then any remaining catalog projects.
 */
export function orderProjectsByFeaturedSlugs(all: Project[], slugs: string[]): Project[] {
  const map = new Map(all.map((p) => [p.slug, p]));
  const seen = new Set<string>();
  const out: Project[] = [];

  for (const slug of slugs) {
    if (!slug) continue;
    const p = map.get(slug);
    if (p && !seen.has(p.slug)) {
      out.push(p);
      seen.add(p.slug);
    }
  }
  for (const p of all) {
    if (!seen.has(p.slug)) out.push(p);
  }
  return out;
}
