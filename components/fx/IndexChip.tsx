/**
 * Numbered label chip, "01 / Full Stack AI Engineer", used above the hero
 * headline and the projects heading. The index is set in mono, the label in
 * small caps, both on a soft accent wash.
 */
export function IndexChip({
  index,
  label,
  className = "",
}: {
  index: string;
  label: string;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-[var(--glass-border)] bg-[var(--accent-soft)] px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[var(--accent-deep)] ${className}`}
    >
      <span aria-hidden className="font-mono text-[var(--accent)]">
        {index} /
      </span>
      <span>{label}</span>
    </span>
  );
}
