import { site, type Credential } from "@/content/site";
import { Reveal } from "@/components/fx/Reveal";
import { SectionGlow } from "@/components/fx/SectionGlow";
import {
  AwardIcon,
  CheckCircleIcon,
  CodeIcon,
  GraduationCapIcon,
} from "@/components/fx/Icons";
import { SectionHeader } from "./SectionHeader";

const headlineLead = site.aboutHeadline.endsWith(site.aboutHeadlineEmphasis)
  ? site.aboutHeadline.slice(0, -site.aboutHeadlineEmphasis.length).trim()
  : site.aboutHeadline;

const degrees: Credential[] = site.credentials.filter(
  (entry) => entry.kind === "Degree"
);

const CARD =
  "rounded-2xl border border-[var(--glass-border)] bg-[var(--bg-elevated)] shadow-[var(--card-shadow)]";

/**
 * About. The story card on the left; on the right, Education as a short
 * timeline and How I work with an availability status line. No portrait:
 * the hero already carries the photo.
 */
export function About({ index = "02" }: { index?: string }) {
  const basedIn = site.aboutFacts.find((fact) => fact.label === "Based in");

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative overflow-hidden border-t border-[var(--glass-border)]"
    >
      <SectionGlow side="left" />
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-24 md:py-32">
        <SectionHeader
          id="about-heading"
          index={index}
          label={`About ${site.name}`}
          title={headlineLead}
          emphasis={site.aboutHeadlineEmphasis}
          className="mb-12 md:mb-16"
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Story + cards */}
          <div className="contents">
            <Reveal delay={0.1} className="lg:col-span-7">
              <div className={`${CARD} flex h-full flex-col gap-5 p-8 md:p-10`}>
                <h3 className="flex items-center gap-3 font-display text-2xl font-bold tracking-tight text-[var(--fg)]">
                  <CodeIcon className="h-5 w-5 text-[var(--accent)]" />
                  Building software end to end
                </h3>
                <p className="text-base leading-relaxed text-[var(--fg-muted)]">
                  {site.aboutLede}
                </p>
                <p className="text-sm leading-relaxed text-[var(--fg-muted)] md:text-base">
                  {site.aboutStory}
                </p>
                <dl className="mt-auto grid grid-cols-3 gap-4 border-t border-[var(--glass-border)] pt-6">
                  {site.aboutStats.map((stat) => (
                    <div key={stat.label}>
                      <dt className="sr-only">{stat.label}</dt>
                      <dd className="font-display text-3xl font-extrabold tracking-tight text-[var(--accent-deep)] md:text-4xl">
                        {stat.value}
                      </dd>
                      <dd className="mt-1 text-xs leading-snug text-[var(--fg-muted)]">
                        {stat.label}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
              <Reveal delay={0.15}>
                <div className={`${CARD} h-full p-6`}>
                  <h4 className="mb-4 flex items-center gap-2 font-display text-lg font-bold text-[var(--fg)]">
                    <GraduationCapIcon className="h-5 w-5 text-[var(--accent)]" />
                    Education
                  </h4>
                  <ol className="space-y-4">
                    {degrees.map((entry) => (
                      <li
                        key={entry.title}
                        className="relative border-l-2 border-[var(--glass-border)] pl-4"
                      >
                        <span
                          aria-hidden
                          className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-[var(--accent-deep)]"
                        />
                        <p className="text-sm font-bold text-[var(--fg)]">
                          {entry.title}
                        </p>
                        <p className="mt-0.5 text-xs text-[var(--fg-muted)]">
                          {entry.org}
                        </p>
                        <p className="mt-1 font-mono text-xs font-medium text-[var(--accent)]">
                          {entry.period}
                        </p>
                      </li>
                    ))}
                  </ol>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <div className={`${CARD} flex h-full flex-col justify-between p-6`}>
                  <div>
                    <h4 className="mb-4 flex items-center gap-2 font-display text-lg font-bold text-[var(--fg)]">
                      <AwardIcon className="h-5 w-5 text-[var(--accent)]" />
                      How I work
                    </h4>
                    <ul className="space-y-2.5 text-xs text-[var(--fg-muted)]">
                      {basedIn && (
                        <li className="flex items-center gap-2.5">
                          <CheckCircleIcon className="h-4 w-4 shrink-0 text-[var(--accent)]" />
                          <span>
                            Based in{" "}
                            <strong className="font-semibold text-[var(--fg)]">
                              {basedIn.value}
                            </strong>
                          </span>
                        </li>
                      )}
                      {site.aboutHighlights.map((item) => (
                        <li key={item} className="flex items-center gap-2.5">
                          <CheckCircleIcon className="h-4 w-4 shrink-0 text-[var(--accent)]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-4 flex items-center justify-between gap-3 border-t border-[var(--glass-border)] pt-4 font-mono text-xs font-bold text-[var(--accent-deep)]">
                    <span>Status: {site.aboutStatus}</span>
                    <span
                      aria-hidden
                      className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-[var(--accent-deep)]"
                    />
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
