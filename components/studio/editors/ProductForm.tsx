"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Field, TextInput, TextArea } from "@/components/studio/fields";
import ImageUploader from "@/components/studio/ImageUploader";
import PreviewPane from "@/components/studio/PreviewPane";
import ProductCard from "@/components/ProductCard";
import { slugify } from "@/lib/slug";
import type { Category, Product } from "@/lib/content/types";

interface ProductFormProps {
  mode: "create" | "edit";
  product?: Product;
  categories: Category[];
}

export default function ProductForm({ mode, product, categories }: ProductFormProps) {
  const router = useRouter();
  const [name, setName] = useState(product?.name ?? "");
  const [slug, setSlug] = useState(product?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(mode === "edit");
  const [price, setPrice] = useState<number>(product?.price ?? 0);
  const [image, setImage] = useState(product?.image ?? "");
  const [categoryId, setCategoryId] = useState(product?.categoryId ?? categories[0]?.id ?? "");
  const [description, setDescription] = useState(product?.description ?? "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleNameChange(value: string) {
    setName(value);
    if (!slugTouched) setSlug(slugify(value));
  }

  const categoryName = useMemo(
    () => categories.find((c) => c.id === categoryId)?.name ?? "Jewellery",
    [categories, categoryId]
  );

  async function post(body: unknown) {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/studio/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const resBody = await res.json().catch(() => ({}));
        throw new Error(resBody.error || "Save failed");
      }
      router.push("/studio/products");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
      setSaving(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !slug.trim() || !categoryId) {
      setError("Name, slug and category are required");
      return;
    }

    const record = {
      name: name.trim(),
      slug: slugify(slug),
      price: Number(price) || 0,
      image,
      categoryId,
      description,
    };

    await post(
      mode === "create"
        ? { section: "products", op: "create", record }
        : { section: "products", op: "update", id: product!.id, record }
    );
  }

  async function handleDelete() {
    if (!product) return;
    if (!window.confirm(`Delete "${product.name}"? This cannot be undone.`)) return;
    await post({ section: "products", op: "delete", id: product.id });
  }

  return (
    <div>
      <div className="sticky top-0 z-10 flex items-center justify-between gap-4 bg-white/95 backdrop-blur border-b border-burgundy/10 px-8 py-5 -mx-8 -mt-8 mb-8">
        <div>
          <h1 className="font-heading text-2xl text-burgundy">
            {mode === "create" ? "Add Product" : `Edit ${product?.name}`}
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
            form="product-form"
            disabled={saving}
            className="font-body text-xs tracking-[0.15em] uppercase bg-burgundy text-white px-6 py-2.5 rounded-sm hover:bg-burgundy/90 transition-colors disabled:opacity-40"
          >
            {saving ? "Saving..." : "Save product"}
          </button>
        </div>
      </div>

      <form id="product-form" onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-10">
        <div className="w-full lg:w-[420px] shrink-0">
          <Field label="Name">
            <TextInput value={name} onChange={(e) => handleNameChange(e.target.value)} required />
          </Field>
          <Field label="Slug" hint="Used in the product URL.">
            <TextInput
              value={slug}
              onChange={(e) => {
                setSlugTouched(true);
                setSlug(e.target.value);
              }}
              required
            />
          </Field>
          <Field label="Price">
            <TextInput
              type="number"
              min={0}
              step="0.01"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              required
            />
          </Field>
          <Field label="Category">
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full rounded-sm border border-burgundy/15 px-3 py-2.5 font-body text-sm text-burgundy outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors bg-white"
              required
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Description">
            <TextArea rows={4} value={description} onChange={(e) => setDescription(e.target.value)} />
          </Field>
          <div className="mb-6">
            <ImageUploader value={image} onChange={setImage} folder="products" label="Product Image" />
          </div>
        </div>

        <PreviewPane>
          <div className="bg-blush/10 p-8 max-w-xs">
            <ProductCard
              name={name || "Product name"}
              category={categoryName}
              price={Number(price) || 0}
              imageUrl={image || undefined}
            />
          </div>
        </PreviewPane>
      </form>
    </div>
  );
}
