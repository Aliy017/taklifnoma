import { sparkleThemes } from "@/shared/config/sparkle-themes";
import type { SparkleThemeId } from "@/shared/config/sparkle-themes";

export type CreatorThemeId = SparkleThemeId | "dashboard";

export interface CreatorThemeStyle {
  accent: string;
  accentSoft: string;
}

const dashboardTheme: CreatorThemeStyle = {
  accent: "#c9a84c",
  accentSoft: "#e8d5a3",
};

export const creatorThemes: Record<CreatorThemeId, CreatorThemeStyle> = {
  dashboard: dashboardTheme,
  ...(Object.fromEntries(
    (Object.keys(sparkleThemes) as SparkleThemeId[]).map((id) => [
      id,
      { accent: sparkleThemes[id].mid, accentSoft: sparkleThemes[id].accent },
    ])
  ) as Record<SparkleThemeId, CreatorThemeStyle>),
};

export function getCreatorTheme(id: CreatorThemeId): CreatorThemeStyle {
  return creatorThemes[id];
}
