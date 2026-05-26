import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import sharp from "sharp";

function escapeHtml(value: string) {
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

function renderOgSvg({ title, category, excerpt }: { title: string; category: string; excerpt: string }) {
  const titleLines = wrapText(title, 28).slice(0, 3);
  const excerptLines = wrapText(excerpt, 58).slice(0, 2);
  const titleY = 244;
  const excerptY = titleY + titleLines.length * 72 + 34;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#240046"/>
  <rect x="0" y="0" width="1200" height="18" fill="#C62828"/>
  <rect x="0" y="18" width="1200" height="18" fill="#FFFFFF"/>
  <circle cx="1060" cy="90" r="240" fill="#FF9100" fill-opacity="0.18"/>
  <circle cx="116" cy="574" r="292" fill="#7B2CBF" fill-opacity="0.26"/>
  <path d="M892 424L1032 284L1124 376" stroke="#FF9100" stroke-width="24" stroke-linecap="round" stroke-linejoin="round" opacity="0.72"/>
  <path d="M926 472H1108" stroke="#FFF4DD" stroke-width="14" stroke-linecap="round" opacity="0.35"/>
  <rect x="72" y="76" width="1056" height="484" rx="42" fill="#FFF4DD" fill-opacity="0.075" stroke="#FF9100" stroke-opacity="0.4" stroke-width="2"/>
  <text x="104" y="130" fill="#FF9100" font-family="Arial, sans-serif" font-size="28" font-weight="800" letter-spacing="5">PRAMUKAUPDATE</text>
  <text x="820" y="130" fill="#FFF4DD" font-family="Arial, sans-serif" font-size="22" font-weight="700">Scouts for the Future</text>
  <rect x="104" y="162" width="${Math.min(450, 120 + category.length * 16)}" height="46" rx="23" fill="#FFF4DD"/>
  <text x="128" y="193" fill="#240046" font-family="Arial, sans-serif" font-size="20" font-weight="700">${escapeHtml(category)}</text>
  ${titleLines
    .map(
      (line, index) =>
        `<text x="104" y="${titleY + index * 72}" fill="#F8F5EA" font-family="Arial, sans-serif" font-size="58" font-weight="800" letter-spacing="-2">${escapeHtml(line)}</text>`,
    )
    .join("\n  ")}
  ${excerptLines
    .map(
      (line, index) =>
        `<text x="108" y="${excerptY + index * 34}" fill="#FFE9CC" font-family="Arial, sans-serif" font-size="26" font-weight="400">${escapeHtml(line)}</text>`,
    )
    .join("\n  ")}
  <text x="104" y="520" fill="#FF9100" font-family="Arial, sans-serif" font-size="22" font-weight="700">pramukaupdate.id</text>
  <rect x="104" y="542" width="180" height="7" rx="3.5" fill="#C62828"/>
  <rect x="292" y="542" width="180" height="7" rx="3.5" fill="#FFFFFF" fill-opacity="0.86"/>
</svg>`;
}

export async function getStaticPaths() {
  const articles = await getCollection("artikel");
  return articles.map((article) => ({
    params: { slug: article.id },
    props: { article },
  }));
}

export const GET: APIRoute = async ({ props }) => {
  const { article } = props;
  const svgString = renderOgSvg({
    title: article.data.title,
    category: article.data.category,
    excerpt: article.data.excerpt,
  });

  const pngBuffer = await sharp(Buffer.from(svgString))
    .png({ compressionLevel: 8, quality: 90 })
    .toBuffer();

  return new Response(pngBuffer, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
};
