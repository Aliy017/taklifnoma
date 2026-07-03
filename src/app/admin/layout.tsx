import type { Metadata } from "next";
import "@/admin/styles/admin.css";

export const metadata: Metadata = {
  title: "Admin | Taklifnoma",
  description: "Taklifnoma platformasi boshqaruv paneli",
  robots: "noindex, nofollow",
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
