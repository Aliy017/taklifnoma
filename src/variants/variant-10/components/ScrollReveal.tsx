"use client";

import { motion } from "framer-motion";
import { useLiteMode } from "@/shared/hooks/useLiteMode";
import type { ReactNode } from "react";

const spring = { type: "spring" as const, stiffness: 240, damping: 22 };

export default function ScrollReveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const lite = useLiteMode();
  if (lite) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={spring}
    >
      {children}
    </motion.div>
  );
}
