"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/fx/Reveal";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Shared section heading: numbered eyebrow ("01 — About") followed by a
 * thin silver rule that draws in from the left as it scrolls into view.
 * `id` is referenced by the parent section's aria-labelledby.
 */
export function SectionHeader({
  id,
  index,
  label,
}: {
  id: string;
  index: string;
  label: string;
}) {
  return (
    <div className="mb-12 md:mb-16">
      <Reveal>
        <h2 id={id} className="eyebrow font-display font-semibold">
          <span aria-hidden className="text-[var(--fg-faint)]">
            {index} —{" "}
          </span>
          {label}
        </h2>
      </Reveal>
      <motion.div
        aria-hidden
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.1, ease: EASE, delay: 0.2 }}
        className="mt-5 h-px origin-left bg-gradient-to-r from-[rgba(255,255,255,0.4)] via-[var(--glass-border)] to-transparent"
      />
    </div>
  );
}
