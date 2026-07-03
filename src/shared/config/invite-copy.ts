"use client";

import { useMemo } from "react";
import { useLocale } from "@/shared/i18n/LocaleContext";
export function useInviteCopy() {
  const { t, localizeName } = useLocale();

  return useMemo(
    () => ({
      inviteJourney: t("invite.journey"),
      inviteWedding: t("invite.wedding"),
      inviteBlessing: t("invite.blessing"),
      inviteHearts: (groom: string, bride: string) =>
        t("invite.hearts", {
          groom: localizeName(groom),
          bride: localizeName(bride),
        }),
      inviteAboutParagraphs: (groom: string, bride: string) => {
        const g = localizeName(groom);
        const b = localizeName(bride);
        return [t("invite.hearts", { groom: g, bride: b }), t("invite.wedding")];
      },
    }),
    [t, localizeName]
  );
}

// Legacy exports for server/config usage
export const INVITE_JOURNEY =
  "Alloh taolo ularning yo'llarini birlashtirdi. Endi ular hayotning eng go'zal sayohatiga — oila qurishga qadam qo'ymoqda. Bu baxtli kunda bizning yonimizda bo'lib, duo qilib bering.";

export const INVITE_WEDDING =
  "To'y — yangi hayotning pok va muqaddas boshlanishi. Bu baxtli kunda sizni sharafli mehmon sifatida kutamiz.";

export function inviteHearts(groom: string, bride: string) {
  return `${groom} va ${bride} — ikki yurak, bitta yo'l. Alloh taolo ularning qadamlarini birlashtirdi.`;
}

export function inviteAboutParagraphs(groom: string, bride: string) {
  return [inviteHearts(groom, bride), INVITE_WEDDING];
}
