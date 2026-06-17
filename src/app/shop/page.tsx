"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import productsData from "@/data/products.json";
import { ProductCard } from "@/components/product/ProductCard";

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  
  const allProducts = [
    ...productsData.dresses,
    ...productsData.jewelry,
    ...productsData.skincare,
    ...productsData.accessories
  ];

  const categories = ["All", "Dresses", "Jewelry", "Skincare", "Accessories", "Curated Essentials", "Best Sellers"];

  const filteredProducts = activeCategory === "All" 
    ? allProducts 
    : activeCategory === "Best Sellers" 
      ? allProducts.filter(p => 'bestSeller' in p && p.bestSeller)
      : activeCategory === "Curated Essentials"
        ? [...productsData.jewelry, ...productsData.skincare, ...productsData.accessories]
        : allProducts.filter(p => p.category === activeCategory);

  return (
    <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="font-display text-4xl md:text-5xl text-moss mb-4">
          The Collection
        </h1>
        <p className="font-sans text-sm text-moss/80 max-w-2xl mx-auto">
          Explore our complete range of handmade dresses, natural skincare, and delicate jewelry.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Sidebar Filters (Desktop) */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-32">
            <h3 className="font-display text-2xl text-moss mb-8">Categories</h3>
            <ul className="space-y-4 font-sans text-sm">
              {categories.map(cat => (
                <li key={cat}>
                  <button 
                    onClick={() => setActiveCategory(cat)}
                    className={`hover:text-umber transition-colors ${activeCategory === cat ? 'text-umber font-medium' : 'text-moss/80'}`}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>

            <h3 className="font-display text-2xl text-moss mb-6 mt-12">Filter by Price</h3>
            <div className="space-y-4 font-sans text-sm text-moss/80">
              <label className="flex items-center gap-3">
                <input type="checkbox" className="accent-umber" /> Under NPR 5,000
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" className="accent-umber" /> NPR 5,000 - 10,000
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" className="accent-umber" /> Over NPR 10,000
              </label>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Top Bar */}
          <div className="flex justify-between items-center mb-8 pb-4 border-b border-moss/10">
            <button className="lg:hidden flex items-center gap-2 font-sans text-sm text-moss uppercase tracking-widest">
              <SlidersHorizontal className="w-4 h-4" /> Filters
            </button>
            <div className="hidden lg:block font-sans text-sm text-moss/60">
              Showing {filteredProducts.length} items
            </div>
            <div className="flex items-center gap-2 font-sans text-sm text-moss">
              <span className="uppercase tracking-widest">Sort by</span>
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
