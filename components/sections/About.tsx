import Image from "next/image";
import { site } from "@/content/site";
import { Reveal } from "@/components/fx/Reveal";
import { SectionHeader } from "./SectionHeader";

/**
 * About — headline and lede, then the two evidence lists ("what I've built",
 * "what I do well") as ruled bullets. The portrait sits in a glass frame on
 * the right with the availability note tucked underneath it.
 */
export function About() {
  return (
    <section id="about" aria-labelledby="about-heading">
      <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
        <SectionHeader id="about-heading" index="01" label="About" />

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)] lg:gap-16">
          <div>
            <Reveal>
              <p className="mb-8 font-display text-[clamp(1.75rem,4.5vw,2.75rem)] font-semibold leading-[1.1] tracking-tight text-[var(--fg)] md:mb-10">
                {site.aboutHeadline}
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="max-w-3xl font-display text-[1.4rem] font-light leading-[1.45] tracking-tight text-[var(--fg)] md:text-[1.75rem]">
                {site.aboutLede}
              </p>
            </Reveal>

            <div className="mt-12 grid gap-10 md:mt-14 md:grid-cols-2 md:gap-12">
              {site.aboutGroups.map((group, groupIndex) => (
                <Reveal key={group.label} delay={0.15 + groupIndex * 0.1}>
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
          </div>

          <Reveal delay={0.2} className="lg:pt-2">
            <figure className="group relative mx-auto max-w-sm lg:max-w-none">
              <div className="relative overflow-hidden rounded-2xl border border-[var(--glass-border)] shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_30px_70px_-24px_rgba(0,0,0,0.8)]">
                <Image
                  src="/arslan-portrait.jpg"
                  alt={`${site.fullName}, ${site.role}`}
                  width={693}
                  height={866}
                  sizes="(min-width: 1024px) 20rem, (min-width: 640px) 24rem, 100vw"
                  className="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />
                {/* settle the frame into the page background */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(5,5,6,0.42)] via-transparent to-[rgba(255,255,255,0.04)]"
                />
              </div>
            </figure>

            <div className="glass-card mt-8 p-6">
              <h3 className="eyebrow font-display font-semibold">
                {site.lookingFor.label}
              </h3>
              <p className="mt-4 text-sm leading-[1.75] text-[var(--fg-muted)]">
                {site.lookingFor.body}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
