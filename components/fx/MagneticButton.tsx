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
 * Props framer-motion redefines with incompatible signatures on motion
 * elements, stripped from the native prop sets before spreading.
 */
type MotionConflicts =
  | "onDrag"
  | "onDragStart"
  | "onDragEnd"
  | "onAnimationStart"
  | "style"
  | "children";

type AnchorVariant = { href: string } & Omit<
  React.ComponentPropsWithoutRef<"a">,
  "href" | MotionConflicts
>;

type ButtonVariant = { href?: undefined } & Omit<
  React.ComponentPropsWithoutRef<"button">,
  MotionConflicts
>;

type MagneticButtonProps = (AnchorVariant | ButtonVariant) & {
  children: React.ReactNode;
  className?: string;
};

/**
 * Children translate toward the cursor while it hovers, then spring back
 * on leave. Renders an <a> when href is given, a <button> otherwise, and
 * forwards all remaining native props (target, rel, aria-*, type,
 * disabled, …) to the underlying element.
 * Disabled entirely under prefers-reduced-motion.
 */
export function MagneticButton(props: MagneticButtonProps) {
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
    style: { x, y },
    onPointerMove: handlePointerMove,
    onPointerLeave: handlePointerLeave,
  };

  if (props.href !== undefined) {
    const { children, ...rest } = props;
    return (
      <motion.a
        ref={ref as React.Ref<HTMLAnchorElement>}
        {...rest}
        {...motionProps}
      >
        {children}
      </motion.a>
    );
  }

  // href is always undefined in this branch; pull it out so it is not
  // spread onto the <button>.
  const { children, href: _href, type, ...rest } = props;
  void _href;
  return (
    <motion.button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={type ?? "button"}
      {...rest}
      {...motionProps}
    >
      {children}
    </motion.button>
  );
}
