import { NextRequest, NextResponse } from "next/server";
import {
  createClient,
  deleteClient,
  readClients,
  updateClient,
} from "@/shared/lib/clients-store";
import { verifyAdminRequest } from "@/shared/lib/admin-auth";
import { handleApiError } from "@/shared/lib/api-error";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  if (!(await verifyAdminRequest(request))) {
    return NextResponse.json({ error: "Ruxsat yo'q" }, { status: 401 });
  }
  const clients = await readClients();
  return NextResponse.json(clients);
}

export async function POST(request: NextRequest) {
  if (!(await verifyAdminRequest(request))) {
    return NextResponse.json({ error: "Ruxsat yo'q" }, { status: 401 });
  }
  try {
    const body = await request.json();
    if (!body.groomName?.trim() || !body.brideName?.trim()) {
      return NextResponse.json({ error: "Ismlar kiritilishi shart" }, { status: 400 });
    }
    const groomTemplateId = body.groomTemplateId ?? body.templateId ?? "variant-6";
    const brideTemplateId = body.brideTemplateId ?? body.templateId ?? groomTemplateId;
    const client = await createClient({
      groomName: String(body.groomName ?? "").trim(),
      brideName: String(body.brideName ?? "").trim(),
      weddingDate: String(body.weddingDate ?? ""),
      weddingTime: String(body.weddingTime ?? "09:00"),
      locationMapUrl: String(body.locationMapUrl ?? ""),
      locationRegion: body.locationRegion ? String(body.locationRegion).trim() : undefined,
      locationPlace: body.locationPlace ? String(body.locationPlace).trim() : undefined,
      locationName: body.locationName ? String(body.locationName) : undefined,
      locationAddress: body.locationAddress ? String(body.locationAddress) : undefined,
      audioUrl: String(body.audioUrl ?? ""),
      groomTemplateId,
      brideTemplateId,
      defaultLocale: body.defaultLocale,
      slugScript: body.slugScript,
      active: body.active !== false,
    });
    return NextResponse.json(client, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PATCH(request: NextRequest) {
  if (!(await verifyAdminRequest(request))) {
    return NextResponse.json({ error: "Ruxsat yo'q" }, { status: 401 });
  }
  try {
    const body = await request.json();
    const id = String(body.id ?? "");
    if (!id) return NextResponse.json({ error: "ID kerak" }, { status: 400 });
    const groomTemplateId = body.groomTemplateId ?? body.templateId ?? "variant-6";
    const brideTemplateId = body.brideTemplateId ?? body.templateId ?? groomTemplateId;
    const client = await updateClient(id, {
      groomName: String(body.groomName ?? "").trim(),
      brideName: String(body.brideName ?? "").trim(),
      weddingDate: String(body.weddingDate ?? ""),
      weddingTime: String(body.weddingTime ?? "09:00"),
      locationMapUrl: String(body.locationMapUrl ?? ""),
      locationRegion: body.locationRegion ? String(body.locationRegion).trim() : undefined,
      locationPlace: body.locationPlace ? String(body.locationPlace).trim() : undefined,
      locationName: body.locationName ? String(body.locationName) : undefined,
      locationAddress: body.locationAddress ? String(body.locationAddress) : undefined,
      audioUrl: String(body.audioUrl ?? ""),
      groomTemplateId,
      brideTemplateId,
      defaultLocale: body.defaultLocale,
      slugScript: body.slugScript,
      active: body.active !== false,
    });
    return NextResponse.json(client);
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
    if (!id) return NextResponse.json({ error: "ID kerak" }, { status: 400 });
    await deleteClient(id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return handleApiError(error);
  }
}
