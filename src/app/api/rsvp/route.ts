import { NextRequest, NextResponse } from "next/server";
import type { RsvpEntry } from "@/shared/types/rsvp";
import { readStore, writeStore } from "@/shared/lib/data-store";
import { handleApiError } from "@/shared/lib/api-error";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

async function readRsvp(): Promise<RsvpEntry[]> {
  return readStore<RsvpEntry[]>("rsvp", []);
}

async function writeRsvp(entries: RsvpEntry[]) {
  await writeStore("rsvp", entries);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
  const name = String(body.name ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const attending = Boolean(body.attending);
  const guests = Math.min(Math.max(Number(body.guests) || 1, 1), 10);
  const message = String(body.message ?? "").trim();

  if (!name || name.length > 80) {
    return NextResponse.json({ error: "Ism kiritilishi shart" }, { status: 400 });
  }
  if (phone.length > 20) {
    return NextResponse.json({ error: "Telefon raqami juda uzun" }, { status: 400 });
  }
  if (message.length > 300) {
    return NextResponse.json({ error: "Xabar juda uzun" }, { status: 400 });
  }

  const entries = await readRsvp();
  const entry: RsvpEntry = {
    id: crypto.randomUUID(),
    name,
    phone: phone || undefined,
    attending,
    guests: attending ? guests : 0,
    message: message || undefined,
    createdAt: new Date().toISOString(),
  };

  entries.push(entry);
    await writeRsvp(entries);

    return NextResponse.json(entry, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
