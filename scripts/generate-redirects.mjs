import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const settingsPath = "src/content/settings/site.json";
const outputPath = "dist/client/_redirects";

const settings = JSON.parse(await readFile(settingsPath, "utf8"));
const redirects = Array.isArray(settings.redirects) ? settings.redirects : [];

const lines = redirects
  .filter((item) => item?.from && item?.to)
  .map((item) => `${item.from} ${item.to} ${item.status || "301"}`);

await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, `${lines.join("\n")}${lines.length ? "\n" : ""}`);

console.log(`Generated ${join(process.cwd(), outputPath)} with ${lines.length} redirect(s).`);

