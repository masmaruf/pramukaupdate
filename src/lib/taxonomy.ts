import type { CollectionEntry } from "astro:content";

export type ArticleEntry = CollectionEntry<"artikel">;

export function taxonomySlug(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, "dan")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const tagSlug = taxonomySlug;
export const authorSlug = taxonomySlug;

function increment(map: Map<string, { label: string; slug: string; count: number }>, label: string, slug: string) {
  const current = map.get(slug);
  map.set(slug, {
    label: current?.label ?? label,
    slug,
    count: (current?.count ?? 0) + 1,
  });
}

export function getTags(articles: ArticleEntry[]) {
  const map = new Map<string, { label: string; slug: string; count: number }>();

  for (const article of articles) {
    for (const tag of article.data.tags ?? []) {
      const label = tag.trim();
      if (!label) continue;
      increment(map, label, tagSlug(label));
    }
  }

  return [...map.values()].sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
}

export function getAuthors(articles: ArticleEntry[]) {
  const map = new Map<string, { label: string; slug: string; count: number }>();

  for (const article of articles) {
    const label = article.data.author || "Redaksi PramukaUpdate";
    increment(map, label, authorSlug(label));
  }

  return [...map.values()].sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
}

export function getArchiveMonths(articles: ArticleEntry[]) {
  const map = new Map<string, { year: string; month: string; slug: string; label: string; count: number }>();

  for (const article of articles) {
    const date = article.data.publishedAt;
    const year = String(date.getFullYear());
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const slug = `${year}/${month}`;
    const label = date.toLocaleDateString("id-ID", { month: "long", year: "numeric" });
    const current = map.get(slug);

    map.set(slug, {
      year,
      month,
      slug,
      label,
      count: (current?.count ?? 0) + 1,
    });
  }

  return [...map.values()].sort((a, b) => b.slug.localeCompare(a.slug));
}

export function getArchiveYears(articles: ArticleEntry[]) {
  const map = new Map<string, { year: string; label: string; count: number }>();

  for (const article of articles) {
    const year = String(article.data.publishedAt.getFullYear());
    const current = map.get(year);
    map.set(year, {
      year,
      label: year,
      count: (current?.count ?? 0) + 1,
    });
  }

  return [...map.values()].sort((a, b) => b.year.localeCompare(a.year));
}
