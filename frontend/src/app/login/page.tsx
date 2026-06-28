"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

function LoginForm() {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const { signIn, signUp, resetPassword } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/account";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    try {
      if (showForgotPassword) {
        const result = await resetPassword(form.email);
        if (result.error) {
          setError(result.error);
        } else {
          setMessage("If an account exists with this email, a reset link has been sent.");
        }
      } else if (isRegister) {
        const result = await signUp(form.email, form.password, form.firstName, form.lastName);
        if (result.error) {
          setError(result.error);
        } else {
          setMessage(result.message || "Account created! Check your email.");
        }
      } else {
        const result = await signIn(form.email, form.password);
        if (result.error) {
          setError(result.error);
        } else {
          router.push(redirect);
        }
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <nav className="font-sans text-xs text-moss/50 mb-8 tracking-wide">
        <Link href="/" className="hover:text-umber transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-moss">
          {showForgotPassword ? "Reset Password" : isRegister ? "Create Account" : "Login"}
        </span>
      </nav>

      <div className="text-center mb-12">
        <h1 className="font-display text-4xl text-moss mb-4">
          {showForgotPassword
            ? "Reset Password"
            : isRegister
            ? "Create Account"
            : "Welcome Back"}
        </h1>
        <p className="font-sans text-sm text-moss/70">
          {showForgotPassword
            ? "Enter your email and we'll send you a reset link."
            : isRegister
            ? "Join the SAA Circle for exclusive access and personalized recommendations."
            : "Sign in to your SAA Collection account."}
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 font-sans text-sm rounded-sm">
          {error}
        </div>
      )}

      {message && (
        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 font-sans text-sm rounded-sm">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 mb-8">
        {isRegister && !showForgotPassword && (
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="First Name"
              value={form.firstName}
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
              required
              className="w-full bg-transparent border border-moss/20 py-3 px-4 font-sans text-sm text-moss placeholder:text-moss/40 focus:outline-none focus:border-umber transition-colors rounded-sm"
            />
            <input
              type="text"
              placeholder="Last Name"
              value={form.lastName}
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              required
              className="w-full bg-transparent border border-moss/20 py-3 px-4 font-sans text-sm text-moss placeholder:text-moss/40 focus:outline-none focus:border-umber transition-colors rounded-sm"
            />
          </div>
        )}

        <input
          type="email"
          placeholder="Email Address"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          className="w-full bg-transparent border border-moss/20 py-3 px-4 font-sans text-sm text-moss placeholder:text-moss/40 focus:outline-none focus:border-umber transition-colors rounded-sm"
        />

        {!showForgotPassword && (
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
            minLength={6}
            className="w-full bg-transparent border border-moss/20 py-3 px-4 font-sans text-sm text-moss placeholder:text-moss/40 focus:outline-none focus:border-umber transition-colors rounded-sm"
          />
        )}

        {!isRegister && !showForgotPassword && (
          <div className="text-right">
            <button
              type="button"
              onClick={() => { setShowForgotPassword(true); setError(null); setMessage(null); }}
              className="font-sans text-xs text-umber hover:text-moss transition-colors"
            >
              Forgot Password?
            </button>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-umber text-linen font-sans text-xs uppercase tracking-widest hover:bg-moss transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading
            ? "Please wait..."
            : showForgotPassword
            ? "Send Reset Link"
            : isRegister
            ? "Create Account"
            : "Sign In"}
        </button>
      </form>

      <div className="text-center">
        {showForgotPassword ? (
          <p className="font-sans text-sm text-moss/70">
            Remember your password?
            <button
              onClick={() => { setShowForgotPassword(false); setError(null); setMessage(null); }}
              className="ml-2 text-umber hover:text-moss transition-colors font-medium"
            >
              Sign In
            </button>
          </p>
        ) : (
          <p className="font-sans text-sm text-moss/70">
            {isRegister ? "Already have an account?" : "Don't have an account?"}
            <button
              onClick={() => { setIsRegister(!isRegister); setError(null); setMessage(null); }}
              className="ml-2 text-umber hover:text-moss transition-colors font-medium"
            >
              {isRegister ? "Sign In" : "Create Account"}
            </button>
          </p>
        )}
      </div>

      {/* Benefits */}
      {isRegister && !showForgotPassword && (
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
    </>
  );
}

export default function LoginPage() {
  return (
    <div className="py-24 max-w-md mx-auto px-4 sm:px-6">
      <Suspense fallback={<div className="text-center py-24 text-moss/60 text-sm">Loading...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
