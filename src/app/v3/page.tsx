import type { Metadata } from "next";
import Variant3Page from "@/variants/variant-3";
import { variant3Config } from "@/variants/variant-3/config";
import "@/variants/variant-3/styles.css";

export const metadata: Metadata = {
  title: `Variant 3 | ${variant3Config.groom} & ${variant3Config.bride}`,
  description: variant3Config.subtitle,
};

export default function Page() {
  return <Variant3Page />;
}
