import type { Metadata } from "next";
import LandingPage from "@/landing/components/LandingPage";
import "@/landing/landing.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Taklifnoma — Premium raqamli taklifnoma va tabriknomalar",
  description:
    "Unutilmas onlar uchun premium raqamli yechimlar. To'y taklifnomalari va bayram tabriknomalari.",
};

export default function Home() {
  return <LandingPage />;
}
