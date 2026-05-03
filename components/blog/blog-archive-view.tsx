"use client";

import { useEffect, useState, useCallback } from "react";
import { BlogArchiveCard } from "./blog-archive-card";
import { BlogArchiveToolbar } from "./blog-archive-toolbar";
import { BlogFeaturedHero } from "./blog-featured-hero";
import { blogArchiveAssets } from "@/lib/figma-blog-archive-assets";

type BlogArchivePost = {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt?: string;
  image?: string;
  date?: string;
  publishedAt?: string;
};

function BlogCardSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <div className="skeleton aspect-[1.5/1] w-full" />
      <div className="space-y-3">
        <div className="skeleton h-3 w-20 rounded" />
        <div className="skeleton h-6 w-full rounded" />
        <div className="skeleton h-4 w-[80%] rounded" />
      </div>
    </div>
  );
}

function FeaturedHeroSkeleton() {
  return (
    <div className="landing-band pb-20 pt-32 lg:pb-32 lg:pt-48 bg-(--bg-muted)">
      <div className="landing-container">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
          <div className="skeleton aspect-[1.4/1] w-full" />
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="skeleton h-4 w-24 rounded" />
              <div className="skeleton h-12 w-full rounded" />
              <div className="skeleton h-12 w-[80%] rounded" />
              <div className="skeleton h-6 w-[90%] rounded" />
            </div>
            <div className="skeleton h-12 w-40 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function BlogArchiveView({ initialCategory }: { initialCategory?: string }) {
  const [posts, setPosts] = useState<BlogArchivePost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [category, setCategory] = useState(initialCategory || "all");

  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch("/api/blogs", { cache: "no-store" });
      if (res.ok) {
        const json = (await res.json()) as { blogs?: BlogArchivePost[] };
        setPosts(json.blogs || []);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const categories = ["all", ...new Set(posts.map((p) => p.category))].sort();
  
  const filteredPosts = 
    category === "all" 
      ? posts 
      : posts.filter(p => p.category.toLowerCase() === category.toLowerCase());

  const featured = filteredPosts[0];
  const grid = filteredPosts.slice(1);

  if (loading) {
    return (
      <>
        <FeaturedHeroSkeleton />
        <div className="landing-container py-20">
          <div className="skeleton h-10 w-full mb-12 rounded" />
          <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <BlogCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <p className="text-(--muted)">Failed to load blog posts.</p>
        <button 
          onClick={fetchBlogs}
          className="mt-4 text-sm font-semibold underline underline-offset-4 hover:text-(--fg)"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <main className="blog-archive-page">
      {featured ? <BlogFeaturedHero post={featured} /> : null}

      <div className="blog-archive-main">
        <BlogArchiveToolbar 
          categories={categories} 
          active={category} 
          onSelect={(c) => setCategory(c)}
        />

        {filteredPosts.length > 0 ? (
          <div className="blog-archive-grid">
            {grid.map((post, i) => (
              <BlogArchiveCard
                key={post.id}
                post={post}
                imageSrc={post.image || blogArchiveAssets.grid[i % blogArchiveAssets.grid.length]}
                showExplore
              />
            ))}
          </div>
        ) : (
          <p className="blog-archive-empty">
            No posts in this category yet.
          </p>
        )}
      </div>
    </main>
  );
}
