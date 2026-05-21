import { collection, config, fields } from "@keystatic/core";

const categories = [
  { label: "Administrasi", value: "Administrasi" },
  { label: "Opini", value: "Opini" },
  { label: "Kritik", value: "Kritik" },
  { label: "Konten Pramuka", value: "Konten Pramuka" },
  { label: "Pembinaan", value: "Pembinaan" },
  { label: "Editorial", value: "Editorial" },
];

const covers = [
  { label: "Administrasi", value: "/covers/administrasi.svg" },
  { label: "Opini", value: "/covers/opini.svg" },
  { label: "Kritik", value: "/covers/kritik.svg" },
  { label: "Konten Pramuka", value: "/covers/konten-pramuka.svg" },
  { label: "Pembinaan", value: "/covers/pembinaan.svg" },
  { label: "Editorial", value: "/covers/editorial.svg" },
];

const productImages = [
  { label: "Administrasi Gugusdepan", value: "/products/administrasi-gugusdepan.svg" },
  { label: "Administrasi Regu", value: "/products/administrasi-regu.svg" },
  { label: "Buku SKU Digital", value: "/products/buku-sku-digital.svg" },
  { label: "Mid Year Reset", value: "/products/mid-year-reset.svg" },
];

export default config({
  storage: {
    kind: "github",
    repo: "masmaruf/pramukaupdate",
    branchPrefix: "cms/",
  },
  ui: {
    brand: { name: "PramukaUpdate CMS" },
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
          label: "Kategori",
          options: categories,
          defaultValue: "Pembinaan",
        }),
        excerpt: fields.text({
          label: "Ringkasan",
          multiline: true,
          validation: { length: { min: 40, max: 180 } },
        }),
        image: fields.select({
          label: "Cover kategori",
          options: covers,
          defaultValue: "/covers/editorial.svg",
        }),
        publishedAt: fields.date({
          label: "Tanggal terbit",
          defaultValue: { kind: "today" },
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
            image: false,
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
        price: fields.text({ label: "Harga", defaultValue: "Rp" }),
        badge: fields.text({ label: "Badge", defaultValue: "" }),
        image: fields.select({
          label: "Gambar produk",
          options: productImages,
          defaultValue: "/products/administrasi-gugusdepan.svg",
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
