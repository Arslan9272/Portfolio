import { site } from "@/content/site";
import { GitHubIcon, LinkedInIcon, MailIcon } from "@/components/fx/Icons";

const iconLink =
  "inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--glass-border)] bg-[var(--glass-fill)] text-[var(--fg-muted)] transition-colors duration-300 hover:border-[var(--border-strong)] hover:text-[var(--fg)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]";

/**
 * Footer, thin glass-border rule, muted copyright, social icons and a
 * back-to-top anchor.
 */
export function Footer() {
  return (
    <footer className="border-t border-[var(--glass-border)]">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 py-8 sm:flex-row">
        <p className="text-xs text-[var(--fg-faint)]">
          © {new Date().getFullYear()} {site.fullName}
        </p>

        <div className="flex items-center gap-3">
          <a
            href={site.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className={iconLink}
          >
            <GitHubIcon />
          </a>
          <a
            href={site.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className={iconLink}
          >
            <LinkedInIcon />
          </a>
          <a
            href={`mailto:${site.email}`}
            aria-label={`Email ${site.name}`}
            className={iconLink}
          >
            <MailIcon />
          </a>
        </div>

        <a
          href="#top"
          className="group inline-flex items-center gap-2 py-2 text-[0.6875rem] uppercase tracking-[0.25em] text-[var(--fg-muted)] transition-colors duration-300 hover:text-[var(--fg)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-ring)]"
        >
          Back to top
          <span
            aria-hidden
            className="inline-block transition-transform duration-300 group-hover:-translate-y-0.5"
          >
            ↑
          </span>
        </a>
      </div>
    </footer>
  );
}
