"use client";

import { useEffect, useState } from "react";
import { getPreferredTheme, setTheme, type ThemeOption } from "@/components/theme-provider";

type ThemeToggleProps = {
  className?: string;
};

export function ThemeToggle({ className }: ThemeToggleProps) {
  const [theme, setThemeState] = useState<ThemeOption>("light");

  useEffect(() => {
    setThemeState(getPreferredTheme());
  }, []);

  return (
    <label className={className}>
      <span className="sr-only">Theme</span>
      <select
        aria-label="Theme"
        value={theme}
        onChange={(event) => {
          const nextTheme = event.target.value === "light" ? "light" : "dark";
          setThemeState(nextTheme);
          setTheme(nextTheme);
        }}
        className="min-h-10 rounded-full bg-[color:var(--surface-strong)] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[color:var(--fg)] outline-none"
      >
        <option value="dark">Dark</option>
        <option value="light">Light</option>
      </select>
    </label>
  );
}

