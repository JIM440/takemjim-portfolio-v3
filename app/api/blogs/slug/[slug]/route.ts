import { NextRequest, NextResponse } from "next/server";
import { blogStore } from "@/lib/data-store";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const blog = blogStore.get(slug);
  if (!blog) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ blog });
}
