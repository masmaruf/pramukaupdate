import type { CollectionEntry } from "astro:content";

export function estimateReadTime(article: CollectionEntry<"artikel">) {
  const raw = `${article.body ?? ""} ${article.data.excerpt ?? ""}`;
  const words = raw
    .replace(/[#*_>`~[\]()]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} menit`;
}

export function getDisplayReadTime(article: CollectionEntry<"artikel">) {
  return estimateReadTime(article) || article.data.readTime;
}

export function getPopularArticles(articles: CollectionEntry<"artikel">[], limit = 5) {
  const featured = articles.filter((article) => article.data.featured);
  const rest = articles.filter((article) => !article.data.featured);
  return [...featured, ...rest].slice(0, limit);
}
