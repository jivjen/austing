import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductGrid from "@/components/ProductGrid";
import { client } from "@/sanity/lib/client";
import {
  CATEGORY_BY_SLUG_QUERY,
  PRODUCTS_BY_CATEGORY_QUERY,
} from "@/sanity/lib/queries";
import type { SanityCategory, SanityProduct } from "@/sanity/lib/types";
import type { ProductCardProps } from "@/components/ProductCard";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";

function mapProducts(products: SanityProduct[]): ProductCardProps[] {
  return products.map((p) => ({
    name: p.name,
    category: p.category ?? "Jewelry",
    price: p.price,
    imageUrl: p.image ? urlFor(p.image).width(600).height(600).url() : undefined,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = await client.fetch<SanityCategory | null>(CATEGORY_BY_SLUG_QUERY, { slug });
  if (!category) return { title: "Collection Not Found" };
  return { title: `${category.name} | Austin Jewelry` };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [category, products] = await Promise.all([
    client.fetch<SanityCategory | null>(CATEGORY_BY_SLUG_QUERY, { slug }),
    client.fetch<SanityProduct[]>(PRODUCTS_BY_CATEGORY_QUERY, { slug }),
  ]);

  if (!category) notFound();

  return (
    <>
      <Header variant="dark" />
      <main className="pt-32 pb-24 px-6 min-h-screen">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/collections"
            className="font-body text-xs tracking-[0.15em] uppercase text-burgundy/50 hover:text-burgundy transition-colors duration-300 mb-8 inline-block"
          >
            &larr; All Collections
          </Link>

          <h1 className="font-heading text-5xl md:text-6xl text-burgundy mb-4 italic">
            {category.name}
          </h1>
          {category.description && (
            <p className="font-body text-sm text-burgundy/60 mb-16 max-w-lg">
              {category.description}
            </p>
          )}

          {products.length > 0 ? (
            <ProductGrid products={mapProducts(products)} columns={3} />
          ) : (
            <p className="font-body text-burgundy/40 text-center py-16">
              No products in this collection yet.
            </p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
