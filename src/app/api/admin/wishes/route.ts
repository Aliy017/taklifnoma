import { NextRequest, NextResponse } from "next/server";
import {
  readInvitationWishes,
  writeInvitationWishes,
  readClients,
} from "@/shared/lib/clients-store";
import { verifyAdminRequest } from "@/shared/lib/admin-auth";
import { handleApiError } from "@/shared/lib/api-error";
import type { InvitationWish } from "@/shared/types/client";
import { blockIpAfterAdminDelete } from "@/shared/lib/wish-ip-guard";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  if (!(await verifyAdminRequest(request))) {
    return NextResponse.json({ error: "Ruxsat yo'q" }, { status: 401 });
  }
  const wishes = await readInvitationWishes();
  const clients = await readClients();
  return NextResponse.json({ wishes, clients });
}

export async function PATCH(request: NextRequest) {
  if (!(await verifyAdminRequest(request))) {
    return NextResponse.json({ error: "Ruxsat yo'q" }, { status: 401 });
  }
  try {
    const body = await request.json();
    const id = String(body.id ?? "");
    const wishes = await readInvitationWishes();
    const idx = wishes.findIndex((w) => w.id === id);
    if (idx === -1) return NextResponse.json({ error: "Tabrik topilmadi" }, { status: 404 });

    const updated: InvitationWish = {
      ...wishes[idx],
      ...(body.message !== undefined ? { message: String(body.message) } : {}),
      ...(body.status === "approved" || body.status === "pending" ? { status: body.status } : {}),
    };
    const next = [...wishes];
    next[idx] = updated;
    await writeInvitationWishes(next);
    return NextResponse.json(updated);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(request: NextRequest) {
  if (!(await verifyAdminRequest(request))) {
    return NextResponse.json({ error: "Ruxsat yo'q" }, { status: 401 });
  }
  try {
    const body = await request.json();
    const id = String(body.id ?? "");
    const wishes = await readInvitationWishes();
    const removed = wishes.find((w) => w.id === id);
    if (removed) {
      await blockIpAfterAdminDelete(removed.authorIp);
    }
    await writeInvitationWishes(wishes.filter((w) => w.id !== id));
    return NextResponse.json({ ok: true });
  } catch (error) {
    return handleApiError(error);
  }
}
