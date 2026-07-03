import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE_NAME, verifyAdminRequest } from "@/shared/lib/admin-auth";
import { getAdminSettings, updateAdminPassword } from "@/shared/lib/admin-settings";
import { handleApiError } from "@/shared/lib/api-error";

const MAX_AGE = 60 * 60 * 24 * 7;

export const dynamic = "force-dynamic";

export async function PATCH(request: NextRequest) {
  try {
    if (!(await verifyAdminRequest(request))) {
      return NextResponse.json({ error: "Ruxsat yo'q" }, { status: 401 });
    }

    const body = await request.json();
    const currentPassword = String(body.currentPassword ?? "");
    const newPassword = String(body.newPassword ?? "");
    const confirmPassword = String(body.confirmPassword ?? "");

    if (!currentPassword || !newPassword || !confirmPassword) {
      return NextResponse.json({ error: "Barcha maydonlarni to'ldiring" }, { status: 400 });
    }

    if (newPassword !== confirmPassword) {
      return NextResponse.json({ error: "Yangi parollar mos kelmadi" }, { status: 400 });
    }

    const result = await updateAdminPassword(currentPassword, newPassword);
    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    const settings = await getAdminSettings();
    const jar = await cookies();
    jar.set(ADMIN_COOKIE_NAME, settings.password, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: MAX_AGE,
      path: "/",
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    return handleApiError(error);
  }
}
