import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import BrandStory from "@/components/BrandStory";
import Footer from "@/components/Footer";
import { client } from "@/sanity/lib/client";
import { PRODUCTS_QUERY } from "@/sanity/lib/queries";
import type { SanityProduct } from "@/sanity/lib/types";
import type { ProductCardProps } from "@/components/ProductCard";
import { urlFor } from "@/sanity/lib/image";

const fallbackSolaLuna: ProductCardProps[] = [
  { name: "Radiant Sun", category: "Necklace", price: 550 },
  { name: "Sun and Moon", category: "Earrings", price: 650 },
  { name: "Star-Studded Sky", category: "Bracelet", price: 500 },
  { name: "Radiant Sun", category: "Necklace", price: 550 },
  { name: "Sun and Moon", category: "Earrings", price: 650 },
  { name: "Star-Studded Sky", category: "Bracelet", price: 500 },
];

const fallbackEarrings: ProductCardProps[] = [
  {
    name: "Floating Heart",
    category: "Custom Earrings",
    subtitle: "Your Choice of Gem",
    price: 499,
  },
  {
    name: "Floating Heart",
    category: "Custom Earrings",
    subtitle: "Your Choice of Gem",
    price: 699,
  },
];

function mapProducts(products: SanityProduct[]): ProductCardProps[] {
  return products.map((p) => ({
    name: p.name,
    category: p.category ?? "Jewelry",
    price: p.price,
    imageUrl: p.image ? urlFor(p.image).width(600).height(600).url() : undefined,
  }));
}

export default async function Home() {
  let solaLunaProducts: ProductCardProps[] = fallbackSolaLuna;
  let earringProducts: ProductCardProps[] = fallbackEarrings;

  try {
    const sanityProducts = await client.fetch<SanityProduct[]>(PRODUCTS_QUERY);
    if (sanityProducts.length > 0) {
      const mapped = mapProducts(sanityProducts);
      solaLunaProducts = mapped.slice(0, 6);
      if (mapped.length > 6) {
        earringProducts = mapped.slice(6);
      }
    }
  } catch {
    // Sanity not configured or empty — use fallback data
  }

  return (
    <>
      <Header />
      <Hero />

      {/* Sola & Luna Collection - 3 column grid on light bg */}
      <section id="collections" className="py-24 md:py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-heading text-4xl md:text-5xl text-burgundy text-center mb-16 italic">
            Sola &amp; Luna Collection
          </h2>
          <ProductGrid products={solaLunaProducts} columns={3} />
        </div>
      </section>

      {/* Latest Earring Collection - 2 column dense grid on dark bg */}
      <section className="py-24 md:py-32 px-6 bg-burgundy">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-4xl md:text-5xl text-white text-center mb-16 italic">
            Sola &amp; Luna Collection
          </h2>
          <ProductGrid products={earringProducts} columns={2} variant="dark" />
        </div>
      </section>

      <BrandStory />
      <Footer />
    </>
  );
}
