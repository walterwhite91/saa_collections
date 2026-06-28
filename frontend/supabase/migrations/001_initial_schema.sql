-- ========================================
-- SAA Collection — Initial Database Schema
-- ========================================

-- ========================================
-- PROFILES (extends Supabase auth.users)
-- ========================================
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

COMMENT ON TABLE public.profiles IS 'User profile data extending Supabase auth.users';

-- Auto-create profile when a new user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, first_name, last_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'last_name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- ========================================
-- CATEGORIES
-- ========================================
CREATE TABLE public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

COMMENT ON TABLE public.categories IS 'Product categories (Dresses, Jewelry, Skincare, Accessories)';

-- ========================================
-- PRODUCTS
-- ========================================
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  price INTEGER NOT NULL,  -- price in NPR
  description TEXT,
  image TEXT NOT NULL,
  colors TEXT[] DEFAULT '{}',
  sizes TEXT[] DEFAULT '{}',
  featured BOOLEAN DEFAULT false,
  best_seller BOOLEAN DEFAULT false,
  is_new BOOLEAN DEFAULT false,
  in_stock BOOLEAN DEFAULT true,
  stock_quantity INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

COMMENT ON TABLE public.products IS 'Product catalog for SAA Collection';

CREATE INDEX idx_products_category ON public.products(category_id);
CREATE INDEX idx_products_slug ON public.products(slug);
CREATE INDEX idx_products_featured ON public.products(featured) WHERE featured = true;
CREATE INDEX idx_products_best_seller ON public.products(best_seller) WHERE best_seller = true;
CREATE INDEX idx_products_is_new ON public.products(is_new) WHERE is_new = true;

CREATE TRIGGER products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- ========================================
-- ADDRESSES
-- ========================================
CREATE TABLE public.addresses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  label TEXT DEFAULT 'Home',
  full_name TEXT NOT NULL,
  phone TEXT,
  street_line1 TEXT NOT NULL,
  street_line2 TEXT,
  city TEXT NOT NULL,
  state TEXT,
  postal_code TEXT,
  country TEXT DEFAULT 'Nepal',
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

COMMENT ON TABLE public.addresses IS 'User shipping/billing addresses';

CREATE INDEX idx_addresses_user ON public.addresses(user_id);

-- ========================================
-- CART ITEMS (server-persisted for logged-in users)
-- ========================================
CREATE TABLE public.cart_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  size TEXT,
  quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, product_id, size)
);

COMMENT ON TABLE public.cart_items IS 'Shopping cart items for authenticated users';

CREATE INDEX idx_cart_user ON public.cart_items(user_id);

-- ========================================
-- WISHLISTS
-- ========================================
CREATE TABLE public.wishlists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, product_id)
);

COMMENT ON TABLE public.wishlists IS 'User wishlist / saved products';

CREATE INDEX idx_wishlists_user ON public.wishlists(user_id);

-- ========================================
-- ORDERS
-- ========================================
CREATE TYPE order_status AS ENUM (
  'pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'
);

CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number TEXT UNIQUE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  email TEXT NOT NULL,
  status order_status DEFAULT 'pending',
  subtotal INTEGER NOT NULL,
  shipping_cost INTEGER DEFAULT 0,
  tax INTEGER DEFAULT 0,
  total INTEGER NOT NULL,
  shipping_address JSONB,
  billing_address JSONB,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

COMMENT ON TABLE public.orders IS 'Customer orders';

CREATE INDEX idx_orders_user ON public.orders(user_id);
CREATE INDEX idx_orders_number ON public.orders(order_number);
CREATE INDEX idx_orders_status ON public.orders(status);

CREATE TRIGGER orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- ========================================
-- ORDER ITEMS
-- ========================================
CREATE TABLE public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
  product_name TEXT NOT NULL,
  product_image TEXT,
  size TEXT,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  unit_price INTEGER NOT NULL,
  total_price INTEGER NOT NULL
);

COMMENT ON TABLE public.order_items IS 'Line items belonging to an order';

CREATE INDEX idx_order_items_order ON public.order_items(order_id);

-- ========================================
-- CONTACT INQUIRIES
-- ========================================
CREATE TABLE public.contact_inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  order_number TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

COMMENT ON TABLE public.contact_inquiries IS 'Contact form submissions from customers';

-- ========================================
-- GIFT SETS
-- ========================================
CREATE TABLE public.gift_sets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price INTEGER NOT NULL,
  image TEXT,
  includes TEXT[] DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

COMMENT ON TABLE public.gift_sets IS 'Curated gift set bundles';
