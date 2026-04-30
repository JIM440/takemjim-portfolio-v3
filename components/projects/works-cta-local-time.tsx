"use client";

import { useEffect, useState } from "react";

/** Live clock in West Africa Time (Nigeria). */
export function WorksCtaLocalTime() {
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    const fmt = () =>
      new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "Africa/Lagos",
      }).format(new Date());

    const tick = () => setLabel(fmt());
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  if (!label) {
    return <span className="text-white/50">—</span>;
  }

  return <span>{label} WAT</span>;
}
