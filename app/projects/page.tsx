import type { Metadata } from "next";
import { Suspense } from "react";
import { ProjectsArchiveBody } from "@/components/projects/projects-archive-body";
import { WorksProjectCta } from "@/components/projects/works-project-cta";

export const metadata: Metadata = {
  title: "Solutions I've Crafted",
  description:
    "Portfolio of Takem Jim — software engineer and developer: web platforms, mobile apps, and interface-led product work.",
  alternates: {
    canonical: "/projects",
  },
};

function ProjectsArchiveFallback() {
  return (
    <div className="blog-archive-main">
      <p className="blog-archive-empty">Loading works…</p>
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <main className="blog-archive-page">
      <Suspense fallback={<ProjectsArchiveFallback />}>
        <ProjectsArchiveBody />
      </Suspense>
      <WorksProjectCta />
    </main>
  );
}

