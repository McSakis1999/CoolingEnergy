import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

const source = readFileSync(new URL('../src/scripts/consent.js', import.meta.url), 'utf8');
function setup(saved, blocked = false) {
  const elements = new Map();
  const el = id => {
    if (!elements.has(id)) elements.set(id, { hidden: true, dataset: {}, handlers: {}, addEventListener(type, fn) { this.handlers[type] = fn; }, focus() {} });
    return elements.get(id);
  };
  const accept = el('accept'); accept.dataset.consent = 'granted';
  const reject = el('reject'); reject.dataset.consent = 'denied';
  const settings = el('settings');
  const scripts = [], cookies = [], handlers = {};
  let stored = saved, reloaded = false;
  const document = {
    referrer: 'https://example.org/?private=secret',
    getElementById: el,
    querySelectorAll: selector => selector === '[data-consent]' ? [accept, reject] : [settings],
    querySelector: () => settings,
    createElement: () => ({}),
    head: { appendChild: script => scripts.push(script) },
    set cookie(value) { cookies.push(value); },
  };
  const window = { addEventListener: (event, fn) => { handlers[event] = fn; } };
  const localStorage = {
    getItem() { if (blocked) throw Error('blocked'); return stored; },
    setItem(key, value) { if (blocked) throw Error('blocked'); stored = value; },
  };
  runInNewContext(source, { window, document, localStorage, location: { origin: 'https://example.org', hostname: 'example.org', pathname: '/CoolingEnergy/', reload() { reloaded = true; } }, setTimeout() {}, clearTimeout() {} });
  return { el, window, scripts, cookies, accept: () => accept.handlers.click(), reject: () => reject.handlers.click(), settings: () => settings.handlers.click(), stored: () => stored, reloaded: () => reloaded, handlers };
}
const saved = (value, at = Date.now()) => JSON.stringify({ version: 1, value, at });
test('fresh visits make no Google request; reject persists without loading', () => {
  const s = setup(); assert.equal(s.scripts.length, 0); assert.equal(s.el('cookie-consent').hidden, false);
  s.reject(); assert.equal(s.scripts.length, 0); assert.equal(JSON.parse(s.stored()).value, 'denied');
});
test('accept loads correct property once, denies ads and strips URL parameters', () => {
  const s = setup(); s.accept(); s.accept(); assert.equal(s.scripts.length, 1);
  assert.match(s.scripts[0].src, /id=G-X40QXT8D2R$/);
  const commands = s.window.dataLayer.map(args => Array.from(args));
  assert.equal(commands[0][2].analytics_storage, 'denied');
  assert.equal(commands.find(c => c[1] === 'update')[2].ad_user_data, 'denied');
  const config = commands.find(c => c[0] === 'config')[2];
  assert.equal(config.page_location, 'https://example.org/CoolingEnergy/'); assert.equal(config.page_referrer, 'https://example.org/');
});
test('saved acceptance loads; withdrawal disables, clears cookies and reloads', () => {
  const s = setup(saved('granted')); assert.equal(s.scripts.length, 1); s.settings(); assert.equal(s.el('cookie-consent').hidden, false);
  s.reject(); assert.equal(s.window['ga-disable-G-X40QXT8D2R'], true); assert.equal(s.reloaded(), true);
  assert.ok(s.cookies.some(c => c.startsWith('_ga_X40QXT8D2R=;')));
  assert.equal(JSON.parse(s.stored()).value, 'denied');
});
test('denied, expired, malformed and future choices never load Analytics', () => {
  for (const value of [saved('denied'), saved('granted', 0), '{', saved('granted', Date.now() + 999999)]) assert.equal(setup(value).scripts.length, 0);
});
test('blocked storage fails closed and still permits an explicit page choice', () => {
  const s = setup(null, true); assert.equal(s.scripts.length, 0); s.accept(); assert.equal(s.scripts.length, 1); s.reject(); assert.equal(s.window['ga-disable-G-X40QXT8D2R'], true);
});
test('cross-tab clearing revokes an active grant', () => {
  const s = setup(); s.accept(); s.reject(); s.handlers.storage({ key: null }); assert.equal(s.window['ga-disable-G-X40QXT8D2R'], true);
});
