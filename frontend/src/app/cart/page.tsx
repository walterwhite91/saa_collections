"use client";

import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, X } from "lucide-react";
import productsData from "@/data/products.json";

interface CartItem {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  quantity: number;
  size?: string;
}

export default function CartPage() {
  const cartItems: CartItem[] = [
    { ...productsData.dresses[0], quantity: 1, size: "S" },
    { ...productsData.skincare[0], quantity: 2 }
  ];

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="font-display text-4xl md:text-5xl text-moss mb-12 text-center">
        Shopping Bag
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Cart Items */}
        <div className="lg:col-span-8">
          <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-moss/10 font-sans text-xs tracking-widest uppercase text-moss">
            <div className="col-span-6">Product</div>
            <div className="col-span-3 text-center">Quantity</div>
            <div className="col-span-3 text-right">Total</div>
          </div>

          <div className="divide-y divide-moss/10">
            {cartItems.map((item, idx) => (
              <div key={idx} className="py-8 flex flex-col md:grid md:grid-cols-12 gap-4 items-start md:items-center">
                
                <div className="col-span-6 flex gap-6 w-full">
                  <Link href={`/products/${item.slug}`} className="relative w-24 aspect-[3/4] bg-parchment shrink-0">
                    <Image src={`/images/${item.image}`} alt={item.name} fill className="object-cover" />
                  </Link>
                  <div className="flex flex-col justify-center">
                    <span className="font-sans text-xs uppercase tracking-widest text-mushroom mb-1">{item.category}</span>
                    <Link href={`/products/${item.slug}`} className="font-display text-lg text-moss hover:text-umber transition-colors mb-1">
                      {item.name}
                    </Link>
                    {item.size && (
                      <span className="font-sans text-xs text-moss/70 mb-2">Size: {item.size}</span>
                    )}
                    <button className="text-left font-sans text-xs text-umber underline hover:text-moss transition-colors w-max mt-auto">
                      Remove
                    </button>
                  </div>
                </div>

                <div className="col-span-3 flex justify-start md:justify-center w-full mt-4 md:mt-0">
                  <div className="flex items-center border border-moss/20 px-3 py-1">
                    <button className="p-1 text-moss hover:text-umber"><Minus className="w-3 h-3" /></button>
                    <span className="w-8 text-center font-sans text-sm text-moss">{item.quantity}</span>
                    <button className="p-1 text-moss hover:text-umber"><Plus className="w-3 h-3" /></button>
                  </div>
                </div>

                <div className="col-span-3 w-full text-left md:text-right font-sans text-sm text-moss mt-4 md:mt-0">
                  NPR {(item.price * item.quantity).toLocaleString()}
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-4">
          <div className="bg-parchment p-8">
            <h2 className="font-display text-2xl text-moss mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6 font-sans text-sm text-moss border-b border-moss/10 pb-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>NPR {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-moss/70">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
            </div>
            
            <div className="flex justify-between font-display text-xl text-moss mb-8">
              <span>Total</span>
              <span>NPR {subtotal.toLocaleString()}</span>
            </div>

            <Link href="/checkout" className="block w-full text-center bg-moss text-linen font-sans text-xs uppercase tracking-widest py-4 hover:bg-umber transition-colors mb-4">
              Proceed to Checkout
            </Link>
            
            <p className="font-sans text-xs text-center text-moss/70 leading-relaxed">
              Taxes and shipping calculated at checkout.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
