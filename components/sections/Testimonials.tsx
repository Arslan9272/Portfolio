"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site, type Testimonial } from "@/content/site";
import { IndexChip } from "@/components/fx/IndexChip";
import { Reveal } from "@/components/fx/Reveal";
import { SectionGlow } from "@/components/fx/SectionGlow";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  QuoteIcon,
} from "@/components/fx/Icons";

const EASE = [0.22, 1, 0.36, 1] as const;

const FOCUS =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]";

const NAV_BUTTON = `accent-button flex h-12 w-12 items-center justify-center rounded-xl transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[var(--accent-shadow-hover)] active:scale-95 ${FOCUS}`;

const testimonials: Testimonial[] = site.testimonials;

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

/**
 * Feedback carousel. Copy and controls on the left, one quote card at a
 * time on the right with two ghost cards stacked behind it. Entries flagged
 * as placeholders carry a visible "Sample" chip until real quotes replace them.
 */
export function Testimonials({ index = "07" }: { index?: string }) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const total = testimonials.length;
  const entry = testimonials[current];

  const go = (step: 1 | -1) => {
    setDirection(step);
    setCurrent((value) => (value + step + total) % total);
  };

  return (
    <section
      id="feedback"
      aria-labelledby="feedback-heading"
      className="relative overflow-hidden border-y border-[var(--glass-border)]"
    >
      <SectionGlow side="left" />
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <IndexChip index={index} label="Feedback" className="mb-6" />
            </Reveal>
            <Reveal delay={0.05}>
              <h2
                id="feedback-heading"
                className="mb-6 font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-[var(--fg)] md:text-5xl lg:text-6xl"
              >
                Do not take my word for it
                <span className="text-[var(--accent)]">.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mb-10 max-w-md text-base leading-relaxed text-[var(--fg-muted)] md:text-lg">
                What clients, managers and collaborators have said about working
                with me.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  aria-label="Previous testimonial"
                  onClick={() => go(-1)}
                  className={NAV_BUTTON}
                >
                  <ArrowLeftIcon />
                </button>
                <button
                  type="button"
                  aria-label="Next testimonial"
                  onClick={() => go(1)}
                  className={NAV_BUTTON}
                >
                  <ArrowRightIcon />
                </button>
                <span
                  aria-live="polite"
                  className="ml-2 rounded-lg border border-[var(--glass-border)] bg-[var(--accent-soft)] px-3 py-1.5 font-mono text-sm font-bold tracking-wider text-[var(--accent-deep)]"
                >
                  {String(current + 1).padStart(2, "0")} /{" "}
                  {String(total).padStart(2, "0")}
                </span>
              </div>
              <div className="mt-4 flex items-center gap-2">
                {testimonials.map((item, position) => (
                  <button
                    key={item.name + position}
                    type="button"
                    aria-label={`Show testimonial ${position + 1}`}
                    onClick={() => {
                      setDirection(position > current ? 1 : -1);
                      setCurrent(position);
                    }}
                    className={`h-1.5 rounded-full transition-[width,background-color] duration-300 ${FOCUS} ${
                      position === current
                        ? "w-8 bg-[var(--accent-deep)]"
                        : "w-4 bg-[var(--glass-border)] hover:bg-[var(--accent-border)]"
                    }`}
                  />
                ))}
              </div>
            </Reveal>
          </div>

          <div className="relative flex min-h-[360px] items-center justify-center py-6 lg:col-span-7">
            {/* Ghost cards stacked behind */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 top-6 translate-x-3 translate-y-6 scale-[0.94] rounded-2xl border border-[var(--glass-border)] bg-[var(--bg-wash)] opacity-50"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 top-3 translate-x-1.5 translate-y-3 scale-[0.97] rounded-2xl border border-[var(--glass-border)] bg-[var(--bg)] opacity-80"
            />

            <div className="relative z-10 w-full">
              <AnimatePresence mode="wait" initial={false} custom={direction}>
                <motion.blockquote
                  key={current}
                  custom={direction}
                  initial={{ opacity: 0, x: direction * 32 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -24 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="relative overflow-hidden rounded-2xl border border-[var(--glass-border)] bg-[var(--bg-elevated)] p-8 shadow-[var(--card-shadow-hover)] md:p-12"
                >
                  <div className="mb-6 flex items-center justify-between gap-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--glass-border)] bg-[var(--accent-soft)] text-[var(--accent-deep)] shadow-xs">
                      <QuoteIcon className="h-5 w-5" />
                    </span>
                    {entry.placeholder && (
                      <span className="rounded-full border border-[var(--featured-border)] bg-[var(--featured-bg)] px-2.5 py-0.5 text-[10px] font-bold text-[var(--featured-fg)]">
                        Sample, replace with a real quote
                      </span>
                    )}
                  </div>
                  <p className="mb-8 text-lg font-medium leading-relaxed tracking-tight text-[var(--fg)] md:text-xl">
                    &ldquo;{entry.quote}&rdquo;
                  </p>
                  <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-[var(--glass-border)] pt-6">
                    <div className="flex items-center gap-3.5">
                      <span
                        aria-hidden
                        className="accent-button flex h-12 w-12 items-center justify-center rounded-full font-display text-sm font-bold"
                      >
                        {initials(entry.name)}
                      </span>
                      <div>
                        <p className="font-display text-base font-bold tracking-tight text-[var(--fg)]">
                          {entry.name}
                        </p>
                        <p className="text-xs font-medium text-[var(--fg-muted)]">
                          {entry.role}
                        </p>
                      </div>
                    </div>
                    <span className="rounded-full border border-[var(--glass-border)] bg-[var(--accent-soft)] px-3 py-1 text-xs font-semibold text-[var(--accent-deep)]">
                      {entry.tag}
                    </span>
                  </footer>
                </motion.blockquote>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
