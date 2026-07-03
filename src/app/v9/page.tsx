import type { Metadata } from "next";
import LocaleShell from "@/shared/components/LocaleShell";
import Variant9Page from "@/variants/variant-9";
import { variant9Config } from "@/variants/variant-9/config";
import "@/variants/variant-9/styles.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: `Variant 9 | ${variant9Config.groom} & ${variant9Config.bride}`,
  description: variant9Config.subtitle,
};

export default function Page() {
  return (
    <LocaleShell>
      <Variant9Page />
    </LocaleShell>
  );
}
