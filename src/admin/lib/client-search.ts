import type { AdminClient } from "@/admin/types";
import { normalizeSearchText } from "@/shared/i18n/transliterate";

function clientSearchBlob(client: AdminClient): string {
  return normalizeSearchText(
    [
      client.groomName,
      client.brideName,
      client.slug,
      client.slug.replace(/-/g, " "),
      `${client.groomName} ${client.brideName}`,
    ].join(" ")
  );
}

export function filterClientsByQuery(clients: AdminClient[], query: string): AdminClient[] {
  const q = query.trim();
  if (!q) return clients;
  const needle = normalizeSearchText(q);
  return clients.filter((client) => clientSearchBlob(client).includes(needle));
}
