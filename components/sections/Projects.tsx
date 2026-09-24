"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site, type Project, type ProjectGroup } from "@/content/site";
import { Reveal } from "@/components/fx/Reveal";
import { SectionGlow } from "@/components/fx/SectionGlow";
import { SectionHeader } from "./SectionHeader";
import { ArrowUpRightIcon, GitHubIcon } from "@/components/fx/Icons";

// Widen from the narrowly-inferred content literal so optional fields
// (links, linkNote, featured, accent) type-check regardless of which entries use them.
const projects: Project[] = site.projects;
const groups = site.projectGroups;

type Filter = "all" | ProjectGroup;

const TABS: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  ...groups.map((group) => ({ id: group.id, label: group.label })),
];

const EASE = [0.22, 1, 0.36, 1] as const;

const FOCUS =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]";

const FALLBACK_ACCENT = "linear-gradient(135deg, #3a3d44, #0a0a0c)";

function hostname(url: string) {
  try {
    return new URL(url).host;
  } catch {
    return url;
  }
}

/**
 * Browser-window mock around the project's screenshot: traffic lights, an
 * address bar showing the live host, and a viewport cut to the screenshots'
 * own aspect ratio (1400x730 captures) so nothing is cropped or left empty.
 * Projects with no screenshot get the same frame around their accent plate.
 */
function BrowserFrame({ project, index }: { project: Project; index: number }) {
  // Live projects show their host; everything else leaves the address bar
  // empty and lets the image speak for itself.
  const address = project.links?.live ? hostname(project.links.live) : "";

  return (
    <div className="group/frame relative mb-6 overflow-hidden rounded-2xl border border-[var(--glass-border)] bg-[var(--frame-bg)] shadow-xs">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 bg-[var(--frame-bar)] px-3.5 py-2.5">
        <div aria-hidden className="flex shrink-0 items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
        </div>
        <div className="min-h-[22px] min-w-0 flex-1 truncate rounded-md bg-white/5 px-3 py-1 text-center font-mono text-[10px] text-white/40 sm:mx-auto sm:max-w-xs">
          {address}
        </div>
        <span aria-hidden className="w-[46px] shrink-0" />
      </div>

      <div className="relative aspect-[1400/730] w-full overflow-hidden bg-[var(--frame-viewport)]">
        {project.image ? (
          <Image
            src={project.image}
            alt={`${project.title} interface`}
            fill
            sizes="(min-width: 1024px) 34rem, 100vw"
            className="object-cover object-top transition-transform duration-700 ease-out group-hover/frame:scale-[1.04]"
          />
        ) : (
          <div
            aria-hidden
            className="absolute inset-0"
            style={{ background: project.accent ?? FALLBACK_ACCENT }}
          >
            {/* fine diagonal texture */}
            <div className="absolute inset-0 bg-[repeating-linear-gradient(115deg,rgba(255,255,255,0.045)_0px,rgba(255,255,255,0.045)_1px,transparent_1px,transparent_10px)]" />
            {/* index marker */}
            <span className="absolute left-6 top-5 font-mono text-[0.6875rem] tracking-[0.25em] text-white/50">
              {String(index + 1).padStart(2, "0")}
            </span>
            {/* chrome orb accent */}
            <div
              className="absolute bottom-6 right-6 h-12 w-12 rounded-full opacity-90 transition-transform duration-500 ease-out group-hover/frame:-translate-y-1 group-hover/frame:scale-110"
              style={{
                background:
                  "radial-gradient(circle at 32% 30%, rgba(255,255,255,0.95) 0%, #c9cdd5 24%, #82858d 52%, #2c2e33 78%, #0d0e10 100%)",
                boxShadow:
                  "0 8px 22px rgba(0, 0, 0, 0.5), 0 0 16px rgba(220, 225, 235, 0.14)",
              }}
            >
              <div
                className="absolute inset-0 rounded-full opacity-70 mix-blend-overlay"
                style={{ background: project.accent ?? FALLBACK_ACCENT }}
              />
            </div>
            <span className="absolute inset-x-0 bottom-6 text-center font-mono text-[10px] uppercase tracking-[0.25em] text-white/35">
              No public preview
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

const VISIBLE_BULLETS = 2;

function Bullet({ text, as = "li" }: { text: string; as?: "li" | "div" }) {
  const Tag = as;
  return (
    <Tag className="flex gap-2.5 text-[0.8125rem] leading-relaxed text-[var(--fg-muted)]">
      <span
        aria-hidden
        className="mt-[0.5em] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-glow)]"
      />
      {text}
    </Tag>
  );
}

function ProjectCard({
  project,
  index,
  delay = 0,
}: {
  project: Project;
  index: number;
  delay?: number;
}) {
  const groupLabel = groups.find((group) => group.id === project.group)?.label;
  const live = project.links?.live;
  const github = project.links?.github;
  const hasLinks = Boolean(live || github);
  // Two bullets carry the pitch; the rest wait behind "More detail" so the
  // grid stays skimmable.
  const [showAll, setShowAll] = useState(false);
  const extra = project.bullets.slice(VISIBLE_BULLETS);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.25, ease: EASE } }}
      transition={{ duration: 0.5, ease: EASE, delay }}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-[var(--glass-border)] bg-[var(--bg-elevated)] p-6 shadow-[var(--card-shadow)] transition-[border-color,box-shadow] duration-300 hover:border-[var(--accent-border)] hover:shadow-[var(--card-shadow-hover)] md:p-8"
    >
      {/* Accent bar */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-1.5 bg-[image:var(--accent-fill)]"
      />

      <div className="mb-5 flex items-center justify-between gap-3 pt-1">
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          <span className="rounded-full border border-[var(--glass-border)] bg-[var(--accent-soft)] px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--accent-deep)]">
            {project.kind}
          </span>
          {project.featured && (
            <span className="rounded-full border border-[var(--featured-border)] bg-[var(--featured-bg)] px-2.5 py-0.5 text-[10px] font-bold text-[var(--featured-fg)]">
              ★ Featured
            </span>
          )}
        </div>
        {groupLabel && (
          <span className="hidden shrink-0 font-mono text-[11px] font-medium text-[var(--fg-faint)] sm:block">
            {groupLabel}
          </span>
        )}
      </div>

      <BrowserFrame project={project} index={index} />

      <div className="pb-8">
        <h3 className="font-display text-2xl font-extrabold tracking-tight text-[var(--fg)] transition-colors duration-300 group-hover:text-[var(--accent-deep)]">
          {project.title}
        </h3>
        <p className="mt-2 text-sm text-[var(--fg-muted)]">{project.subtitle}</p>

        <ul className="mt-5 space-y-2.5">
          {project.bullets.slice(0, VISIBLE_BULLETS).map((bullet) => (
            <Bullet key={bullet} text={bullet} />
          ))}
          <AnimatePresence initial={false}>
            {showAll &&
              extra.map((bullet) => (
                <motion.li
                  key={bullet}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="overflow-hidden"
                >
                  <Bullet as="div" text={bullet} />
                </motion.li>
              ))}
          </AnimatePresence>
        </ul>
        {extra.length > 0 && (
          <button
            type="button"
            onClick={() => setShowAll((value) => !value)}
            aria-expanded={showAll}
            className={`mt-3 inline-flex items-center gap-1.5 rounded-lg text-xs font-bold text-[var(--accent-deep)] transition-colors duration-300 hover:text-[var(--accent-hover)] ${FOCUS}`}
          >
            {showAll ? "Less detail" : `More detail (${extra.length})`}
            <span
              aria-hidden
              className={`inline-block transition-transform duration-300 ${showAll ? "rotate-180" : ""}`}
            >
              ↓
            </span>
          </button>
        )}

        <ul className="mt-6 flex flex-wrap gap-1.5">
          {project.tech.map((tech) => (
            <li key={tech}>
              <span className="inline-flex items-center rounded-lg border border-[var(--glass-border)] bg-[var(--accent-soft)] px-2.5 py-1 text-xs font-medium text-[var(--accent-deep)]">
                {tech}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-auto flex flex-col items-stretch justify-between gap-3 border-t border-[var(--glass-border)] pt-5 sm:flex-row sm:items-center">
        {live && (
          <a
            href={live}
            target="_blank"
            rel="noopener noreferrer"
            className={`accent-button inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold transition-[transform,box-shadow] duration-300 hover:-translate-y-px hover:shadow-[var(--accent-shadow-hover)] ${FOCUS}`}
          >
            Live site
            <ArrowUpRightIcon className="h-3.5 w-3.5" />
          </a>
        )}
        {github && (
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center justify-center gap-1.5 rounded-xl border border-[var(--glass-border)] bg-[var(--accent-soft)] px-3.5 py-2.5 text-xs font-bold text-[var(--accent-deep)] transition-colors duration-300 hover:bg-[var(--accent-light)] sm:ml-auto ${FOCUS}`}
          >
            <GitHubIcon className="h-3.5 w-3.5" />
            Code
          </a>
        )}
        {!hasLinks && project.linkNote && (
          <p className="text-xs text-[var(--fg-faint)]">{project.linkNote}</p>
        )}
      </div>
    </motion.article>
  );
}

/**
 * Projects, a filterable two-up grid. Tabs map to the content groups (AI
 * systems, client delivery, open source, company work); "All" shows
 * everything in the order the content lists it, self-built AI systems
 * first. Only the first four cards show until the reader expands the rest.
 */
const COLLAPSED_COUNT = 4;

export function Projects({ index = "03" }: { index?: string }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [expanded, setExpanded] = useState(false);

  // The grid's height is animated to follow its content, so expanding or
  // collapsing eases the rest of the page along instead of jumping.
  const gridRef = useRef<HTMLDivElement>(null);
  const [gridHeight, setGridHeight] = useState<number | "auto">("auto");
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const observer = new ResizeObserver(() => setGridHeight(grid.offsetHeight));
    observer.observe(grid);
    return () => observer.disconnect();
  }, []);

  const toggleExpanded = () => {
    // Collapsing from far down the list would strand the reader below the
    // section, so bring the grid back into view first.
    if (expanded) {
      const top = gridRef.current?.getBoundingClientRect().top ?? 0;
      if (top < 0) {
        gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
    setExpanded((value) => !value);
  };

  const matching =
    filter === "all"
      ? projects
      : projects.filter((project) => project.group === filter);
  const visible = expanded ? matching : matching.slice(0, COLLAPSED_COUNT);
  const hidden = matching.length - visible.length;
  const activeGroup = groups.find((group) => group.id === filter);

  // A new filter starts collapsed again, so the section never opens at full
  // height on a band the reader has not asked to see.
  const selectFilter = (next: Filter) => {
    setFilter(next);
    setExpanded(false);
  };

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="relative overflow-hidden border-t border-[var(--glass-border)]"
    >
      <SectionGlow side="left" />
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-24 md:py-32">
        <SectionHeader
          id="projects-heading"
          index={index}
          label="Interactive portfolio"
          title="Featured"
          emphasis="engineering projects"
          lede={site.projectsLede}
          size="xl"
        />

        <Reveal delay={0.15}>
          <div
            role="group"
            aria-label="Filter projects"
            className="flex items-center gap-2 overflow-x-auto pb-2"
          >
            {TABS.map((tab) => {
              const active = filter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => selectFilter(tab.id)}
                  className={`shrink-0 whitespace-nowrap rounded-xl px-5 py-2.5 text-xs font-bold transition-[background-color,color,border-color,box-shadow] duration-300 ${FOCUS} ${
                    active
                      ? "accent-button"
                      : "border border-[var(--glass-border)] bg-[var(--bg-elevated)] text-[var(--fg-muted)] hover:border-[var(--accent-border)] hover:bg-[var(--accent-soft)] hover:text-[var(--accent-deep)]"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
          <p className="mt-3 min-h-[1.5rem] text-sm text-[var(--fg-muted)]">
            {activeGroup?.note ?? ""}
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <motion.div
            // + the wrapper's vertical padding, which gives card shadows room
            animate={{ height: gridHeight === "auto" ? "auto" : gridHeight + 32 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="-mx-4 mt-4 overflow-hidden px-4 pb-4 pt-4"
          >
            <motion.div
              ref={gridRef}
              id="projects-grid"
              layout
              className="grid grid-cols-1 gap-8 lg:grid-cols-2"
            >
              <AnimatePresence mode="popLayout" initial={false}>
                {visible.map((project, position) => (
                  <ProjectCard
                    key={project.title}
                    project={project}
                    index={projects.indexOf(project)}
                    delay={
                      position >= COLLAPSED_COUNT
                        ? (position - COLLAPSED_COUNT) * 0.07
                        : 0
                    }
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </Reveal>

        {matching.length > COLLAPSED_COUNT && (
          <Reveal delay={0.1}>
            <div className="mt-10 flex justify-center">
              <button
                type="button"
                onClick={toggleExpanded}
                aria-expanded={expanded}
                aria-controls="projects-grid"
                className={`group inline-flex h-12 items-center gap-3 rounded-xl border border-[var(--glass-border)] bg-[var(--bg-elevated)] px-8 text-sm font-bold text-[var(--fg)] shadow-xs transition-[border-color,background-color,color] duration-300 hover:border-[var(--accent-border)] hover:bg-[var(--accent-soft)] hover:text-[var(--accent-deep)] ${FOCUS}`}
              >
                {expanded
                  ? "Show fewer projects"
                  : `Show ${hidden} more project${hidden === 1 ? "" : "s"}`}
                <span
                  aria-hidden
                  className={`inline-block text-[var(--accent)] transition-transform duration-300 ${
                    expanded ? "rotate-180" : "group-hover:translate-y-0.5"
                  }`}
                >
                  ↓
                </span>
              </button>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
