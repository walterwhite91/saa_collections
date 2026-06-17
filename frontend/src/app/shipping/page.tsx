import Link from "next/link";
import { Truck, Globe, Package, Clock } from "lucide-react";

export const metadata = {
  title: "Shipping Information | SAA Collection",
  description: "Learn about SAA Collection's shipping options, delivery timelines, and free shipping policy.",
};

export default function ShippingPage() {
  return (
    <div className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <nav className="font-sans text-xs text-moss/50 mb-8 tracking-wide">
        <Link href="/" className="hover:text-umber transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-moss">Shipping</span>
      </nav>

      <h1 className="font-display text-4xl md:text-5xl text-moss mb-6">Shipping Information</h1>
      <p className="font-sans text-sm text-moss/70 mb-16 max-w-2xl leading-relaxed">
        We want your SAA pieces to arrive safely and beautifully. Here&apos;s everything you need to know about our shipping process.
      </p>

      {/* Shipping Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="bg-parchment border border-moss/10 p-8 rounded-sm">
          <Truck className="w-6 h-6 text-umber mb-4" />
          <h3 className="font-display text-xl text-moss mb-3">Domestic Shipping (Nepal)</h3>
          <ul className="space-y-3 font-sans text-sm text-moss/80 leading-relaxed">
            <li>• <strong>Free standard shipping</strong> on all orders</li>
            <li>• Delivery within 3-5 business days</li>
            <li>• Cash on delivery available in Kathmandu Valley</li>
            <li>• Order tracking provided via SMS and email</li>
          </ul>
        </div>

        <div className="bg-parchment border border-moss/10 p-8 rounded-sm">
          <Globe className="w-6 h-6 text-umber mb-4" />
          <h3 className="font-display text-xl text-moss mb-3">International Shipping</h3>
          <ul className="space-y-3 font-sans text-sm text-moss/80 leading-relaxed">
            <li>• Express courier (Air) — 7-14 business days</li>
            <li>• Rates calculated at checkout by destination</li>
            <li>• Full tracking provided</li>
            <li>• Customs duties are the customer&apos;s responsibility</li>
          </ul>
        </div>
      </div>

      {/* Process Steps */}
      <h2 className="font-display text-2xl text-moss mb-8">How It Works</h2>
      <div className="space-y-8 mb-16">
        {[
          { icon: <Package className="w-5 h-5 text-umber" />, title: "Order Processing", desc: "Orders are processed within 1-2 business days. Handmade dress orders may take 3-5 days for quality preparation." },
          { icon: <Truck className="w-5 h-5 text-umber" />, title: "Careful Packaging", desc: "Each item is wrapped in tissue paper with dried botanicals, placed in our signature SAA packaging to ensure it arrives beautifully." },
          { icon: <Clock className="w-5 h-5 text-umber" />, title: "Tracking & Delivery", desc: "Once shipped, you will receive a confirmation email with your tracking number. You can track your parcel in real time." },
        ].map((step, i) => (
          <div key={i} className="flex gap-6 items-start">
            <div className="w-12 h-12 rounded-full border border-umber/30 flex items-center justify-center bg-linen shrink-0">
              {step.icon}
            </div>
            <div>
              <h3 className="font-display text-lg text-moss mb-2">{step.title}</h3>
              <p className="font-sans text-sm text-moss/80 leading-relaxed">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Important Notes */}
      <div className="bg-parchment border border-moss/10 p-8 rounded-sm">
        <h3 className="font-display text-xl text-moss mb-4">Important Notes</h3>
        <ul className="space-y-3 font-sans text-sm text-moss/80 leading-relaxed">
          <li>• Delivery timelines are estimates and may vary during peak seasons or holidays.</li>
          <li>• We are not responsible for delays caused by customs or local postal services for international orders.</li>
          <li>• If your order has not arrived within the expected timeframe, please <Link href="/contact" className="text-umber hover:underline">contact us</Link>.</li>
        </ul>
      </div>
    </div>
  );
}
