"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import GlassPanel from "./GlassPanel";
import SparkleHeading from "@/shared/components/SparkleHeading";

const spring = { type: "spring" as const, stiffness: 260, damping: 22 };

interface SectionCardProps {
  id: string;
  icon: ReactNode;
  label: string;
  title: string;
  children: ReactNode;
  className?: string;
  wide?: boolean;
}

export default function SectionCard({
  id,
  icon,
  label,
  title,
  children,
  className = "",
  wide = false,
}: SectionCardProps) {
  return (
    <section id={id} className={`mobile-section relative z-10 scroll-mt-20 px-4 py-12 sm:py-16 ${className}`}>
      <motion.div
        className={`mx-auto ${wide ? "max-w-3xl" : "max-w-2xl"}`}
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={spring}
      >
        <div className="v6-section-shell">
          <div className="v6-section-badge" aria-hidden>
            {icon}
          </div>
          <GlassPanel glow className="v6-section-panel px-5 pb-6 pt-12 sm:px-8 sm:pb-8 sm:pt-14">
            <div className="mb-6 text-center">
              <p className="mb-1 text-[10px] uppercase tracking-[0.35em] text-[#C62828] sm:text-xs">{label}</p>
              <SparkleHeading
                theme="variant-6"
                as="h2"
                intensity="high"
                className="text-xl font-bold sm:text-3xl"
              >
                {title}
              </SparkleHeading>
              <div className="v6-divider mx-auto mt-4 max-w-[72px]" />
            </div>
            {children}
          </GlassPanel>
        </div>
      </motion.div>
    </section>
  );
}
