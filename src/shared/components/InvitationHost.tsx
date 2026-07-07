"use client";

import { useEffect, type ComponentType } from "react";
import type { ClientWeddingContextValue } from "@/shared/lib/client-wedding";
import type { TemplateId } from "@/admin/types";
import type { InvitationSide } from "@/shared/lib/client-invitations";
import { WeddingProvider } from "@/shared/context/WeddingContext";
import LocaleShell from "@/shared/components/LocaleShell";

import Variant1Page from "@/variants/variant-1";
import Variant2Page from "@/variants/variant-2";
import Variant3Page from "@/variants/variant-3";
import Variant4Page from "@/variants/variant-4";
import Variant5Page from "@/variants/variant-5";
import Variant6Page from "@/variants/variant-6";
import Variant7Page from "@/variants/variant-7";
import Variant8Page from "@/variants/variant-8";
import Variant9Page from "@/variants/variant-9";
import Variant10Page from "@/variants/variant-10";
import Variant11Page from "@/variants/variant-11";

import "@/variants/variant-1/styles.css";
import "@/variants/variant-2/styles.css";
import "@/variants/variant-3/styles.css";
import "@/variants/variant-4/styles.css";
import "@/variants/variant-5/styles.css";
import "@/variants/variant-6/styles.css";
import "@/variants/variant-7/styles.css";
import "@/variants/variant-8/styles.css";
import "@/variants/variant-9/styles.css";
import "@/variants/variant-10/styles.css";
import "@/variants/variant-11/styles.css";

const VARIANT_PAGES: Record<TemplateId, ComponentType> = {
  "variant-1": Variant1Page,
  "variant-2": Variant2Page,
  "variant-3": Variant3Page,
  "variant-4": Variant4Page,
  "variant-5": Variant5Page,
  "variant-6": Variant6Page,
  "variant-7": Variant7Page,
  "variant-8": Variant8Page,
  "variant-9": Variant9Page,
  "variant-10": Variant10Page,
  "variant-11": Variant11Page,
};

interface InvitationHostProps {
  context: ClientWeddingContextValue;
  templateId: TemplateId;
  invitationSide?: InvitationSide;
}

export default function InvitationHost({
  context,
  templateId,
  invitationSide,
}: InvitationHostProps) {
  const Page = VARIANT_PAGES[templateId] ?? Variant6Page;

  useEffect(() => {
    if (!invitationSide) return;
    fetch(`/api/clients/${context.clientSlug}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ side: invitationSide }),
    }).catch(() => {});
  }, [context.clientSlug, invitationSide]);

  return (
    <LocaleShell defaultLocale={context.defaultLocale}>
      <WeddingProvider value={context}>
        <Page />
      </WeddingProvider>
    </LocaleShell>
  );
}
