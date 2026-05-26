import sharp from "sharp";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const svgContent = readFileSync(join(process.cwd(), "public/og-default.svg"), "utf-8");
const pngBuffer = await sharp(Buffer.from(svgContent))
  .png({ compressionLevel: 8 })
  .toBuffer();

writeFileSync(join(process.cwd(), "public/og-default.png"), pngBuffer);
console.log("✓ og-default.png created successfully");
