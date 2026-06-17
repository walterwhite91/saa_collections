"use client";

import { useStore } from "@/context/StoreContext";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export function CartDrawer() {
  const { cart, isCartOpen, closeCart, updateQuantity, removeFromCart } = useStore();

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Lock body scroll when cart is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isCartOpen]);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-obsidian/40 z-[60] backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-y-0 right-0 w-full max-w-md bg-linen shadow-2xl z-[70] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-moss/10">
              <h2 className="font-display text-2xl text-moss flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" /> Your Cart
              </h2>
              <button
                onClick={closeCart}
                className="p-2 text-moss/60 hover:text-umber transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-moss/50">
                  <ShoppingBag className="w-12 h-12 mb-2 opacity-50" />
                  <p className="font-sans text-sm">Your cart is currently empty.</p>
                  <button
                    onClick={closeCart}
                    className="mt-4 px-8 py-3 border border-moss/20 font-sans text-xs uppercase tracking-widest text-moss hover:bg-umber hover:text-linen hover:border-umber transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <ul className="space-y-6">
                  {cart.map((item) => (
                    <li key={item.id} className="flex gap-4">
                      <Link
                        href={`/products/${item.slug}`}
                        onClick={closeCart}
                        className="relative w-24 aspect-[3/4] bg-parchment shrink-0"
                      >
                        <Image
                          src={`/images/${item.image}`}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </Link>
                      <div className="flex flex-col flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <Link
                            href={`/products/${item.slug}`}
                            onClick={closeCart}
                            className="font-display text-lg text-moss hover:text-umber transition-colors"
                          >
                            {item.name}
                          </Link>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-moss/40 hover:text-umber transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <div className="font-sans text-xs text-moss/60 mb-2 space-y-1">
                          <p>{item.category}</p>
                          {item.size && <p>Size: {item.size}</p>}
                        </div>

                        <div className="mt-auto flex items-center justify-between">
                          <div className="flex items-center border border-moss/20">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1.5 text-moss hover:text-umber transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center font-sans text-xs">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1.5 text-moss hover:text-umber transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <span className="font-sans text-sm text-moss">
                            NPR {(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-6 bg-parchment/50 border-t border-moss/10">
                <div className="flex justify-between items-center mb-6 font-sans">
                  <span className="text-moss">Subtotal</span>
                  <span className="text-lg text-moss font-medium">
                    NPR {subtotal.toLocaleString()}
                  </span>
                </div>
                <p className="font-sans text-[10px] text-moss/60 mb-4 text-center">
                  Shipping & taxes calculated at checkout
                </p>
                <Link
                  href="/cart"
                  onClick={closeCart}
                  className="block w-full text-center py-4 bg-umber text-linen font-sans text-xs uppercase tracking-widest hover:bg-moss transition-colors duration-300"
                >
                  Proceed to Checkout
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
