"use client";

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block mb-6">
      <span className="block font-body text-[11px] tracking-[0.15em] uppercase text-burgundy/60 mb-2">
        {label}
      </span>
      {children}
      {hint && <span className="block font-body text-xs text-burgundy/40 mt-1.5">{hint}</span>}
    </label>
  );
}

const inputClass =
  "w-full rounded-sm border border-burgundy/15 px-3 py-2.5 font-body text-sm text-burgundy outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors bg-white";

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${inputClass} ${props.className || ""}`} />;
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`${inputClass} resize-y ${props.className || ""}`} />;
}

export function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <button type="button" onClick={() => onChange(!checked)} className="flex items-center gap-3">
      <span
        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
          checked ? "bg-burgundy" : "bg-burgundy/20"
        }`}
      >
        <span
          className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
            checked ? "translate-x-[18px]" : "translate-x-[2px]"
          }`}
        />
      </span>
      <span className="font-body text-sm text-burgundy">{label}</span>
    </button>
  );
}

export function SwatchOption({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-1 rounded-sm border px-4 py-3 font-body text-xs uppercase tracking-[0.1em] transition-colors ${
        active
          ? "border-gold bg-gold/10 text-burgundy"
          : "border-burgundy/15 text-burgundy/50 hover:border-burgundy/30"
      }`}
    >
      {children}
    </button>
  );
}
