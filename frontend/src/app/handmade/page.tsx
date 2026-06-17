import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Handmade Details | SAA Collection",
  description: "Discover the artisanship behind SAA Collection — handmade dresses, natural skincare, and traditional Nepali craftsmanship.",
};

export default function HandmadePage() {
  return (
    <div className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="font-sans text-xs text-moss/50 mb-8 tracking-wide">
          <Link href="/" className="hover:text-umber transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-moss">Handmade Details</span>
        </nav>

        <div className="text-center mb-20">
          <span className="block font-sans text-xs tracking-[0.2em] uppercase text-mushroom mb-4">Craftsmanship</span>
          <h1 className="font-display text-4xl md:text-5xl text-moss mb-6">Handmade Details</h1>
          <p className="font-sans text-sm text-moss/80 max-w-2xl mx-auto leading-relaxed">
            Every SAA piece carries the warmth of human hands. We believe that true luxury lies in the art of making — slowly, carefully, and with intention.
          </p>
        </div>

        {/* Story Sections */}
        <div className="space-y-28">
          {/* Section 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-[4/5] bg-parchment overflow-hidden">
              <Image
                src="/images/design-5-medieval-forest-model.png"
                alt="Handmade dress craftsmanship"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div>
              <span className="block font-sans text-xs tracking-[0.2em] uppercase text-mushroom mb-4">The Process</span>
              <h2 className="font-display text-3xl text-moss mb-6 leading-tight">
                From sketch to silhouette, <br className="hidden md:block" />
                <span className="italic font-light">every stitch tells a story.</span>
              </h2>
              <div className="space-y-4 font-sans text-sm text-moss/80 leading-relaxed">
                <p>
                  Each SAA dress begins as a hand-drawn sketch, inspired by the forests, flowers, and fairy tales of the Himalayas. Our designers work closely with skilled artisans in Kathmandu to bring each vision to life.
                </p>
                <p>
                  The cutting, stitching, and finishing are all done by hand — not because it&apos;s efficient, but because it&apos;s beautiful. The slight imperfections, the warmth of touch, the care in every hem and seam — these are what make a SAA piece truly special.
                </p>
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="lg:order-2 relative aspect-[4/5] bg-parchment overflow-hidden">
              <Image
                src="/images/glow_serum.png"
                alt="Natural botanical skincare"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="lg:order-1">
              <span className="block font-sans text-xs tracking-[0.2em] uppercase text-mushroom mb-4">Natural Ingredients</span>
              <h2 className="font-display text-3xl text-moss mb-6 leading-tight">
                Pure botanicals, <br className="hidden md:block" />
                <span className="italic font-light">Himalayan heritage.</span>
              </h2>
              <div className="space-y-4 font-sans text-sm text-moss/80 leading-relaxed">
                <p>
                  Our skincare is formulated with ingredients sourced from the high altitudes of Nepal — wild herbs, mountain flowers, and ancient botanical recipes passed down through generations.
                </p>
                <p>
                  We avoid harsh chemicals, synthetic fragrances, and unnecessary additives. Every formula is crafted in small batches to ensure freshness and potency. Your skin deserves the purity of nature.
                </p>
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-[4/5] bg-parchment overflow-hidden">
              <Image
                src="/images/pearl_necklace.png"
                alt="Handcrafted jewelry details"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div>
              <span className="block font-sans text-xs tracking-[0.2em] uppercase text-mushroom mb-4">Artisan Jewelry</span>
              <h2 className="font-display text-3xl text-moss mb-6 leading-tight">
                Delicate details, <br className="hidden md:block" />
                <span className="italic font-light">crafted with reverence.</span>
              </h2>
              <div className="space-y-4 font-sans text-sm text-moss/80 leading-relaxed">
                <p>
                  Our jewelry is made using traditional Nepali metalwork techniques — hand-bent wire, pearl setting, and careful polishing by artisans who have been perfecting their craft for decades.
                </p>
                <p>
                  Each piece is designed to be timeless — something you reach for again and again, a quiet companion to your everyday beauty.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-28 text-center">
          <h2 className="font-display text-3xl text-moss mb-6">Experience the difference of handmade.</h2>
          <Link href="/shop" className="inline-block px-10 py-4 bg-umber text-linen font-sans text-xs uppercase tracking-widest hover:bg-moss transition-colors duration-300">
            Shop the Collection
          </Link>
        </div>
      </div>
    </div>
  );
}
