import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import productsData from "@/data/products.json";
import { ProductCard } from "@/components/product/ProductCard";

export const metadata = {
  title: "Best Sellers | SAA Collection",
  description: "Shop SAA Collection's most loved pieces — our best-selling dresses, jewelry, and beauty essentials.",
};

export default function BestsellersPage() {
  const allProducts = [
    ...productsData.dresses,
    ...productsData.jewelry,
    ...productsData.skincare,
    ...productsData.accessories,
  ];

  const bestsellers = allProducts.filter((p) => "bestSeller" in p && p.bestSeller);
  const featured = bestsellers.length > 0 ? bestsellers : allProducts.filter((p) => p.featured);

  return (
    <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <nav className="font-sans text-xs text-moss/50 mb-8 tracking-wide">
        <Link href="/" className="hover:text-umber transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-moss">Best Sellers</span>
      </nav>

      <div className="text-center mb-16">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Star className="w-5 h-5 text-umber" />
          <span className="font-sans text-xs tracking-[0.2em] uppercase text-mushroom">Most Loved</span>
        </div>
        <h1 className="font-display text-4xl md:text-5xl text-moss mb-4">Best Sellers</h1>
        <p className="font-sans text-sm text-moss/80 max-w-2xl mx-auto">
          Our community&apos;s favorites — the pieces that women keep coming back to again and again.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {featured.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
