import Link from "next/link";
import { CoverBlock } from "@/components/cover-block";
import type { Project } from "@/lib/site-data";

type ProjectCardProps = {
  project: Project;
  variant?: "grid" | "row";
};

export function ProjectCard({
  project,
  variant = "grid",
}: ProjectCardProps) {
  if (variant === "row") {
    return (
      <article className="project-row animate-enter">
        <div className="project-row__meta">
          <span>{project.category}</span>
          <span>{project.year}</span>
          <span>{project.role}</span>
        </div>
        <div className="project-row__body">
          <h2>{project.title}</h2>
          <p>{project.summary}</p>
        </div>
        <Link href={`/projects/${project.slug}`} className="button">
          View details
        </Link>
      </article>
    );
  }

  return (
    <article className="story-card animate-enter">
      <CoverBlock label={project.spotlight} />
      <p className="meta-line">
        <span>{project.category}</span>
        <span>{project.year}</span>
      </p>
      <h3>{project.title}</h3>
      <p>{project.summary}</p>
      <Link href={`/projects/${project.slug}`} className="text-link">
        Read case study
      </Link>
    </article>
  );
}
