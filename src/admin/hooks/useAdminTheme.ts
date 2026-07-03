"use client";

import { useCallback, useEffect, useState } from "react";

export type AdminTheme = "light" | "dark";

const STORAGE_KEY = "taklifnoma-admin-theme";

export function useAdminTheme() {
  const [theme, setThemeState] = useState<AdminTheme>("light");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as AdminTheme | null;
    if (stored === "light" || stored === "dark") {
      setThemeState(stored);
    }
  }, []);

  useEffect(() => {
    document.documentElement.dataset.adminTheme = theme;
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const setTheme = useCallback((next: AdminTheme) => setThemeState(next), []);
  const toggleTheme = useCallback(
    () => setThemeState((prev) => (prev === "light" ? "dark" : "light")),
    []
  );

  return { theme, setTheme, toggleTheme };
}
