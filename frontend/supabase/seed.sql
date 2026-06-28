-- ========================================
-- SAA Collection — Seed Data
-- Seeds categories, products, and gift sets from existing products.json
-- ========================================

-- Categories
INSERT INTO public.categories (slug, name, description, sort_order) VALUES
  ('dresses', 'Dresses', 'Romantic silhouettes for photoshoots, special moments, and feminine daily wear.', 1),
  ('jewelry', 'Jewelry', 'Delicate handcrafted pieces inspired by nature and Himalayan beauty.', 2),
  ('skincare', 'Skincare', 'Botanical formulas crafted from pure, natural ingredients for radiant skin.', 3),
  ('accessories', 'Accessories', 'Finishing touches that complete the SAA look — from hair ribbons to handmade bags.', 4);

-- Dresses
INSERT INTO public.products (slug, name, category_id, price, description, image, colors, sizes, featured, best_seller) VALUES
  ('wildflower-prairie-dress', 'Wildflower Prairie Dress',
    (SELECT id FROM public.categories WHERE slug = 'dresses'),
    6900,
    'A romantic cottagecore dress designed for women who want to feel soft, beautiful, and connected to nature. The structured corset creates a flattering silhouette while the flowing prairie skirt adds movement and grace.',
    'design-4-wildflower-prairie-model.png',
    ARRAY['#F5EDD8', '#8FA88A', '#C9907E'],
    ARRAY['XS', 'S', 'M', 'L', 'XL'],
    true, true),

  ('himalayan-forest-maiden', 'Himalayan Forest Maiden',
    (SELECT id FROM public.categories WHERE slug = 'dresses'),
    7900,
    'A timeless Renaissance milkmaid dress with off-shoulder sleeves, lace-up corset and a romantic flowing silhouette.',
    'design-5-medieval-forest-model.png',
    ARRAY['#EADEC9', '#3A5940', '#6B2737'],
    ARRAY['XS', 'S', 'M', 'L', 'XL'],
    true, false),

  ('midnight-forest-queen', 'Midnight Forest Queen',
    (SELECT id FROM public.categories WHERE slug = 'dresses'),
    11900,
    'Inspired by moonlit forests, ancient castles, dark fairies, and timeless feminine power.',
    'design-10-midnight-queen-model.png',
    ARRAY['#1A1A1A', '#1B4332', '#4A0E1A'],
    ARRAY['XS', 'S', 'M', 'L', 'XL'],
    true, false),

  ('himalayan-forest-fairy', 'Himalayan Forest Fairy',
    (SELECT id FROM public.categories WHERE slug = 'dresses'),
    12900,
    'SAA''s most magical creation — a signature fairy gown inspired by Himalayan forest spirits and enchanted meadows.',
    'design-14-himalayan-fairy-model.png',
    ARRAY['#7D9E8C', '#E8D5B0', '#D4A5A0'],
    ARRAY['XS', 'S', 'M', 'L', 'XL'],
    true, true);

-- Jewelry
INSERT INTO public.products (slug, name, category_id, price, description, image, featured) VALUES
  ('pearl-drop-necklace', 'Pearl Drop Necklace',
    (SELECT id FROM public.categories WHERE slug = 'jewelry'),
    1250, 'Minimal elegance for everyday beauty.', 'pearl_necklace.png', true),

  ('pearl-hoop-earrings', 'Pearl Hoop Earrings',
    (SELECT id FROM public.categories WHERE slug = 'jewelry'),
    1150, 'Classic hoops with a graceful pearl drop.', 'earring.png', false),

  ('floral-pendant-set', 'Floral Pendant Set',
    (SELECT id FROM public.categories WHERE slug = 'jewelry'),
    1350, 'Inspired by wildflowers and warm afternoons.', 'woman wearing necklace.png', true),

  ('gold-leaf-bangle', 'Gold Leaf Bangle',
    (SELECT id FROM public.categories WHERE slug = 'jewelry'),
    1450, 'A reminder of nature''s fine details.', 'pearl_necklace.png', false);

-- Skincare
INSERT INTO public.products (slug, name, category_id, price, description, image, featured) VALUES
  ('himalayan-glow-serum', 'Himalayan Glow Serum',
    (SELECT id FROM public.categories WHERE slug = 'skincare'),
    1250, 'Nourish. Brighten. Glow.', 'glow_serum.png', true),

  ('rose-hydrating-cream', 'Rose Hydrating Cream',
    (SELECT id FROM public.categories WHERE slug = 'skincare'),
    1450, 'Deep hydration for soft, radiant skin.', 'Rose_moisturizer.png', false),

  ('botanical-face-oil', 'Botanical Face Oil',
    (SELECT id FROM public.categories WHERE slug = 'skincare'),
    1350, 'Nourish deeply. Glow naturally.', 'glow_serum.png', true),

  ('natural-lip-tint', 'Natural Lip Tint',
    (SELECT id FROM public.categories WHERE slug = 'skincare'),
    750, 'Subtle tint. Natural shine.', 'glow_serum.png', false);

-- Accessories
INSERT INTO public.products (slug, name, category_id, price, description, image, featured) VALUES
  ('fairycore-hair-ribbon', 'Fairycore Hair Ribbon',
    (SELECT id FROM public.categories WHERE slug = 'accessories'),
    450, 'Soft ribbon for romantic braids.', 'hair_accessory.png', true),

  ('pearl-hair-comb', 'Pearl Hair Comb',
    (SELECT id FROM public.categories WHERE slug = 'accessories'),
    850, 'Elegant comb with natural pearls.', 'hair_accessory.png', false),

  ('handmade-mini-bag', 'Handmade Mini Bag',
    (SELECT id FROM public.categories WHERE slug = 'accessories'),
    2450, 'A perfect little companion.', 'hair_accessory.png', true),

  ('silk-scarf', 'Silk Scarf',
    (SELECT id FROM public.categories WHERE slug = 'accessories'),
    1150, 'Luxurious soft silk for any occasion.', 'hair_accessory.png', false);

-- Gift Sets
INSERT INTO public.gift_sets (name, description, price, image, includes, is_active) VALUES
  ('The Dreamer''s Set',
    'Pearl Drop Necklace + Himalayan Glow Serum — a perfect pairing of elegance and radiance.',
    2300, 'pearl_necklace.png',
    ARRAY['Pearl Drop Necklace', 'Himalayan Glow Serum', 'Gift wrapping'],
    true),

  ('Himalayan Glow Bundle',
    'Our complete skincare ritual — cleanse, nourish, and glow with pure botanical ingredients.',
    3050, 'glow_serum.png',
    ARRAY['Himalayan Glow Serum', 'Rose Hydrating Cream', 'Botanical Face Oil', 'Gift wrapping'],
    true),

  ('The Romance Set',
    'Fairycore Hair Ribbon + Floral Pendant Set — for women who love romantic, delicate details.',
    1600, 'hair_accessory.png',
    ARRAY['Fairycore Hair Ribbon', 'Floral Pendant Set', 'Handwritten card'],
    true);
