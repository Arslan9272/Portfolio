"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { site } from "@/content/site";
import { ThemeToggle } from "@/components/fx/ThemeToggle";
import { DownloadIcon, GitHubIcon, LinkedInIcon } from "@/components/fx/Icons";

const LINKS = [
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const EASE = [0.22, 1, 0.36, 1] as const;

const menuList = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.12 } },
};

const menuItem = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE },
  },
};

/**
 * Fixed top navigation. Transparent over the hero, frosted glass once the
 * page scrolls. Carries the theme switch and the résumé download on every
 * breakpoint; below lg the links collapse into a full-screen glass overlay.
 */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 40);
  });

  // Body scroll lock while the mobile menu is open.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`transition-[background-color,border-color,backdrop-filter] duration-500 ${
          scrolled
            ? "border-b border-[var(--glass-border)] bg-[var(--nav-scrim)] backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-6"
        >
          <a
            href="#top"
            aria-label={`${site.fullName} — back to top`}
            className="group flex shrink-0 items-center gap-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-ring)]"
          >
            <Image
              src="/arslan-avatar.jpg"
              alt=""
              width={128}
              height={128}
              className="h-9 w-9 rounded-full object-cover ring-1 ring-[var(--glass-border)] transition-[box-shadow,transform] duration-300 group-hover:scale-[1.04] group-hover:ring-[var(--border-strong)]"
            />
            <span className="chrome-text font-display text-sm font-bold uppercase tracking-[0.32em]">
              {site.name}
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-7 lg:flex">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="relative py-2 text-[0.8125rem] tracking-wide text-[var(--fg-muted)] transition-colors duration-300 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-[var(--fg)] after:transition-transform after:duration-300 after:ease-out hover:text-[var(--fg)] hover:after:scale-x-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-ring)]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <ThemeToggle />

            <a
              href={site.resumeUrl}
              download
              className="glass hidden h-10 items-center gap-2 rounded-full px-5 text-[0.8125rem] font-medium tracking-wide text-[var(--fg)] transition-colors duration-300 hover:border-[var(--border-strong)] hover:bg-[var(--glass-fill-hover)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-ring)] sm:inline-flex"
            >
              <DownloadIcon className="h-3.5 w-3.5" />
              Resume
            </a>

            {/* Hamburger (below lg) */}
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="relative z-50 -mr-3 flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-[var(--glass-fill)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)] lg:hidden"
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              <span aria-hidden className="relative block h-3 w-5">
                <motion.span
                  animate={open ? { rotate: 45, y: 5.5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="absolute left-0 top-0 block h-px w-5 bg-[var(--fg)]"
                />
                <motion.span
                  animate={open ? { rotate: -45, y: -5.5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="absolute bottom-0 left-0 block h-px w-5 bg-[var(--fg)]"
                />
              </span>
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            data-lenis-prevent
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.25 } }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-40 flex flex-col justify-center overflow-y-auto bg-[var(--overlay-scrim)] py-24 backdrop-blur-2xl lg:hidden"
          >
            <motion.ul
              variants={menuList}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-1 px-8"
            >
              {LINKS.map((link, index) => (
                <motion.li key={link.href} variants={menuItem}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="group flex items-baseline gap-4 py-2.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-ring)]"
                  >
                    <span className="font-mono text-xs tracking-[0.2em] text-[var(--fg-faint)]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-3xl font-semibold tracking-tight text-[var(--fg)] transition-colors duration-300 group-hover:text-[var(--fg-muted)] sm:text-4xl">
                      {link.label}
                    </span>
                  </a>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              variants={menuItem}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.5 }}
              className="mt-10 px-8"
            >
              <div className="mb-6 h-px w-full bg-gradient-to-r from-[var(--glass-border)] to-transparent" />

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={site.resumeUrl}
                  download
                  onClick={() => setOpen(false)}
                  className="glass inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm font-medium text-[var(--fg)] transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--glass-fill-hover)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-ring)]"
                >
                  <DownloadIcon className="h-4 w-4" />
                  Resume
                </a>
                <a
                  href={site.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="glass inline-flex h-11 w-11 items-center justify-center rounded-full text-[var(--fg-muted)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--fg)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-ring)]"
                >
                  <GitHubIcon />
                </a>
                <a
                  href={site.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="glass inline-flex h-11 w-11 items-center justify-center rounded-full text-[var(--fg-muted)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--fg)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-ring)]"
                >
                  <LinkedInIcon />
                </a>
              </div>

              <a
                href={`mailto:${site.email}`}
                onClick={() => setOpen(false)}
                className="mt-6 inline-block text-sm text-[var(--fg-muted)] transition-colors hover:text-[var(--fg)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-ring)]"
              >
                {site.email}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
