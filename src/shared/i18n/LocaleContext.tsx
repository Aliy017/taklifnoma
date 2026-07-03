"use client";

import {
  createContext,
  Suspense,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useSearchParams } from "next/navigation";
import type { MessageKey } from "./messages";
import { translate } from "./messages";
import { localizeText } from "./transliterate";
import { parseLocaleParam, localeToQuery, type LocaleId } from "./types";

const STORAGE_KEY = "taklifnoma-locale";

interface LocaleContextValue {
  locale: LocaleId;
  setLocale: (locale: LocaleId) => void;
  t: (key: MessageKey, params?: Record<string, string>) => string;
  localizeName: (name: string) => string;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

function readStoredLocale(): LocaleId | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return parseLocaleParam(stored);
  } catch {
    return null;
  }
}

function LocaleUrlSync({ onLocale }: { onLocale: (locale: LocaleId) => void }) {
  const searchParams = useSearchParams();
  const urlLocale = parseLocaleParam(searchParams.get("lang"));

  useEffect(() => {
    if (urlLocale) onLocale(urlLocale);
  }, [urlLocale, onLocale]);

  return null;
}

export function LocaleProvider({
  defaultLocale = "uz-latin",
  children,
}: {
  defaultLocale?: LocaleId;
  children: ReactNode;
}) {
  // SSR va birinchi client render bir xil bo'lishi uchun faqat defaultLocale
  const [locale, setLocaleState] = useState<LocaleId>(defaultLocale);

  useEffect(() => {
    const stored = readStoredLocale();
    if (stored) setLocaleState(stored);
  }, []);

  const setLocale = useCallback((next: LocaleId) => {
    setLocaleState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
      if (typeof window !== "undefined") {
        const params = new URLSearchParams(window.location.search);
        const q = localeToQuery(next);
        if (q) params.set("lang", q);
        else params.delete("lang");
        const qs = params.toString();
        const url = `${window.location.pathname}${qs ? `?${qs}` : ""}${window.location.hash}`;
        window.history.replaceState(null, "", url);
      }
    } catch {
      /* ignore */
    }
  }, []);

  const t = useCallback(
    (key: MessageKey, params?: Record<string, string>) => translate(locale, key, params),
    [locale]
  );

  const localizeName = useCallback(
    (name: string) => localizeText(name, locale),
    [locale]
  );

  const value = useMemo(
    () => ({ locale, setLocale, t, localizeName }),
    [locale, setLocale, t, localizeName]
  );

  return (
    <LocaleContext.Provider value={value}>
      <Suspense fallback={null}>
        <LocaleUrlSync onLocale={setLocale} />
      </Suspense>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return ctx;
}

export function useLocaleOptional(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  const fallbackLocale: LocaleId = "uz-latin";
  const t = useCallback(
    (key: MessageKey, params?: Record<string, string>) =>
      translate(ctx?.locale ?? fallbackLocale, key, params),
    [ctx?.locale]
  );
  const localizeName = useCallback(
    (name: string) => localizeText(name, ctx?.locale ?? fallbackLocale),
    [ctx?.locale]
  );

  return useMemo(
    () =>
      ctx ?? {
        locale: fallbackLocale,
        setLocale: () => {},
        t,
        localizeName,
      },
    [ctx, t, localizeName]
  );
}
