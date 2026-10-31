import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  ADMIN_COOKIE_NAME,
  adminSessionToken,
  getAdminEmail,
  getAdminPassword,
  isAdminSessionValid,
  safeEqual,
} from "@/shared/lib/admin-auth";
import { handleApiError } from "@/shared/lib/api-error";

const MAX_AGE = 60 * 60 * 24 * 7;

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = String(body.email ?? "").trim().toLowerCase();
    const password = String(body.password ?? "");
    const adminEmail = await getAdminEmail();
    const adminPassword = await getAdminPassword();

    // Parol/email o'rnatilmagan bo'lsa login yopiq; solishtirish vaqt bo'yicha xavfsiz.
    if (
      !adminEmail ||
      !adminPassword ||
      !safeEqual(email, adminEmail) ||
      !safeEqual(password, adminPassword)
    ) {
      return NextResponse.json({ error: "Email yoki parol noto'g'ri" }, { status: 401 });
    }

    const jar = await cookies();
    // Cookie'da xom parol emas, HMAC sessiya tokeni saqlanadi.
    jar.set(ADMIN_COOKIE_NAME, adminSessionToken(adminPassword), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: MAX_AGE,
      path: "/",
    });

    return NextResponse.json({ ok: true, email });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE() {
  const jar = await cookies();
  jar.delete(ADMIN_COOKIE_NAME);
  return NextResponse.json({ ok: true });
}

export async function GET() {
  const jar = await cookies();
  const ok = await isAdminSessionValid(jar.get(ADMIN_COOKIE_NAME)?.value);
  return NextResponse.json({ authenticated: ok });
}
