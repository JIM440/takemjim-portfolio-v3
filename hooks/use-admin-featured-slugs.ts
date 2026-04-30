"use client";

import { useCallback, useEffect, useState } from "react";
import { ADMIN_FEATURED_PROJECTS_KEY } from "@/lib/admin-featured-projects";
import { defaultFeaturedProjectSlugs, MAX_FEATURED_PROJECTS } from "@/lib/featured-projects";
import { projects } from "@/lib/site-data";

function padFeaturedSlots(input: string[]): string[] {
  const out = input.slice(0, MAX_FEATURED_PROJECTS).map((s) => (typeof s === "string" ? s : ""));
  while (out.length < MAX_FEATURED_PROJECTS) out.push("");
  return out;
}

export function useAdminFeaturedSlugs() {
  const [slugs, setSlugs] = useState<string[]>(() => padFeaturedSlots(defaultFeaturedProjectSlugs(projects)));
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(ADMIN_FEATURED_PROJECTS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as unknown;
        if (Array.isArray(parsed) && parsed.every((s) => typeof s === "string")) {
          setSlugs(padFeaturedSlots(parsed));
          setReady(true);
          return;
        }
      }
    } catch {
      /* fall through */
    }
    setSlugs(padFeaturedSlots(defaultFeaturedProjectSlugs(projects)));
    setReady(true);
  }, []);

  const save = useCallback((next: string[]) => {
    const padded = padFeaturedSlots(next);
    localStorage.setItem(ADMIN_FEATURED_PROJECTS_KEY, JSON.stringify(padded));
    setSlugs(padded);
  }, []);

  return { slugs, save, ready };
}
