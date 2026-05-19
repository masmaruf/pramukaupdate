import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://pramukaupdate.id",
  integrations: [mdx(), sitemap()],
  image: {
    domains: ["lh3.googleusercontent.com", "images.unsplash.com"],
  },
});
