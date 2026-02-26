"use client";

import { motion } from "framer-motion";

interface CollectionCardProps {
  name: string;
  description?: string;
  productCount: number;
}

export default function CollectionCard({
  name,
  description,
  productCount,
}: CollectionCardProps) {
  return (
    <motion.div
      className="group bg-blush/30 rounded-sm p-8 hover:bg-blush/50 transition-colors duration-300 cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="aspect-[4/3] bg-blush/60 rounded-sm mb-6 flex items-center justify-center">
        <span className="font-heading text-burgundy/20 text-6xl italic">
          {name.charAt(0)}
        </span>
      </div>
      <h3 className="font-heading text-xl text-burgundy mb-2">{name}</h3>
      {description && (
        <p className="font-body text-xs text-burgundy/50 leading-relaxed mb-3 line-clamp-2">
          {description}
        </p>
      )}
      <p className="font-body text-xs text-gold">
        {productCount} {productCount === 1 ? "piece" : "pieces"}
      </p>
    </motion.div>
  );
}
