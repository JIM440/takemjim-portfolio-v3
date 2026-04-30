import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { isAdminAuthorized } from "@/lib/admin-auth-request";
import { messageStore } from "@/lib/data-store";

export async function GET(request: NextRequest) {
  if (!isAdminAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ messages: messageStore.list() });
}
