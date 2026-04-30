import type { NextRequest } from "next/server";
import { ADMIN_SESSION_COOKIE } from "@/lib/admin-session-constants";
import { verifySessionCookieValue } from "@/lib/admin-session";

/** Browser session from login, or Bearer ADMIN_API_SECRET for scripts / tooling. */
export function isAdminAuthorized(request: NextRequest): boolean {
  const apiSecret = process.env.ADMIN_API_SECRET?.trim();
  const auth = request.headers.get("authorization");
  if (apiSecret && auth === `Bearer ${apiSecret}`) {
    return true;
  }

  const cookie = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  return verifySessionCookieValue(cookie);
}
