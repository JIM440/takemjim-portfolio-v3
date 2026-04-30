"use client";

import { useState, useEffect, useCallback } from "react";

export function useAdminApi<T>(endpoint: string) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/${endpoint}`);
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
      if (res.ok) {
        setData((prev) => prev.filter((item: any) => item.id !== id));
      }
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return { data, loading, error, refresh: fetchAll, remove };
}
