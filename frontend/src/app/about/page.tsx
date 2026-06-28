import Image from "next/image";
import { getImageUrl } from "@/lib/utils/image";
import Link from "next/link";
import { Leaf, Mountain, Sparkles, Heart } from "lucide-react";

export const metadata = {
  title: "Our Story | SAA Collection",
  description: "Discover the story behind SAA Collection — fairycore dreams rooted in Nepali soul, handmade beauty, and Himalayan romance.",
};

export default function AboutPage() {
  return (
    <div className="py-24">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="font-sans text-xs text-moss/50 mb-8 tracking-wide">
          <Link href="/" className="hover:text-umber transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-moss">Brand Story</span>
        </nav>
      </div>

      {/* Hero */}
      <div className="relative aspect-[21/9] md:aspect-[21/9] overflow-hidden rounded-sm mb-24">
        <Image 
          src={getImageUrl("brand-overview.jpeg")}
          alt="SAA Collection Atelier"
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-obsidian/40 flex items-center justify-center">
          <div className="text-center text-linen max-w-3xl px-4">
            <span className="block font-sans text-xs tracking-[0.2em] uppercase mb-4 text-linen/80">Our Story</span>
            <h1 className="font-display text-4xl md:text-6xl mb-6 drop-shadow-lg">
              Fairycore dreams, <span className="italic font-light">Nepali soul.</span>
            </h1>
            <p className="font-sans text-sm md:text-base text-linen/90 leading-relaxed max-w-xl mx-auto">
              Born in the heart of Kathmandu, SAA Collection brings together handmade romance, natural beauty, and a soft feminine spirit.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Origin Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-28">
          <div>
            <span className="block font-sans text-xs tracking-[0.2em] uppercase text-mushroom mb-4">Where it began</span>
            <h2 className="font-display text-3xl md:text-4xl text-moss mb-8 leading-tight">
              A dream woven from <br className="hidden md:block" />
              <span className="italic font-light">Himalayan mist.</span>
            </h2>
            <div className="space-y-6 font-sans text-sm text-moss/80 leading-relaxed">
              <p>
                SAA was born from a simple truth: that beauty should feel natural, romantic, and deeply personal. Growing up in Nepal, surrounded by mountain wildflowers, ancient temples, and the quiet power of nature, we dreamed of creating something that would capture that feeling and share it with women everywhere.
              </p>
              <p>
                Every SAA dress is a love letter to the Himalayas — designed with flowing silhouettes, botanical details, and an ethereal femininity that celebrates the dreamer in every woman. Our skincare is crafted from pure, natural ingredients; our jewelry, from delicate handwork passed down through generations.
              </p>
              <p>
                We don&apos;t follow fast fashion. We believe in slow beauty, timeless romance, and pieces that make you feel like the most magical version of yourself.
              </p>
            </div>
          </div>
          <div className="relative aspect-[3/4] md:aspect-[4/5] rounded-sm overflow-hidden mt-12 md:mt-0">
            <Image 
              src={getImageUrl("design-14-himalayan-fairy-model.png")}
              alt="SAA Collection Process"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* Values */}
        <div className="text-center mb-16">
          <span className="block font-sans text-xs tracking-[0.2em] uppercase text-mushroom mb-4">What We Believe</span>
          <h2 className="font-display text-3xl md:text-4xl text-moss">Our Values</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-28">
          {[
            { icon: <Sparkles className="w-6 h-6 text-umber" />, title: "Handmade Feeling", desc: "Each piece is crafted with care, embracing the perfectly imperfect touch of human hands." },
            { icon: <Mountain className="w-6 h-6 text-umber" />, title: "Himalayan Identity", desc: "Rooted in the high altitudes of Nepal, our designs carry the mystic romance of the mountains." },
            { icon: <Leaf className="w-6 h-6 text-umber" />, title: "Natural Beauty", desc: "Pure ingredients, botanical formulas, and a deep respect for the healing power of nature." },
            { icon: <Heart className="w-6 h-6 text-umber" />, title: "Soft Femininity", desc: "Flowing silhouettes and gentle details that highlight your natural elegance." },
          ].map((v, i) => (
            <div key={i} className="flex flex-col items-center text-center p-8 rounded-lg border border-moss/5 bg-parchment/30">
              <div className="w-14 h-14 rounded-full border border-umber/30 flex items-center justify-center mb-5 bg-linen">
                {v.icon}
              </div>
              <h3 className="font-display text-xl text-moss mb-3">{v.title}</h3>
              <p className="font-sans text-sm text-moss/70 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>

        {/* Mission CTA */}
        <div className="bg-parchment py-20 px-8 text-center rounded-sm">
          <h2 className="font-display text-3xl md:text-4xl text-moss mb-6">
            For the dreamers, the romantics, <br className="hidden md:block" />
            <span className="italic font-light">the quietly powerful.</span>
          </h2>
          <p className="font-sans text-sm text-moss/70 max-w-xl mx-auto mb-8 leading-relaxed">
            SAA Collection is more than a brand — it&apos;s a way of living beautifully, naturally, and with intention.
          </p>
          <Link href="/shop" className="inline-block px-10 py-4 bg-umber text-linen font-sans text-xs uppercase tracking-widest hover:bg-moss transition-colors duration-300">
            Explore the Collection
          </Link>
        </div>
      </div>
    </div>
  );
}
