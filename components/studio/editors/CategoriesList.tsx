"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Category, Product } from "@/lib/content/types";

export default function CategoriesList({
  categories,
  products,
}: {
  categories: Category[];
  products: Product[];
}) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const productCount = (categoryId: string) =>
    products.filter((p) => p.categoryId === categoryId).length;

  async function handleDelete(category: Category) {
    const inUse = productCount(category.id);
    if (inUse > 0) {
      setError(
        `"${category.name}" is used by ${inUse} product${inUse === 1 ? "" : "s"} — move them to another category first.`
      );
      return;
    }
    if (!window.confirm(`Delete "${category.name}"? This cannot be undone.`)) return;
    setDeletingId(category.id);
    setError(null);
    try {
      const res = await fetch("/api/studio/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          section: "categories",
          data: categories.filter((c) => c.id !== category.id),
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Delete failed");
      }
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-heading text-2xl text-burgundy">Categories</h1>
          <p className="font-body text-xs mt-0.5">
            {error ? (
              <span className="text-red-600">{error}</span>
            ) : (
              <span className="text-burgundy/40">{categories.length} total</span>
            )}
          </p>
        </div>
        <Link
          href="/studio/categories/new"
          className="font-body text-xs tracking-[0.15em] uppercase bg-burgundy text-white px-6 py-2.5 rounded-sm hover:bg-burgundy/90 transition-colors shrink-0"
        >
          + Add category
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-white rounded-md border border-burgundy/10 overflow-hidden p-5"
          >
            <div className="aspect-[16/9] bg-blush/30 rounded-sm mb-4 -mx-5 -mt-5 w-[calc(100%+2.5rem)] flex items-center justify-center overflow-hidden">
              {category.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={category.image} alt="" className="w-full h-full object-cover" />
              ) : (
                <span className="font-heading text-burgundy/20 text-4xl italic">
                  {category.name.charAt(0)}
                </span>
              )}
            </div>
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="font-heading text-lg text-burgundy">{category.name}</h3>
              {category.featuredOnHomepage && (
                <span className="shrink-0 font-body text-[9px] tracking-[0.1em] uppercase bg-gold/15 text-gold px-2 py-1 rounded-sm">
                  Featured
                </span>
              )}
            </div>
            {category.description && (
              <p className="font-body text-xs text-burgundy/50 leading-relaxed mb-3 line-clamp-2">
                {category.description}
              </p>
            )}
            <p className="font-body text-xs text-burgundy/40 mb-4">
              {productCount(category.id)} product{productCount(category.id) === 1 ? "" : "s"} ·{" "}
              {category.displayVariant} · {category.columns} col
            </p>
            <div className="flex justify-between border-t border-burgundy/5 pt-3">
              <Link
                href={`/studio/categories/${category.id}`}
                className="font-body text-xs text-burgundy/50 hover:text-burgundy"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(category)}
                disabled={deletingId === category.id}
                className="font-body text-xs text-burgundy/50 hover:text-red-600 disabled:opacity-40"
              >
                {deletingId === category.id ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
