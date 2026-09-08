import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import sharp from 'sharp';
import { socialCards, socialCardForPath } from '../src/data/social.js';

test('page matching supports project paths, root hosting and fallback', () => {
  assert.equal(socialCardForPath('/CoolingEnergy/', '/CoolingEnergy/').id, 'home');
  assert.equal(socialCardForPath('/CoolingEnergy/ypiresies/episkevi-plyntirion/', '/CoolingEnergy').id, 'episkevi-plyntirion');
  assert.equal(socialCardForPath('/faq/', '/').id, 'faq');
  assert.equal(socialCardForPath('/unknown/', '/').id, 'home');
});

test('every built page has a valid large PNG preview and matching metadata', async () => {
  for (const card of socialCards) {
    const html = await readFile(`dist/${card.path ? card.path + '/' : ''}index.html`, 'utf8');
    const match = html.match(/property="og:image" content="([^"]+)"/);
    assert.ok(match, `Missing OG image for ${card.id}`);
    const imageUrl = new URL(match[1]);
    assert.equal(imageUrl.protocol, 'https:');
    assert.ok(imageUrl.pathname.endsWith(`/social/${card.id}.png`));
    assert.ok(html.includes('name="twitter:card" content="summary_large_image"'));
    assert.ok(html.includes(`name="twitter:image" content="${match[1]}"`));
    assert.ok(html.includes('property="og:image:alt"'));
    const image = await readFile(`dist/social/${card.id}.png`);
    const metadata = await sharp(image).metadata();
    assert.equal(metadata.width, 1200);
    assert.equal(metadata.height, 630);
    assert.equal(metadata.format, 'png');
    assert.ok(image.length < 5_000_000);
  }
});
