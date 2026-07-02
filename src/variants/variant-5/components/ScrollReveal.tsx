"use client";

import { motion } from "framer-motion";
import { useLiteMode } from "@/shared/hooks/useLiteMode";
import type { ReactNode } from "react";

const spring = { type: "spring" as const, stiffness: 260, damping: 22 };

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const lite = useLiteMode();

  if (lite) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ ...spring, delay }}
    >
      {children}
    </motion.div>
  );
}
