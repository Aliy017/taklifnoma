"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import CouplePlaceholder from "./CouplePlaceholder";

function SceneLoader() {
  return (
    <mesh>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial color="#c0c8d4" wireframe />
    </mesh>
  );
}

export default function Scene3D() {
  return (
    <div className="v6-canvas-wrap v6-glass-glow h-[320px] w-full overflow-hidden sm:h-[400px] md:h-[460px]">
      <Canvas
        camera={{ position: [0, 0.8, 3.5], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[4, 6, 4]} intensity={1.2} />
        <directionalLight position={[-3, 2, -2]} intensity={0.4} color="#4db8e8" />
        <pointLight position={[0, 2, 2]} intensity={0.6} color="#1e88c9" />
        <Suspense fallback={<SceneLoader />}>
          <CouplePlaceholder />
        </Suspense>
      </Canvas>
    </div>
  );
}
