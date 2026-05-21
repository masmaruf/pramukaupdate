import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function wrapText(value: string, maxChars: number) {
  const words = value.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > maxChars && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }

  if (current) lines.push(current);
  return lines;
}

function renderOgImage({ title, category, excerpt }: { title: string; category: string; excerpt: string }) {
  const titleLines = wrapText(title, 28).slice(0, 3);
  const excerptLines = wrapText(excerpt, 58).slice(0, 2);
  const titleY = 244;
  const excerptY = titleY + titleLines.length * 72 + 34;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#012D1D"/>
  <circle cx="1060" cy="80" r="230" fill="#AEEECB" fill-opacity="0.18"/>
  <circle cx="130" cy="570" r="270" fill="#F5C542" fill-opacity="0.15"/>
  <path d="M900 420L1030 290L1110 368" stroke="#AEEECB" stroke-width="24" stroke-linecap="round" stroke-linejoin="round" opacity="0.74"/>
  <rect x="72" y="70" width="1056" height="490" rx="42" fill="#F8F5EA" fill-opacity="0.07" stroke="#AEEECB" stroke-opacity="0.38" stroke-width="2"/>
  <text x="104" y="128" fill="#AEEECB" font-family="Arial, sans-serif" font-size="28" font-weight="700" letter-spacing="5">PRAMUKAUPDATE</text>
  <rect x="104" y="162" width="${Math.min(450, 120 + category.length * 16)}" height="46" rx="23" fill="#AEEECB"/>
  <text x="128" y="193" fill="#012D1D" font-family="Arial, sans-serif" font-size="20" font-weight="700">${escapeXml(category)}</text>
  ${titleLines
    .map(
      (line, index) =>
        `<text x="104" y="${titleY + index * 72}" fill="#F8F5EA" font-family="Arial, sans-serif" font-size="58" font-weight="800" letter-spacing="-2">${escapeXml(line)}</text>`,
    )
    .join("\n  ")}
  ${excerptLines
    .map(
      (line, index) =>
        `<text x="108" y="${excerptY + index * 34}" fill="#DCE7DF" font-family="Arial, sans-serif" font-size="26" font-weight="400">${escapeXml(line)}</text>`,
    )
    .join("\n  ")}
  <text x="104" y="520" fill="#AEEECB" font-family="Arial, sans-serif" font-size="22" font-weight="700">pramukaupdate.id</text>
</svg>`;
}

export async function getStaticPaths() {
  const articles = await getCollection("artikel");
  return articles.map((article) => ({
    params: { slug: article.id },
    props: { article },
  }));
}

export const GET: APIRoute = ({ props }) => {
  const { article } = props;
  return new Response(
    renderOgImage({
      title: article.data.title,
      category: article.data.category,
      excerpt: article.data.excerpt,
    }),
    {
      headers: {
        "Content-Type": "image/svg+xml; charset=utf-8",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    },
  );
};
