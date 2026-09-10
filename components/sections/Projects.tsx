"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site, type Project, type ProjectGroup } from "@/content/site";
import { SectionHeader } from "./SectionHeader";
import { ArrowUpRightIcon, GitHubIcon } from "@/components/fx/Icons";

// Widen from the narrowly-inferred content literal so optional fields
// (links, linkNote, accent) type-check regardless of which entries use them.
const projects: Project[] = site.projects;
const groups = site.projectGroups;

const EASE = [0.22, 1, 0.36, 1] as const;

const FALLBACK_ACCENT = "linear-gradient(135deg, #3a3d44, #0a0a0c)";

const list = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const card = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
};

function LinkButton({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon?: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="glass group/link inline-flex h-10 items-center gap-2 rounded-full px-5 text-[0.8125rem] font-medium tracking-wide text-[var(--fg)] transition-colors duration-300 hover:border-[var(--border-strong)] hover:bg-[var(--glass-fill-hover)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-ring)]"
    >
      {icon}
      {label}
      <ArrowUpRightIcon className="h-3.5 w-3.5 text-[var(--fg-muted)] transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
    </a>
  );
}

function ProjectCard({
  project,
  index,
  variant = "row",
}: {
  project: Project;
  index: number;
  variant?: "row" | "compact";
}) {
  const hasLinks = Boolean(project.links?.live || project.links?.github);
  const isRow = variant === "row";

  return (
    <motion.article
      variants={card}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 26 }}
      className={`glass-card group relative grid overflow-hidden transition-[border-color,box-shadow] duration-300 hover:border-[var(--border-strong)] hover:shadow-[inset_0_1px_0_var(--inset-highlight-strong),var(--card-shadow-hover),0_0_40px_var(--glow)] ${
        isRow ? "lg:grid-cols-[minmax(0,19rem)_minmax(0,1fr)]" : "content-start"
      }`}
    >
      {/* Sheen sweep on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 -translate-x-full bg-[image:var(--sheen)] transition-transform duration-700 ease-out group-hover:translate-x-full"
      />

      {/* Art panel — screenshot plate over a CSS gradient */}
      <div
        aria-hidden
        className={`relative brightness-100 saturate-100 transition-[filter] duration-300 ease-out group-hover:brightness-[1.15] group-hover:saturate-150 ${
          isRow ? "h-40 md:h-48 lg:h-full" : "h-32 md:h-40"
        }`}
        style={{ background: project.accent ?? FALLBACK_ACCENT }}
      >
        {project.image ? (
          isRow ? (
            /* The row panel is tall and narrow, so a full-bleed crop would
               show a meaningless sliver — float the shot as a plate instead. */
            <div className="absolute inset-0 flex items-center justify-center p-4 lg:p-5">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-[var(--glass-border)] shadow-[var(--plate-shadow)] transition-transform duration-500 ease-out group-hover:scale-[1.03]">
                <Image
                  src={project.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 18rem, 90vw"
                  className="object-cover object-top"
                />
              </div>
            </div>
          ) : (
            <Image
              src={project.image}
              alt=""
              fill
              sizes="(min-width: 768px) 34rem, 100vw"
              className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            />
          )
        ) : (
          /* fine diagonal texture */
          <div className="absolute inset-0 bg-[repeating-linear-gradient(115deg,rgba(255,255,255,0.045)_0px,rgba(255,255,255,0.045)_1px,transparent_1px,transparent_10px)]" />
        )}
        {/* blend into the glass body */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-[var(--panel-scrim)] via-transparent to-[rgba(255,255,255,0.04)] ${
            isRow
              ? "lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-[var(--panel-scrim)]"
              : ""
          }`}
        />
        {/* index marker */}
        <span className="absolute left-6 top-5 font-mono text-[0.6875rem] tracking-[0.25em] text-white/50">
          {String(index + 1).padStart(2, "0")}
        </span>
        {/* chrome orb accent — only where there is no screenshot to show */}
        {!project.image && (
          <div
            className={`absolute bottom-5 right-6 h-10 w-10 rounded-full opacity-90 transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:scale-110 ${
              isRow ? "lg:bottom-6 lg:left-6 lg:right-auto" : ""
            }`}
            style={{
              background:
                "radial-gradient(circle at 32% 30%, rgba(255,255,255,0.95) 0%, #c9cdd5 24%, #82858d 52%, #2c2e33 78%, #0d0e10 100%)",
              boxShadow:
                "0 8px 22px rgba(0, 0, 0, 0.5), 0 0 16px rgba(220, 225, 235, 0.14)",
            }}
          >
            <div
              className="absolute inset-0 rounded-full mix-blend-overlay opacity-70"
              style={{ background: project.accent ?? FALLBACK_ACCENT }}
            />
          </div>
        )}
      </div>

      {/* Body */}
      <div
        className={`flex flex-1 flex-col p-6 ${isRow ? "md:p-8" : "md:p-7"}`}
      >
        <span className="inline-flex w-fit items-center rounded-full border border-[var(--glass-border)] bg-[var(--glass-fill)] px-3 py-1 font-mono text-[0.625rem] uppercase tracking-[0.2em] text-[var(--fg-faint)]">
          {project.kind}
        </span>
        <h3 className="mt-4 font-display text-xl font-semibold tracking-tight text-[var(--fg)] md:text-2xl">
          {project.title}
        </h3>
        <p className="mt-2 text-sm text-[var(--fg-muted)] md:text-base">
          {project.subtitle}
        </p>

        <ul className="mt-6 space-y-3 border-t border-[var(--glass-border)] pt-6">
          {project.bullets.map((bullet) => (
            <li
              key={bullet}
              className="flex gap-3 text-sm leading-[1.75] text-[var(--fg-muted)]"
            >
              <span
                aria-hidden
                className="mt-[0.15em] shrink-0 font-mono text-[var(--fg-faint)]"
              >
                +
              </span>
              {bullet}
            </li>
          ))}
        </ul>

        <ul className="mt-6 flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <li key={tech}>
              <span className="inline-flex items-center rounded-full border border-[var(--glass-border)] bg-[var(--glass-fill)] px-3 py-1 text-xs text-[var(--fg-muted)] transition-colors duration-300 hover:border-[var(--border-strong)] hover:text-[var(--fg)]">
                {tech}
              </span>
            </li>
          ))}
        </ul>

        {(hasLinks || project.linkNote) && (
          <div className="mt-7 flex flex-wrap items-center gap-3 border-t border-[var(--glass-border)] pt-6">
            {project.links?.live && (
              <LinkButton href={project.links.live} label="Live site" />
            )}
            {project.links?.github && (
              <LinkButton
                href={project.links.github}
                label="Code"
                icon={<GitHubIcon className="h-3.5 w-3.5" />}
              />
            )}
            {!hasLinks && project.linkNote && (
              <p className="text-[0.8125rem] text-[var(--fg-faint)]">
                {project.linkNote}
              </p>
            )}
          </div>
        )}
      </div>
    </motion.article>
  );
}

function BandHeader({ label, note }: { label: string; note: string }) {
  return (
    <div className="mb-6 flex flex-col gap-1 md:mb-7">
      <h3 className="font-display text-lg font-semibold tracking-tight text-[var(--fg)] md:text-xl">
        {label}
      </h3>
      <p className="text-sm text-[var(--fg-muted)]">{note}</p>
      <div
        aria-hidden
        className="mt-3 h-px bg-gradient-to-r from-[var(--glass-border)] to-transparent"
      />
    </div>
  );
}

function ordinal(group: ProjectGroup) {
  return projects.filter((project) => project.group === group);
}

/**
 * Projects — banded the way the CV reads: the self-built AI systems first as
 * full-width rows, then client delivery as a two-up grid, then the internal
 * company work folded behind a toggle so the section leads with the work
 * that is actually inspectable.
 */
export function Projects({ index = "01" }: { index?: string }) {
  const [expanded, setExpanded] = useState(false);

  const ai = ordinal("ai");
  const client = ordinal("client");
  const company = ordinal("company");

  const aiBand = groups.find((band) => band.id === "ai")!;
  const clientBand = groups.find((band) => band.id === "client")!;
  const companyBand = groups.find((band) => band.id === "company")!;

  return (
    <section id="projects" aria-labelledby="projects-heading">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <SectionHeader id="projects-heading" index={index} label="Projects" />

        {/* AI systems — the headline work, one full-width row each */}
        <BandHeader label={aiBand.label} note={aiBand.note} />
        <motion.div
          variants={list}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col gap-5 md:gap-6"
        >
          {ai.map((project, position) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={position}
            />
          ))}
        </motion.div>

        {/* Client delivery */}
        <div className="mt-16 md:mt-20">
          <BandHeader label={clientBand.label} note={clientBand.note} />
          <motion.div
            variants={list}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid gap-5 md:gap-6 lg:grid-cols-2"
          >
            {client.map((project, position) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={ai.length + position}
                variant="compact"
              />
            ))}
          </motion.div>
        </div>

        {/* Company work — present but folded, since none of it is public */}
        {company.length > 0 && (
          <div className="mt-16 md:mt-20">
            <BandHeader label={companyBand.label} note={companyBand.note} />

            <AnimatePresence initial={false}>
              {expanded && (
                <motion.div
                  key="company-projects"
                  id="company-projects"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="overflow-hidden"
                >
                  <motion.div
                    variants={list}
                    initial="hidden"
                    animate="visible"
                    className="grid gap-5 md:gap-6 lg:grid-cols-2"
                  >
                    {company.map((project, position) => (
                      <ProjectCard
                        key={project.title}
                        project={project}
                        index={ai.length + client.length + position}
                        variant="compact"
                      />
                    ))}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className={expanded ? "mt-10 flex justify-center" : "flex justify-center"}>
              <button
                type="button"
                onClick={() => setExpanded((value) => !value)}
                aria-expanded={expanded}
                aria-controls="company-projects"
                className="glass group inline-flex h-12 items-center gap-3 rounded-full px-8 text-sm font-medium tracking-wide text-[var(--fg)] transition-colors duration-300 hover:border-[var(--border-strong)] hover:bg-[var(--glass-fill-hover)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-ring)]"
              >
                {expanded
                  ? "Hide company projects"
                  : `Show ${company.length} company projects`}
                <span
                  aria-hidden
                  className={`inline-block text-[var(--fg-muted)] transition-transform duration-300 ${
                    expanded ? "rotate-180" : "group-hover:translate-y-0.5"
                  }`}
                >
                  ↓
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
