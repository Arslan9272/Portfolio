"use client";

import { motion, useScroll } from "framer-motion";

/**
 * Thin accent line along the very top of the viewport that fills as the
 * page scrolls. Transform-only, driven straight from the scroll position.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      aria-hidden
      style={{ scaleX: scrollYProgress }}
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-[image:var(--accent-fill)]"
    />
  );
}
