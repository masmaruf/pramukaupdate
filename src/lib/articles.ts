import type { CollectionEntry } from "astro:content";
import articleMetrics from "../data/article-metrics.json";

type ArticleMetric = {
  views?: number;
  productClicks?: number;
  shares?: number;
};

const metrics = articleMetrics.articles as Record<string, ArticleMetric>;

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

export function getArticleMetric(slug: string): ArticleMetric {
  return metrics[slug] ?? { views: 0, productClicks: 0, shares: 0 };
}

export function hasArticleMetrics() {
  return Object.keys(metrics).length > 0;
}

export function getPopularArticles(articles: CollectionEntry<"artikel">[], limit = 5) {
  return [...articles]
    .sort((a, b) => {
      const viewDiff = (getArticleMetric(b.id).views ?? 0) - (getArticleMetric(a.id).views ?? 0);
      if (viewDiff !== 0) return viewDiff;
      if (a.data.featured !== b.data.featured) return a.data.featured ? -1 : 1;
      return b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf();
    })
    .slice(0, limit);
}
