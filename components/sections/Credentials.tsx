"use client";

import { motion } from "framer-motion";
import { site, type Credential } from "@/content/site";
import { MetaRail } from "@/components/fx/MetaRail";
import { SectionHeader } from "./SectionHeader";

const credentials: Credential[] = site.credentials;

const EASE = [0.22, 1, 0.36, 1] as const;

const list = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const card = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

function KindTag({ kind }: { kind: Credential["kind"] }) {
  return (
    <span className="inline-flex items-center rounded-full border border-[var(--glass-border)] bg-[var(--glass-fill)] px-3 py-1 font-mono text-[0.625rem] uppercase tracking-[0.2em] text-[var(--fg-faint)]">
      {kind}
    </span>
  );
}

function MetaChips({ meta }: { meta?: string[] }) {
  if (!meta?.length) return null;
  return (
    <ul className="mt-5 flex flex-wrap gap-2">
      {meta.map((item) => (
        <li key={item}>
          <span className="inline-flex items-center rounded-full border border-[var(--glass-border)] bg-[var(--glass-fill)] px-3 py-1 text-xs text-[var(--fg-muted)]">
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

/**
 * Education & achievements — the degree as a wide feature card with the years
 * set large on the left, then the competition placing and certifications as an
 * even grid beside it. Each entry carries a paragraph of context so the
 * section reads as substance rather than a list of titles.
 */
export function Credentials({ index = "04" }: { index?: string }) {
  const degrees = credentials.filter((entry) => entry.kind === "Degree");
  const rest = credentials.filter((entry) => entry.kind !== "Degree");

  return (
    <section id="education" aria-labelledby="education-heading">
      <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
        <MetaRail index={index} label="Education" />
        <SectionHeader
          id="education-heading"
          index={index}
          label="Education & achievements"
        />

        <motion.div
          variants={list}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col gap-5 md:gap-6"
        >
          {degrees.map((entry) => (
            <motion.article
              key={entry.title}
              variants={card}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 26 }}
              className="glass-card grid gap-6 p-6 transition-[border-color,background-color,box-shadow] duration-300 hover:border-[var(--border-strong)] hover:bg-[var(--glass-fill-hover)] hover:shadow-[inset_0_1px_0_var(--inset-highlight-strong),var(--card-shadow-hover),0_0_32px_var(--glow)] md:p-8 lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] lg:gap-12"
            >
              <div className="lg:border-r lg:border-[var(--glass-border)] lg:pr-10">
                <KindTag kind={entry.kind} />
                <p className="chrome-text mt-5 font-display text-[clamp(2rem,5vw,3rem)] font-extrabold leading-none tracking-tight">
                  {entry.period}
                </p>
                <p className="mt-4 text-sm text-[var(--fg-muted)]">
                  {entry.org}
                </p>
              </div>

              <div>
                <h3 className="font-display text-xl font-semibold tracking-tight text-[var(--fg)] md:text-2xl">
                  {entry.title}
                </h3>
                <p className="mt-4 text-sm leading-[1.85] text-[var(--fg-muted)] md:text-[0.9375rem]">
                  {entry.body}
                </p>
                <MetaChips meta={entry.meta} />
              </div>
            </motion.article>
          ))}

          <div className="grid gap-5 md:gap-6 lg:grid-cols-3">
            {rest.map((entry) => (
              <motion.article
                key={entry.title}
                variants={card}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 320, damping: 24 }}
                className="glass-card flex flex-col p-6 transition-[border-color,background-color,box-shadow] duration-300 hover:border-[var(--border-strong)] hover:bg-[var(--glass-fill-hover)] hover:shadow-[inset_0_1px_0_var(--inset-highlight-strong),var(--card-shadow-hover),0_0_32px_var(--glow)] md:p-7"
              >
                <div className="flex items-center justify-between gap-3">
                  <KindTag kind={entry.kind} />
                  <span className="font-mono text-[0.6875rem] tracking-[0.16em] text-[var(--fg-faint)]">
                    {entry.period}
                  </span>
                </div>

                <div
                  aria-hidden
                  className="mt-5 h-px bg-gradient-to-r from-[var(--glass-border)] to-transparent"
                />

                <h3 className="mt-5 font-display text-lg font-semibold leading-snug tracking-tight text-[var(--fg)]">
                  {entry.title}
                </h3>
                <p className="mt-1.5 text-xs uppercase tracking-[0.18em] text-[var(--fg-faint)]">
                  {entry.org}
                </p>
                <p className="mt-4 flex-1 text-sm leading-[1.8] text-[var(--fg-muted)]">
                  {entry.body}
                </p>
                <MetaChips meta={entry.meta} />
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
