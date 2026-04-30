import Link from "next/link";
import { blogArchiveAssets } from "@/lib/figma-blog-archive-assets";
import { AppPhoto } from "@/components/landing/app-photo";

type BlogFeaturedHeroProps = {
  post: {
    slug: string;
    title: string;
    excerpt?: string;
    image?: string;
  };
};

export function BlogFeaturedHero({ post }: BlogFeaturedHeroProps) {
  return (
    <section className="blog-archive-hero">
      <div className="blog-archive-hero__grid">
        <div className="blog-archive-hero__media">
          <AppPhoto
            src={post.image || blogArchiveAssets.featuredHero}
            alt=""
            className="min-h-[20rem] w-full md:min-h-[28rem]"
            imgClassName="absolute left-0 top-[-30%] h-[160%] w-full max-w-none object-cover"
            sizes="(min-width: 1024px) 58vw, 100vw"
          />
        </div>
        <div className="blog-archive-hero__content">
          <p className="blog-archive-eyebrow">Featured — software engineering notes</p>
          <h1 className="blog-archive-hero__title">{post.title}</h1>
          <p className="blog-archive-hero__lede">{post.excerpt}</p>
          <Link href={`/blog/${post.slug}`} className="blog-archive-textlink">
            <span className="border-b border-current pb-1">Read the post</span>
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
