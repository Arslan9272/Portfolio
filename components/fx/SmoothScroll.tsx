"use client";

import { useEffect } from "react";
import { MotionConfig } from "framer-motion";
import Lenis from "lenis";

/**
 * Initializes Lenis smooth scrolling for the whole page.
 * - Drives Lenis with an explicit rAF loop, destroyed on unmount.
 * - `anchors: true` makes Lenis intercept in-page #links and smooth-scroll
 *   to them via lenis.scrollTo (CSS scroll-behavior was intentionally
 *   removed from globals.css, Lenis owns smooth scrolling).
 * - Skipped entirely under prefers-reduced-motion: native scrolling stays.
 * - Also hosts the app-wide <MotionConfig reducedMotion="user">, which makes
 *   every framer-motion component drop transform animations (keeping
 *   opacity) for reduced-motion users, hydration-safe, no manual branching.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reducedMotion) return;

    const lenis = new Lenis({
      duration: 1.1,
      autoRaf: false,
      anchors: true,
    });

    let rafId = 0;
    const tick = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
