"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

const placeholderColors = [
  "bg-[#8a5c6e]",
  "bg-[#7d4f63]",
  "bg-[#9a6d80]",
  "bg-[#7d4f63]",
  "bg-[#8a5c6e]",
  "bg-[#9a6d80]",
];

export interface HeroProps {
  heading?: string;
  subtitle?: string;
  caption?: string;
  tagline?: string;
  ctaLabel?: string;
  ctaHref?: string;
  images?: string[];
}

export default function Hero({
  heading = "AustinG",
  subtitle = "Legacy in Jewels",
  caption = "Designed to turn Moments into Memories",
  tagline = "Bringing your vision to life",
  ctaLabel = "Explore Collections",
  ctaHref = "/collections",
  images = [],
}: HeroProps) {
  return (
    <section className="relative min-h-screen bg-burgundy text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-24">
        {/* Main heading */}
        <motion.h1
          className="text-center font-heading text-6xl md:text-7xl lg:text-8xl font-normal mb-1 leading-tight text-gold"
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {heading}
        </motion.h1>

        {/* Subtitle */}
        <motion.h2
          className="text-center font-cursive text-4xl md:text-5xl lg:text-6xl text-white mb-12"
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {subtitle}
        </motion.h2>

        {/* Caption */}
        <motion.p
          className="text-center font-cursive text-3xl md:text-4xl text-white/90 max-w-xl mx-auto mb-10 leading-relaxed"
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {caption}
        </motion.p>

        {/* Primary CTA */}
        <motion.div
          className="flex justify-center mb-16"
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <Link
            href={ctaHref}
            className="inline-block font-body text-xs tracking-[0.2em] uppercase bg-gold text-burgundy px-10 py-4 rounded-sm hover:bg-white transition-colors duration-300"
          >
            {ctaLabel}
          </Link>
        </motion.div>

        {/* Image grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-4xl mx-auto"
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          {placeholderColors.map((color, i) => {
            const src = images[i];
            return (
              <div key={i} className={`col-span-1 h-48 rounded-sm overflow-hidden ${src ? "" : color}`}>
                {src && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={src} alt="" className="w-full h-full object-cover" />
                )}
              </div>
            );
          })}
        </motion.div>

        {/* Tagline below grid */}
        <motion.p
          className="text-center text-xs tracking-[0.2em] uppercase text-white/50 font-body mt-16"
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          {tagline}
        </motion.p>
      </div>
    </section>
  );
}
