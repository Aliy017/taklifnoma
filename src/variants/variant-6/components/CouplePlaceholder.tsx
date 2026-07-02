"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import type { Group } from "three";

/**
 * Placeholder 3D couple scene.
 * GLTF uchun: import { useGLTF } from '@react-three/drei';
 * const { scene } = useGLTF('/models/couple.gltf');
 * return <primitive object={scene} ref={groupRef} />;
 */
export default function CouplePlaceholder() {
  const groupRef = useRef<Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.3}>
      <group ref={groupRef}>
        <mesh position={[0, -0.6, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[1.2, 1.4, 0.15, 32]} />
          <meshStandardMaterial color="#e8ecf2" metalness={0.9} roughness={0.15} />
        </mesh>

        <group position={[-0.45, 0.1, 0]}>
          <mesh position={[0, 0.5, 0]}>
            <capsuleGeometry args={[0.18, 0.5, 8, 16]} />
            <meshStandardMaterial color="#8b9dc3" metalness={0.85} roughness={0.2} />
          </mesh>
          <mesh position={[0, 1.05, 0]}>
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshStandardMaterial color="#c0c8d4" metalness={0.7} roughness={0.25} />
          </mesh>
          <mesh position={[0, 1.18, 0]}>
            <sphereGeometry args={[0.14, 12, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color="#1e88c9" metalness={0.6} roughness={0.3} />
          </mesh>
        </group>

        <group position={[0.45, 0.1, 0]}>
          <mesh position={[0, 0.45, 0]}>
            <capsuleGeometry args={[0.2, 0.55, 8, 16]} />
            <meshStandardMaterial color="#e8ecf2" metalness={0.75} roughness={0.2} />
          </mesh>
          <mesh position={[0, 1.02, 0]}>
            <sphereGeometry args={[0.19, 16, 16]} />
            <meshStandardMaterial color="#c0c8d4" metalness={0.7} roughness={0.25} />
          </mesh>
          <mesh position={[0, 1.05, 0]}>
            <sphereGeometry args={[0.24, 16, 16, 0, Math.PI * 2, 0, Math.PI * 1.6]} />
            <meshStandardMaterial color="#f5f8fc" metalness={0.3} roughness={0.5} />
          </mesh>
        </group>

        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.52, 0]}>
          <torusGeometry args={[1.1, 0.03, 8, 48]} />
          <meshStandardMaterial color="#1e88c9" metalness={0.8} roughness={0.15} emissive="#1e88c9" emissiveIntensity={0.2} />
        </mesh>
      </group>
    </Float>
  );
}
