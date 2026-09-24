import { NextRequest, NextResponse } from "next/server";
import { requireStudioSession } from "@/lib/auth/require";
import { commitJsonFile } from "@/lib/content/github";
import type { SiteContent, SectionKey } from "@/lib/content/types";

const CONTENT_PATH = "content/site-content.json";

const VALID_SECTIONS: SectionKey[] = [
  "siteSettings",
  "hero",
  "brandStory",
  "collectionsPage",
  "newArrivalsPage",
  "categories",
  "products",
];

export async function POST(request: NextRequest) {
  const { unauthorized } = await requireStudioSession(request);
  if (unauthorized) return unauthorized;

  const body = await request.json().catch(() => null);
  const section = body?.section as SectionKey | undefined;
  const data = body?.data;

  if (!section || !VALID_SECTIONS.includes(section) || data === undefined) {
    return NextResponse.json({ error: "Invalid section or data" }, { status: 400 });
  }

  try {
    const updated = await commitJsonFile<SiteContent>(
      CONTENT_PATH,
      `studio: update ${section}`,
      (current) => ({ ...current, [section]: data })
    );
    return NextResponse.json({ ok: true, content: updated });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Save failed" },
      { status: 500 }
    );
  }
}
