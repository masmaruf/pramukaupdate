# Setup Keystatic GitHub Mode untuk PramukaUpdate

Keystatic sudah dikonfigurasi memakai GitHub mode:

- Repo: `masmaruf/pramukaupdate`
- Branch konten: prefix `cms/`
- Dashboard: `/keystatic`
- API callback: `/api/keystatic/github/oauth/callback`

## 1. Jalankan lokal

```powershell
cd D:\Antigravity\pramukaupdate
npm install
npm run dev
```

Buka:

```text
http://127.0.0.1:4321/keystatic
```

Klik **Login with GitHub**. Jika belum ada GitHub App, Keystatic akan membawa kamu ke proses setup app.

## 2. Buat GitHub App dari alur Keystatic

Saat setup GitHub App:

- Pilih repo `masmaruf/pramukaupdate`.
- Jika diminta URL project, isi `https://pramukaupdate.id`.
- Install app hanya untuk repository PramukaUpdate jika memungkinkan.

Setelah selesai, Keystatic akan membuat / menampilkan environment variables berikut:

```text
KEYSTATIC_GITHUB_CLIENT_ID=
KEYSTATIC_GITHUB_CLIENT_SECRET=
KEYSTATIC_SECRET=
PUBLIC_KEYSTATIC_GITHUB_APP_SLUG=
```

`KEYSTATIC_SECRET` wajib minimal 32 karakter.

## 3. Simpan env lokal

Buat file `.env` di root project, lalu isi dengan nilai dari Keystatic:

```text
KEYSTATIC_GITHUB_CLIENT_ID=isi_dari_keystatic
KEYSTATIC_GITHUB_CLIENT_SECRET=isi_dari_keystatic
KEYSTATIC_SECRET=isi_dari_keystatic
PUBLIC_KEYSTATIC_GITHUB_APP_SLUG=isi_dari_keystatic
```

Jangan commit `.env`.

Restart dev server:

```powershell
npm run dev
```

Lalu buka lagi:

```text
http://127.0.0.1:4321/keystatic
```

## 4. Tambahkan callback URL produksi

Di GitHub:

1. Buka GitHub App settings.
2. Cari bagian callback URL.
3. Pastikan ada callback lokal dan produksi:

```text
http://127.0.0.1:4321/api/keystatic/github/oauth/callback
https://pramukaupdate.id/api/keystatic/github/oauth/callback
```

Jika nanti pakai domain preview Vercel untuk testing, tambahkan juga callback URL preview yang sedang dipakai.

## 5. Tambahkan env ke Vercel

Di Vercel project PramukaUpdate:

1. Settings → Environment Variables.
2. Tambahkan semua variable:

```text
KEYSTATIC_GITHUB_CLIENT_ID
KEYSTATIC_GITHUB_CLIENT_SECRET
KEYSTATIC_SECRET
PUBLIC_KEYSTATIC_GITHUB_APP_SLUG
```

Gunakan environment: **Production**, **Preview**, dan **Development** kalau tersedia.

3. Redeploy project.

## 6. Cara kerja editor

Saat editor membuka:

```text
https://pramukaupdate.id/keystatic
```

mereka login dengan GitHub. Syaratnya akun GitHub mereka punya akses tulis ke repo `masmaruf/pramukaupdate` atau diizinkan oleh GitHub App.

Keystatic akan membuat branch dengan prefix `cms/`. Perubahan artikel bisa masuk lewat branch tersebut sebelum digabung ke `main`.

## Troubleshooting cepat

### Error redirect_uri mismatch

Tambahkan callback URL yang sedang dipakai ke GitHub App settings:

```text
http://127.0.0.1:4321/api/keystatic/github/oauth/callback
https://pramukaupdate.id/api/keystatic/github/oauth/callback
```

### Error missing config / env

Pastikan `.env` lokal atau Environment Variables Vercel berisi:

```text
KEYSTATIC_GITHUB_CLIENT_ID
KEYSTATIC_GITHUB_CLIENT_SECRET
KEYSTATIC_SECRET
PUBLIC_KEYSTATIC_GITHUB_APP_SLUG
```

### Tombol login muncul terus

Itu normal jika belum login, cookie hilang, atau env belum valid. Login ulang dengan akun GitHub yang punya akses ke repo.
