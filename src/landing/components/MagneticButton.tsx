"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useLandingInteractive } from "../hooks/useLandingInteractive";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  /** Tortilish kuchi (0–1). */
  strength?: number;
  ariaLabel?: string;
}

/**
 * Framer Motion asosidagi magnit tortilish effekti.
 * Touch qurilmalar va reduced-motion rejimida oddiy element bo'lib qoladi.
 */
export default function MagneticButton({
  children,
  className = "",
  strength = 0.4,
  ariaLabel,
}: MagneticButtonProps) {
  const interactive = useLandingInteractive();
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!interactive || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * strength);
    y.set(relY * strength);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      aria-label={ariaLabel}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={interactive ? { x: springX, y: springY } : undefined}
      className={`inline-flex ${className}`}
    >
      {children}
    </motion.div>
  );
}
