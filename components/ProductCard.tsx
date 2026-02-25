"use client";

import { motion } from "framer-motion";

export interface ProductCardProps {
  name: string;
  category: string;
  price: number;
  subtitle?: string;
  imageUrl?: string;
  variant?: "light" | "dark";
}

export default function ProductCard({
  name,
  category,
  price,
  subtitle,
  imageUrl,
  variant = "light",
}: ProductCardProps) {
  const isDark = variant === "dark";

  return (
    <motion.div
      className="group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Image container */}
      <div
        className={`overflow-hidden rounded-sm mb-4 ${isDark ? "bg-[#8a5c6e]" : "bg-[#d9c8d5]"}`}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="aspect-square w-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        ) : (
          <div
            className={`aspect-square ${isDark ? "bg-[#7d4f63]" : "bg-[#c4b0bc]"} group-hover:scale-105 transition-transform duration-700 ease-out`}
          />
        )}
      </div>

      {/* Card info */}
      <div>
        <p
          className={`text-[10px] tracking-[0.2em] uppercase font-body mb-1 ${isDark ? "text-white/50" : "text-burgundy/60"}`}
        >
          {category}
        </p>
        <h3
          className={`font-heading text-base mb-1 ${isDark ? "text-white" : "text-burgundy"}`}
        >
          {name}
        </h3>
        {subtitle && (
          <p
            className={`font-body text-xs mb-1 ${isDark ? "text-white/60" : "text-burgundy/50"}`}
          >
            ({subtitle})
          </p>
        )}
        <p className="font-body text-sm text-gold">&#8377;{price}</p>
      </div>
    </motion.div>
  );
}
