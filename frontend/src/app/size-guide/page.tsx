import Link from "next/link";
import { Ruler } from "lucide-react";

export const metadata = {
  title: "Size Guide | SAA Collection",
  description: "Find your perfect fit with SAA Collection's comprehensive size guide for dresses and garments.",
};

export default function SizeGuidePage() {
  return (
    <div className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <nav className="font-sans text-xs text-moss/50 mb-8 tracking-wide">
        <Link href="/" className="hover:text-umber transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-moss">Size Guide</span>
      </nav>

      <div className="flex items-center gap-3 mb-6">
        <Ruler className="w-6 h-6 text-umber" />
        <h1 className="font-display text-4xl md:text-5xl text-moss">Size Guide</h1>
      </div>
      <p className="font-sans text-sm text-moss/70 mb-16 max-w-2xl leading-relaxed">
        All measurements are in centimeters. If you&apos;re between sizes, we recommend sizing up for a more comfortable and flattering fit.
      </p>

      {/* Dress Size Chart */}
      <h2 className="font-display text-2xl text-moss mb-6">Dress Measurements</h2>
      <div className="overflow-x-auto mb-16">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-parchment">
              <th className="text-left py-4 px-6 font-display text-sm text-moss border-b border-moss/10">Size</th>
              <th className="text-left py-4 px-6 font-display text-sm text-moss border-b border-moss/10">Bust (cm)</th>
              <th className="text-left py-4 px-6 font-display text-sm text-moss border-b border-moss/10">Waist (cm)</th>
              <th className="text-left py-4 px-6 font-display text-sm text-moss border-b border-moss/10">Hip (cm)</th>
              <th className="text-left py-4 px-6 font-display text-sm text-moss border-b border-moss/10">Length (cm)</th>
            </tr>
          </thead>
          <tbody className="font-sans text-sm text-moss/80">
            {[
              { size: "XS", bust: "78-82", waist: "60-64", hip: "86-90", length: "130" },
              { size: "S", bust: "82-86", waist: "64-68", hip: "90-94", length: "132" },
              { size: "M", bust: "86-90", waist: "68-72", hip: "94-98", length: "134" },
              { size: "L", bust: "90-94", waist: "72-76", hip: "98-102", length: "136" },
              { size: "XL", bust: "94-98", waist: "76-80", hip: "102-106", length: "138" },
              { size: "XXL", bust: "98-102", waist: "80-84", hip: "106-110", length: "140" },
            ].map((row) => (
              <tr key={row.size} className="border-b border-moss/5 hover:bg-parchment/30 transition-colors">
                <td className="py-4 px-6 font-medium text-moss">{row.size}</td>
                <td className="py-4 px-6">{row.bust}</td>
                <td className="py-4 px-6">{row.waist}</td>
                <td className="py-4 px-6">{row.hip}</td>
                <td className="py-4 px-6">{row.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* How to Measure */}
      <h2 className="font-display text-2xl text-moss mb-8">How to Measure</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {[
          { title: "Bust", desc: "Measure around the fullest part of your bust, keeping the tape straight across the back." },
          { title: "Waist", desc: "Measure around the narrowest part of your natural waist, usually just above the belly button." },
          { title: "Hip", desc: "Measure around the fullest part of your hips, about 20cm below the waist." },
        ].map((m, i) => (
          <div key={i} className="bg-parchment border border-moss/10 p-6 rounded-sm">
            <h3 className="font-display text-lg text-moss mb-3">{m.title}</h3>
            <p className="font-sans text-sm text-moss/80 leading-relaxed">{m.desc}</p>
          </div>
        ))}
      </div>

      {/* Tips */}
      <div className="bg-parchment border border-moss/10 p-8 rounded-sm">
        <h3 className="font-display text-xl text-moss mb-4">Fitting Tips</h3>
        <ul className="space-y-3 font-sans text-sm text-moss/80 leading-relaxed">
          <li>• Wear lightweight clothing or undergarments when measuring for the most accurate results.</li>
          <li>• Keep the measuring tape snug but not tight — you should be able to slip a finger between the tape and your body.</li>
          <li>• Our corset-style dresses have adjustable lacing, offering flexibility of 2-4cm on the bust and waist measurements.</li>
          <li>• If you&apos;re between two sizes, we recommend sizing up for comfort. Our flowing silhouettes drape beautifully even with a slightly looser fit.</li>
          <li>• Still unsure? <Link href="/contact" className="text-umber hover:underline">Contact our team</Link> — we&apos;re happy to help you find the perfect size.</li>
        </ul>
      </div>
    </div>
  );
}
