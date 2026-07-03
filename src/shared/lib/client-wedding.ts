import { weddingConfig } from "@/shared/config/wedding";
import type { InvitationClient } from "@/shared/types/client";
import { resolveClientLocation } from "@/shared/lib/resolve-location";

export type DynamicWeddingConfig = {
  musicSrc: string;
  musicVolume: number;
  groom: string;
  bride: string;
  weddingDateISO: string;
  displayDate: string;
  displayTime: string;
  displayTimeLabel: string;
  displayDateTime: string;
  weddingType: string;
  weddingTypeDescription: string;
  venue: {
    region: string;
    place: string;
    name: string;
    address: string;
    coordinates: { lat: number; lng: number };
    coordinatesDMS: string;
    mapUrl: string;
    mapsLink: string;
  };
  morningSchedule: typeof weddingConfig.morningSchedule;
};

const UZ_MONTHS = [
  "Yanvar",
  "Fevral",
  "Mart",
  "Aprel",
  "May",
  "Iyun",
  "Iyul",
  "Avgust",
  "Sentabr",
  "Oktabr",
  "Noyabr",
  "Dekabr",
];

function formatDisplayDate(isoDate: string): string {
  const [y, m, d] = isoDate.split("-").map(Number);
  if (!y || !m || !d) return isoDate;
  return `${d} ${UZ_MONTHS[m - 1] ?? m}, ${y}`;
}

function formatTimeLabel(time: string): string {
  const [h] = time.split(":").map(Number);
  if (Number.isNaN(h)) return `Soat ${time}`;
  if (h < 12) return `Ertalab, soat ${time}`;
  if (h < 17) return `Kunduzi, soat ${time}`;
  return `Kechqurun, soat ${time}`;
}

export function clientToWeddingConfig(client: InvitationClient): DynamicWeddingConfig {
  const weddingTime = client.weddingTime || "09:00";
  const weddingDateISO = `${client.weddingDate}T${weddingTime}:00`;
  const displayDate = formatDisplayDate(client.weddingDate);
  const displayTimeLabel = formatTimeLabel(weddingTime);
  const mapsLink = client.locationMapUrl || weddingConfig.venue.mapsLink;
  const { region, place } = resolveClientLocation(client);

  return {
    ...weddingConfig,
    musicSrc: client.audioUrl?.trim() || weddingConfig.musicSrc,
    groom: client.groomName,
    bride: client.brideName,
    weddingDateISO,
    displayDate,
    displayTime: weddingTime,
    displayTimeLabel,
    displayDateTime: `${displayDate} — ${displayTimeLabel}`,
    venue: {
      ...weddingConfig.venue,
      region,
      place,
      name: region,
      address: place,
      mapUrl: client.locationMapUrl.includes("embed")
        ? client.locationMapUrl
        : client.locationMapUrl || weddingConfig.venue.mapUrl,
      mapsLink,
    },
  };
}

import type { LocaleId } from "@/shared/i18n/types";

export interface ClientWeddingContextValue {
  clientId: string;
  clientSlug: string;
  defaultLocale: LocaleId;
  wedding: DynamicWeddingConfig;
}

export function buildClientContext(client: InvitationClient): ClientWeddingContextValue {
  return {
    clientId: client.id,
    clientSlug: client.slug,
    defaultLocale: client.defaultLocale ?? "uz-latin",
    wedding: clientToWeddingConfig(client),
  };
}
