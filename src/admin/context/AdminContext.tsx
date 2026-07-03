"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { AdminWish, ClientFormData } from "../types";
import type { InvitationClient } from "@/shared/types/client";

interface AdminContextValue {
  clients: InvitationClient[];
  wishes: AdminWish[];
  loading: boolean;
  stats: {
    totalClients: number;
    activeClients: number;
    totalPageViews: number;
    pendingWishes: number;
  };
  refresh: () => Promise<void>;
  addClient: (data: ClientFormData) => Promise<void>;
  updateClient: (id: string, data: ClientFormData) => Promise<void>;
  deleteClient: (id: string) => Promise<void>;
  approveWish: (id: string) => Promise<void>;
  updateWishMessage: (id: string, message: string) => Promise<void>;
  deleteWish: (id: string) => Promise<void>;
  getClientById: (id: string) => InvitationClient | undefined;
}

const AdminContext = createContext<AdminContextValue | null>(null);

function mapWish(w: {
  id: string;
  clientId: string;
  clientSlug?: string;
  guestName: string;
  message: string;
  status: "pending" | "approved";
  createdAt: string;
}): AdminWish {
  return {
    id: w.id,
    clientId: w.clientId,
    guestName: w.guestName,
    message: w.message,
    status: w.status,
    createdAt: w.createdAt,
  };
}

export function AdminProvider({ children }: { children: ReactNode }) {
  const [clients, setClients] = useState<InvitationClient[]>([]);
  const [wishes, setWishes] = useState<AdminWish[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const [clientsRes, wishesRes] = await Promise.all([
      fetch("/api/admin/clients"),
      fetch("/api/admin/wishes"),
    ]);
    if (clientsRes.ok) setClients(await clientsRes.json());
    if (wishesRes.ok) {
      const data = await wishesRes.json();
      setWishes((data.wishes ?? []).map(mapWish));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const stats = useMemo(
    () => ({
      totalClients: clients.length,
      activeClients: clients.filter((c) => c.active).length,
      totalPageViews: clients.reduce((s, c) => s + c.pageViews, 0),
      pendingWishes: wishes.filter((w) => w.status === "pending").length,
    }),
    [clients, wishes]
  );

  const addClient = useCallback(
    async (data: ClientFormData) => {
      const res = await fetch("/api/admin/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error((err as { error?: string }).error ?? "Xatolik");
      }
      await refresh();
    },
    [refresh]
  );

  const updateClient = useCallback(
    async (id: string, data: ClientFormData) => {
      const res = await fetch("/api/admin/clients", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      });
      if (!res.ok) throw new Error("Yangilash xatosi");
      await refresh();
    },
    [refresh]
  );

  const deleteClient = useCallback(
    async (id: string) => {
      const res = await fetch("/api/admin/clients", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error("O'chirish xatosi");
      await refresh();
    },
    [refresh]
  );

  const patchWish = useCallback(
    async (id: string, patch: { message?: string; status?: "pending" | "approved" }) => {
      const res = await fetch("/api/admin/wishes", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...patch }),
      });
      if (!res.ok) throw new Error("Tabrik yangilanmadi");
      await refresh();
    },
    [refresh]
  );

  const approveWish = useCallback((id: string) => patchWish(id, { status: "approved" }), [patchWish]);
  const updateWishMessage = useCallback(
    (id: string, message: string) => patchWish(id, { message }),
    [patchWish]
  );

  const deleteWish = useCallback(
    async (id: string) => {
      const res = await fetch("/api/admin/wishes", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error("O'chirish xatosi");
      await refresh();
    },
    [refresh]
  );

  const getClientById = useCallback((id: string) => clients.find((c) => c.id === id), [clients]);

  const value = useMemo(
    () => ({
      clients,
      wishes,
      loading,
      stats,
      refresh,
      addClient,
      updateClient,
      deleteClient,
      approveWish,
      updateWishMessage,
      deleteWish,
      getClientById,
    }),
    [
      clients,
      wishes,
      loading,
      stats,
      refresh,
      addClient,
      updateClient,
      deleteClient,
      approveWish,
      updateWishMessage,
      deleteWish,
      getClientById,
    ]
  );

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used within AdminProvider");
  return ctx;
}
