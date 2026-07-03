export async function loginApi(email: string, password: string): Promise<boolean> {
  const res = await fetch("/api/admin/auth", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    credentials: "include",
  });
  return res.ok;
}

export async function logoutApi() {
  await fetch("/api/admin/auth", { method: "DELETE", credentials: "include" });
}

export async function checkAuthApi(): Promise<boolean> {
  const res = await fetch("/api/admin/auth", { credentials: "include" });
  if (!res.ok) return false;
  const data = await res.json();
  return !!data.authenticated;
}

export async function changeCredentialsApi(input: {
  currentPassword: string;
  newEmail?: string;
  newPassword?: string;
  confirmPassword?: string;
}): Promise<{ ok: true; email: string } | { ok: false; error: string }> {
  const res = await fetch("/api/admin/auth/credentials", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
    credentials: "include",
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    return { ok: false, error: data.error ?? "Sozlamalarni yangilab bo'lmadi" };
  }
  return { ok: true, email: data.email ?? "" };
}

export async function fetchAdminEmailApi(): Promise<string | null> {
  const res = await fetch("/api/admin/auth/credentials", { credentials: "include" });
  if (!res.ok) return null;
  const data = await res.json();
  return typeof data.email === "string" ? data.email : null;
}

/** @deprecated Use changeCredentialsApi */
export async function changePasswordApi(
  currentPassword: string,
  newPassword: string,
  confirmPassword: string
): Promise<{ ok: true } | { ok: false; error: string }> {
  const result = await changeCredentialsApi({ currentPassword, newPassword, confirmPassword });
  if (!result.ok) return result;
  return { ok: true };
}
