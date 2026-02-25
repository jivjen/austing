"use client";

import { motion } from "framer-motion";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" as const },
  transition: { duration: 0.8, ease: "easeOut" as const },
};

export default function BrandStory() {
  return (
    <section id="about" className="bg-burgundy text-white py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
        {/* Left column */}
        <div>
          <motion.h2
            className="font-heading text-4xl md:text-5xl lg:text-6xl leading-tight mb-8"
            {...fadeUp}
          >
            We create{" "}
            <em className="italic">long-lasting pieces</em> that make a
            difference
          </motion.h2>
          <motion.p
            className="font-body text-sm md:text-base text-white/60 leading-relaxed max-w-md"
            {...fadeUp}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            What&apos;s special about your product, service or company? Use this
            space to highlight the things that set you apart from your
            competition. Think of this as your elevator pitch to get the
            reader&apos;s attention.
          </motion.p>
        </div>

        {/* Right column - features */}
        <div className="flex flex-col gap-12 md:pt-8">
          <motion.div {...fadeUp} transition={{ duration: 0.8, delay: 0.3 }}>
            <h3 className="font-heading text-lg md:text-xl mb-3">
              Sustainable and ethical
            </h3>
            <p className="font-body text-sm text-white/60 leading-relaxed">
              Why is this product or service the user&apos;s best choice? State
              your reason on the header, then expound with a short explanation
              why.
            </p>
          </motion.div>

          <motion.div {...fadeUp} transition={{ duration: 0.8, delay: 0.45 }}>
            <h3 className="font-heading text-lg md:text-xl mb-3">
              Handmade in small batches
            </h3>
            <p className="font-body text-sm text-white/60 leading-relaxed">
              Why is this product or service the user&apos;s best choice? State
              your reason on the header, then expound with a short explanation
              why.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
