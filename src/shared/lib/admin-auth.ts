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

export async function verifyAdminRequest(request: NextRequest): Promise<boolean> {
  const password = await getAdminPassword();
  const jar = await cookies();
  const token = jar.get(COOKIE_NAME)?.value;
  if (token === password) return true;
  const header = request.headers.get("x-admin-key");
  return header === password;
}

export const ADMIN_COOKIE_NAME = COOKIE_NAME;
