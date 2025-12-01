# 🎬 DramaBox Streaming Website

<div align="center">

![Laravel](https://img.shields.io/badge/Laravel-11.x-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)
![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Inertia.js](https://img.shields.io/badge/Inertia.js-2.x-9553E9?style=for-the-badge&logo=inertia&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.x-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

**Modern streaming website dengan tampilan dark theme yang memukau, dibangun menggunakan Laravel 11, Inertia.js, React, dan shadcn/ui**

[Quick Start](#-quick-start) • [Features](#-features) • [Documentation](#-documentation) • [API Integration](#-api-integration)

</div>

---

## 📑 Table of Contents

-   [🚀 Quick Start](#-quick-start)
-   [✨ Features](#-features)
-   [🎨 Design System](#-design-system)
-   [📂 Project Structure](#-project-structure)
-   [🔌 API Integration](#-api-integration)
-   [🛠️ Troubleshooting](#️-troubleshooting)
-   [📚 Documentation](#-documentation)

---

## 🚀 Quick Start

### Prerequisites

-   PHP >= 8.2
-   Composer
-   Node.js >= 18.x
-   NPM or Yarn

### Installation

```bash
# 1. Clone the repository (jika dari git)
git clone <repository-url>
cd app_dramabox_reactails

# 2. Install PHP dependencies
composer install

# 3. Install Node dependencies
npm install

# 4. Setup environment
cp .env.example .env
php artisan key:generate

# 5. Run migrations (optional)
php artisan migrate
```

### Running Development Server

**Anda memerlukan 2 terminal yang berjalan bersamaan:**

#### Terminal 1: Vite Dev Server (Frontend)

```bash
npm run dev
```

✅ **Output yang benar:**

```
VITE v5.x.x  ready in xxx ms
➜  Local:   http://localhost:5173/
LARAVEL v11.x.x  plugin v1.x.x
```

> ⚠️ **PENTING:** Jangan close terminal ini! Vite harus tetap berjalan.

#### Terminal 2: Laravel Server (Backend)

```bash
php artisan serve --port=8000
```

✅ **Output yang benar:**

```
INFO  Server running on [http://127.0.0.1:8000].
```

#### Akses Website

Buka browser dan akses: **http://127.0.0.1:8000**

✅ Website akan menampilkan:

-   Dark theme dengan vibrant colors
-   Gradient hero section "Welcome to DramaBox"
-   Modern navigation header
-   Responsive layout

---

## ✨ Features

### 🎯 Core Features

-   ✅ **Modern Dark Theme** - Vibrant purple/cyan color palette dengan glassmorphism effects
-   ✅ **Responsive Design** - Mobile-first approach, works perfectly dari 320px hingga 4K
-   ✅ **Real-time Search** - Autocomplete suggestions dengan debounced API calls
-   ✅ **Advanced Filtering** - Genre, sort, dan language filters
-   ✅ **Smooth Animations** - Custom CSS animations untuk UX yang premium
-   ✅ **Video Player** - HTML5 player dengan episode management
-   ✅ **SEO Optimized** - Proper meta tags dan semantic HTML

### 📄 Pages

| Page             | Route           | Description                                     |
| ---------------- | --------------- | ----------------------------------------------- |
| **Home**         | `/`             | For You content dengan hero section             |
| **New Releases** | `/new-releases` | Latest drama releases                           |
| **Trending**     | `/trending`     | Top ranked content dengan special top 3 display |
| **Browse**       | `/browse`       | Filterable content library                      |
| **Search**       | `/search`       | Search results dengan pagination                |
| **Player**       | `/watch/{id}`   | Video player dengan episode list                |

### 🎨 UI Components

-   **Header** - Sticky navigation dengan glassmorphism
-   **SearchBar** - Real-time autocomplete
-   **VideoCard** - Interactive cards dengan hover effects
-   **VideoGrid** - Responsive grid layout
-   **AppLayout** - Consistent page wrapper

---

## 🎨 Design System

### Color Palette

```css
/* Primary Colors */
--primary: HSL(263, 70%, 60%)     /* Vibrant Purple */
--accent: HSL(180, 75%, 50%)      /* Bright Cyan */

/* Dark Background */
--background: HSL(222, 47%, 4%)   /* Deep Blue-Black */
--card: HSL(222, 47%, 7%)         /* Slightly Lighter */
```

### Typography

-   **Body Text:** Inter (300-800 weights)
-   **Display/Headings:** Poppins (400-800 weights)
-   **Antialiasing:** Enabled for smooth rendering

### Custom Utilities

-   `.bg-gradient-primary` - Purple to cyan gradient
-   `.glass` & `.glass-card` - Glassmorphism effects
-   `.hover-lift` - Smooth lift animation on hover
-   `.text-gradient` - Gradient text effect
-   `.custom-scrollbar` - Styled scrollbars

### Animations

-   **fadeIn** - Fade in from bottom (0.5s)
-   **slideIn** - Slide in from left (0.5s)
-   **scaleIn** - Scale in effect (0.3s)
-   **pulse-slow** - Slow pulse for loaders (3s)

---

## 📂 Project Structure

```
app_dramabox_reactails/
├── app/
│   ├── Http/
│   │   └── Controllers/          # Inertia controllers
│   │       ├── HomeController.php
│   │       ├── NewReleasesController.php
│   │       ├── TrendingController.php
│   │       ├── BrowseController.php
│   │       ├── SearchController.php
│   │       └── PlayerController.php
│   └── Services/                 # API service layer
│       ├── ApiService.php        # Base service with caching
│       └── DramaBoxService.php   # DramaBox API integration
│
├── resources/
│   ├── js/
│   │   ├── Components/           # Reusable React components
│   │   │   ├── Header.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   ├── VideoCard.jsx
│   │   │   └── VideoGrid.jsx
│   │   ├── Layouts/              # Layout components
│   │   │   └── AppLayout.jsx
│   │   └── Pages/                # Inertia pages
│   │       ├── Home.jsx
│   │       ├── NewReleases.jsx
│   │       ├── Trending.jsx
│   │       ├── Browse.jsx
│   │       ├── Search.jsx
│   │       └── Player.jsx
│   └── css/
│       └── app.css               # Tailwind + custom styles
│
├── routes/
│   └── web.php                   # Application routes
│
└── public/
    └── build/                    # Compiled production assets
```

---

## 🔌 API Integration

### DramaBox API Endpoints

Website ini terintegrasi dengan DramaBox API melalui service layer:

| Method | Endpoint                       | Service Method     | Description             |
| ------ | ------------------------------ | ------------------ | ----------------------- |
| GET    | `/api/foryou/{page}`           | `getForYou()`      | Theater/For You content |
| GET    | `/api/new/{page}`              | `getNewReleases()` | Latest releases         |
| GET    | `/api/rank/{page}`             | `getTrending()`    | Top ranked content      |
| GET    | `/api/classify`                | `getClassify()`    | Filtered content        |
| GET    | `/api/search/{keyword}/{page}` | `search()`         | Search dramas           |
| GET    | `/api/suggest/{query}`         | `getSuggestions()` | Autocomplete            |
| GET    | `/api/chapters/{id}`           | `getChapters()`    | Episode list            |
| GET    | `/api/watch/{id}/{ep}`         | `getWatch()`       | Video stream URL        |

### Configuration

Edit `.env` file untuk mengubah API configuration:

```env
DRAMABOX_API_BASE_URL=https://sapi.dramabox.be/api
DRAMABOX_API_CACHE_TTL=3600
```

### Caching Strategy

-   Default cache TTL: 3600 seconds (1 hour)
-   Search suggestions: No cache (real-time)
-   Cache dapat di-clear via `ApiService::clearCache()`

---

## 🛠️ Troubleshooting

### ❌ Halaman Blank/Putih

**Penyebab:** Vite dev server tidak berjalan

**Solusi:**

```bash
# Pastikan npm run dev berjalan di Terminal 1
npm run dev

# Refresh browser (Ctrl+R)
```

### ❌ Error "Cannot GET /"

**Penyebab:** Laravel server tidak berjalan

**Solusi:**

```bash
# Check apakah port 8000 sudah dipakai
netstat -ano | findstr :8000

# Start Laravel server
php artisan serve --port=8000
```

### ❌ Vite Connection Error

**Penyebab:** Vite manifest tidak ditemukan

**Solusi:**

```bash
# Clean cache dan rebuild
npm run build
npm run dev
```

### ❌ dramas.map is not a function

**Status:** ✅ FIXED
Sudah diperbaiki dengan array validation di semua pages.

---

## 📚 Documentation

### Production Build

Untuk production deployment:

```bash
# 1. Build assets
npm run build

# 2. Optimize autoload
composer install --optimize-autoloader --no-dev

# 3. Cache configuration
php artisan config:cache
php artisan route:cache
php artisan view:cache

# 4. Run server
php artisan serve --port=8000
# atau gunakan Nginx/Apache
```

### Development vs Production

| Mode            | Commands                            | Features                                             |
| --------------- | ----------------------------------- | ---------------------------------------------------- |
| **Development** | `npm run dev` + `php artisan serve` | • Hot reload<br>• Source maps<br>• Easy debugging    |
| **Production**  | `npm run build` + deploy            | • Minified assets<br>• Optimized<br>• Cached configs |

### Tech Stack

-   **Backend:** Laravel 11.x
-   **Frontend:** React 18.x + Inertia.js 2.x
-   **Styling:** Tailwind CSS 3.x + shadcn/ui
-   **Build Tool:** Vite 5.x
-   **Icons:** Lucide React
-   **HTTP Client:** Axios

---

## 📝 Notes

> **⚠️ IMPORTANT**
> Website saat ini menampilkan **empty state** karena belum ada data dari API.
> Untuk menampilkan data real, berikan contoh response dari API endpoints.

> **💡 TIP**
> Untuk development, selalu jalankan **kedua server** (Vite + Laravel) bersamaan.

> **🔒 CORS**
> Pastikan CORS settings di API server mengizinkan requests dari domain Laravel app.

---

## 📄 License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

---

<div align="center">

**Built with ❤️ using Laravel, React, and Inertia.js**

[Report Bug](https://github.com) • [Request Feature](https://github.com)

</div>
