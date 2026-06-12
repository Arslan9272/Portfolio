"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";

const STRENGTH = 0.32;
const MAX_OFFSET = 18;
const SPRING = { stiffness: 240, damping: 16, mass: 0.6 };

function clamp(value: number, limit: number) {
  return Math.min(limit, Math.max(-limit, value));
}

/**
 * Children translate toward the cursor while it hovers, then spring back
 * on leave. Renders an <a> when href is given, a <button> otherwise.
 * Disabled entirely under prefers-reduced-motion.
 */
export function MagneticButton({
  children,
  className,
  href,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const reducedMotion = useReducedMotion();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, SPRING);
  const y = useSpring(my, SPRING);

  const handlePointerMove = (event: React.PointerEvent) => {
    const el = ref.current;
    if (!el || reducedMotion || event.pointerType !== "mouse") return;
    const rect = el.getBoundingClientRect();
    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);
    mx.set(clamp(dx * STRENGTH, MAX_OFFSET));
    my.set(clamp(dy * STRENGTH, MAX_OFFSET));
  };

  const handlePointerLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const motionProps = {
    className,
    style: { x, y },
    onPointerMove: handlePointerMove,
    onPointerLeave: handlePointerLeave,
  };

  if (href) {
    return (
      <motion.a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        onClick={onClick}
        {...motionProps}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as React.Ref<HTMLButtonElement>}
      type="button"
      onClick={onClick}
      {...motionProps}
    >
      {children}
    </motion.button>
  );
}
