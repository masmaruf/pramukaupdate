# Upload gambar di Keystatic

PramukaUpdate memakai penyimpanan gambar berbasis GitHub repository.

## Lokasi upload

- Cover artikel: `public/uploads/artikel`
- Gambar di dalam isi artikel: `public/uploads/artikel/isi`
- Gambar produk: `public/uploads/produk`

Saat editor mengunggah gambar dari `/keystatic`, Keystatic akan menyimpan file ke branch CMS di GitHub. Setelah perubahan dipublish/merge dan Vercel redeploy, gambar bisa diakses sebagai URL publik seperti:

- `/uploads/artikel/nama-gambar.jpg`
- `/uploads/produk/nama-gambar.png`

## Rekomendasi ukuran

- Cover artikel: rasio 16:9, minimal 1200 × 675 px.
- Gambar produk marketplace: rasio 1:1, minimal 1000 × 1000 px.
- Kompres gambar sebelum upload agar halaman tetap cepat.

## Catatan Cloudinary

Cloudinary belum dipakai supaya alur CMS tetap sederhana. Jika nanti jumlah gambar besar atau perlu transformasi otomatis, Cloudinary bisa ditambahkan sebagai tahap berikutnya.
