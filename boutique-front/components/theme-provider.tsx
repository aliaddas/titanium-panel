"use client";

import type React from "react";

import { createContext, useContext, useState, useEffect } from "react";

type Theme = "light" | "dark" | "system";

interface ThemeContextProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  attribute?: string;
  defaultTheme?: Theme;
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
}

const ThemeContext = createContext<ThemeContextProps>({
  theme: "system",
  setTheme: () => {},
  attribute: "class",
  defaultTheme: "system",
  enableSystem: true,
  disableTransitionOnChange: false,
});

interface ThemeProviderProps {
  children: React.ReactNode;
  attribute?: string;
  defaultTheme?: Theme;
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
}

export function ThemeProvider({
  children,
  attribute = "class",
  defaultTheme = "system",
  enableSystem = true,
  disableTransitionOnChange = false,
}: ThemeProviderProps) {
  // Initialize to defaultTheme so server and client initial renders match.
  // Read from localStorage only after mount to avoid hydration mismatch
  // when the user previously saved a different theme.
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  // On mount: read persisted theme and apply it. We avoid reading localStorage
  // during server render to keep the server HTML unchanged. Then keep the
  // DOM in sync whenever `theme` changes.
  useEffect(() => {
    if (typeof window === "undefined") return;

    const root = window.document.documentElement;

    function resolveTheme(currentTheme: Theme) {
      if (!currentTheme) return "light";
      if (currentTheme === "system") {
        return window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
      }
      return currentTheme;
    }

    function applyTheme(resolved: string) {
      if (attribute === "class") {
        root.classList.remove("light", "dark");
        root.classList.add(resolved);
      } else {
        root.style.setProperty("color-scheme", resolved);
      }
    }

    // If a theme was previously stored, use that on mount and sync state.
    const stored = (localStorage.getItem("theme") as Theme | null) || null;
    if (stored) {
      const resolved = resolveTheme(stored);
      applyTheme(resolved);
      if (stored !== theme) setTheme(stored);
      // persist the resolved value (keeps storage consistent)
      localStorage.setItem("theme", stored);
      return;
    }

    // No stored theme: apply the current React state (defaultTheme initially).
    const resolved = resolveTheme(theme);
    applyTheme(resolved);
    localStorage.setItem("theme", theme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep DOM and localStorage in sync whenever theme changes after mount.
  useEffect(() => {
    if (typeof window === "undefined") return;

    const root = window.document.documentElement;

    function resolvedTheme(currentTheme: Theme) {
      if (!currentTheme) return "light";
      if (currentTheme === "system") {
        return window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
      }
      return currentTheme;
    }

    const resolved = resolvedTheme(theme);
    if (attribute === "class") {
      root.classList.remove("light", "dark");
      root.classList.add(resolved);
    } else {
      root.style.setProperty("color-scheme", resolved);
    }

    localStorage.setItem("theme", theme);
  }, [theme, attribute]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        attribute,
        defaultTheme,
        enableSystem,
        disableTransitionOnChange,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
