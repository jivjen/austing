"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ProductCard, { type ProductCardProps } from "./ProductCard";

interface ProductGridProps {
  products: ProductCardProps[];
  columns?: 2 | 3;
  variant?: "light" | "dark";
}

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export default function ProductGrid({
  products,
  columns = 3,
  variant = "light",
}: ProductGridProps) {
  const gridCols =
    columns === 2
      ? "grid-cols-1 sm:grid-cols-2"
      : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3";

  return (
    <motion.div
      className={`grid ${gridCols} gap-6`}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
    >
      {products.map((product, i) =>
        product.slug ? (
          <Link key={i} href={`/products/${product.slug}`}>
            <ProductCard {...product} variant={variant} />
          </Link>
        ) : (
          <ProductCard key={i} {...product} variant={variant} />
        )
      )}
    </motion.div>
  );
}
