"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

export interface CartItem {
  id: string;
  productId: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  size?: string;
  quantity: number;
  category: string;
}

interface StoreContextType {
  cart: CartItem[];
  isCartOpen: boolean;
  wishlist: string[]; // product IDs
  addToCart: (item: Omit<CartItem, "id">) => Promise<void>;
  removeFromCart: (id: string) => Promise<void>;
  updateQuantity: (id: string, quantity: number) => Promise<void>;
  openCart: () => void;
  closeCart: () => void;
  toggleWishlist: (productId: string) => Promise<void>;
  isInWishlist: (productId: string) => boolean;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  
  const { isAuthenticated, user, isLoading } = useAuth();

  // Load from local storage or API
  useEffect(() => {
    let mounted = true;

    if (isLoading) return; // Wait for auth state

    const loadStore = async () => {
      if (isAuthenticated) {
        try {
          // Fetch from API
          const [cartRes, wishlistRes] = await Promise.all([
            fetch("/api/cart"),
            fetch("/api/wishlist"),
          ]);
          
          if (cartRes.ok && mounted) {
            const { items } = await cartRes.json();
            const mappedCart = items.map((item: any) => ({
              id: item.id,
              productId: item.product.id,
              slug: item.product.slug,
              name: item.product.name,
              price: item.product.price,
              image: item.product.image,
              size: item.size || undefined,
              quantity: item.quantity,
              category: item.product.category?.name || "Unknown",
            }));
            setCart(mappedCart);
          }
          
          if (wishlistRes.ok && mounted) {
            const { items } = await wishlistRes.json();
            setWishlist(items.map((item: any) => item.product_id));
          }
          
        } catch (e) {
          console.error("Failed to load store data from API", e);
        }
      } else {
        // Load from local storage
        try {
          const savedCart = localStorage.getItem("saa_cart");
          const savedWishlist = localStorage.getItem("saa_wishlist");
          if (savedCart && mounted) setCart(JSON.parse(savedCart));
          if (savedWishlist && mounted) setWishlist(JSON.parse(savedWishlist));
        } catch (e) {
          console.error("Failed to load store data", e);
        }
      }
      if (mounted) setIsInitialized(true);
    };

    loadStore();

    return () => {
      mounted = false;
    };
  }, [isAuthenticated, isLoading]);

  // Sync to local storage if not authenticated
  useEffect(() => {
    if (isInitialized && !isAuthenticated) {
      localStorage.setItem("saa_cart", JSON.stringify(cart));
      localStorage.setItem("saa_wishlist", JSON.stringify(wishlist));
    }
  }, [cart, wishlist, isInitialized, isAuthenticated]);

  // Merge logic triggered on login
  useEffect(() => {
    const mergeGuestData = async () => {
      if (isAuthenticated && isInitialized) {
        const savedCart = localStorage.getItem("saa_cart");
        if (savedCart) {
          try {
            const parsedCart = JSON.parse(savedCart);
            if (parsedCart.length > 0) {
              const res = await fetch("/api/cart/merge", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  items: parsedCart.map((c: any) => ({
                    productId: c.productId,
                    size: c.size,
                    quantity: c.quantity,
                  }))
                })
              });
              
              if (res.ok) {
                const { items } = await res.json();
                const mappedCart = items.map((item: any) => ({
                  id: item.id,
                  productId: item.product.id,
                  slug: item.product.slug,
                  name: item.product.name,
                  price: item.product.price,
                  image: item.product.image,
                  size: item.size || undefined,
                  quantity: item.quantity,
                  category: item.product.category?.name || "Unknown",
                }));
                setCart(mappedCart);
              }
            }
          } catch (e) {
            console.error("Failed to merge cart", e);
          } finally {
            localStorage.removeItem("saa_cart");
          }
        }

        const savedWishlist = localStorage.getItem("saa_wishlist");
        if (savedWishlist) {
          try {
            const parsedWishlist = JSON.parse(savedWishlist);
            for (const productId of parsedWishlist) {
              await fetch("/api/wishlist", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ productId })
              });
            }
            // After merge, fetch latest wishlist
            const wlRes = await fetch("/api/wishlist");
            if (wlRes.ok) {
               const { items } = await wlRes.json();
               setWishlist(items.map((item: any) => item.product_id));
            }
          } catch (e) {
            console.error("Failed to merge wishlist", e);
          } finally {
            localStorage.removeItem("saa_wishlist");
          }
        }
      }
    };
    
    mergeGuestData();
  }, [isAuthenticated, isInitialized]);

  const addToCart = async (item: Omit<CartItem, "id">) => {
    if (isAuthenticated) {
      try {
        const res = await fetch("/api/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            productId: item.productId,
            size: item.size,
            quantity: item.quantity,
          }),
        });
        
        if (res.ok) {
          const { item: savedItem } = await res.json();
          const newItem = {
            id: savedItem.id,
            productId: savedItem.product.id,
            slug: savedItem.product.slug,
            name: savedItem.product.name,
            price: savedItem.product.price,
            image: savedItem.product.image,
            size: savedItem.size || undefined,
            quantity: savedItem.quantity,
            category: savedItem.product.category?.name || "Unknown",
          };
          
          setCart((prev) => {
            const exists = prev.find((i) => i.id === newItem.id || (i.productId === newItem.productId && i.size === newItem.size));
            if (exists) {
              return prev.map((i) => i.id === exists.id ? newItem : i);
            }
            return [newItem, ...prev];
          });
        }
      } catch (e) {
        console.error("Failed to add to cart API", e);
      }
    } else {
      setCart((prev) => {
        const existingItem = prev.find(
          (i) => i.productId === item.productId && i.size === item.size
        );
        if (existingItem) {
          return prev.map((i) =>
            i.id === existingItem.id
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          );
        }
        return [...prev, { ...item, id: Math.random().toString(36).substring(2, 11) }];
      });
    }
    setIsCartOpen(true);
  };

  const removeFromCart = async (id: string) => {
    if (isAuthenticated) {
      const item = cart.find(i => i.id === id);
      if (item && item.id) {
        try {
          await fetch(`/api/cart/${item.id}`, { method: "DELETE" });
        } catch (e) {
          console.error("Failed to delete cart item", e);
        }
      }
    }
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = async (id: string, quantity: number) => {
    if (quantity < 1) return;
    
    if (isAuthenticated) {
      try {
        const res = await fetch(`/api/cart/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quantity }),
        });
        if (!res.ok) return;
      } catch (e) {
        console.error("Failed to update cart item", e);
        return;
      }
    }
    
    setCart((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity } : i))
    );
  };

  const toggleWishlist = async (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );

    if (isAuthenticated) {
      try {
        await fetch("/api/wishlist", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId })
        });
      } catch (e) {
        console.error("Failed to toggle wishlist", e);
      }
    }
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  return (
    <StoreContext.Provider
      value={{
        cart,
        isCartOpen,
        wishlist,
        addToCart,
        removeFromCart,
        updateQuantity,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        toggleWishlist,
        isInWishlist,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
}
