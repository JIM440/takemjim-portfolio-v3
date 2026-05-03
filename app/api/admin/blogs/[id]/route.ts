import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAdminAuthorized } from "@/lib/admin-auth-request";
import { blogStore } from "@/lib/data-store";
import type { BlogPost } from "@/lib/data-store";

function normalizeLocalUrls(value?: string) {
  if (typeof value !== "string") return value;

  return value
    .replaceAll("http://localhost:3001", "")
    .replaceAll("https://localhost:3001", "")
    .replaceAll("http://127.0.0.1:3001", "")
    .replaceAll("https://127.0.0.1:3001", "");
}

function normalizeBlogPayload(body: Partial<BlogPost>) {
  const next: Partial<BlogPost> = {
    ...body,
    bodyHtml: normalizeLocalUrls(body.bodyHtml),
    image: normalizeLocalUrls(body.image),
  };
  return next;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAdminAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const blog = blogStore.list().find((b) => b.id === id);
  if (!blog) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ blog });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAdminAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  try {
    const existing = blogStore.list().find((b) => b.id === id);
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const body = normalizeBlogPayload(await request.json());
    const blog = blogStore.update(id, body);
    if (!blog) return NextResponse.json({ error: "Not found" }, { status: 404 });
    revalidatePath("/blog");
    revalidatePath(`/blog/${existing.slug}`);
    revalidatePath(`/blog/${blog.slug}`);
    revalidatePath("/sitemap.xml");
    return NextResponse.json({ blog });
  } catch (error) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAdminAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const blog = blogStore.list().find((b) => b.id === id);
  if (!blog) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const deleted = blogStore.delete(id);
  if (!deleted) return NextResponse.json({ error: "Not found" }, { status: 404 });

  revalidatePath("/blog");
  revalidatePath(`/blog/${blog.slug}`);
  revalidatePath("/sitemap.xml");
  return NextResponse.json({ ok: true });
}
