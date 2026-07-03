export type ControlSurface = "dark" | "light";

/** Och fonli variantlar — oq tugma + qora matn/icon */
export const LIGHT_CONTROL_SURFACES = new Set([
  "dashboard",
  "variant-3",
  "variant-5",
  "variant-6",
  "variant-7",
  "variant-8",
  "variant-9",
  "variant-10",
]);

export function controlSurface(variantId: string): ControlSurface {
  return LIGHT_CONTROL_SURFACES.has(variantId) ? "light" : "dark";
}

/** @deprecated use controlSurface */
export function langSwitcherSurface(variantId: string): ControlSurface {
  return controlSurface(variantId);
}

export type LangSwitcherSurface = ControlSurface;
