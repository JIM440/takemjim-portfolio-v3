"use client";

import { useEffect, useState } from "react";

function formatLagos(now: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Africa/Lagos",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZoneName: "short",
  }).format(now);
}

/** Live clock in West Africa Time (Nigeria); matches “Local time” column on project CTA. */
export function ProjectDetailRequestClock() {
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setLabel(formatLagos(new Date()));
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="tabular-nums" suppressHydrationWarning>
      {label ?? "—"}
    </span>
  );
}
