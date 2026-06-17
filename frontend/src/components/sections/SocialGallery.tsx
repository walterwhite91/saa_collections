"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export function SocialGallery() {
  const images = [
    { src: "/images/design-4-wildflower-prairie-model.png", aspect: "aspect-square" },
    { src: "/images/glow_serum.png", aspect: "aspect-square" },
    { src: "/images/pearl_necklace.png", aspect: "aspect-square" },
    { src: "/images/hair_accessory.png", aspect: "aspect-square" },
    { src: "/images/design-10-midnight-queen-model.png", aspect: "aspect-square" },
    { src: "/images/design-14-himalayan-fairy-model.png", aspect: "aspect-square" },
  ];

  return (
    <section className="py-24 bg-linen overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <span className="block font-sans text-xs tracking-[0.2em] uppercase text-mushroom mb-4">
          @SAA.Collection
        </span>
        <h2 className="font-display text-4xl text-moss mb-6">
          Follow the SAA Dream
        </h2>
        <Link 
          href="https://instagram.com" 
          target="_blank"
          className="inline-block font-sans text-xs uppercase tracking-widest text-umber hover:text-moss transition-colors border-b border-umber hover:border-moss pb-1"
        >
          Join our community
        </Link>
      </div>

      <div className="max-w-[1500px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {images.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className={`relative w-full ${img.aspect} group overflow-hidden bg-parchment rounded-sm`}
            >
              <Image
                src={img.src}
                alt="SAA Collection Social"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-obsidian/30 opacity-0 group-hover:opacity-100 active:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                <svg className="w-8 h-8 text-linen drop-shadow-md" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
