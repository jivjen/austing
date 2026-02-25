import { defineQuery } from "next-sanity";

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

export const CATEGORIES_QUERY = defineQuery(
  `*[_type == "category"] | order(name asc) {
    _id,
    name,
    "slug": slug.current
  }`
);
