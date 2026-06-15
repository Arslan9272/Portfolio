"use client";

import { motion } from "framer-motion";
import { site } from "@/content/site";
import { SectionHeader } from "./SectionHeader";

const EASE = [0.22, 1, 0.36, 1] as const;

const cardList = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const card = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const chipList = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.045, delayChildren: 0.2 } },
};

const chip = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
} as const;

/**
 * Skills — three frosted-glass group cards, each holding a staggered
 * cloud of glass chips. Cards lift slightly and brighten on hover.
 */
export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-heading">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <SectionHeader id="skills-heading" index="02" label="Skills" />

        <motion.div
          variants={cardList}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-5 md:grid-cols-3 md:gap-6"
        >
          {site.skillGroups.map((group, groupIndex) => (
            <motion.article
              key={group.label}
              variants={card}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 320, damping: 24 }}
              className="glass-card p-6 transition-[border-color,background-color,box-shadow] duration-300 hover:border-white/25 hover:bg-[var(--glass-fill-hover)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_28px_70px_-18px_rgba(0,0,0,0.75),0_0_32px_var(--glow)] md:p-7"
            >
              <header className="flex items-baseline justify-between gap-4">
                <h3 className="font-display text-lg font-semibold tracking-tight">
                  {group.label}
                </h3>
                <span
                  aria-hidden
                  className="font-mono text-[0.6875rem] tracking-[0.2em] text-[var(--fg-faint)]"
                >
                  {String(groupIndex + 1).padStart(2, "0")}
                </span>
              </header>

              <div
                aria-hidden
                className="mt-4 h-px bg-gradient-to-r from-[var(--glass-border)] to-transparent"
              />

              <motion.ul
                variants={chipList}
                className="mt-5 flex flex-wrap gap-2"
              >
                {group.skills.map((skill) => (
                  <motion.li key={skill} variants={chip}>
                    <span className="inline-flex items-center rounded-full border border-[var(--glass-border)] bg-[var(--glass-fill)] px-3.5 py-1.5 text-[0.8125rem] text-[var(--fg-muted)] transition-colors duration-300 hover:border-white/35 hover:text-[var(--fg)]">
                      {skill}
                    </span>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
