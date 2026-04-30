import { createHash, createHmac, randomBytes, timingSafeEqual } from "crypto";
import { COOKIE_MAX_AGE_SEC } from "@/lib/admin-session-constants";

export { ADMIN_SESSION_COOKIE } from "@/lib/admin-session-constants";

/** Prefer a long random string in production; falls back to a hash of ADMIN_PASSWORD only when ADMIN_SESSION_SECRET is unset. */
export function getSigningSecret(): string | null {
  const explicit = process.env.ADMIN_SESSION_SECRET?.trim();
  if (explicit && explicit.length >= 16) return explicit;

  const pw = process.env.ADMIN_PASSWORD?.trim();
  if (!pw) return null;

  return createHash("sha256").update(`portfolio-admin-session|${pw}`, "utf8").digest("hex");
}

export function createSessionCookieValue(): string | null {
  const secret = getSigningSecret();
  if (!secret) return null;

  const exp = Date.now() + COOKIE_MAX_AGE_SEC * 1000;
  const nonce = randomBytes(8).toString("hex");
  const payload = `${exp}.${nonce}`;
  const sig = createHmac("sha256", secret).update(payload).digest("hex");
  return `${payload}.${sig}`;
}

export function verifySessionCookieValue(value: string | undefined): boolean {
  if (!value) return false;
  const secret = getSigningSecret();
  if (!secret) return false;

  const dot = value.lastIndexOf(".");
  if (dot <= 0) return false;
  const payload = value.slice(0, dot);
  const sig = value.slice(dot + 1);
  if (!payload.includes(".") || !sig) return false;

  const expected = createHmac("sha256", secret).update(payload).digest("hex");
  try {
    const a = Buffer.from(sig, "hex");
    const b = Buffer.from(expected, "hex");
    if (a.length !== b.length) return false;
    if (!timingSafeEqual(a, b)) return false;
  } catch {
    return false;
  }

  const expStr = payload.slice(0, payload.indexOf("."));
  const exp = Number(expStr);
  return Number.isFinite(exp) && exp > Date.now();
}

export function adminSessionCookieOptions(maxAgeSec: number = COOKIE_MAX_AGE_SEC) {
  return {
    httpOnly: true as const,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: maxAgeSec,
  };
}
