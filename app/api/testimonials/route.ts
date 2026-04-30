import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import { testimonialStore } from "@/lib/data-store";

export async function GET() {
  console.log("GET /api/testimonials - start");
  const testimonials = testimonialStore.list();
  console.log("GET /api/testimonials - found", testimonials.length);
  return NextResponse.json({ testimonials });
}
