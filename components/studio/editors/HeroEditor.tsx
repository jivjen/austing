"use client";

import { useSectionDraft } from "@/hooks/useSectionDraft";
import SaveBar from "@/components/studio/SaveBar";
import PreviewPane from "@/components/studio/PreviewPane";
import { Field, TextInput, TextArea } from "@/components/studio/fields";
import Hero from "@/components/Hero";
import type { HeroContent } from "@/lib/content/types";

export default function HeroEditor({ initial }: { initial: HeroContent }) {
  const { data, setData, dirty, saving, error, savedAt, save, discard } = useSectionDraft(
    "hero",
    initial
  );

  return (
    <div>
      <SaveBar
        title="Hero"
        subtitle="The full-screen opening section on the homepage."
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
          <Field label="Subtitle" hint="The cursive line beneath the heading.">
            <TextInput
              value={data.subtitle}
              onChange={(e) => setData({ ...data, subtitle: e.target.value })}
            />
          </Field>
          <Field label="Caption">
            <TextArea
              rows={3}
              value={data.caption}
              onChange={(e) => setData({ ...data, caption: e.target.value })}
            />
          </Field>
          <Field label="Tagline" hint="Small uppercase line at the very bottom of the hero.">
            <TextInput
              value={data.tagline}
              onChange={(e) => setData({ ...data, tagline: e.target.value })}
            />
          </Field>
        </div>
        <PreviewPane>
          <Hero {...data} />
        </PreviewPane>
      </div>
    </div>
  );
}
