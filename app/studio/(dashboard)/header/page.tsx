import { getContent } from "@/lib/content/store";
import HeaderEditor from "@/components/studio/editors/HeaderEditor";

export default function HeaderPage() {
  const content = getContent();
  return <HeaderEditor initial={content.siteSettings} />;
}
