"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, User, Heart, ShoppingBag, Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { BrandLogo } from "@/components/layout/Logo";
import { useStore } from "@/context/StoreContext";
import productsData from "@/data/products.json";

export function Navbar() {
  const { cart, wishlist, openCart } = useStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const allProducts = [
    ...productsData.dresses,
    ...productsData.jewelry,
    ...productsData.skincare,
    ...productsData.accessories
  ];

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-obsidian text-linen text-xs text-center py-2 font-sans tracking-widest uppercase">
        Enjoy free shipping on all orders
      </div>

      {/* Main Navbar */}
      <header
        className={`sticky top-0 z-50 transition-colors duration-300 ${
          isScrolled || megaMenuOpen ? "bg-linen shadow-sm" : "bg-transparent"
        }`}
        onMouseLeave={() => setMegaMenuOpen(false)}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Mobile Left: Hamburger */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="text-moss p-2 -ml-2"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>

            {/* Logo */}
            <div className="flex-shrink-0 flex items-center justify-center lg:justify-start w-full lg:w-auto absolute lg:relative left-0 pointer-events-none lg:pointer-events-auto">
              <Link href="/" className="pointer-events-auto">
                <BrandLogo />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-8 items-center font-sans text-sm tracking-wide text-moss">
              <div 
                className="relative py-8 cursor-pointer group flex items-center gap-1"
                onMouseEnter={() => setMegaMenuOpen(true)}
              >
                <span className="hover:text-umber transition-colors">Shop</span>
                <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
              </div>
              <Link href="/collections/dresses" className="hover:text-umber transition-colors py-8">Dresses</Link>
              <Link href="/collections/jewelry" className="hover:text-umber transition-colors py-8">Jewelry</Link>
              <Link href="/collections/skincare" className="hover:text-umber transition-colors py-8">Skincare</Link>
              <Link href="/collections/accessories" className="hover:text-umber transition-colors py-8">Accessories</Link>
              <Link href="/collections/essentials" className="hover:text-umber transition-colors py-8">Essentials</Link>
              <Link href="/sustainability" className="hover:text-umber transition-colors py-8">Sustainability</Link>
            </nav>

            {/* Right Icons */}
            <div className="flex items-center space-x-4 lg:space-x-6 text-moss">
              <button onClick={() => setIsSearchOpen(true)} className="hover:text-umber transition-colors p-1 hidden lg:block">
                <Search className="w-5 h-5" />
              </button>
              <Link href="/account" className="hover:text-umber transition-colors p-1 hidden lg:block">
                <User className="w-5 h-5" />
              </Link>
              <Link href="/wishlist" className="hover:text-umber transition-colors p-1 relative">
                <Heart className="w-5 h-5" fill={wishlist.length > 0 ? "currentColor" : "none"} />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-umber text-linen text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-sans">
                    {wishlist.length}
                  </span>
                )}
              </Link>
              <button onClick={openCart} className="hover:text-umber transition-colors p-1 relative">
                <ShoppingBag className="w-5 h-5" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-umber text-linen text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-sans">
                    {cart.reduce((total, item) => total + item.quantity, 0)}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mega Menu Overlay */}
        <AnimatePresence>
          {megaMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 w-full bg-linen border-t border-moss/10 shadow-lg hidden lg:block overflow-hidden"
              onMouseEnter={() => setMegaMenuOpen(true)}
              onMouseLeave={() => setMegaMenuOpen(false)}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-12 gap-8">
                  {/* Link Columns */}
                  <div className="col-span-7 grid grid-cols-3 gap-8">
                    <div>
                      <h4 className="font-display text-lg text-umber mb-4">Shop</h4>
                      <ul className="space-y-3 font-sans text-sm text-moss/80">
                        <li><Link href="/shop" className="hover:text-moss transition-colors">Shop All</Link></li>
                        <li><Link href="/new" className="hover:text-moss transition-colors">New Arrivals</Link></li>
                        <li><Link href="/bestsellers" className="hover:text-moss transition-colors">Best Sellers</Link></li>
                        <li><Link href="/collections/dresses" className="hover:text-moss transition-colors">Dresses</Link></li>
                        <li><Link href="/collections/jewelry" className="hover:text-moss transition-colors">Jewelry</Link></li>
                        <li><Link href="/collections/skincare" className="hover:text-moss transition-colors">Skincare</Link></li>
                        <li><Link href="/collections/accessories" className="hover:text-moss transition-colors">Accessories</Link></li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-display text-lg text-umber mb-4">Featured</h4>
                      <ul className="space-y-3 font-sans text-sm text-moss/80">
                        <li><Link href="/collections/fairy" className="hover:text-moss transition-colors">Fairycore Dresses</Link></li>
                        <li><Link href="/collections/himalayan" className="hover:text-moss transition-colors">Himalayan Forest Collection</Link></li>
                        <li><Link href="/collections/events" className="hover:text-moss transition-colors">Event Wear</Link></li>
                        <li><Link href="/collections/photoshoot" className="hover:text-moss transition-colors">Photoshoot Pieces</Link></li>
                        <li><Link href="/collections/beauty" className="hover:text-moss transition-colors">Natural Beauty Essentials</Link></li>
                        <li><Link href="/gifts" className="hover:text-moss transition-colors">Gift Sets</Link></li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-display text-lg text-umber mb-4">More</h4>
                      <ul className="space-y-3 font-sans text-sm text-moss/80">
                        <li><Link href="/collections/essentials" className="hover:text-moss transition-colors">Essentials</Link></li>
                        <li><Link href="/handmade" className="hover:text-moss transition-colors">Handmade Details</Link></li>
                        <li><Link href="/sustainability" className="hover:text-moss transition-colors">Sustainability</Link></li>
                        <li><Link href="/about" className="hover:text-moss transition-colors">Brand Story</Link></li>
                      </ul>
                    </div>
                  </div>
                  
                  {/* Image Cards */}
                  <div className="col-span-5 grid grid-cols-2 gap-6">
                    <Link href="/collections/dresses" className="group block relative aspect-[3/4] overflow-hidden bg-parchment rounded-sm">
                      <Image 
                        src="/images/design-4-wildflower-prairie-full.png" 
                        alt="Dress Collection" 
                        fill 
                        sizes="(max-width: 1200px) 250px, 20vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-obsidian/10 group-hover:bg-obsidian/0 transition-colors duration-500" />
                      <div className="absolute bottom-6 left-6 text-linen">
                        <span className="font-display text-xl block mb-1">Dress Collection</span>
                        <span className="font-sans text-xs tracking-widest uppercase">Explore</span>
                      </div>
                    </Link>
                    <Link href="/collections/jewelry" className="group block relative aspect-[3/4] overflow-hidden bg-parchment rounded-sm">
                      <Image 
                        src="/images/pearl_necklace.png" 
                        alt="Natural Beauty" 
                        fill 
                        sizes="(max-width: 1200px) 250px, 20vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-obsidian/10 group-hover:bg-obsidian/0 transition-colors duration-500" />
                      <div className="absolute bottom-6 left-6 text-linen">
                        <span className="font-display text-xl block mb-1">Jewelry & Beauty</span>
                        <span className="font-sans text-xs tracking-widest uppercase">Explore</span>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-linen flex flex-col overflow-y-auto"
          >
            <div className="flex justify-between items-center p-4 border-b border-moss/10">
              <BrandLogo className="w-36 h-10" />
              <button onClick={() => setMobileMenuOpen(false)} className="text-moss p-2">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-4 bg-obsidian text-linen text-xs text-center font-sans tracking-widest uppercase">
              Enjoy free shipping on all orders
            </div>

            <nav className="flex-1 px-6 py-8 flex flex-col space-y-6 font-display text-2xl text-moss">
              {/* Search box on top of dresses */}
              <div className="mb-2">
                <button
                  onClick={() => { setIsSearchOpen(true); setMobileMenuOpen(false); }}
                  className="w-full flex items-center gap-3 px-4 py-3 bg-parchment/65 border border-moss/10 rounded-sm text-left hover:border-moss/30 transition-colors"
                >
                  <Search className="w-5 h-5 text-moss/50" />
                  <span className="font-sans text-xs uppercase tracking-widest text-moss/50">
                    Search SAA...
                  </span>
                </button>
              </div>

              <Link href="/collections/dresses" onClick={() => setMobileMenuOpen(false)}>Dresses</Link>
              <Link href="/collections/jewelry" onClick={() => setMobileMenuOpen(false)}>Jewelry</Link>
              <Link href="/collections/skincare" onClick={() => setMobileMenuOpen(false)}>Skincare</Link>
              <Link href="/collections/accessories" onClick={() => setMobileMenuOpen(false)}>Accessories</Link>
              <Link href="/collections/essentials" onClick={() => setMobileMenuOpen(false)}>Essentials</Link>
              <Link href="/sustainability" onClick={() => setMobileMenuOpen(false)}>Sustainability</Link>
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
              
              <div className="pt-8 mt-8 border-t border-moss/10 flex flex-col space-y-4 text-lg">
                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>Login / Create Account</Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsSearchOpen(false);
                setSearchQuery("");
              }}
              className="fixed inset-0 bg-obsidian/40 z-[60] backdrop-blur-sm"
            />

            {/* Search Panel */}
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
              className="fixed top-0 inset-x-0 bg-linen shadow-xl z-[70] border-b border-moss/10"
            >
              <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="flex items-center justify-between gap-4 border-b border-moss/20 pb-4 mb-6">
                  <Search className="w-6 h-6 text-moss/60 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for dresses, jewelry, skincare..."
                    autoFocus
                    className="w-full bg-transparent border-none text-xl font-sans text-moss placeholder-moss/45 focus:outline-none"
                  />
                  <button
                    onClick={() => {
                      setIsSearchOpen(false);
                      setSearchQuery("");
                    }}
                    className="p-2 text-moss/60 hover:text-umber transition-colors shrink-0"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Results list */}
                {searchQuery && (
                  <div className="max-h-[60vh] overflow-y-auto divide-y divide-moss/5">
                    {allProducts
                      .filter((p) =>
                        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        p.description.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                      .slice(0, 5)
                      .map((product) => (
                        <Link
                          key={product.id}
                          href={`/products/${product.slug}`}
                          onClick={() => {
                            setIsSearchOpen(false);
                            setSearchQuery("");
                          }}
                          className="flex items-center gap-4 py-4 hover:bg-parchment/30 px-3 rounded transition-colors group"
                        >
                          <div className="relative w-16 h-20 bg-parchment shrink-0 overflow-hidden rounded-sm">
                            <Image
                              src={`/images/${product.image}`}
                              alt={product.name}
                              fill
                              sizes="64px"
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <span className="text-[10px] uppercase tracking-widest text-mushroom font-sans block mb-0.5">
                              {product.category}
                            </span>
                            <h4 className="font-display text-lg text-moss group-hover:text-umber transition-colors">
                              {product.name}
                            </h4>
                          </div>
                          <div className="font-sans text-sm text-moss">
                            NPR {product.price.toLocaleString()}
                          </div>
                        </Link>
                      ))}

                    {allProducts.filter((p) =>
                      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      p.description.toLowerCase().includes(searchQuery.toLowerCase())
                    ).length === 0 && (
                      <div className="py-8 text-center text-moss/50 font-sans text-sm">
                        No products found matching &ldquo;{searchQuery}&rdquo;
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
