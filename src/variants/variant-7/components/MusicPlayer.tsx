"use client";
import { useVariantConfig } from "@/shared/hooks/useVariantConfig";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { variant7Config as variant7ConfigBase } from "../config";

const spring = { type: "spring" as const, stiffness: 300, damping: 20 };

export default function MusicPlayer() {
  const variant7Config = useVariantConfig(variant7ConfigBase);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    audioRef.current = new Audio(variant7Config.musicSrc);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.28;
    audioRef.current.addEventListener("error", () => setAvailable(false));
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  function toggle() {
    if (!audioRef.current || !available) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play().catch(() => setAvailable(false));
      setPlaying(true);
    }
  }

  return (
    <motion.button
      onClick={toggle}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ ...spring, delay: 0.6 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="v7-glass v7-glass-glow mobile-touch fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full"
      aria-label={playing ? "Musiqani to'xtatish" : "Musiqani yoqish"}
    >
      <div
        className={`relative flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#C9A087]/50 bg-[#FFF5F7] ${playing ? "v7-vinyl-spin" : "v7-vinyl-paused"}`}
      >
        <div className="absolute inset-1 rounded-full border border-[#F8BBD0]/40" />
        <div className="h-2 w-2 rounded-full bg-[#C9A087]" />
      </div>
    </motion.button>
  );
}
