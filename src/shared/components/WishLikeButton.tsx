"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLiteMode } from "@/shared/hooks/useLiteMode";

const STORAGE_KEY = "taklifnoma-liked-wishes";

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

interface WishLikeButtonProps {
  wishId: string;
  initialCount?: number;
  accent?: string;
  className?: string;
  onCountChange?: (count: number) => void;
}

export default function WishLikeButton({
  wishId,
  initialCount = 0,
  accent = "#c9a84c",
  className = "",
  onCountChange,
}: WishLikeButtonProps) {
  const lite = useLiteMode();
  const [count, setCount] = useState(initialCount);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLiked(readLiked().includes(wishId));
  }, [wishId]);

  useEffect(() => {
    setCount(initialCount);
  }, [initialCount]);

  const handleLike = useCallback(async () => {
    if (liked || loading) return;

    setLoading(true);
    try {
      const res = await fetch("/api/wishes/like", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ wishId }),
      });

      if (!res.ok) return;

      const data = (await res.json()) as { likes: number };
      setCount(data.likes);
      setLiked(true);
      saveLiked([...readLiked(), wishId]);
      onCountChange?.(data.likes);
    } finally {
      setLoading(false);
    }
  }, [liked, loading, wishId, onCountChange]);

  const heart = liked ? "♥" : "♡";

  if (lite) {
    return (
      <button
        type="button"
        onClick={handleLike}
        disabled={liked || loading}
        aria-label={liked ? "Yoqtirilgan" : "Yoqtirish"}
        className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs transition ${
          liked ? "cursor-default" : "cursor-pointer hover:opacity-80"
        } ${className}`}
        style={
          liked
            ? { borderColor: `${accent}55`, backgroundColor: `${accent}14`, color: accent }
            : { borderColor: `${accent}30`, color: `${accent}99` }
        }
      >
        <span>{heart}</span>
        <span className="font-medium tabular-nums">{count}</span>
      </button>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={handleLike}
      disabled={liked || loading}
      whileTap={{ scale: 0.92 }}
      aria-label={liked ? "Yoqtirilgan" : "Yoqtirish"}
      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs transition ${
        liked ? "cursor-default" : "cursor-pointer hover:opacity-90"
      } ${className}`}
      style={
        liked
          ? { borderColor: `${accent}55`, backgroundColor: `${accent}14`, color: accent }
          : { borderColor: `${accent}30`, color: `${accent}99` }
      }
    >
      <motion.span animate={{ scale: liked ? [1, 1.25, 1] : 1 }} transition={{ duration: 0.3 }}>
        {heart}
      </motion.span>
      <span className="font-medium tabular-nums">{count}</span>
    </motion.button>
  );
}
