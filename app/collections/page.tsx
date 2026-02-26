import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { client } from "@/sanity/lib/client";
import { ALL_CATEGORIES_QUERY } from "@/sanity/lib/queries";
import type { SanityCategoryWithCount } from "@/sanity/lib/types";
import CollectionCard from "@/components/CollectionCard";

export const metadata = {
  title: "Collections | Austin Jewelry",
};

export default async function CollectionsPage() {
  const categories = await client.fetch<SanityCategoryWithCount[]>(ALL_CATEGORIES_QUERY);

  return (
    <>
      <Header variant="dark" />
      <main className="pt-32 pb-24 px-6 min-h-screen">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-heading text-5xl md:text-6xl text-burgundy text-center mb-4 italic">
            Our Collections
          </h1>
          <p className="font-body text-sm text-burgundy/60 text-center mb-16 max-w-md mx-auto">
            Explore our curated collections, each telling its own story through precious metals and gemstones.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((cat) => (
              <Link key={cat._id} href={`/collections/${cat.slug}`}>
                <CollectionCard
                  name={cat.name}
                  description={cat.description}
                  productCount={cat.productCount}
                />
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
