import type { CollectionEntry } from "astro:content";

export function rubricSlug(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "dan")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getRubrics(articles: CollectionEntry<"artikel">[]) {
  const map = new Map<string, { label: string; slug: string; count: number }>();

  for (const article of articles) {
    const label = article.data.category;
    const slug = rubricSlug(label);
    const current = map.get(slug);

    map.set(slug, {
      label,
      slug,
      count: (current?.count ?? 0) + 1,
    });
  }

  return [...map.values()].sort((a, b) => a.label.localeCompare(b.label));
}
