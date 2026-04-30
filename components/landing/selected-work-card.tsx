import Link from "next/link";
import type { Project } from "@/lib/site-data";
import { AppPhoto } from "./app-photo";
import { ProjectSwiper } from "./project-swiper";

type SelectedWorkCardProps = {
  project: Project;
  imageSrc: string;
};

export function SelectedWorkCard({ project, imageSrc }: SelectedWorkCardProps) {
  // If the project has multiple images, use the Swiper; otherwise, use the static single image.
  const hasMultipleImages = project.images && project.images.length > 1;
  const cardImage = project.images?.[0] ?? project.heroImage ?? imageSrc;

  return (
    <article className="group flex h-full flex-col gap-8">
      {hasMultipleImages ? (
        <div className="overflow-hidden bg-[color:var(--bg-muted)]">
          <ProjectSwiper images={project.images!} />
        </div>
      ) : (
        <Link
          href={`/projects/${project.slug}`}
          className="block overflow-hidden bg-[color:var(--bg-muted)]"
          aria-label={`View ${project.title} case study`}
        >
          <div className="relative aspect-[769.67/456.28] w-full transition-transform duration-700 ease-out group-hover:scale-105">
            <AppPhoto
              src={cardImage}
              alt=""
              className="h-full w-full"
              imgClassName="absolute inset-0 h-full w-full object-cover"
              sizes="(min-width: 800px) 45vw, 100vw"
            />
          </div>
        </Link>
      )}

      <div className="flex items-start justify-between gap-4">
        <div>
          <Link href={`/projects/${project.slug}`}>
            <h3 className="landing-project-title group-hover:underline decoration-current underline-offset-4">
              {project.title}
            </h3>
          </Link>
          <p className="landing-project-meta mt-2">
            {project.category.toUpperCase()} • {project.year}
          </p>
        </div>
        <Link
          href={`/projects/${project.slug}`}
          className="shrink-0 p-1 transition-transform duration-300 group-hover:translate-x-1"
          aria-label={`View ${project.title}`}
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-4 text-[color:var(--fg)]"
          >
            <path d="M7 17 17 7" />
            <path d="M8 7h9v9" />
          </svg>
        </Link>
      </div>
    </article>
  );
}
