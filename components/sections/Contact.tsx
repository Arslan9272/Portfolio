import { site } from "@/content/site";
import { Reveal } from "@/components/fx/Reveal";
import { MagneticButton } from "@/components/fx/MagneticButton";
import { SectionHeader } from "./SectionHeader";

/**
 * Contact — closing CTA: big chrome headline, the email as a large
 * magnetic mailto link, and glass-pill social buttons.
 */
export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-36">
        <SectionHeader id="contact-heading" index="05" label="Contact" />

        <Reveal delay={0.1}>
          <p className="chrome-text-animated max-w-4xl font-display text-[clamp(2.5rem,8vw,5.5rem)] font-extrabold leading-[1.02] tracking-tight">
            Let&rsquo;s build something.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <MagneticButton
            href={`mailto:${site.email}`}
            className="group relative mt-10 inline-flex max-w-full items-baseline gap-3 py-2 font-display text-xl font-light tracking-tight text-[var(--fg)] transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:bg-white/25 after:transition-[background-color] after:duration-300 hover:after:bg-white/70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/70 sm:text-2xl md:mt-12 md:text-4xl"
          >
            <span className="break-all">{site.email}</span>
            <span
              aria-hidden
              className="text-[0.6em] text-[var(--fg-muted)] transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
            >
              ↗
            </span>
          </MagneticButton>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-12 flex flex-wrap items-center gap-4 md:mt-16">
            <MagneticButton
              href={site.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="glass inline-flex h-12 items-center justify-center rounded-full px-7 text-sm font-medium tracking-wide text-[var(--fg)] transition-colors duration-300 hover:border-white/30 hover:bg-[var(--glass-fill-hover)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/70"
            >
              GitHub
            </MagneticButton>
            <MagneticButton
              href={site.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="glass inline-flex h-12 items-center justify-center rounded-full px-7 text-sm font-medium tracking-wide text-[var(--fg)] transition-colors duration-300 hover:border-white/30 hover:bg-[var(--glass-fill-hover)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/70"
            >
              LinkedIn
            </MagneticButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
