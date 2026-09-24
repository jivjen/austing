"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Field, TextInput, TextArea, Toggle, SwatchOption } from "@/components/studio/fields";
import PreviewPane from "@/components/studio/PreviewPane";
import ImageUploader from "@/components/studio/ImageUploader";
import CollectionCard from "@/components/CollectionCard";
import { slugify } from "@/lib/slug";
import type { Category, Product } from "@/lib/content/types";

interface CategoryFormProps {
  mode: "create" | "edit";
  category?: Category;
  allCategories: Category[];
  products: Product[];
}

function newId(existing: Category[]): string {
  const ids = new Set(existing.map((c) => c.id));
  let n = existing.length + 1;
  let id = `cat-${String(n).padStart(2, "0")}`;
  while (ids.has(id)) {
    n++;
    id = `cat-${String(n).padStart(2, "0")}`;
  }
  return id;
}

export default function CategoryForm({ mode, category, allCategories, products }: CategoryFormProps) {
  const router = useRouter();
  const [name, setName] = useState(category?.name ?? "");
  const [slug, setSlug] = useState(category?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(mode === "edit");
  const [description, setDescription] = useState(category?.description ?? "");
  const [image, setImage] = useState(category?.image ?? "");
  const [featuredOnHomepage, setFeaturedOnHomepage] = useState(category?.featuredOnHomepage ?? false);
  const [displayOrder, setDisplayOrder] = useState<number>(category?.displayOrder ?? 0);
  const [displayVariant, setDisplayVariant] = useState<"light" | "dark">(
    category?.displayVariant ?? "light"
  );
  const [columns, setColumns] = useState<2 | 3>(category?.columns ?? 3);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const productCount = products.filter((p) => p.categoryId === category?.id).length;

  function handleNameChange(value: string) {
    setName(value);
    if (!slugTouched) setSlug(slugify(value));
  }

  async function persist(nextCategories: Category[]) {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/studio/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: "categories", data: nextCategories }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Save failed");
      }
      router.push("/studio/categories");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
      setSaving(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !slug.trim()) {
      setError("Name and slug are required");
      return;
    }
    const finalSlug = slugify(slug);
    const duplicate = allCategories.some((c) => c.slug === finalSlug && c.id !== category?.id);
    if (duplicate) {
      setError("Another category already uses this slug");
      return;
    }

    const record: Category = {
      id: category?.id ?? newId(allCategories),
      name: name.trim(),
      slug: finalSlug,
      description,
      image,
      featuredOnHomepage,
      displayOrder: Number(displayOrder) || 0,
      displayVariant,
      columns,
    };

    const nextCategories =
      mode === "create"
        ? [...allCategories, record]
        : allCategories.map((c) => (c.id === record.id ? record : c));

    await persist(nextCategories);
  }

  async function handleDelete() {
    if (!category) return;
    if (productCount > 0) {
      setError(
        `"${category.name}" is used by ${productCount} product${productCount === 1 ? "" : "s"} — move them to another category first.`
      );
      return;
    }
    if (!window.confirm(`Delete "${category.name}"? This cannot be undone.`)) return;
    await persist(allCategories.filter((c) => c.id !== category.id));
  }

  return (
    <div>
      <div className="sticky top-0 z-10 flex items-center justify-between gap-4 bg-white/95 backdrop-blur border-b border-burgundy/10 px-8 py-5 -mx-8 -mt-8 mb-8">
        <div>
          <h1 className="font-heading text-2xl text-burgundy">
            {mode === "create" ? "Add Category" : `Edit ${category?.name}`}
          </h1>
          {error && <p className="font-body text-xs text-red-600 mt-0.5">{error}</p>}
        </div>
        <div className="flex items-center gap-3 shrink-0">
          {mode === "edit" && (
            <button
              type="button"
              onClick={handleDelete}
              disabled={saving}
              className="font-body text-xs tracking-[0.1em] uppercase text-red-600/70 hover:text-red-600 px-4 py-2.5 transition-colors disabled:opacity-40"
            >
              Delete
            </button>
          )}
          <button
            type="submit"
            form="category-form"
            disabled={saving}
            className="font-body text-xs tracking-[0.15em] uppercase bg-burgundy text-white px-6 py-2.5 rounded-sm hover:bg-burgundy/90 transition-colors disabled:opacity-40"
          >
            {saving ? "Saving..." : "Save category"}
          </button>
        </div>
      </div>

      <form id="category-form" onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-10">
        <div className="w-full lg:w-[420px] shrink-0">
          <Field label="Name">
            <TextInput value={name} onChange={(e) => handleNameChange(e.target.value)} required />
          </Field>
          <Field label="Slug" hint="Used in the collection URL.">
            <TextInput
              value={slug}
              onChange={(e) => {
                setSlugTouched(true);
                setSlug(e.target.value);
              }}
              required
            />
          </Field>
          <Field label="Description">
            <TextArea rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
          </Field>

          <div className="mb-6">
            <ImageUploader
              value={image}
              onChange={setImage}
              folder="categories"
              label="Collection Image"
            />
          </div>

          <div className="mb-6">
            <Toggle
              checked={featuredOnHomepage}
              onChange={setFeaturedOnHomepage}
              label="Show this collection on the homepage"
            />
          </div>

          {featuredOnHomepage && (
            <>
              <Field label="Display order" hint="Lower numbers appear first on the homepage.">
                <TextInput
                  type="number"
                  value={displayOrder}
                  onChange={(e) => setDisplayOrder(Number(e.target.value))}
                />
              </Field>

              <div className="mb-6">
                <span className="block font-body text-[11px] tracking-[0.15em] uppercase text-burgundy/60 mb-2">
                  Section style
                </span>
                <div className="flex gap-2">
                  <SwatchOption active={displayVariant === "light"} onClick={() => setDisplayVariant("light")}>
                    Light
                  </SwatchOption>
                  <SwatchOption active={displayVariant === "dark"} onClick={() => setDisplayVariant("dark")}>
                    Dark
                  </SwatchOption>
                </div>
              </div>

              <div className="mb-6">
                <span className="block font-body text-[11px] tracking-[0.15em] uppercase text-burgundy/60 mb-2">
                  Columns
                </span>
                <div className="flex gap-2">
                  <SwatchOption active={columns === 2} onClick={() => setColumns(2)}>
                    2 columns
                  </SwatchOption>
                  <SwatchOption active={columns === 3} onClick={() => setColumns(3)}>
                    3 columns
                  </SwatchOption>
                </div>
              </div>
            </>
          )}
        </div>

        <PreviewPane>
          <div className="bg-blush/10 p-8 max-w-xs">
            <CollectionCard
              name={name || "Collection name"}
              description={description}
              productCount={productCount}
              image={image}
            />
          </div>
        </PreviewPane>
      </form>
    </div>
  );
}
