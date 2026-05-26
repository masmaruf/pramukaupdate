import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const artikel = defineCollection({
  loader: glob({ pattern: ["**/*.md", "**/*.mdx"], base: "./src/content/artikel" }),
  schema: z.object({
    title: z.string(),
    category: z.string(),
    type: z.string().default("Panduan"),
    tags: z.array(z.string()).default([]),
    author: z.string().default("Redaksi PramukaUpdate"),
    excerpt: z.string(),
    seoTitle: z.string().optional().default(""),
    seoDescription: z.string().optional().default(""),
    canonicalUrl: z.string().optional().default(""),
    image: z.string(),
    publishedAt: z.date(),
    updatedAt: z.date().nullable().optional(),
    readTime: z.string(),
    featured: z.boolean().default(false),
    series: z.string().nullable().optional(),
    seriesOrder: z.number().nullable().optional(),
  }),
});

const produk = defineCollection({
  loader: glob({ pattern: "**/*.yaml", base: "./src/content/produk" }),
  schema: z.object({
    title: z.string(),
    category: z.string().default("Administrasi"),
    price: z.string(),
    badge: z.string().optional().default(""),
    image: z.string(),
    description: z.string(),
    seoTitle: z.string().optional().default(""),
    seoDescription: z.string().optional().default(""),
    canonicalUrl: z.string().optional().default(""),
    bestFor: z.string(),
    format: z.string(),
    delivery: z.string(),
    featured: z.boolean().default(false),
    order: z.number().default(99),
    ctaLabel: z.string(),
    paymentLabel: z.string(),
    paymentUrl: z.string(),
    whatsappUrl: z.string(),
    includes: z.array(z.string()).default([]),
    previews: z.array(z.string()).default([]),
    faq: z
      .array(
        z.object({
          question: z.string(),
          answer: z.string(),
        }),
      )
      .default([]),
  }),
});

const seri = defineCollection({
  loader: glob({ pattern: "**/*.yaml", base: "./src/content/seri" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional().default(""),
  })
});

const penulis = defineCollection({
  loader: glob({ pattern: "**/*.yaml", base: "./src/content/penulis" }),
  schema: z.object({
    name: z.string(),
    role: z.string().default("Kontributor"),
    bio: z.string(),
    photo: z.string().optional(),
  })
});

export const collections = { artikel, produk, seri, penulis };
