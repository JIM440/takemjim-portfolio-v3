import { timingSafeEqual } from "crypto";
import { NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  adminSessionCookieOptions,
  createSessionCookieValue,
  getSigningSecret,
} from "@/lib/admin-session";

function comparePassword(input: string, expected: string): boolean {
  try {
    const a = Buffer.from(input, "utf8");
    const b = Buffer.from(expected, "utf8");
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  const configured = process.env.ADMIN_PASSWORD?.trim();
  if (!configured) {
    return NextResponse.json(
      { error: "ADMIN_PASSWORD is not set. Add it to .env.local." },
      { status: 500 },
    );
  }

  if (!getSigningSecret()) {
    return NextResponse.json(
      {
        error:
          "Could not derive a session signing key. Set ADMIN_SESSION_SECRET (recommended) or ADMIN_PASSWORD in .env.local.",
      },
      { status: 500 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const password =
    body && typeof body === "object" && "password" in body && typeof (body as { password: unknown }).password === "string"
      ? (body as { password: string }).password
      : "";

  if (!password || !comparePassword(password, configured)) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  const token = createSessionCookieValue();
  if (!token) {
    return NextResponse.json({ error: "Could not create session." }, { status: 500 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_SESSION_COOKIE, token, adminSessionCookieOptions());
  return res;
}
