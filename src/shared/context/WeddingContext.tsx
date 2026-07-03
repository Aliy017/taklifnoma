"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { ClientWeddingContextValue } from "@/shared/lib/client-wedding";

const WeddingContext = createContext<ClientWeddingContextValue | null>(null);

export function WeddingProvider({
  value,
  children,
}: {
  value: ClientWeddingContextValue;
  children: ReactNode;
}) {
  return <WeddingContext.Provider value={value}>{children}</WeddingContext.Provider>;
}

export function useWeddingContext() {
  return useContext(WeddingContext);
}

export function useClientSlug(): string | undefined {
  return useContext(WeddingContext)?.clientSlug;
}
