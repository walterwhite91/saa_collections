"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import productsData from "@/data/products.json";
import { getImageUrl } from "@/lib/utils/image";

export function CuratedEssentials() {
  const [mounted, setMounted] = useState(false);
  const targetRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const handleResize = () => {
      if (listRef.current && containerRef.current) {
        const listWidth = listRef.current.scrollWidth;
        const containerWidth = containerRef.current.offsetWidth;
        setScrollRange(Math.max(0, listWidth - containerWidth));
      }
    };
    // Let page layout stabilize before calculating
    const timer = setTimeout(handleResize, 100);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer);
    };
  }, [mounted]);

  const essentials = [
    ...productsData.jewelry,
    ...productsData.skincare,
    ...productsData.accessories
  ];

  const desktopItems = essentials.slice(0, 7);
  const mobileItems = essentials.slice(0, 7);

  // We track the scroll progress of the container
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const xTranslate = useTransform(scrollYProgress, [0, 1], [0, -scrollRange]);

  const scrollMobile = (direction: 'left' | 'right') => {
    const container = document.getElementById('mobile-slider');
    if (container) {
      const scrollAmount = 284; // width + gap
      container.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div ref={targetRef} className="relative md:h-[250vh] bg-linen">
      <div className="md:sticky top-0 md:h-screen flex flex-col justify-center overflow-hidden py-16 md:py-0">
        {/* Header */}
        <div className="max-w-[1500px] mx-auto w-full px-4 sm:px-8 lg:px-12 mb-8 md:mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 shrink-0">
          <div>
            <h2 className="font-display text-4xl md:text-5xl text-moss mb-4">
              Curated Essentials
            </h2>
            <p className="font-sans text-sm text-moss/80 max-w-lg">
              Jewelry, skincare, and finishing details for the full SAA look.
            </p>
          </div>
          <Link href="/collections/essentials" className="px-8 py-3 border border-umber text-umber font-sans text-xs uppercase tracking-widest hover:bg-umber hover:text-linen transition-colors">
            Shop Essentials
          </Link>
        </div>

        {/* Desktop Carousel - Translated via Scroll */}
        <div ref={containerRef} className="hidden md:block w-full max-w-[1500px] mx-auto px-4 sm:px-8 lg:px-12 relative overflow-hidden">
          <motion.div 
            ref={listRef}
            style={mounted ? { x: xTranslate } : undefined} 
            className="flex gap-8 w-max"
          >
            {desktopItems.map((item) => (
              <div key={item.id} className="shrink-0 w-[320px] group">
                <Link href={`/products/${item.slug}`} className="block relative aspect-[4/5] bg-parchment overflow-hidden mb-4 rounded-sm">
                  <Image
                    src={getImageUrl(item.image)}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 320px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </Link>
                <div className="flex flex-col">
                  <span className="font-sans text-xs uppercase tracking-widest text-mushroom mb-1">
                    {item.category}
                  </span>
                  <Link href={`/products/${item.slug}`}>
                    <h3 className="font-display text-lg text-moss group-hover:text-umber transition-colors mb-1">
                      {item.name}
                    </h3>
                  </Link>
                  <span className="font-sans text-sm text-moss">
                    NPR {item.price.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Mobile Swipeable list with arrows */}
        <div className="block md:hidden relative">
          <div id="mobile-slider" className="px-4 overflow-x-auto hide-scrollbar snap-x snap-mandatory">
            <div className="flex gap-6 pb-6 w-max">
              {mobileItems.map((item) => (
                <div key={item.id} className="snap-start shrink-0 w-[260px] group">
                  <Link href={`/products/${item.slug}`} className="block relative aspect-[4/5] bg-parchment overflow-hidden mb-4 rounded-sm">
                    <Image
                      src={getImageUrl(item.image)}
                      alt={item.name}
                      fill
                      sizes="260px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </Link>
                  <div className="flex flex-col">
                    <span className="font-sans text-xs uppercase tracking-widest text-mushroom mb-1">
                      {item.category}
                    </span>
                    <Link href={`/products/${item.slug}`}>
                      <h3 className="font-display text-lg text-moss group-hover:text-umber transition-colors mb-1">
                        {item.name}
                      </h3>
                    </Link>
                    <span className="font-sans text-sm text-moss">
                      NPR {item.price.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Mobile Arrows */}
          <div className="flex justify-between absolute top-[40%] -translate-y-1/2 left-2 right-2 pointer-events-none">
            <button 
              onClick={() => scrollMobile('left')}
              className="pointer-events-auto bg-linen/90 p-2 rounded-full shadow-md text-moss hover:bg-umber hover:text-linen transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button 
              onClick={() => scrollMobile('right')}
              className="pointer-events-auto bg-linen/90 p-2 rounded-full shadow-md text-moss hover:bg-umber hover:text-linen transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
}
