import { weddingConfig } from "@/shared/config/wedding";
import type { InvitationClient } from "@/shared/types/client";

export type DynamicWeddingConfig = {
  musicSrc: string;
  musicVolume: number;
  groom: string;
  bride: string;
  weddingDateISO: string;
  displayDate: string;
  displayTime: string;
  displayTimeLabel: string;
  weddingType: string;
  weddingTypeDescription: string;
  venue: {
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
  const weddingDateISO = `${client.weddingDate}T${client.weddingTime || "09:00"}:00`;
  const mapsLink =
    client.locationMapUrl ||
    weddingConfig.venue.mapsLink;

  return {
    ...weddingConfig,
    musicSrc: client.audioUrl || weddingConfig.musicSrc,
    groom: client.groomName,
    bride: client.brideName,
    weddingDateISO,
    displayDate: formatDisplayDate(client.weddingDate),
    displayTime: client.weddingTime || "09:00",
    displayTimeLabel: formatTimeLabel(client.weddingTime || "09:00"),
    venue: {
      ...weddingConfig.venue,
      name: client.locationName || weddingConfig.venue.name,
      address: client.locationAddress || weddingConfig.venue.address,
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
