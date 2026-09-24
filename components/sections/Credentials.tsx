"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site, type Credential, type CredentialKind } from "@/content/site";
import { SectionGlow } from "@/components/fx/SectionGlow";
import { Reveal } from "@/components/fx/Reveal";
import {
  ArrowUpRightIcon,
  BuildingIcon,
  CalendarIcon,
  CheckCircleIcon,
  EyeIcon,
} from "@/components/fx/Icons";
import { SectionHeader } from "./SectionHeader";

const EASE = [0.22, 1, 0.36, 1] as const;

const FOCUS =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]";

// The degree lives in the About section; this section is the certificates
// and the competition placing.
const credentials: Credential[] = site.credentials.filter(
  (entry) => entry.kind !== "Degree"
);

type Filter = "all" | CredentialKind;

const TABS: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  ...Array.from(new Set(credentials.map((entry) => entry.kind))).map(
    (kind) => ({ id: kind, label: `${kind}s` })
  ),
];

/**
 * Framed plate for the certificate scan. Only rendered when a scan exists,
 * so a card never shows a stand-in for a document that is not there.
 */
function CertificatePlate({ image, title }: { image: string; title: string }) {
  return (
    <div className="mb-6 rounded-2xl border border-[var(--glass-border)] bg-[var(--accent-light)] p-3">
      <div className="relative aspect-[1.414/1] overflow-hidden rounded-xl border-4 border-[var(--glass-border)] bg-[var(--bg-elevated)] shadow-sm">
        <Image
          src={image}
          alt={`${title} certificate`}
          fill
          sizes="(min-width: 1024px) 32rem, 100vw"
          className="object-cover object-top"
        />
      </div>
    </div>
  );
}

function CredentialCard({ entry }: { entry: Credential }) {
  const accent = entry.accent ?? "var(--accent-deep)";

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.4, ease: EASE }}
      className="relative flex flex-col overflow-hidden rounded-3xl border border-[var(--glass-border)] bg-[var(--bg-elevated)] p-6 shadow-[var(--card-shadow)] transition-[border-color,box-shadow] duration-300 hover:border-[var(--accent-border)] hover:shadow-[var(--card-shadow-hover)] md:p-8"
    >
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-1.5"
        style={{ background: accent }}
      />

      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 pt-1">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className="inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-bold"
            style={{
              color: accent,
              borderColor: `color-mix(in srgb, ${accent} 30%, transparent)`,
              background: `color-mix(in srgb, ${accent} 8%, transparent)`,
            }}
          >
            <BuildingIcon className="h-3.5 w-3.5" />
            {entry.org}
          </span>
          {entry.credentialUrl && (
            <span className="inline-flex items-center gap-1 rounded-lg border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">
              <CheckCircleIcon className="h-3.5 w-3.5" />
              Verified
            </span>
          )}
        </div>
        <span className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--fg-faint)]">
          <CalendarIcon className="h-3.5 w-3.5 text-[var(--accent)]" />
          {entry.period}
        </span>
      </div>

      {entry.image && <CertificatePlate image={entry.image} title={entry.title} />}

      <h3 className="font-display text-xl font-extrabold tracking-tight text-[var(--fg)] md:text-2xl">
        {entry.title}
      </h3>
      <p className="mt-3 text-xs leading-relaxed text-[var(--fg-muted)]">
        {entry.body}
      </p>

      {entry.meta && entry.meta.length > 0 && (
        <ul className="mt-5 flex flex-wrap gap-2">
          {entry.meta.map((skill) => (
            <li key={skill}>
              <span className="inline-flex items-center rounded-lg border border-[var(--glass-border)] bg-[var(--bg-wash)] px-3 py-1.5 text-xs font-medium text-[var(--fg-muted)]">
                {skill}
              </span>
            </li>
          ))}
        </ul>
      )}

      {(entry.credentialId || entry.credentialUrl) && (
        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-[var(--glass-border)] pt-5">
          {entry.credentialId && (
            <span className="inline-flex items-center gap-2 rounded-lg border border-[var(--glass-border)] bg-[var(--bg-wash)] px-3 py-2 font-mono text-xs text-[var(--fg-muted)]">
              ID:{" "}
              <strong className="font-bold text-[var(--accent-deep)]">
                {entry.credentialId}
              </strong>
            </span>
          )}
          {entry.credentialUrl && (
            <span className="flex items-center gap-2">
              <a
                href={entry.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1.5 rounded-xl border border-[var(--glass-border)] bg-[var(--accent-soft)] px-3.5 py-2 text-xs font-bold text-[var(--accent-deep)] transition-colors duration-300 hover:bg-[var(--accent-light)] ${FOCUS}`}
              >
                <EyeIcon className="h-3.5 w-3.5" />
                Inspect
              </a>
              <a
                href={entry.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`accent-button inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-[transform,box-shadow] duration-300 hover:-translate-y-px hover:shadow-[var(--accent-shadow-hover)] ${FOCUS}`}
              >
                Verify
                <ArrowUpRightIcon className="h-3.5 w-3.5" />
              </a>
            </span>
          )}
        </div>
      )}
    </motion.article>
  );
}

/**
 * Certifications and achievements, a filterable two-up grid of credential
 * cards: issuer-coloured bar and chip, the certificate scan when there is
 * one, title, a line of context, skill chips, and the credential id / verify
 * links when they exist.
 */
export function Credentials({ index = "06" }: { index?: string }) {
  const [filter, setFilter] = useState<Filter>("all");

  const visible =
    filter === "all"
      ? credentials
      : credentials.filter((entry) => entry.kind === filter);

  return (
    <section
      id="certifications"
      aria-labelledby="certifications-heading"
      className="relative overflow-hidden border-t border-[var(--glass-border)]"
    >
      <SectionGlow side="right" />
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-24 md:py-32">
        <SectionHeader
          id="certifications-heading"
          index={index}
          label="Credentials"
          title="Certifications &"
          emphasis="achievements"
          lede="Course certifications and the competition placing behind the work, each with the skills it covers."
          size="xl"
        />

        <Reveal delay={0.15}>
          <div
            role="group"
            aria-label="Filter credentials"
            className="flex flex-wrap items-center gap-2"
          >
            {TABS.map((tab) => {
              const active = filter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(tab.id)}
                  className={`rounded-xl px-5 py-2.5 text-xs font-bold transition-[background-color,color,border-color,box-shadow] duration-300 ${FOCUS} ${
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
        </Reveal>

        <Reveal delay={0.2}>
          <motion.div layout className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
            <AnimatePresence mode="popLayout" initial={false}>
              {visible.map((entry) => (
                <CredentialCard key={entry.title} entry={entry} />
              ))}
            </AnimatePresence>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
