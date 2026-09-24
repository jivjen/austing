import Link from "next/link";
import { getContent } from "@/lib/content/store";

export default function StudioDashboard() {
  const content = getContent();
  const productCount = content.products.length;
  const categoryCount = content.categories.length;

  const sections = [
    { href: "/studio/hero", title: "Hero", desc: "The full-screen headline, tagline and caption." },
    { href: "/studio/header", title: "Header & Navigation", desc: "Nav links shown across every page." },
    {
      href: "/studio/brand-story",
      title: "Brand Story",
      desc: 'The "About" section and its feature highlights.',
    },
    { href: "/studio/footer", title: "Footer", desc: "Footer tagline and links." },
    { href: "/studio/pages/collections", title: "Collections Page", desc: "Heading and intro copy." },
    { href: "/studio/pages/new-arrivals", title: "New Arrivals Page", desc: "Heading and intro copy." },
    {
      href: "/studio/products",
      title: "Products",
      desc: `${productCount} product${productCount === 1 ? "" : "s"} in the catalog.`,
    },
    {
      href: "/studio/categories",
      title: "Categories",
      desc: `${categoryCount} categor${categoryCount === 1 ? "y" : "ies"} organizing the shop.`,
    },
  ];

  return (
    <div>
      <h1 className="font-heading text-3xl text-burgundy mb-1">Studio</h1>
      <p className="font-body text-sm text-burgundy/50 mb-10">
        Pick a section to edit. Changes go live on the site within about a minute of saving.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {sections.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="block bg-white rounded-md p-6 border border-burgundy/10 hover:border-gold hover:shadow-md transition-all"
          >
            <h2 className="font-heading text-lg text-burgundy mb-1.5">{s.title}</h2>
            <p className="font-body text-xs text-burgundy/50 leading-relaxed">{s.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
