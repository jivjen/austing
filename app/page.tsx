import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import BrandStory from "@/components/BrandStory";
import Footer from "@/components/Footer";
import { getContent, getProductsByCategoryId, productCategoryName } from "@/lib/content/store";
import type { ProductCardProps } from "@/components/ProductCard";

export default function Home() {
  const content = getContent();
  const { siteSettings, hero, brandStory, categories } = content;

  const featured = [...categories]
    .filter((c) => c.featuredOnHomepage)
    .sort((a, b) => a.displayOrder - b.displayOrder);

  return (
    <>
      <Header siteName={siteSettings.siteName} navLinks={siteSettings.navLinks} />
      <Hero {...hero} />

      {featured.map((category) => {
        const isDark = category.displayVariant === "dark";
        const products: ProductCardProps[] = getProductsByCategoryId(content, category.id).map(
          (p) => ({
            name: p.name,
            category: productCategoryName(content, p),
            price: p.price,
            imageUrl: p.image || undefined,
          })
        );

        if (products.length === 0) return null;

        return (
          <section
            key={category.id}
            className={`py-24 md:py-32 px-6 ${isDark ? "bg-burgundy" : ""}`}
          >
            <div className={`mx-auto ${category.columns === 2 ? "max-w-4xl" : "max-w-6xl"}`}>
              <h2
                className={`font-heading text-4xl md:text-5xl text-center mb-16 italic ${isDark ? "text-white" : "text-burgundy"
                  }`}
              >
                {category.name}
              </h2>
              <ProductGrid
                products={products}
                columns={category.columns}
                variant={isDark ? "dark" : "light"}
              />
            </div>
          </section>
        );
      })}

      <BrandStory {...brandStory} />
      <Footer
        siteName={siteSettings.siteName}
        tagline={siteSettings.footerTagline}
        links={siteSettings.footerLinks}
      />
    </>
  );
}
