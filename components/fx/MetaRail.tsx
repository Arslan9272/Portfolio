/**
 * MetaRail — a subtle, right-aligned vertical metadata device used to fill
 * the empty right column on text-led sections (About, Experience). A thin
 * hairline framed by small vertical mono labels. Decorative only; hidden on
 * mobile and never causes horizontal overflow (it lives inside a relatively
 * positioned, overflow-safe container anchored to the section's right edge).
 */
export function MetaRail({ index, label }: { index: string; label: string }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute right-0 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-4 lg:flex"
    >
      <span className="font-mono text-[0.625rem] tracking-[0.3em] text-[var(--fg-faint)] [writing-mode:vertical-rl]">
        {index} / 05
      </span>
      <span className="h-24 w-px bg-[var(--glass-border)]" />
      <span className="font-mono text-[0.625rem] uppercase tracking-[0.3em] text-[var(--fg-faint)] [writing-mode:vertical-rl]">
        {label}
      </span>
    </div>
  );
}
