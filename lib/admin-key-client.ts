export const adminKeyStorageName = "afroparceiros-admin-key";

export function readAdminKey() {
  if (typeof window === "undefined") return "";
  return window.sessionStorage.getItem(adminKeyStorageName) ?? "";
}

export function rememberAdminKey(value: string) {
  if (typeof window === "undefined") return;
  const key = value.trim();
  if (key) window.sessionStorage.setItem(adminKeyStorageName, key);
  else window.sessionStorage.removeItem(adminKeyStorageName);
}

export function adminHeaders(key: string, json = false) {
  return {
    ...(json ? { "Content-Type": "application/json" } : {}),
    "X-Admin-Key": key.trim(),
  };
}

