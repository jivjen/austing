"use client";

import { useSectionDraft } from "@/hooks/useSectionDraft";
import SaveBar from "@/components/studio/SaveBar";
import PreviewPane from "@/components/studio/PreviewPane";
import { Field, TextInput, TextArea } from "@/components/studio/fields";
import BrandStory from "@/components/BrandStory";
import type { BrandStoryContent } from "@/lib/content/types";

export default function BrandStoryEditor({ initial }: { initial: BrandStoryContent }) {
  const { data, setData, dirty, saving, error, savedAt, save, discard } = useSectionDraft(
    "brandStory",
    initial
  );

  function updateFeature(index: number, patch: Partial<{ heading: string; body: string }>) {
    setData({
      ...data,
      features: data.features.map((f, i) => (i === index ? { ...f, ...patch } : f)),
    });
  }

  function addFeature() {
    setData({
      ...data,
      features: [...data.features, { heading: "New highlight", body: "Description." }],
    });
  }

  function removeFeature(index: number) {
    setData({ ...data, features: data.features.filter((_, i) => i !== index) });
  }

  return (
    <div>
      <SaveBar
        title="Brand Story"
        subtitle='The "About" section further down the homepage.'
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
            <TextArea
              rows={2}
              value={data.heading}
              onChange={(e) => setData({ ...data, heading: e.target.value })}
            />
          </Field>
          <Field label="Body">
            <TextArea
              rows={5}
              value={data.body}
              onChange={(e) => setData({ ...data, body: e.target.value })}
            />
          </Field>

          <p className="font-body text-[11px] tracking-[0.15em] uppercase text-burgundy/60 mb-3">
            Feature highlights
          </p>
          <div className="space-y-3 mb-4">
            {data.features.map((feature, i) => (
              <div
                key={i}
                className="bg-white border border-burgundy/10 rounded-sm p-3 space-y-2"
              >
                <div className="flex items-start gap-2">
                  <TextInput
                    placeholder="Heading"
                    value={feature.heading}
                    onChange={(e) => updateFeature(i, { heading: e.target.value })}
                  />
                  <button
                    type="button"
                    onClick={() => removeFeature(i)}
                    className="text-burgundy/40 hover:text-red-600 font-body text-sm px-2 py-1"
                    aria-label="Remove highlight"
                  >
                    &times;
                  </button>
                </div>
                <TextArea
                  rows={2}
                  placeholder="Body"
                  value={feature.body}
                  onChange={(e) => updateFeature(i, { body: e.target.value })}
                />
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addFeature}
            className="font-body text-xs tracking-[0.1em] uppercase text-burgundy/60 hover:text-burgundy border border-dashed border-burgundy/20 hover:border-burgundy/40 rounded-sm px-4 py-2.5 w-full transition-colors"
          >
            + Add highlight
          </button>
        </div>
        <PreviewPane>
          <BrandStory {...data} />
        </PreviewPane>
      </div>
    </div>
  );
}
