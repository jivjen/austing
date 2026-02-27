"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isHome = pathname === "/";
  const isDark = variant === "dark" && !isHome;

  return (
    <>
      <header
        className={`${isHome ? "absolute" : "fixed"} top-0 left-0 w-full z-50 px-8 py-6 flex items-center justify-between ${isDark && !isMobileMenuOpen ? "bg-white/90 backdrop-blur-md border-b border-burgundy/10" : ""
          }`}
      >
        <Link
          href="/"
          className="font-heading text-2xl md:text-3xl font-normal text-gold z-50 relative"
          onClick={() => setIsMobileMenuOpen(false)}
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

        {/* Mobile menu toggle */}
        <button
          className={`md:hidden z-50 relative p-2 -mr-2 transition-colors ${isMobileMenuOpen
              ? "text-burgundy"
              : isDark
                ? "text-burgundy"
                : "text-white"
            }`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-white/95 backdrop-blur-lg pt-24 px-8 pb-8 flex flex-col md:hidden"
          >
            <nav className="flex flex-col gap-8 mt-12 items-center">
              {navLinks.map((link) => {
                const isActive = pathname.startsWith(link.href) && link.href !== "/#about";
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`font-heading text-3xl text-center transition-colors duration-300 ${isActive ? "text-gold" : "text-burgundy hover:text-gold"
                      }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
