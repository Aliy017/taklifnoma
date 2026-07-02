import { NextResponse } from "next/server";

export function handleApiError(error: unknown, fallback = "Server xatosi") {
  console.error("[api]", error);
  const message = error instanceof Error ? error.message : fallback;
  const status = message.includes("Production saqlash") ? 503 : 500;
  return NextResponse.json({ error: message }, { status });
}
