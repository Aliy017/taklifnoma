import { NextRequest, NextResponse } from "next/server";
import { getClientBySlug, incrementClientViews } from "@/shared/lib/clients-store";
import { buildClientContext } from "@/shared/lib/client-wedding";
import { RESERVED_SLUGS } from "@/shared/types/client";
import { normalizeInvitationSide } from "@/shared/lib/client-invitations";
import { handleApiError } from "@/shared/lib/api-error";

export const dynamic = "force-dynamic";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    if (RESERVED_SLUGS.has(slug)) {
      return NextResponse.json({ error: "Topilmadi" }, { status: 404 });
    }
    const client = await getClientBySlug(slug);
    if (!client || !client.active) {
      return NextResponse.json({ error: "Taklifnoma topilmadi" }, { status: 404 });
    }
    return NextResponse.json({
      client,
      context: buildClientContext(client),
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const client = await getClientBySlug(slug);
    if (!client || !client.active) {
      return NextResponse.json({ error: "Topilmadi" }, { status: 404 });
    }

    let side: "kuyov" | "kelin" = "kuyov";
    try {
      const body = await request.json();
      const normalized = body?.side ? normalizeInvitationSide(String(body.side)) : null;
      if (normalized) {
        side = normalized;
      }
    } catch {
      /* empty body — legacy */
    }

    await incrementClientViews(slug, side);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return handleApiError(error);
  }
}
