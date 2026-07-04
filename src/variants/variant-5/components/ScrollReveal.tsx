"use client";

import { motion } from "framer-motion";
import { useLiteMode } from "@/shared/hooks/useLiteMode";
import type { ReactNode } from "react";

const spring = { type: "spring" as const, stiffness: 260, damping: 22 };
const premiumSpring = { type: "spring" as const, stiffness: 220, damping: 20 };

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  premium = false,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  premium?: boolean;
}) {
  const lite = useLiteMode();

  if (lite) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={
        premium
          ? { opacity: 0, y: 40, scale: 0.94, filter: "blur(6px)" }
          : { opacity: 0, y: 32 }
      }
      whileInView={
        premium
          ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
          : { opacity: 1, y: 0 }
      }
      viewport={{ once: true, margin: "-50px" }}
      transition={{ ...(premium ? premiumSpring : spring), delay }}
    >
      {children}
    </motion.div>
  );
}
