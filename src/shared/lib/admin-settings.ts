import { readStore, writeStore } from "@/shared/lib/data-store";

export interface AdminSettings {
  email: string;
  password: string;
}

function defaultSettings(): AdminSettings {
  return {
    email: (process.env.ADMIN_EMAIL ?? "admin@taklifnoma.uz").trim().toLowerCase(),
    password: process.env.ADMIN_PASSWORD ?? "taklifnoma2026",
  };
}

export async function getAdminSettings(): Promise<AdminSettings> {
  const stored = await readStore<AdminSettings | null>("admin_settings", null);
  if (!stored?.email || !stored?.password) {
    return defaultSettings();
  }
  return {
    email: stored.email.trim().toLowerCase(),
    password: stored.password,
  };
}

export async function updateAdminPassword(
  currentPassword: string,
  newPassword: string
): Promise<{ ok: true } | { ok: false; error: string }> {
  const settings = await getAdminSettings();

  if (currentPassword !== settings.password) {
    return { ok: false, error: "Joriy parol noto'g'ri" };
  }

  if (newPassword.length < 8) {
    return { ok: false, error: "Yangi parol kamida 8 belgidan iborat bo'lsin" };
  }

  if (newPassword === currentPassword) {
    return { ok: false, error: "Yangi parol joriy paroldan farq qilishi kerak" };
  }

  await writeStore("admin_settings", {
    email: settings.email,
    password: newPassword,
  });

  return { ok: true };
}
