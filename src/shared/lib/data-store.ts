import { promises as fs } from "fs";
import path from "path";
import { Redis } from "@upstash/redis";

export type StoreKey =
  | "likes"
  | "wishes"
  | "rsvp"
  | "clients"
  | "invitation_wishes"
  | "admin_settings"
  | "wish_ip_blocks";

const KV_KEYS: Record<StoreKey, string> = {
  likes: "taklifnoma:likes",
  wishes: "taklifnoma:wishes",
  rsvp: "taklifnoma:rsvp",
  clients: "taklifnoma:clients",
  invitation_wishes: "taklifnoma:invitation_wishes",
  admin_settings: "taklifnoma:admin_settings",
  wish_ip_blocks: "taklifnoma:wish_ip_blocks",
};

const FILE_NAMES: Record<StoreKey, string> = {
  likes: "likes.json",
  wishes: "wishes.json",
  rsvp: "rsvp.json",
  clients: "clients.json",
  invitation_wishes: "invitation_wishes.json",
  admin_settings: "admin_settings.json",
  wish_ip_blocks: "wish_ip_blocks.json",
};

function getRedis(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

export function isKvStorageEnabled() {
  return getRedis() !== null;
}

export async function readStore<T>(key: StoreKey, fallback: T): Promise<T> {
  const redis = getRedis();
  if (redis) {
    try {
      const value = await redis.get<T>(KV_KEYS[key]);
      return value ?? fallback;
    } catch (error) {
      console.error(`[data-store] Redis o'qish xatosi (${key}):`, error);
      return fallback;
    }
  }

  const filePath = path.join(process.cwd(), "data", FILE_NAMES[key]);
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export async function writeStore<T>(key: StoreKey, value: T): Promise<void> {
  const redis = getRedis();
  if (redis) {
    await redis.set(KV_KEYS[key], value);
    return;
  }

  if (process.env.VERCEL === "1") {
    throw new Error(
      "Production saqlash sozlanmagan: Vercel → Marketplace → Upstash Redis → Connect"
    );
  }

  const filePath = path.join(process.cwd(), "data", FILE_NAMES[key]);
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(value, null, 2), "utf-8");
}
