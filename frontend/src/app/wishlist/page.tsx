"use client";

import Link from "next/link";
import { Heart, Loader2 } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { ProductCard } from "@/components/product/ProductCard";
import { useState, useEffect } from "react";

export default function WishlistPage() {
  const { wishlist } = useStore();
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      if (wishlist.length === 0) {
        setProducts([]);
        setIsLoading(false);
        return;
      }
      
      setIsLoading(true);
      try {
        const res = await fetch("/api/products?limit=100");
        if (res.ok) {
          const data = await res.json();
          const allProducts = data.products || [];
          // Map to match ProductCard expectations
          const mapped = allProducts.map((p: any) => ({
             ...p,
             category: p.category?.name || "Unknown"
          }));
          const filtered = mapped.filter((p: any) => wishlist.includes(p.id));
          setProducts(filtered);
        }
      } catch (error) {
        console.error("Failed to fetch wishlist products", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [wishlist]);

  return (
    <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[60vh]">
      <h1 className="font-display text-4xl md:text-5xl text-moss mb-4 text-center">
        Your Favourites
      </h1>
      <p className="font-sans text-sm text-moss/80 text-center mb-16">
        {wishlist.length > 0
          ? `You have saved ${wishlist.length} ${
              wishlist.length === 1 ? "piece" : "pieces"
            } to your dream wardrobe.`
          : "Your dream pieces will appear here."}
      </p>

      {isLoading ? (
        <div className="flex justify-center py-12">
           <Loader2 className="w-8 h-8 animate-spin text-umber" />
        </div>
      ) : products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-4 bg-parchment/50 border border-moss/5 text-center max-w-2xl mx-auto rounded-sm">
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
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
