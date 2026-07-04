"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { ReactLenis } from "lenis/react";

type SmoothScrollMode = "default" | "always";

type SmoothScrollPolicyContextValue = {
  mode: SmoothScrollMode;
  setMode: (mode: SmoothScrollMode) => void;
};

const SmoothScrollPolicyContext = createContext<SmoothScrollPolicyContextValue>({
  mode: "default",
  setMode: () => {},
});

/** v5 kabi og'ir animatsiyali variantlarda mobil + desktop smooth scroll. */
export function useInvitationSmoothScroll(active = true) {
  const { setMode } = useContext(SmoothScrollPolicyContext);

  useEffect(() => {
    if (!active) return;
    setMode("always");
    return () => setMode("default");
  }, [active, setMode]);
}

function useLenisEnabled(mode: SmoothScrollMode) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarse = window.matchMedia("(pointer: coarse)");
    const narrow = window.matchMedia("(max-width: 768px)");

    const update = () => {
      if (reduced.matches) {
        setEnabled(false);
        return;
      }
      if (mode === "always") {
        setEnabled(true);
        return;
      }
      setEnabled(!coarse.matches && !narrow.matches);
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
  }, [mode]);

  return enabled;
}

const defaultLenisOptions = {
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

const invitationLenisOptions = {
  lerp: 0.11,
  smoothWheel: true,
  syncTouch: true,
  wheelMultiplier: 1.02,
  touchMultiplier: 0.95,
  autoRaf: true,
  autoToggle: true,
  allowNestedScroll: true,
  anchors: {
    duration: 0.9,
    offset: -72,
  },
} as const;

function SmoothScrollEngine({
  mode,
  children,
}: {
  mode: SmoothScrollMode;
  children: ReactNode;
}) {
  const lenisEnabled = useLenisEnabled(mode);
  const options = mode === "always" ? invitationLenisOptions : defaultLenisOptions;

  if (!lenisEnabled) {
    return <>{children}</>;
  }

  return (
    <ReactLenis root options={options}>
      {children}
    </ReactLenis>
  );
}

export default function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<SmoothScrollMode>("default");
  const setMode = useCallback((next: SmoothScrollMode) => {
    setModeState(next);
  }, []);

  const policy = useMemo(() => ({ mode, setMode }), [mode, setMode]);

  return (
    <SmoothScrollPolicyContext.Provider value={policy}>
      <SmoothScrollEngine mode={mode}>{children}</SmoothScrollEngine>
    </SmoothScrollPolicyContext.Provider>
  );
}
