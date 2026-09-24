import { notFound } from "next/navigation";
import { getContent } from "@/lib/content/store";
import CategoryForm from "@/components/studio/editors/CategoryForm";

export default async function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const content = getContent();
  const category = content.categories.find((c) => c.id === id);
  if (!category) notFound();

  return (
    <CategoryForm
      mode="edit"
      category={category}
      allCategories={content.categories}
      products={content.products}
    />
  );
}
