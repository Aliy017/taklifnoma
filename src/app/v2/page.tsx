import type { Metadata } from "next";
import Variant2Page from "@/variants/variant-2";
import { variant2Config } from "@/variants/variant-2/config";
import "@/variants/variant-2/styles.css";

export const metadata: Metadata = {
  title: `Variant 2 | ${variant2Config.groom} & ${variant2Config.bride}`,
  description: variant2Config.subtitle,
};

export default function Page() {
  return <Variant2Page />;
}
