import { getContent } from "@/lib/content/store";
import FooterEditor from "@/components/studio/editors/FooterEditor";

export default function FooterPage() {
  const content = getContent();
  return <FooterEditor initial={content.siteSettings} />;
}
