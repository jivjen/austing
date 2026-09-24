import { getContent } from "@/lib/content/store";
import BrandStoryEditor from "@/components/studio/editors/BrandStoryEditor";

export default function BrandStoryPage() {
  const content = getContent();
  return <BrandStoryEditor initial={content.brandStory} />;
}
