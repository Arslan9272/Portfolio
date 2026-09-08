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

const LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
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
 * page scrolls. Below md it collapses into a hamburger that opens a
 * full-screen glass overlay with staggered links.
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
            ? "border-b border-[var(--glass-border)] bg-[rgba(5,5,6,0.62)] backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6"
        >
          <a
            href="#top"
            aria-label={`${site.fullName} — back to top`}
            className="group flex items-center gap-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/70"
          >
            <Image
              src="/arslan-avatar.jpg"
              alt=""
              width={128}
              height={128}
              className="h-9 w-9 rounded-full object-cover ring-1 ring-[var(--glass-border)] transition-[box-shadow,transform] duration-300 group-hover:scale-[1.04] group-hover:ring-white/40"
            />
            <span className="chrome-text font-display text-sm font-bold uppercase tracking-[0.32em]">
              {site.name}
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-8 md:flex">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="relative py-2 text-[0.8125rem] tracking-wide text-[var(--fg-muted)] transition-colors duration-300 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-[var(--fg)] after:transition-transform after:duration-300 after:ease-out hover:text-[var(--fg)] hover:after:scale-x-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/70"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Hamburger (mobile) */}
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="relative z-50 -mr-3 flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-[var(--glass-fill)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70 md:hidden"
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
            className="fixed inset-0 z-40 flex flex-col justify-center bg-[rgba(5,5,6,0.92)] backdrop-blur-2xl md:hidden"
          >
            <motion.ul
              variants={menuList}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-2 px-8"
            >
              {LINKS.map((link, index) => (
                <motion.li key={link.href} variants={menuItem}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="group flex items-baseline gap-4 py-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/70"
                  >
                    <span className="font-mono text-xs tracking-[0.2em] text-[var(--fg-faint)]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-4xl font-semibold tracking-tight text-[var(--fg)] transition-colors duration-300 group-hover:text-[var(--fg-muted)]">
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
              className="mt-12 px-8"
            >
              <div className="mb-6 h-px w-full bg-gradient-to-r from-[var(--glass-border)] to-transparent" />
              <a
                href={`mailto:${site.email}`}
                onClick={() => setOpen(false)}
                className="text-sm text-[var(--fg-muted)] transition-colors hover:text-[var(--fg)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/70"
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
