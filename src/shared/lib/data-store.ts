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

/**
 * Faqat kalit MAVJUD BO'LMAGANDA null qaytaradi.
 * Redis: get natijasi null bo'lsa null. Fayl: ENOENT bo'lsa null, boshqa
 * har qanday o'qish/parse xatosini QAYTA OTADI — xatoni jim yutib, keyingi
 * writeStore barcha ma'lumotni bitta yozuv bilan ustiga yozib yuborishining oldini oladi.
 */
export async function readStoreRaw<T>(key: StoreKey): Promise<T | null> {
  const redis = getRedis();
  if (redis) {
    return (await redis.get<T>(KV_KEYS[key])) ?? null;
  }

  const filePath = path.join(process.cwd(), "data", FILE_NAMES[key]);
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw) as T;
  } catch (error) {
    if ((error as NodeJS.ErrnoException)?.code === "ENOENT") {
      return null;
    }
    throw error;
  }
}

export async function readStore<T>(key: StoreKey, fallback: T): Promise<T> {
  return (await readStoreRaw<T>(key)) ?? fallback;
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
  // Atomik yozish: avval vaqtinchalik faylga, keyin rename bilan ustiga.
  // Shunday qilib yozish o'rtasida uzilsa ham asl fayl buzilmaydi.
  const tmpPath = `${filePath}.${process.pid}.${Date.now()}.tmp`;
  await fs.writeFile(tmpPath, JSON.stringify(value, null, 2), "utf-8");
  await fs.rename(tmpPath, filePath);
}
