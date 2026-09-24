"use client";

import { useEffect, useRef } from "react";

/**
 * Oversized text laid behind a container's content, revealed only through a
 * soft circle that follows the pointer, so it reads as a spotlight on the
 * ground rather than a banner over the content. Attaches to the nearest
 * positioned parent; touch and pen pointers are ignored (there is no hover).
 * The mask is written straight to the element so tracking never re-renders.
 */
export function SpotlightText({
  text,
  radius = 300,
  strength = 0.4,
}: {
  text: string;
  radius?: number;
  /** Opacity of the revealed text, kept low so content stays legible over it. */
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const host = el?.parentElement;
    if (!el || !host) return;

    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const rect = el.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const mask = `radial-gradient(${radius}px circle at ${x}px ${y}px, black 0%, transparent 100%)`;
      el.style.maskImage = mask;
      el.style.webkitMaskImage = mask;
      el.style.opacity = String(strength);
    };
    const leave = () => {
      el.style.opacity = "0";
    };

    host.addEventListener("pointermove", move);
    host.addEventListener("pointerleave", leave);
    return () => {
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerleave", leave);
    };
  }, [radius, strength]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 flex select-none items-center justify-center overflow-hidden px-4 opacity-0 transition-opacity duration-300"
    >
      <p className="whitespace-nowrap bg-gradient-to-r from-[var(--accent-glow)] via-white to-[var(--accent-light)] bg-clip-text text-center font-display text-6xl font-black uppercase leading-none tracking-tighter text-transparent drop-shadow-[0_0_32px_rgba(179,160,222,0.7)] sm:text-8xl md:text-9xl lg:text-[14vw]">
        {text}
      </p>
    </div>
  );
}
