"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useLiteMode } from "@/shared/hooks/useLiteMode";

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
  glow?: boolean;
}

const spring = { type: "spring" as const, stiffness: 320, damping: 26 };

export default function GlassPanel({ children, className = "", glow = false }: GlassPanelProps) {
  const lite = useLiteMode();

  if (lite) {
    return (
      <div className={`v6-glass wow-card-interactive rounded-3xl ${glow ? "v6-glass-glow" : ""} ${className}`}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={`v6-glass wow-card-interactive rounded-3xl ${glow ? "v6-glass-glow" : ""} ${className}`}
      whileHover={{ y: -4, scale: 1.008 }}
      transition={spring}
    >
      {children}
    </motion.div>
  );
}
