import { site } from "@/content/site";

/**
 * Footer — thin glass-border rule, muted copyright, back-to-top anchor.
 */
export function Footer() {
  return (
    <footer className="border-t border-[var(--glass-border)]">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
        <p className="text-xs text-[var(--fg-faint)]">
          © {new Date().getFullYear()} {site.fullName}
        </p>
        <a
          href="#top"
          className="group inline-flex items-center gap-2 py-2 text-[0.6875rem] uppercase tracking-[0.25em] text-[var(--fg-muted)] transition-colors duration-300 hover:text-[var(--fg)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/70"
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
