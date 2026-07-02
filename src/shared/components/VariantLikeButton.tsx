"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";

const STORAGE_KEY = "taklifnoma-liked-variants";

function readLiked(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function saveLiked(ids: string[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
}

interface VariantLikeButtonProps {
  variantId: string;
  initialCount?: number;
  size?: "sm" | "md";
  accent?: string;
  className?: string;
  onCountChange?: (count: number) => void;
}

export default function VariantLikeButton({
  variantId,
  initialCount = 0,
  size = "md",
  accent = "#c9a84c",
  className = "",
  onCountChange,
}: VariantLikeButtonProps) {
  const [count, setCount] = useState(initialCount);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [burst, setBurst] = useState(false);

  useEffect(() => {
    setLiked(readLiked().includes(variantId));
  }, [variantId]);

  useEffect(() => {
    setCount(initialCount);
  }, [initialCount]);

  const handleLike = useCallback(async () => {
    if (liked || loading) return;

    setLoading(true);
    setBurst(true);
    setTimeout(() => setBurst(false), 600);

    try {
      const res = await fetch("/api/likes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ variantId }),
      });

      if (!res.ok) return;

      const data = (await res.json()) as { count: number };
      const next = data.count;
      setCount(next);
      setLiked(true);
      saveLiked([...readLiked(), variantId]);
      onCountChange?.(next);
    } finally {
      setLoading(false);
    }
  }, [liked, loading, variantId, onCountChange]);

  const isSm = size === "sm";

  return (
    <button
      type="button"
      onClick={handleLike}
      disabled={liked || loading}
      aria-label={liked ? "Yoqtirilgan" : "Yoqtirish"}
      className={`group relative inline-flex items-center gap-1.5 rounded-full border transition-all ${
        liked
          ? "cursor-default border-white/15 bg-white/10"
          : "cursor-pointer border-white/10 bg-white/5 hover:border-white/25 hover:bg-white/10"
      } ${isSm ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm"} ${className}`}
      style={liked ? { borderColor: `${accent}55`, backgroundColor: `${accent}18` } : undefined}
    >
      <motion.span
        animate={burst ? { scale: [1, 1.35, 1] } : { scale: 1 }}
        transition={{ duration: 0.35 }}
        className={liked ? "" : "group-hover:scale-110 transition-transform"}
        style={{ color: liked ? accent : undefined }}
      >
        {liked ? "♥" : "♡"}
      </motion.span>
      <span className={liked ? "font-medium" : "text-white/70"} style={liked ? { color: accent } : undefined}>
        {count}
      </span>
    </button>
  );
}

export function getLikedVariantIds(): string[] {
  return readLiked();
}
