import Link from "next/link";
import { RotateCcw, CheckCircle, XCircle, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Returns & Refunds | SAA Collection",
  description: "Learn about SAA Collection's return and refund policy for dresses, skincare, jewelry, and accessories.",
};

export default function ReturnsPage() {
  return (
    <div className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <nav className="font-sans text-xs text-moss/50 mb-8 tracking-wide">
        <Link href="/" className="hover:text-umber transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-moss">Returns</span>
      </nav>

      <h1 className="font-display text-4xl md:text-5xl text-moss mb-6">Returns & Refunds</h1>
      <p className="font-sans text-sm text-moss/70 mb-16 max-w-2xl leading-relaxed">
        We want you to love every SAA piece. If something isn&apos;t quite right, we&apos;re here to help.
      </p>

      {/* Policy Overview */}
      <div className="bg-parchment border border-moss/10 p-8 rounded-sm mb-16">
        <div className="flex items-center gap-3 mb-6">
          <RotateCcw className="w-5 h-5 text-umber" />
          <h2 className="font-display text-2xl text-moss">Return Policy</h2>
        </div>
        <p className="font-sans text-sm text-moss/80 leading-relaxed mb-4">
          We offer a <strong>14-day return policy</strong> from the date of delivery. Items must be unworn, unwashed, and in their original packaging with all tags attached. Once we receive and inspect your return, a refund will be processed within 5-7 business days.
        </p>
      </div>

      {/* Eligible / Not Eligible */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div>
          <div className="flex items-center gap-3 mb-6">
            <CheckCircle className="w-5 h-5 text-umber" />
            <h3 className="font-display text-xl text-moss">Eligible for Return</h3>
          </div>
          <ul className="space-y-3 font-sans text-sm text-moss/80 leading-relaxed">
            <li>• Dresses — unworn, tags attached, in original packaging</li>
            <li>• Jewelry — unworn, in original pouch/box</li>
            <li>• Accessories — unused, in original packaging</li>
            <li>• Items received damaged or defective</li>
            <li>• Wrong item received</li>
          </ul>
        </div>

        <div>
          <div className="flex items-center gap-3 mb-6">
            <XCircle className="w-5 h-5 text-moss/50" />
            <h3 className="font-display text-xl text-moss">Not Eligible</h3>
          </div>
          <ul className="space-y-3 font-sans text-sm text-moss/80 leading-relaxed">
            <li>• Skincare products that have been opened or used</li>
            <li>• Items worn, washed, or altered</li>
            <li>• Items without original tags and packaging</li>
            <li>• Sale or clearance items (final sale)</li>
            <li>• Items returned after 14 days</li>
          </ul>
        </div>
      </div>

      {/* How to Return */}
      <h2 className="font-display text-2xl text-moss mb-8">How to Initiate a Return</h2>
      <div className="space-y-6 mb-16">
        {[
          { step: "1", title: "Contact Us", desc: "Email hello@saacollection.com or use our contact form with your order number and reason for return." },
          { step: "2", title: "Receive Approval", desc: "We'll review your request and send you return instructions within 1-2 business days." },
          { step: "3", title: "Ship Your Return", desc: "Package your item securely and ship it to the address provided. Return shipping costs are the customer's responsibility unless the item is defective." },
          { step: "4", title: "Refund Processed", desc: "Once we receive and inspect your return, your refund will be processed to the original payment method within 5-7 business days." },
        ].map((s, i) => (
          <div key={i} className="flex gap-6 items-start">
            <div className="w-10 h-10 rounded-full bg-umber text-linen flex items-center justify-center font-display text-sm shrink-0">
              {s.step}
            </div>
            <div>
              <h3 className="font-display text-lg text-moss mb-1">{s.title}</h3>
              <p className="font-sans text-sm text-moss/80 leading-relaxed">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <Link href="/contact" className="inline-flex items-center gap-2 px-10 py-4 bg-umber text-linen font-sans text-xs uppercase tracking-widest hover:bg-moss transition-colors duration-300">
          Start a Return <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
