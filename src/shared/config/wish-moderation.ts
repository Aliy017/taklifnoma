/** Maxfiy kalit: ism yoki tabrik maydoniga yozilsa moderatsiya ochiladi */
export const MODERATOR_KEY = "eba";

export function isModeratorKey(value: string) {
  return value.trim().toLowerCase() === MODERATOR_KEY;
}

export function checkModeratorUnlock(name: string, message: string) {
  return isModeratorKey(name) || isModeratorKey(message);
}

const STORAGE_KEY = "taklifnoma-moderator";

export function readModeratorMode(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

export function saveModeratorMode(enabled: boolean) {
  localStorage.setItem(STORAGE_KEY, enabled ? "1" : "0");
}
