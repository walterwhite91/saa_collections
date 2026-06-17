import Image from "next/image";

export default function SustainabilityPage() {
  const values = [
    {
      title: "Handcrafted Quality",
      description: "We believe in the beauty of slow fashion. Every SAA piece is handmade by skilled artisans in Kathmandu, ensuring exceptional quality and preserving traditional techniques."
    },
    {
      title: "Himalayan Identity",
      description: "Our brand is deeply rooted in Nepali heritage. We source local materials whenever possible and draw continuous inspiration from the mystic romance of the Himalayas."
    },
    {
      title: "Timeless Romance",
      description: "We design pieces that transcend fleeting trends. By focusing on classic, romantic silhouettes, we create garments that you will cherish and wear for years to come."
    },
    {
      title: "Natural Beauty",
      description: "Our skincare and cosmetics are crafted with pure, botanical ingredients. We avoid harsh chemicals and embrace the healing properties of nature."
    },
    {
      title: "Soft Femininity",
      description: "We celebrate gentle strength and ethereal beauty. Our designs are made to make you feel comfortable, beautiful, and effortlessly elegant."
    }
  ];

  return (
    <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <span className="block font-sans text-xs tracking-[0.2em] uppercase text-mushroom mb-4">
          Our Philosophy
        </span>
        <h1 className="font-display text-4xl md:text-5xl text-moss mb-6">
          Sustainability & Values
        </h1>
        <p className="font-sans text-sm text-moss/80 max-w-2xl mx-auto leading-relaxed">
          At SAA Collection, we are committed to creating beautiful products while honoring the earth and the hands that make them.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
        <div className="relative aspect-[3/4] w-full bg-parchment overflow-hidden">
          <Image
            src="/images/brand-overview.jpeg"
            alt="Artisan crafting a dress"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div className="space-y-12">
          {values.map((value, idx) => (
            <div key={idx}>
              <h3 className="font-display text-2xl text-moss mb-3">
                {value.title}
              </h3>
              <p className="font-sans text-sm text-moss/80 leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
