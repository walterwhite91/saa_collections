-- ========================================
-- SAA Collection — Row Level Security Policies
-- ========================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gift_sets ENABLE ROW LEVEL SECURITY;

-- ========================================
-- PROFILES
-- Users can only view and update their own profile
-- ========================================
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- ========================================
-- CATEGORIES
-- Public read access
-- ========================================
CREATE POLICY "Anyone can view categories"
  ON public.categories FOR SELECT
  TO anon, authenticated
  USING (true);

-- ========================================
-- PRODUCTS
-- Public read access
-- ========================================
CREATE POLICY "Anyone can view products"
  ON public.products FOR SELECT
  TO anon, authenticated
  USING (true);

-- ========================================
-- ADDRESSES
-- Users can only manage their own addresses
-- ========================================
CREATE POLICY "Users can view own addresses"
  ON public.addresses FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own addresses"
  ON public.addresses FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own addresses"
  ON public.addresses FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own addresses"
  ON public.addresses FOR DELETE
  USING (auth.uid() = user_id);

-- ========================================
-- CART ITEMS
-- Users can only manage their own cart
-- ========================================
CREATE POLICY "Users can view own cart"
  ON public.cart_items FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can add to own cart"
  ON public.cart_items FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own cart"
  ON public.cart_items FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove from own cart"
  ON public.cart_items FOR DELETE
  USING (auth.uid() = user_id);

-- ========================================
-- WISHLISTS
-- Users can only manage their own wishlist
-- ========================================
CREATE POLICY "Users can view own wishlist"
  ON public.wishlists FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can add to own wishlist"
  ON public.wishlists FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove from own wishlist"
  ON public.wishlists FOR DELETE
  USING (auth.uid() = user_id);

-- ========================================
-- ORDERS
-- Users can view their own orders; insert allowed for creating orders
-- ========================================
CREATE POLICY "Users can view own orders"
  ON public.orders FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create orders"
  ON public.orders FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ========================================
-- ORDER ITEMS
-- Users can view items from their own orders only
-- ========================================
CREATE POLICY "Users can view own order items"
  ON public.order_items FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert order items for own orders"
  ON public.order_items FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );

-- ========================================
-- CONTACT INQUIRIES
-- Anyone can submit (insert), no public read
-- ========================================
CREATE POLICY "Anyone can submit contact inquiry"
  ON public.contact_inquiries FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- ========================================
-- GIFT SETS
-- Public read for active sets only
-- ========================================
CREATE POLICY "Anyone can view active gift sets"
  ON public.gift_sets FOR SELECT
  TO anon, authenticated
  USING (is_active = true);
