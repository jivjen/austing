"use client";

import { useSectionDraft } from "@/hooks/useSectionDraft";
import SaveBar from "@/components/studio/SaveBar";
import PreviewPane from "@/components/studio/PreviewPane";
import { TextInput } from "@/components/studio/fields";
import Header from "@/components/Header";
import type { SiteSettings } from "@/lib/content/types";

export default function HeaderEditor({ initial }: { initial: SiteSettings }) {
  const { data, setData, dirty, saving, error, savedAt, save, discard } = useSectionDraft(
    "siteSettings",
    initial
  );

  function updateLink(index: number, patch: Partial<{ label: string; href: string }>) {
    setData({
      ...data,
      navLinks: data.navLinks.map((l, i) => (i === index ? { ...l, ...patch } : l)),
    });
  }

  function addLink() {
    setData({ ...data, navLinks: [...data.navLinks, { label: "New Link", href: "/" }] });
  }

  function removeLink(index: number) {
    setData({ ...data, navLinks: data.navLinks.filter((_, i) => i !== index) });
  }

  return (
    <div>
      <SaveBar
        title="Header & Navigation"
        subtitle="Navigation links shown in the header on every page."
        dirty={dirty}
        saving={saving}
        error={error}
        savedAt={savedAt}
        onSave={save}
        onDiscard={discard}
      />
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="w-full lg:w-[420px] shrink-0">
          <p className="font-body text-[11px] tracking-[0.15em] uppercase text-burgundy/60 mb-3">
            Nav Links
          </p>
          <div className="space-y-3 mb-4">
            {data.navLinks.map((link, i) => (
              <div
                key={i}
                className="flex gap-2 items-start bg-white border border-burgundy/10 rounded-sm p-3"
              >
                <div className="flex-1 space-y-2">
                  <TextInput
                    placeholder="Label"
                    value={link.label}
                    onChange={(e) => updateLink(i, { label: e.target.value })}
                  />
                  <TextInput
                    placeholder="/path"
                    value={link.href}
                    onChange={(e) => updateLink(i, { href: e.target.value })}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeLink(i)}
                  className="text-burgundy/40 hover:text-red-600 font-body text-sm px-2 py-1"
                  aria-label="Remove link"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addLink}
            className="font-body text-xs tracking-[0.1em] uppercase text-burgundy/60 hover:text-burgundy border border-dashed border-burgundy/20 hover:border-burgundy/40 rounded-sm px-4 py-2.5 w-full transition-colors"
          >
            + Add link
          </button>
        </div>
        <PreviewPane label="Live preview — header as shown on inner pages">
          <div className="relative h-40 bg-white">
            <Header variant="dark" navLinks={data.navLinks} />
          </div>
        </PreviewPane>
      </div>
    </div>
  );
}
