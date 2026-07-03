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
