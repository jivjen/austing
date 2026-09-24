"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Category, Product } from "@/lib/content/types";

export default function ProductsList({
  products,
  categories,
}: {
  products: Product[];
  categories: Category[];
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const categoryName = (id: string) => categories.find((c) => c.id === id)?.name ?? "Uncategorized";

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesQuery = p.name.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = categoryFilter === "all" || p.categoryId === categoryFilter;
      return matchesQuery && matchesCategory;
    });
  }, [products, query, categoryFilter]);

  async function handleDelete(product: Product) {
    if (!window.confirm(`Delete "${product.name}"? This cannot be undone.`)) return;
    setDeletingId(product.id);
    setError(null);
    try {
      const res = await fetch("/api/studio/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          section: "products",
          data: products.filter((p) => p.id !== product.id),
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
          <h1 className="font-heading text-2xl text-burgundy">Products</h1>
          <p className="font-body text-xs text-burgundy/40 mt-0.5">
            {error ? <span className="text-red-600">{error}</span> : `${products.length} total`}
          </p>
        </div>
        <Link
          href="/studio/products/new"
          className="font-body text-xs tracking-[0.15em] uppercase bg-burgundy text-white px-6 py-2.5 rounded-sm hover:bg-burgundy/90 transition-colors shrink-0"
        >
          + Add product
        </Link>
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 min-w-[200px] rounded-sm border border-burgundy/15 px-3 py-2.5 font-body text-sm text-burgundy outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors bg-white"
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="rounded-sm border border-burgundy/15 px-3 py-2.5 font-body text-sm text-burgundy outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors bg-white"
        >
          <option value="all">All categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-md border border-burgundy/10 overflow-hidden group"
          >
            <Link href={`/studio/products/${product.id}`} className="block">
              <div className="aspect-square bg-blush/30">
                {product.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={product.image} alt="" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="font-heading text-burgundy/20 text-3xl italic">
                      {product.name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <p className="font-body text-[10px] tracking-[0.15em] uppercase text-burgundy/40 mb-1">
                  {categoryName(product.categoryId)}
                </p>
                <h3 className="font-heading text-base text-burgundy mb-1">{product.name}</h3>
                <p className="font-body text-sm text-gold">&#8377;{product.price}</p>
              </div>
            </Link>
            <div className="border-t border-burgundy/5 px-4 py-2 flex justify-between">
              <Link
                href={`/studio/products/${product.id}`}
                className="font-body text-xs text-burgundy/50 hover:text-burgundy"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(product)}
                disabled={deletingId === product.id}
                className="font-body text-xs text-burgundy/50 hover:text-red-600 disabled:opacity-40"
              >
                {deletingId === product.id ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full font-body text-sm text-burgundy/40 text-center py-16">
            No products match your search.
          </p>
        )}
      </div>
    </div>
  );
}
