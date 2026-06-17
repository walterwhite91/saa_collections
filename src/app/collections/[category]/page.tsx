import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import productsData from "@/data/products.json";
import { ProductCard } from "@/components/product/ProductCard";

const categoryConfig: Record<string, { title: string; description: string; filter: () => typeof allProducts }> = {};

const allProducts = [
  ...productsData.dresses,
  ...productsData.jewelry,
  ...productsData.skincare,
  ...productsData.accessories,
];

const configs: Record<string, { title: string; description: string; filterFn: (products: typeof allProducts) => typeof allProducts }> = {
  dresses: {
    title: "Dresses",
    description: "Romantic silhouettes for photoshoots, special moments, and feminine daily wear.",
    filterFn: () => productsData.dresses,
  },
  jewelry: {
    title: "Jewelry",
    description: "Delicate handcrafted pieces inspired by nature and Himalayan beauty.",
    filterFn: () => productsData.jewelry,
  },
  skincare: {
    title: "Skincare",
    description: "Botanical formulas crafted from pure, natural ingredients for radiant skin.",
    filterFn: () => productsData.skincare,
  },
  accessories: {
    title: "Accessories",
    description: "Finishing touches that complete the SAA look — from hair ribbons to handmade bags.",
    filterFn: () => productsData.accessories,
  },
  essentials: {
    title: "Curated Essentials",
    description: "Jewelry, skincare, and finishing details for the full SAA experience.",
    filterFn: () => [...productsData.jewelry, ...productsData.skincare, ...productsData.accessories],
  },
  fairy: {
    title: "Fairycore Dresses",
    description: "Ethereal gowns inspired by enchanted forests, wildflower meadows, and soft magic.",
    filterFn: () => productsData.dresses.filter(d => d.slug.includes("fairy") || d.slug.includes("wildflower") || d.slug.includes("prairie")),
  },
  himalayan: {
    title: "Himalayan Forest Collection",
    description: "Designs rooted in the mystic romance and quiet strength of the Himalayas.",
    filterFn: () => productsData.dresses.filter(d => d.slug.includes("himalayan") || d.slug.includes("forest")),
  },
  events: {
    title: "Event Wear",
    description: "Statement pieces designed for memorable occasions and celebrations.",
    filterFn: () => productsData.dresses.filter(d => d.price >= 7000),
  },
  photoshoot: {
    title: "Photoshoot Pieces",
    description: "Dramatic, editorial-worthy garments that photograph beautifully in any setting.",
    filterFn: () => productsData.dresses,
  },
  beauty: {
    title: "Natural Beauty Essentials",
    description: "Pure skincare and cosmetic essentials for a naturally radiant glow.",
    filterFn: () => productsData.skincare,
  },
};

export function generateStaticParams() {
  return Object.keys(configs).map((category) => ({ category }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const config = configs[category];
  return {
    title: config ? `${config.title} | SAA Collection` : "Collection | SAA Collection",
    description: config?.description || "Explore the SAA Collection.",
  };
}

export default async function CollectionPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const config = configs[category];

  if (!config) {
    return (
      <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="font-display text-4xl text-moss mb-4">Collection Not Found</h1>
        <p className="font-sans text-sm text-moss/80 mb-8">The collection you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/shop" className="inline-block px-8 py-3 bg-umber text-linen font-sans text-xs uppercase tracking-widest hover:bg-moss transition-colors">
          Browse All Products
        </Link>
      </div>
    );
  }

  const products = config.filterFn(allProducts);

  return (
    <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="font-sans text-xs text-moss/50 mb-8 tracking-wide">
        <Link href="/" className="hover:text-umber transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-moss">{config.title}</span>
      </nav>

      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="font-display text-4xl md:text-5xl text-moss mb-4">
          {config.title}
        </h1>
        <p className="font-sans text-sm text-moss/80 max-w-2xl mx-auto">
          {config.description}
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-20">
          <p className="font-sans text-sm text-moss/60 mb-6">No products found in this collection yet.</p>
          <Link href="/shop" className="inline-block px-8 py-3 border border-umber text-umber font-sans text-xs uppercase tracking-widest hover:bg-umber hover:text-linen transition-colors">
            Browse All Products
          </Link>
        </div>
      )}
    </div>
  );
}
