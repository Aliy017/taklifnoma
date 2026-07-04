"use client";

import { useEffect } from "react";
import { useLenis } from "lenis/react";

/** Pause Lenis while overlays/modals lock body scroll. */
export function useLenisScrollLock(locked: boolean) {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis || !locked) return;
    lenis.stop();
    return () => {
      lenis.start();
    };
  }, [lenis, locked]);
}
