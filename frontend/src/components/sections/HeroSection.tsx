"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { LogoIcon } from "@/components/layout/Logo";

export function HeroSection() {
  return (
    <section className="relative h-screen min-h-[650px] w-full flex flex-col justify-between pt-20 md:pt-28 pb-48 md:pb-52 px-4 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/images/hero_campaign.png"
          alt="SAA Collection - Fairycore dreams, Nepali soul"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Soft overlay for text readability */}
        <div className="absolute inset-0 bg-obsidian/30" />
      </div>

      {/* Top Content (Logo, Title) */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="hidden md:block mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
        >
          <LogoIcon className="w-24 h-16 md:w-32 md:h-20" />
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="font-sans text-xs md:text-sm tracking-[0.2em] uppercase text-linen/95 mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
        >
          SAA Collection
        </motion.h2>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="font-display text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-[4.8rem] leading-tight text-linen drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] whitespace-normal md:whitespace-nowrap"
        >
          Fairycore dreams, <br className="block md:hidden" />
          <span className="italic font-light">Nepali soul.</span>
        </motion.h1>
      </div>

      {/* Bottom Content (Tagline, Buttons) shifted further downwards */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center mt-auto">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="font-sans text-xs md:text-sm text-linen/95 max-w-xl mx-auto mb-8 leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
        >
          Romantic dreams, natural beauty, and elegant details inspired by Himalayan femininity.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center gap-6"
        >
          <Link 
            href="/collections/dresses" 
            className="w-full sm:w-auto px-10 py-4 bg-linen text-moss font-sans text-xs uppercase tracking-widest hover:bg-umber hover:text-linen transition-colors duration-300 shadow-lg"
          >
            Shop Dresses
          </Link>
          <Link 
            href="/shop" 
            className="w-full sm:w-auto px-10 py-4 border border-linen text-linen font-sans text-xs uppercase tracking-widest hover:bg-linen hover:text-moss transition-colors duration-300"
          >
            Explore Collection
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
