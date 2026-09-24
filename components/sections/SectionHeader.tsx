import { IndexChip } from "@/components/fx/IndexChip";
import { Reveal } from "@/components/fx/Reveal";

/**
 * Shared section heading: numbered chip ("03 / Expertise"), a two-tone
 * headline with the payoff in the accent gradient, and an optional lede.
 * `id` is referenced by the parent section's aria-labelledby.
 */
export function SectionHeader({
  id,
  index,
  label,
  title,
  emphasis,
  lede,
  size = "lg",
  className = "",
}: {
  id: string;
  index: string;
  label: string;
  title: string;
  emphasis?: string;
  lede?: string;
  size?: "lg" | "xl";
  className?: string;
}) {
  const headingSize =
    size === "xl"
      ? "text-4xl md:text-5xl lg:text-6xl"
      : "text-3xl md:text-5xl";

  return (
    <div className={`mb-10 md:mb-12 ${className}`}>
      <Reveal>
        <IndexChip index={index} label={label} className="mb-4 shadow-xs" />
      </Reveal>
      <Reveal delay={0.05}>
        <h2
          id={id}
          className={`font-display font-extrabold leading-[1.1] tracking-tight text-[var(--fg)] ${headingSize}`}
        >
          {title}
          {emphasis && (
            <>
              {" "}
              <span className="accent-text">{emphasis}</span>
            </>
          )}
        </h2>
      </Reveal>
      {lede && (
        <Reveal delay={0.1}>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--fg-muted)] md:text-lg">
            {lede}
          </p>
        </Reveal>
      )}
    </div>
  );
}
