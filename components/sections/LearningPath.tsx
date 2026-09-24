"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import { site } from "@/content/site";

type Geometry = {
  d: string;
  height: number;
  length: number;
  stops: number[]; // fraction of the path at which each stage is reached
};

const SAMPLES = 240;

/**
 * Learning path, an S-shaped snake weaving between staggered stage
 * boxes, oldest at the tail. The body draws with scroll and the head
 * travels along it, lighting each stage as it passes, then comes to
 * rest below the latest stage: where the learning is right now.
 *
 * The path is measured from the rendered boxes, so it follows whatever
 * height their content wraps to.
 */
export function LearningPath() {
  const stages = site.learningPath;
  const reduce = useReducedMotion();

  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<SVGPathElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const boxRefs = useRef<(HTMLLIElement | null)[]>([]);

  const [geom, setGeom] = useState<Geometry | null>(null);
  const [reached, setReached] = useState(0);
  const [arrived, setArrived] = useState(false);

  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ["start 0.85", "end 0.7"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  const measure = useCallback(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    if (!root || !track) return;

    const frame = root.getBoundingClientRect();
    const boxes = boxRefs.current.map((box) => box!.getBoundingClientRect());

    // Each anchor sits in the free lane beside its box, so the body
    // swings from one side to the other between stages.
    const anchors = boxes.map((b, i) => ({
      x: i % 2 === 0 ? (b.right - frame.left + frame.width) / 2 : (b.left - frame.left) / 2,
      y: b.top - frame.top + b.height / 2,
    }));

    const first = boxes[0];
    const last = anchors[anchors.length - 1];
    const lastBox = boxes[boxes.length - 1];
    const end = { x: frame.width / 2, y: lastBox.bottom - frame.top + 44 };

    let d = `M ${anchors[0].x} ${first.top - frame.top}`;
    d += ` L ${anchors[0].x} ${anchors[0].y}`;
    for (let i = 1; i < anchors.length; i++) {
      const a = anchors[i - 1];
      const b = anchors[i];
      const k = (b.y - a.y) * 0.55;
      d += ` C ${a.x} ${a.y + k} ${b.x} ${b.y - k} ${b.x} ${b.y}`;
    }
    const k = (end.y - last.y) * 0.7;
    d += ` C ${last.x} ${last.y + k} ${end.x} ${end.y - k * 0.4} ${end.x} ${end.y}`;

    track.setAttribute("d", d);
    const length = track.getTotalLength();

    // Nearest sample to each anchor gives the fraction where it is reached.
    const samples = Array.from({ length: SAMPLES + 1 }, (_, s) =>
      track.getPointAtLength((s / SAMPLES) * length),
    );
    const stops = anchors.map((a) => {
      let best = 0;
      let bestDist = Infinity;
      samples.forEach((p, s) => {
        const dist = (p.x - a.x) ** 2 + (p.y - a.y) ** 2;
        if (dist < bestDist) {
          bestDist = dist;
          best = s;
        }
      });
      return best / SAMPLES;
    });

    setGeom({ d, height: frame.height, length, stops });
  }, []);

  useLayoutEffect(() => {
    measure();
    const root = rootRef.current;
    if (!root) return;
    const observer = new ResizeObserver(() => measure());
    observer.observe(root);
    return () => observer.disconnect();
  }, [measure]);

  const place = useCallback(
    (v: number) => {
      const track = trackRef.current;
      const head = headRef.current;
      if (!geom || !track || !head) return;
      const p = track.getPointAtLength(v * geom.length);
      head.style.transform = `translate(${p.x}px, ${p.y}px)`;
      const count = geom.stops.filter((stop) => v >= stop - 0.005).length;
      setReached((r) => (r === count ? r : count));
      setArrived(v > 0.985);
    },
    [geom],
  );

  useMotionValueEvent(progress, "change", (v) => {
    if (!reduce) place(v);
  });

  useEffect(() => {
    place(reduce ? 1 : progress.get());
  }, [place, reduce, progress]);

  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--fg-faint)]">
        Learning path
      </p>
      <h3 className="mt-3 font-display text-lg font-semibold tracking-tight">
        Still growing
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-[var(--fg-muted)]">
        {site.learningPathLede}
      </p>

      <div ref={rootRef} className="relative mt-10 pb-20">
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
        >
          <defs>
            <linearGradient
              id="learning-path-body"
              gradientUnits="userSpaceOnUse"
              x1="0"
              y1="0"
              x2="0"
              y2={geom?.height ?? 1}
            >
              <stop offset="0" style={{ stopColor: "var(--accent-light)" }} />
              <stop offset="0.35" style={{ stopColor: "var(--accent-glow)" }} />
              <stop offset="1" style={{ stopColor: "var(--accent)" }} />
            </linearGradient>
          </defs>
          {/* the route ahead of the head */}
          <path
            ref={trackRef}
            d={geom?.d}
            fill="none"
            strokeWidth={2}
            strokeDasharray="3 7"
            strokeLinecap="round"
            style={{ stroke: "var(--border-strong)", opacity: 0.5 }}
          />
          {/* the body */}
          {geom && (
            <motion.path
              d={geom.d}
              fill="none"
              strokeWidth={9}
              strokeLinecap="round"
              style={{
                stroke: "url(#learning-path-body)",
                pathLength: reduce ? 1 : progress,
                filter: "drop-shadow(0 0 6px var(--glow))",
              }}
            />
          )}
        </svg>

        <ol className="relative space-y-12">
          {stages.map((stage, i) => {
            const lit = reduce || i < reached;
            const current = i === stages.length - 1;
            return (
              <li
                key={stage.label}
                ref={(el) => {
                  boxRefs.current[i] = el;
                }}
                className={`relative w-[76%] ${i % 2 === 1 ? "ml-auto" : ""}`}
              >
                <div
                  className={`glass-card bg-[var(--bg-elevated)] p-4 transition-[opacity,border-color] duration-500 ${
                    lit ? "border-[var(--accent-border)] opacity-100" : "opacity-75"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[11px] tracking-[0.2em] text-[var(--fg-faint)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {current && (
                      <span className="rounded-full bg-[var(--accent-soft)] px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--accent)]">
                        Now
                      </span>
                    )}
                  </div>
                  <h4 className="mt-2 font-display text-sm font-semibold leading-snug tracking-tight">
                    {stage.label}
                  </h4>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {stage.skills.map((skill) => (
                      <li
                        key={skill}
                        className="rounded-md border border-[var(--glass-border)] bg-[var(--bg)] px-2 py-0.5 text-[11px] text-[var(--fg)]"
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            );
          })}
        </ol>

        {/* the head */}
        <div
          ref={headRef}
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 z-10 transition-opacity duration-300"
          style={{ opacity: geom ? 1 : 0 }}
        >
          <div className="relative -translate-x-1/2 -translate-y-1/2">
            <span className="absolute inset-0 animate-ping rounded-full bg-[var(--accent-glow)] motion-reduce:animate-none" />
            <span className="relative block h-5 w-5 rounded-full border-[3px] border-[var(--bg-elevated)] bg-[var(--accent)] shadow-[0_0_0_4px_var(--accent-light),0_0_18px_var(--glow)]" />
          </div>
          <span
            className={`absolute left-1/2 top-4 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--accent)] transition-opacity duration-500 ${
              arrived ? "opacity-100" : "opacity-0"
            }`}
          >
            You are here
          </span>
        </div>
      </div>
    </div>
  );
}
