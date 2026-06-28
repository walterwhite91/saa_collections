"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Package, Heart, MapPin, LogOut, Settings } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";

interface ProfileData {
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  email: string;
}

interface OrderData {
  id: string;
  order_number: string;
  status: string;
  total: number;
  created_at: string;
  order_items: { id: string; product_name: string; quantity: number }[];
}

export default function AccountPage() {
  const { user, isAuthenticated, isLoading, signOut } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (!isAuthenticated && !isLoading) return;
    if (!isAuthenticated) return;

    const fetchData = async () => {
      try {
        const [profileRes, ordersRes] = await Promise.all([
          fetch("/api/user/profile"),
          fetch("/api/orders"),
        ]);

        if (profileRes.ok) {
          const profileData = await profileRes.json();
          setProfile(profileData.profile);
        }

        if (ordersRes.ok) {
          const ordersData = await ordersRes.json();
          setOrders(ordersData.orders || []);
        }
      } catch (error) {
        console.error("Failed to fetch account data", error);
      } finally {
        setLoadingData(false);
      }
    };

    fetchData();
  }, [isAuthenticated, isLoading]);

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  if (isLoading) {
    return (
      <div className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="font-sans text-sm text-moss/60">Loading...</p>
      </div>
    );
  }

  // Not logged in — show login prompt
  if (!isAuthenticated) {
    return (
      <div className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="font-sans text-xs text-moss/50 mb-8 tracking-wide">
          <Link href="/" className="hover:text-umber transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-moss">Account</span>
        </nav>

        <h1 className="font-display text-4xl md:text-5xl text-moss mb-4">My Account</h1>
        <p className="font-sans text-sm text-moss/70 mb-12">Manage your orders, wishlist, and personal details.</p>

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
      </div>
    );
  }

  // Logged in — show dashboard
  return (
    <div className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <nav className="font-sans text-xs text-moss/50 mb-8 tracking-wide">
        <Link href="/" className="hover:text-umber transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-moss">Account</span>
      </nav>

      <div className="flex items-center justify-between mb-12">
        <div>
          <h1 className="font-display text-4xl md:text-5xl text-moss mb-2">
            Welcome{profile?.first_name ? `, ${profile.first_name}` : ""}
          </h1>
          <p className="font-sans text-sm text-moss/70">{user?.email}</p>
        </div>
        <button
          onClick={handleSignOut}
          className="flex items-center gap-2 px-6 py-3 border border-moss/20 font-sans text-xs uppercase tracking-widest text-moss hover:bg-umber hover:text-linen hover:border-umber transition-colors"
        >
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
        {[
          { icon: <Package className="w-5 h-5 text-umber" />, title: "Order History", desc: `${orders.length} order${orders.length !== 1 ? "s" : ""}`, href: "#orders" },
          { icon: <Heart className="w-5 h-5 text-umber" />, title: "Wishlist", desc: "Items you've saved for later", href: "/wishlist" },
          { icon: <MapPin className="w-5 h-5 text-umber" />, title: "Addresses", desc: "Manage your shipping addresses", href: "#addresses" },
          { icon: <Settings className="w-5 h-5 text-umber" />, title: "Account Settings", desc: "Update your profile details", href: "#profile" },
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

      {/* Recent Orders */}
      <section id="orders" className="mb-16">
        <h2 className="font-display text-2xl text-moss mb-8">Recent Orders</h2>
        {loadingData ? (
          <p className="font-sans text-sm text-moss/60">Loading orders...</p>
        ) : orders.length === 0 ? (
          <div className="bg-parchment border border-moss/10 p-8 text-center rounded-sm">
            <Package className="w-8 h-8 text-mushroom mx-auto mb-4" />
            <p className="font-sans text-sm text-moss/70 mb-4">You haven&apos;t placed any orders yet.</p>
            <Link href="/shop" className="inline-block px-8 py-3 bg-umber text-linen font-sans text-xs uppercase tracking-widest hover:bg-moss transition-colors">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.slice(0, 5).map((order) => (
              <div key={order.id} className="border border-moss/10 p-6 rounded-sm">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="font-sans text-xs text-moss/50">Order</span>
                    <span className="font-sans text-sm text-moss font-medium ml-2">{order.order_number}</span>
                  </div>
                  <span className={`font-sans text-xs uppercase tracking-widest px-3 py-1 rounded-full ${
                    order.status === "delivered"
                      ? "bg-emerald-50 text-emerald-700"
                      : order.status === "cancelled"
                      ? "bg-red-50 text-red-700"
                      : "bg-parchment text-moss"
                  }`}>
                    {order.status}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="font-sans text-xs text-moss/60">
                    {new Date(order.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                    {" · "}
                    {order.order_items?.length || 0} item{(order.order_items?.length || 0) !== 1 ? "s" : ""}
                  </p>
                  <span className="font-sans text-sm text-moss">NPR {order.total.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
