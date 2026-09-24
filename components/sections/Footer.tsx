import Image from "next/image";
import { site } from "@/content/site";
import { SpotlightText } from "@/components/fx/SpotlightText";
import {
  ArrowUpIcon,
  ExternalLinkIcon,
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
} from "@/components/fx/Icons";

const NAV = [
  { label: "Home", href: "#top" },
  { label: "Skills & tech", href: "#skills" },
  { label: "Featured work", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "About me", href: "#about" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

const SOCIAL_CARD =
  "group flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-3.5 text-xs font-semibold transition-[border-color,background-color] duration-300 hover:border-white/20 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]";

/**
 * Footer on a deep violet ground: brand block with availability and location,
 * quick navigation, social cards, then the copyright line and a back-to-top
 * button. The name is set huge behind everything and shows through a
 * spotlight that follows the pointer.
 */
export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[var(--footer-bg)] pb-16 pt-16 text-white md:pt-24">
      {/* Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 z-0 h-[400px] w-[1000px] -translate-x-1/2 rounded-full bg-[var(--footer-glow)] blur-[180px]"
      />
      <SpotlightText text={site.name} />

      <div className="relative z-10 mx-auto max-w-6xl space-y-12 px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* Brand */}
          <div className="space-y-5 md:col-span-5">
            <a
              href="#top"
              className="group inline-flex items-center gap-3.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
            >
              <Image
                src="/arslan-avatar.jpg"
                alt=""
                width={128}
                height={128}
                className="h-12 w-12 shrink-0 rounded-full border-2 border-[var(--accent-glow)] object-cover shadow-md transition-colors duration-300 group-hover:border-white md:h-14 md:w-14"
              />
              <span className="flex flex-col">
                <span className="font-display text-xl font-bold leading-tight tracking-tight text-white transition-colors duration-300 group-hover:text-[var(--accent-glow)]">
                  {site.name}
                  <span className="text-[var(--accent-glow)]">.</span>
                </span>
                <span className="mt-0.5 text-xs font-semibold tracking-wide text-[var(--accent-glow)]">
                  {site.role}
                </span>
              </span>
            </a>
            <p className="max-w-sm text-xs leading-relaxed text-white/70 sm:text-sm">
              {site.footerBlurb}
            </p>
            <div className="space-y-1 pt-1 font-mono text-xs text-white/50">
              <p className="flex items-center gap-2">
                <span
                  aria-hidden
                  className="h-2 w-2 animate-pulse rounded-full bg-emerald-400"
                />
                <span>Available for projects &amp; remote roles</span>
              </p>
              <p>📍 {site.location}</p>
            </div>
          </div>

          {/* Quick navigation */}
          <nav aria-label="Footer" className="space-y-3 md:col-span-3">
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent-glow)]">
              Quick navigation
            </p>
            <ul className="space-y-2 text-xs font-medium text-white/80 sm:text-sm">
              {NAV.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="inline-block transition-[color,transform] duration-300 hover:translate-x-1 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Socials */}
          <div className="space-y-4 md:col-span-4">
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent-glow)]">
              Connect &amp; socials
            </p>
            <div className="space-y-2.5">
              <a
                href={site.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className={SOCIAL_CARD}
              >
                <span className="flex items-center gap-3">
                  <GitHubIcon className="h-4 w-4 text-[var(--accent-glow)]" />
                  <span>
                    <span className="block text-white">GitHub</span>
                    <span className="block text-[11px] font-medium text-white/50">
                      @{site.socials.github.split("/").pop()}
                    </span>
                  </span>
                </span>
                <ExternalLinkIcon className="h-3.5 w-3.5 text-white/40 transition-colors duration-300 group-hover:text-white" />
              </a>
              <a
                href={site.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={SOCIAL_CARD}
              >
                <span className="flex items-center gap-3">
                  <LinkedInIcon className="h-4 w-4 text-[var(--accent-glow)]" />
                  <span>
                    <span className="block text-white">LinkedIn</span>
                    <span className="block text-[11px] font-medium text-white/50">
                      {site.fullName}
                    </span>
                  </span>
                </span>
                <ExternalLinkIcon className="h-3.5 w-3.5 text-white/40 transition-colors duration-300 group-hover:text-white" />
              </a>
              <a href={`mailto:${site.email}`} className={SOCIAL_CARD}>
                <span className="flex min-w-0 items-center gap-3">
                  <MailIcon className="h-4 w-4 shrink-0 text-[var(--accent-glow)]" />
                  <span className="min-w-0">
                    <span className="block text-white">Email</span>
                    <span className="block truncate text-[11px] font-medium text-white/50">
                      {site.email}
                    </span>
                  </span>
                </span>
                <ExternalLinkIcon className="h-3.5 w-3.5 shrink-0 text-white/40 transition-colors duration-300 group-hover:text-white" />
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/60 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.fullName}. Designed &amp;
            engineered with precision.
          </p>
          <a
            href="#top"
            className="group inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 font-semibold text-white transition-colors duration-300 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
          >
            Back to top
            <ArrowUpIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
