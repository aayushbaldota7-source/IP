# Noir — Premium SaaS Dashboard

> A pixel-perfect, fully responsive dashboard built with **React + Vite + Tailwind CSS + Framer Motion**. Designed for senior engineers, client demos, and production deployments.

---

## ✨ Features

- 🎨 **Cream & Black** premium design system
- 🌗 **Dark / Light mode** with smooth transitions and `localStorage` persistence
- 📱 **Mobile-first** responsive layout (Mobile → Tablet → Desktop)
- 🎭 **Framer Motion** animations — page reveals, hover lifts, layout transitions
- 🎠 **Swiper.js** carousels — hero slider, project slider
- 🔢 **Count-up animations** for live stats
- 💀 **Skeleton loaders** while content streams in
- ♿ **Accessible** — ARIA labels, keyboard navigation, semantic HTML, focus management
- 🔍 **SEO ready** — meta tags, canonical, proper heading hierarchy
- 🗂️ **Filterable project cards** with animated layout transitions
- 🔔 **Notifications** dropdown, **Profile** menu, animated **Search** bar

---

## 🛠️ Tech Stack

| Tool             | Purpose                              |
|------------------|--------------------------------------|
| React 18         | UI framework with concurrent features|
| Vite 5           | Ultra-fast dev server & bundler      |
| TypeScript       | Type-safe codebase                   |
| Tailwind CSS 3   | Utility-first styling                |
| Framer Motion 11 | Declarative animations               |
| Swiper 11        | Touch-friendly carousels             |
| React Icons      | 40+ icon libraries                   |
| Zustand          | Lightweight state management (ready) |

---

## 📁 Project Structure

```
dashboard-app/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── containers/
│   │   │   ├── HeroCarousel.tsx      # Container 1 – Auto-sliding hero banner
│   │   │   ├── StatsSection.tsx      # Container 2 – Animated stat cards
│   │   │   ├── ImageSlider.tsx       # Container 3 – Interactive project slider
│   │   │   ├── ContentSection.tsx    # Container 4 – Image + text feature section
│   │   │   ├── CTASection.tsx        # Container 5 – CTA with loading buttons
│   │   │   └── AnimatedCards.tsx     # Container 6 – Filterable project kanban
│   │   ├── layout/
│   │   │   ├── Header.tsx            # Sticky header with search, notifs, profile
│   │   │   ├── Sidebar.tsx           # Desktop collapse + mobile drawer
│   │   │   └── Layout.tsx            # Root layout wiring
│   │   └── ui/
│   │       ├── Button.tsx            # Reusable Button + IconButton
│   │       ├── Card.tsx              # Reusable Card + StatCard
│   │       ├── ThemeToggle.tsx       # Dark/light mode spring toggle
│   │       └── SkeletonLoader.tsx    # Shimmer skeleton variants
│   ├── context/
│   │   ├── ThemeContext.tsx          # Dark/light theme with localStorage
│   │   └── SidebarContext.tsx        # Sidebar open/collapsed state
│   ├── hooks/
│   │   ├── useMediaQuery.ts          # Responsive breakpoint hooks
│   │   ├── useScrollPosition.ts      # Scroll direction + progress tracker
│   │   └── useAnimations.ts          # Count-up + InView hooks
│   ├── pages/
│   │   └── Dashboard.tsx            # Main dashboard page
│   ├── utils/
│   │   └── constants.ts             # Nav items, stats, slides, cards, variants
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css                    # Global styles + Tailwind + utilities
├── index.html
├── tailwind.config.js
├── vite.config.ts
├── tsconfig.json
├── postcss.config.js
└── package.json
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js `>=18.0.0`
- npm or pnpm or yarn

### Installation

```bash
# 1. Clone / enter the project
cd dashboard-app

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📜 Scripts

| Script          | Description                           |
|-----------------|---------------------------------------|
| `npm run dev`   | Start Vite dev server with HMR        |
| `npm run build` | Type-check + production bundle        |
| `npm run preview` | Preview production build locally   |

---

## 🎨 Design System

### Color Palette

| Token          | Light Value   | Dark Value    | Usage               |
|----------------|---------------|---------------|---------------------|
| `cream-100`    | `#FAF8F3`     | —             | Page background     |
| `cream-200`    | `#F5F0E8`     | —             | Card hover bg       |
| `noir-500`     | `#1A1A1A`     | —             | Dark card bg        |
| `noir-700`     | `#0D0D0D`     | —             | Sidebar, CTA bg     |
| `primary-500`  | `#6C63FF`     | —             | Active, accent      |
| `secondary-500`| `#8B5CF6`     | —             | Gradient accent     |

### Responsive Breakpoints

| Breakpoint | Width     | Layout                |
|------------|-----------|-----------------------|
| Mobile     | `<640px`  | Single column, drawer |
| Tablet     | `640-1023`| Two column            |
| Desktop    | `≥1024px` | Full sidebar + grid   |

---

## 🧩 Containers

| # | Name             | Key Features                                              |
|---|------------------|-----------------------------------------------------------|
| 1 | Hero Carousel    | Auto-slide, fade effect, animated text, progress bar      |
| 2 | Stats Section    | Count-up numbers, progress bars, live indicator           |
| 3 | Image Slider     | Free-mode drag, custom arrows, hover cards                |
| 4 | Content Section  | Two-column, dashboard preview visual, feature list        |
| 5 | CTA Section      | Loading buttons, social proof, avatar stack               |
| 6 | Animated Cards   | Filter tabs, layout animation, progress, priority badges  |

---

## ♿ Accessibility

- All interactive elements have `aria-label` or `aria-labelledby`
- Keyboard navigation supported throughout
- Focus states styled with `focus-visible:ring-2`
- ARIA roles: `banner`, `navigation`, `main`, `dialog`, `tablist`, `menuitem`
- `role="list"` / `listitem` for all list structures
- `aria-live="polite"` on filtered card grid

---

## 🚢 Deployment

### Vercel (Recommended)

```bash
npm run build
# Push to GitHub → Import in vercel.com → Auto-deploy
```

### Netlify

```bash
npm run build
# Drag & drop the `dist/` folder to netlify.com/drop
```

### Self-hosted

```bash
npm run build
# Serve the `dist/` folder with any static host (nginx, Caddy, etc.)
```

