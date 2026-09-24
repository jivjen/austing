import { NextRequest, NextResponse } from "next/server";
import { requireStudioSession } from "@/lib/auth/require";
import { commitFile } from "@/lib/content/github";

function slugify(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function POST(request: NextRequest) {
  const { unauthorized } = await requireStudioSession(request);
  if (unauthorized) return unauthorized;

  const form = await request.formData().catch(() => null);
  const file = form?.get("file");
  const folder = (form?.get("folder") as string) || "misc";

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }
  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "Only image uploads are allowed" }, { status: 400 });
  }
  if (file.size > 8 * 1024 * 1024) {
    return NextResponse.json({ error: "Image too large (max 8MB)" }, { status: 400 });
  }

  const ext = file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg";
  const base = slugify(file.name.replace(/\.[^.]+$/, "")) || "image";
  const filename = `${base}-${Date.now()}.${ext}`;
  const safeFolder = slugify(folder) || "misc";
  const filePath = `public/uploads/${safeFolder}/${filename}`;

  const buffer = Buffer.from(await file.arrayBuffer());

  try {
    await commitFile(filePath, buffer, `studio: upload ${filename}`);
    return NextResponse.json({ ok: true, path: `/uploads/${safeFolder}/${filename}` });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Upload failed" },
      { status: 500 }
    );
  }
}
