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
