import { site } from "@/content/site";
import { Reveal } from "@/components/fx/Reveal";
import { SectionGlow } from "@/components/fx/SectionGlow";
import { MagneticButton } from "@/components/fx/MagneticButton";
import { SectionHeader } from "./SectionHeader";
import { ContactForm } from "./ContactForm";
import {
  ArrowUpRightIcon,
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
  PhoneIcon,
} from "@/components/fx/Icons";

const socialPill =
  "inline-flex h-12 items-center gap-2.5 rounded-full border border-[var(--accent-border)] bg-[var(--accent-light)] px-6 text-sm font-semibold tracking-wide text-[var(--fg)] transition-[background-color,border-color,box-shadow] duration-300 hover:border-[var(--accent)] hover:bg-[var(--accent-soft)] hover:shadow-[var(--accent-shadow)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-ring)]";

// Resume left the hero, so here it is the primary action of the row
const primaryPill =
  "accent-button inline-flex h-12 items-center gap-2.5 rounded-full px-6 text-sm font-bold tracking-wide transition-[box-shadow] duration-300 hover:shadow-[var(--accent-shadow-hover)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-ring)]";

/**
 * Contact, closing CTA. Chrome headline and the direct channels on the left,
 * the message form on the right.
 */
export function Contact({ index = "06" }: { index?: string }) {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative overflow-hidden border-t border-[var(--glass-border)]"
    >
      <SectionGlow side="left" />
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-24 md:py-36">
        <SectionHeader
          id="contact-heading"
          index={index}
          label="Get in touch"
          title="Let's build"
          emphasis="together"
          lede={site.contactBlurb}
          size="xl"
        />

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14">
          <div>
            <Reveal delay={0.2}>
              <MagneticButton
                href={`mailto:${site.email}`}
                className="group relative inline-flex max-w-full items-center gap-3 py-2 font-display text-lg font-light tracking-tight text-[var(--fg)] transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:bg-[var(--accent-border)] after:transition-[background-color] after:duration-300 hover:text-[var(--accent-deep)] hover:after:bg-[var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-ring)] sm:text-2xl"
              >
                <MailIcon className="h-5 w-5 shrink-0 text-[var(--accent)]" />
                <span className="[overflow-wrap:anywhere]">{site.email}</span>
                <ArrowUpRightIcon className="h-4 w-4 shrink-0 text-[var(--accent)] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
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
                <MagneticButton
                  href={site.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={primaryPill}
                >
                  <ArrowUpRightIcon className="h-4 w-4" />
                  Resume
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
                      <span className="text-[var(--accent)]">{row.icon}</span>
                      {row.term}
                    </dt>
                    <dd className="mt-2">
                      <a
                        href={row.href}
                        className="text-sm font-medium text-[var(--fg)] underline decoration-[var(--accent-border)] underline-offset-4 transition-colors duration-300 [overflow-wrap:anywhere] hover:text-[var(--accent-deep)] hover:decoration-[var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-ring)]"
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
