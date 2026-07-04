"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Icosahedron, TorusKnot } from "@react-three/drei";
import * as THREE from "three";

/**
 * Kursor bilan boshqariladigan 4D parallaks guruh.
 * Sekin aylanadi va sichqoncha harakatiga yumshoq egiladi (lerp).
 */
function ParallaxRig({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!group.current) return;
    // Bazaviy sekin aylanish
    group.current.rotation.y += delta * 0.12;
    // Kursorga yumshoq egilish (parallaks)
    const targetX = state.pointer.y * 0.25;
    const targetZ = state.pointer.x * 0.2;
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetX, 0.04);
    group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, targetZ, 0.04);
  });

  return <group ref={group}>{children}</group>;
}

function PremiumShapes() {
  return (
    <ParallaxRig>
      {/* Oltin torus knot — metallik hashamat */}
      <Float speed={1.1} rotationIntensity={0.5} floatIntensity={0.7}>
        <TorusKnot args={[0.85, 0.26, 180, 32]} position={[-0.15, 0.1, 0]}>
          <meshStandardMaterial
            color="#d4af37"
            metalness={1}
            roughness={0.18}
            emissive="#7a5a12"
            emissiveIntensity={0.15}
          />
        </TorusKnot>
      </Float>

      {/* Kristallsimon ikosaedr — yorqin shishasimon aksent */}
      <Float speed={1.6} rotationIntensity={0.8} floatIntensity={1.1}>
        <Icosahedron args={[0.6, 0]} position={[1.5, 0.7, -0.6]}>
          <meshStandardMaterial
            color="#dce6ff"
            metalness={0.35}
            roughness={0.08}
            emissive="#2a3a66"
            emissiveIntensity={0.25}
            flatShading
          />
        </Icosahedron>
      </Float>

      {/* Kumushrang shar — yumshoq aksent */}
      <Float speed={2} rotationIntensity={0.4} floatIntensity={1.4}>
        <mesh position={[-1.7, -0.6, -0.4]}>
          <sphereGeometry args={[0.4, 48, 48]} />
          <meshStandardMaterial color="#c0c8d4" metalness={0.9} roughness={0.12} />
        </mesh>
      </Float>
    </ParallaxRig>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 40 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1.4} color="#fff6df" />
      <directionalLight position={[-4, -2, -3]} intensity={0.6} color="#8b9dc3" />
      <pointLight position={[0, 2, 3]} intensity={0.8} color="#d4af37" />
      <Suspense fallback={null}>
        <PremiumShapes />
      </Suspense>
    </Canvas>
  );
}
