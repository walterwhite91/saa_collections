"use client";

import { motion } from "framer-motion";
import { Leaf, Mountain, Sparkles } from "lucide-react";

export function ValuesSection() {
  const values = [
    {
      title: "Handmade Feeling",
      description: "Each piece is crafted with care, embracing the perfectly imperfect touch of human hands and celebrating slow fashion.",
      icon: <Sparkles className="w-6 h-6 text-umber" />
    },
    {
      title: "Himalayan Identity",
      description: "Rooted in the high altitudes of Nepal, our designs carry the quiet strength, mystic romance, and natural elegance of the Himalayas.",
      icon: <Mountain className="w-6 h-6 text-umber" />
    },
    {
      title: "Soft Femininity",
      description: "We design for the dreamer. Flowing silhouettes, botanical ingredients, and gentle details that highlight your natural beauty.",
      icon: <Leaf className="w-6 h-6 text-umber" />
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-parchment border-y border-moss/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <h2 className="font-display text-3xl md:text-5xl text-moss leading-tight">
            Handcrafted quality. <br className="hidden md:block" />
            <span className="italic font-light">Timeless romance.</span> <br className="hidden md:block" />
            Natural beauty.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -6, scale: 1.02 }}
              whileTap={{ scale: 0.98, backgroundColor: "rgba(242,238,233,1)", boxShadow: "0 0 25px rgba(142,119,86,0.2)" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex flex-col items-center text-center group p-8 rounded-lg bg-linen/0 hover:bg-linen/50 hover:shadow-[0_15px_40px_rgba(142,119,86,0.08)] active:bg-linen active:shadow-[0_0_20px_rgba(142,119,86,0.2)] border border-transparent hover:border-umber/10 transition-all duration-500 cursor-pointer"
            >
              <div className="w-16 h-16 rounded-full border border-umber/30 flex items-center justify-center mb-6 bg-linen group-hover:border-umber group-hover:shadow-[0_0_15px_rgba(142,119,86,0.3)] transition-all duration-500">
                {value.icon}
              </div>
              <h3 className="font-display text-2xl text-moss mb-4">
                {value.title}
              </h3>
              <p className="font-sans text-sm text-moss/80 leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
