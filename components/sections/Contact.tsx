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
        <SectionHeader id="contact-heading" index="06" label="Get in touch" />

        <Reveal delay={0.1}>
          <p className="chrome-text-animated max-w-4xl font-display text-[clamp(2.5rem,8vw,5.5rem)] font-extrabold leading-[1.02] tracking-tight">
            Let&rsquo;s build something.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--fg-muted)]">
            Open to AI engineering roles — remote or on site.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <MagneticButton
            href={`mailto:${site.email}`}
            className="group relative mt-10 inline-flex max-w-full items-baseline gap-3 py-2 font-display text-xl font-light tracking-tight text-[var(--fg)] transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:bg-white/25 after:transition-[background-color] after:duration-300 hover:after:bg-white/70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/70 sm:text-2xl md:mt-12 md:text-4xl"
          >
            <span className="[overflow-wrap:anywhere]">{site.email}</span>
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
            <MagneticButton
              href={site.resumeUrl}
              className="glass inline-flex h-12 items-center justify-center rounded-full px-7 text-sm font-medium tracking-wide text-[var(--fg)] transition-colors duration-300 hover:border-white/30 hover:bg-[var(--glass-fill-hover)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/70"
            >
              Résumé ↓
            </MagneticButton>
          </div>
        </Reveal>

        <Reveal delay={0.35}>
          <dl className="mt-16 grid gap-x-10 gap-y-8 border-t border-[var(--glass-border)] pt-10 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { term: "Email", value: site.email, href: `mailto:${site.email}` },
              {
                term: "Phone",
                value: site.phone,
                href: `tel:${site.phone.replace(/\s+/g, "")}`,
              },
              {
                term: "LinkedIn",
                value: site.socials.linkedinHandle,
                href: site.socials.linkedin,
              },
              {
                term: "GitHub",
                value: site.socials.githubHandle,
                href: site.socials.github,
              },
            ].map((row) => (
              <div key={row.term}>
                <dt className="text-[0.6875rem] uppercase tracking-[0.22em] text-[var(--fg-faint)]">
                  {row.term}
                </dt>
                <dd className="mt-2">
                  <a
                    href={row.href}
                    className="text-sm text-[var(--fg-muted)] transition-colors duration-300 [overflow-wrap:anywhere] hover:text-[var(--fg)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/70"
                  >
                    {row.value}
                  </a>
                </dd>
              </div>
            ))}
            <div className="sm:col-span-2 lg:col-span-4">
              <dt className="text-[0.6875rem] uppercase tracking-[0.22em] text-[var(--fg-faint)]">
                Availability
              </dt>
              <dd className="mt-2 text-sm text-[var(--fg-muted)]">
                {site.availability}
              </dd>
            </div>
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
