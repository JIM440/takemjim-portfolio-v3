"use client";

import { useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import { useAdminApi } from "@/hooks/use-admin-api";
import type { Message } from "@/lib/data-store";

function timeAgo(value: string) {
  const diff = Date.now() - new Date(value).getTime();
  const days = Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
  if (days === 0) return "today";
  if (days === 1) return "1d ago";
  return `${days}d ago`;
}

export function MessagesBoard() {
  const { data: messages, loading, remove } = useAdminApi<Message>("messages");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-sm text-[color:var(--muted)] animate-pulse">Fetching messages...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Dialog
        open={Boolean(deleteId)}
        title="Delete message?"
        description="This message will be removed from the inbox."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        tone="danger"
        onCancel={() => setDeleteId(null)}
        onConfirm={async () => {
          if (!deleteId) return;
          await remove(deleteId);
          setDeleteId(null);
        }}
      />

      <div>
        <h1 className="admin-h1">Messages</h1>
        <p className="admin-lede max-w-2xl">
          Contact form submissions appear here as message cards with quick actions and cleaner visual hierarchy.
        </p>
      </div>

      {messages.length === 0 ? (
        <p className="admin-panel-note rounded-[1.75rem] border border-dashed border-[color:var(--line)] bg-[color:var(--surface-strong)] p-6 text-sm text-[color:var(--muted)]">
          No messages yet.
        </p>
      ) : (
        <div className="grid gap-4 xl:grid-cols-2">
          {messages.map((message) => (
            <article key={message.id} className="admin-panel flex flex-col gap-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <p className="text-base font-semibold text-[color:var(--fg-soft)]">{message.name}</p>
                  <p className="break-all text-sm text-[color:var(--muted)]">{message.email}</p>
                </div>
                <div className="shrink-0 text-left sm:text-right">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[color:var(--muted-label)]" suppressHydrationWarning>
                    {timeAgo(message.createdAt)}
                  </p>
                  <p className="mt-1 text-xs text-[color:var(--muted)]" suppressHydrationWarning>
                    {new Date(message.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[color:var(--muted-label)]">
                  Subject
                </p>
                <p className="mt-2 text-sm text-[color:var(--fg-soft)]">{message.subject}</p>
              </div>

              <p className="break-words text-sm leading-relaxed text-[color:var(--muted)]">{message.body}</p>

              <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[color:var(--line)] px-4 py-3 sm:rounded-full">
                <a href={`mailto:${message.email}`} className="admin-btn-text">
                  Reply
                </a>
                <button type="button" className="admin-btn-text admin-btn-text--danger" onClick={() => setDeleteId(message.id)}>
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
