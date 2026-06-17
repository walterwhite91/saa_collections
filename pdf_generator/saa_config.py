# Specific Data Configuration for SAA Collection Review PDFs

# Define color palette (in RGB)
# SAA Collection Brand Colors
SAA_COLORS = {
    "primary": (43, 76, 63),      # #2B4C3F (Primary Dark Green)
    "secondary": (140, 98, 57),    # #8C6239 (Accent Warm Brown)
    "bg": (250, 246, 240),         # #FAF6F0 (Background Cream / Linen)
    "text": (80, 80, 80),          # Muted slate/grey for descriptions
    "muted": (120, 120, 120)       # Light grey for footers & continuations
}

# Desktop Screenshots
DESKTOP_ITEMS = [
    {
        "file": "Home_Landing Page.png",
        "title": "1. Homepage & Campaign Hero Section",
        "desc": "The homepage features a full-bleed campaign background image representing the SAA Collection aesthetic. The tagline and call-to-actions are aligned with spacing optimizations to guarantee text readability and prevent layout overlaps."
    },
    {
        "file": "Navbar_Shop Dropdown.png",
        "title": "2. Header Navigation Dropdown Menu",
        "desc": "The desktop mega-menu dropdown under 'Shop'. Organizes the collection categories (Dresses, Jewelry, Skincare, Accessories, Curated Essentials) and brand information sections with refined spacing and clean typography."
    },
    {
        "file": "Best Sellers.png",
        "title": "3. Best Sellers Collection Page",
        "desc": "Displays top-selling items dynamically filtered by the bestSeller flag. All product cards utilize the new reusable ProductCard client component featuring active Heart toggle states for the wishlist."
    },
    {
        "file": "New Arrivals.png",
        "title": "4. New Arrivals Collection Page",
        "desc": "Highlights newly released items with a customized 'New' badge overlaid on the top left of the product cards."
    },
    {
        "file": "Cart.png",
        "title": "5. Interactive Shopping Cart View",
        "desc": "Full shopping cart page showing detailed item lists, quantities, prices, and summaries. Works in tandem with the newly built slide-out Cart Drawer."
    },
    {
        "file": "Collection Page.png",
        "title": "6. Collections Dynamic Filtering Route",
        "desc": "The collection page dynamically pre-rendered via Next.js generateStaticParams. Implements robust filtering, custom descriptions, and cohesive layout patterns."
    },
    {
        "file": "Screenshot 2026-06-17 at 16-35-26 Dresses SAA Collection.png",
        "title": "7. Dresses Category Collection",
        "desc": "Filtered view of all dresses with clean product imagery and responsive grid sizing."
    },
    {
        "file": "Screenshot 2026-06-17 at 16-35-34 Jewelry SAA Collection.png",
        "title": "8. Handcrafted Jewelry Category Collection",
        "desc": "Delicate accessory category displaying custom jewelry pieces with natural and organic designs."
    },
    {
        "file": "Screenshot 2026-06-17 at 16-35-42 Skincare SAA Collection.png",
        "title": "9. Botanical Skincare Category Collection",
        "desc": "Pure skincare collection utilizing botanical formulas crafted from natural Himalayan ingredients."
    },
    {
        "file": "Screenshot 2026-06-17 at 16-35-49 Accessories SAA Collection.png",
        "title": "10. Accessories Category Collection",
        "desc": "Features miscellaneous styling items including hair ribbons and artisan handmade bags."
    },
    {
        "file": "Screenshot 2026-06-17 at 16-35-58 Curated Essentials SAA Collection.png",
        "title": "11. Essentials Combined Collection",
        "desc": "Curated collection grouping accessories, skincare, and jewelry into a unified overview. Renamed from 'Curated Essentials' to 'Essentials' to optimize Navbar alignment."
    },
    {
        "file": "Screenshot 2026-06-17 at 16-36-13 Handmade Details SAA Collection.png",
        "title": "12. Handmade Craftsmanship Story",
        "desc": "An editorial page detailing the artisan process, source fabrics, and cultural connection of SAA products."
    },
    {
        "file": "Screenshot 2026-06-17 at 16-36-25 SAA Collection Fairycore dreams Nepali soul.png",
        "title": "13. Product Detail Page & Zoom Panel",
        "desc": "Detailed product page displaying sizes, description, product actions, and interactive hover-zoom functionality."
    },
    {
        "file": "Screenshot 2026-06-17 at 16-36-42 Our Story SAA Collection.png",
        "title": "14. Our Story (About Page)",
        "desc": "Brand origin narrative detailing the vision of blending Nepalese heritage with romantic fairycore aesthetics."
    },
    {
        "file": "Screenshot 2026-06-17 at 16-36-54 Fairycore Dresses SAA Collection.png",
        "title": "15. Theme: Fairycore Dresses Collection",
        "desc": "Ethereal gowns inspired by folklore, magical landscapes, and soft silhouettes."
    },
    {
        "file": "Screenshot 2026-06-17 at 16-36-59 Himalayan Forest Collection SAA Collection.png",
        "title": "16. Theme: Himalayan Forest Collection",
        "desc": "Earthy tone garments designed with focus on the quiet strength and mystique of the Himalayas."
    },
    {
        "file": "Screenshot 2026-06-17 at 16-37-06 Event Wear SAA Collection.png",
        "title": "17. Theme: Event Wear",
        "desc": "Curated selection of elegant gowns and dresses intended for celebrations, outdoor gatherings, and parties."
    },
    {
        "file": "Screenshot 2026-06-17 at 16-37-14 Photoshoot Pieces SAA Collection.png",
        "title": "18. Theme: Photoshoot Pieces",
        "desc": "Statement editorial garments that photograph beautifully in natural, outdoor lighting."
    },
    {
        "file": "Screenshot 2026-06-17 at 16-37-22 Natural Beauty Essentials SAA Collection.png",
        "title": "19. Theme: Natural Beauty Essentials",
        "desc": "A themed collection emphasizing the botanical skincare line and light cosmetics."
    },
    {
        "file": "Screenshot 2026-06-17 at 16-37-29 Gift Sets SAA Collection.png",
        "title": "20. Curated Gift Sets Page",
        "desc": "Pre-packaged beauty and accessory bundles designed for special gifting occasions."
    },
    {
        "file": "Screenshot 2026-06-17 at 16-37-42 SAA Collection Fairycore dreams Nepali soul.png",
        "title": "21. Account Dashboard Profile Page",
        "desc": "Customer dashboard panel prompting order status check, saved wishlist access, and settings update."
    },
    {
        "file": "Screenshot 2026-06-17 at 16-38-02 SAA Collection Fairycore dreams Nepali soul.png",
        "title": "22. Authentication Portal (Login / Register)",
        "desc": "A unified tabbed register and login dialog utilizing smooth transition animations."
    },
    {
        "file": "Screenshot 2026-06-17 at 16-38-10 Shipping Information SAA Collection.png",
        "title": "23. Shipping Information Page",
        "desc": "Comprehensive page highlighting delivery timelines, rates, and shipping regions."
    },
    {
        "file": "Screenshot 2026-06-17 at 16-38-19 Returns & Refunds SAA Collection.png",
        "title": "24. Returns & Refunds Policy Page",
        "desc": "Step-by-step instructions on item return eligibility, timing constraints, and refund methods."
    },
    {
        "file": "Screenshot 2026-06-17 at 16-38-27 Size Guide SAA Collection.png",
        "title": "25. Interactive Size Guide",
        "desc": "Detailed sizing grids covering XS-XL dimensions for dresses with explicit measurement instructions."
    },
    {
        "file": "Screenshot 2026-06-17 at 16-38-41 Terms of Service SAA Collection.png",
        "title": "26. Legal Documentation: Terms of Service",
        "desc": "Formal customer agreements, usage conditions, and merchant liability policy."
    },
    {
        "file": "Screenshot 2026-06-17 at 16-38-53 Privacy Policy SAA Collection.png",
        "title": "27. Legal Documentation: Privacy Policy",
        "desc": "Details regarding customer personal data collection, encryption, and secure checkout practices."
    }
]

# Mobile Screenshots
MOBILE_ITEMS = [
    {
        "file": "Screenshot 2026-06-17 at 16-39-49 SAA Collection Fairycore dreams Nepali soul.png",
        "title": "1. Mobile Homepage Hero",
        "desc": "Responsive layout featuring the main logo positioned nicely at the top header. Typography has been scaled down and shifted upwards for optimal display on small touchscreens."
    },
    {
        "file": "CART.png",
        "title": "2. Mobile Slide-Out Cart Drawer",
        "desc": "A right-sliding panel adjusted for mobile width. Users can easily update quantity, view pricing, and check out with intuitive thumb-friendly controls."
    },
    {
        "file": "Screenshot 2026-06-17 at 16-40-16 Dresses SAA Collection.png",
        "title": "3. Mobile Dresses Collection",
        "desc": "Single or two-column grid listing with high-resolution imagery and easy cart access."
    },
    {
        "file": "Screenshot 2026-06-17 at 16-40-27 Jewelry SAA Collection.png",
        "title": "4. Mobile Jewelry Collection",
        "desc": "A detailed layout highlighting earrings, necklaces, and jewelry items in a clean responsive stack."
    },
    {
        "file": "Screenshot 2026-06-17 at 16-40-39 Skincare SAA Collection.png",
        "title": "5. Mobile Botanical Skincare Page",
        "desc": "Responsive grid for botanical items containing prices, descriptions, and wishlist integration."
    },
    {
        "file": "Screenshot 2026-06-17 at 16-40-55 Accessories SAA Collection.png",
        "title": "6. Mobile Accessories Collection",
        "desc": "Scrollable accessories display showing ribbons and handmade bags for easy viewing on mobile."
    },
    {
        "file": "Screenshot 2026-06-17 at 16-41-06 Curated Essentials SAA Collection.png",
        "title": "7. Mobile Essentials Page",
        "desc": "Responsive grouped view of skincare and jewelry, optimized with horizontal spacing to ensure quick category scans."
    },
    {
        "file": "Screenshot 2026-06-17 at 16-41-12 SAA Collection Fairycore dreams Nepali soul.png",
        "title": "8. Mobile Handmade Craftsmanship Page",
        "desc": "The story section details stacked sequentially with alternating image-text sections optimized for continuous vertical scrolling."
    },
    {
        "file": "Screenshot 2026-06-17 at 16-41-24 SAA Collection Fairycore dreams Nepali soul.png",
        "title": "9. Mobile Product Detail Page",
        "desc": "Clean spacing for the product page layout. The gallery controls and purchase buttons are stacked cleanly below the product title."
    },
    {
        "file": "Screenshot 2026-06-17 at 16-41-38 Our Story SAA Collection.png",
        "title": "10. Mobile Our Story (About Page)",
        "desc": "The brand story is rendered with comfortable font scaling and a central banner image to preserve page readability."
    },
    {
        "file": "Screenshot 2026-06-17 at 16-41-51 SAA Collection Fairycore dreams Nepali soul.png",
        "title": "11. Mobile Account Dashboard",
        "desc": "Simplified dashboard layout displaying order summaries and customer info cards stacked vertically."
    },
    {
        "file": "Screenshot 2026-06-17 at 16-42-18 SAA Collection Fairycore dreams Nepali soul.png",
        "title": "12. Mobile Login Page",
        "desc": "Log-in text input fields scaled to 100% width for simple entry on virtual keypads."
    },
    {
        "file": "Screenshot 2026-06-17 at 16-42-29 SAA Collection Fairycore dreams Nepali soul.png",
        "title": "13. Mobile Registration Page",
        "desc": "Secure registration form with input fields adjusted for finger tap targets."
    },
    {
        "file": "Screenshot 2026-06-17 at 16-43-00 Shipping Information SAA Collection.png",
        "title": "14. Mobile Shipping Info Page",
        "desc": "Polished text layout showing domestic and international delivery times."
    },
    {
        "file": "Screenshot 2026-06-17 at 16-43-09 Returns & Refunds SAA Collection.png",
        "title": "15. Mobile Returns Information",
        "desc": "Interactive toggle items and clear steps outlining how to dispatch package returns."
    },
    {
        "file": "Screenshot 2026-06-17 at 16-43-19 Size Guide SAA Collection.png",
        "title": "16. Mobile Size Guide Table",
        "desc": "Sizing measurements table designed with responsive scroll wrappers to prevent content from cutting off."
    },
    {
        "file": "Screenshot 2026-06-17 at 16-43-40 SAA Collection Fairycore dreams Nepali soul.png",
        "title": "17. Mobile Legal Documentation Page",
        "desc": "Compact legal text columns formatted for relaxed reading on phone screens."
    }
]
