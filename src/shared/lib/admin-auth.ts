import { cookies } from "next/headers";
import type { NextRequest } from "next/server";

const COOKIE_NAME = "taklifnoma_admin";

export function getAdminPassword() {
  return process.env.ADMIN_PASSWORD ?? "taklifnoma2026";
}

export function getAdminEmail() {
  return process.env.ADMIN_EMAIL ?? "admin@taklifnoma.uz";
}

export async function verifyAdminRequest(request: NextRequest): Promise<boolean> {
  const jar = await cookies();
  const token = jar.get(COOKIE_NAME)?.value;
  if (token === getAdminPassword()) return true;
  const header = request.headers.get("x-admin-key");
  return header === getAdminPassword();
}

export const ADMIN_COOKIE_NAME = COOKIE_NAME;
