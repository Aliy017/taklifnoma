"use client";

import { Suspense, type ReactNode } from "react";
import { LocaleProvider } from "@/shared/i18n/LocaleContext";
import type { LocaleId } from "@/shared/i18n/types";

function LocaleProviderInner({
  defaultLocale,
  children,
}: {
  defaultLocale?: LocaleId;
  children: ReactNode;
}) {
  return <LocaleProvider defaultLocale={defaultLocale}>{children}</LocaleProvider>;
}

export default function LocaleShell({
  defaultLocale = "uz-latin",
  children,
}: {
  defaultLocale?: LocaleId;
  children: ReactNode;
}) {
  return (
    <Suspense fallback={children}>
      <LocaleProviderInner defaultLocale={defaultLocale}>{children}</LocaleProviderInner>
    </Suspense>
  );
}
