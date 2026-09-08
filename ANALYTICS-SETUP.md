# Google Analytics and privacy setup

Property: `G-X40QXT8D2R`. Shared layout includes a Greek consent banner and footer settings on every page. Basic consent: no Google tag is requested until analytics consent is granted. Advertising consent remains denied. Choices expire after 180 days; withdrawal disables the property, removes its accessible cookies and reloads to unload the runtime. If browser storage cannot persist a withdrawal, the current page stays disabled instead of reloading into an old grant.

Before publishing the final privacy notice:

- Confirm the legal controller identity and supply a privacy contact email and address in `src/data/businessInfo.js`.
- In GA Admin, confirm the web stream URL, choose the event/user data retention period (prefer the minimum needed), and replace the unconfirmed retention paragraph in `src/pages/privacy.astro` with the actual setting.
- Review Enhanced Measurement; disable form interactions, site search and any events that could capture personal data. The code sanitizes page-view URLs, but account-controlled automatic events need their own review.
- Keep Google Signals, advertising features and unnecessary account data sharing off. Confirm the applicable Google data processing terms and international transfer safeguards, and the hosting provider's retention practices.
- After deployment, use Tag Assistant / GA Realtime to verify an accepted visit reaches this property. No account access or live ingestion verification has been performed here.

Verification: `node --test tests/consent.test.mjs` and `npm run build`. Browser acceptance check: fresh visit makes no requests to Google Analytics / Tag Manager; reject and navigate; accept and navigate; reopen footer settings and reject; verify tracking cookies are removed. Check narrow screens and keyboard navigation.

References: https://developers.google.com/tag-platform/security/guides/consent and https://www.cnil.fr/fr/cookies-et-autres-traceurs/que-dit-la-loi
