"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { site } from "@/content/site";
import { CodeIcon } from "@/components/fx/Icons";

/** Fired on window when the intro curtain starts lifting. */
export const INTRO_DONE = "intro:done";

const MIN_MS = 2200; // one full count from 0 to 100
const MAX_MS = 3400; // never hold the page longer than this
const EXIT_MS = 800;

// The intro's state lives on <html data-intro>: "playing" until the curtain
// lifts, then "done"; "skip" when this session has already seen it.
type IntroState = "playing" | "done" | "skip";

function subscribe(onChange: () => void) {
  window.addEventListener(INTRO_DONE, onChange);
  return () => window.removeEventListener(INTRO_DONE, onChange);
}

function useIntroState(): IntroState {
  return useSyncExternalStore(
    subscribe,
    () => (document.documentElement.dataset.intro as IntroState) ?? "done",
    () => "playing",
  );
}

/**
 * True once the intro has lifted (or was skipped), so entrance animations
 * play as the page is revealed rather than behind the curtain.
 */
export function useIntroDone() {
  return useIntroState() !== "playing";
}

// Status line under the counter, by progress reached
const STATUS: [number, string][] = [
  [0.15, "Initializing experience..."],
  [0.45, "Loading projects & assets..."],
  [0.8, "Compiling the stack..."],
  [1, "Almost there..."],
];

// Ease out, so the count races early and settles near 100
const ease = (t: number) => 1 - Math.pow(1 - t, 2.2);

/**
 * Full-screen intro: signature name, a large percentage count with a status
 * line and progress bar, framed by corner labels, then a curtain lift.
 * It is server-rendered so it covers the page from the first paint, waits
 * for the hero portrait so the photo is already there on reveal, and plays
 * once per session (layout.tsx marks repeat visits with data-intro="skip").
 */
export function Intro() {
  const state = useIntroState();
  const [gone, setGone] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (state !== "playing") return;
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const minMs = reduce ? 300 : MIN_MS;
    const start = performance.now();

    let portraitReady = false;
    const portrait = document.querySelector<HTMLImageElement>("img[data-hero-portrait]");
    if (!portrait || (portrait.complete && portrait.naturalWidth > 0)) {
      portraitReady = true;
    } else {
      const ready = () => {
        portraitReady = true;
      };
      portrait.addEventListener("load", ready, { once: true });
      portrait.addEventListener("error", ready, { once: true });
    }

    let frame = 0;
    const tick = () => {
      const elapsed = performance.now() - start;
      // Creep towards 90% while the photo loads, then run to 100%
      const target = portraitReady
        ? ease(Math.min(1, elapsed / minMs))
        : Math.min(0.9, ease(elapsed / MAX_MS));
      setProgress((value) => Math.max(value, target));

      if ((portraitReady && elapsed >= minMs) || elapsed >= MAX_MS) {
        setProgress(1);
        try {
          sessionStorage.setItem("intro-seen", "1");
        } catch {}
        root.dataset.intro = "done";
        window.dispatchEvent(new Event(INTRO_DONE));
        return;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [state]);

  // Unmount once the curtain has finished lifting
  useEffect(() => {
    if (state !== "done") return;
    const timer = window.setTimeout(() => setGone(true), EXIT_MS);
    return () => window.clearTimeout(timer);
  }, [state]);

  if (gone || state === "skip") return null;

  const lifting = state === "done";
  const percent = Math.round(progress * 100);
  const status =
    percent >= 100 ? "Ready." : (STATUS.find(([limit]) => progress < limit) ?? STATUS[3])[1];

  return (
    <div
      aria-hidden
      className={`intro fixed inset-0 z-[100] overflow-hidden bg-[var(--bg)] bg-[radial-gradient(ellipse_at_center,color-mix(in_srgb,var(--brand-fill-deep)_24%,var(--bg))_0%,var(--bg)_72%)] transition-transform duration-[800ms] ease-[cubic-bezier(0.76,0,0.24,1)] motion-reduce:transition-opacity ${
        lifting ? "-translate-y-full motion-reduce:translate-y-0 motion-reduce:opacity-0" : ""
      }`}
    >
      {/* Soft violet glow behind the centre */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--blob-peach)] blur-[140px]" />

      <div className="relative flex h-full flex-col px-6 py-8 sm:px-12 sm:py-10">
        {/* Corner labels */}
        <div className="flex items-center justify-between gap-4 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--fg-muted)] sm:text-xs">
          <span className="flex items-center gap-2 whitespace-nowrap">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            {site.name}
          </span>
          <span className="hidden items-center gap-2 sm:flex">
            <CodeIcon className="h-4 w-4 text-[var(--accent)]" />
            {site.role}
          </span>
        </div>

        {/* Centre */}
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <p className="font-signature text-5xl text-[var(--fg)] sm:text-6xl">
            {site.name}.
          </p>
          <p className="mt-4 text-xs font-bold uppercase tracking-[0.35em] text-[var(--accent-deep)] sm:text-sm">
            Portfolio experience
          </p>
          <p className="chrome-text mt-8 font-display text-7xl font-extrabold tabular-nums tracking-tight sm:text-9xl">
            {percent}%
          </p>
          <p className="mt-8 font-mono text-sm text-[var(--fg-muted)]">{status}</p>
          <div className="mt-6 h-1 w-64 overflow-hidden rounded-full bg-[var(--glass-border)] sm:w-[28rem]">
            <div
              className="h-full rounded-full bg-[image:var(--accent-fill)] shadow-[0_0_12px_var(--glow)]"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-4 border-t border-[var(--glass-border)] pt-5 font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--fg-faint)] sm:text-xs">
          <span className="whitespace-nowrap sm:hidden">PU &bull; BSCS</span>
          <span className="hidden sm:inline">University of the Punjab &bull; BSCS</span>
          <span className="whitespace-nowrap">{new Date().getFullYear()} Edition</span>
        </div>
      </div>
    </div>
  );
}
