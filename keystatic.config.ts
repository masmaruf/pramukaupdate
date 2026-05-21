import { collection, config, fields, singleton } from "@keystatic/core";

const categories = [
  { label: "Administrasi", value: "Administrasi" },
  { label: "Opini", value: "Opini" },
  { label: "Kritik", value: "Kritik" },
  { label: "Konten Pramuka", value: "Konten Pramuka" },
  { label: "Pembinaan", value: "Pembinaan" },
  { label: "Editorial", value: "Editorial" },
];

const articleTypes = [
  { label: "Berita", value: "Berita" },
  { label: "Opini", value: "Opini" },
  { label: "Panduan", value: "Panduan" },
  { label: "Editorial", value: "Editorial" },
];

const productCategories = [
  { label: "Administrasi", value: "Administrasi" },
  { label: "SKU", value: "SKU" },
  { label: "Program Kerja", value: "Program Kerja" },
  { label: "Evaluasi", value: "Evaluasi" },
  { label: "Pembinaan", value: "Pembinaan" },
];

const sanitizeImageName = (filename: string) =>
  filename
    .toLowerCase()
    .replace(/\.[^/.]+$/, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export default config({
  storage: {
    kind: "github",
    repo: "masmaruf/pramukaupdate",
    branchPrefix: "cms/",
  },
  ui: {
    brand: { name: "PramukaUpdate CMS" },
  },
  singletons: {
    pengaturan: singleton({
      label: "Pengaturan Website",
      path: "src/content/settings/site",
      format: "json",
      entryLayout: "form",
      schema: {
        whatsappNumber: fields.text({
          label: "Nomor WhatsApp",
          description: "Gunakan format lokal atau internasional. Contoh: 0859106516377",
          defaultValue: "0859106516377",
        }),
        whatsappDefaultMessage: fields.text({
          label: "Pesan default WhatsApp",
          multiline: true,
          defaultValue: "Halo PramukaUpdate, saya ingin bertanya.",
        }),
      },
    }),
  },
  collections: {
    artikel: collection({
      label: "Artikel",
      slugField: "title",
      path: "src/content/artikel/*",
      format: { contentField: "content" },
      entryLayout: "content",
      schema: {
        title: fields.slug({
          name: { label: "Judul" },
          slug: { label: "Slug" },
        }),
        category: fields.select({
          label: "Rubrik",
          options: categories,
          defaultValue: "Pembinaan",
        }),
        type: fields.select({
          label: "Label artikel",
          options: articleTypes,
          defaultValue: "Panduan",
        }),
        author: fields.text({
          label: "Penulis / Redaksi",
          defaultValue: "Redaksi PramukaUpdate",
        }),
        excerpt: fields.text({
          label: "Ringkasan",
          multiline: true,
          validation: { length: { min: 40, max: 180 } },
        }),
        image: fields.image({
          label: "Cover artikel",
          description:
            "Upload gambar cover artikel. File disimpan di GitHub pada public/uploads/artikel dan ikut terdeploy ke Vercel.",
          directory: "public/uploads/artikel",
          publicPath: "/uploads/artikel/",
          validation: { isRequired: true },
        }),
        publishedAt: fields.date({
          label: "Tanggal terbit",
          defaultValue: { kind: "today" },
        }),
        updatedAt: fields.date({
          label: "Tanggal update",
          description: "Opsional. Isi jika artikel diperbarui setelah terbit.",
        }),
        readTime: fields.text({
          label: "Waktu baca",
          defaultValue: "5 menit",
        }),
        featured: fields.checkbox({
          label: "Tampilkan sebagai unggulan",
          defaultValue: false,
        }),
        content: fields.mdx({
          label: "Isi artikel",
          extension: "md",
          options: {
            image: {
              directory: "public/uploads/artikel/isi",
              publicPath: "/uploads/artikel/isi/",
              transformFilename: sanitizeImageName,
            },
          },
        }),
      },
    }),
    produk: collection({
      label: "Produk",
      slugField: "title",
      path: "src/content/produk/*",
      format: "yaml",
      entryLayout: "form",
      schema: {
        title: fields.slug({
          name: { label: "Nama produk" },
          slug: { label: "Slug" },
        }),
        category: fields.select({
          label: "Kategori produk",
          options: productCategories,
          defaultValue: "Administrasi",
        }),
        price: fields.text({ label: "Harga", defaultValue: "Rp" }),
        badge: fields.text({ label: "Badge", defaultValue: "" }),
        image: fields.image({
          label: "Gambar produk",
          description:
            "Upload gambar produk berbentuk kotak agar rapi di katalog marketplace. File disimpan di GitHub pada public/uploads/produk.",
          directory: "public/uploads/produk",
          publicPath: "/uploads/produk/",
          validation: { isRequired: true },
        }),
        description: fields.text({
          label: "Deskripsi",
          multiline: true,
          validation: { length: { min: 40, max: 240 } },
        }),
        bestFor: fields.text({ label: "Cocok untuk", multiline: true }),
        format: fields.text({ label: "Format file" }),
        delivery: fields.text({ label: "Pengiriman" }),
        featured: fields.checkbox({ label: "Tampilkan di beranda", defaultValue: false }),
        order: fields.integer({ label: "Urutan", defaultValue: 99 }),
        ctaLabel: fields.text({ label: "Label tombol WhatsApp", defaultValue: "Tanya via WhatsApp" }),
        paymentLabel: fields.text({ label: "Label tombol pembayaran", defaultValue: "Bayar via Formulir.com" }),
        paymentUrl: fields.url({ label: "Link pembayaran Formulir.com" }),
        whatsappUrl: fields.url({ label: "Link WhatsApp" }),
        includes: fields.array(fields.text({ label: "Item paket" }), {
          label: "Isi paket",
          itemLabel: (props) => props.value,
        }),
        previews: fields.array(fields.text({ label: "Preview" }), {
          label: "Preview template",
          itemLabel: (props) => props.value,
        }),
        faq: fields.array(
          fields.object({
            question: fields.text({ label: "Pertanyaan" }),
            answer: fields.text({ label: "Jawaban", multiline: true }),
          }),
          {
            label: "FAQ produk",
            itemLabel: (props) => props.fields.question.value,
          },
        ),
      },
    }),
  },
});
