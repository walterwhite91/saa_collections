"use client";

import { useState } from "react";
import { Heart, Minus, Plus } from "lucide-react";
import { useStore } from "@/context/StoreContext";

interface ProductActionsProps {
  product: {
    id: string;
    slug: string;
    name: string;
    price: number;
    image: string;
    category: string;
  };
  isDress: boolean;
}

export function ProductActions({ product, isDress }: ProductActionsProps) {
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(false);

  const sizes = ["XS", "S", "M", "L"];
  const isFavorite = isInWishlist(product.id);

  const handleAddToCart = () => {
    if (isDress && !selectedSize) {
      setError(true);
      return;
    }
    
    setError(false);
    addToCart({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize || undefined,
      quantity,
      category: product.category,
    });
  };

  return (
    <>
      {isDress && (
        <div className="mb-8 border-t border-moss/10 pt-8">
          <div className="flex justify-between items-center mb-4">
            <span className="font-sans text-xs tracking-widest uppercase text-moss">
              Select Size
            </span>
            <button className="font-sans text-xs text-umber underline hover:text-moss transition-colors">
              Size Guide
            </button>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => {
                  setSelectedSize(size);
                  setError(false);
                }}
                className={`py-3 font-sans text-xs transition-colors border ${
                  selectedSize === size
                    ? "border-umber bg-umber text-linen"
                    : "border-moss/20 hover:border-moss text-moss"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
          {error && (
            <p className="font-sans text-xs text-red-500 mt-2">
              Please select a size to continue.
            </p>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col gap-4 mb-12 border-t border-moss/10 pt-8">
        <div className="flex gap-4">
          <div className="flex items-center border border-moss/20 px-4">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-2 text-moss hover:text-umber transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-12 text-center font-sans text-sm">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="p-2 text-moss hover:text-umber transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-moss text-linen font-sans text-xs uppercase tracking-widest hover:bg-umber transition-colors duration-300"
          >
            Add to Cart
          </button>
          <button
            onClick={() => toggleWishlist(product.id)}
            className="px-4 border border-moss/20 text-moss hover:border-umber hover:text-umber transition-colors flex items-center justify-center group"
          >
            <Heart
              className={`w-5 h-5 transition-colors ${
                isFavorite ? "fill-umber text-umber" : "group-hover:text-umber"
              }`}
            />
          </button>
        </div>
      </div>
    </>
  );
}
