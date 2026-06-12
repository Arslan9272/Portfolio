"use client";

import { motion } from "framer-motion";
import { site } from "@/content/site";
import { ChromeBlob } from "@/components/fx/ChromeBlob";
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
 * Full-viewport chrome hero: liquid-metal blob on the right (dimmed and
 * tucked behind the copy on mobile), shimmering chrome name, tagline,
 * and the two primary CTAs — all staggered in on load.
 */
export function Hero() {
  return (
    <section
      id="top"
      aria-label="Intro"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      {/* Atmosphere: faint top spotlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_55%_at_50%_-12%,rgba(220,225,235,0.09),transparent_70%)]"
      />

      {/* Chrome blob — right side on md+, dimmed backdrop on mobile */}
      <ChromeBlob className="pointer-events-none absolute left-1/2 top-14 h-72 w-72 -translate-x-1/2 opacity-40 md:left-auto md:right-[-6%] md:top-1/2 md:h-[min(46vw,38rem)] md:w-[min(46vw,38rem)] md:translate-x-0 md:-translate-y-1/2 md:opacity-100 lg:right-[-2%] xl:right-[2%]" />

      {/* Mobile readability scrim under the copy */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(5,5,6,0.5)] to-[var(--bg)] md:hidden"
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto w-full max-w-6xl px-6"
      >
        <motion.p variants={item} className="eyebrow mb-6">
          {site.eyebrow}
        </motion.p>

        <motion.h1
          variants={item}
          className="chrome-text-animated font-display text-[clamp(3.75rem,14vw,8rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.03em]"
        >
          {site.name}
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-7 max-w-xl text-lg leading-relaxed text-[var(--fg-muted)] md:text-xl"
        >
          {site.tagline}
        </motion.p>

        <motion.div
          variants={item}
          className="mt-11 flex flex-wrap items-center gap-4"
        >
          <MagneticButton
            href="#projects"
            className="inline-flex h-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,#f8f9fb_0%,#d6d9df_45%,#a6aab4_100%)] px-8 text-sm font-semibold tracking-wide text-[#08080a] shadow-[0_8px_32px_rgba(220,225,235,0.16)] transition-shadow duration-300 hover:shadow-[0_10px_48px_rgba(220,225,235,0.3)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/80"
          >
            View Projects
          </MagneticButton>
          <MagneticButton
            href="#contact"
            className="glass inline-flex h-12 items-center justify-center rounded-full px-8 text-sm font-medium tracking-wide text-[var(--fg)] transition-colors duration-300 hover:border-white/30 hover:bg-[var(--glass-fill-hover)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/70"
          >
            Contact
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        aria-label="Scroll to about section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3 p-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/70"
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
