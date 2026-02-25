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
}
