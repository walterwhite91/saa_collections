import Image from "next/image";
import Link from "next/link";
import { Gift } from "lucide-react";

export const metadata = {
  title: "Gift Sets | SAA Collection",
  description: "Curated gift sets from SAA Collection — perfect for birthdays, celebrations, and moments of love.",
};

const giftSets = [
  {
    id: "gs-1",
    name: "The Dreamer's Set",
    description: "Pearl Drop Necklace + Himalayan Glow Serum — a perfect pairing of elegance and radiance.",
    price: 2300,
    image: "pearl_necklace.png",
    includes: ["Pearl Drop Necklace", "Himalayan Glow Serum", "Gift wrapping"],
  },
  {
    id: "gs-2",
    name: "Himalayan Glow Bundle",
    description: "Our complete skincare ritual — cleanse, nourish, and glow with pure botanical ingredients.",
    price: 3050,
    image: "glow_serum.png",
    includes: ["Himalayan Glow Serum", "Rose Hydrating Cream", "Botanical Face Oil", "Gift wrapping"],
  },
  {
    id: "gs-3",
    name: "The Romance Set",
    description: "Fairycore Hair Ribbon + Floral Pendant Set — for women who love romantic, delicate details.",
    price: 1600,
    image: "hair_accessory.png",
    includes: ["Fairycore Hair Ribbon", "Floral Pendant Set", "Handwritten card"],
  },
];

export default function GiftsPage() {
  return (
    <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <nav className="font-sans text-xs text-moss/50 mb-8 tracking-wide">
        <Link href="/" className="hover:text-umber transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-moss">Gift Sets</span>
      </nav>

      <div className="text-center mb-16">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Gift className="w-5 h-5 text-umber" />
          <span className="font-sans text-xs tracking-[0.2em] uppercase text-mushroom">Thoughtful Gifting</span>
        </div>
        <h1 className="font-display text-4xl md:text-5xl text-moss mb-4">Gift Sets</h1>
        <p className="font-sans text-sm text-moss/80 max-w-2xl mx-auto">
          Beautifully curated bundles for birthdays, celebrations, or simply to say &ldquo;I love you.&rdquo; Each set comes wrapped in our signature SAA packaging.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {giftSets.map((set) => (
          <div key={set.id} className="group bg-parchment/30 border border-moss/10 rounded-sm overflow-hidden">
            <div className="relative aspect-square bg-parchment overflow-hidden">
              <Image src={`/images/${set.image}`} alt={set.name} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="p-8">
              <h3 className="font-display text-2xl text-moss mb-3">{set.name}</h3>
              <p className="font-sans text-sm text-moss/70 leading-relaxed mb-4">{set.description}</p>
              <div className="mb-6">
                <span className="font-sans text-xs uppercase tracking-widest text-mushroom block mb-2">Includes:</span>
                <ul className="space-y-1">
                  {set.includes.map((item, i) => (
                    <li key={i} className="font-sans text-sm text-moss/80">• {item}</li>
                  ))}
                </ul>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-display text-xl text-moss">NPR {set.price.toLocaleString()}</span>
                <button className="px-6 py-3 bg-umber text-linen font-sans text-xs uppercase tracking-widest hover:bg-moss transition-colors duration-300">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
