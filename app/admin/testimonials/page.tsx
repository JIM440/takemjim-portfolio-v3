"use client";

import { useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import { useAdminApi } from "@/hooks/use-admin-api";
import type { Testimonial } from "@/lib/data-store";

export default function AdminTestimonialsPage() {
  const { data: items, loading, remove, refresh } = useAdminApi<Testimonial>("testimonials");
  const [content, setContent] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [toDelete, setToDelete] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  async function handleSave() {
    if (!content.trim() || !name.trim() || !role.trim()) {
      return;
    }
    setIsSaving(true);
    try {
      const res = await fetch("/api/admin/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, name, role, company }),
      });
      if (res.ok) {
        setContent("");
        setName("");
        setRole("");
        setCompany("");
        refresh();
      }
    } catch (err) {
      console.error("Save failed", err);
    } finally {
      setIsSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-sm text-[color:var(--muted)] animate-pulse">Fetching testimonials...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Dialog
        open={Boolean(toDelete)}
        title="Delete testimonial?"
        description="This testimonial will be removed from the site."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        tone="danger"
        onCancel={() => setToDelete(null)}
        onConfirm={() => {
          if (toDelete) {
            remove(toDelete);
          }
          setToDelete(null);
        }}
      />

      <div>
        <h1 className="admin-h1">Testimonials</h1>
        <p className="admin-lede max-w-2xl">
          Add and manage testimonials in a card-based layout that matches the feel of the portfolio.
        </p>
      </div>

      <div className="grid gap-8 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <section className="admin-panel">
          <h2 className="admin-h2">Add testimonial</h2>
          <div className="mt-6 grid gap-4">
            <label className="admin-field">
              <span className="admin-field__label">Content / Quote</span>
              <textarea
                className="admin-field__input min-h-32"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What did they say?"
              />
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="admin-field">
                <span className="admin-field__label">Name</span>
                <input
                  className="admin-field__input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                />
              </label>
              <label className="admin-field">
                <span className="admin-field__label">Role</span>
                <input
                  className="admin-field__input"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="CTO"
                />
              </label>
            </div>
            <label className="admin-field">
              <span className="admin-field__label">Company (Optional)</span>
              <input
                className="admin-field__input"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="TechCorp"
              />
            </label>
            <button
              type="button"
              className="admin-btn admin-btn--primary w-full disabled:opacity-50 sm:w-fit"
              disabled={isSaving}
              onClick={handleSave}
            >
              {isSaving ? "Saving..." : "Save testimonial"}
            </button>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          {items.map((item) => (
            <article key={item.id} className="admin-panel flex flex-col justify-between gap-5">
              <p className="text-sm italic leading-relaxed text-[color:var(--muted)]">
                &ldquo;{item.content}&rdquo;
              </p>
              <div className="space-y-1">
                <p className="text-base font-semibold text-[color:var(--fg-soft)]">{item.name}</p>
                <p className="text-sm text-[color:var(--muted)]">
                  {item.role} {item.company ? `at ${item.company}` : ""}
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[color:var(--line)] px-4 py-3 sm:rounded-full">
                <span className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[color:var(--muted-label)]">
                  Actions
                </span>
                <button
                  type="button"
                  className="admin-btn-text admin-btn-text--danger"
                  onClick={() => setToDelete(item.id)}
                >
                  Delete
                </button>
              </div>
            </article>
          ))}
          {items.length === 0 && (
            <div className="col-span-full py-12 text-center border border-dashed border-[color:var(--line)] rounded-3xl">
               <p className="text-sm text-[color:var(--muted)]">No testimonials yet.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
