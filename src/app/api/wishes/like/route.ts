import { NextRequest, NextResponse } from "next/server";
import type { Wish } from "@/shared/types/wish";
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
  const wishId = String(body.wishId ?? "").trim();

  if (!wishId) {
    return NextResponse.json({ error: "Tabrik ID kerak" }, { status: 400 });
  }

  const wishes = await readWishes();
  const index = wishes.findIndex((w) => w.id === wishId);

  if (index === -1) {
    return NextResponse.json({ error: "Tabrik topilmadi" }, { status: 404 });
  }

  wishes[index] = { ...wishes[index], likes: wishes[index].likes + 1 };
    await writeWishes(wishes);

    return NextResponse.json({ likes: wishes[index].likes });
  } catch (error) {
    return handleApiError(error);
  }
}
