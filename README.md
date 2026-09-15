# RuangDiskusi - Aplikasi Forum Diskusi

> Proyek Submission Kelas Dicoding: **"Menjadi React Web Developer Expert"**  
> Penerapan Automation Testing (Unit, Integration, E2E), React Ecosystem (Storybook), dan CI/CD (GitHub Actions & Vercel).

**RuangDiskusi** adalah aplikasi web forum diskusi modern, interaktif, dan minimalis yang dibangun menggunakan **React**, **Redux Toolkit**, dan **Dicoding Forum API v1** (`https://forum-api.dicoding.dev/v1/`). Aplikasi ini dilengkapi dengan pengujian otomatis menyeluruh, dokumentasi komponen via Storybook, pipeline CI/CD otomatis, serta desain **Simple Modern Minimalist** yang responsif dan nyaman dibaca.

---

## 🚀 Fitur Utama & Kriteria Penilaian

### 1. Automation Testing (`npm test` & `npm run e2e`)
- **Unit Testing Reducers (> 3 pengujian)**:
  - `src/states/authUser/reducer.test.js`: Initial state, set auth user, unset auth user.
  - `src/states/threads/reducer.test.js`: Initial state, receive threads, add thread, toggle upvote, toggle downvote, toggle neutral vote.
  - `src/states/threadDetail/reducer.test.js`: Initial state, receive detail, clear detail, add comment, toggle upvote thread detail, toggle upvote comment.
  - `src/states/isPreload/reducer.test.js`: Initial state, set isPreload.
  - `src/states/filterCategory/reducer.test.js`: Initial state, set filter, clear filter.
- **Integration Testing Thunk Functions (> 3 pengujian)**:
  - `src/states/authUser/action.test.js`: Login sukses/gagal, register sukses/gagal.
  - `src/states/shared/action.test.js`: Pengambilan threads dan users bersamaan.
  - `src/states/threads/action.test.js`: Pembuatan thread baru sukses/gagal.
  - `src/states/threadDetail/action.test.js`: Pengambilan detail thread dan pengiriman komentar.
  - `src/states/leaderboards/action.test.js`: Pengambilan daftar klasemen pengguna.
- **Component Testing React (> 3 pengujian)**:
  - `src/components/VoteButtons.test.jsx`: Menampilkan skor kalkulasi, memicu handler vote, dan kelas highlight aktif.
  - `src/components/CommentInput.test.jsx`: Menangani input textarea, tombol disabled saat kosong, dan form submit.
  - `src/components/CategoryFilter.test.jsx`: Menampilkan seluruh kategori dan memicu filter saat diklik.
  - `src/components/LeaderboardItem.test.jsx`: Menampilkan data peringkat pengguna dan styling badge medali.
- **End-to-End Testing (Cypress)**:
  - `cypress/e2e/login.cy.js`: Menguji alur tampilan halaman login, validasi alert saat kredensial salah, dan keberhasilan login hingga navigasi beranda.
- **Skenario Pengujian**: Setiap berkas pengujian diawali dengan komentar skenario pengujian yang jelas dan deskriptif.

### 2. CI/CD & Deployment
- **Continuous Integration (GitHub Actions)**:
  - File workflow: `.github/workflows/ci.yml`.
  - Workflow Name: `Continuous Integration`
  - Job Name: `automation-test-job` (menjalankan checkout, setup node, linter `npm run lint`, unit & component tests `npm test`, production build `npm run build`, dan Cypress E2E `npm run e2e`).
- **Continuous Deployment (Vercel)**:
  - Konfigurasi `vercel.json` dengan rewrite SPA untuk rute dinamis (`/threads/:id`, `/login`, dll.).
- **Branch Protection & Screenshot Bukti**:
  - Folder `screenshots/` menyimpan berkas:
    - `1_ci_check_error.png`
    - `2_ci_check_pass.png`
    - `3_branch_protection.png`

### 3. Pemanfaatan React Ecosystem: Storybook
- Menggunakan **Storybook** dari daftar resmi [awesome-react-ecosystem#react-tools](https://github.com/dicodingacademy/awesome-react-ecosystem#react-tools).
- Memiliki 3 berkas stories komponen modular:
  1. `src/components/VoteButtons.stories.jsx` (Neutral, Upvoted, Downvoted, HighScore)
  2. `src/components/CategoryFilter.stories.jsx` (Default, ActiveCategory, EmptyCategories)
  3. `src/components/LeaderboardItem.stories.jsx` (Rank1Gold, Rank2Silver, Rank3Bronze, RegularRank)

### 4. Mempertahankan Kriteria Submission Sebelumnya
- **Autentikasi Pengguna**: Register (`/register`), Login (`/login`), Session preloading (`isPreload`).
- **Thread & Komentar**: Daftar thread dengan waktu relatif, detail thread dan tanggapan, serta pembuatan thread baru (`/new`).
- **Bugs Highlighting**: Menggunakan **Dicoding Academy JavaScript Style Guide** (`eslint-config-dicodingacademy`) dengan **0 error dan 0 warning** pada `npm run lint`.
- **Fitur Saran Bintang 5**:
  - Votes dengan **Optimistic UI Updates** pada thread dan komentar.
  - Halaman **Leaderboard / Klasemen** pengguna aktif (`/leaderboards`).
  - **Filter kategori** murni di sisi front-end via Redux.

---

## 🛠️ Teknologi yang Digunakan

- **Core**: React 19, Vite
- **State Management**: Redux Toolkit & React-Redux
- **Routing**: React Router DOM v7
- **Icons**: React Icons (Feather Icons)
- **Styling**: Pure Vanilla CSS (CSS Variables, Flexbox, Grid, Minimalist Theme)
- **Linter**: ESLint v9 (`eslint-config-dicodingacademy`)
- **Unit & Component Testing**: Vitest, React Testing Library, JSDOM, Jest-DOM
- **End-to-End Testing**: Cypress, Start-Server-And-Test
- **Component Stories & Explorer**: Storybook v8 (@storybook/react-vite)
- **CI/CD**: GitHub Actions, Vercel

---

## 📁 Struktur Direktori

```text
forum-diskusi/
├── .github/workflows/      # GitHub Actions CI Workflow
│   └── ci.yml
├── .storybook/             # Konfigurasi Storybook
│   ├── main.js
│   └── preview.jsx
├── cypress/                # Cypress End-to-End Tests
│   ├── e2e/
│   │   └── login.cy.js
│   └── support/
│       ├── commands.js
│       └── e2e.js
├── screenshots/            # Bukti screenshot CI check & branch protection
│   ├── 1_ci_check_error.png
│   ├── 2_ci_check_pass.png
│   ├── 3_branch_protection.png
│   └── README.md
├── src/
│   ├── components/         # Komponen UI modular, unit tests, & stories
│   │   ├── CategoryFilter.jsx
│   │   ├── CategoryFilter.stories.jsx
│   │   ├── CategoryFilter.test.jsx
│   │   ├── CommentInput.jsx
│   │   ├── CommentInput.test.jsx
│   │   ├── CommentItem.jsx
│   │   ├── CommentList.jsx
│   │   ├── LeaderboardItem.jsx
│   │   ├── LeaderboardItem.stories.jsx
│   │   ├── LeaderboardItem.test.jsx
│   │   ├── LoadingBar.jsx
│   │   ├── Navbar.jsx
│   │   ├── ProtectedRoute.jsx
│   │   ├── ThreadItem.jsx
│   │   ├── ThreadList.jsx
│   │   ├── VoteButtons.jsx
│   │   ├── VoteButtons.stories.jsx
│   │   └── VoteButtons.test.jsx
│   ├── pages/              # Komponen halaman views
│   ├── states/             # Redux Store, Actions, Reducers, & Tests
│   │   ├── authUser/ (reducer, action, & tests)
│   │   ├── filterCategory/ (reducer, action, & test)
│   │   ├── isPreload/ (reducer, action, & test)
│   │   ├── leaderboards/ (reducer, action, & test)
│   │   ├── loading/
│   │   ├── shared/ (action & test)
│   │   ├── threadDetail/ (reducer, action, & tests)
│   │   └── threads/ (reducer, action, & tests)
│   ├── styles/             # Penggayaan Vanilla CSS
│   ├── utils/              # API Client & Helpers
│   ├── App.jsx
│   ├── main.jsx
│   └── setupTests.js       # Setup vitest matchers
├── cypress.config.js
├── eslint.config.js
├── package.json
├── vercel.json             # Konfigurasi deploy Vercel
└── vite.config.js
```

---

## 💻 Panduan Menjalankan Script

### 1. Menjalankan Seluruh Unit & Component Tests
```bash
npm test
```

### 2. Menjalankan End-to-End Tests (Cypress)
```bash
npm run e2e
```

### 3. Menjalankan Storybook
```bash
npm run storybook
```
Buka browser pada alamat `http://localhost:6006/` untuk melihat galeri komponen interaktif.

### 4. Menjalankan Linter (ESLint)
```bash
npm run lint
```

### 5. Menjalankan Development Server
```bash
npm run dev
```

### 6. Membangun Bundle Produksi
```bash
npm run build
```

---

## 📄 Lisensi
Proyek ini dibuat untuk keperluan submission kelas **Menjadi React Web Developer Expert** di **Dicoding Indonesia**.
