"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Collections", href: "/collections" },
  { label: "New Arrivals", href: "/new-arrivals" },
  { label: "About", href: "/#about" },
];

interface HeaderProps {
  variant?: "light" | "dark";
}

export default function Header({ variant }: HeaderProps) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isDark = variant === "dark" && !isHome;

  return (
    <header
      className={`${isHome ? "absolute" : "fixed"} top-0 left-0 w-full z-50 px-8 py-6 flex items-center justify-between ${isDark ? "bg-white/90 backdrop-blur-md border-b border-burgundy/10" : ""
        }`}
    >
      <Link
        href="/"
        className="font-heading text-2xl md:text-3xl font-normal text-gold"
      >
        AustinG
      </Link>
      <nav className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => {
          const isActive = pathname.startsWith(link.href) && link.href !== "/#about";
          return (
            <Link
              key={link.label}
              href={link.href}
              className={`font-body text-xs tracking-[0.15em] uppercase transition-colors duration-300 ${isDark
                ? isActive
                  ? "text-burgundy"
                  : "text-burgundy/60 hover:text-burgundy"
                : isActive
                  ? "text-white"
                  : "text-white/80 hover:text-white"
                }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
