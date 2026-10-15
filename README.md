# NovaNFT - NFT Digital Marketplace Dashboard Website

A complete, modern, pixel-perfect, responsive **NFT Digital Marketplace Dashboard Website** developed in strict alignment with modern Web3 Figma designs. Features a default deep navy and dark purple aesthetic, vibrant purple accents, real-time Chart.js market charts, dynamic bidding modals with validation, full LocalStorage persistence, multi-category filters, and responsive layouts across all device form factors.

---

## 🚀 Live Demo & Quick Launch

You can open and test the application directly in any modern browser without needing complex build steps.

### Method 1: Local HTTP Server (Recommended)
From the project root directory:
```bash
# Using Python built-in server
python -m http.server 3000
```
Then navigate to:
```
http://localhost:3000
```

### Method 2: Direct File Execution
Double-click `index.html` (or open it with Chrome, Edge, Safari, Firefox) to run directly.

---

## 🛠️ Technology Stack

- **HTML5**: Semantic tags, accessible landmarks, clean structure.
- **CSS3**: Custom design tokens, CSS Grid & Flexbox, CSS variables for effortless dark/light theme switching.
- **JavaScript (ES6+)**: Modular architecture (`js/data.js`, `js/app.js`, `js/home.js`, `js/bids.js`, etc.) with zero runtime framework overhead.
- **Bootstrap 5 (v5.3.3)**: Grid system, utilities, responsive layout containers.
- **Chart.js**: Real-time ETH Price Line Chart with purple gradient fill and Artwork Statistics Doughnut Chart.
- **Font Awesome 6 (Free)**: Complete iconography across sidebar, badges, and controls.
- **LocalStorage API**: Full client-side persistence for bids, wishlist items, profile edits, application themes, and mock authentication session.

---

## 📁 Project Architecture & Folder Structure

```
NFT Digital Marketplace/
├── index.html                      # Home Dashboard (Hero, Trending Bids, Charts, Top Creators, Active Bids)
├── bids.html                       # Bids Dashboard (KPIs, Active Bids Table, Row Selection & Cancel)
├── saved.html                      # Saved Items (Wishlist Grid, Filter & Sorting, Empty State)
├── collections.html                # Collections (Multi-category filters, Instant search, Sorters)
├── profile.html                    # User Profile (Verified badge, 2FA status, Bought/Collected tabs, Edit modal)
├── settings.html                   # Settings (6 functional tabs: Profile, App, Security, Activity, Payment, API)
├── login.html                      # Login Screen (Validation, Password toggle, Demo auto-login)
├── register.html                   # Registration Screen (Password confirmation, Validation, Terms agreement)
├── nft-details.html                # Standalone NFT Details (Dynamic query param loading, Attributes, History)
├── NFT_Marketplace_Daily_Progress.xlsx # Excel tracking sheet covering Days 1-3 development tasks
├── assets/
│   ├── images/
│   │   ├── logo/                   # NovaNFT brand vector logo and favicon
│   │   ├── avatars/                # SVG avatars for users and verified creators
│   │   └── nft/                    # 12 high-resolution, thematic NFT vector artworks
│   └── icons/
├── css/
│   ├── style.css                   # Core tokens, Base layout, Header, Sidebar, Typography
│   ├── components.css              # Hero banner, NFT Cards, Tables, Modals, Toast notifications
│   ├── themes.css                  # Light & Dark theme variable overrides & transitions
│   └── responsive.css              # Responsive media queries (320px to 1920px viewports)
├── js/
│   ├── data.js                     # Centralized reactive dataset, LocalStorage API & CRUD methods
│   ├── app.js                      # Universal app engine: Theme switch, Live search, Toasts, Modals
│   ├── navigation.js               # Route highlighting, keyboard shortcuts, Session UI
│   ├── home.js                     # Home dashboard logic & Chart.js instances
│   ├── bids.js                     # Bids dashboard selection, batch actions, and table renders
│   ├── saved.js                    # Wishlist filters, sorting, and removal
│   ├── collections.js              # Collections multi-filter, search, and sorting
│   ├── profile.js                  # Profile tabs, follow/unfollow toggle, and profile editing
│   ├── settings.js                 # 6-tab settings engine with simulated API key masking/generation
│   ├── auth.js                     # Authentication forms, password toggle, and session persistence
│   └── nft-details.js              # Standalone details renderer, live countdown, and bid history
└── README.md
```

---

## 🎨 Design System & Color Palette

- **Background Default (Dark Theme)**: Deep Navy `#121025`
- **Secondary Background**: Dark Slate `#181432`
- **Cards & Panels**: Deep Purple `#1e1b38`
- **Primary Brand / Accent**: Vibrant Purple `#735bf2`
- **Status Accents**:
  - **Success / Positive**: `#00d084` (Green)
  - **Ending Soon / Cancelled**: `#ff4757` (Red)
  - **Warning / Rare**: `#ffa502` (Yellow/Orange)
  - **Cyan Highlight**: `#00f2fe`
- **Light Theme**: Seamlessly switchable using `#f5f6fc` background, `#ffffff` cards, and high contrast typography without breaking layout integrity.

---

## 📱 Responsive Breakpoints Tested & Verified

The site has been engineered to adapt fluidly across all 16 target screen sizes:
1. **320px** — Ultra-compact smartphones (iPhone SE 1st Gen)
2. **360px** — Android compacts (Galaxy S8/S9)
3. **375px** — Standard smartphones (iPhone X / 11 / 12 mini)
4. **390px** — iPhone 12 / 13 / 14 / 15
5. **414px** — iPhone Plus / Max series
6. **480px** — Large phablets
7. **576px** — Small tablets / Landscape phones
8. **768px** — iPad Portrait / Standard tablets
9. **820px** — iPad Air / Tablets
10. **1024px** — iPad Pro / Small laptops
11. **1152px** — Standard notebooks
12. **1280px** — HD desktop monitors
13. **1366px** — WXGA laptops
14. **1440px** — Full desktop monitors
15. **1600px** — Wide screen displays
16. **1920px** — Full HD / 4K displays

---

## 💡 Key Functional Features

1. **Universal Bid Modal**:
   - Allows users to place bids on any NFT from Home, Bids, Saved, or Collections.
   - Enforces strict validation: non-empty, non-negative, must meet or exceed minimum bid requirement.
   - Real-time gas calculation (`0.008 ETH`) and USD valuation.
   - Quick increment buttons (`+0.1`, `+0.5`, `+1.0 ETH`).
   - Updates LocalStorage state instantly and dispatches reactive events to refresh all open tables and cards.

2. **Universal NFT Details Modal & Dedicated Page**:
   - High-resolution artwork preview with rarity badges.
   - Live countdown ticker updating every second (`14h 29m 45s`).
   - Full attribute breakdown with rarity percentages.
   - Bid history table and provenance details.

3. **Live Search Autocomplete**:
   - Top search input filters NFTs by title, category, and creator name in real-time.
   - Keyboard shortcut: press `/` anywhere to focus search.
   - Esc key closes all active modals.

4. **Multi-Tab Settings (Zero Page Reload)**:
   - 6 functional tabs: Profile, Application, Security, Activity, Payment Method, and API Keys.
   - Masked API key display (`nova_live_••••••••`) with one-click reveal, copy to clipboard, generation of new keys, and revocation.

5. **Demo Authentication Flow**:
   - Quick Demo Login button fills verified test credentials instantly.
   - Form validation, show/hide password toggle, and session persistence in `LocalStorage`.
   - Logout clears session and redirects to `login.html`.

6. **Daily Progress Excel Tracking**:
   - Included in `NFT_Marketplace_Daily_Progress.xlsx` documenting Day 1, Day 2, and Day 3 progress with complete 10-column tracking structure.

---

## 🔒 Front-End Demonstration Notice

Features requiring Web3 wallet provider signatures (e.g. MetaMask extension RPC), blockchain smart contract execution, credit card processing, or external production databases are clearly identified and simulated using client-side JavaScript and `LocalStorage` demo stores.
