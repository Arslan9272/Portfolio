"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/content/site";
import { SectionGlow } from "@/components/fx/SectionGlow";
import { Reveal } from "@/components/fx/Reveal";
import { SectionHeader } from "./SectionHeader";

const EASE = [0.22, 1, 0.36, 1] as const;

const FOCUS =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]";

const groups = site.skillGroups;

const MOBILE_VISIBLE = 4;

/**
 * Skills, a filterable two-up grid of category cards. Each card carries
 * the category name and a cloud of violet chips; an odd card out on the
 * last row is centred. The filter bar
 * narrows to one category; "All" lays the whole toolkit out.
 */
export function Skills({ index = "01" }: { index?: string }) {
  const [filter, setFilter] = useState<string>("all");
  // Phones start with the first few areas; the full toolkit is one tap away
  const [showAllMobile, setShowAllMobile] = useState(false);
  const mobileCollapsed = filter === "all" && !showAllMobile;

  const visible =
    filter === "all" ? groups : groups.filter((group) => group.label === filter);

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="relative overflow-hidden border-t border-[var(--glass-border)]"
    >
      <SectionGlow side="right" />
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-24 md:py-32">
        <SectionHeader
          id="skills-heading"
          index={index}
          label="Expertise & competencies"
          title="Technical"
          emphasis="arsenal & core skills"
          lede={site.skillsLede}
        />

        <Reveal delay={0.15}>
          <div
            role="group"
            aria-label="Filter skills"
            className="mb-8 flex gap-2 overflow-x-auto rounded-2xl border border-[var(--glass-border)] bg-[var(--bg-wash)] p-2 [scrollbar-width:none] lg:flex-wrap"
          >
            {[{ label: "All" }, ...groups].map((group) => {
              const id = group.label === "All" ? "all" : group.label;
              const active = filter === id;
              return (
                <button
                  key={id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(id)}
                  className={`shrink-0 whitespace-nowrap rounded-xl px-4 py-1.5 text-xs font-semibold transition-[background-color,color,box-shadow] duration-300 ${FOCUS} ${
                    active
                      ? "accent-button"
                      : "text-[var(--fg-muted)] hover:bg-[var(--bg-elevated)] hover:text-[var(--fg)]"
                  }`}
                >
                  {group.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <motion.div layout className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <AnimatePresence mode="popLayout" initial={false}>
              {visible.map((group, position) => {
                // An odd card out on the last row sits centred, not flush left
                const loneLast =
                  visible.length % 2 === 1 && position === visible.length - 1;
                return (
                  <motion.article
                    key={group.label}
                    layout
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className={`${
                      mobileCollapsed && position >= MOBILE_VISIBLE ? "max-md:hidden" : ""
                    } rounded-2xl border border-[var(--glass-border)] bg-[var(--bg-elevated)] p-6 shadow-[var(--card-shadow)] transition-[border-color,box-shadow] duration-300 hover:border-[var(--accent-border)] hover:shadow-[var(--card-shadow-hover)] ${
                      loneLast && visible.length > 1
                        ? "md:col-span-2 md:mx-auto md:w-[calc(50%-0.75rem)]"
                        : ""
                    }`}
                  >
                    <h3 className="mb-5 font-display text-lg font-bold tracking-tight text-[var(--fg)]">
                      {group.label}
                    </h3>
                    <ul className="flex flex-wrap gap-2">
                      {group.skills.map((skill) => (
                        <li key={skill}>
                          <span className="inline-flex items-center rounded-xl border border-[var(--accent-border)] bg-[var(--accent-light)] px-3 py-1.5 text-xs font-medium text-white transition-colors duration-300 hover:bg-[var(--accent-soft)] hover:border-[var(--accent)]">
                            {skill}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </Reveal>

        {mobileCollapsed && groups.length > MOBILE_VISIBLE && (
          <div className="mt-8 flex justify-center md:hidden">
            <button
              type="button"
              onClick={() => setShowAllMobile(true)}
              className={`inline-flex h-12 items-center gap-2 rounded-xl border border-[var(--accent-border)] bg-[var(--accent-light)] px-6 text-sm font-bold text-[var(--fg)] ${FOCUS}`}
            >
              Show all {groups.length} skill areas
              <span aria-hidden className="text-[var(--accent)]">
                ↓
              </span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
