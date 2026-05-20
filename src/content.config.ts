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

export const collections = { artikel };
