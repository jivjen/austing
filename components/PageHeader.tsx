interface PageHeaderProps {
  heading: string;
  subtitle?: string;
}

export default function PageHeader({ heading, subtitle }: PageHeaderProps) {
  return (
    <div className="mb-16">
      <h1 className="font-heading text-5xl md:text-6xl text-burgundy text-center mb-4 italic">
        {heading}
      </h1>
      {subtitle && (
        <p className="font-body text-sm text-burgundy/60 text-center max-w-md mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
