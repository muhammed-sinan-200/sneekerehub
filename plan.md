# SneekerHub — React → Next.js Migration Plan

**Scope:** Analysis-only document for incremental migration to **Next.js (App Router) + Tailwind CSS + JavaScript**, preserving current UX and layout. The existing Vite/React app remains untouched until components are ported deliberately.

**Analyzed stack (current):** Vite 7, React 19, React Router DOM 7, Bootstrap 5 + react-bootstrap 2, axios, react-icons.

---

## 1. Architecture Understanding

### 1.1 Project structure

sneekerehub/
├── index.html              # Montserrat font import, root mount
├── vite.config.js          # Default Vite + React plugin (no aliases)
├── public/
│   └── Products.json       # Product catalog (12 items)
├── src/
│   ├── main.jsx            # Entry: Bootstrap CSS, CartProvider, StrictMode
│   ├── App.jsx             # Router, modal state, routes, global modal/footer shell
│   ├── App.css             # Global: Montserrat, smooth scroll
│   ├── index.css           # Empty
│   └── components/
│       ├── CartContext.jsx
│       ├── HomeLayout.jsx
│       ├── NavbarComp.jsx
│       ├── FooterComp.jsx
│       ├── BannerComp.jsx / BannerComp2.jsx
│       ├── NewArrivalsComp.jsx
│       ├── ShopComp.jsx → ShopCorousel.jsx, ShopProducts.jsx
│       ├── AboutComp.jsx
│       ├── ProductModal.jsx
│       ├── CartPage.jsx
│       └── CSS/
│           ├── NavStyle.css
│           ├── NewArrivals.css
│           ├── FooterStyle.css
│           └── AboutStyle.css
```

**Note:** Components reference many static assets under `public/` (`/product-img/`, `/Carousel-img/`, `/about-img/`, `homebanner.webp`, `Banner2.avif`). Only `Products.json` appears in the repo snapshot; verify all image assets are present (or tracked) before migration.

### 1.2 Routing flow

| Path | Component | Notes |
|------|-----------|--------|
| `/` | `HomeLayout` | Hero + new arrivals + secondary banner + copy |
| `/shop` | `ShopComp` | Carousel + full product grid |
| `/about` | `AboutComp` | Three alternating image/text sections |
| `/cartPage` | `CartPage` | Cart + order summary |
| `/contact` | **None** | Linked from `NavbarComp` and `FooterComp` but no route defined |

**Shell layout (not a nested layout route):**

- `NavbarComp` — always above `<Routes>`
- `FooterComp` — always below `<Routes>`
- `ProductModal` — sibling to routes; controlled by `App` state

**Next.js mapping (recommended):**

- `app/layout.jsx` — root layout: font, `CartProvider`, navbar, footer, children
- `app/page.jsx` — home (`HomeLayout` content)
- `app/shop/page.jsx`, `app/about/page.jsx`, `app/cart/page.jsx` (consider renaming `/cartPage` → `/cart` with redirect for parity)
- `app/contact/page.jsx` — placeholder or future page to avoid 404s
- Modal: keep as client overlay in root layout, or use parallel/intercepting routes later (optional; not required for parity)

### 1.3 Component hierarchy

```
CartProvider (main.jsx)
└── App (BrowserRouter)
    ├── NavbarComp
    ├── Routes
    │   ├── / → HomeLayout
    │   │       ├── BannerComp
    │   │       ├── NewArrivalsComp  → axios → Products.json (category === 'new')
    │   │       └── BannerComp2
    │   ├── /about → AboutComp
    │   ├── /shop → ShopComp
    │   │       ├── ShopCorousel
    │   │       └── ShopProducts     → axios → Products.json (all)
    │   └── /cartPage → CartPage
    ├── ProductModal (show/product from App; cart via CartContext)
    └── FooterComp
```

### 1.4 Reusable UI patterns

| Pattern | Where used | Implementation today |
|---------|------------|----------------------|
| **Product card grid** | `NewArrivalsComp`, `ShopProducts` | Nearly duplicate: `Container` + `Row` + `Col xs={6} md={3}` + `Card` + image + title + price + `TbShoppingBagPlus` click → `onProductClick` |
| **Section heading** | New arrivals, shop | `h2`/`h3` + `.new-arrivals` shimmer animation |
| **Hero banner** | `BannerComp`, `BannerComp2` | Full-width div, inline `backgroundImage` gradient + image, centered copy |
| **Sticky chrome** | Navbar, cart summary | `sticky-top` (navbar), `sticky-top` + `top: 90px` on order summary card |
| **Hover affordances** | Nav links, product cards, footer social | Custom CSS classes (`.hover-link`, `.product-card`, `.follow-icons`) |
| **Icons** | Throughout | `react-icons` (Ci, Pi, Tb, Fa, Bs) |

**Migration opportunity (without redesign):** Extract a shared `ProductCard` + `ProductGrid` used by home and shop to avoid duplicating fetch/grid logic in Next.

### 1.5 Bootstrap usage

- **Global CSS:** `bootstrap/dist/css/bootstrap.min.css` imported in `main.jsx` (entire framework loaded).
- **react-bootstrap components by file:**

| File | Components |
|------|------------|
| `NavbarComp.jsx` | `Navbar`, `Nav`, `Container` (subpath imports) |
| `BannerComp.jsx` | `Button`, `Container` |
| `BannerComp2.jsx` | `Container`, `Row`, `Col` |
| `NewArrivalsComp.jsx` | `Container`, `Row`, `Col`, `Card` |
| `ShopProducts.jsx` | `Container`, `Row`, `Col`, `Card` |
| `ShopCorousel.jsx` | `Carousel`, `Carousel.Item` |
| `AboutComp.jsx` | `Container`, `Row`, `Col` |
| `FooterComp.jsx` | `Container`, `Row`, `Col` |
| `ProductModal.jsx` | `Modal`, `Button`, `Row`, `Col`, `Image` |
| `CartPage.jsx` | `Container`, `Row`, `Col`, `Card`, `Button`, `Image` |

**Utility classes used heavily:** `d-flex`, `gap-*`, `text-center`, `fw-bold`, `mb-*`, `py-*`, `border-0`, `rounded-*`, `position-absolute`, `sticky-top`, `order-md-*`, `display-3`, `lead`, Bootstrap grid breakpoints on `Col`.

### 1.6 Responsiveness behavior

- **Navbar:** `expand="lg"` — collapsible hamburger below `lg`; nav links stack in column then row (`flex-column flex-lg-row`).
- **Product grids:** `Col xs={6} sm={6} md={3} lg={3}` — 2 columns on mobile, 4 on `md+`.
- **Product modal:** `Col xs={12} md={6}` — stacked on small screens, side-by-side on `md+`.
- **About page:** `order-1 order-md-2` / `order-2 order-md-1` — image/text order swap on mobile vs desktop.
- **Cart line items:** `flex-wrap`; quantity controls use `mt-3 mt-md-0` to stack on small viewports.
- **Banners:** Fixed viewport heights (`65vh`, `50vh`) with `background-size: cover`.
- **Carousel:** `maxHeight: 545px`, `object-fit: cover`.

Custom CSS augments Bootstrap (nav toggle border removal, card image scale on hover, title shimmer).

### 1.7 State management

| State | Location | Purpose |
|-------|----------|---------|
| `cartItems`, `addToCart`, `decreaseQuantity` | `CartContext` | Source of truth; persisted to `localStorage` key `"cartItems"` |
| `selectedProduct`, `showModal` | `App.jsx` | Opens/closes product modal from home & shop |
| `cart`, `handleAddToCart` | `App.jsx` | **Dead code** — passed to `ProductModal` as `onAddToCart` but modal ignores it; modal uses `CartContext` directly |
| `selectedSize` | `ProductModal` | Required before add; `alert` if missing |
| `products` | `NewArrivalsComp`, `ShopProducts` | Separate `useEffect` + axios fetches (duplicated logic) |

**Cart rules (current behavior):**

- Merge by `product.id` only (not `id` + `selectedSize`) — same shoe, different sizes share one line and one quantity.
- Navbar badge shows `cartItems.length` (line count), not sum of `quantity`.
- Prices in JSON are numeric (e.g. `2899`); UI prefixes `$` without formatting/locale.

### 1.8 Modal / cart / product flow

```
User clicks TbShoppingBagPlus on card
  → onProductClick(product) from HomeLayout or ShopComp
  → App.handleOpenModal sets selectedProduct + showModal
  → ProductModal renders (react-bootstrap Modal)
  → User selects size (toggle buttons)
  → "Add to Cart" → CartContext.addToCart({ ...product, selectedSize })
  → Modal closes; localStorage updated via useEffect
  → Navbar badge updates from cartItems.length
  → /cartPage shows items, +/- quantity, order summary, checkout alert
```

**Data loading:** Client-side `axios.get("/Products.json")` in both product list components (filter `category === 'new'` on home only).

---

## 2. Migration Considerations

### 2.1 Incremental coexistence

Per `.cursorrules`: do not delete the Vite app until migration is complete. Practical approaches:

- **Monorepo / sibling folder:** `next-app/` at repo root while `src/` remains the reference implementation.
- **Branch-based:** migrate on a long-lived branch; compare visually against Vite dev server.
- **Component parity checklist:** route, layout, cart persistence, modal, and responsive breakpoints per page.

### 2.2 Next.js App Router specifics

- **`CartProvider` + `ProductModal` + pages with hooks** → mark `"use client"` where needed; keep server components for static shells when possible.
- **`localStorage`:** Initialize cart state after mount to avoid hydration mismatch (read `cartItems` in `useEffect` or lazy initial state pattern guarded for `typeof window`).
- **Routing:** Replace `react-router-dom` `Link`/`Nav.Link as={Link}` with `next/link`; map `to` → `href`.
- **Images:** Prefer `next/image` for product/carousel/about assets; preserve dimensions/object-fit behavior.
- **Fonts:** Move Montserrat from `index.html` `<style>@import` to `next/font/google` for performance and layout stability.
- **Products.json:** Can remain in `public/` or move to `app/data/` and import statically on server to remove duplicate client fetches (behavior change only if you want SSR product lists).

### 2.3 Styling strategy

- Replace Bootstrap grid/utilities with Tailwind equivalents (see Section 6).
- Port component-scoped CSS (`NavStyle`, `NewArrivals`, `FooterStyle`, `AboutStyle`) to Tailwind + minimal `@layer` or CSS modules only where animations are awkward in utilities (e.g. `.new-arrivals::after` shimmer).
- Drop global Bootstrap CSS import once no component depends on Bootstrap class names.

### 2.4 Dependencies

| Keep / replace | Package |
|----------------|---------|
| Keep | `react-icons`, `axios` (optional: native `fetch`) |
| Remove (after migration) | `bootstrap`, `react-bootstrap` |
| Add | `next`, `tailwindcss`, `postcss`, `autoprefixer` |
| Optional | Headless UI / Radix for accessible modal & mobile nav; Embla for carousel |

### 2.5 UX preservation checklist

- Sticky navbar with shadow and logo height (~70px).
- Orange underline hover on nav links.
- Product card hover: image scale, black border, bag icon darken.
- Section title shimmer on “NEW ARRIVALS” / “SNEEKERS”.
- Modal: size selection required, square buttons, black hover on “Add to Cart”.
- Cart empty state illustration and copy.
- Order summary sticky offset (~90px from top).
- Checkout button hover scale/color (currently inline `onMouseEnter`/`onMouseLeave`).

---

## 3. Risk Areas

| Risk | Severity | Detail |
|------|----------|--------|
| **Hydration vs localStorage** | High | Cart rehydration from `localStorage` on first render can mismatch server HTML. |
| **Dual cart state in App** | Medium | Legacy `cart` / `handleAddToCart` in `App.jsx` confuses migration; remove only when porting `App` to avoid reintroducing bugs. |
| **Cart identity (id vs size)** | Medium | Users may expect separate lines per size; current merge logic must be preserved unless product owner requests change. |
| **Badge count semantics** | Low | Badge = number of lines, not total units; document for QA. |
| **Missing `/contact` route** | Medium | Links already in UI; decide placeholder vs full page before go-live. |
| **Missing static assets in repo** | High | Broken images if `public/` assets not copied to Next `public/`. |
| **Modal at root** | Medium | In App Router, global modal needs client layout; ensure it does not block SSR for static pages. |
| **Bootstrap → Tailwind drift** | Medium | Subtle spacing/color differences if utilities are approximated; use pixel-perfect comparison at `sm/md/lg`. |
| **Carousel behavior** | Medium | react-bootstrap Carousel auto-advance (`interval={3000}`) needs a Tailwind-friendly carousel implementation. |
| **External image URLs** | Low | Logo and empty-cart icon are hotlinked; consider hosting in `public/` for reliability. |
| **Price display** | Low | Large integers shown as `$2899` — preserve formatting behavior. |
| **`alert()` for validation** | Low | Size-not-selected uses `alert`; replace with inline error only if explicitly approved (UX change). |

---

## 4. Suggested Migration Order

Phases minimize cross-cutting breakage and build shared primitives early.

| Phase | Deliverable | Rationale |
|-------|-------------|-----------|
| **0** | Next.js app scaffold, Tailwind, fonts, `public/` assets, env | Foundation without touching Vite app |
| **1** | `CartProvider` (client) + storage hydration fix | Required by navbar, modal, cart |
| **2** | Root layout: Navbar + Footer + children slot | Matches global shell |
| **3** | Shared `ProductCard` / grid (static data first) | DRY for home + shop |
| **4** | `About` page | Mostly static grid; validates Tailwind port of `order-md-*` |
| **5** | Banners (`BannerComp`, `BannerComp2`) | Hero patterns + typography |
| **6** | Home page (`NewArrivals` + layout) | Wires product click callback |
| **7** | `ProductModal` | Depends on cart + click pipeline |
| **8** | Shop page (carousel + products) | Carousel is isolated complexity |
| **9** | `CartPage` | Depends on full cart API |
| **10** | Contact route (stub or full) | Fixes broken links |
| **11** | QA responsive pass + remove Bootstrap | Final parity verification |

---

## 5. Components / Pages to Migrate First

**First (low coupling, high reuse):**

1. `CartContext.jsx` — single source of truth for cart across app.
2. `NavbarComp.jsx` — visible on every page; validates Link + badge + mobile menu.
3. `FooterComp.jsx` — completes chrome; mostly static.

**Next (shared product UI):**

4. Extract/port product card + grid (from `NewArrivalsComp` + `ShopProducts`).
5. `BannerComp.jsx` — simple hero; validates typography and CTA to `/shop`.

**Then (feature pages):**

6. Home (`HomeLayout` + `NewArrivalsComp` + `BannerComp2`).
7. `ProductModal.jsx` — unlocks end-to-end “add to cart”.
8. `CartPage.jsx`.
9. `ShopCorousel.jsx` + `ShopProducts` / `ShopComp`.
10. `AboutComp.jsx` (larger but no cart/modal).

**Defer / decide early:**

- `/contact` page (currently missing).
- Cleanup of dead state in `App.jsx` when merging modal logic into Next layout.

---

## 6. Bootstrap Dependencies Needing Tailwind Replacement

| Bootstrap / react-bootstrap | Role | Tailwind / replacement direction |
|-----------------------------|------|----------------------------------|
| `Container` / `Container fluid` | Max-width wrapper | `container mx-auto px-4` / `w-full` |
| `Row` / `Col` + breakpoints | Grid | `grid grid-cols-2 md:grid-cols-4 gap-4` etc. |
| `Navbar`, `Navbar.Toggle`, `Collapse` | Header | Flex + `lg:flex` + mobile menu (headless or custom state) |
| `Nav.Link` | Links | `next/link` + hover border utility (orange underline) |
| `Card`, `Card.Img`, `Card.Body` | Product tiles | `border-0`, `overflow-hidden`, flex column |
| `Modal` | Product detail overlay | Fixed inset + backdrop + `dialog` semantics (focus trap) |
| `Button` + `variant` | Actions | `border border-black rounded-none`, variant colors |
| `Carousel` | Shop hero slides | Embla / Swiper / custom with `interval` 3000ms |
| `Image` `fluid` / `rounded` | Responsive images | `next/image` + `rounded` |
| `badge rounded-pill bg-danger` | Cart count | `absolute -top-1 -right-1 min-w-[1.25rem] rounded-full bg-red-600 text-white text-xs` |
| Utility classes (`d-flex`, `gap-3`, `fw-bold`, `sticky-top`, `order-md-*`, `display-3`, `lead`) | Layout/type | Tailwind flex, gap, font-weight, sticky, order, text size utilities |

**Custom CSS to rehome:**

- `NavStyle.css` → nav link hover, toggle styles.
- `NewArrivals.css` → card hover, shimmer keyframes, modal button hovers.
- `FooterStyle.css` → social icon hover colors.
- `AboutStyle.css` → `fontstyle` (may merge with global font).

---

## 7. Potential Responsiveness Concerns

1. **Navbar collapse:** Bootstrap’s collapse animation and focus management differ from hand-rolled menus — test keyboard and overflow at `< lg`.
2. **Two-column product grid on xs:** `xs={6}` yields tight cards; ensure `gap` and image `height: 150px` match on narrow devices (320–375px).
3. **Hero `65vh` / `50vh`:** Short viewports may crop text; verify padding and `text-center` wrapping.
4. **Modal on mobile:** Full-width stacked layout; ensure close control remains reachable and body scroll lock works.
5. **About image blocks:** Fixed `450px` height columns — on mobile, tall blocks with `order-*` swaps; check for horizontal scroll from `mx-5` margins.
6. **Cart sticky summary:** `top: 90px` assumes navbar height; if logo/nav padding changes in Tailwind, adjust offset.
7. **Footer layout:** Multiple `Row`s without strict column balance — may need `grid` refactor for tablet widths.
8. **Carousel image height:** `maxHeight: 545px` — verify aspect ratio on ultrawide and mobile.
9. **Typography:** `display-3` hero scaling — use responsive text classes (`text-4xl md:text-6xl`) to match Bootstrap’s responsive headings.

---

## 8. Recommended Migration Workflow

### 8.1 Setup (once)

1. Create Next.js app in a separate directory (e.g. `sneekerehub-next/`) per project rules.
2. Configure Tailwind with breakpoints aligned to Bootstrap defaults (`sm: 640px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`, `2xl: 1536px`).
3. Copy `public/Products.json` and all image folders into Next `public/`.
4. Add `next/font` for Montserrat; port `scroll-behavior: smooth` to global CSS if desired.

### 8.2 Per-component workflow

1. **Reference** — run Vite app side-by-side; capture screenshots at `375px`, `768px`, `1024px`.
2. **Port markup** — mirror JSX structure; swap class names to Tailwind incrementally.
3. **Wire behavior** — props, context, and routes; add `"use client"` only where hooks/events are required.
4. **Verify** — cart persistence refresh, modal open/close, add with/without size, cart +/- totals.
5. **Sign-off** — compare against reference screenshots before moving to next component.

### 8.3 Quality gates

- [ ] All four routed pages render (plus contact decision).
- [ ] No Bootstrap CSS in Next bundle.
- [ ] `localStorage` cart survives refresh without hydration errors.
- [ ] Navbar badge and cart quantities behave identically.
- [ ] Lighthouse/accessibility spot-check on modal (focus trap, Esc to close) and mobile nav.
- [ ] ESLint passes; no unused duplicate fetch logic (optional consolidation).

### 8.4 Post-migration cleanup (later)

- Retire Vite `src/` when feature parity is signed off.
- Remove dead `cart` state from ported layout.
- Consider normalizing route `/cartPage` → `/cart`.
- Optionally unify product fetching and fix cart line identity if product requirements evolve.

---

## Appendix: File dependency graph (imports)

```
main.jsx → App, CartProvider, bootstrap CSS
App.jsx → HomeLayout, AboutComp, ShopComp, CartPage, ProductModal, Navbar, Footer
HomeLayout → BannerComp, NewArrivalsComp, BannerComp2
ShopComp → ShopCorousel, ShopProducts
NewArrivalsComp / ShopProducts → axios, Products.json, NewArrivals.css (home only)
ProductModal → CartContext
CartPage → CartContext
NavbarComp → CartContext, NavStyle.css
FooterComp → FooterStyle.css
AboutComp → AboutStyle.css
```

---

*Document generated from static analysis of the repository. No application source files were modified during this analysis.*
