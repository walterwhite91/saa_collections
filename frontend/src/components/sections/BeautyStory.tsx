"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export function BeautyStory() {
  return (
    <section className="py-24 bg-parchment overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Left: Image */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="relative aspect-[4/5] w-full max-w-md mx-auto lg:mx-0 overflow-hidden">
              <Image
                src="/images/glow_serum.png"
                alt="Natural beauty and delicate details"
                fill
                sizes="(max-width: 768px) 100vw, 448px"
                className="object-cover"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-linen rounded-full -z-10 blur-3xl opacity-50" />
          </motion.div>

          {/* Right: Copy */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="w-full lg:w-1/2 text-center lg:text-left"
          >
            <span className="block font-sans text-xs tracking-[0.2em] uppercase text-mushroom mb-6">
              The SAA Aesthetic
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-moss mb-8 leading-tight">
              Natural beauty and <br className="hidden lg:block" /> delicate details.
            </h2>
            <p className="font-sans text-base text-moss/80 mb-12 leading-relaxed max-w-lg mx-auto lg:mx-0">
              From soft botanical skincare to elegant gold-toned jewelry, each piece is selected to complete the romantic SAA aesthetic.
            </p>
            <Link 
              href="/collections/essentials" 
              className="inline-block px-10 py-4 bg-moss text-linen font-sans text-xs uppercase tracking-widest hover:bg-umber transition-colors duration-300"
            >
              Shop Essentials
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
