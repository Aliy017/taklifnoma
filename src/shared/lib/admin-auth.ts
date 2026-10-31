import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { getAdminSettings } from "@/shared/lib/admin-settings";

const COOKIE_NAME = "taklifnoma_admin";

export async function getAdminPassword() {
  const settings = await getAdminSettings();
  return settings.password;
}

export async function getAdminEmail() {
  const settings = await getAdminSettings();
  return settings.email;
}

/** Vaqt bo'yicha xavfsiz solishtirish — har ikki tomonning sha256 digesti ustida. */
export function safeEqual(a: string, b: string): boolean {
  const ha = createHash("sha256").update(a).digest();
  const hb = createHash("sha256").update(b).digest();
  return timingSafeEqual(ha, hb);
}

/** Sessiya cookie tokeni — cookie'da xom parol saqlanmasligi uchun HMAC. */
export function adminSessionToken(password: string): string {
  return createHmac("sha256", password).update("taklifnoma-admin-session-v1").digest("hex");
}

/**
 * Berilgan token joriy paroldan hosil qilingan sessiya tokeniga mos keladimi.
 * Parol o'rnatilmagan yoki token bo'lmasa — yaroqsiz.
 * Parol o'zgarsa, eski token avtomatik yaroqsiz bo'ladi (HMAC kaliti parol).
 */
export async function isAdminSessionValid(token: string | undefined | null): Promise<boolean> {
  const password = await getAdminPassword();
  if (!password || !token) return false;
  return safeEqual(token, adminSessionToken(password));
}

export async function verifyAdminRequest(request: NextRequest): Promise<boolean> {
  const password = await getAdminPassword();
  if (!password) return false;

  const jar = await cookies();
  const token = jar.get(COOKIE_NAME)?.value;
  if (token && (await isAdminSessionValid(token))) return true;

  const header = request.headers.get("x-admin-key");
  if (header) return safeEqual(header, password);
  return false;
}

export const ADMIN_COOKIE_NAME = COOKIE_NAME;
