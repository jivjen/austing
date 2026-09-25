import { getContent } from "@/lib/content/store";
import CategoryForm from "@/components/studio/editors/CategoryForm";

export default function NewCategoryPage() {
  const content = getContent();
  return <CategoryForm mode="create" products={content.products} />;
}
