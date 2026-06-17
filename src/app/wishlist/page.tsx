"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";

export default function WishlistPage() {
  return (
    <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[60vh]">
      <h1 className="font-display text-4xl md:text-5xl text-moss mb-4 text-center">
        Your Favourites
      </h1>
      <p className="font-sans text-sm text-moss/80 text-center mb-16">
        Your dream pieces will appear here.
      </p>

      <div className="flex flex-col items-center justify-center py-16 px-4 bg-parchment/50 border border-moss/5 text-center max-w-2xl mx-auto">
        <Heart className="w-12 h-12 text-mushroom mb-6 stroke-1" />
        <h2 className="font-display text-2xl text-moss mb-4">Your list is currently empty</h2>
        <p className="font-sans text-sm text-moss/70 mb-8 max-w-md mx-auto">
          Explore our collections and save your favorite pieces to create your perfect romantic wardrobe.
        </p>
        <Link 
          href="/shop" 
          className="inline-block px-10 py-4 bg-moss text-linen font-sans text-xs uppercase tracking-widest hover:bg-umber transition-colors"
        >
          Discover the Collection
        </Link>
      </div>
    </div>
  );
}
