"use client";

import { Component, useSyncExternalStore, type ReactNode } from "react";
import dynamic from "next/dynamic";

/**
 * Pure-CSS stand-in for the 3D blob: a radial-gradient silver orb with a
 * soft glow. Shown while the canvas chunk loads, under
 * prefers-reduced-motion, and whenever WebGL is unavailable or errors.
 */
function FallbackOrb() {
  return (
    <div aria-hidden className="relative h-full w-full">
      <div
        className="absolute inset-[8%] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 32% 28%, #f7f8fa 0%, #cdd1d9 16%, #8b8e96 38%, #45474e 60%, #141518 82%, #050506 100%)",
          boxShadow:
            "0 0 120px 12px var(--glow), inset -24px -28px 64px rgba(0, 0, 0, 0.65), inset 16px 20px 48px rgba(255, 255, 255, 0.16)",
        }}
      />
    </div>
  );
}

class BlobErrorBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}

const ChromeBlobCanvas = dynamic(() => import("./ChromeBlobCanvas"), {
  ssr: false,
  loading: () => <FallbackOrb />,
});

let webglSupport: boolean | null = null;

function supportsWebGL() {
  if (webglSupport === null) {
    try {
      const canvas = document.createElement("canvas");
      webglSupport = Boolean(
        canvas.getContext("webgl2") ?? canvas.getContext("webgl")
      );
    } catch {
      webglSupport = false;
    }
  }
  return webglSupport;
}

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const mql = window.matchMedia(REDUCED_MOTION_QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

function getClientMode(): "3d" | "fallback" {
  const reducedMotion = window.matchMedia(REDUCED_MOTION_QUERY).matches;
  return !reducedMotion && supportsWebGL() ? "3d" : "fallback";
}

/**
 * Liquid chrome 3D hero element with a graceful CSS fallback.
 * Renders the R3F canvas only on capable, motion-friendly clients.
 */
export function ChromeBlob({ className }: { className?: string }) {
  // Server snapshot is "fallback": SSR + first paint show the CSS orb,
  // then capable clients upgrade to the 3D canvas.
  const mode = useSyncExternalStore(
    subscribeReducedMotion,
    getClientMode,
    () => "fallback" as const
  );

  return (
    <div className={className} aria-hidden>
      {mode === "3d" ? (
        <BlobErrorBoundary fallback={<FallbackOrb />}>
          <ChromeBlobCanvas />
        </BlobErrorBoundary>
      ) : (
        <FallbackOrb />
      )}
    </div>
  );
}
