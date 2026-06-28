/**
 * Database type definitions for SAA Collection.
 *
 * These types mirror the Supabase database schema.
 * In production, generate these automatically via:
 *   npx supabase gen types typescript --project-id <id> > src/lib/types/database.ts
 */

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refunded";

export interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  sort_order: number;
  created_at: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category_id: string | null;
  price: number;
  description: string | null;
  image: string;
  colors: string[];
  sizes: string[];
  featured: boolean;
  best_seller: boolean;
  is_new: boolean;
  in_stock: boolean;
  stock_quantity: number;
  created_at: string;
  updated_at: string;
}

export interface ProductWithCategory extends Product {
  category: Category | null;
}

export interface Address {
  id: string;
  user_id: string;
  label: string;
  full_name: string;
  phone: string | null;
  street_line1: string;
  street_line2: string | null;
  city: string;
  state: string | null;
  postal_code: string | null;
  country: string;
  is_default: boolean;
  created_at: string;
}

export interface CartItem {
  id: string;
  user_id: string;
  product_id: string;
  size: string | null;
  quantity: number;
  created_at: string;
}

export interface CartItemWithProduct extends CartItem {
  product: Product;
}

export interface WishlistItem {
  id: string;
  user_id: string;
  product_id: string;
  created_at: string;
}

export interface WishlistItemWithProduct extends WishlistItem {
  product: Product;
}

export interface Order {
  id: string;
  order_number: string;
  user_id: string | null;
  email: string;
  status: OrderStatus;
  subtotal: number;
  shipping_cost: number;
  tax: number;
  total: number;
  shipping_address: Record<string, string> | null;
  billing_address: Record<string, string> | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string | null;
  product_name: string;
  product_image: string | null;
  size: string | null;
  quantity: number;
  unit_price: number;
  total_price: number;
}

export interface OrderWithItems extends Order {
  order_items: OrderItem[];
}

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  order_number: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface GiftSet {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image: string | null;
  includes: string[];
  is_active: boolean;
  created_at: string;
}
