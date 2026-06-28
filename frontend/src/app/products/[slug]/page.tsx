import { notFound } from "next/navigation";
import { ImageGallery } from "@/components/product/ImageGallery";
import { Truck } from "lucide-react";
import Link from "next/link";
import { ProductActions } from "@/components/product/ProductActions";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function generateStaticParams() {
  const supabase = createAdminClient();
  const { data } = await supabase.from("products").select("slug");
  return data ? data.map((p) => ({ slug: p.slug })) : [];
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();
  
  const { data: product } = await supabase
    .from("products")
    .select("*, category:categories(name)")
    .eq("slug", slug)
    .single();
    
  if (!product) {
    notFound();
  }

  const categoryName = product.category?.name || "Unknown";
  const isDress = categoryName === "Dresses";
  const isSkincare = categoryName === "Skincare";
  const isJewelry = categoryName === "Jewelry";
  
  // Gallery images logic based on base name
  let galleryImages = [product.image];
  if (product.image.endsWith("-model.png")) {
    const base = product.image.replace("-model.png", "");
    galleryImages = [
      `${base}-model.png`,
      `${base}-product.png`,
      `${base}-full.png`
    ];
  }

  const mappedProduct = {
    ...product,
    category: categoryName
  };

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
            {categoryName}
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

          {/* Product Actions Component */}
          <ProductActions product={mappedProduct} isDress={isDress} />

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
