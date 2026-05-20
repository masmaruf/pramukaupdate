const whatsappBase = "https://wa.me/";

function productWhatsAppLink(productName: string) {
  const text = encodeURIComponent(
    `Halo PramukaUpdate, saya tertarik dengan ${productName}. Bisa minta info detail dan cara belinya?`,
  );

  return `${whatsappBase}?text=${text}`;
}

export const navItems = [
  { label: "Beranda", href: "/" },
  { label: "Artikel", href: "/artikel" },
  { label: "Produk", href: "/produk" },
  { label: "Kelas", href: "/kelas" },
  { label: "About", href: "/about" },
];

export const products = [
  {
    id: "administrasi-gugusdepan",
    title: "Template Administrasi Gugusdepan",
    price: "Rp49.000",
    badge: "Best seller",
    image: "/products/administrasi-gugusdepan.svg",
    description:
      "Set dokumen administrasi siap edit untuk pembina dan pengurus gugusdepan agar surat, program, keuangan, dan evaluasi lebih tertata.",
    bestFor: "Pembina, mabigus, sekretaris gugusdepan, dan pengurus satuan yang ingin punya sistem kerja rapi.",
    format: "Google Docs, Google Sheets, PDF, dan versi cetak A4",
    delivery: "Link akses dikirim setelah konfirmasi pembayaran",
    includes: [
      "Template program kerja tahunan dan semester",
      "Format proposal kegiatan dan laporan pertanggungjawaban",
      "Rekap presensi, iuran, inventaris, dan arsip surat",
      "Template evaluasi kegiatan dan catatan tindak lanjut",
      "Panduan penggunaan singkat untuk pembina baru",
    ],
    previews: [
      "Dashboard ringkas kondisi administrasi gugusdepan",
      "Halaman proposal kegiatan dengan struktur siap isi",
      "Sheet inventaris dan presensi yang mudah difilter",
    ],
    faq: [
      {
        question: "Apakah bisa diedit sesuai nama gugusdepan?",
        answer: "Bisa. Semua file dibuat agar mudah diganti nama sekolah, nomor gudep, logo, dan struktur pengurus.",
      },
      {
        question: "Cocok untuk gudep sekolah dasar sampai SMA?",
        answer: "Cocok. Isinya dibuat umum, lalu bisa disesuaikan dengan tingkat Siaga, Penggalang, Penegak, atau Pandega.",
      },
    ],
    ctaLabel: "Beli template gudep",
    whatsappUrl: productWhatsAppLink("Template Administrasi Gugusdepan"),
  },
  {
    id: "administrasi-regu",
    title: "Template Administrasi Regu",
    price: "Rp29.000",
    image: "/products/administrasi-regu.svg",
    description:
      "Logbook, presensi, iuran, pembagian tugas, dan catatan latihan yang praktis dipakai pemimpin regu tanpa terasa terlalu formal.",
    bestFor: "Pemimpin regu, pratama, dewan penggalang, dan pembina yang ingin melatih tanggung jawab kecil secara konsisten.",
    format: "Google Sheets, PDF cetak, dan panduan penggunaan",
    delivery: "Link akses dikirim setelah konfirmasi pembayaran",
    includes: [
      "Logbook latihan mingguan regu",
      "Presensi anggota dan catatan keaktifan",
      "Tracker iuran serta kebutuhan perlengkapan",
      "Template pembagian tugas piket dan kegiatan",
      "Catatan evaluasi singkat untuk pemimpin regu",
    ],
    previews: [
      "Tampilan logbook satu halaman per latihan",
      "Sheet iuran sederhana dengan status pembayaran",
      "Kartu tugas regu siap cetak",
    ],
    faq: [
      {
        question: "Apakah anak-anak bisa menggunakannya sendiri?",
        answer: "Bisa, karena bahasanya sengaja dibuat sederhana. Pembina tetap bisa mendampingi di awal.",
      },
      {
        question: "Apakah perlu aplikasi khusus?",
        answer: "Tidak. Cukup Google Sheets atau file PDF untuk dicetak.",
      },
    ],
    ctaLabel: "Beli template regu",
    whatsappUrl: productWhatsAppLink("Template Administrasi Regu"),
  },
  {
    id: "buku-sku-digital",
    title: "Template Buku SKU Digital",
    price: "Rp35.000",
    badge: "Baru",
    image: "/products/buku-sku-digital.svg",
    description:
      "Tracker interaktif pencapaian SKU agar pembina lebih mudah memantau progres anggota, catatan uji, dan kebutuhan pendampingan.",
    bestFor: "Pembina dan dewan satuan yang ingin memantau pencapaian SKU tanpa tercecer di banyak catatan manual.",
    format: "Google Sheets dan PDF ringkasan progres",
    delivery: "Link akses dikirim setelah konfirmasi pembayaran",
    includes: [
      "Tracker capaian SKU per anggota",
      "Status uji: belum, proses, perlu ulang, dan selesai",
      "Kolom catatan pembina dan tanggal pengujian",
      "Ringkasan progres satuan otomatis",
      "Panduan duplikasi file untuk tiap angkatan",
    ],
    previews: [
      "Dashboard progres SKU per anggota",
      "Tabel pengujian dengan status warna",
      "Ringkasan anggota yang butuh pendampingan lanjutan",
    ],
    faq: [
      {
        question: "Apakah ini menggantikan buku SKU resmi?",
        answer: "Tidak. Template ini alat bantu pemantauan, sementara ketentuan resmi tetap mengikuti aturan satuan dan kwartir.",
      },
      {
        question: "Bisa dipakai untuk banyak anggota?",
        answer: "Bisa. File bisa diduplikasi dan disesuaikan untuk kebutuhan satu regu, kelas, atau satuan.",
      },
    ],
    ctaLabel: "Beli tracker SKU",
    whatsappUrl: productWhatsAppLink("Template Buku SKU Digital"),
  },
  {
    id: "mid-year-reset-2026",
    title: "Template Mid Year Reset 2026",
    price: "Rp25.000",
    image: "/products/mid-year-reset.svg",
    description:
      "Panduan evaluasi semester dan perencanaan ulang untuk ambalan, racana, atau pengurus yang ingin memperbaiki arah sebelum tahun berjalan habis.",
    bestFor: "Ambalan, racana, dewan kerja, dan tim kecil yang perlu jeda evaluasi tanpa rapat yang melebar ke mana-mana.",
    format: "Notion-style worksheet, PDF, dan Google Docs",
    delivery: "Link akses dikirim setelah konfirmasi pembayaran",
    includes: [
      "Worksheet evaluasi kegiatan semester berjalan",
      "Pemetaan program yang lanjut, berhenti, atau diperbaiki",
      "Template prioritas 90 hari berikutnya",
      "Panduan refleksi tim dan pembagian peran",
      "Checklist komunikasi hasil evaluasi ke anggota",
    ],
    previews: [
      "Halaman refleksi semester yang dipandu pertanyaan",
      "Matriks prioritas program 90 hari",
      "Template keputusan rapat yang ringkas",
    ],
    faq: [
      {
        question: "Apakah cocok untuk organisasi selain Pramuka?",
        answer: "Bisa, tetapi contoh dan bahasanya dibuat dekat dengan kebutuhan satuan Pramuka.",
      },
      {
        question: "Apakah ini materi kelas atau template?",
        answer: "Ini template kerja. Bisa langsung dipakai untuk rapat evaluasi internal.",
      },
    ],
    ctaLabel: "Beli reset kit",
    whatsappUrl: productWhatsAppLink("Template Mid Year Reset 2026"),
  },
];

export const curriculum = [
  "Dasar suara editorial dan positioning akun",
  "Copywriting untuk caption, carousel, dan ajakan aksi",
  "Sistem visual sederhana yang tetap terasa khas",
  "Riset ide, kalender konten, dan produksi batch",
  "Membaca metrik tanpa kehilangan jiwa komunitas",
];
