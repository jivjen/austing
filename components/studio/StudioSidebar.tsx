"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "./LogoutButton";

const NAV_GROUPS = [
  {
    label: "Overview",
    items: [{ href: "/studio", label: "Dashboard" }],
  },
  {
    label: "Site sections",
    items: [
      { href: "/studio/hero", label: "Hero" },
      { href: "/studio/header", label: "Header & Navigation" },
      { href: "/studio/brand-story", label: "Brand Story" },
      { href: "/studio/footer", label: "Footer" },
      { href: "/studio/pages/collections", label: "Collections Page" },
      { href: "/studio/pages/new-arrivals", label: "New Arrivals Page" },
    ],
  },
  {
    label: "Catalog",
    items: [
      { href: "/studio/products", label: "Products" },
      { href: "/studio/categories", label: "Categories" },
    ],
  },
];

export default function StudioSidebar() {
  const pathname = usePathname();

  return (
    <nav className="w-64 shrink-0 bg-burgundy text-white min-h-screen px-6 py-8 flex flex-col">
      <Link href="/studio" className="font-heading text-2xl text-gold mb-1 block">
        AustinG
      </Link>
      <p className="font-body text-[10px] tracking-[0.25em] uppercase text-white/40 mb-10">
        Studio
      </p>

      <div className="flex-1 space-y-8">
        {NAV_GROUPS.map((group) => (
          <div key={group.label}>
            <p className="font-body text-[10px] tracking-[0.2em] uppercase text-white/30 mb-3">
              {group.label}
            </p>
            <ul className="space-y-1">
              {group.items.map((item) => {
                const active =
                  pathname === item.href || (item.href !== "/studio" && pathname?.startsWith(item.href));
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`block font-body text-sm px-3 py-2 rounded-sm transition-colors ${
                        active
                          ? "bg-white/10 text-gold"
                          : "text-white/70 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      <div className="space-y-3 pt-6 border-t border-white/10">
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="block font-body text-xs text-white/50 hover:text-white transition-colors"
        >
          View live site &#8599;
        </a>
        <LogoutButton />
      </div>
    </nav>
  );
}
