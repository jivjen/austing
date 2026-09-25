"use client";

import { useSectionDraft } from "@/hooks/useSectionDraft";
import SaveBar from "@/components/studio/SaveBar";
import PreviewPane from "@/components/studio/PreviewPane";
import { Field, TextInput, TextArea } from "@/components/studio/fields";
import Hero from "@/components/Hero";
import type { HeroContent, Product } from "@/lib/content/types";

const HERO_TILE_SLOTS = 6;

export default function HeroEditor({
  initial,
  products,
}: {
  initial: HeroContent;
  products: Product[];
}) {
  const { data, setData, dirty, saving, error, savedAt, save, discard } = useSectionDraft(
    "hero",
    initial
  );

  function updateTile(index: number, productId: string) {
    const next = [...data.featuredProductIds];
    while (next.length < HERO_TILE_SLOTS) next.push("");
    next[index] = productId;
    setData({ ...data, featuredProductIds: next });
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
            Featured products
          </p>
          <p className="font-body text-xs text-burgundy/40 mb-3 -mt-2">
            Pick a product for any of these 6 tiles — it shows that product&apos;s photo and links
            straight to it. Leave any blank for a plain color block instead.
          </p>
          <div className="grid grid-cols-1 gap-3 mb-6">
            {Array.from({ length: HERO_TILE_SLOTS }).map((_, i) => {
              const selectedId = data.featuredProductIds[i] ?? "";
              const product = products.find((p) => p.id === selectedId);
              return (
                <div
                  key={i}
                  className="min-w-0 bg-white border border-burgundy/10 rounded-sm p-3 flex gap-3 items-center"
                >
                  <div className="w-14 h-14 shrink-0 rounded-sm overflow-hidden bg-blush/40 flex items-center justify-center">
                    {product?.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={product.image} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <span className="font-body text-[9px] text-burgundy/30 text-center px-1">
                        {product ? product.name : `Tile ${i + 1}`}
                      </span>
                    )}
                  </div>
                  <select
                    value={selectedId}
                    onChange={(e) => updateTile(i, e.target.value)}
                    className="w-full min-w-0 flex-1 rounded-sm border border-burgundy/15 px-2 py-2 font-body text-xs text-burgundy outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors bg-white"
                  >
                    <option value="">— None —</option>
                    {products.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>
              );
            })}
          </div>
        </div>
        <PreviewPane>
          <Hero {...data} products={products} />
        </PreviewPane>
      </div>
    </div>
  );
}
