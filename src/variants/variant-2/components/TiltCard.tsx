"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useLiteMode } from "@/shared/hooks/useLiteMode";
import HexSurface from "./HexSurface";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  glow?: boolean;
}

export default function TiltCard({ children, className = "", glow = false }: TiltCardProps) {
  const lite = useLiteMode();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 28 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 28 });

  function updateTilt(clientX: number, clientY: number) {
    if (!ref.current || lite) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((clientX - rect.left) / rect.width - 0.5);
    y.set((clientY - rect.top) / rect.height - 0.5);
  }

  const card = (
    <HexSurface
      variant={glow ? "glow" : "default"}
      bodyClassName="v2-tilt-card p-5 sm:p-7"
    >
      {children}
    </HexSurface>
  );

  if (lite) {
    return <div className={className}>{card}</div>;
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={(e: MouseEvent<HTMLDivElement>) => updateTilt(e.clientX, e.clientY)}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`perspective-1000 ${className}`}
    >
      {card}
    </motion.div>
  );
}
