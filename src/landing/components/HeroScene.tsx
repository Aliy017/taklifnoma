"use client";

/**
 * HeroScene — premium WebGL fon (matnni to‘smaydi)
 * Desktop: GLSL liquid-gold + scroll bilan torus → yurak morph (#choose ga o‘tishda)
 * Mobil: yengil oltin halqa
 */

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, extend, useFrame, type ThreeElement } from "@react-three/fiber";
import { Float, PerformanceMonitor, shaderMaterial } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

const VERT = /* glsl */ `
  attribute vec3 aStart;
  attribute vec3 aEnd;
  attribute vec3 aStartNormal;
  attribute vec3 aEndNormal;

  uniform float uTime;
  uniform float uMorph;
  uniform float uRippleStrength;
  uniform vec2 uMouse;

  varying vec3 vNormal;
  varying vec3 vViewPosition;
  varying float vFresnelMix;

  void main() {
    vec3 morphed = mix(aStart, aEnd, uMorph);
    vec3 morphedNormal = normalize(mix(aStartNormal, aEndNormal, uMorph));

    vec4 clipPos = projectionMatrix * modelViewMatrix * vec4(morphed, 1.0);
    vec2 ndc = clipPos.xy / clipPos.w;
    vec2 mouseNdc = uMouse * 2.0 - 1.0;
    float dist = length(ndc - mouseNdc);

    float wave = sin(dist * 22.0 - uTime * 4.5) * exp(-dist * 7.5);
    morphed += morphedNormal * wave * uRippleStrength;

    vec4 mvPosition = modelViewMatrix * vec4(morphed, 1.0);
    vViewPosition = -mvPosition.xyz;
    vNormal = normalize(normalMatrix * morphedNormal);

    vec3 viewDir = normalize(vViewPosition);
    vFresnelMix = 1.0 - max(dot(viewDir, vNormal), 0.0);

    gl_Position = projectionMatrix * mvPosition;
  }
`;

const FRAG = /* glsl */ `
  uniform float uTime;

  varying vec3 vNormal;
  varying vec3 vViewPosition;
  varying float vFresnelMix;

  void main() {
    vec3 viewDir = normalize(vViewPosition);

    vec3 goldDeep  = vec3(0.72, 0.55, 0.14);
    vec3 goldMid   = vec3(0.88, 0.72, 0.28);
    vec3 frostEdge = vec3(0.94, 0.96, 1.00);

    float fresnel = pow(vFresnelMix, 2.4);
    vec3 base = mix(goldMid, goldDeep, 0.35 + 0.15 * sin(uTime * 0.6));

    vec3 color = mix(base, frostEdge, fresnel * 0.72);

    vec3 lightDir = normalize(vec3(0.4, 0.9, 1.0));
    float spec = pow(max(dot(reflect(-lightDir, vNormal), viewDir), 0.0), 32.0);
    color += vec3(1.0, 0.95, 0.82) * spec * 0.45;

    float alpha = 0.86 + fresnel * 0.12;
    gl_FragColor = vec4(color, alpha);
  }
`;

const LiquidGoldMaterial = shaderMaterial(
  {
    uTime: 0,
    uMorph: 0,
    uRippleStrength: 0.14,
    uMouse: new THREE.Vector2(0.5, 0.5),
  },
  VERT,
  FRAG
);

extend({ LiquidGoldMaterial });

declare module "@react-three/fiber" {
  interface ThreeElements {
    liquidGoldMaterial: ThreeElement<typeof LiquidGoldMaterial>;
  }
}

function mapToHeart(x: number, y: number, z: number): THREE.Vector3 {
  const len = Math.sqrt(x * x + y * y + z * z) || 1;
  const nx = x / len;
  const ny = y / len;
  const nz = z / len;
  const theta = Math.atan2(ny, nx);

  const heartR = (1.0 - Math.sin(theta)) * 0.42 + 0.32;
  const hx = Math.cos(theta) * heartR * 0.92;
  const hy = (Math.sin(theta) * heartR + Math.abs(Math.cos(theta)) * 0.38 - 0.12) * 0.92;
  const hz = nz * 0.42;

  return new THREE.Vector3(hx * 0.78, hy * 1.22, hz * 0.78);
}

function buildMorphGeometry() {
  const geo = new THREE.TorusKnotGeometry(0.85, 0.26, 200, 32);
  const startPositions = geo.attributes.position.array.slice() as Float32Array;
  const count = geo.attributes.position.count;
  const endPositions = new Float32Array(startPositions.length);

  for (let i = 0; i < count; i++) {
    const x = startPositions[i * 3];
    const y = startPositions[i * 3 + 1];
    const z = startPositions[i * 3 + 2];
    const end = mapToHeart(x, y, z);
    endPositions[i * 3] = end.x;
    endPositions[i * 3 + 1] = end.y;
    endPositions[i * 3 + 2] = end.z;
  }

  geo.setAttribute("aStart", new THREE.BufferAttribute(new Float32Array(startPositions), 3));
  geo.setAttribute("aEnd", new THREE.BufferAttribute(endPositions, 3));

  const startGeo = new THREE.TorusKnotGeometry(0.85, 0.26, 200, 32);
  startGeo.computeVertexNormals();

  const endGeo = new THREE.TorusKnotGeometry(0.85, 0.26, 200, 32);
  endGeo.setAttribute("position", new THREE.BufferAttribute(endPositions, 3));
  endGeo.computeVertexNormals();

  geo.setAttribute("aStartNormal", startGeo.attributes.normal.clone());
  geo.setAttribute("aEndNormal", endGeo.attributes.normal.clone());

  startGeo.dispose();
  endGeo.dispose();

  return geo;
}

function LiquidMorphHero({ scrollProgress }: { scrollProgress: React.RefObject<number> }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<
    THREE.ShaderMaterial & {
      uTime: number;
      uMorph: number;
      uMouse: THREE.Vector2;
      uRippleStrength: number;
    }
  >(null);

  const geometry = useMemo(() => buildMorphGeometry(), []);
  const mouseTarget = useRef(new THREE.Vector2(0.5, 0.5));
  const mouseSmooth = useRef(new THREE.Vector2(0.5, 0.5));
  const morphSmooth = useRef(0);

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame((state, delta) => {
    const mat = matRef.current;
    const mesh = meshRef.current;
    if (!mat || !mesh) return;

    mouseTarget.current.set(state.pointer.x * 0.5 + 0.5, -state.pointer.y * 0.5 + 0.5);
    mouseSmooth.current.x = THREE.MathUtils.lerp(mouseSmooth.current.x, mouseTarget.current.x, 0.08);
    mouseSmooth.current.y = THREE.MathUtils.lerp(mouseSmooth.current.y, mouseTarget.current.y, 0.08);
    mat.uMouse.copy(mouseSmooth.current);

    const targetMorph = scrollProgress.current ?? 0;
    morphSmooth.current = THREE.MathUtils.lerp(morphSmooth.current, targetMorph, 0.06);
    mat.uMorph = morphSmooth.current;

    const pointerDist = Math.hypot(state.pointer.x, state.pointer.y);
    const rippleTarget = THREE.MathUtils.clamp(0.08 + (1 - pointerDist) * 0.12, 0.08, 0.2);
    mat.uRippleStrength = THREE.MathUtils.lerp(mat.uRippleStrength, rippleTarget, 0.1);

    mat.uTime = state.clock.elapsedTime;

    mesh.rotation.y += delta * 0.1;
    mesh.rotation.x = THREE.MathUtils.lerp(mesh.rotation.x, state.pointer.y * 0.18, 0.04);
    mesh.rotation.z = THREE.MathUtils.lerp(mesh.rotation.z, state.pointer.x * 0.14, 0.04);
  });

  return (
    <Float speed={1.05} rotationIntensity={0.35} floatIntensity={0.55}>
      <mesh ref={meshRef} geometry={geometry} dispose={null}>
        <liquidGoldMaterial ref={matRef} key={LiquidGoldMaterial.key} transparent depthWrite={false} />
      </mesh>
    </Float>
  );
}

/** Morph faqat hero → 2-bo‘lim (#choose) o‘tishda */
function useHeroScrollProgress() {
  const scrollProgress = useRef(0);

  useEffect(() => {
    const canvasEl = document.querySelector(".ln-hero-canvas");

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: "#top",
        start: "65% top",
        endTrigger: "#choose",
        end: "top 38%",
        scrub: 0.85,
        onUpdate: (self) => {
          scrollProgress.current = self.progress;
        },
      });

      if (canvasEl) {
        ScrollTrigger.create({
          trigger: "#choose",
          start: "top 55%",
          end: "top 15%",
          onEnter: () => canvasEl.classList.add("ln-hero-canvas--past"),
          onLeaveBack: () => canvasEl.classList.remove("ln-hero-canvas--past"),
        });
      }
    });

    const onScroll = () => ScrollTrigger.update();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      canvasEl?.classList.remove("ln-hero-canvas--past");
      ctx.revert();
    };
  }, []);

  return scrollProgress;
}

function DesktopScene() {
  const scrollProgress = useHeroScrollProgress();
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.04;
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      -scrollProgress.current * 0.28,
      0.06
    );
  });

  return (
    <group ref={groupRef} position={[1.75, 0.05, 0]} scale={0.68}>
      <LiquidMorphHero scrollProgress={scrollProgress} />

      <Float speed={1.6} rotationIntensity={0.35} floatIntensity={0.7}>
        <mesh position={[0.4, 0.45, -0.3]} dispose={null}>
          <sphereGeometry args={[0.32, 36, 36]} />
          <meshStandardMaterial
            color="#e11d48"
            metalness={0.4}
            roughness={0.28}
            emissive="#9f1239"
            emissiveIntensity={0.35}
            transparent
            opacity={0.62}
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
      <pointLight position={[2, 1, 3]} intensity={0.45} color="#d4af37" />
      <pointLight position={[2.5, 0.5, 1]} intensity={0.35} color="#c41e3a" />
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
        {isMobile ? <MobileFallbackOrb /> : <DesktopScene />}
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
