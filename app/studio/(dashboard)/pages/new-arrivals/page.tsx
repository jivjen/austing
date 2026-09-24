import { getContent } from "@/lib/content/store";
import PageHeaderEditor from "@/components/studio/editors/PageHeaderEditor";

export default function NewArrivalsPageEditor() {
  const content = getContent();
  return (
    <PageHeaderEditor
      section="newArrivalsPage"
      title="New Arrivals Page"
      subtitle="Heading shown at the top of /new-arrivals."
      initial={content.newArrivalsPage}
    />
  );
}
