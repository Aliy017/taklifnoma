"use client";

import { useEffect, useState } from "react";

/**
 * Faqat fine-pointer (sichqoncha) va reduced-motion o'chirilgan desktopda `true`.
 * Telefon/planshet (touch) va iOS-da og'ir 3D/magnit effektlar o'chadi — FPS barqaror.
 */
export function useLandingInteractive() {
  const [interactive, setInteractive] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const wide = window.matchMedia("(min-width: 1024px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => {
      setInteractive(fine.matches && wide.matches && !reduced.matches);
    };

    update();
    fine.addEventListener("change", update);
    wide.addEventListener("change", update);
    reduced.addEventListener("change", update);
    return () => {
      fine.removeEventListener("change", update);
      wide.removeEventListener("change", update);
      reduced.removeEventListener("change", update);
    };
  }, []);

  return interactive;
}
