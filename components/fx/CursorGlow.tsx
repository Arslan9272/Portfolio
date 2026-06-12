"use client";

import { useEffect, useRef } from "react";

const LERP = 0.08;

/**
 * Fixed, pointer-events-none radial silver glow that drifts toward the
 * cursor via a rAF lerp loop. Writes transforms directly to the DOM node —
 * zero React re-renders per mousemove. Stays hidden on touch devices and
 * when prefers-reduced-motion is set.
 */
export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = glowRef.current;
    if (!el) return;

    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!finePointer || reducedMotion) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 3;
    let x = targetX;
    let y = targetY;
    let shown = false;
    let rafId = 0;

    const onPointerMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      if (!shown) {
        // Snap to the cursor on first contact so the glow doesn't fly in.
        x = targetX;
        y = targetY;
        shown = true;
        el.style.opacity = "1";
      }
    };

    const onPointerLeave = () => {
      shown = false;
      el.style.opacity = "0";
    };

    const tick = () => {
      x += (targetX - x) * LERP;
      y += (targetY - y) * LERP;
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeave);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener(
        "pointerleave",
        onPointerLeave
      );
    };
  }, []);

  return (
    <div
      ref={glowRef}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[1] h-[36rem] w-[36rem] rounded-full opacity-0 transition-opacity duration-700"
      style={{
        background:
          "radial-gradient(circle, var(--glow) 0%, rgba(220, 225, 235, 0.05) 38%, transparent 70%)",
      }}
    />
  );
}
