import { getContent } from "@/lib/content/store";
import CategoriesList from "@/components/studio/editors/CategoriesList";

export default function CategoriesPage() {
  const content = getContent();
  return <CategoriesList categories={content.categories} products={content.products} />;
}
