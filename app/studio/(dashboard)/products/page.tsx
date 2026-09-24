import { getContent } from "@/lib/content/store";
import ProductsList from "@/components/studio/editors/ProductsList";

export default function ProductsPage() {
  const content = getContent();
  return <ProductsList products={content.products} categories={content.categories} />;
}
