import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductGrid from "@/components/ProductGrid";
import { getContent, getCategoryBySlug, getProductsByCategoryId } from "@/lib/content/store";
import type { ProductCardProps } from "@/components/ProductCard";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategoryBySlug(getContent(), slug);
  if (!category) return { title: "Collection Not Found" };
  return { title: `${category.name} | AustinG Jewellery` };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const content = getContent();
  const category = getCategoryBySlug(content, slug);
  if (!category) notFound();

  const products: ProductCardProps[] = getProductsByCategoryId(content, category.id).map((p) => ({
    name: p.name,
    category: category.name,
    price: p.price,
    imageUrl: p.image || undefined,
  }));

  return (
    <>
      <Header variant="dark" navLinks={content.siteSettings.navLinks} />
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
            <ProductGrid products={products} columns={3} />
          ) : (
            <p className="font-body text-burgundy/40 text-center py-16">
              No products in this collection yet.
            </p>
          )}
        </div>
      </main>
      <Footer tagline={content.siteSettings.footerTagline} links={content.siteSettings.footerLinks} />
    </>
  );
}
