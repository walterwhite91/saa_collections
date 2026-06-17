"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function BrandStory() {
  return (
    <section className="py-32 bg-linen relative overflow-hidden w-full">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-moss mb-8 leading-tight">
              Where Himalayan beauty meets feminine dreams.
            </h2>
            <p className="font-sans text-base md:text-lg text-moss/80 leading-relaxed">
              SAA Collection brings together handmade romance, natural beauty, and a soft Nepali soul. Each piece is chosen for women who want to feel elegant, dreamy, and timeless.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="max-w-5xl mx-auto w-full relative aspect-[4/3] md:aspect-[1.45/1] overflow-hidden"
        >
          <Image
            src="/images/brand-overview.jpeg"
            alt="Himalayan beauty"
            fill
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-obsidian/10" />
        </motion.div>
      </div>
    </section>
  );
}
