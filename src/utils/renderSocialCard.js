import sharp from 'sharp';
import { resolve } from 'node:path';

const escape = value => value.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' }[char]));
function wrap(title, max = 24) {
  const lines = [];
  for (const word of title.split(/\s+/)) {
    if (!lines.length || (lines.at(-1) + ' ' + word).length > max) lines.push(word);
    else lines[lines.length - 1] += ' ' + word;
  }
  return lines;
}

export async function renderSocialCard(card) {
  const lines = card.lines || wrap(card.title);
  const size = lines.length > 3 ? 46 : 52;
  const lineHeight = size + 12;
  const text = lines.map((line, index) => `<text x="64" y="${252 + index * lineHeight}" font-size="${size}" font-weight="700" fill="${index === lines.length - 1 ? '#8dc5ff' : '#ffffff'}">${escape(line)}</text>`).join('');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
    <defs><linearGradient id="bg" x2="1" y2="1"><stop stop-color="#102d4a"/><stop offset="1" stop-color="#071b2e"/></linearGradient></defs>
    <rect width="1200" height="630" fill="url(#bg)"/>
    <circle cx="1090" cy="70" r="460" fill="none" stroke="#204767" stroke-width="1"/>
    <circle cx="1090" cy="70" r="405" fill="none" stroke="#204767" stroke-width="1"/>
    <rect x="0" y="0" width="10" height="630" fill="#287bee"/>
    <g font-family="Arial, DejaVu Sans, sans-serif">
      <text x="64" y="90" fill="#fff" font-size="38" font-weight="700" letter-spacing="-1.4">Cooling<tspan fill="#77b7ff">Energy</tspan></text>
      <text x="65" y="124" fill="#abc1d7" font-size="15" letter-spacing="3">ΓΙΩΡΓΟΣ ΜΟΥΤΟΣ</text>
      <rect x="64" y="177" width="36" height="3" rx="1.5" fill="#64a9fb"/>
      <text x="113" y="184" fill="#abc9e8" font-size="12" font-weight="700" letter-spacing="1.2">${escape(card.label)}</text>
      ${text}
      <path d="M64 515H646" stroke="#35516b"/>
      <circle cx="73" cy="558" r="6" fill="#71b5ff"/>
      <text x="93" y="565" fill="#edf5ff" font-size="22" font-weight="700">Βόλος &amp; Πήλιο</text>
      <text x="646" y="562" text-anchor="end" fill="#abc1d7" font-size="15">CoolingEnergy</text>
    </g>
  </svg>`;
  const overlays = [];
  if (card.image) {
    const photo = await sharp(resolve(`public/images/services/${card.image}.webp`)).resize(438, 470, { fit: 'cover' }).png().toBuffer();
    overlays.push({ input: photo, left: 710, top: 80 });
  } else {
    for (const [index, name] of ['ac-repair', 'washer-repair', 'fridge-repair', 'oven-repair'].entries()) {
      const photo = await sharp(resolve(`public/images/services/${name}.webp`)).resize(214, 230, { fit: 'cover' }).png().toBuffer();
      overlays.push({ input: photo, left: 710 + (index % 2) * 224, top: 80 + Math.floor(index / 2) * 240 });
    }
  }
  return sharp(Buffer.from(svg)).composite(overlays).png().toBuffer();
}
