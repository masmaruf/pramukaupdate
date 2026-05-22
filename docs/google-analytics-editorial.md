# Statistik artikel dari Google Analytics

Website sudah mengirim event ke Google Analytics jika `PUBLIC_GA_MEASUREMENT_ID` diisi di Vercel.

## Cara menghidupkan artikel populer berbasis data nyata

1. Buka Google Analytics 4.
2. Masuk ke **Reports → Engagement → Pages and screens**.
3. Filter halaman yang mengandung `/artikel/`.
4. Export CSV.
5. Jalankan lokal:

```bash
node scripts/import-ga-article-metrics.mjs path/ke/export-ga.csv
```

Script akan memperbarui `src/data/article-metrics.json`. Setelah commit dan deploy, blok “Artikel populer” akan memakai angka views dari Google Analytics.

## Event yang dikirim

- `content_view`
- `article_product_click`
- `article_share_click`
- `product_payment_click`
- `product_detail_click`

Event ini bisa dipakai untuk membaca artikel mana yang benar-benar menarik, artikel mana yang mendorong klik produk, dan kanal share mana yang bekerja.
