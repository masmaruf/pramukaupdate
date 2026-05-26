import { getCollection } from "astro:content";
import { getDisplayReadTime } from "../../lib/articles";

export async function GET() {
  const allArticles = await getCollection("artikel");
  const data = allArticles.map(a => ({
    id: a.id,
    title: a.data.title,
    category: a.data.category,
    readTime: getDisplayReadTime(a),
    image: a.data.image,
    excerpt: a.data.excerpt,
    url: `/artikel/${a.id}`,
  }));
  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" }
  });
}
