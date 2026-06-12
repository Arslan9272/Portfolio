"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, MeshDistortMaterial } from "@react-three/drei";
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
        <icosahedronGeometry args={[1, 64]} />
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

export default function ChromeBlobCanvas() {
  return (
    <Canvas
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
        {/* Studio HDR gives the chrome its bright streak reflections. */}
        <Environment preset="studio" />
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
  );
}
