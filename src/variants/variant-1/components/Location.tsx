"use client";

import { motion } from "framer-motion";
import GlassCard from "./GlassCard";
import VenueSection from "@/shared/components/VenueSection";
import { useLiteMode } from "@/shared/hooks/useLiteMode";

export default function Location() {
  const lite = useLiteMode();
  const content = (
    <GlassCard>
      <VenueSection theme="variant-1" />
    </GlassCard>
  );

  return (
    <section className="mobile-section relative px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl">
        {lite ? (
          content
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            {content}
          </motion.div>
        )}
      </div>
    </section>
  );
}
