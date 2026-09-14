# RuangDiskusi - Aplikasi Forum Diskusi

> Proyek Submission Kelas Dicoding: **"Menjadi React Web Developer Expert"** / Pengelolaan State Kompleks dengan Redux.

**RuangDiskusi** adalah aplikasi web forum diskusi modern, interaktif, dan minimalis yang dibangun menggunakan **React**, **Redux Toolkit**, dan **Dicoding Forum API v1** (`https://forum-api.dicoding.dev/v1/`). Aplikasi ini dirancang dengan gaya **Simple Modern Minimalist**, kontras warna yang nyaman dibaca, serta performa responsif di berbagai perangkat.

---

## 🚀 Fitur Utama & Kriteria Penilaian

### 1. Kriteria Utama (Wajib)
- **Fungsionalitas Autentikasi**:
  - Pendaftaran akun baru (`/register`) dengan validasi input client-side.
  - Masuk ke akun (`/login`) dengan persistensi token di `localStorage` dan Redux state.
  - Preload sesi login (`isPreload`) untuk menjaga status user saat halaman dimuat ulang.
  - Logout akun yang membersihkan token dan state user.
- **Daftar Thread (`/`)**:
  - Menampilkan judul thread, cuplikan isi, waktu relatif (`postedAt`), jumlah komentar, serta nama dan avatar pembuat thread.
- **Detail Thread & Komentar (`/threads/:id`)**:
  - Menampilkan judul, isi lengkap (HTML-safe parsing), waktu pembuatan, profil pembuat (nama dan avatar).
  - Menampilkan daftar komentar lengkap dengan informasi nama, avatar, waktu, dan konten tanggapan.
- **Buat Thread Baru (`/new`)**:
  - Diproteksi route guard (`ProtectedRoute`) khusus pengguna yang telah login.
  - Form input judul, kategori (opsional), dan isi diskusi.
- **Buat Komentar**:
  - Form komentar interaktif pada detail thread untuk pengguna terotentikasi, disertai ajakan login jika belum terautentikasi.
- **Loading Indicator**:
  - Indikator bar loading dinamis di bagian paling atas layar saat data sedang dimuat dari API.

### 2. Bugs Highlighting & Standar Kode
- **ESLint**: Menggunakan konfigurasi berkas `eslint.config.js` berbasis standard ECMAScript & React rules.
- **Zero Errors**: Lulus verifikasi `npm run lint` dengan **0 error dan 0 warning**.
- **React Strict Mode**: Diterapkan pada `main.jsx` (`<StrictMode>`).

### 3. Arsitektur Redux & Modularitas
- **State Terpusat**: Seluruh data yang bersumber dari API disimpan pada Redux Store (`authUser`, `isPreload`, `users`, `threads`, `threadDetail`, `leaderboards`, `filterCategory`, `loading`).
- **Tanpa API Call di Lifecycle Komponen**: Seluruh pemanggilan REST API dilakukan melalui **Redux Thunk** (`async action creator`). Komponen React murni fokus pada presentasi antarmuka.
- **Pemisahan Folder UI & State**: Folder terstruktur rapi antara `src/states/`, `src/components/`, `src/pages/`, `src/utils/`, dan `src/styles/`.
- **Modular & Reusable**: Komponen modular seperti `ThreadItem`, `VoteButtons`, `CommentList`, `CategoryFilter`, dan `LeaderboardItem`.

---

## 🌟 Fitur Unggulan (Saran Bintang 5)

1. **Saran 1: Fitur Upvote & Downvote (Thread & Komentar)**
   - Tombol vote interaktif pada setiap thread dan komentar.
   - Indikasi warna aktif: Biru (`active-up`) untuk upvote, Merah (`active-down`) untuk downvote, dan Netral.
   - **Optimistic UI Updates**: State antarmuka diperbarui secara instan sebelum API selesai, dan otomatis di-rollback jika terjadi kegagalan jaringan.
   - Menampilkan kalkulasi total skor vote secara akurat.

2. **Saran 2: Halaman Klasemen / Leaderboard (`/leaderboards`)**
   - Menampilkan peringkat pengguna dengan poin kontribusi tertinggi.
   - Dilengkapi badge medali (Juara 1: Emas, Juara 2: Perak, Juara 3: Perunggu), avatar, nama, email, dan perolehan skor.

3. **Saran 3: Filter Thread Berdasarkan Kategori**
   - Chip filter kategori dinamis yang diekstrak langsung dari kumpulan thread.
   - Penyaringan murni di sisi front-end melalui manipulasi state Redux `filterCategory`.
   - Mengklik badge kategori pada kartu thread akan langsung memfilter topik tersebut.

---

## 🛠️ Teknologi yang Digunakan

- **Frontend**: [React](https://react.dev/) (v19)
- **Bundler & Dev Server**: [Vite](https://vite.dev/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/) & [React-Redux](https://react-redux.js.org/)
- **Routing**: [React Router DOM](https://reactrouter.com/) (v7)
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/) (Feather Icons)
- **Styling**: Pure Vanilla CSS (CSS Variables, Flexbox, Grid, Simple Modern Minimalist Theme)
- **Linter**: ESLint (v9) Flat Config

---

## 📁 Struktur Proyek

```text
forum-diskusi/
├── index.html              # Template HTML dengan SEO tags & font Plus Jakarta Sans
├── eslint.config.js        # Konfigurasi ESLint
├── vite.config.js          # Konfigurasi Vite
├── package.json            # Daftar dependensi & scripts
├── public/                 # Asset statis publik
└── src/
    ├── components/         # Komponen UI modular
    │   ├── CategoryFilter.jsx
    │   ├── CommentInput.jsx
    │   ├── CommentItem.jsx
    │   ├── CommentList.jsx
    │   ├── LeaderboardItem.jsx
    │   ├── LoadingBar.jsx
    │   ├── Navbar.jsx
    │   ├── ProtectedRoute.jsx
    │   ├── ThreadItem.jsx
    │   ├── ThreadList.jsx
    │   └── VoteButtons.jsx
    ├── pages/              # Komponen halaman (views)
    │   ├── DetailPage.jsx
    │   ├── HomePage.jsx
    │   ├── LeaderboardPage.jsx
    │   ├── LoginPage.jsx
    │   ├── NewThreadPage.jsx
    │   ├── NotFoundPage.jsx
    │   └── RegisterPage.jsx
    ├── states/             # Redux Store, Actions, Reducers, & Thunks
    │   ├── authUser/
    │   ├── filterCategory/
    │   ├── isPreload/
    │   ├── leaderboards/
    │   ├── loading/
    │   ├── shared/
    │   ├── threadDetail/
    │   ├── threads/
    │   ├── users/
    │   └── index.js
    ├── styles/             # Penggayaan Vanilla CSS terstruktur
    │   └── index.css
    ├── utils/              # Helper API Dicoding & utilitas format waktu
    │   ├── api.js
    │   └── index.js
    ├── App.jsx             # Root layout & routing
    └── main.jsx            # Entry point aplikasi (StrictMode & Provider)
```

---

## 💻 Panduan Instalasi & Menjalankan Aplikasi

### 1. Prasyarat
- Pastikan telah menginstal [Node.js](https://nodejs.org/) (versi LTS yang direkomendasikan).

### 2. Clone Repositori & Instal Dependensi
```bash
git clone https://github.com/ZeroCG01/forum-diskusi.git
cd forum-diskusi
npm install
```

### 3. Menjalankan Development Server
```bash
npm run dev
```
Buka browser dan akses alamat `http://localhost:5173/`.

### 4. Menjalankan Pemeriksaan ESLint
```bash
npm run lint
```

### 5. Membangun Bundle Produksi
```bash
npm run build
```

---

## 📄 Lisensi
Proyek ini dibuat untuk keperluan pembelajaran dan submission di **Dicoding Indonesia**. Bebas digunakan untuk referensi studi.
