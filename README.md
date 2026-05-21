# PramukaUpdate

Website Astro untuk PramukaUpdate: media digital Pramuka, artikel editorial, produk digital, kelas, Keystatic CMS, Pagefind search, dan sitemap resmi Astro.

## Local development

```bash
npm install
npm run dev
```

Buka dashboard CMS di:

```text
http://127.0.0.1:4321/keystatic
```

Rute lama `/admin` otomatis diarahkan ke `/keystatic`.

## Build

```bash
npm run build
```

## Keystatic GitHub mode

Keystatic menggunakan repo `masmaruf/pramukaupdate` dan membuat branch konten dengan prefix `cms/`.

Panduan setup lengkap ada di:

```text
docs/keystatic-github-setup.md
```

Environment variables yang diperlukan:

```text
KEYSTATIC_GITHUB_CLIENT_ID=
KEYSTATIC_GITHUB_CLIENT_SECRET=
KEYSTATIC_SECRET=
PUBLIC_KEYSTATIC_GITHUB_APP_SLUG=
```
