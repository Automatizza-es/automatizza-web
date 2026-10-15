import { mkdir, writeFile } from "node:fs/promises";
import sharp from "sharp";

// Extract the original logo's zz; do not recreate it from text or new paths.
const { data, info } = await sharp("public/brand/automatizza-logo.png")
  .extract({ left: 1428, top: 22, width: 271, height: 237 })
  .ensureAlpha().raw().toBuffer({ resolveWithObject: true });
for (let index = 0; index < data.length; index += 4) {
  const isSymbol = data[index + 2] - data[index] > 40 && data[index + 1] - data[index] > 15;
  if (!isSymbol) data[index + 3] = 0;
  data[index] = 2;
  data[index + 1] = 160;
  data[index + 2] = 252;
}
const symbol = await sharp(data, { raw: info }).png().toBuffer();
const navy = "#02135F";

async function icon(size, padding) {
  const mark = await sharp(symbol).resize({ width: size - padding * 2 }).png().toBuffer();
  const { width, height } = await sharp(mark).metadata();
  return sharp({ create: { width: size, height: size, channels: 4, background: navy } })
    .composite([{ input: mark, left: Math.floor((size - width) / 2), top: Math.floor((size - height) / 2) }])
    .png().toBuffer();
}

await mkdir("public/icons", { recursive: true });
const sizes = [16, 32, 48];
const faviconFrames = await Promise.all(sizes.map((size) => icon(size, Math.max(1, Math.round(size * .08)))));
// ICO supports embedded PNG frames. Include real 16/32/48 px images.
const directory = Buffer.alloc(6 + sizes.length * 16);
directory.writeUInt16LE(1, 2);
directory.writeUInt16LE(sizes.length, 4);
let offset = directory.length;
for (const [index, frame] of faviconFrames.entries()) {
  const entry = 6 + index * 16;
  directory[entry] = sizes[index];
  directory[entry + 1] = sizes[index];
  directory.writeUInt16LE(1, entry + 4);
  directory.writeUInt16LE(32, entry + 6);
  directory.writeUInt32LE(frame.length, entry + 8);
  directory.writeUInt32LE(offset, entry + 12);
  offset += frame.length;
}
await writeFile("src/app/favicon.ico", Buffer.concat([directory, ...faviconFrames]));
await writeFile("src/app/icon1.png", faviconFrames[0]);
await writeFile("src/app/icon2.png", faviconFrames[1]);
await writeFile("src/app/apple-icon.png", await icon(180, 24));
await writeFile("public/icons/icon-192.png", await icon(192, 25));
await writeFile("public/icons/icon-512.png", await icon(512, 66));
// Keep the entire mark inside the central 80% diameter safe circle.
await writeFile("public/icons/icon-maskable-512.png", await icon(512, 104));
console.log("Brand icons generated from the original logo.");
