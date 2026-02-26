"use client";

import { motion } from "framer-motion";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

const placeholderImages = [
  { id: 1, width: "col-span-1", height: "h-48", bg: "bg-[#8a5c6e]" },
  { id: 2, width: "col-span-1", height: "h-48", bg: "bg-[#7d4f63]" },
  { id: 3, width: "col-span-1", height: "h-48", bg: "bg-[#9a6d80]" },
  { id: 4, width: "col-span-1", height: "h-48", bg: "bg-[#7d4f63]" },
  { id: 5, width: "col-span-1", height: "h-48", bg: "bg-[#8a5c6e]" },
  { id: 6, width: "col-span-1", height: "h-48", bg: "bg-[#9a6d80]" },
];

export default function Hero() {
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
          AustinG
        </motion.h1>

        {/* Subtitle */}
        <motion.h2
          className="text-center font-cursive text-4xl md:text-5xl lg:text-6xl text-white mb-12"
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Legacy in Jewels
        </motion.h2>

        {/* Caption */}
        <motion.p
          className="text-center font-cursive text-3xl md:text-4xl text-white/90 max-w-xl mx-auto mb-20 leading-relaxed"
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Designed to turn Moments into Memories
        </motion.p>

        {/* Image grid placeholder */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-4xl mx-auto"
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {placeholderImages.map((img) => (
            <div
              key={img.id}
              className={`${img.width} ${img.height} ${img.bg} rounded-sm`}
            />
          ))}
        </motion.div>

        {/* Tagline below grid */}
        <motion.p
          className="text-center text-xs tracking-[0.2em] uppercase text-white/50 font-body mt-16"
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          Bringing your vision to life
        </motion.p>
      </div>
    </section>
  );
}
