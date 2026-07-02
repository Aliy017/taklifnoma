import type { Metadata } from "next";
import Variant4Page from "@/variants/variant-4";
import { variant4Config } from "@/variants/variant-4/config";
import "@/variants/variant-4/styles.css";

export const metadata: Metadata = {
  title: `Variant 4 | ${variant4Config.groom} & ${variant4Config.bride}`,
  description: variant4Config.subtitle,
};

export default function Page() {
  return <Variant4Page />;
}
