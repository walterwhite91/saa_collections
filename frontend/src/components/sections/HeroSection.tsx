"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { LogoIcon } from "@/components/layout/Logo";
import { useRef, useState, useEffect } from "react";

const frames = [
  "frame_005.jpg", "frame_006.jpg", "frame_007.jpg", "frame_009.jpg",
  "frame_011.jpg", "frame_012.jpg", "frame_013.jpg", "frame_014.jpg",
  "frame_015.jpg", "frame_016.jpg", "frame_017.jpg", "frame_018.jpg",
  "frame_019.jpg", "frame_020.jpg", "frame_021.jpg", "frame_024.jpg",
  "frame_025.jpg", "frame_026.jpg", "frame_027.jpg", "frame_028.jpg",
  "frame_030.jpg", "frame_032.jpg", "frame_033.jpg", "frame_035.jpg",
  "frame_036.jpg"
];

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [frameIndex, setFrameIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const index = Math.min(frames.length - 1, Math.floor(latest * frames.length));
    setFrameIndex(index);
  });

  useEffect(() => {
    frames.forEach((frame) => {
      const img = new window.Image();
      img.src = `/hero-frames/${frame}`;
    });
  }, []);

  return (
    <section ref={containerRef} className="relative h-[150vh] w-full bg-obsidian">
      {/* Sticky container that stays in view while scrolling */}
      <div className="sticky top-0 h-screen min-h-[650px] w-full flex flex-col justify-between pt-20 md:pt-28 pb-48 md:pb-52 px-4 overflow-hidden">
        
        {/* Background Image Sequence */}
        <div className="absolute inset-0 w-full h-full">
          {frames.map((frame, idx) => (
            <img
              key={frame}
              src={`/hero-frames/${frame}`}
              alt={`Hero frame ${idx}`}
              className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-0 ${
                idx === frameIndex ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
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
      </div>
    </section>
  );
}
