"use client";

import { useState, useEffect, useCallback } from "react";

export function useAdminApi<T>(endpoint: string) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/${endpoint}`, { cache: "no-store" });
      const json = await res.json();
      if (res.ok) {
        setData(json[endpoint] || []);
      } else {
        setError(json.error || "Failed to fetch");
      }
    } catch (err) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const remove = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/${endpoint}/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const json = await res.json().catch(() => null);
        throw new Error(json?.error || "Delete failed");
      }

      await fetchAll();
    } catch (err) {
      console.error("Delete failed", err);
      setError(err instanceof Error ? err.message : "Delete failed");
      throw err;
    }
  };

  return { data, loading, error, refresh: fetchAll, remove };
}
