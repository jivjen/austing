"use client";

import Link from "next/link";

const navLinks = [
  { label: "Collections", href: "#collections" },
  { label: "New Arrivals", href: "#new-arrivals" },
  { label: "About", href: "#about" },
];

export default function Header() {
  return (
    <header className="absolute top-0 left-0 w-full z-50 px-8 py-6 flex items-center justify-between">
      <Link
        href="/"
        className="text-white font-heading text-sm tracking-[0.3em] uppercase"
      >
        AustinG
      </Link>
      <nav className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="text-white/80 font-body text-xs tracking-[0.15em] uppercase hover:text-white transition-colors duration-300"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
