"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { getImageUrl } from "@/lib/utils/image";

interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  image: string;
}

export function ProductCard({ product }: { product: Product }) {
  const { toggleWishlist, isInWishlist } = useStore();

  return (
    <div className="group relative flex flex-col">
      <Link href={`/products/${product.slug}`} className="block relative aspect-[3/4] bg-parchment overflow-hidden mb-4">
        <Image
          src={getImageUrl(product.image)}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <button 
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product.id);
          }}
          className="absolute top-4 right-4 p-2 bg-linen/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-linen hover:text-umber text-moss z-10"
        >
          <Heart className="w-4 h-4" fill={isInWishlist(product.id) ? "currentColor" : "none"} />
        </button>
        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-obsidian/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center">
          <span className="bg-linen text-moss font-sans text-xs uppercase tracking-widest px-6 py-2">
            View Product
          </span>
        </div>
      </Link>
      
      <div className="flex flex-col flex-1">
        <span className="font-sans text-xs uppercase tracking-widest text-mushroom mb-1">
          {product.category}
        </span>
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-display text-lg text-moss group-hover:text-umber transition-colors mb-2">
            {product.name}
          </h3>
        </Link>
        <span className="font-sans text-sm text-moss mt-auto">
          NPR {product.price.toLocaleString()}
        </span>
      </div>
    </div>
  );
}
