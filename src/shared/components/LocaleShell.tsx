"use client";

import { type ReactNode } from "react";
import { LocaleProvider } from "@/shared/i18n/LocaleContext";
import type { LocaleId } from "@/shared/i18n/types";

export default function LocaleShell({
  defaultLocale = "uz-latin",
  children,
}: {
  defaultLocale?: LocaleId;
  children: ReactNode;
}) {
  return <LocaleProvider defaultLocale={defaultLocale}>{children}</LocaleProvider>;
}
