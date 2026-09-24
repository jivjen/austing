import { getContent } from "@/lib/content/store";
import PageHeaderEditor from "@/components/studio/editors/PageHeaderEditor";

export default function CollectionsPageEditor() {
  const content = getContent();
  return (
    <PageHeaderEditor
      section="collectionsPage"
      title="Collections Page"
      subtitle="Heading shown at the top of /collections."
      initial={content.collectionsPage}
    />
  );
}
