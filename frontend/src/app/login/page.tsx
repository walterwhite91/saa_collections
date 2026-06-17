"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "" });

  return (
    <div className="py-24 max-w-md mx-auto px-4 sm:px-6">
      <nav className="font-sans text-xs text-moss/50 mb-8 tracking-wide">
        <Link href="/" className="hover:text-umber transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-moss">{isRegister ? "Create Account" : "Login"}</span>
      </nav>

      <div className="text-center mb-12">
        <h1 className="font-display text-4xl text-moss mb-4">
          {isRegister ? "Create Account" : "Welcome Back"}
        </h1>
        <p className="font-sans text-sm text-moss/70">
          {isRegister
            ? "Join the SAA Circle for exclusive access and personalized recommendations."
            : "Sign in to your SAA Collection account."}
        </p>
      </div>

      <form className="space-y-6 mb-8">
        {isRegister && (
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="First Name"
              value={form.firstName}
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
              className="w-full bg-transparent border border-moss/20 py-3 px-4 font-sans text-sm text-moss placeholder:text-moss/40 focus:outline-none focus:border-umber transition-colors rounded-sm"
            />
            <input
              type="text"
              placeholder="Last Name"
              value={form.lastName}
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              className="w-full bg-transparent border border-moss/20 py-3 px-4 font-sans text-sm text-moss placeholder:text-moss/40 focus:outline-none focus:border-umber transition-colors rounded-sm"
            />
          </div>
        )}

        <input
          type="email"
          placeholder="Email Address"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full bg-transparent border border-moss/20 py-3 px-4 font-sans text-sm text-moss placeholder:text-moss/40 focus:outline-none focus:border-umber transition-colors rounded-sm"
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full bg-transparent border border-moss/20 py-3 px-4 font-sans text-sm text-moss placeholder:text-moss/40 focus:outline-none focus:border-umber transition-colors rounded-sm"
        />

        {!isRegister && (
          <div className="text-right">
            <button type="button" className="font-sans text-xs text-umber hover:text-moss transition-colors">
              Forgot Password?
            </button>
          </div>
        )}

        <button
          type="submit"
          className="w-full py-4 bg-umber text-linen font-sans text-xs uppercase tracking-widest hover:bg-moss transition-colors duration-300"
        >
          {isRegister ? "Create Account" : "Sign In"}
        </button>
      </form>

      <div className="text-center">
        <p className="font-sans text-sm text-moss/70">
          {isRegister ? "Already have an account?" : "Don't have an account?"}
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="ml-2 text-umber hover:text-moss transition-colors font-medium"
          >
            {isRegister ? "Sign In" : "Create Account"}
          </button>
        </p>
      </div>

      {/* Benefits */}
      {isRegister && (
        <div className="mt-12 bg-parchment border border-moss/10 p-8 rounded-sm">
          <h3 className="font-display text-lg text-moss mb-4">Benefits of joining SAA</h3>
          <ul className="space-y-3 font-sans text-sm text-moss/80">
            <li>• Early access to new collections</li>
            <li>• Exclusive offers and promotions</li>
            <li>• Save your wishlist and shipping addresses</li>
            <li>• Easy order tracking and history</li>
          </ul>
        </div>
      )}
    </div>
  );
}
