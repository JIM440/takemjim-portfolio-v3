import Link from "next/link";
import { blogArchiveAssets } from "@/lib/figma-blog-archive-assets";
import { AppPhoto } from "@/components/landing/app-photo";
import type { Project } from "@/lib/site-data";

type WorksFeaturedHeroProps = {
  project: Project;
};

export function WorksFeaturedHero({ project }: WorksFeaturedHeroProps) {
  const coverSrc = project.heroImage ?? project.images?.[0] ?? blogArchiveAssets.featuredHero;

  return (
    <section className="blog-archive-hero">
      <div className="blog-archive-hero__grid">
        <div className="blog-archive-hero__media">
          <AppPhoto
            src={coverSrc}
            alt=""
            className="aspect-[769.67/456.28] w-full"
            imgClassName="absolute inset-0 h-full w-full max-w-none object-cover"
          />
        </div>
        <div className="blog-archive-hero__content">
          <p className="blog-archive-eyebrow">Featured</p>
          <h1 className="blog-archive-hero__title">{project.title}</h1>
          <p className="blog-archive-hero__lede">{project.summary}</p>
          <Link href={`/projects/${project.slug}`} className="blog-archive-textlink">
            <span className="border-b border-current pb-1">View case study</span>
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-3.5"
            >
              <path d="M7 17 17 7" />
              <path d="M8 7h9v9" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
