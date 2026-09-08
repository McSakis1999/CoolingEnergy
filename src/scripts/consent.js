const ID = 'G-X40QXT8D2R';
const KEY = 'coolingenergy-consent-v1';
const TTL = 180 * 24 * 60 * 60 * 1000;
const panel = document.getElementById('cookie-consent');
const close = document.getElementById('consent-close');
let choice = null;
let loaded = false;
let opener;
let expiryTimer;
const denied = { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' };
window.dataLayer = window.dataLayer || [];
window.gtag = function () { window.dataLayer.push(arguments); };
window.gtag('consent', 'default', denied);
window['ga-disable-' + ID] = true;

function readChoice() {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY));
    if (saved?.version === 1 && ['granted', 'denied'].includes(saved.value) && saved.at <= Date.now() && Date.now() - saved.at < TTL) return saved;
  } catch { /* Unavailable storage means no saved consent. */ }
  return null;
}

function clearAnalyticsCookies() {
  const domains = location.hostname.split('.');
  const paths = location.pathname.split('/');
  const cookiePaths = new Set(['/']);
  for (let i = 1; i <= paths.length; i++) {
    const path = paths.slice(0, i).join('/') || '/';
    cookiePaths.add(path); cookiePaths.add(path.replace(/\/$/, '') + '/');
  }
  // Only this property's cookies; other GitHub Pages projects may share the host.
  for (const name of ['_ga', '_ga_X40QXT8D2R']) {
    for (const path of cookiePaths) {
      const removal = `${name}=; Max-Age=0; path=${path}; SameSite=Lax`;
      document.cookie = removal;
      for (let i = 0; i < domains.length - 1; i++) document.cookie = `${removal}; domain=${domains.slice(i).join('.')}`;
    }
  }
}

function apply(saved) {
  choice = saved;
  clearTimeout(expiryTimer);
  if (saved?.value === 'granted') {
    window['ga-disable-' + ID] = false;
    window.gtag('consent', 'update', { ...denied, analytics_storage: 'granted' });
    if (!loaded) {
      loaded = true;
      window.gtag('js', new Date());
      window.gtag('config', ID, {
        allow_google_signals: false,
        allow_ad_personalization_signals: false,
        cookie_expires: 15552000,
        cookie_update: false,
        // Exclude query strings / fragments that might contain contact details.
        page_location: location.origin + location.pathname,
        page_referrer: document.referrer ? document.referrer.split(/[?#]/)[0] : '',
      });
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${ID}`;
      document.head.appendChild(script);
    }
  } else {
    window['ga-disable-' + ID] = true;
    if (loaded) window.gtag('consent', 'update', denied);
    clearAnalyticsCookies();
    // Unload Google's runtime after withdrawal, including automatic listeners.
    if (loaded && readChoice()?.value !== 'granted') { location.reload(); return; }
  }
  panel.hidden = !!saved;
  close.hidden = !saved;
  document.getElementById('consent-status').textContent = saved ? `Τρέχουσα επιλογή: ${saved.value === 'granted' ? 'αποδοχή' : 'απόρριψη'} στατιστικών.` : '';
  if (saved) expiryTimer = setTimeout(() => {
    const remaining = saved.at + TTL - Date.now();
    if (remaining > 0) apply(saved); else apply(null);
  }, Math.min(saved.at + TTL - Date.now(), 2147483647));
}

document.querySelectorAll('[data-cookie-settings]').forEach(button => {
  button.hidden = false;
  button.addEventListener('click', () => { opener = button; panel.hidden = false; panel.focus(); });
});
function dismiss() { if (choice) { panel.hidden = true; opener?.focus(); } }
close.addEventListener('click', dismiss);
panel.addEventListener('keydown', event => { if (event.key === 'Escape') dismiss(); });
document.querySelectorAll('[data-consent]').forEach(button => button.addEventListener('click', () => {
  const saved = { version: 1, value: button.dataset.consent, at: Date.now() };
  try { localStorage.setItem(KEY, JSON.stringify(saved)); } catch { /* Choice applies to this page if storage is blocked. */ }
  apply(saved);
  if (!opener) opener = document.querySelector('[data-cookie-settings]');
  opener?.focus();
}));
window.addEventListener('storage', event => { if (event.key === KEY || event.key === null) apply(readChoice()); });
window.addEventListener('pageshow', event => { if (event.persisted) apply(readChoice()); });
apply(readChoice());
