import Link from "next/link";
import { Sparkles } from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "New Arrivals | SAA Collection",
  description: "Discover the latest additions to SAA Collection — freshly crafted dresses, jewelry, skincare, and accessories.",
};

export default async function NewArrivalsPage() {
  const supabase = await createClient();
  
  // Get latest products
  const { data: newProducts } = await supabase
    .from("products")
    .select("*, category:categories(name)")
    .eq("in_stock", true)
    .order("created_at", { ascending: false })
    .limit(8);

  const products = (newProducts || []).map((p: any) => ({
    ...p,
    category: p.category?.name || "Unknown"
  }));

  return (
    <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <nav className="font-sans text-xs text-moss/50 mb-8 tracking-wide">
        <Link href="/" className="hover:text-umber transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-moss">New Arrivals</span>
      </nav>

      <div className="text-center mb-16">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Sparkles className="w-5 h-5 text-umber" />
          <span className="font-sans text-xs tracking-[0.2em] uppercase text-mushroom">Just In</span>
        </div>
        <h1 className="font-display text-4xl md:text-5xl text-moss mb-4">New Arrivals</h1>
        <p className="font-sans text-sm text-moss/80 max-w-2xl mx-auto">
          The latest additions to our collection — freshly crafted with the same love, detail, and Himalayan spirit.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div key={product.id} className="relative">
            <ProductCard product={product} />
            <div className="absolute top-4 left-4 z-20 pointer-events-none">
              <span className="bg-umber text-linen font-sans text-[10px] uppercase tracking-widest px-3 py-1">New</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
