import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductGrid from "@/components/ProductGrid";
import PageHeader from "@/components/PageHeader";
import { getContent, productCategoryName } from "@/lib/content/store";
import type { ProductCardProps } from "@/components/ProductCard";

export const metadata = {
  title: "New Arrivals | AustinG Jewellery",
};

export default function NewArrivalsPage() {
  const content = getContent();
  const products: ProductCardProps[] = content.products.slice(0, 12).map((p) => ({
    name: p.name,
    category: productCategoryName(content, p),
    price: p.price,
    imageUrl: p.image || undefined,
  }));

  return (
    <>
      <Header variant="dark" siteName={content.siteSettings.siteName} navLinks={content.siteSettings.navLinks} />
      <main className="pt-32 pb-24 px-6 min-h-screen">
        <div className="max-w-6xl mx-auto">
          <PageHeader
            heading={content.newArrivalsPage.heading}
            subtitle={content.newArrivalsPage.subtitle}
          />

          {products.length > 0 ? (
            <ProductGrid products={products} columns={3} />
          ) : (
            <p className="font-body text-burgundy/40 text-center py-16">
              New pieces coming soon.
            </p>
          )}
        </div>
      </main>
      <Footer
        siteName={content.siteSettings.siteName}
        tagline={content.siteSettings.footerTagline}
        links={content.siteSettings.footerLinks}
      />
    </>
  );
}
