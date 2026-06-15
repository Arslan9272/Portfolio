"use client";

import { motion } from "framer-motion";
import { site, type Project } from "@/content/site";
import { SectionHeader } from "./SectionHeader";

// Widen from the narrowly-inferred content literal so optional fields
// (links.live, accent) type-check regardless of which entries use them.
const projects: Project[] = site.projects;

const EASE = [0.22, 1, 0.36, 1] as const;

const FALLBACK_ACCENT = "linear-gradient(135deg, #3a3d44, #0a0a0c)";

const grid = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const card = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
};

function ExternalLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group/link inline-flex items-center gap-1.5 py-1 text-[0.8125rem] font-medium tracking-wide text-[var(--fg-muted)] transition-colors duration-300 hover:text-[var(--fg)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/70"
    >
      {label}
      <span
        aria-hidden
        className="inline-block transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
      >
        ↗
      </span>
    </a>
  );
}

/**
 * Projects — frosted-glass cards with pure-CSS gradient art headers
 * (per-project accent + a small chrome orb), tech chips, and subtle
 * external links. Cards lift and a sheen sweeps across on hover.
 */
export function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-heading">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <SectionHeader id="projects-heading" index="03" label="Projects" />

        <motion.div
          variants={grid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-5 md:grid-cols-2 md:gap-6"
        >
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              variants={card}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 26 }}
              className="glass-card group relative flex flex-col overflow-hidden transition-[border-color,box-shadow] duration-300 hover:border-white/35 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_30px_72px_-18px_rgba(0,0,0,0.78),0_0_40px_var(--glow)]"
            >
              {/* Sheen sweep on hover */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 z-10 -translate-x-full bg-[linear-gradient(105deg,transparent_42%,rgba(255,255,255,0.07)_50%,transparent_58%)] transition-transform duration-700 ease-out group-hover:translate-x-full"
              />

              {/* Art header — pure CSS gradients */}
              <div
                aria-hidden
                className="relative h-40 brightness-100 saturate-100 transition-[filter] duration-300 ease-out group-hover:brightness-[1.15] group-hover:saturate-150 md:h-44"
                style={{ background: project.accent ?? FALLBACK_ACCENT }}
              >
                {/* fine diagonal texture */}
                <div className="absolute inset-0 bg-[repeating-linear-gradient(115deg,rgba(255,255,255,0.045)_0px,rgba(255,255,255,0.045)_1px,transparent_1px,transparent_10px)]" />
                {/* blend into the glass body */}
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(5,5,6,0.6)] via-transparent to-[rgba(255,255,255,0.04)]" />
                {/* index marker */}
                <span className="absolute left-6 top-5 font-mono text-[0.6875rem] tracking-[0.25em] text-white/35">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {/* chrome orb accent — smaller, tinted by the card's accent
                    so it complements rather than competes with the hero blob */}
                <div
                  className="absolute bottom-5 right-6 h-10 w-10 rounded-full opacity-90 transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:scale-110"
                  style={{
                    background:
                      "radial-gradient(circle at 32% 30%, rgba(255,255,255,0.95) 0%, #c9cdd5 24%, #82858d 52%, #2c2e33 78%, #0d0e10 100%)",
                    boxShadow:
                      "0 8px 22px rgba(0, 0, 0, 0.5), 0 0 16px rgba(220, 225, 235, 0.14)",
                  }}
                >
                  {/* accent tint pulled from the card's gradient header */}
                  <div
                    className="absolute inset-0 rounded-full mix-blend-overlay opacity-70"
                    style={{ background: project.accent ?? FALLBACK_ACCENT }}
                  />
                </div>
              </div>

              {/* Body */}
              <div className="flex flex-1 flex-col p-6 md:p-7">
                <h3 className="font-display text-xl font-semibold tracking-tight text-white md:text-2xl">
                  {project.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-[1.75] text-[var(--fg-muted)]">
                  {project.description}
                </p>

                <ul className="mt-6 flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <li key={tech}>
                      <span className="inline-flex items-center rounded-full border border-[var(--glass-border)] bg-[var(--glass-fill)] px-3 py-1 text-xs text-[var(--fg-muted)] transition-colors duration-300 hover:border-white/35 hover:text-[var(--fg)]">
                        {tech}
                      </span>
                    </li>
                  ))}
                </ul>

                {(project.links.github || project.links.live) && (
                  <div className="mt-6 flex items-center gap-6 border-t border-[var(--glass-border)] pt-5">
                    {project.links.live && (
                      <ExternalLink href={project.links.live} label="Live" />
                    )}
                    {project.links.github && (
                      <ExternalLink
                        href={project.links.github}
                        label="GitHub"
                      />
                    )}
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
