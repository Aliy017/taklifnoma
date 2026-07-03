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
import { useSearchParams } from "next/navigation";
import type { MessageKey } from "./messages";
import { translate } from "./messages";
import { localizeText } from "./transliterate";
import { parseLocaleParam, type LocaleId } from "./types";

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

export function LocaleProvider({
  defaultLocale = "uz-latin",
  children,
}: {
  defaultLocale?: LocaleId;
  children: ReactNode;
}) {
  const searchParams = useSearchParams();
  const urlLocale = parseLocaleParam(searchParams.get("lang"));

  const [locale, setLocaleState] = useState<LocaleId>(() => {
    return urlLocale ?? readStoredLocale() ?? defaultLocale;
  });

  useEffect(() => {
    if (urlLocale) setLocaleState(urlLocale);
  }, [urlLocale]);

  useEffect(() => {
    setLocaleState((prev) => {
      if (urlLocale) return urlLocale;
      const stored = readStoredLocale();
      if (stored) return stored;
      return prev ?? defaultLocale;
    });
  }, [defaultLocale, urlLocale]);

  const setLocale = useCallback((next: LocaleId) => {
    setLocaleState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
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

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return ctx;
}
