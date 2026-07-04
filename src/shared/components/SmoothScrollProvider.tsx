"use client";

import { useEffect, useState } from "react";
import { ReactLenis } from "lenis/react";

/** Desktop fine-pointer only — touch/mobil native scroll (tezroq, FPS barqaror). */
function useLenisEnabled() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarse = window.matchMedia("(pointer: coarse)");
    const narrow = window.matchMedia("(max-width: 768px)");

    const update = () => {
      setEnabled(!reduced.matches && !coarse.matches && !narrow.matches);
    };

    update();
    reduced.addEventListener("change", update);
    coarse.addEventListener("change", update);
    narrow.addEventListener("change", update);
    return () => {
      reduced.removeEventListener("change", update);
      coarse.removeEventListener("change", update);
      narrow.removeEventListener("change", update);
    };
  }, []);

  return enabled;
}

const lenisOptions = {
  lerp: 0.18,
  smoothWheel: true,
  syncTouch: false,
  wheelMultiplier: 1.08,
  touchMultiplier: 1,
  autoRaf: true,
  autoToggle: true,
  allowNestedScroll: true,
  anchors: {
    duration: 0.75,
    offset: 0,
  },
} as const;

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisEnabled = useLenisEnabled();

  if (!lenisEnabled) {
    return <>{children}</>;
  }

  return (
    <ReactLenis root options={lenisOptions}>
      {children}
    </ReactLenis>
  );
}
