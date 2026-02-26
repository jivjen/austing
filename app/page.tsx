import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import BrandStory from "@/components/BrandStory";
import Footer from "@/components/Footer";
import { client } from "@/sanity/lib/client";
import { HOMEPAGE_COLLECTIONS_QUERY } from "@/sanity/lib/queries";
import type { SanityCollection } from "@/sanity/lib/types";
import type { ProductCardProps } from "@/components/ProductCard";
import { urlFor } from "@/sanity/lib/image";

function mapProducts(products: SanityCollection["products"]): ProductCardProps[] {
  return products.map((p) => ({
    name: p.name,
    category: p.category ?? "Jewelry",
    price: p.price,
    imageUrl: p.image ? urlFor(p.image).width(600).height(600).url() : undefined,
  }));
}

export default async function Home() {
  let collections: SanityCollection[] = [];

  try {
    collections = await client.fetch<SanityCollection[]>(HOMEPAGE_COLLECTIONS_QUERY);
  } catch {
    // Sanity not configured or empty — page renders with no collections
  }

  return (
    <>
      <Header />
      <Hero />

      {collections.map((collection) => {
        const isDark = collection.displayVariant === "dark";
        const columns = (collection.columns ?? 3) as 2 | 3;
        const products = mapProducts(collection.products);

        if (products.length === 0) return null;

        return (
          <section
            key={collection._id}
            className={`py-24 md:py-32 px-6 ${isDark ? "bg-burgundy" : ""}`}
          >
            <div className={`mx-auto ${columns === 2 ? "max-w-4xl" : "max-w-6xl"}`}>
              <h2
                className={`font-heading text-4xl md:text-5xl text-center mb-16 italic ${
                  isDark ? "text-white" : "text-burgundy"
                }`}
              >
                {collection.name}
              </h2>
              <ProductGrid
                products={products}
                columns={columns}
                variant={isDark ? "dark" : "light"}
              />
            </div>
          </section>
        );
      })}

      <BrandStory />
      <Footer />
    </>
  );
}
