"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { variant10Config } from "../config";

export default function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    audioRef.current = new Audio(variant10Config.musicSrc);
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

  return (
    <motion.button
      onClick={toggle}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.6 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="v10-card mobile-touch fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#D4AF37]/50 shadow-[0_0_20px_rgba(212,175,55,0.25)]"
      aria-label={playing ? "To'xtatish" : "Ijro etish"}
    >
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#D4AF37]/60 bg-gradient-to-br from-[#fff8f0] to-[#ffe8d8] ${playing ? "v10-vinyl-spin" : "v10-vinyl-paused"}`}
      >
        <div className="h-2.5 w-2.5 rounded-full bg-[#D4AF37]" />
      </div>
    </motion.button>
  );
}
