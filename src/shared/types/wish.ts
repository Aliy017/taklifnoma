export type WishSide = "groom" | "bride" | "general";

export interface Wish {
  id: string;
  name: string;
  side: WishSide;
  message: string;
  createdAt: string;
  likes: number;
}

export const WISH_SIDE_LABELS: Record<WishSide, string> = {
  groom: "Kuyov tomondan",
  bride: "Kelin tomondan",
  general: "Umumiy tabrik",
};
