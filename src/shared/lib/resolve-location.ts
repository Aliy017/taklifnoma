import { weddingConfig } from "@/shared/config/wedding";
import type { InvitationClient } from "@/shared/types/client";

export interface ResolvedLocation {
  region: string;
  place: string;
}

type LocationFields = Pick<
  InvitationClient,
  "locationRegion" | "locationPlace" | "locationName" | "locationAddress"
>;

/** Resolves viloyat (region) and joy nomi (place) from client fields with legacy fallbacks. */
export function resolveClientLocation(client: LocationFields): ResolvedLocation {
  const region = client.locationRegion?.trim();
  const place = client.locationPlace?.trim();

  if (region && place) {
    return { region, place };
  }
  if (region) {
    return { region, place: place ?? "" };
  }
  if (place) {
    return { region: weddingConfig.venue.region, place };
  }

  if (client.locationAddress?.trim()) {
    const parts = client.locationAddress
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    if (parts.length >= 2) {
      return { place: parts[0], region: parts.slice(1).join(", ") };
    }
    return { region: client.locationAddress.trim(), place: "" };
  }

  if (client.locationName?.trim()) {
    return { region: client.locationName.trim(), place: "" };
  }

  return {
    region: weddingConfig.venue.region,
    place: weddingConfig.venue.place,
  };
}
