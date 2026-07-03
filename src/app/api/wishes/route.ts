import { NextRequest, NextResponse } from "next/server";
import type { Wish, WishSide } from "@/shared/types/wish";
import { MODERATOR_KEY } from "@/shared/config/wish-moderation";
import { readStore, writeStore } from "@/shared/lib/data-store";
import {
  getClientBySlug,
  readInvitationWishes,
  writeInvitationWishes,
} from "@/shared/lib/clients-store";
import type { InvitationWish } from "@/shared/types/client";
import { handleApiError } from "@/shared/lib/api-error";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function normalizeWish(wish: Wish): Wish {
  return { ...wish, likes: wish.likes ?? 0 };
}

async function readLegacyWishes(): Promise<Wish[]> {
  return (await readStore<Wish[]>("wishes", [])).map(normalizeWish);
}

async function writeLegacyWishes(wishes: Wish[]) {
  await writeStore("wishes", wishes);
}

export async function GET(request: NextRequest) {
  const clientSlug = request.nextUrl.searchParams.get("client");

  if (clientSlug) {
    const client = await getClientBySlug(clientSlug);
    if (!client) {
      return NextResponse.json({ error: "Mijoz topilmadi" }, { status: 404 });
    }
    const wishes = await readInvitationWishes();
    const approved = wishes
      .filter((w) => w.clientSlug === clientSlug && w.status === "approved")
      .sort((a, b) => {
        if (b.likes !== a.likes) return b.likes - a.likes;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      })
      .slice(0, 10)
      .map((w) => ({
        id: w.id,
        name: w.guestName,
        side: w.side,
        message: w.message,
        createdAt: w.createdAt,
        likes: w.likes,
      }));
    return NextResponse.json(approved);
  }

  const wishes = await readLegacyWishes();
  const sorted = [...wishes].sort((a, b) => {
    if (b.likes !== a.likes) return b.likes - a.likes;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
  return NextResponse.json(sorted.slice(0, 10));
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const name = String(body.name ?? "").trim();
    const message = String(body.message ?? "").trim();
    const side = (body.side ?? "general") as WishSide;
    const clientSlug = body.clientSlug ? String(body.clientSlug).trim() : "";

    if (!name || name.length > 80) {
      return NextResponse.json({ error: "Ism kiritilishi shart" }, { status: 400 });
    }
    if (!message || message.length > 500) {
      return NextResponse.json({ error: "Tabrik matni kiritilishi shart" }, { status: 400 });
    }
    if (!["groom", "bride", "general"].includes(side)) {
      return NextResponse.json({ error: "Noto'g'ri tomondan tanlov" }, { status: 400 });
    }

    if (clientSlug) {
      const client = await getClientBySlug(clientSlug);
      if (!client || !client.active) {
        return NextResponse.json({ error: "Taklifnoma topilmadi" }, { status: 404 });
      }
      const wishes = await readInvitationWishes();
      const newWish: InvitationWish = {
        id: crypto.randomUUID(),
        clientId: client.id,
        clientSlug,
        guestName: name,
        side,
        message,
        status: "pending",
        likes: 0,
        createdAt: new Date().toISOString(),
      };
      wishes.push(newWish);
      await writeInvitationWishes(wishes);
      return NextResponse.json(
        { id: newWish.id, name, side, message, createdAt: newWish.createdAt, likes: 0 },
        { status: 201 }
      );
    }

    const wishes = await readLegacyWishes();
    const newWish: Wish = {
      id: crypto.randomUUID(),
      name,
      side,
      message,
      createdAt: new Date().toISOString(),
      likes: 0,
    };
    wishes.push(newWish);
    await writeLegacyWishes(wishes);
    return NextResponse.json(newWish, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const wishId = String(body.wishId ?? "").trim();
    const key = String(body.key ?? "").trim().toLowerCase();

    if (key !== MODERATOR_KEY) {
      return NextResponse.json({ error: "Moderatsiya kaliti noto'g'ri" }, { status: 403 });
    }

    if (!wishId) {
      return NextResponse.json({ error: "Tabrik ID kerak" }, { status: 400 });
    }

    const legacy = await readLegacyWishes();
    if (legacy.some((w) => w.id === wishId)) {
      await writeLegacyWishes(legacy.filter((w) => w.id !== wishId));
      return NextResponse.json({ ok: true });
    }

    const wishes = await readInvitationWishes();
    if (!wishes.some((w) => w.id === wishId)) {
      return NextResponse.json({ error: "Tabrik topilmadi" }, { status: 404 });
    }
    await writeInvitationWishes(wishes.filter((w) => w.id !== wishId));
    return NextResponse.json({ ok: true });
  } catch (error) {
    return handleApiError(error);
  }
}
