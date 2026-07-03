"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLiteMode } from "@/shared/hooks/useLiteMode";

interface CoupleFrameProps {
  alt: string;
  priority?: boolean;
}

export default function CoupleFrame({ alt, priority = true }: CoupleFrameProps) {
  const lite = useLiteMode();

  const frame = (
    <div className="v6-portrait-shell mx-auto">
      <div className="v6-portrait-ring pointer-events-none" aria-hidden />
      <div className="v6-portrait-arch">
        <div className="v6-portrait-canvas">
          <Image
            src="/couple/firdavs-marjona.png"
            alt={alt}
            fill
            unoptimized
            priority={priority}
            className="v6-portrait-img object-contain object-bottom"
            sizes="(max-width: 640px) 88vw, 320px"
          />
        </div>
      </div>
      <div className="v6-portrait-base" aria-hidden />
    </div>
  );

  if (lite) return frame;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="v6-portrait-float"
    >
      {frame}
    </motion.div>
  );
}
