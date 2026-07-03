import { readStore, writeStore } from "@/shared/lib/data-store";
import type { InvitationClient, InvitationWish } from "@/shared/types/client";
import { weddingConfig } from "@/shared/config/wedding";
import { slugify } from "@/shared/lib/slugify";

export const DEFAULT_CLIENTS: InvitationClient[] = [
  {
    id: "cli_firdavs_marjona",
    slug: "firdavs-marjona",
    groomName: weddingConfig.groom,
    brideName: weddingConfig.bride,
    weddingDate: "2026-07-19",
    weddingTime: "09:00",
    locationMapUrl: weddingConfig.venue.mapUrl,
    locationRegion: weddingConfig.venue.region,
    locationPlace: weddingConfig.venue.place,
    audioUrl: weddingConfig.musicSrc,
    templateId: "variant-6",
    defaultLocale: "uz-latin",
    slugScript: "latin",
    pageViews: 0,
    active: true,
    createdAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "cli_bekzod_diyora",
    slug: "bekzod-diyora",
    groomName: "Bekzod",
    brideName: "Diyora",
    weddingDate: "2026-08-20",
    weddingTime: "18:00",
    locationMapUrl: weddingConfig.venue.mapUrl,
    locationRegion: "Farg'ona viloyati",
    locationPlace: "Vodil",
    audioUrl: weddingConfig.musicSrc,
    templateId: "variant-5",
    defaultLocale: "uz-latin",
    slugScript: "latin",
    pageViews: 0,
    active: true,
    createdAt: "2026-04-01T00:00:00.000Z",
  },
];

export async function readClients(): Promise<InvitationClient[]> {
  const clients = await readStore<InvitationClient[]>("clients", []);
  if (clients.length === 0) {
    await writeStore("clients", DEFAULT_CLIENTS);
    return DEFAULT_CLIENTS;
  }
  return clients;
}

export async function writeClients(clients: InvitationClient[]) {
  await writeStore("clients", clients);
}

export async function getClientBySlug(slug: string): Promise<InvitationClient | null> {
  const clients = await readClients();
  return clients.find((c) => c.slug === slug) ?? null;
}

export async function getClientById(id: string): Promise<InvitationClient | null> {
  const clients = await readClients();
  return clients.find((c) => c.id === id) ?? null;
}

export async function incrementClientViews(slug: string): Promise<void> {
  const clients = await readClients();
  const next = clients.map((c) =>
    c.slug === slug ? { ...c, pageViews: c.pageViews + 1 } : c
  );
  await writeClients(next);
}

export interface ClientInput {
  groomName: string;
  brideName: string;
  weddingDate: string;
  weddingTime: string;
  locationMapUrl: string;
  locationRegion?: string;
  locationPlace?: string;
  locationName?: string;
  locationAddress?: string;
  audioUrl: string;
  templateId: InvitationClient["templateId"];
  defaultLocale?: InvitationClient["defaultLocale"];
  slugScript?: InvitationClient["slugScript"];
  active?: boolean;
}

export async function createClient(input: ClientInput): Promise<InvitationClient> {
  const clients = await readClients();
  const script = input.slugScript ?? "latin";
  const slug = slugify(input.groomName, input.brideName, script);
  if (clients.some((c) => c.slug === slug)) {
    throw new Error("Bu slug allaqachon mavjud");
  }
  const client: InvitationClient = {
    id: `cli_${Date.now()}`,
    slug,
    groomName: input.groomName,
    brideName: input.brideName,
    weddingDate: input.weddingDate,
    weddingTime: input.weddingTime,
    locationMapUrl: input.locationMapUrl,
    locationRegion: input.locationRegion,
    locationPlace: input.locationPlace,
    locationName: input.locationName,
    locationAddress: input.locationAddress,
    audioUrl: input.audioUrl,
    templateId: input.templateId,
    defaultLocale: input.defaultLocale ?? "uz-latin",
    slugScript: script,
    pageViews: 0,
    active: input.active ?? true,
    createdAt: new Date().toISOString(),
  };
  await writeClients([client, ...clients]);
  return client;
}

export async function updateClient(id: string, input: ClientInput): Promise<InvitationClient> {
  const clients = await readClients();
  const idx = clients.findIndex((c) => c.id === id);
  if (idx === -1) throw new Error("Mijoz topilmadi");
  const script = input.slugScript ?? clients[idx].slugScript ?? "latin";
  const slug = slugify(input.groomName, input.brideName, script);
  if (clients.some((c) => c.slug === slug && c.id !== id)) {
    throw new Error("Bu slug allaqachon mavjud");
  }
  const updated: InvitationClient = {
    ...clients[idx],
    ...input,
    slug,
    defaultLocale: input.defaultLocale ?? clients[idx].defaultLocale ?? "uz-latin",
    slugScript: script,
  };
  const next = [...clients];
  next[idx] = updated;
  await writeClients(next);
  return updated;
}

export async function deleteClient(id: string): Promise<void> {
  const clients = await readClients();
  await writeClients(clients.filter((c) => c.id !== id));
  const wishes = await readInvitationWishes();
  await writeInvitationWishes(wishes.filter((w) => w.clientId !== id));
}

export async function readInvitationWishes(): Promise<InvitationWish[]> {
  return readStore<InvitationWish[]>("invitation_wishes", []);
}

export async function writeInvitationWishes(wishes: InvitationWish[]) {
  await writeStore("invitation_wishes", wishes);
}
