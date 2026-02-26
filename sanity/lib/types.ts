import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

export interface SanityProduct {
  _id: string;
  name: string;
  slug: string;
  price: number;
  image: SanityImageSource;
  category: string;
  description?: string;
}

export interface SanityCategory {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  featuredOnHomepage?: boolean;
  displayOrder?: number;
  displayVariant?: "light" | "dark";
  columns?: 2 | 3;
}

export interface SanityCategoryWithCount extends SanityCategory {
  productCount: number;
}

export interface SanityCollection extends SanityCategory {
  products: SanityProduct[];
}
