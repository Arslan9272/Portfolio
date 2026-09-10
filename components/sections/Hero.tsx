"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { site } from "@/content/site";
import { MagneticButton } from "@/components/fx/MagneticButton";

const EASE = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.25 } },
};

const item = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE },
  },
};

/**
 * Full-viewport chrome hero: a neural-network filament field washing in from
 * the right, shimmering chrome name, tagline, and the two primary CTAs —
 * all staggered in on load.
 */
export function Hero() {
  return (
    <section
      id="top"
      aria-label="Intro"
      className="relative flex min-h-screen items-center overflow-hidden py-28 md:py-32"
    >
      {/* Atmosphere: faint top spotlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_55%_at_50%_-12%,var(--hero-spotlight),transparent_70%)]"
      />

      {/* Bloom under the densest part of the network so it reads as lit, not pasted */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-14%] top-1/2 h-[min(70vw,54rem)] w-[min(70vw,54rem)] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,var(--hero-bloom),transparent_66%)]"
      />

      {/* Neural-network filament field, masked so it fades out behind the copy */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-[1]">
        <Image
          src="/hero-network.png"
          alt=""
          fill
          loading="eager"
          fetchPriority="high"
          sizes="100vw"
          className="object-cover opacity-[var(--hero-media-opacity)] [-webkit-mask-image:radial-gradient(ellipse_62%_68%_at_72%_44%,black_6%,transparent_74%)] [filter:var(--hero-media-filter)] [mask-image:radial-gradient(ellipse_62%_68%_at_72%_44%,black_6%,transparent_74%)] md:opacity-[var(--hero-media-opacity-md)]"
        />
      </div>

      {/* Mobile readability scrim under the copy */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[var(--panel-scrim)] to-[var(--bg)] md:hidden"
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto w-full max-w-6xl px-6"
      >
        <motion.h1 variants={item} className="font-display">
          <span className="mb-6 block text-pretty text-xs font-medium uppercase tracking-[0.24em] text-[var(--fg-muted)] sm:text-sm sm:tracking-[0.34em]">
            {site.fullName}
          </span>
          <span className="chrome-text-animated chrome-h1-light block max-w-4xl text-[clamp(2.5rem,7vw,5rem)] font-extrabold uppercase leading-[0.98] tracking-[-0.025em]">
            {site.role}
          </span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-8 max-w-2xl font-display text-xl font-light leading-[1.35] tracking-tight text-[var(--fg)] md:text-[1.75rem]"
        >
          {site.tagline}
        </motion.p>

        <motion.p
          variants={item}
          className="mt-6 max-w-xl text-[0.9375rem] leading-[1.8] text-[var(--fg-muted)] md:text-base"
        >
          {site.intro}
        </motion.p>

        <motion.div
          variants={item}
          className="mt-11 flex flex-wrap items-center gap-4"
        >
          <MagneticButton
            href="#projects"
            className="inline-flex h-12 items-center justify-center rounded-full accent-button px-8 text-sm font-semibold tracking-wide transition-shadow duration-300 hover:shadow-[var(--accent-shadow-hover)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-ring)]"
          >
            View Projects
          </MagneticButton>
          <MagneticButton
            href="#contact"
            className="glass inline-flex h-12 items-center justify-center rounded-full px-8 text-sm font-medium tracking-wide text-[var(--fg)] transition-colors duration-300 hover:border-[var(--border-strong)] hover:bg-[var(--glass-fill-hover)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-ring)]"
          >
            Contact
          </MagneticButton>
        </motion.div>

        {/* Stat strip — the quick-scan facts a recruiter looks for first */}
        <motion.dl
          variants={item}
          className="mt-12 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-6 border-t border-[var(--glass-border)] pt-8 sm:grid-cols-4 md:mt-14"
        >
          {site.stats.map((stat) => (
            <div key={stat.label}>
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="block font-display text-2xl font-semibold tracking-tight text-[var(--fg)] md:text-[1.75rem]">
                  {stat.value}
                </span>
                <span className="mt-1.5 block text-[0.6875rem] uppercase tracking-[0.18em] text-[var(--fg-faint)]">
                  {stat.label}
                </span>
              </dd>
            </div>
          ))}
        </motion.dl>
      </motion.div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        aria-label="Scroll to about section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3 p-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-ring)]"
      >
        <span className="text-[0.625rem] uppercase tracking-[0.3em] text-[var(--fg-faint)]">
          Scroll
        </span>
        <span aria-hidden className="block h-10 w-px overflow-hidden">
          <motion.span
            animate={{ y: ["-100%", "100%"] }}
            transition={{
              duration: 1.8,
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: 0.4,
            }}
            className="block h-full w-full bg-gradient-to-b from-transparent via-[var(--fg-muted)] to-transparent"
          />
        </span>
      </motion.a>
    </section>
  );
}
