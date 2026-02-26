import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductGrid from "@/components/ProductGrid";
import { client } from "@/sanity/lib/client";
import { NEW_ARRIVALS_QUERY } from "@/sanity/lib/queries";
import type { SanityProduct } from "@/sanity/lib/types";
import type { ProductCardProps } from "@/components/ProductCard";
import { urlFor } from "@/sanity/lib/image";

export const metadata = {
  title: "New Arrivals | AustinG Jewellery",
};

function mapProducts(products: SanityProduct[]): ProductCardProps[] {
  return products.map((p) => ({
    name: p.name,
    category: p.category ?? "Jewellery",
    price: p.price,
    imageUrl: p.image ? urlFor(p.image).width(600).height(600).url() : undefined,
  }));
}

export default async function NewArrivalsPage() {
  const products = await client.fetch<SanityProduct[]>(NEW_ARRIVALS_QUERY);

  return (
    <>
      <Header variant="dark" />
      <main className="pt-32 pb-24 px-6 min-h-screen">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-heading text-5xl md:text-6xl text-burgundy text-center mb-4 italic">
            New Arrivals
          </h1>
          <p className="font-body text-sm text-burgundy/60 text-center mb-16 max-w-md mx-auto">
            The latest additions to our collection, fresh from the workshop.
          </p>

          {products.length > 0 ? (
            <ProductGrid products={mapProducts(products)} columns={3} />
          ) : (
            <p className="font-body text-burgundy/40 text-center py-16">
              New pieces coming soon.
            </p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
