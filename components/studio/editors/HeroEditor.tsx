"use client";

import { useSectionDraft } from "@/hooks/useSectionDraft";
import SaveBar from "@/components/studio/SaveBar";
import PreviewPane from "@/components/studio/PreviewPane";
import ImageUploader from "@/components/studio/ImageUploader";
import { Field, TextInput, TextArea } from "@/components/studio/fields";
import Hero from "@/components/Hero";
import type { HeroContent } from "@/lib/content/types";

const HERO_IMAGE_SLOTS = 6;

export default function HeroEditor({ initial }: { initial: HeroContent }) {
  const { data, setData, dirty, saving, error, savedAt, save, discard } = useSectionDraft(
    "hero",
    initial
  );

  function updateImage(index: number, path: string) {
    const next = [...data.images];
    while (next.length < HERO_IMAGE_SLOTS) next.push("");
    next[index] = path;
    setData({ ...data, images: next });
  }

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

          <Field label="Button text" hint="The prominent call-to-action button in the hero.">
            <TextInput
              value={data.ctaLabel}
              onChange={(e) => setData({ ...data, ctaLabel: e.target.value })}
            />
          </Field>
          <Field label="Button link">
            <TextInput
              value={data.ctaHref}
              onChange={(e) => setData({ ...data, ctaHref: e.target.value })}
            />
          </Field>

          <p className="font-body text-[11px] tracking-[0.15em] uppercase text-burgundy/60 mb-3">
            Hero images
          </p>
          <p className="font-body text-xs text-burgundy/40 mb-3 -mt-2">
            Fill any of these 6 tiles with a photo — empty ones show a plain color block instead.
          </p>
          <div className="grid grid-cols-3 gap-3 mb-6">
            {Array.from({ length: HERO_IMAGE_SLOTS }).map((_, i) => (
              <ImageUploader
                key={i}
                value={data.images[i] ?? ""}
                onChange={(path) => updateImage(i, path)}
                folder="hero"
                label={`Tile ${i + 1}`}
              />
            ))}
          </div>
        </div>
        <PreviewPane>
          <Hero {...data} />
        </PreviewPane>
      </div>
    </div>
  );
}
