import type { Metadata } from "next";
import Variant6Page from "@/variants/variant-6";
import { variant6Config } from "@/variants/variant-6/config";
import "@/variants/variant-6/styles.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: `Variant 6 | ${variant6Config.groom} & ${variant6Config.bride}`,
  description: variant6Config.subtitle,
};

export default function Page() {
  return <Variant6Page />;
}
