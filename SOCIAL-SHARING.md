# Social previews

Every current HTML page gets an individual 1200 × 630 PNG card, generated as static files during `npm run build`. No image service, browser JavaScript, cookies, or analytics consent is needed by preview crawlers.

- Card copy and route mapping: `src/data/social.js`.
- Reusable visual layout: `src/utils/renderSocialCard.js`.
- Static image endpoint: `src/pages/social/[id].png.js`.
- Open Graph and X/Twitter metadata: `src/layouts/BaseLayout.astro`.
- Footer native share / copy-link controls: `src/components/SharePage.astro`.

Service names come from `servicesData`. New services automatically receive a card; new non-service pages need an entry in `socialCards`, otherwise they use the homepage image. Keep explicit `lines` short enough for the card. Existing appliance illustrations are decorative service artwork, not customer-job evidence.

The share button uses the device's native share sheet where available. Copy link is also available, with a selectable text fallback when clipboard access is unavailable. Share actions use the canonical public URL, including from localhost; deploy changes before sharing that URL for review.

When moving to your domain, change `site` and `base` in `astro.config.mjs` and rebuild. Absolute preview URLs follow that configuration automatically.

Verify after each relevant change:

```
npm run build
node --test tests/social.test.mjs
```

After deployment, check a public page and its `/social/*.png` image load without authentication. Use Facebook Sharing Debugger or LinkedIn Post Inspector to refresh cached previews when appropriate. Social platforms choose their own presentation, cropping and cache duration; local metadata cannot guarantee an immediate cache refresh. These changes have not been posted to any social account.

Job links currently use `/erga/#job-id`. Fragments share the gallery's preview because crawlers do not receive the fragment. Dedicated job URLs would be needed for individual job-specific preview cards.

Protocol reference: https://ogp.me/
