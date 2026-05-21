import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const artikel = defineCollection({
  loader: glob({ pattern: ["**/*.md", "**/*.mdx"], base: "./src/content/artikel" }),
  schema: z.object({
    title: z.string(),
    category: z.string(),
    excerpt: z.string(),
    image: z.string(),
    publishedAt: z.date(),
    readTime: z.string(),
    featured: z.boolean().default(false),
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

export const collections = { artikel, produk };
