import type { Metadata } from "next";
import LocaleShell from "@/shared/components/LocaleShell";
import Variant11Page from "@/variants/variant-11";
import { variant11Config } from "@/variants/variant-11/config";
import "@/variants/variant-11/styles.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: `Variant 11 | ${variant11Config.groom} & ${variant11Config.bride}`,
  description: variant11Config.subtitle,
};

export default function Page() {
  return (
    <LocaleShell>
      <Variant11Page />
    </LocaleShell>
  );
}
