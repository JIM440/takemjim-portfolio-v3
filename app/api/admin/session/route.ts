import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, verifySessionCookieValue } from "@/lib/admin-session";

export async function GET() {
  const jar = await cookies();
  const value = jar.get(ADMIN_SESSION_COOKIE)?.value;
  const ok = verifySessionCookieValue(value);

  return NextResponse.json({ ok });
}
