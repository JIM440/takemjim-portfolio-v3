import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import { blogStore } from "@/lib/data-store";

export async function GET() {
  console.log("GET /api/blogs - start");
  const blogs = blogStore.list();
  console.log("GET /api/blogs - found", blogs.length);
  console.log("GET /api/blogs - end");
  return NextResponse.json({ blogs });
}
