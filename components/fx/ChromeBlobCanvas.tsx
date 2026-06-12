"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

/**
 * Slowly spinning, distorting chrome blob. The inner mesh handles the
 * continuous rotation; the outer group lerps toward the pointer for a
 * gentle parallax tilt.
 */
function LiquidChrome() {
  const tiltRef = useRef<THREE.Group>(null);
  const spinRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const spin = spinRef.current;
    if (spin) {
      spin.rotation.y += delta * 0.18;
      spin.rotation.x += delta * 0.055;
    }
    const tilt = tiltRef.current;
    if (tilt) {
      tilt.rotation.x = THREE.MathUtils.lerp(
        tilt.rotation.x,
        state.pointer.y * -0.18,
        0.05
      );
      tilt.rotation.y = THREE.MathUtils.lerp(
        tilt.rotation.y,
        state.pointer.x * 0.24,
        0.05
      );
    }
  });

  return (
    <group ref={tiltRef}>
      <mesh ref={spinRef}>
        <icosahedronGeometry args={[1, 32]} />
        <MeshDistortMaterial
          color="#c9cdd6"
          metalness={1}
          roughness={0.12}
          distort={0.34}
          speed={1.5}
        />
      </mesh>
    </group>
  );
}

/**
 * Network-free stand-in for the old "studio" HDR preset: a handful of
 * Lightformers baked into a small env map. A big soft white softbox above
 * gives the broad streak reflections, a dim cool strip from the side keeps
 * the dark hemisphere falling toward the page's near-black background, and
 * a small hot circle adds the sharp specular ping that sells the chrome.
 */
function StudioEnvironment() {
  return (
    <Environment resolution={256}>
      {/* Large soft key softbox overhead */}
      <Lightformer
        form="rect"
        intensity={3}
        color="#ffffff"
        position={[0, 5, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[10, 10, 1]}
      />
      {/* Dim cool vertical strip from the side */}
      <Lightformer
        form="rect"
        intensity={0.6}
        color="#aab4cc"
        position={[-5, 0, 1]}
        rotation={[0, Math.PI / 2, 0]}
        scale={[2, 8, 1]}
      />
      {/* Small intense highlight for a hard specular ping */}
      <Lightformer
        form="circle"
        intensity={8}
        color="#ffffff"
        position={[3, 3, 4]}
        scale={[0.8, 0.8, 1]}
      />
    </Environment>
  );
}

export default function ChromeBlobCanvas() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  // Pause the render loop entirely while the blob is scrolled off-screen.
  const [frameloop, setFrameloop] = useState<"always" | "never">("always");

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const observer = new IntersectionObserver(([entry]) => {
      setFrameloop(entry.isIntersecting ? "always" : "never");
    });
    observer.observe(wrapper);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapperRef} className="h-full w-full">
      <Canvas
        frameloop={frameloop}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          alpha: true,
        }}
        camera={{ position: [0, 0, 3.1], fov: 42 }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <LiquidChrome />
          {/* Local Lightformer env gives the chrome its streak reflections. */}
          <StudioEnvironment />
        </Suspense>
        {/* Accent lights: hard key for hot highlights, dim cool fill so the
            dark side falls toward the page's near-black background. */}
        <directionalLight position={[4, 5, 3]} intensity={1.4} />
        <directionalLight
          position={[-4, -2, -3]}
          intensity={0.35}
          color="#aab4cc"
        />
        <ambientLight intensity={0.12} />
      </Canvas>
    </div>
  );
}
