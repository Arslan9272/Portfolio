"use client";

import { motion } from "framer-motion";

/**
 * Scroll-reveal wrapper used by every section.
 * Fades in and rises 24px once the element enters the viewport.
 * Reduced-motion handling comes from the app-level
 * <MotionConfig reducedMotion="user"> (see SmoothScroll.tsx): framer-motion
 * drops the transform animation but keeps the opacity fade, and the markup
 * stays identical on server and client so hydration never mismatches.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}
