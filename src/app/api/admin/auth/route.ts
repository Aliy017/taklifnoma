import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE_NAME, getAdminEmail, getAdminPassword } from "@/shared/lib/admin-auth";
import { handleApiError } from "@/shared/lib/api-error";

const MAX_AGE = 60 * 60 * 24 * 7;

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = String(body.email ?? "").trim().toLowerCase();
    const password = String(body.password ?? "");

    if (email !== getAdminEmail() || password !== getAdminPassword()) {
      return NextResponse.json({ error: "Email yoki parol noto'g'ri" }, { status: 401 });
    }

    const jar = await cookies();
    jar.set(ADMIN_COOKIE_NAME, getAdminPassword(), {
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
  const ok = jar.get(ADMIN_COOKIE_NAME)?.value === getAdminPassword();
  return NextResponse.json({ authenticated: ok });
}
