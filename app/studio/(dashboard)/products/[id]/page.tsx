import { notFound } from "next/navigation";
import { getContent } from "@/lib/content/store";
import ProductForm from "@/components/studio/editors/ProductForm";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const content = getContent();
  const product = content.products.find((p) => p.id === id);
  if (!product) notFound();

  return <ProductForm mode="edit" product={product} categories={content.categories} />;
}
