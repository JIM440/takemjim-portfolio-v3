"use client";

import { useEffect } from "react";

const STORAGE_KEY = "portfolio-theme";

export type ThemeOption = "dark" | "light";

export function getPreferredTheme(): ThemeOption {
  if (typeof window === "undefined") {
    return "dark";
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === "light" ? "light" : "dark";
}

export function ThemeProvider() {
  useEffect(() => {
    const nextTheme = getPreferredTheme();
    document.documentElement.dataset.theme = nextTheme;
    document.documentElement.style.colorScheme = nextTheme;
  }, []);

  return null;
}

export function setTheme(theme: ThemeOption) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, theme);
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
}
