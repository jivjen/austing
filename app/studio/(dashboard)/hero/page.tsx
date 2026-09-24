import { getContent } from "@/lib/content/store";
import HeroEditor from "@/components/studio/editors/HeroEditor";

export default function HeroPage() {
  const content = getContent();
  return <HeroEditor initial={content.hero} />;
}
