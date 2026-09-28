import sharp from 'sharp';
import { writeFile } from 'node:fs/promises';

// Preserve the original logo's proportions inside a square favicon canvas.
const logo = await sharp('public/images/logo.png').trim().png().toBuffer();
const square = (size) => sharp(logo).resize(size, size, {
  fit: 'contain',
  background: { r: 255, g: 255, b: 255, alpha: 0 },
}).png().toBuffer();

await writeFile('public/favicon.png', await square(192));
await writeFile('public/apple-touch-icon.png', await square(180));

// ICO supports PNG entries; include common browser and search icon sizes.
const sizes = [16, 32, 48, 256];
const images = await Promise.all(sizes.map(square));
const header = Buffer.alloc(6 + 16 * sizes.length);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);
let offset = header.length;
images.forEach((png, index) => {
  const entry = 6 + index * 16;
  header[entry] = sizes[index] % 256;
  header[entry + 1] = sizes[index] % 256;
  header.writeUInt16LE(1, entry + 4);
  header.writeUInt16LE(32, entry + 6);
  header.writeUInt32LE(png.length, entry + 8);
  header.writeUInt32LE(offset, entry + 12);
  offset += png.length;
});
await writeFile('public/favicon.ico', Buffer.concat([header, ...images]));

// Keep the existing SVG URL branded too, for clients that cached that URL.
const png = await square(192);
await writeFile('public/favicon.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192"><image width="192" height="192" href="data:image/png;base64,${png.toString('base64')}"/></svg>\n`);
