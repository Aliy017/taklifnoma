"use client";
import { useVariantConfig } from "@/shared/hooks/useVariantConfig";

import { useRef, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { variant2Config as variant2ConfigBase } from "../config";
import { useLiteMode } from "@/shared/hooks/useLiteMode";
import SparkleHeading from "@/shared/components/SparkleHeading";

function GalleryItem({ label, gradient, lite }: { label: string; gradient: string; lite: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 180, damping: 26 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 180, damping: 26 });

  const inner = (
    <div
      className={`relative h-full w-full overflow-hidden rounded-2xl border border-[#c0c8d4]/20 bg-gradient-to-br ${gradient} shadow-lg`}
    >
      <div className="absolute inset-0 flex items-end p-4">
        <p className="font-serif text-base text-white sm:text-lg">{label}</p>
      </div>
    </div>
  );

  if (lite) {
    return <div className="aspect-[4/5]">{inner}</div>;
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={(e: MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="perspective-1000 aspect-[4/5]"
    >
      {inner}
    </motion.div>
  );
}

export default function Gallery() {
  const variant2Config = useVariantConfig(variant2ConfigBase);
  const lite = useLiteMode();
  const { gallery } = variant2Config;

  return (
    <section className="mobile-section px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center sm:mb-12">
          <p className="mb-2 text-xs uppercase tracking-[0.35em] text-[#8b9dc3]">Xotiralar</p>
          <SparkleHeading theme="variant-2" as="h2" intensity="high" className="text-2xl font-bold sm:text-4xl">
            Galereya
          </SparkleHeading>
          {!lite && (
            <p className="mt-3 text-sm text-[#c0c8d4]/60">
              Sichqonchani siljiting — 3D chuqurlik effektini his qiling
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-3">
          {gallery.map((item) => (
            <GalleryItem key={item.id} label={item.label} gradient={item.gradient} lite={lite} />
          ))}
        </div>
      </div>
    </section>
  );
}
