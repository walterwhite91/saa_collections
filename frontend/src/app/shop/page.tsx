"use client";

import { useState, useEffect } from "react";
import { ChevronDown, SlidersHorizontal, Loader2 } from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        let url = "/api/products?limit=100";
        if (activeCategory !== "All") {
          if (activeCategory === "Best Sellers") {
            url += "&best_seller=true";
          } else if (activeCategory === "Curated Essentials") {
            // Keep base url, we will filter locally
          } else {
            url += `&category=${activeCategory.toLowerCase()}`;
          }
        }
        
        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          let fetchedProducts = data.products || [];
          
          if (activeCategory === "Curated Essentials") {
            fetchedProducts = fetchedProducts.filter((p: any) => 
              ["jewelry", "skincare", "accessories"].includes(p.category?.slug)
            );
          }
          
          setProducts(fetchedProducts);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [activeCategory]);

  const categories = ["All", "Dresses", "Jewelry", "Skincare", "Accessories", "Curated Essentials", "Best Sellers"];

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
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" className="accent-umber" /> Under NPR 5,000
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" className="accent-umber" /> NPR 5,000 - 10,000
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
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
              {isLoading ? "Loading..." : `Showing ${products.length} items`}
            </div>
            <div className="flex items-center gap-2 font-sans text-sm text-moss cursor-pointer">
              <span className="uppercase tracking-widest">Sort by</span>
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>

          {/* Grid */}
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-umber" />
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={{
                    ...product,
                    category: product.category?.name || "Unknown"
                  }} 
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="font-sans text-moss/60">No products found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
