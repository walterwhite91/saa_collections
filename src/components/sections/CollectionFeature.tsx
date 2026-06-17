"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import productsData from "@/data/products.json";

export function CollectionFeature() {
  const dresses = productsData.dresses;

  return (
    <section className="py-24 bg-linen">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl text-moss mb-4">
            Featured Dresses
          </h2>
          <p className="font-sans text-sm text-moss/80 max-w-2xl mx-auto">
            Romantic silhouettes for photoshoots, special moments, and feminine daily wear.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {dresses.map((dress, idx) => {
            let imageClass = "object-cover object-[center_4%] scale-[1.20] transition-transform duration-700 group-hover:scale-[1.30]";
            if (idx === 0 || idx === 1) {
              imageClass = "object-cover object-[center_12%] scale-[1.15] transition-transform duration-700 group-hover:scale-[1.25]";
            } else if (idx === 2) {
              imageClass = "object-cover object-[center_2%] scale-[1.30] transition-transform duration-700 group-hover:scale-[1.40]";
            }

            return (
              <div key={dress.id} className="group relative flex flex-col">
                <Link href={`/products/${dress.slug}`} className="block relative aspect-[3/4] bg-parchment overflow-hidden mb-4">
                  <Image
                    src={`/images/${dress.image}`}
                    alt={dress.name}
                    fill
                    className={imageClass}
                  />
                <button className="absolute top-4 right-4 p-2 bg-linen/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-linen hover:text-umber text-moss">
                  <Heart className="w-4 h-4" />
                </button>
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-obsidian/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center">
                  <span className="bg-linen text-moss font-sans text-xs uppercase tracking-widest px-6 py-2">
                    View Product
                  </span>
                </div>
              </Link>
              
              <div className="flex flex-col flex-1">
                <span className="font-sans text-xs uppercase tracking-widest text-mushroom mb-1">
                  {dress.category}
                </span>
                <Link href={`/products/${dress.slug}`}>
                  <h3 className="font-display text-lg text-moss group-hover:text-umber transition-colors mb-2">
                    {dress.name}
                  </h3>
                </Link>
                <div className="flex justify-between items-center mt-auto">
                  <span className="font-sans text-sm text-moss">
                    NPR {dress.price.toLocaleString()}
                  </span>
                  <div className="flex gap-1.5">
                    {dress.colors.map((color, idx) => (
                      <div 
                        key={idx}
                        className="w-3 h-3 rounded-full border border-moss/20"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        </div>
        
        <div className="mt-16 text-center">
          <Link href="/collections/dresses" className="inline-block px-10 py-3 border border-umber text-umber font-sans text-xs uppercase tracking-widest hover:bg-umber hover:text-linen transition-colors duration-300">
            View All Dresses
          </Link>
        </div>
      </div>
    </section>
  );
}
