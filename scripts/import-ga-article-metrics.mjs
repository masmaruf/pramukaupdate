import fs from "node:fs";
import path from "node:path";

const input = process.argv[2];
const output = path.join(process.cwd(), "src/data/article-metrics.json");

if (!input) {
  console.error("Pakai: node scripts/import-ga-article-metrics.mjs path/to/ga-pages.csv");
  process.exit(1);
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let value = "";
  let quoted = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];

    if (quoted && char === '"' && next === '"') {
      value += '"';
      i += 1;
      continue;
    }

    if (char === '"') {
      quoted = !quoted;
      continue;
    }

    if (!quoted && char === ',') {
      row.push(value);
      value = "";
      continue;
    }

    if (!quoted && (char === "\n" || char === "\r")) {
      if (char === "\r" && next === "\n") i += 1;
      row.push(value);
      if (row.some(Boolean)) rows.push(row);
      row = [];
      value = "";
      continue;
    }

    value += char;
  }

  row.push(value);
  if (row.some(Boolean)) rows.push(row);
  return rows;
}

const csv = fs.readFileSync(path.resolve(input), "utf8");
const rows = parseCsv(csv);
const headers = rows.shift()?.map((header) => header.trim().toLowerCase()) ?? [];

const pathIndex = headers.findIndex((header) => ["page path", "page path + query string", "landing page", "page location"].includes(header));
const viewsIndex = headers.findIndex((header) => ["views", "screen page views", "event count", "sessions"].includes(header));

if (pathIndex === -1 || viewsIndex === -1) {
  console.error("CSV perlu kolom Page path/Page location dan Views/Screen page views/Sessions dari Google Analytics.");
  process.exit(1);
}

const articles = {};
for (const row of rows) {
  const rawPath = row[pathIndex] ?? "";
  const views = Number(String(row[viewsIndex] ?? "0").replace(/[^0-9.]/g, ""));
  let pathname = rawPath;

  try {
    pathname = new URL(rawPath).pathname;
  } catch {
    pathname = rawPath.split("?")[0];
  }

  const match = pathname.match(/^\/artikel\/([^/]+)\/?$/);
  if (!match || !views) continue;

  const slug = decodeURIComponent(match[1]);
  articles[slug] = {
    ...(articles[slug] ?? {}),
    views: ((articles[slug]?.views ?? 0) + views),
  };
}

fs.writeFileSync(
  output,
  `${JSON.stringify({ updatedAt: new Date().toISOString(), source: "google-analytics-export", articles }, null, 2)}\n`,
);

console.log(`Berhasil menyimpan ${Object.keys(articles).length} metrik artikel ke ${output}`);
