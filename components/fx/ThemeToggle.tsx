"use client";

import { useCallback, useSyncExternalStore } from "react";
import { motion } from "framer-motion";
import { MoonIcon, SunIcon } from "./Icons";

type Theme = "dark" | "light";

export const THEME_STORAGE_KEY = "portfolio-theme";

/* The <html> attribute is the source of truth, the inline script in
   app/layout.tsx has already set it from localStorage before first paint.
   useSyncExternalStore reads it without an effect, so there is no cascading
   render and no flash of the wrong icon. */

const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot(): Theme {
  return document.documentElement.getAttribute("data-theme") === "light"
    ? "light"
    : "dark";
}

// Dark is the default, so that is what the server renders.
function getServerSnapshot(): Theme {
  return "dark";
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  if (theme === "light") {
    root.setAttribute("data-theme", "light");
  } else {
    root.removeAttribute("data-theme");
  }
  root.style.colorScheme = theme;
  listeners.forEach((listener) => listener());
}

/**
 * Dark/light switch. Dark is the default, the palette lives on bare :root,
 * and light is opt-in via [data-theme="light"].
 */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = useCallback(() => {
    const next: Theme = getSnapshot() === "dark" ? "light" : "dark";
    applyTheme(next);
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Private mode or blocked storage, the choice just won't persist.
    }
  }, []);

  const label =
    theme === "dark" ? "Switch to light theme" : "Switch to dark theme";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className={`glass relative inline-flex h-10 w-10 items-center justify-center rounded-full text-[var(--fg-muted)] transition-colors duration-300 hover:border-[var(--border-strong)] hover:bg-[var(--glass-fill-hover)] hover:text-[var(--fg)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)] ${className}`}
    >
      <motion.span
        key={theme}
        initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
        animate={{ opacity: 1, rotate: 0, scale: 1 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="inline-flex"
      >
        {theme === "dark" ? <MoonIcon /> : <SunIcon />}
      </motion.span>
    </button>
  );
}
