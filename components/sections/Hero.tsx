"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { site } from "@/content/site";
import { useIntroDone } from "@/components/fx/Intro";
import { IndexChip } from "@/components/fx/IndexChip";
import {
  ArrowUpRightIcon,
  CheckCircleIcon,
  CpuIcon,
} from "@/components/fx/Icons";

const EASE = [0.22, 1, 0.36, 1] as const;

const FOCUS =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-ring)]";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE },
  },
};

// The headline is the page's largest paint, so it is visible from the
// first frame and only slides into place; fading it in from zero would hold
// LCP until the JavaScript arrives.
const headline = {
  hidden: { y: 24 },
  visible: { y: 0, transition: { duration: 0.8, ease: EASE } },
};

// The headline is set in two tones: the lead in ink, the payoff in the
// accent gradient. Derive the lead from the full tagline so metadata keeps
// using one string.
const taglineLead = site.tagline.endsWith(site.taglineEmphasis)
  ? site.tagline.slice(0, -site.taglineEmphasis.length).trim()
  : site.tagline;

/**
 * Ambient dots for the hero background. Positions come from a tiny seeded
 * generator so the server and client render the same field, and each dot
 * gets its own drift so the motion never reads as a grid.
 */
const DOTS = (() => {
  let seed = 7;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  return Array.from({ length: 24 }, () => ({
    left: `${(rand() * 100).toFixed(2)}%`,
    top: `${(rand() * 100).toFixed(2)}%`,
    size: `${(2 + rand() * 3).toFixed(2)}px`,
    driftX: `${(rand() * 16 - 8).toFixed(1)}px`,
    driftY: `${(-10 - rand() * 20).toFixed(1)}px`,
    duration: `${(8 + rand() * 8).toFixed(1)}s`,
    delay: `${(-rand() * 10).toFixed(1)}s`,
  }));
})();

/**
 * Landing hero in two columns: the pitch on the left (role chip, two-tone
 * headline, intro, CTAs, proof points), the portrait card on the right in
 * an arched frame with an availability badge and a name plate. Soft blobs,
 * a neural filament field behind the portrait and a slow drift of dots give
 * the ground some light.
 */
export function Hero() {
  // Entrance animations wait for the intro curtain to lift
  const revealed = useIntroDone();
  return (
    <section
      id="top"
      aria-label="Intro"
      className="relative flex min-h-[90vh] items-center overflow-hidden pb-16 pt-28 md:pt-36"
    >
      {/* Ambient light */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute left-1/4 top-10 h-[500px] w-[500px] rounded-full bg-[var(--blob-peach)] blur-[130px]" />
        <div className="absolute bottom-10 right-10 h-[450px] w-[450px] rounded-full bg-[var(--blob-rose)] blur-[120px]" />
        <div className="absolute -left-20 bottom-0 h-[380px] w-[380px] rounded-full bg-[var(--blob-cream)] blur-[110px]" />
        {/* Neural filament field, fading out before it reaches the copy */}
        <div className="hero-network absolute inset-0" />
        {DOTS.map((dot, index) => (
          <span
            key={index}
            className="drift absolute rounded-full bg-[var(--dot)]"
            style={
              {
                left: dot.left,
                top: dot.top,
                width: dot.size,
                height: dot.size,
                "--drift-x": dot.driftX,
                "--drift-y": dot.driftY,
                "--drift-duration": dot.duration,
                "--drift-delay": dot.delay,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Pitch */}
          <motion.div
            variants={container}
            initial="hidden"
            animate={revealed ? "visible" : "hidden"}
            className="mx-auto flex max-w-2xl flex-col items-start lg:col-span-7 lg:mx-0"
          >
            <motion.div variants={item}>
              <IndexChip index="01" label={site.role} className="mb-6 shadow-xs" />
            </motion.div>

            <motion.h1
              variants={headline}
              className="font-display text-3xl font-extrabold leading-[1.15] tracking-tight text-[var(--fg)] sm:text-4xl md:text-5xl lg:text-6xl"
            >
              {taglineLead} <span className="accent-text">{site.taglineEmphasis}</span>
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-6 max-w-xl text-base leading-relaxed text-[var(--fg-muted)] sm:text-lg"
            >
              {site.intro}
            </motion.p>

            <motion.div
              variants={item}
              className="mt-8 flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row"
            >
              <a
                href="#projects"
                className={`accent-button inline-flex w-full items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-bold tracking-wide transition-[transform,box-shadow] duration-300 hover:scale-[1.02] hover:shadow-[var(--accent-shadow-hover)] sm:w-auto ${FOCUS}`}
              >
                View projects
                <ArrowUpRightIcon className="h-4 w-4" />
              </a>
              <a
                href="#contact"
                className={`accent-button inline-flex w-full items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-bold tracking-wide transition-[transform,box-shadow] duration-300 hover:scale-[1.02] hover:shadow-[var(--accent-shadow-hover)] sm:w-auto ${FOCUS}`}
              >
                Contact
                <ArrowUpRightIcon className="h-4 w-4" />
              </a>
            </motion.div>

            {/* Proof points, the quick-scan facts a recruiter looks for first */}
            <motion.ul
              variants={item}
              className="mt-10 flex w-full flex-wrap items-center gap-x-6 gap-y-3 border-t border-[var(--glass-border)] pt-6 text-xs font-medium text-[var(--fg-muted)]"
            >
              {site.heroProofs.map((proof) => (
                <li key={proof} className="flex items-center gap-1.5">
                  <CheckCircleIcon className="h-4 w-4 text-[var(--accent)]" />
                  <span>{proof}</span>
                </li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Portrait */}
          <motion.div
            // Visible from the first paint; it only settles into place
            initial={{ y: 28, scale: 0.97 }}
            animate={revealed ? { y: 0, scale: 1 } : { y: 28, scale: 0.97 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
            className="flex items-center justify-center lg:col-span-5"
          >
            <div className="group relative mx-auto w-full max-w-[340px] sm:max-w-[400px]">
              {/* Glow behind the frame */}
              <div
                aria-hidden
                className="absolute -inset-4 rounded-[3rem] bg-gradient-to-tr from-[var(--accent-glow)] via-[var(--accent-light)] to-[var(--accent-soft)] opacity-70 blur-2xl transition-opacity duration-700 group-hover:opacity-90"
              />

              {/* Availability badge */}
              <div className="absolute -right-2 -top-3 z-30 flex items-center gap-2 rounded-full border border-[var(--glass-border)] bg-[var(--bg-elevated)] px-3.5 py-1.5 shadow-md sm:-right-3 sm:-top-4">
                <span
                  aria-hidden
                  className="h-2 w-2 animate-pulse rounded-full bg-[var(--accent)]"
                />
                <span className="text-[11px] font-bold tracking-wide text-[var(--accent-deep)]">
                  {site.availabilityBadge}
                </span>
              </div>

              {/* Arched frame */}
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2.5rem] rounded-t-[11rem] border border-[var(--glass-border)] bg-gradient-to-b from-[var(--bg-elevated)] via-[var(--bg-wash)] to-[var(--accent-light)] p-3 shadow-xl shadow-[var(--glow)]">
                <div className="relative flex h-full w-full items-end justify-center overflow-hidden rounded-[2rem] rounded-t-[10rem] border border-[var(--glass-border)] bg-gradient-to-b from-[var(--bg)] via-[var(--bg-wash)] to-[var(--accent-light)]">
                  <div
                    aria-hidden
                    className="absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--accent-glow)] opacity-60 blur-3xl"
                  />
                  {/* Background-free cutout, so the lavender frame shows through */}
                  <Image
                    src="/arslan-portrait.webp"
                    alt={`Portrait of ${site.fullName}`}
                    fill
                    preload
                    unoptimized
                    data-hero-portrait
                    sizes="(min-width: 640px) 400px, 340px"
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Scrim so the plate reads over the photo */}
                  <div
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 z-10 h-28 bg-gradient-to-t from-[var(--panel-scrim)] via-[var(--panel-scrim-soft)] to-transparent"
                  />
                  {/* Name plate */}
                  <div className="absolute inset-x-3 bottom-3 z-20 flex items-center justify-between rounded-2xl border border-[var(--glass-border)] bg-[var(--nav-scrim-solid)] p-3.5 shadow-lg backdrop-blur-xl">
                    <div className="min-w-0">
                      <p className="font-signature text-2xl tracking-wide text-[var(--fg)]">
                        {site.name}
                      </p>
                      <p className="mt-0.5 flex items-center gap-1.5 text-[11px] font-semibold text-[var(--fg-muted)]">
                        <span
                          aria-hidden
                          className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-[var(--accent)]"
                        />
                        <span className="truncate">{site.role}</span>
                      </p>
                    </div>
                    <div
                      aria-hidden
                      className="accent-button ml-2 flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                    >
                      <CpuIcon className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
