import { site } from "@/content/site";
import { Reveal } from "@/components/fx/Reveal";
import { MagneticButton } from "@/components/fx/MagneticButton";
import { SectionHeader } from "./SectionHeader";
import { ContactForm } from "./ContactForm";
import {
  ArrowUpRightIcon,
  DownloadIcon,
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
  PhoneIcon,
} from "@/components/fx/Icons";

const socialPill =
  "glass inline-flex h-12 items-center gap-2.5 rounded-full px-6 text-sm font-medium tracking-wide text-[var(--fg)] transition-colors duration-300 hover:border-[var(--border-strong)] hover:bg-[var(--glass-fill-hover)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-ring)]";

/**
 * Contact — closing CTA. Chrome headline and the direct channels on the left,
 * the Web3Forms message form on the right.
 */
export function Contact({ index = "06" }: { index?: string }) {
  return (
    <section id="contact" aria-labelledby="contact-heading">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-36">
        <SectionHeader id="contact-heading" index={index} label="Get in touch" />

        <Reveal delay={0.1}>
          <p className="chrome-text-animated max-w-4xl font-display text-[clamp(2.25rem,7vw,4.5rem)] font-extrabold leading-[1.02] tracking-tight">
            Let&rsquo;s build something.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--fg-muted)]">
            {site.contactBlurb}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-10 md:mt-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14">
          <div>
            <Reveal delay={0.2}>
              <MagneticButton
                href={`mailto:${site.email}`}
                className="group relative inline-flex max-w-full items-center gap-3 py-2 font-display text-lg font-light tracking-tight text-[var(--fg)] transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:bg-[var(--glass-border)] after:transition-[background-color] after:duration-300 hover:after:bg-[var(--border-strong)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-ring)] sm:text-2xl"
              >
                <MailIcon className="h-5 w-5 shrink-0 text-[var(--fg-muted)]" />
                <span className="[overflow-wrap:anywhere]">{site.email}</span>
                <ArrowUpRightIcon className="h-4 w-4 shrink-0 text-[var(--fg-muted)] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </MagneticButton>
            </Reveal>

            <Reveal delay={0.26}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <MagneticButton
                  href={site.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={socialPill}
                >
                  <GitHubIcon />
                  GitHub
                </MagneticButton>
                <MagneticButton
                  href={site.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={socialPill}
                >
                  <LinkedInIcon />
                  LinkedIn
                </MagneticButton>
                <MagneticButton href={site.resumeUrl} className={socialPill}>
                  <DownloadIcon />
                  Résumé
                </MagneticButton>
              </div>
            </Reveal>

            <Reveal delay={0.32}>
              <dl className="mt-10 grid gap-x-10 gap-y-7 border-t border-[var(--glass-border)] pt-9 sm:grid-cols-2">
                {[
                  {
                    term: "Phone",
                    value: site.phone,
                    href: `tel:${site.phone.replace(/\s+/g, "")}`,
                    icon: <PhoneIcon className="h-3.5 w-3.5" />,
                  },
                  {
                    term: "LinkedIn",
                    value: site.socials.linkedinHandle,
                    href: site.socials.linkedin,
                    icon: <LinkedInIcon className="h-3.5 w-3.5" />,
                  },
                  {
                    term: "GitHub",
                    value: site.socials.githubHandle,
                    href: site.socials.github,
                    icon: <GitHubIcon className="h-3.5 w-3.5" />,
                  },
                  {
                    term: "Email",
                    value: site.email,
                    href: `mailto:${site.email}`,
                    icon: <MailIcon className="h-3.5 w-3.5" />,
                  },
                ].map((row) => (
                  <div key={row.term}>
                    <dt className="flex items-center gap-2 text-[0.6875rem] uppercase tracking-[0.22em] text-[var(--fg-faint)]">
                      {row.icon}
                      {row.term}
                    </dt>
                    <dd className="mt-2">
                      <a
                        href={row.href}
                        className="text-sm text-[var(--fg-muted)] transition-colors duration-300 [overflow-wrap:anywhere] hover:text-[var(--fg)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-ring)]"
                      >
                        {row.value}
                      </a>
                    </dd>
                  </div>
                ))}
                <div className="sm:col-span-2">
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

          <Reveal delay={0.24}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
