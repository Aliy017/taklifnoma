"use client";

import { useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import PageHeader from "@/admin/components/PageHeader";
import ClientCard from "@/admin/components/ClientCard";
import ClientTable from "@/admin/components/ClientTable";
import ClientModal from "@/admin/components/ClientModal";
import { useAdmin } from "@/admin/context/AdminContext";
import { filterClientsByQuery } from "@/admin/lib/client-search";
import type { AdminClient } from "@/admin/types";

export default function ClientsPage() {
  const { clients, loading, addClient, updateClient, deleteClient } = useAdmin();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<AdminClient | null>(null);
  const [toast, setToast] = useState("");
  const [search, setSearch] = useState("");

  const filteredClients = useMemo(
    () => filterClientsByQuery(clients, search),
    [clients, search]
  );

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  }

  function openCreate() {
    setEditing(null);
    setModalOpen(true);
  }

  function openEdit(client: AdminClient) {
    setEditing(client);
    setModalOpen(true);
  }

  function copyLink(slug: string, defaultLocale?: string) {
    const origin = typeof window !== "undefined" ? window.location.origin : "https://taklifnoma.uz";
    let url = `${origin}/${slug}`;
    if (defaultLocale && defaultLocale !== "uz-latin") {
      url += `?lang=${defaultLocale}`;
    }
    navigator.clipboard.writeText(url).then(() => showToast("Link nusxalandi!"));
  }

  async function handleSave(data: Parameters<typeof addClient>[0]) {
    try {
      if (editing) {
        await updateClient(editing.id, data);
        showToast("Mijoz yangilandi");
      } else {
        await addClient(data);
        showToast("Yangi mijoz qo'shildi");
      }
    } catch (e) {
      showToast(e instanceof Error ? e.message : "Xatolik");
    }
  }

  async function handleDelete(id: string) {
    if (confirm("Mijozni o'chirishni tasdiqlaysizmi?")) {
      await deleteClient(id);
      showToast("Mijoz o'chirildi");
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#0f2744]/20 border-t-[#0f2744]" />
      </div>
    );
  }

  return (
    <>
      <PageHeader
        title="Mijozlar"
        description="Barcha taklifnoma mijozlarini boshqaring"
        action={
          <button type="button" onClick={openCreate} className="admin-btn-primary w-full sm:w-auto">
            <Plus className="h-4 w-4" />
            Yangi mijoz
          </button>
        }
      />

      <div className="relative mb-5">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="admin-search-input"
          placeholder="Ism, familiya yoki slug bo'yicha qidiring (lotin, kirill, rus)..."
          aria-label="Mijozlarni qidirish"
        />
      </div>

      <ClientTable
        clients={filteredClients}
        onEdit={openEdit}
        onDelete={handleDelete}
        onCopyLink={copyLink}
      />

      <div className="mt-4 grid gap-3 md:hidden">
        {filteredClients.map((client, i) => (
          <ClientCard
            key={client.id}
            client={client}
            index={i}
            onEdit={openEdit}
            onDelete={handleDelete}
            onCopyLink={copyLink}
          />
        ))}
        {filteredClients.length === 0 && (
          <p className="py-12 text-center text-sm text-slate-400">
            {search.trim() ? "Qidiruv bo'yicha natija topilmadi" : "Hali mijoz yo'q"}
          </p>
        )}
      </div>

      <ClientModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        editing={editing}
      />

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed bottom-24 left-1/2 z-50 -translate-x-1/2 rounded-full bg-[#0f2744] px-5 py-2.5 text-sm font-medium text-white shadow-xl md:bottom-8"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
