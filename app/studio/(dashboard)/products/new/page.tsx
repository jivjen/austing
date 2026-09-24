import { getContent } from "@/lib/content/store";
import ProductForm from "@/components/studio/editors/ProductForm";

export default function NewProductPage() {
  const content = getContent();
  return <ProductForm mode="create" categories={content.categories} allProducts={content.products} />;
}
