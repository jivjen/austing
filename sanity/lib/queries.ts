import { defineQuery } from "next-sanity";

export const HOMEPAGE_COLLECTIONS_QUERY = defineQuery(
  `*[_type == "category" && featuredOnHomepage == true] | order(displayOrder asc) {
    _id,
    name,
    "slug": slug.current,
    description,
    displayVariant,
    columns,
    displayOrder,
    "products": *[_type == "product" && category._ref == ^._id] | order(_createdAt desc) {
      _id,
      name,
      "slug": slug.current,
      price,
      image,
      "category": category->name,
      description
    }
  }`
);

export const ALL_CATEGORIES_QUERY = defineQuery(
  `*[_type == "category"] | order(displayOrder asc) {
    _id,
    name,
    "slug": slug.current,
    description,
    "productCount": count(*[_type == "product" && category._ref == ^._id])
  }`
);

export const CATEGORY_BY_SLUG_QUERY = defineQuery(
  `*[_type == "category" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    description
  }`
);

export const PRODUCTS_BY_CATEGORY_QUERY = defineQuery(
  `*[_type == "product" && category->slug.current == $slug] | order(_createdAt desc) {
    _id,
    name,
    "slug": slug.current,
    price,
    image,
    "category": category->name,
    description
  }`
);

export const NEW_ARRIVALS_QUERY = defineQuery(
  `*[_type == "product"] | order(_createdAt desc)[0...12] {
    _id,
    name,
    "slug": slug.current,
    price,
    image,
    "category": category->name,
    description
  }`
);

export const PRODUCTS_QUERY = defineQuery(
  `*[_type == "product"] | order(_createdAt desc) {
    _id,
    name,
    "slug": slug.current,
    price,
    image,
    "category": category->name,
    description
  }`
);

export const CATEGORIES_QUERY = defineQuery(
  `*[_type == "category"] | order(name asc) {
    _id,
    name,
    "slug": slug.current
  }`
);
