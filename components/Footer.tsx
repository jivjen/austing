import Link from "next/link";

interface FooterProps {
  tagline?: string;
  links?: { label: string; href: string }[];
}

const defaultLinks = [
  { label: "Privacy", href: "#" },
  { label: "Terms", href: "#" },
];

export default function Footer({
  tagline = "AustinG Jewellery. All rights reserved.",
  links = defaultLinks,
}: FooterProps) {
  return (
    <footer className="bg-burgundy border-t border-white/10 text-white py-16 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <Link
          href="/"
          className="font-heading text-sm tracking-[0.3em] uppercase"
        >
          Austin
        </Link>
        <p className="font-body text-xs text-white/40">
          &copy; {new Date().getFullYear()} {tagline}
        </p>
        <div className="flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="font-body text-xs text-white/60 hover:text-white transition-colors duration-300"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
