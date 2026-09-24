"use client";

import { MotionConfig } from "framer-motion";

/**
 * App-wide motion settings. Scrolling itself is native: the page responds
 * to the wheel the instant it moves, and in-page #links glide via
 * `scroll-behavior: smooth` in globals.css.
 *
 * <MotionConfig reducedMotion="user"> makes every framer-motion component
 * drop transform animations (keeping opacity) for reduced-motion users,
 * hydration-safe, no manual branching.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
