import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAdminAuthorized } from "@/lib/admin-auth-request";
import { blogStore } from "@/lib/data-store";
import type { BlogPost } from "@/lib/data-store";

type BlogInput = Omit<BlogPost, "id" | "publishedAt" | "updatedAt">;

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

function isBlogInput(body: Partial<BlogPost>): body is BlogInput {
  return Boolean(
    body.title?.trim() &&
      body.slug?.trim() &&
      body.excerpt?.trim() &&
      body.category?.trim() &&
      body.bodyHtml?.trim(),
  );
}

export async function GET(request: NextRequest) {
  if (!isAdminAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({ blogs: blogStore.list() });
}

export async function POST(request: NextRequest) {
  if (!isAdminAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = normalizeBlogPayload(await request.json());
    if (!isBlogInput(body)) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    const blog = blogStore.create(body);
    revalidatePath("/blog");
    revalidatePath(`/blog/${blog.slug}`);
    revalidatePath("/sitemap.xml");
    return NextResponse.json({ blog });
  } catch (error) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }
}
