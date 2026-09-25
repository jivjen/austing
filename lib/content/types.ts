export interface NavLink {
  label: string;
  href: string;
}

export interface SiteSettings {
  siteName: string;
  navLinks: NavLink[];
  footerTagline: string;
  footerLinks: NavLink[];
}

export interface HeroContent {
  heading: string;
  subtitle: string;
  caption: string;
  tagline: string;
  ctaLabel: string;
  ctaHref: string;
  featuredProductIds: string[];
}

export interface BrandStoryFeature {
  heading: string;
  body: string;
}

export interface BrandStoryContent {
  heading: string;
  body: string;
  features: BrandStoryFeature[];
}

export interface PageHeaderContent {
  heading: string;
  subtitle: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  featuredOnHomepage: boolean;
  displayOrder: number;
  displayVariant: "light" | "dark";
  columns: 2 | 3;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  categoryId: string;
  description: string;
}

export interface SiteContent {
  siteSettings: SiteSettings;
  hero: HeroContent;
  brandStory: BrandStoryContent;
  collectionsPage: PageHeaderContent;
  newArrivalsPage: PageHeaderContent;
  categories: Category[];
  products: Product[];
}

export type SectionKey = keyof SiteContent;
