import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import CollectionCard from "@/components/CollectionCard";
import { getContent } from "@/lib/content/store";

export const metadata = {
  title: "Collections | AustinG Jewellery",
};

export default function CollectionsPage() {
  const content = getContent();
  const { siteSettings, collectionsPage, categories, products } = content;

  return (
    <>
      <Header variant="dark" navLinks={siteSettings.navLinks} />
      <main className="pt-32 pb-24 px-6 min-h-screen">
        <div className="max-w-6xl mx-auto">
          <PageHeader heading={collectionsPage.heading} subtitle={collectionsPage.subtitle} />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((cat) => (
              <Link key={cat.id} href={`/collections/${cat.slug}`}>
                <CollectionCard
                  name={cat.name}
                  description={cat.description}
                  productCount={products.filter((p) => p.categoryId === cat.id).length}
                />
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer tagline={siteSettings.footerTagline} links={siteSettings.footerLinks} />
    </>
  );
}
