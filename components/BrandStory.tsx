"use client";

import { motion } from "framer-motion";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" as const },
  transition: { duration: 0.8, ease: "easeOut" as const },
};

interface BrandStoryFeature {
  heading: string;
  body: string;
}

interface BrandStoryProps {
  heading?: string;
  body?: string;
  features?: BrandStoryFeature[];
}

const defaultFeatures: BrandStoryFeature[] = [
  {
    heading: "Sustainable and ethical",
    body:
      "Why is this product or service the user's best choice? State your reason on the header, then expound with a short explanation why.",
  },
  {
    heading: "Handmade in small batches",
    body:
      "Why is this product or service the user's best choice? State your reason on the header, then expound with a short explanation why.",
  },
];

export default function BrandStory({
  heading = "We create long-lasting pieces that make a difference",
  body = "What's special about your product, service or company? Use this space to highlight the things that set you apart from your competition. Think of this as your elevator pitch to get the reader's attention.",
  features = defaultFeatures,
}: BrandStoryProps) {
  return (
    <section id="about" className="bg-burgundy text-white py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
        {/* Left column */}
        <div>
          <motion.h2
            className="font-heading text-4xl md:text-5xl lg:text-6xl leading-tight mb-8"
            {...fadeUp}
          >
            {heading}
          </motion.h2>
          <motion.p
            className="font-body text-sm md:text-base text-white/60 leading-relaxed max-w-md"
            {...fadeUp}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {body}
          </motion.p>
        </div>

        {/* Right column - features */}
        <div className="flex flex-col gap-12 md:pt-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.heading}
              {...fadeUp}
              transition={{ duration: 0.8, delay: 0.3 + i * 0.15 }}
            >
              <h3 className="font-heading text-lg md:text-xl mb-3">{feature.heading}</h3>
              <p className="font-body text-sm text-white/60 leading-relaxed">{feature.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
