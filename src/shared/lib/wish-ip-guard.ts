import type { NextRequest } from "next/server";
import { readStore, writeStore } from "@/shared/lib/data-store";
import { readInvitationWishes } from "@/shared/lib/clients-store";
import type { Wish } from "@/shared/types/wish";

const LEGACY_SCOPE = "__legacy__";

export function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }

  const realIp = request.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;

  return "unknown";
}

async function readBlockedIps(): Promise<string[]> {
  return readStore<string[]>("wish_ip_blocks", []);
}

async function writeBlockedIps(ips: string[]): Promise<void> {
  await writeStore("wish_ip_blocks", ips);
}

export async function isIpBlocked(ip: string): Promise<boolean> {
  if (!ip || ip === "unknown") return false;
  const blocked = await readBlockedIps();
  return blocked.includes(ip);
}

/** Admin tabrikni o'chirganda — shu IP qayta yozolmaydi. */
export async function blockIpAfterAdminDelete(ip: string | undefined): Promise<void> {
  if (!ip || ip === "unknown") return;
  const blocked = await readBlockedIps();
  if (blocked.includes(ip)) return;
  await writeBlockedIps([...blocked, ip]);
}

async function readLegacyWishes(): Promise<Wish[]> {
  return readStore<Wish[]>("wishes", []);
}

function wishScope(clientSlug: string | null): string {
  return clientSlug?.trim() || LEGACY_SCOPE;
}

/** Bir IP — bir taklifnoma (mijoz slug) uchun faqat bitta tabrik. */
export async function ipAlreadySubmitted(ip: string, clientSlug: string | null): Promise<boolean> {
  if (!ip || ip === "unknown") return false;

  if (clientSlug) {
    const wishes = await readInvitationWishes();
    return wishes.some((w) => w.clientSlug === clientSlug && w.authorIp === ip);
  }

  const legacy = await readLegacyWishes();
  return legacy.some((w) => w.authorIp === ip);
}

export type WishIpRejectReason = "blocked" | "duplicate";

export async function assertWishIpAllowed(
  request: NextRequest,
  clientSlug: string | null
): Promise<{ ok: true; ip: string } | { ok: false; reason: WishIpRejectReason }> {
  const ip = getClientIp(request);

  if (await isIpBlocked(ip)) {
    return { ok: false, reason: "blocked" };
  }

  if (await ipAlreadySubmitted(ip, clientSlug)) {
    return { ok: false, reason: "duplicate" };
  }

  return { ok: true, ip };
}

export function wishIpErrorMessage(reason: WishIpRejectReason): string {
  if (reason === "blocked") {
    return "Bu qurilmadan tabrik qoldirish taqiqlangan (oldin o'chirilgan yoki bloklangan).";
  }
  return "Bu qurilmadan allaqachon tabrik qoldirilgan — har bir mehmon faqat bir marta yozadi.";
}

export { wishScope, LEGACY_SCOPE };
