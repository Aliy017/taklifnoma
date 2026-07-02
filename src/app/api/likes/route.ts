import { NextRequest, NextResponse } from "next/server";
import { variants } from "@/variants/registry";
import { readStore, writeStore } from "@/shared/lib/data-store";
import { handleApiError } from "@/shared/lib/api-error";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type LikeCounts = Record<string, number>;

function normalizeCounts(counts: LikeCounts): LikeCounts {
  const normalized: LikeCounts = {};
  for (const variant of variants) {
    normalized[variant.id] = Math.max(0, counts[variant.id] ?? 0);
  }
  return normalized;
}

export async function GET() {
  const counts = normalizeCounts(await readStore<LikeCounts>("likes", {}));
  return NextResponse.json(counts);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const variantId = String(body.variantId ?? "").trim();

    if (!variants.some((v) => v.id === variantId)) {
      return NextResponse.json({ error: "Variant topilmadi" }, { status: 400 });
    }

    const counts = normalizeCounts(await readStore<LikeCounts>("likes", {}));
    counts[variantId] = (counts[variantId] ?? 0) + 1;
    await writeStore("likes", counts);

    return NextResponse.json({ variantId, count: counts[variantId] });
  } catch (error) {
    return handleApiError(error);
  }
}
