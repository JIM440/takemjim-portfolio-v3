"use client";

import { useCallback, useEffect, useState } from "react";
import type { AdminProjectDraft } from "@/lib/admin-project-draft-types";
import { ADMIN_PROJECT_DRAFTS_KEY } from "@/lib/admin-project-draft-types";

function read(): AdminProjectDraft[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(ADMIN_PROJECT_DRAFTS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function useAdminProjectDrafts() {
  const [drafts, setDrafts] = useState<AdminProjectDraft[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setDrafts(read());
    setReady(true);
  }, []);

  const upsert = useCallback((draft: AdminProjectDraft) => {
    setDrafts((prev) => {
      const idx = prev.findIndex((d) => d.id === draft.id);
      const next =
        idx >= 0
          ? [...prev.slice(0, idx), draft, ...prev.slice(idx + 1)]
          : [draft, ...prev];
      localStorage.setItem(ADMIN_PROJECT_DRAFTS_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const remove = useCallback((id: string) => {
    setDrafts((prev) => {
      const next = prev.filter((d) => d.id !== id);
      localStorage.setItem(ADMIN_PROJECT_DRAFTS_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  return { drafts, ready, upsert, remove };
}
