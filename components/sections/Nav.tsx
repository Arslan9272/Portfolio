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
import {
  ArrowUpRightIcon,
  GitHubIcon,
  LinkedInIcon,
} from "@/components/fx/Icons";

const LINKS = [
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "About", href: "#about" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

const EASE = [0.22, 1, 0.36, 1] as const;

const FOCUS =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]";

/* Round icon button shared by the theme toggle's neighbours. */
const ICON_BUTTON = `glass items-center justify-center rounded-full text-[var(--fg-muted)] transition-colors duration-300 hover:border-[var(--accent-border)] hover:bg-[var(--glass-fill-hover)] hover:text-[var(--fg)] ${FOCUS}`;

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
 * Fixed top navigation in three zones: brand on the left, the section
 * links in a floating pill in the centre, socials / résumé
 * on the right. Over the hero only the link pill has a surface; once the
 * page scrolls the whole bar tightens into a single frosted pill with a
 * violet-tinted shadow. Below lg the links collapse into a full-screen
 * overlay.
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
    <header
      className={`fixed inset-x-0 top-0 z-50 px-4 transition-[padding] duration-500 ease-out sm:px-6 ${
        scrolled ? "pt-3" : "pt-4 sm:pt-5"
      }`}
    >
      <div
        className={`mx-auto flex items-center justify-between gap-4 rounded-full border transition-[max-width,padding,background-color,border-color,box-shadow] duration-500 ease-out ${
          scrolled
            ? "max-w-5xl border-[var(--glass-border)] bg-[var(--nav-scrim-solid)] py-2 pl-2 pr-2 shadow-[var(--nav-shadow)] backdrop-blur-xl sm:pl-3 sm:pr-3"
            : "max-w-6xl border-transparent bg-transparent py-0 pl-0 pr-0"
        }`}
      >
        {/* Brand */}
        <a
          href="#top"
          aria-label={`${site.fullName}, back to top`}
          className={`group flex shrink-0 items-center gap-3 rounded-full ${FOCUS}`}
        >
          <Image
            src="/arslan-avatar.jpg"
            alt=""
            width={128}
            height={128}
            className="h-10 w-10 rounded-full object-cover ring-2 ring-[var(--glass-border)] transition-[box-shadow,transform] duration-300 group-hover:scale-[1.04] group-hover:ring-[var(--accent-border)]"
          />
          <span className="flex flex-col">
            <span className="font-display text-[0.9375rem] font-bold leading-tight tracking-tight text-[var(--fg)] transition-colors duration-300 group-hover:text-[var(--accent)]">
              {site.name}
            </span>
            <span className="mt-0.5 text-[0.6875rem] font-medium leading-none text-[var(--fg-faint)]">
              {site.role}
            </span>
          </span>
        </a>

        {/* Desktop links, a floating pill until the bar itself becomes one */}
        <nav aria-label="Primary" className="hidden lg:block">
          <ul
            className={`flex items-center gap-1 rounded-full border transition-[background-color,border-color,box-shadow,padding] duration-500 ease-out ${
              scrolled
                ? "border-transparent bg-transparent px-0 py-0"
                : "border-[var(--glass-border)] bg-[var(--nav-scrim)] px-2 py-1.5 shadow-[var(--nav-shadow)] backdrop-blur-xl"
            }`}
          >
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`block rounded-full px-3.5 py-1.5 text-[0.8125rem] font-medium text-[var(--fg-muted)] transition-colors duration-300 hover:bg-[var(--accent-soft)] hover:text-[var(--fg)] ${FOCUS}`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right cluster */}
        <div className="flex shrink-0 items-center gap-2">
          <a
            href={site.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className={`hidden h-10 w-10 xl:inline-flex ${ICON_BUTTON}`}
          >
            <GitHubIcon className="h-4 w-4" />
          </a>
          <a
            href={site.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className={`hidden h-10 w-10 xl:inline-flex ${ICON_BUTTON}`}
          >
            <LinkedInIcon className="h-4 w-4" />
          </a>

          <a
            href={site.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`accent-button hidden h-10 items-center gap-2 rounded-full px-5 text-[0.8125rem] font-semibold tracking-wide transition-[box-shadow,transform] duration-300 hover:-translate-y-px hover:shadow-[var(--accent-shadow-hover)] sm:inline-flex ${FOCUS}`}
          >
            Resume
            <ArrowUpRightIcon className="h-3.5 w-3.5" />
          </a>

          {/* Hamburger (below lg) */}
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className={`relative z-50 flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-[var(--glass-fill)] lg:hidden ${FOCUS}`}
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
      </div>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
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
                    className={`group flex items-baseline gap-4 py-2.5 ${FOCUS}`}
                  >
                    <span className="font-mono text-xs tracking-[0.2em] text-[var(--accent)]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-3xl font-semibold tracking-tight text-[var(--fg)] transition-colors duration-300 group-hover:text-[var(--accent)] sm:text-4xl">
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
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className={`accent-button inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm font-semibold ${FOCUS}`}
                >
                  Resume
                  <ArrowUpRightIcon className="h-4 w-4" />
                </a>
                <a
                  href={site.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className={`inline-flex h-11 w-11 ${ICON_BUTTON}`}
                >
                  <GitHubIcon />
                </a>
                <a
                  href={site.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className={`inline-flex h-11 w-11 ${ICON_BUTTON}`}
                >
                  <LinkedInIcon />
                </a>
              </div>

              <a
                href={`mailto:${site.email}`}
                onClick={() => setOpen(false)}
                className={`mt-6 inline-block text-sm text-[var(--fg-muted)] transition-colors hover:text-[var(--accent)] ${FOCUS}`}
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
