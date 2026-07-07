"use client";

import { useWeddingMusic } from "@/shared/hooks/useWeddingMusic";

/** Sahifa ochilishi bilanoq fon musiqasini ishga tushirish (barcha variantlar). */
export default function WeddingMusicAutoplay() {
  useWeddingMusic({ autoPlay: true });
  return null;
}
