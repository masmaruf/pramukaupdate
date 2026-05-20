import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel/serverless";
import keystatic from "@keystatic/astro";

export default defineConfig({
  site: "https://pramukaupdate.id",
  output: "hybrid",
  adapter: vercel(),
  integrations: [mdx(), react(), sitemap(), keystatic()],
  image: {
    domains: ["lh3.googleusercontent.com", "images.unsplash.com"],
  },
});
