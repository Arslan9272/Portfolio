import { site } from "@/content/site";
import { Reveal } from "@/components/fx/Reveal";
import { MetaRail } from "@/components/fx/MetaRail";
import { SectionHeader } from "./SectionHeader";

/**
 * Education & certifications — the degree as a single wide glass card,
 * the courses and competition placings as a quieter ruled list beside it.
 */
export function Education() {
  return (
    <section id="education" aria-labelledby="education-heading">
      <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
        <MetaRail index="05" label="Education" />
        <SectionHeader
          id="education-heading"
          index="05"
          label="Education & certifications"
        />

        <div className="grid gap-5 md:gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
          {site.education.map((entry, index) => (
            <Reveal key={entry.title} delay={index * 0.05}>
              <article className="glass-card h-full p-6 transition-[border-color,background-color] duration-300 hover:border-white/25 hover:bg-[var(--glass-fill-hover)] md:p-8">
                <p className="font-mono text-xs tracking-[0.2em] text-[var(--fg-faint)]">
                  {entry.period}
                </p>
                <h3 className="mt-4 font-display text-xl font-semibold tracking-tight md:text-2xl">
                  {entry.title}
                </h3>
                <p className="mt-2 text-sm text-[var(--fg-muted)] md:text-base">
                  {entry.org}
                </p>
              </article>
            </Reveal>
          ))}

          <Reveal delay={0.12}>
            <ul className="glass-card h-full divide-y divide-[var(--glass-border)] p-6 md:p-8">
              {site.certifications.map((credential) => (
                <li
                  key={credential.title}
                  className="flex flex-col gap-1 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                >
                  <span className="text-sm font-medium leading-relaxed text-[var(--fg)]">
                    {credential.title}
                  </span>
                  <span className="shrink-0 font-mono text-[0.6875rem] tracking-[0.12em] text-[var(--fg-faint)]">
                    {credential.org}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
