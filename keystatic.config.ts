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
  },
});
