import { NextRequest, NextResponse } from "next/server";
import { requireStudioSession } from "@/lib/auth/require";
import { commitJsonFile } from "@/lib/content/github";
import { slugify } from "@/lib/slug";
import type { SiteContent, SectionKey, Category, Product } from "@/lib/content/types";

const CONTENT_PATH = "content/site-content.json";

const REPLACE_SECTIONS: SectionKey[] = [
  "siteSettings",
  "hero",
  "brandStory",
  "collectionsPage",
  "newArrivalsPage",
];

const LIST_SECTIONS = ["products", "categories"] as const;
type ListSection = (typeof LIST_SECTIONS)[number];

function isListSection(section: unknown): section is ListSection {
  return section === "products" || section === "categories";
}

function nextRecordId(prefix: string, existing: { id: string }[]): string {
  const nums = existing
    .map((x) => parseInt(x.id.replace(`${prefix}-`, ""), 10))
    .filter((n) => Number.isFinite(n));
  const next = (nums.length ? Math.max(...nums) : 0) + 1;
  return `${prefix}-${String(next).padStart(2, "0")}`;
}

function uniqueSlug(base: string, existing: { id: string; slug: string }[], excludeId?: string): string {
  const taken = new Set(existing.filter((x) => x.id !== excludeId).map((x) => x.slug));
  let slug = base || "item";
  let n = 2;
  while (taken.has(slug)) slug = `${base}-${n++}`;
  return slug;
}

export async function POST(request: NextRequest) {
  const { unauthorized } = await requireStudioSession(request);
  if (unauthorized) return unauthorized;

  const body = await request.json().catch(() => null);
  const section = body?.section;

  if (isListSection(section)) {
    return handleListMutation(section, body);
  }

  if (!REPLACE_SECTIONS.includes(section) || body?.data === undefined) {
    return NextResponse.json({ error: "Invalid section or data" }, { status: 400 });
  }

  try {
    const updated = await commitJsonFile<SiteContent>(
      CONTENT_PATH,
      `studio: update ${section}`,
      (current) => ({ ...current, [section]: body.data })
    );
    return NextResponse.json({ ok: true, content: updated });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Save failed" },
      { status: 500 }
    );
  }
}

// Products and categories are mutated one record at a time against whatever
// is freshest on GitHub at write time — never by replacing the whole array
// with a client-held snapshot. A client's snapshot can be stale (another tab
// or teammate added something since this page loaded), and blindly writing
// a full array back would silently erase those concurrent additions. Fetching
// fresh + splicing in just this one change is what makes rapid, concurrent
// edits from multiple tabs safe.
async function handleListMutation(section: ListSection, body: any) {
  const op = body?.op as "create" | "update" | "delete" | undefined;
  if (!op) {
    return NextResponse.json({ error: "Missing op" }, { status: 400 });
  }

  const prefix = section === "products" ? "prod" : "cat";

  try {
    const updated = await commitJsonFile<SiteContent>(
      CONTENT_PATH,
      `studio: ${op} ${section.slice(0, -1)}`,
      (current) => {
        const list = current[section] as (Product | Category)[];

        if (op === "delete") {
          const id = body.id;
          if (section === "categories") {
            const inUse = current.products.filter((p) => p.categoryId === id).length;
            if (inUse > 0) {
              throw new Error(
                `This category is used by ${inUse} product${inUse === 1 ? "" : "s"} — move them to another category first.`
              );
            }
          }
          return { ...current, [section]: list.filter((x) => x.id !== id) };
        }

        const record = body.record;
        if (!record?.name?.trim()) throw new Error("Name is required");

        if (section === "products") {
          const categoryExists = current.categories.some((c) => c.id === record.categoryId);
          if (!categoryExists) throw new Error("Selected category no longer exists");
        }

        const baseSlug = slugify(record.slug || record.name);

        if (op === "create") {
          const id = nextRecordId(prefix, list);
          const slug = uniqueSlug(baseSlug, list as { id: string; slug: string }[]);
          const newRecord = { ...record, id, slug };
          return { ...current, [section]: [newRecord, ...list] };
        }

        if (op === "update") {
          const id = body.id;
          if (!list.some((x) => x.id === id)) {
            throw new Error("This record no longer exists — it may have been deleted elsewhere");
          }
          const slug = uniqueSlug(baseSlug, list as { id: string; slug: string }[], id);
          return {
            ...current,
            [section]: list.map((x) => (x.id === id ? { ...x, ...record, id, slug } : x)),
          };
        }

        throw new Error("Invalid op");
      }
    );
    return NextResponse.json({ ok: true, content: updated });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Save failed" },
      { status: 500 }
    );
  }
}
