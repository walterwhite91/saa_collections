import productsData from "@/data/products.json";
import { notFound } from "next/navigation";
import { ImageGallery } from "@/components/product/ImageGallery";
import { Heart, Minus, Plus, Truck, ArrowLeft } from "lucide-react";
import Link from "next/link";

export function generateStaticParams() {
  const allProducts = [
    ...productsData.dresses,
    ...productsData.jewelry,
    ...productsData.skincare,
    ...productsData.accessories
  ];
  return allProducts.map((p) => ({ slug: p.slug }));
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const allProducts = [
    ...productsData.dresses,
    ...productsData.jewelry,
    ...productsData.skincare,
    ...productsData.accessories
  ];
  
  const product = allProducts.find((p) => p.slug === params.slug);
  
  if (!product) {
    notFound();
  }

  const isDress = product.category === "Dresses";
  const isSkincare = product.category === "Skincare";
  const isJewelry = product.category === "Jewelry";
  
  // Fake gallery images based on main image
  const galleryImages = [product.image, product.image, product.image];

  return (
    <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="text-xs font-sans text-mushroom tracking-widest uppercase mb-12 flex items-center gap-2">
        <Link href="/" className="hover:text-umber transition-colors">Home</Link> 
        <span>/</span>
        <Link href="/shop" className="hover:text-umber transition-colors">Shop</Link> 
        <span>/</span>
        <span className="text-moss">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Gallery */}
        <div className="lg:col-span-7">
          <ImageGallery images={galleryImages} productName={product.name} />
        </div>

        {/* Product Info */}
        <div className="lg:col-span-5 flex flex-col pt-4">
          <span className="font-sans text-xs tracking-[0.2em] uppercase text-mushroom mb-2">
            {product.category}
          </span>
          <h1 className="font-display text-4xl lg:text-5xl text-moss mb-4">
            {product.name}
          </h1>
          
          <div className="font-sans text-xl text-moss mb-8">
            NPR {product.price.toLocaleString()}
          </div>

          <p className="font-sans text-sm leading-relaxed text-moss/80 mb-10">
            {product.description}
          </p>

          {/* Conditional Options */}
          {isDress && (
            <div className="mb-8 border-t border-moss/10 pt-8">
              <div className="flex justify-between items-center mb-4">
                <span className="font-sans text-xs tracking-widest uppercase text-moss">Select Size</span>
                <button className="font-sans text-xs text-umber underline hover:text-moss transition-colors">Size Guide</button>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {['XS', 'S', 'M', 'L'].map(size => (
                  <button key={size} className="border border-moss/20 py-3 font-sans text-xs hover:border-moss transition-colors">
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col gap-4 mb-12 border-t border-moss/10 pt-8">
            <div className="flex gap-4">
              <div className="flex items-center border border-moss/20 px-4">
                <button className="p-2 text-moss hover:text-umber transition-colors"><Minus className="w-4 h-4" /></button>
                <span className="w-12 text-center font-sans text-sm">1</span>
                <button className="p-2 text-moss hover:text-umber transition-colors"><Plus className="w-4 h-4" /></button>
              </div>
              <button className="flex-1 bg-moss text-linen font-sans text-xs uppercase tracking-widest hover:bg-umber transition-colors duration-300">
                Add to Cart
              </button>
              <button className="px-4 border border-moss/20 text-moss hover:border-umber hover:text-umber transition-colors flex items-center justify-center">
                <Heart className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Details Accordion */}
          <div className="border-t border-moss/10 divide-y divide-moss/10">
            {/* Conditional Details */}
            {isDress && (
              <div className="py-6">
                <h4 className="font-sans text-xs tracking-widest uppercase text-moss mb-3">Fabric & Care</h4>
                <p className="font-sans text-sm text-moss/70 leading-relaxed">Premium cotton blend with delicate lace detailing. Dry clean or gentle hand wash cold. Do not bleach. Lay flat to dry.</p>
              </div>
            )}
            {isSkincare && (
              <div className="py-6">
                <h4 className="font-sans text-xs tracking-widest uppercase text-moss mb-3">Usage & Ingredients</h4>
                <p className="font-sans text-sm text-moss/70 leading-relaxed">Apply 2-3 drops to clean skin. Gently press into face and neck. Contains natural botanical extracts, rosehip oil, and vitamin E.</p>
              </div>
            )}
            {isJewelry && (
              <div className="py-6">
                <h4 className="font-sans text-xs tracking-widest uppercase text-moss mb-3">Material & Care</h4>
                <p className="font-sans text-sm text-moss/70 leading-relaxed">18k gold plated brass. Avoid direct contact with water, perfume, and lotions to maintain luster. Store in provided pouch.</p>
              </div>
            )}
            <div className="py-6">
              <h4 className="font-sans text-xs tracking-widest uppercase text-moss mb-3 flex items-center gap-2">
                <Truck className="w-4 h-4" /> Shipping & Returns
              </h4>
              <p className="font-sans text-sm text-moss/70 leading-relaxed">Free standard shipping on all orders. Returns accepted within 14 days of delivery. Custom pieces are non-refundable.</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
