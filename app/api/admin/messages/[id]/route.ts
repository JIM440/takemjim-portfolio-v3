import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { isAdminAuthorized } from "@/lib/admin-auth-request";
import { messageStore } from "@/lib/data-store";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function DELETE(request: NextRequest, { params }: RouteContext) {
  if (!isAdminAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  messageStore.delete(id);
  return NextResponse.json({ ok: true });
}
