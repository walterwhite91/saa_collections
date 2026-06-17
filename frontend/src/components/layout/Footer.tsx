import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-obsidian text-linen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-16">
          {/* Shop Column */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-6 text-umber">Shop</h3>
            <ul className="space-y-4 font-sans text-sm text-linen/80">
              <li><Link href="/collections/dresses" className="hover:text-linen transition-colors">Dresses</Link></li>
              <li><Link href="/collections/jewelry" className="hover:text-linen transition-colors">Jewelry</Link></li>
              <li><Link href="/collections/skincare" className="hover:text-linen transition-colors">Skincare</Link></li>
              <li><Link href="/collections/accessories" className="hover:text-linen transition-colors">Accessories</Link></li>
              <li><Link href="/collections/essentials" className="hover:text-linen transition-colors">Curated Essentials</Link></li>
            </ul>
          </div>

          {/* About Column */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-6 text-umber">About</h3>
            <ul className="space-y-4 font-sans text-sm text-linen/80">
              <li><Link href="/about" className="hover:text-linen transition-colors">Brand Story</Link></li>
              <li><Link href="/sustainability" className="hover:text-linen transition-colors">Sustainability</Link></li>
              <li><Link href="/contact" className="hover:text-linen transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Help Column */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-6 text-umber">Help</h3>
            <ul className="space-y-4 font-sans text-sm text-linen/80">
              <li><Link href="/faq" className="hover:text-linen transition-colors">FAQs</Link></li>
              <li><Link href="/shipping" className="hover:text-linen transition-colors">Shipping</Link></li>
              <li><Link href="/returns" className="hover:text-linen transition-colors">Returns</Link></li>
              <li><Link href="/size-guide" className="hover:text-linen transition-colors">Size Guide</Link></li>
            </ul>
          </div>

          {/* Join the Circle Column */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-6 text-umber">Join the SAA Circle</h3>
            <p className="font-sans text-sm text-linen/80 mb-6 leading-relaxed">
              Receive new collection notes, styling inspiration, and private offers.
            </p>
            <form className="flex flex-col gap-3">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="bg-transparent border-b border-linen/30 text-linen placeholder:text-linen/50 py-2 font-sans text-sm focus:outline-none focus:border-umber transition-colors"
              />
              <button 
                type="submit" 
                className="text-left font-display text-umber hover:text-linen transition-colors mt-2 uppercase tracking-widest text-xs"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 pt-8 border-t border-linen/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-sans text-xs text-linen/50">
            © {new Date().getFullYear()} SAA Collection. All rights reserved.
          </p>
          <div className="flex gap-6 font-sans text-xs text-linen/50">
            <Link href="/terms" className="hover:text-linen transition-colors">Terms of Service</Link>
            <Link href="/privacy" className="hover:text-linen transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
