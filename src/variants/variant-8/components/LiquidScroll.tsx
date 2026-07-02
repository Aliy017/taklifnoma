"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useLiteMode } from "@/shared/hooks/useLiteMode";
import type { ReactNode } from "react";

const liquid = { type: "spring" as const, stiffness: 180, damping: 26, mass: 0.8 };

export default function LiquidScroll({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const lite = useLiteMode();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -20]);
  const opacity = useTransform(scrollYProgress, [0, 0.15], [1, 0.97]);

  if (lite) {
    return (
      <motion.div
        className={className}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6 }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      style={{ y, opacity }}
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={liquid}
    >
      {children}
    </motion.div>
  );
}
