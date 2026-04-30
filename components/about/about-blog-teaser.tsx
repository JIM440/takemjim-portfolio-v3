import Link from "next/link";
import { BlogArchiveCard } from "@/components/blog/blog-archive-card";
import { blogArchiveAssets } from "@/lib/figma-blog-archive-assets";
import { blogStore } from "@/lib/data-store";

export function AboutBlogTeaser() {
  const posts = blogStore.list().slice(0, 3);

  if (posts.length === 0) return null;

  return (
    <section className="landing-container py-24 md:py-32 landing-animate-fade-up">
      <div className="landing-animate-fade">
        <p className="landing-eyebrow">Writing</p>
        <h2 className="landing-display-md mt-4 max-w-2xl text-(--fg-soft)">Latest articles</h2>
        <p className="landing-body-sm mt-6 max-w-md">
          Short articles on engineering practice, shipping across web and mobile, and studying while building.
        </p>
      </div>

      <div className="blog-archive-grid mt-12">
        {posts.map((post, i) => (
          <BlogArchiveCard 
            key={post.id} 
            post={post} 
            imageSrc={post.image || blogArchiveAssets.grid[i % blogArchiveAssets.grid.length]} 
            showExplore 
          />
        ))}
      </div>

      <div className="mt-14 flex justify-center sm:justify-end">
        <Link
          href="/blog"
          className="blog-archive-explore"
        >
          <span>View all posts</span>
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
      </div>
    </section>
  );
}
