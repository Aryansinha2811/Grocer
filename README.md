# Grocer Platform — Revised Architecture (v2)
**Two-App System: Customer App & Merchant Dashboard**

This revision consolidates the original component list into fewer, grouped files (related UI pieces that always render together are merged into one file) and locks in a Zepto/Blinkit/Instamart-style visual language using your existing `index.css` tokens.

---

## Design Direction — Quick Commerce Look

Reference apps: **Blinkit, Zepto, Swiggy Instamart**. Shared traits we're adopting:
- Tight, card-based grids (2–3 products per row on mobile)
- Bold, high-contrast CTA buttons with rounded-full shape
- Sticky top header with location + search always visible
- Delivery-time badge ("8 mins") as a recurring visual anchor
- Minimal borders — separation via background tone + shadow, not lines
- Category icons in circular chips on Home

### Color Scheme (from your `index.css`)

| Token | Value | Usage |
|---|---|---|
| `--brand-primary` | `#FF451D` | Primary CTA buttons, active states, price highlights, badges |
| `--brand-secondary` | `#FF8A22` | Secondary accents, hover glows, offer tags, gradient end |
| `--brand-dark-accent` | `#0D0E12` | Headings, nav text, footer background, dashboard sidebar |
| `--gradient-primary` | `#f83600 → #f9d423` | Hero banners, promo cards, "Express delivery" badges |
| `--gradient-dark` | `#434343 → #000000` | Merchant dashboard headers, premium/CTA sections |

**Fonts:** `Logo` (logo wordmark only), `Paragraph` (body text), `Button` (all button labels — gives that punchy quick-commerce button feel).

**Component classes already defined:**
- `.btn-gradient-primary` → main CTAs (Add to Cart, Place Order, Checkout)
- `.btn-gradient-dark` → secondary/merchant-side CTAs (Login, Export, Settings)

**New tokens worth adding to `index.css`:**
```css
--surface-light: #FFFFFF;
--surface-muted: #F6F6F8;
--text-secondary: #6B7280;
--success: #1DBE5C;      /* order delivered, in-stock */
--warning: #FFB800;      /* low stock, delayed order */
--border-soft: #EDEDED;
```

---

## Project 1 — `grocer-customer` (Customer App)

**Purpose:** Browse kirana-listed products, cart, checkout, track delivery.

### Pages → Components (consolidated)

| Page | Components |
|---|---|
| Home | `HomeSections` (HeroBanner, CategoryGrid, ProductCarousel) |
| Product Listing `/category/:id` | `ListingLayout` (FilterSidebar, ProductGrid) |
| Product Detail `/product/:id` | `ProductDetailSections` (ImageViewer, ProductInfo, ReviewsList) |
| Cart | `CartView` (CartItemRow, CartSummary) |
| Checkout | `CheckoutFlow` (AddressForm, PaymentOptions, OrderReviewSummary) |
| Order Tracking `/order/:id` | `OrderTracking` (OrderStatusStepper, RiderMap) |
| Auth | `PhoneOTPForm` |
| Profile | `ProfileSections` (OrderHistoryList, ProfileEditForm) |

### Consolidated File Structure

```
grocer-customer/
  src/
    assets/ (icons/, images/, fonts/)
    components/
      common/
        Header.tsx          // logo, location selector, search, cart icon
        Footer.tsx
        ProductCard.tsx      // reused everywhere a product tile appears
        UIKit.tsx            // Button, Loader, EmptyState — small, shared, no reason to split
      home/
        HomeSections.tsx     // HeroBanner + CategoryGrid + ProductCarousel
      listing/
        ListingLayout.tsx    // FilterSidebar + ProductGrid
      product/
        ProductDetailSections.tsx  // ImageViewer + ProductInfo + ReviewsList
      cart/
        CartView.tsx         // CartItemRow + CartSummary
      checkout/
        CheckoutFlow.tsx     // AddressForm + PaymentOptions + OrderReviewSummary
      order/
        OrderTracking.tsx    // OrderStatusStepper + RiderMap
      auth/
        PhoneOTPForm.tsx
      profile/
        ProfileSections.tsx  // OrderHistoryList + ProfileEditForm
    pages/
      HomePage.tsx
      ProductListingPage.tsx
      ProductDetailPage.tsx
      CartPage.tsx
      CheckoutPage.tsx
      OrderTrackingPage.tsx
      AuthPage.tsx
      ProfilePage.tsx
    hooks/
      useCart.ts
      useAuth.ts
    lib/
      api.ts          // connects to api.zerodaycrew.dpdns.org
      constants.ts
    types/
      index.ts         // Product, Order, User interfaces
    App.tsx
    main.tsx
    index.css
```

**File count:** 9 component files (was ~18 individual files) — same UI surface, grouped by the screen they belong to.

### What each consolidated file contains

- **`Header.tsx`** — sticky top bar: logo (Logo font), location pin + selector, search input, cart icon with item-count badge. Background `--surface-light`, shadow on scroll.
- **`Footer.tsx`** — links, socials, copyright. Uses `--brand-dark-accent` background.
- **`ProductCard.tsx`** — image, name, price, delivery-time chip, quick "Add" button (`.btn-gradient-primary`, small/pill variant). Used in Home carousel, Listing grid, and search results.
- **`UIKit.tsx`** — `Button` (wraps `.btn-gradient-primary` / `.btn-gradient-dark` variants), `Loader` (skeleton shimmer, Blinkit-style), `EmptyState` (icon + message, e.g. "Your cart is empty").
- **`HomeSections.tsx`** — `HeroBanner` (1-Day vs Express toggle, uses `--gradient-primary`), `CategoryGrid` (circular icon chips), `ProductCarousel` (horizontal scroll of `ProductCard`s grouped by "Deals", "Fresh Picks" etc.).
- **`ListingLayout.tsx`** — `FilterSidebar` (price, category, brand filters — collapsible on mobile) + `ProductGrid` (2–3 column grid of `ProductCard`).
- **`ProductDetailSections.tsx`** — `ProductImageViewer` (swipeable gallery), `ProductInfo` (name, price, qty stepper, Add to Cart CTA), `ReviewsList`.
- **`CartView.tsx`** — `CartItemRow` (per-item qty controls) + `CartSummary` (subtotal, delivery fee, total, Checkout CTA).
- **`CheckoutFlow.tsx`** — `AddressForm`, `PaymentOptions` (UPI/Card/COD), `OrderReviewSummary` — rendered as steps within one flow component.
- **`OrderTracking.tsx`** — `OrderStatusStepper` (Placed → Packed → Out for delivery → Delivered) + `RiderMap` (live location).
- **`PhoneOTPForm.tsx`** — phone input → OTP input, resend timer. Kept standalone since auth logic/validation is dense enough to deserve its own file.
- **`ProfileSections.tsx`** — `OrderHistoryList` + `ProfileEditForm` (name, address book, saved payment methods).

---

## Project 2 — `grocer-merchant` (Store Dashboard)

**Purpose:** Kirana owner login, inventory, POS billing, order fulfillment, plus the public landing/marketing page.

### Pages → Components (consolidated)

| Page | Components |
|---|---|
| Landing (public) | `LandingSections` (MerchantHero, CommissionComparator, StaffOptimizerPreview, CTASignupBanner) |
| Auth | `AuthForms` (ShopRegistrationForm, LoginForm) |
| Dashboard (Home) | `DashboardOverview` (StatsOverview, RecentOrdersTable, SalesChart) |
| Inventory | `InventoryManager` (ProductTable, AddEditProductModal, BulkUploadButton) |
| POS / Billing | `POSWorkspace` (BarcodeSearchInput, BillCart, BillSummary) |
| Orders | `OrdersPanel` (IncomingOrdersList, OrderDetailCard) |
| Staff Scheduler (deferred) | `DeliverySlotCalendar` |

### Consolidated File Structure

```
grocer-merchant/
  src/
    assets/ (icons/, images/, fonts/)
    components/
      common/
        Sidebar.tsx        // dashboard nav
        TopBar.tsx         // merchant name, logout
        UIKit.tsx          // Table, Modal, Button, Loader
      landing/
        LandingSections.tsx   // MerchantHero + CommissionComparator + StaffOptimizerPreview + CTASignupBanner
      auth/
        AuthForms.tsx         // ShopRegistrationForm + LoginForm
      dashboard/
        DashboardOverview.tsx // StatsOverview + RecentOrdersTable + SalesChart
      inventory/
        InventoryManager.tsx  // ProductTable + AddEditProductModal + BulkUploadButton
      pos/
        POSWorkspace.tsx      // BarcodeSearchInput + BillCart + BillSummary
      orders/
        OrdersPanel.tsx       // IncomingOrdersList + OrderDetailCard
      staff/
        DeliverySlotCalendar.tsx   // deferred, kept standalone
    pages/
      LandingPage.tsx
      AuthPage.tsx
      DashboardPage.tsx
      InventoryPage.tsx
      POSPage.tsx
      OrdersPage.tsx
      StaffSchedulerPage.tsx
    hooks/
      useAuth.ts
      useInventory.ts
    lib/
      api.ts            // connects to api.zerodaycrew.dpdns.org
      calculations.ts    // commission comparator formulas
    types/
      index.ts            // Product, Order, Merchant interfaces
    App.tsx
    main.tsx
    index.css
```

**File count:** 8 component files (was ~16).

### What each consolidated file contains

- **`Sidebar.tsx`** — nav icons + labels (Dashboard, Inventory, POS, Orders), `--brand-dark-accent` background, active item highlighted with `--brand-primary`.
- **`TopBar.tsx`** — merchant/shop name, logout, notification bell.
- **`UIKit.tsx`** — `Table` (generic sortable table used by Inventory/Orders), `Modal`, `Button`, `Loader`.
- **`LandingSections.tsx`** — `MerchantHero` (`.btn-gradient-primary` CTA "Start Selling"), `CommissionComparator` (interactive slider/table vs other platforms), `StaffOptimizerPreview` (teaser card), `CTASignupBanner`.
- **`AuthForms.tsx`** — `ShopRegistrationForm` (multi-step: shop details → documents → bank info) + `LoginForm`.
- **`DashboardOverview.tsx`** — `StatsOverview` (today's sales, orders, low-stock count as stat cards), `RecentOrdersTable`, `SalesChart` (Recharts, line/bar using `--brand-primary`/`--brand-secondary`).
- **`InventoryManager.tsx`** — `ProductTable` (stock, price, status), `AddEditProductModal`, `BulkUploadButton` (CSV import).
- **`POSWorkspace.tsx`** — `BarcodeSearchInput`, `BillCart` (running bill), `BillSummary` (total, print/share receipt).
- **`OrdersPanel.tsx`** — `IncomingOrdersList` (new online orders queue) + `OrderDetailCard` (accept/reject/mark ready).
- **`DeliverySlotCalendar.tsx`** — staff/delivery slot calendar, deferred feature, kept isolated so it's easy to drop in later without touching other files.

---

## Summary

| | Grocer (Customer) | Grocer Merchant |
|---|---|---|
| Component files | 9 (down from ~18) | 8 (down from ~16) |
| Users | Shoppers | Kirana store owners |
| Core feature | Browse + buy | Inventory + POS + fulfillment |
| Auth | OTP login | Merchant login + shop registration |
| Entry page | Home (storefront) | Landing (SaaS pitch) |
| Visual style | Blinkit/Zepto/Instamart — bold gradients, rounded CTAs, card grids | Same brand colors, dashboard layout (Sidebar + TopBar) |
| Backend | Shared API — `api.zerodaycrew.dpdns.org` | Shared API — `api.zerodaycrew.dpdns.org` |

**Backend note (carried over):** API docs at `api.zerodaycrew.dpdns.org/api-docs` were unreachable at last check. Once accessible, align `lib/api.ts` and `types/index.ts` in both projects exactly to the documented endpoint shapes and field names.
