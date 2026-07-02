"use client";

import { useEffect, useState } from "react";

function detectLiteMode() {
  if (typeof window === "undefined") return true;
  return (
    window.matchMedia("(max-width: 768px)").matches ||
    window.matchMedia("(pointer: coarse)").matches ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/** Telefon va past quvvatli qurilmalar uchun yengil rejim */
export function useLiteMode() {
  const [lite, setLite] = useState(true);

  useEffect(() => {
    const update = () => setLite(detectLiteMode());
    update();

    const queries = [
      window.matchMedia("(max-width: 768px)"),
      window.matchMedia("(pointer: coarse)"),
      window.matchMedia("(prefers-reduced-motion: reduce)"),
    ];

    queries.forEach((mq) => mq.addEventListener("change", update));
    return () => queries.forEach((mq) => mq.removeEventListener("change", update));
  }, []);

  return lite;
}
