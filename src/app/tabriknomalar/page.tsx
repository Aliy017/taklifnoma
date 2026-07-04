import type { Metadata } from "next";
import GreetingsComingSoon from "@/landing/components/GreetingsComingSoon";
import "@/landing/landing.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Tabriknomalar — Tez kunda | Taklifnoma",
  description: "Nafis raqamli tabriknomalar tez orada.",
};

export default function TabriknomalarPage() {
  return <GreetingsComingSoon />;
}
