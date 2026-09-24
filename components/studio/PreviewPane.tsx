export default function PreviewPane({
  children,
  label = "Live preview",
}: {
  children: React.ReactNode;
  label?: string;
}) {
  return (
    <div className="lg:sticky lg:top-28 self-start">
      <p className="font-body text-[11px] tracking-[0.2em] uppercase text-burgundy/40 mb-3">
        {label}
      </p>
      <div
        className="rounded-md overflow-hidden border border-burgundy/10 shadow-sm max-h-[calc(100vh-180px)] overflow-y-auto"
        style={{ transform: "translateZ(0)" }}
      >
        {children}
      </div>
    </div>
  );
}
