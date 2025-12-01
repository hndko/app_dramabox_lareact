# Quick Start - DramaBox Streaming Website

Panduan ini menjelaskan cara menjalankan website DramaBox dalam mode development dan production.

## Menjalankan Website (Development Mode)

Website ini memerlukan **2 terminal** yang berjalan bersamaan.

### Terminal 1: Vite Dev Server (Frontend Assets)

```bash
cd d:\laragon\www\app_dramabox_reactails
npm run dev
```

**Output yang benar:**

```
VITE v5.x.x  ready in xxx ms
➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
➜  press h + enter to show help
LARAVEL v11.x.x  plugin v1.x.x
➜  APP_URL: http://localhost
```

> ⚠️ **PENTING:** Jangan close terminal ini! Vite harus tetap berjalan.

### Terminal 2: Laravel Server (Backend)

```bash
cd d:\laragon\www\app_dramabox_reactails
php artisan serve --port=8000
```

**Output yang benar:**

```
INFO  Server running on [http://127.0.0.1:8000].
Press Ctrl+C to stop the server
```

---

## Mengakses Website

Setelah **KEDUA** terminal berjalan, buka browser dan akses URL berikut:

🔗 **URL:** [http://127.0.0.1:8000](http://127.0.0.1:8000)

✅ **Website seharusnya menampilkan:**

-   Dark theme dengan gradient hero
-   Header navigation dengan logo "DramaBox"
-   Heading "Welcome to DramaBox"

---

## Troubleshooting

### ❌ Halaman Blank / Putih

**Penyebab:** Vite dev server tidak berjalan.
**Solusi:**

1.  Pastikan `npm run dev` berjalan di **Terminal 1**.
2.  Check browser console (F12) untuk melihat error.
3.  Refresh browser (`Ctrl+R`).

### ❌ Error "Cannot GET /"

**Penyebab:** Laravel server tidak berjalan.
**Solusi:**

1.  Pastikan `php artisan serve` berjalan di **Terminal 2**.
2.  Check port 8000 tidak dipakai aplikasi lain.

### ❌ Vite Connection Error

**Penyebab:** Vite manifest tidak ditemukan.
**Solusi:**
Lakukan clean cache dan rebuild:

```bash
npm run build
npm run dev
```

---

## Production Build

Untuk production (tidak memerlukan Vite dev server):

1.  **Build assets sekali saja:**

    ```bash
    npm run build
    ```

    _Assets akan di-compile ke folder `public/build/`_

2.  **Jalankan Laravel:**
    ```bash
    php artisan serve --port=8000
    ```

### Catatan Penting

| Mode                 | Deskripsi                                                                                                                                           |
| :------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Development Mode** | • Gunakan `npm run dev` + `php artisan serve`<br>• Hot reload otomatis saat edit code<br>• Debugging lebih mudah<br>• **Recommended untuk testing** |
| **Production Mode**  | • Gunakan `npm run build` sekali<br>• Hanya perlu `php artisan serve`<br>• Assets sudah di-minify dan optimized                                     |

---

## Struktur Project

```text
app_dramabox_reactails/
├── app/
│   ├── Http/Controllers/     # Laravel controllers
│   └── Services/             # API service classes
├── resources/
│   ├── js/
│   │   ├── Components/       # React components
│   │   ├── Layouts/          # Layout components
│   │   └── Pages/            # Inertia pages
│   └── css/
│       └── app.css           # Tailwind styles
├── routes/
│   └── web.php               # Laravel routes
└── public/
    └── build/                # Compiled assets (production)
```
