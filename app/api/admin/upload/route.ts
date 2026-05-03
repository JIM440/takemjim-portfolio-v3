import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthorized } from "@/lib/admin-auth-request";

const DEFAULT_BUCKET = "uploads";

function getSupabaseUploadConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  const bucket = process.env.SUPABASE_STORAGE_BUCKET || DEFAULT_BUCKET;

  if (!url || !key) {
    return null;
  }

  return {
    url: url.replace(/\/$/, ""),
    key,
    bucket,
  };
}

function sanitizeFilename(name: string) {
  const fallback = "image";
  const cleaned = name
    .split(/[\\/]/)
    .pop()
    ?.toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return cleaned || fallback;
}

export async function POST(request: NextRequest) {
  if (!isAdminAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "Only image uploads are supported" }, { status: 400 });
    }

    const config = getSupabaseUploadConfig();
    if (!config) {
      return NextResponse.json({ error: "Supabase upload is not configured" }, { status: 500 });
    }

    const filename = `${Date.now()}-${crypto.randomUUID()}-${sanitizeFilename(file.name)}`;
    const objectPath = `blog/${filename}`;
    const uploadUrl = `${config.url}/storage/v1/object/${config.bucket}/${objectPath}`;
    const bytes = await file.arrayBuffer();

    const uploadRes = await fetch(uploadUrl, {
      method: "POST",
      headers: {
        apikey: config.key,
        Authorization: `Bearer ${config.key}`,
        "Content-Type": file.type,
        "x-upsert": "false",
      },
      body: bytes,
    });

    if (!uploadRes.ok) {
      const message = await uploadRes.text();
      console.error("Supabase upload error:", message);
      return NextResponse.json({ error: "Failed to upload file" }, { status: 502 });
    }

    return NextResponse.json({
      url: `${config.url}/storage/v1/object/public/${config.bucket}/${objectPath}`,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
  }
}
