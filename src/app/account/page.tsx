import Link from "next/link";
import { User, Package, Heart, MapPin, LogOut } from "lucide-react";

export const metadata = {
  title: "My Account | SAA Collection",
  description: "Manage your SAA Collection account — view orders, wishlists, and account settings.",
};

export default function AccountPage() {
  return (
    <div className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <nav className="font-sans text-xs text-moss/50 mb-8 tracking-wide">
        <Link href="/" className="hover:text-umber transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-moss">Account</span>
      </nav>

      <h1 className="font-display text-4xl md:text-5xl text-moss mb-4">My Account</h1>
      <p className="font-sans text-sm text-moss/70 mb-12">Manage your orders, wishlist, and personal details.</p>

      {/* Login Prompt */}
      <div className="bg-parchment border border-moss/10 p-12 text-center rounded-sm mb-12">
        <User className="w-10 h-10 text-umber mx-auto mb-6" />
        <h2 className="font-display text-2xl text-moss mb-4">Welcome to SAA Collection</h2>
        <p className="font-sans text-sm text-moss/70 mb-8 max-w-md mx-auto leading-relaxed">
          Sign in to view your orders, manage your wishlist, and get personalized recommendations.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/login" className="px-10 py-4 bg-umber text-linen font-sans text-xs uppercase tracking-widest hover:bg-moss transition-colors duration-300">
            Sign In
          </Link>
          <Link href="/login" className="px-10 py-4 border border-umber text-umber font-sans text-xs uppercase tracking-widest hover:bg-umber hover:text-linen transition-colors duration-300">
            Create Account
          </Link>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {[
          { icon: <Package className="w-5 h-5 text-umber" />, title: "Order History", desc: "Track and view your past orders", href: "/account" },
          { icon: <Heart className="w-5 h-5 text-umber" />, title: "Wishlist", desc: "Items you've saved for later", href: "/wishlist" },
          { icon: <MapPin className="w-5 h-5 text-umber" />, title: "Addresses", desc: "Manage your shipping addresses", href: "/account" },
          { icon: <LogOut className="w-5 h-5 text-umber" />, title: "Help & Support", desc: "FAQs, shipping, and returns", href: "/faq" },
        ].map((item, i) => (
          <Link key={i} href={item.href} className="flex items-start gap-4 p-6 border border-moss/10 rounded-sm hover:bg-parchment/50 hover:border-umber/20 transition-all duration-300 group">
            <div className="w-10 h-10 rounded-full border border-umber/30 flex items-center justify-center bg-linen shrink-0 group-hover:border-umber transition-colors">
              {item.icon}
            </div>
            <div>
              <h3 className="font-display text-lg text-moss mb-1 group-hover:text-umber transition-colors">{item.title}</h3>
              <p className="font-sans text-xs text-moss/60">{item.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
