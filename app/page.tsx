import { Reveal } from "@/components/fx/Reveal";
import { MagneticButton } from "@/components/fx/MagneticButton";

/**
 * Temporary demo page exercising the FX primitives.
 * Section agents replace this with the real hero/sections later.
 * CursorGlow + SmoothScroll are mounted in app/layout.tsx.
 */
export default function Home() {
  return (
    <main className="relative">
      <section
        id="top"
        className="flex min-h-screen flex-col items-center justify-center gap-8 px-6"
      >
        <Reveal>
          <p className="eyebrow text-center">FX primitives demo</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="chrome-text-animated font-display text-center text-7xl font-bold tracking-tight sm:text-8xl">
            ARSLAN
          </h1>
        </Reveal>
        <Reveal delay={0.2} className="flex flex-wrap items-center justify-center gap-4">
          <MagneticButton
            href="#reveal-demo"
            className="glass inline-flex items-center px-6 py-3 text-sm font-medium text-[var(--fg)] transition-colors hover:bg-[var(--glass-fill-hover)]"
          >
            Magnetic anchor — smooth scroll ↓
          </MagneticButton>
          <MagneticButton className="glass inline-flex items-center px-6 py-3 text-sm font-medium text-[var(--fg-muted)] transition-colors hover:bg-[var(--glass-fill-hover)]">
            Magnetic button
          </MagneticButton>
        </Reveal>
      </section>

      <section
        id="reveal-demo"
        className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center gap-6 px-6 py-24"
      >
        <Reveal>
          <p className="eyebrow">Scroll reveals</p>
        </Reveal>
        {[0, 1, 2].map((i) => (
          <Reveal key={i} delay={i * 0.12}>
            <div className="glass p-6">
              <p className="text-sm leading-relaxed text-[var(--fg-muted)]">
                Reveal card {i + 1} — opacity 0→1, y 24→0, staggered by delay.
                Move the cursor to see the silver glow trail; hover the buttons
                above for the magnetic pull.
              </p>
            </div>
          </Reveal>
        ))}
        <Reveal delay={0.4}>
          <MagneticButton
            href="#top"
            className="glass inline-flex items-center px-6 py-3 text-sm font-medium text-[var(--fg)] transition-colors hover:bg-[var(--glass-fill-hover)]"
          >
            Back to top ↑
          </MagneticButton>
        </Reveal>
      </section>
    </main>
  );
}
