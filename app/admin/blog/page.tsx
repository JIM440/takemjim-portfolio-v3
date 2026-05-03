"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Dialog } from "@/components/ui/dialog";
import { useAdminApi } from "@/hooks/use-admin-api";
import { AppPhoto } from "@/components/landing/app-photo";
import type { BlogPost } from "@/lib/data-store";

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function AdminBlogListPage() {
  const searchParams = useSearchParams();
  const refreshKey = searchParams.get("refresh");
  const lastRefreshKey = useRef<string | null>(null);
  const { data: posts, loading, remove, refresh } = useAdminApi<BlogPost>("blogs");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  // Close menu when clicking elsewhere
  useEffect(() => {
    const handleGlobalClick = () => setOpenMenuId(null);
    window.addEventListener("click", handleGlobalClick);
    return () => window.removeEventListener("click", handleGlobalClick);
  }, []);

  useEffect(() => {
    if (!refreshKey || refreshKey === lastRefreshKey.current) {
      return;
    }

    lastRefreshKey.current = refreshKey;
    refresh();
  }, [refresh, refreshKey]);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-sm text-[color:var(--muted)] animate-pulse">Fetching blog posts...</p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <Dialog
        open={Boolean(deleteId)}
        title="Delete blog post?"
        description={deleteError || "This blog will be permanently removed from your site."}
        confirmLabel={isDeleting ? "Deleting..." : "Delete"}
        cancelLabel="Cancel"
        tone="danger"
        pending={isDeleting}
        onCancel={() => {
          if (isDeleting) return;
          setDeleteId(null);
          setDeleteError("");
        }}
        onConfirm={async () => {
          if (!deleteId || isDeleting) return;

          setIsDeleting(true);
          setDeleteError("");
          try {
            await remove(deleteId);
            setDeleteId(null);
          } catch {
            setDeleteError("Failed to delete the blog post. Please try again.");
          } finally {
            setIsDeleting(false);
          }
        }}
      />

      <div className="admin-page-head">
        <div>
          <h1 className="admin-h1">Blogs</h1>
          <p className="admin-lede max-w-2xl">
            Manage your latest thinking and engineering updates in an organized grid.
          </p>
        </div>
        <Link href="/admin/blog/new" className="admin-btn admin-btn--primary w-full sm:w-auto">
          + Create blog
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="admin-panel border-dashed py-12 text-center">
          <p className="text-sm text-[color:var(--muted)]">
            No blog posts yet. Start sharing your expertise by creating your first post.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 lg:gap-6">
          {posts.map((post) => (
            <article
              key={post.id}
              className="admin-panel group flex min-w-0 flex-col overflow-hidden rounded-[1rem] border border-[color:var(--line)] bg-[color:var(--surface-strong)] p-3 shadow-sm sm:rounded-[1.35rem] sm:p-4"
            >
              {/* Media Section */}
              <div className="relative aspect-[1.4/1] w-full overflow-hidden rounded-[1.5rem] bg-[color:var(--bg-muted)] border border-[color:var(--line)] mb-5">
                {post.image ? (
                  <AppPhoto 
                    src={post.image} 
                    alt="" 
                    className="h-full w-full"
                    imgClassName="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-[color:var(--accent-soft)]">
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-[color:var(--muted-label)]">No Cover</span>
                  </div>
                )}
              </div>

              {/* Content Section */}
              <div className="flex flex-1 flex-col px-1 pb-2">
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div className="flex min-w-0 flex-wrap items-center gap-2 sm:gap-3">
                    <span className="inline-flex px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 text-[10px] font-bold uppercase tracking-wider">
                      Published
                    </span>
                    <span className="text-[11px] font-medium text-[color:var(--muted-label)]">
                      {formatDate(post.updatedAt)}
                    </span>
                  </div>
                  
                  <div className="relative shrink-0">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenMenuId(openMenuId === post.id ? null : post.id);
                      }}
                      className="p-1 hover:bg-[color:var(--accent-soft)] rounded-full transition-colors text-[color:var(--muted)]"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
                    </button>
                    {openMenuId === post.id && (
                      <div className="absolute right-0 top-full mt-1 z-20 min-w-[120px] bg-[color:var(--surface-strong)] border border-[color:var(--line)] rounded-xl shadow-xl p-1 animate-in fade-in zoom-in-95 duration-100">
                        <Link 
                          href={`/admin/blog/${encodeURIComponent(post.slug)}/edit`}
                          className="block w-full text-left px-3 py-2 text-xs hover:bg-[color:var(--accent-soft)] rounded-lg transition-colors"
                        >
                          Edit
                        </Link>
                        <button 
                          onClick={() => setDeleteId(post.id)}
                          className="block w-full text-left px-3 py-2 text-xs text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <h2 className="text-xl font-bold leading-tight tracking-tight text-[color:var(--fg)] mb-2 line-clamp-2">
                  {post.title}
                </h2>
                
                <p className="text-[11px] text-[color:var(--muted-label)] font-mono mb-4 truncate">
                  /{post.slug}
                </p>

                <p className="line-clamp-3 text-[13px] leading-relaxed text-[color:var(--muted)] mb-6 flex-1">
                  {post.excerpt}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[color:var(--line)] pt-4">
                  <span className="text-[11px] font-bold text-[color:var(--muted-label)] uppercase tracking-widest">
                    4 min read
                  </span>
                  <Link 
                    href={`/blog/${post.slug}`} 
                    target="_blank"
                    className="text-[11px] font-bold text-[color:var(--fg)] hover:underline underline-offset-4"
                  >
                    View Live
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
