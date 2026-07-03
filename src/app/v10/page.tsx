import type { Metadata } from "next";
import LocaleShell from "@/shared/components/LocaleShell";
import Variant10Page from "@/variants/variant-10";
import { variant10Config } from "@/variants/variant-10/config";
import "@/variants/variant-10/styles.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: `Variant 10 | ${variant10Config.groom} & ${variant10Config.bride}`,
  description: variant10Config.subtitle,
};

export default function Page() {
  return (
    <LocaleShell>
      <Variant10Page />
    </LocaleShell>
  );
}
