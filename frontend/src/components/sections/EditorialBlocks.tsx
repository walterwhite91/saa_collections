"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function EditorialBlocks() {
  const blocks = [
    {
      title: "Fairycore Dresses",
      image: "/images/design-14-himalayan-fairy-full.png",
      link: "/collections/fairycore",
      colSpan: "col-span-1 md:col-span-8",
      aspect: "aspect-[4/3] md:aspect-[1.4/1]"
    },
    {
      title: "Himalayan Forest",
      image: "/images/design-5-medieval-forest-full.png",
      link: "/collections/himalayan",
      colSpan: "col-span-1 md:col-span-4",
      aspect: "aspect-[3/4]"
    },
    {
      title: "Event Wear",
      image: "/images/sage-garden-corset-dress-full.png",
      link: "/collections/events",
      colSpan: "col-span-1 md:col-span-4",
      aspect: "aspect-[3/4]"
    },
    {
      title: "Photoshoot Pieces",
      image: "/images/design-10-midnight-queen-full.png",
      link: "/collections/photoshoot",
      colSpan: "col-span-1 md:col-span-8",
      aspect: "aspect-[4/3] md:aspect-[1.4/1]"
    }
  ];

  return (
    <section className="py-24 bg-linen">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {blocks.map((block, index) => (
            <Link 
              key={index} 
              href={block.link}
              className={`group block relative overflow-hidden ${block.colSpan}`}
            >
              <div className={`relative w-full ${block.aspect} bg-parchment`}>
                <Image
                  src={block.image}
                  alt={block.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-obsidian/20 group-hover:bg-obsidian/10 transition-colors duration-500" />
                
                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                  <h3 className="font-display text-3xl md:text-4xl text-linen mb-4 drop-shadow-sm">
                    {block.title}
                  </h3>
                  <div className="flex items-center gap-2 text-linen font-sans text-xs tracking-widest uppercase opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                    <span>Discover</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
