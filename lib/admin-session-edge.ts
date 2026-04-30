/**
 * Edge-safe session verification (Web Crypto) for middleware.
 * Must stay in sync with `lib/admin-session.ts` (Node) token format.
 */

async function sha256Hex(text: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function getSigningSecretEdge(): Promise<string | null> {
  const explicit = process.env.ADMIN_SESSION_SECRET?.trim();
  if (explicit && explicit.length >= 16) return explicit;

  const pw = process.env.ADMIN_PASSWORD?.trim();
  if (!pw) return null;

  return sha256Hex(`portfolio-admin-session|${pw}`);
}

async function hmacSha256Hex(secret: string, payload: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function timingSafeEqualHex(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let out = 0;
  for (let i = 0; i < a.length; i++) {
    out |= a.charCodeAt(i)! ^ b.charCodeAt(i)!;
  }
  return out === 0;
}

export async function verifySessionCookieValueEdge(value: string | undefined): Promise<boolean> {
  if (!value) return false;

  const secret = await getSigningSecretEdge();
  if (!secret) return false;

  const dot = value.lastIndexOf(".");
  if (dot <= 0) return false;
  const payload = value.slice(0, dot);
  const sig = value.slice(dot + 1);
  if (!payload.includes(".") || !sig) return false;

  const expected = await hmacSha256Hex(secret, payload);
  if (!timingSafeEqualHex(sig, expected)) return false;

  const expStr = payload.slice(0, payload.indexOf("."));
  const exp = Number(expStr);
  return Number.isFinite(exp) && exp > Date.now();
}
