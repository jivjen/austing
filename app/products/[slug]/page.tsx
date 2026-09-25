import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getContent, getProductBySlug, getCategoryById } from "@/lib/content/store";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(getContent(), slug);
  if (!product) return { title: "Product Not Found" };
  return { title: `${product.name} | AustinG Jewellery` };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const content = getContent();
  const product = getProductBySlug(content, slug);
  if (!product) notFound();
  const category = getCategoryById(content, product.categoryId);

  return (
    <>
      <Header
        variant="dark"
        siteName={content.siteSettings.siteName}
        navLinks={content.siteSettings.navLinks}
      />
      <main className="pt-32 pb-24 px-6 min-h-screen">
        <div className="max-w-5xl mx-auto">
          <Link
            href={category ? `/collections/${category.slug}` : "/collections"}
            className="font-body text-xs tracking-[0.15em] uppercase text-burgundy/50 hover:text-burgundy transition-colors duration-300 mb-8 inline-block"
          >
            &larr; {category ? category.name : "All Collections"}
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            <div className="aspect-square bg-[#d9c8d5] rounded-sm overflow-hidden">
              {product.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-[#c4b0bc]" />
              )}
            </div>

            <div className="flex flex-col justify-center">
              {category && (
                <p className="font-body text-xs tracking-[0.2em] uppercase text-burgundy/50 mb-3">
                  {category.name}
                </p>
              )}
              <h1 className="font-heading text-4xl md:text-5xl text-burgundy mb-4 italic">
                {product.name}
              </h1>
              <p className="font-body text-2xl text-gold mb-8">&#8377;{product.price}</p>
              {product.description && (
                <p className="font-body text-sm text-burgundy/60 leading-relaxed">
                  {product.description}
                </p>
              )}
            </div>
          </div>
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
