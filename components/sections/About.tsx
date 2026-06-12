import { site } from "@/content/site";
import { Reveal } from "@/components/fx/Reveal";
import { SectionHeader } from "./SectionHeader";

/**
 * About — the first paragraph reads as a large, light lede in Sora;
 * the remaining paragraphs settle into a two-column body grid.
 */
export function About() {
  const [lede, ...rest] = site.about;

  return (
    <section id="about" aria-labelledby="about-heading">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <SectionHeader id="about-heading" index="01" label="About" />

        <Reveal delay={0.1}>
          <p className="max-w-3xl font-display text-[1.4rem] font-light leading-[1.45] tracking-tight text-[var(--fg)] md:text-[1.75rem]">
            {lede}
          </p>
        </Reveal>

        {rest.length > 0 && (
          <div className="mt-12 grid gap-8 md:mt-16 md:grid-cols-2 md:gap-12">
            {rest.map((paragraph, i) => (
              <Reveal key={i} delay={0.15 + i * 0.1}>
                <p className="text-[0.9375rem] leading-[1.8] text-[var(--fg-muted)] md:text-base">
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
