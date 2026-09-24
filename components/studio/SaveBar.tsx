"use client";

interface SaveBarProps {
  title: string;
  subtitle?: string;
  dirty: boolean;
  saving: boolean;
  error: string | null;
  savedAt: Date | null;
  onSave: () => void;
  onDiscard: () => void;
}

export default function SaveBar({
  title,
  subtitle,
  dirty,
  saving,
  error,
  savedAt,
  onSave,
  onDiscard,
}: SaveBarProps) {
  return (
    <div className="sticky top-0 z-10 flex items-center justify-between gap-4 bg-white/95 backdrop-blur border-b border-burgundy/10 px-8 py-5 -mx-8 -mt-8 mb-8">
      <div>
        <h1 className="font-heading text-2xl text-burgundy">{title}</h1>
        <p className="font-body text-xs text-burgundy/40 mt-0.5">
          {error ? (
            <span className="text-red-600">{error}</span>
          ) : saving ? (
            "Saving..."
          ) : dirty ? (
            "Unsaved changes"
          ) : savedAt ? (
            "Saved — live on the site within a minute"
          ) : (
            subtitle || "No changes yet"
          )}
        </p>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        {dirty && (
          <button
            onClick={onDiscard}
            disabled={saving}
            className="font-body text-xs tracking-[0.1em] uppercase text-burgundy/50 hover:text-burgundy px-4 py-2.5 transition-colors disabled:opacity-40"
          >
            Discard
          </button>
        )}
        <button
          onClick={onSave}
          disabled={!dirty || saving}
          className="font-body text-xs tracking-[0.15em] uppercase bg-burgundy text-white px-6 py-2.5 rounded-sm hover:bg-burgundy/90 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          {saving ? "Saving..." : "Save changes"}
        </button>
      </div>
    </div>
  );
}
