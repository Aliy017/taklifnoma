"use client";
import { useVariantConfig } from "@/shared/hooks/useVariantConfig";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { variant4Config as variant4ConfigBase } from "../config";
import { useLiteMode } from "@/shared/hooks/useLiteMode";

export default function MusicPlayer() {
  const variant4Config = useVariantConfig(variant4ConfigBase);
  const lite = useLiteMode();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    audioRef.current = new Audio(variant4Config.musicSrc);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;
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

  const btn = (
    <button
      onClick={toggle}
      className="v4-glass mobile-touch fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full transition hover:border-[#D4AF37]/50"
      aria-label={playing ? "Musiqani to'xtatish" : "Musiqani yoqish"}
      title={available ? (playing ? "To'xtatish" : "Ijro etish") : "Musiqa fayli topilmadi"}
    >
      <div
        className={`relative flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#D4AF37]/60 bg-[#0A192F] ${playing ? "v4-vinyl-spin" : "v4-vinyl-paused"}`}
      >
        <div className="absolute inset-1 rounded-full border border-[#D4AF37]/30" />
        <div className="h-2.5 w-2.5 rounded-full bg-[#D4AF37]" />
      </div>
    </button>
  );

  if (lite) return btn;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.8 }}
    >
      {btn}
    </motion.div>
  );
}
