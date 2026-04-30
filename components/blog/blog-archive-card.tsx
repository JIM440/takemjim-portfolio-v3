import Link from "next/link";
import { AppPhoto } from "@/components/landing/app-photo";
import { archiveMetaSplit } from "@/lib/blog-display";

type BlogArchiveCardProps = {
  post: {
    slug: string;
    title: string;
    category?: string;
    date?: string;
    publishedAt?: string;
  };
  imageSrc: string;
  showExplore?: boolean;
};

export function BlogArchiveCard({
  post,
  imageSrc,
  showExplore = true,
}: BlogArchiveCardProps) {
  const meta = archiveMetaSplit(post);

  return (
    <article className="blog-archive-card group">
      <div className="blog-archive-card__media">
        <AppPhoto
          src={imageSrc}
          alt=""
          className="relative min-h-[17rem] w-full md:min-h-[22rem]"
          imgClassName="absolute inset-0 h-full w-full object-cover"
          sizes="(min-width: 1024px) 31vw, (min-width: 768px) 45vw, 100vw"
        />
      </div>
      <div className="blog-archive-card__meta flex justify-between gap-4 pt-4">
        <span className="blog-archive-card__label">{meta.left}</span>
        <span className="blog-archive-card__label">{meta.right}</span>
      </div>
      <h2 className="blog-archive-card__title">
        <Link href={`/blog/${post.slug}`}>
          {post.title}
        </Link>
      </h2>

      {showExplore ? (
        <Link
          href={`/blog/${post.slug}`}
          className="blog-archive-explore"
          aria-label={`Read ${post.title}`}
        >
          <span>Read {post.title}</span>
          <svg
            className="blog-archive-explore__arrow"
            width="14"
            height="10"
            viewBox="0 0 14 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 5H13M13 5L9 1M13 5L9 9"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      ) : null}
    </article>
  );
}
