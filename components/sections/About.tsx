import Image from "next/image";
import { site } from "@/content/site";
import { Reveal } from "@/components/fx/Reveal";
import { SectionHeader } from "./SectionHeader";

/**
 * About — deliberately short, because it sits after the work. One headline,
 * one sentence, the portrait, then a compact capability list and the quick
 * facts a recruiter scans for (location, availability, notice, languages).
 */
export function About({ index = "05" }: { index?: string }) {
  return (
    <section id="about" aria-labelledby="about-heading">
      <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
        <SectionHeader id="about-heading" index={index} label="About" />

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,18rem)] lg:gap-16">
          <div>
            <Reveal>
              <p className="font-display text-[clamp(1.75rem,4.5vw,2.75rem)] font-semibold leading-[1.1] tracking-tight text-[var(--fg)]">
                {site.aboutHeadline}
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-6 max-w-2xl font-display text-[1.35rem] font-light leading-[1.5] tracking-tight text-[var(--fg-muted)] md:mt-8 md:text-[1.6rem]">
                {site.aboutLede}
              </p>
            </Reveal>

            <div className="mt-12 grid gap-10 md:mt-14 md:grid-cols-2 md:gap-12">
              {site.aboutGroups.map((group, groupIndex) => (
                <Reveal key={group.label} delay={0.18 + groupIndex * 0.08}>
                  <h3 className="eyebrow font-display font-semibold">
                    {group.label}
                  </h3>
                  <div
                    aria-hidden
                    className="mt-4 h-px bg-gradient-to-r from-[var(--glass-border)] to-transparent"
                  />
                  <ul className="mt-5 space-y-4">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 text-[0.9375rem] leading-[1.75] text-[var(--fg-muted)]"
                      >
                        <span
                          aria-hidden
                          className="mt-[0.7em] h-px w-4 shrink-0 bg-[var(--fg-faint)]"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.28}>
              <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-[var(--glass-border)] pt-8 sm:grid-cols-4 md:mt-14">
                {site.aboutFacts.map((fact) => (
                  <div key={fact.label}>
                    <dt className="text-[0.6875rem] uppercase tracking-[0.22em] text-[var(--fg-faint)]">
                      {fact.label}
                    </dt>
                    <dd className="mt-2 text-sm text-[var(--fg)]">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <Reveal delay={0.2} className="lg:pt-2">
            <figure className="group relative mx-auto max-w-xs lg:max-w-none">
              <div className="relative overflow-hidden rounded-2xl border border-[var(--glass-border)] shadow-[inset_0_1px_0_var(--inset-highlight),var(--card-shadow)]">
                <Image
                  src="/arslan-portrait.jpg"
                  alt={`${site.fullName}, ${site.role}`}
                  width={693}
                  height={866}
                  sizes="(min-width: 1024px) 18rem, (min-width: 640px) 20rem, 100vw"
                  className="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />
                {/* settle the frame into the page background */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--panel-scrim-soft)] via-transparent to-[var(--inset-highlight)]"
                />
              </div>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
