"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { variant9Config } from "../config";

const spring = { type: "spring" as const, stiffness: 300, damping: 22 };

export default function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    audioRef.current = new Audio(variant9Config.musicSrc);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.25;
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
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ ...spring, delay: 0.5 }}
      className="v9-card fixed bottom-6 left-4 z-50 flex items-center gap-3 rounded-2xl px-4 py-2.5 sm:left-6"
    >
      <motion.button
        onClick={toggle}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        transition={spring}
        className="mobile-touch flex h-10 w-10 items-center justify-center rounded-full bg-[#047857]/10"
        aria-label={playing ? "To'xtatish" : "Ijro etish"}
      >
        {playing ? (
          <svg className="h-4 w-4 text-[#047857]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
          </svg>
        ) : (
          <svg className="h-4 w-4 text-[#047857]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </motion.button>
      <div className="min-w-0">
        <p className="text-xs font-medium text-[#065f46]">
          {available ? "Fon musiqasi" : "Musiqa yo'q"}
        </p>
        {playing && (
          <div className="mt-1 flex items-end gap-0.5">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-0.5 rounded-full bg-[#047857]"
                animate={{ height: [3, 10, 5, 12, 3] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.12 }}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
