import Link from "next/link";
import { CoverBlock } from "@/components/cover-block";
import type { BlogPost } from "@/lib/site-data";

type BlogCardProps = {
  post: BlogPost;
  variant?: "grid" | "row";
};

export function BlogCard({
  post,
  variant = "grid",
}: BlogCardProps) {
  if (variant === "row") {
    return (
      <article className="blog-row animate-enter">
        <div className="blog-row__meta">
          <span>{post.date}</span>
          <span>{post.readTime}</span>
          <span>{post.category}</span>
        </div>
        <div className="blog-row__body">
          <CoverBlock label={post.coverLabel} size="compact" />
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </div>
        <Link href={`/blog/${post.slug}`} className="button">
          Read post
        </Link>
      </article>
    );
  }

  return (
    <article className="story-card animate-enter">
      <CoverBlock label={post.coverLabel} />
      <p className="meta-line">
        <span>{post.category}</span>
        <span>{post.readTime}</span>
      </p>
      <h3>{post.title}</h3>
      <p>{post.excerpt}</p>
      <Link href={`/blog/${post.slug}`} className="text-link">
        Read article
      </Link>
    </article>
  );
}
