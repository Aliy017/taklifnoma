import { NextRequest, NextResponse } from "next/server";
import type { Wish, WishSide } from "@/shared/types/wish";
import { MODERATOR_KEY } from "@/shared/config/wish-moderation";
import { readStore, writeStore } from "@/shared/lib/data-store";
import { handleApiError } from "@/shared/lib/api-error";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function normalizeWish(wish: Wish): Wish {
  return { ...wish, likes: wish.likes ?? 0 };
}

async function readWishes(): Promise<Wish[]> {
  return (await readStore<Wish[]>("wishes", [])).map(normalizeWish);
}

async function writeWishes(wishes: Wish[]) {
  await writeStore("wishes", wishes);
}

export async function GET() {
  const wishes = await readWishes();
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

    if (!name || name.length > 80) {
      return NextResponse.json({ error: "Ism kiritilishi shart" }, { status: 400 });
    }
    if (!message || message.length > 500) {
      return NextResponse.json({ error: "Tabrik matni kiritilishi shart" }, { status: 400 });
    }
    if (!["groom", "bride", "general"].includes(side)) {
      return NextResponse.json({ error: "Noto'g'ri tomondan tanlov" }, { status: 400 });
    }

    const wishes = await readWishes();
    const newWish: Wish = {
      id: crypto.randomUUID(),
      name,
      side,
      message,
      createdAt: new Date().toISOString(),
      likes: 0,
    };

    wishes.push(newWish);
    await writeWishes(wishes);

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

    const wishes = await readWishes();
    const exists = wishes.some((w) => w.id === wishId);

    if (!exists) {
      return NextResponse.json({ error: "Tabrik topilmadi" }, { status: 404 });
    }

    await writeWishes(wishes.filter((w) => w.id !== wishId));
    return NextResponse.json({ ok: true });
  } catch (error) {
    return handleApiError(error);
  }
}
