import fs from "node:fs";
import path from "node:path";
import type { SiteContent } from "./types";

const CONTENT_PATH = path.join(process.cwd(), "content", "site-content.json");

export function getContent(): SiteContent {
  const raw = fs.readFileSync(CONTENT_PATH, "utf8");
  return JSON.parse(raw) as SiteContent;
}

export function getCategoryById(content: SiteContent, id: string) {
  return content.categories.find((c) => c.id === id);
}

export function getCategoryBySlug(content: SiteContent, slug: string) {
  return content.categories.find((c) => c.slug === slug);
}

export function getProductsByCategoryId(content: SiteContent, categoryId: string) {
  return content.products.filter((p) => p.categoryId === categoryId);
}

export function getProductBySlug(content: SiteContent, slug: string) {
  return content.products.find((p) => p.slug === slug);
}

export function getProductById(content: SiteContent, id: string) {
  return content.products.find((p) => p.id === id);
}

export function productCategoryName(content: SiteContent, product: { categoryId: string }) {
  return getCategoryById(content, product.categoryId)?.name ?? "Jewellery";
}
