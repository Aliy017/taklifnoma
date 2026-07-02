"use client";

import { motion } from "framer-motion";
import { variant6Config } from "../config";
import GlassPanel from "./GlassPanel";
import SparkleHeading from "@/shared/components/SparkleHeading";

const spring = { type: "spring" as const, stiffness: 260, damping: 22 };

export default function About() {
  const { about, groom, bride } = variant6Config;

  return (
    <section id="about" className="mobile-section relative z-10 px-4 py-16">
      <motion.div
        className="mx-auto max-w-2xl"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={spring}
      >
        <GlassPanel glow className="p-8 sm:p-10">
          <p className="mb-2 text-xs uppercase tracking-[0.3em] text-[#1E88C9]">{about.title}</p>
          <SparkleHeading theme="variant-6" as="h2" intensity="high" className="mb-6 text-2xl font-bold sm:text-3xl">
            {groom}
            <span className="mx-2">&amp;</span>
            {bride}
          </SparkleHeading>
          {about.paragraphs.map((p, i) => (
            <p key={i} className="mb-4 text-sm leading-relaxed v6-silver-text sm:text-base">
              {p}
            </p>
          ))}
        </GlassPanel>
      </motion.div>
    </section>
  );
}
