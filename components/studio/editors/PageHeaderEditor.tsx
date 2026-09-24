"use client";

import { useSectionDraft } from "@/hooks/useSectionDraft";
import SaveBar from "@/components/studio/SaveBar";
import PreviewPane from "@/components/studio/PreviewPane";
import { Field, TextInput, TextArea } from "@/components/studio/fields";
import PageHeader from "@/components/PageHeader";
import type { PageHeaderContent, SectionKey } from "@/lib/content/types";

export default function PageHeaderEditor({
  section,
  title,
  subtitle,
  initial,
}: {
  section: SectionKey;
  title: string;
  subtitle: string;
  initial: PageHeaderContent;
}) {
  const { data, setData, dirty, saving, error, savedAt, save, discard } = useSectionDraft(
    section,
    initial
  );

  return (
    <div>
      <SaveBar
        title={title}
        subtitle={subtitle}
        dirty={dirty}
        saving={saving}
        error={error}
        savedAt={savedAt}
        onSave={save}
        onDiscard={discard}
      />
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="w-full lg:w-[420px] shrink-0">
          <Field label="Heading">
            <TextInput
              value={data.heading}
              onChange={(e) => setData({ ...data, heading: e.target.value })}
            />
          </Field>
          <Field label="Subtitle">
            <TextArea
              rows={3}
              value={data.subtitle}
              onChange={(e) => setData({ ...data, subtitle: e.target.value })}
            />
          </Field>
        </div>
        <PreviewPane>
          <div className="bg-blush/20 px-6 pt-16 pb-4">
            <PageHeader heading={data.heading} subtitle={data.subtitle} />
          </div>
        </PreviewPane>
      </div>
    </div>
  );
}
