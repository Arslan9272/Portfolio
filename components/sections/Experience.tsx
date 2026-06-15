"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { site } from "@/content/site";
import { Reveal } from "@/components/fx/Reveal";
import { SectionHeader } from "./SectionHeader";

/**
 * Experience — vertical timeline. A silver progress line grows with
 * scroll over the muted track; each entry is a glass card anchored by
 * a dot marker.
 */
export function Experience() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 0.75", "end 0.55"],
  });
  const lineScale = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <section id="experience" aria-labelledby="experience-heading">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <SectionHeader id="experience-heading" index="04" label="Experience" />

        <div ref={timelineRef} className="relative max-w-3xl">
          {/* track */}
          <div
            aria-hidden
            className="absolute bottom-2 left-[5px] top-2 w-px bg-[var(--glass-border)]"
          />
          {/* progress line */}
          <motion.div
            aria-hidden
            style={{ scaleY: lineScale }}
            className="absolute bottom-2 left-[5px] top-2 w-px origin-top bg-gradient-to-b from-white/80 via-white/45 to-white/15 shadow-[0_0_12px_var(--glow)]"
          />

          <ol className="space-y-10 md:space-y-12">
            {site.experience.map((entry, index) => (
              <li key={`${entry.org}-${entry.period}`} className="relative pl-10 md:pl-14">
                {/* dot marker */}
                <span
                  aria-hidden
                  className="absolute left-0 top-7 block h-[11px] w-[11px] rounded-full border border-white/55 bg-[var(--bg)] shadow-[0_0_10px_var(--glow)]"
                />

                <Reveal delay={index * 0.05}>
                  <article className="glass p-6 transition-[border-color,background-color] duration-300 hover:border-white/25 hover:bg-[var(--glass-fill-hover)] md:p-7">
                    <p className="font-mono text-xs tracking-[0.2em] text-[var(--fg-faint)]">
                      {entry.period}
                    </p>
                    <h3 className="mt-3 font-display text-lg font-semibold tracking-tight md:text-xl">
                      {entry.role}{" "}
                      <span className="font-normal text-[var(--fg-muted)]">
                        @ {entry.org}
                      </span>
                    </h3>
                    <p className="mt-3 text-sm leading-[1.75] text-[var(--fg-muted)]">
                      {entry.summary}
                    </p>
                    {entry.highlights.length > 0 && (
                      <ul className="mt-5 space-y-2.5 border-t border-[var(--glass-border)] pt-5">
                        {entry.highlights.map((highlight) => (
                          <li
                            key={highlight}
                            className="flex gap-3 text-sm leading-relaxed text-[var(--fg-muted)]"
                          >
                            <span
                              aria-hidden
                              className="mt-[0.65em] h-px w-4 shrink-0 bg-[var(--fg-faint)]"
                            />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    )}
                  </article>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
