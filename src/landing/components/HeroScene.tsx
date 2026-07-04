"use client";

/**
 * HeroScene — dekorativ fon (matnni to‘smaydi)
 * Desktop: o‘ng tomonda aniq oltin halqa + kichik shar, sekin aylanadi
 * Mobil: yengil ikosaedr (yoki Hero.tsx CSS glow ishlatadi)
 */

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, PerformanceMonitor } from "@react-three/drei";
import * as THREE from "three";

/** O‘ng tomonda joylashgan, tushunarli oltin halqa */
function DesktopAccentShapes() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group) return;

    group.rotation.y += delta * 0.14;

    // Faqat o‘ng tomonga qaraganda yengil parallaks — markazdagi matnga tegmaydi
    const parallaxX = THREE.MathUtils.clamp(state.pointer.x, 0, 1) * 0.12;
    const parallaxY = state.pointer.y * 0.06;
    group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, parallaxY, 0.04);
    group.rotation.z = THREE.MathUtils.lerp(group.rotation.z, parallaxX * 0.5, 0.04);
  });

  return (
    <group ref={groupRef} position={[1.75, 0.05, 0]} scale={0.68}>
      <Float speed={0.9} rotationIntensity={0.2} floatIntensity={0.35}>
        {/* Aniq shakl: oltin torus halqa */}
        <mesh dispose={null}>
          <torusGeometry args={[0.95, 0.22, 48, 120]} />
          <meshStandardMaterial
            color="#d4af37"
            metalness={0.92}
            roughness={0.18}
            emissive="#6b5212"
            emissiveIntensity={0.1}
            transparent
            opacity={0.82}
          />
        </mesh>
      </Float>

      <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.45}>
        <mesh position={[0.35, 0.55, -0.35]} dispose={null}>
          <sphereGeometry args={[0.22, 32, 32]} />
          <meshStandardMaterial
            color="#c8d0dc"
            metalness={0.85}
            roughness={0.15}
            transparent
            opacity={0.55}
          />
        </mesh>
      </Float>
    </group>
  );
}

function MobileFallbackOrb() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.22;
  });

  return (
    <mesh ref={ref} position={[1.2, 0, 0]} scale={0.55} dispose={null}>
      <torusGeometry args={[0.7, 0.18, 32, 64]} />
      <meshStandardMaterial color="#d4af37" metalness={0.85} roughness={0.25} transparent opacity={0.5} />
    </mesh>
  );
}

function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 4, 5]} intensity={1.1} color="#fff6df" />
      <pointLight position={[2, 1, 3]} intensity={0.5} color="#d4af37" />
    </>
  );
}

function HeroCanvas({ isMobile }: { isMobile: boolean }) {
  const [dpr, setDpr] = useState(1.2);

  return (
    <Canvas
      camera={{ position: [0.6, 0, 5.4], fov: 36 }}
      dpr={isMobile ? 1 : dpr}
      gl={{ antialias: !isMobile, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
    >
      <SceneLights />

      {!isMobile && (
        <PerformanceMonitor
          bounds={() => [30, 58] as [number, number]}
          onDecline={() => setDpr(1)}
          onIncline={() => setDpr(Math.min(1.4, typeof window !== "undefined" ? window.devicePixelRatio : 1.2))}
        />
      )}

      <Suspense fallback={null}>
        {isMobile ? <MobileFallbackOrb /> : <DesktopAccentShapes />}
      </Suspense>
    </Canvas>
  );
}

export default function HeroScene() {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches || window.innerWidth < 768);
    update();
    mq.addEventListener("change", update);
    window.addEventListener("resize", update, { passive: true });
    return () => {
      mq.removeEventListener("change", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return <HeroCanvas isMobile={isMobile} />;
}
