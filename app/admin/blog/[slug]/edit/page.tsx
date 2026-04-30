"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { BlogEditor } from "@/components/admin/blog-editor";
import { useAdminApi } from "@/hooks/use-admin-api";
import type { BlogPost } from "@/lib/data-store";

export default function AdminBlogEditPage() {
  const params = useParams();
  const slug = decodeURIComponent(String(params.slug ?? ""));
  const { data: posts, loading } = useAdminApi<BlogPost>("blogs");
  const post = posts.find((p) => p.slug === slug);

  if (loading) {
    return <p className="text-sm text-neutral-500 animate-pulse">Loading post data…</p>;
  }

  if (!post) {
    return (
      <div>
        <h1 className="admin-h1">Post not found</h1>
        <p className="admin-lede">
          No blog post matches <code>{slug}</code>.
        </p>
        <Link href="/admin/blog" className="admin-btn admin-btn--primary mt-6 inline-flex">
          Back to blog admin
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="admin-h1 text-[color:var(--fg-soft)]">Edit post</h1>
      <p className="admin-lede mb-10">Make changes to your article below.</p>
      <BlogEditor mode="edit" initial={post} />
    </div>
  );
}
