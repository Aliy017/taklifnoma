import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE_NAME, verifyAdminRequest } from "@/shared/lib/admin-auth";
import { getAdminSettings, updateAdminCredentials } from "@/shared/lib/admin-settings";
import { handleApiError } from "@/shared/lib/api-error";

const MAX_AGE = 60 * 60 * 24 * 7;

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    if (!(await verifyAdminRequest(request))) {
      return NextResponse.json({ error: "Ruxsat yo'q" }, { status: 401 });
    }

    const settings = await getAdminSettings();
    return NextResponse.json({ email: settings.email });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PATCH(request: NextRequest) {
  try {
    if (!(await verifyAdminRequest(request))) {
      return NextResponse.json({ error: "Ruxsat yo'q" }, { status: 401 });
    }

    const body = await request.json();
    const currentPassword = String(body.currentPassword ?? "");
    const newEmail = body.newEmail !== undefined ? String(body.newEmail) : undefined;
    const newPassword = body.newPassword !== undefined ? String(body.newPassword) : undefined;
    const confirmPassword = String(body.confirmPassword ?? "");

    if (!currentPassword) {
      return NextResponse.json({ error: "Joriy parolni kiriting" }, { status: 400 });
    }

    const wantsEmail = newEmail !== undefined && newEmail.trim() !== "";
    const wantsPassword = newPassword !== undefined && newPassword !== "";

    if (!wantsEmail && !wantsPassword) {
      return NextResponse.json({ error: "Yangi email yoki parol kiriting" }, { status: 400 });
    }

    if (wantsPassword) {
      if (!confirmPassword) {
        return NextResponse.json({ error: "Yangi parolni tasdiqlang" }, { status: 400 });
      }
      if (newPassword !== confirmPassword) {
        return NextResponse.json({ error: "Yangi parollar mos kelmadi" }, { status: 400 });
      }
    }

    const result = await updateAdminCredentials({
      currentPassword,
      newEmail: wantsEmail ? newEmail : undefined,
      newPassword: wantsPassword ? newPassword : undefined,
    });

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

    return NextResponse.json({ ok: true, email: result.email });
  } catch (error) {
    return handleApiError(error);
  }
}
