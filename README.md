# Grocer Platform — Customer App (`grocer-customer`)

A modern, high-performance **Quick Commerce (Zepto/Blinkit/Instamart-style)** web application designed for hyper-local grocery shopping. Users can browse nearby kirana-listed products, manage a dynamic cart, securely checkout, and track express deliveries in real time.

---

## ⚡ Visual Language & Design Direction

This application strictly adopts the fast-paced, high-contrast UI patterns found in leading quick-commerce platforms:
* **Grid Layouts:** Tight, card-based layouts optimized for mobile viewing (2–3 products per row).
* **High-Contrast CTAs:** Fully rounded (`rounded-full`) interactive buttons featuring vibrant brand gradients.
* **Sticky Navigation:** A sticky top header that anchors the user's current location, the universal search bar, and the active shopping cart badge.
* **Micro-Signals:** Frequent use of prominent delivery-time chips (e.g., "8 mins") to convey rapid fulfillment.
* **Elevation over Borders:** Minimal line-borders. Components are structurally isolated using soft shadows and subtle background tone shifts.

### Design System System Tokens

| Token | CSS Variable | Value | Purpose |
| :--- | :--- | :--- | :--- |
| **Brand Primary** | `--brand-primary` | `#FF451D` | Primary CTAs, active states, price points, badges. |
| **Brand Secondary** | `--brand-secondary` | `#FF8A22` | Hover glows, promotional offer tags, gradients. |
| **Dark Accent** | `--brand-dark-accent` | `#0D0E12` | Headings, core body typography, dark wrappers. |
| **Express Gradient** | `--gradient-primary` | `#f83600 → #f9d423` | Hero promotional banners, express delivery badges. |
| **Surface Light** | `--surface-light` | `#FFFFFF` | Core backgrounds, cards, sticky header surfaces. |
| **Surface Muted** | `--surface-muted` | `#F6F6F8` | Sub-sections, layout wrappers, page gutters. |
| **Success State** | `--success` | `#1DBE5C` | Items in-stock, successful checkout indicators. |

---

## 📁 Consolidated File Structure

The frontend components are systematically grouped together by page context to minimize context-switching during development and scale predictably.

```text
grocer-customer/
├── src/
│   ├── assets/               # Local icons, placeholder images, and fonts
│   ├── components/           # UI Elements (Consolidated by screen context)
│   │   ├── common/
│   │   │   ├── Header.tsx    # Sticky bar: Logo, location pin, search, cart trigger
│   │   │   ├── Footer.tsx    # Context links with --brand-dark-accent surface
│   │   │   ├── ProductCard.tsx # Standardized grid card with quick "Add" controls
│   │   │   └── UIKit.tsx     # Atomic elements: Button, Loader, EmptyState wrappers
│   │   ├── home/
│   │   │   └── HomeSections.tsx # HeroBanner + CategoryGrid + ProductCarousel
│   │   ├── listing/
│   │   │   └── ListingLayout.tsx # FilterSidebar + ProductGrid
│   │   ├── product/
│   │   │   └── ProductDetailSections.tsx # ImageViewer + ProductInfo + ReviewsList
│   │   ├── cart/
│   │   │   └── CartView.tsx  # Interactive CartItemRows + CartSummary calculations
│   │   ├── checkout/
│   │   │   └── CheckoutFlow.tsx # Single multi-step layout (Address, Payment, Review)
│   │   ├── order/
│   │   │   └── OrderTracking.tsx # Live OrderStatusStepper + RiderMap location
│   │   ├── auth/
│   │   │   └── PhoneOTPForm.tsx # State machine for phone entry and verification loop
│   │   └── profile/
│   │       └── ProfileSections.tsx # Historical Orders + Address Management
│   ├── pages/                # App route wrapper pages mapping strictly to features
│   │   ├── HomePage.tsx
│   │   ├── ProductListingPage.tsx
│   │   ├── ProductDetailPage.tsx
│   │   ├── CartPage.tsx
│   │   ├── CheckoutPage.tsx
│   │   ├── OrderTrackingPage.tsx
│   │   ├── AuthPage.tsx
│   │   └── ProfilePage.tsx
│   ├── hooks/                # Global React hooks
│   │   ├── useCart.ts        # Client-side cart CRUD sync
│   │   └── useAuth.ts        # OTP validation and user token management
│   ├── lib/                  # Service files and utils
│   │   ├── api.ts            # Base API Client wrapping fetch/axios configurations
│   │   └── constants.ts      # Statically configured platform variables
│   ├── types/
│   │   └── index.ts          # Unified TS Interfaces (Product, Order, User)
│   ├── App.tsx               # Client router configuration
│   ├── main.tsx              # React mounting root
│   └── index.css             # Entry stylesheet providing Tailwind/atomic token classes