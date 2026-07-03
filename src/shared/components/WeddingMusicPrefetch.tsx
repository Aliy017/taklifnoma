"use client";

import { useEffect } from "react";
import { weddingConfig } from "@/shared/config/wedding";
import { prefetchWeddingMusic } from "@/shared/lib/wedding-music-pool";

export default function WeddingMusicPrefetch() {
  useEffect(() => {
    prefetchWeddingMusic(weddingConfig.musicSrc);
  }, []);

  return null;
}
