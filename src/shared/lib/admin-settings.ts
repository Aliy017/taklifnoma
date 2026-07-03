import { readStore, writeStore } from "@/shared/lib/data-store";

export interface AdminSettings {
  email: string;
  password: string;
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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
  return updateAdminCredentials({ currentPassword, newPassword });
}

export async function updateAdminCredentials(input: {
  currentPassword: string;
  newEmail?: string;
  newPassword?: string;
}): Promise<{ ok: true; email: string } | { ok: false; error: string }> {
  const settings = await getAdminSettings();

  if (!settings.password) {
    return { ok: false, error: "Admin hisobi sozlanmagan. ADMIN_EMAIL va ADMIN_PASSWORD o'rnating." };
  }

  if (input.currentPassword !== settings.password) {
    return { ok: false, error: "Joriy parol noto'g'ri" };
  }

  let email = settings.email;
  let password = settings.password;

  if (input.newEmail !== undefined && input.newEmail.trim() !== "") {
    const nextEmail = input.newEmail.trim().toLowerCase();
    if (!isValidEmail(nextEmail)) {
      return { ok: false, error: "Email manzil noto'g'ri" };
    }
    email = nextEmail;
  }

  if (input.newPassword !== undefined && input.newPassword !== "") {
    if (input.newPassword.length < 8) {
      return { ok: false, error: "Yangi parol kamida 8 belgidan iborat bo'lsin" };
    }
    if (input.newPassword === settings.password && email === settings.email) {
      return { ok: false, error: "Yangi parol joriy paroldan farq qilishi kerak" };
    }
    password = input.newPassword;
  }

  if (email === settings.email && password === settings.password) {
    return { ok: false, error: "O'zgarishlar kiritilmadi" };
  }

  await writeStore("admin_settings", { email, password });

  return { ok: true, email };
}
