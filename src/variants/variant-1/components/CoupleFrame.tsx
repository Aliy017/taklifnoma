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
    <div className="v1-portrait-shell mx-auto">
      <div className="v1-portrait-hex pointer-events-none" aria-hidden />
      <div className="v1-portrait-stage">
        <Image
          src="/couple/firdavs-marjona.png"
          alt={alt}
          width={571}
          height={1024}
          unoptimized
          priority={priority}
          className="v1-portrait-img"
          sizes="(max-width: 640px) 78vw, 280px"
        />
        <span className="v1-portrait-gap-mask" aria-hidden />
      </div>
      <div className="v1-portrait-base" aria-hidden />
    </div>
  );

  if (lite) return frame;

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75 }}
      className="v1-portrait-float"
    >
      {frame}
    </motion.div>
  );
}
