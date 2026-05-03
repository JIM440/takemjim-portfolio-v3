"use client";

import { useEffect, useState, useCallback } from "react";
import { BlogDetailView } from "./blog-detail-view";

type BlogDetailPost = React.ComponentProps<typeof BlogDetailView>["post"];

function BlogDetailSkeleton() {
  return (
    <article className="blog-detail-page">
      <div className="landing-band pb-20 pt-32 lg:pb-32 lg:pt-48 bg-(--bg-muted)">
        <div className="landing-container">
          <div className="max-w-3xl">
            <div className="skeleton h-4 w-24 rounded mb-8" />
            <div className="skeleton h-16 w-full rounded mb-4" />
            <div className="skeleton h-16 w-[80%] rounded mb-12" />
            <div className="flex gap-4">
              <div className="skeleton size-10 rounded-full" />
              <div className="space-y-2">
                <div className="skeleton h-3 w-32 rounded" />
                <div className="skeleton h-3 w-20 rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="landing-container py-20">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="skeleton h-4 w-full rounded" />
          <div className="skeleton h-4 w-full rounded" />
          <div className="skeleton h-4 w-[90%] rounded" />
          <div className="skeleton aspect-video w-full rounded mt-12 mb-12" />
          <div className="skeleton h-4 w-full rounded" />
          <div className="skeleton h-4 w-[95%] rounded" />
          <div className="skeleton h-4 w-[85%] rounded" />
        </div>
      </div>
    </article>
  );
}

export default function BlogDetailContainer({ slug }: { slug: string }) {
  const [post, setPost] = useState<BlogDetailPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchPost = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch(`/api/blogs/slug/${slug}`, { cache: "no-store" });
      if (res.ok) {
        const json = (await res.json()) as { blog?: BlogDetailPost };
        setPost(json.blog ?? null);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  if (loading) return <BlogDetailSkeleton />;

  if (error || !post) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <p className="text-(--muted)">Failed to load article.</p>
        <button 
          onClick={fetchPost}
          className="mt-4 text-sm font-semibold underline underline-offset-4 hover:text-(--fg)"
        >
          Try again
        </button>
      </div>
    );
  }

  return <BlogDetailView post={post} />;
}
