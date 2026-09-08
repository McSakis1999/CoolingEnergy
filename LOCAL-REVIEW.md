# CoolingEnergy local draft

This revision is in the original Desktop project. No deployment or push was performed.

## Preview

- URL: http://localhost:4321/CoolingEnergy/
- Start: `astro dev --background`
- Manage: `astro dev status`, `astro dev logs`, `astro dev stop`
- Build: `npm run build`

The sandbox's system npm launcher could not access its nvm directory. Validation used the bundled Node executable with `node node_modules/astro/bin/astro.mjs build` and `ASTRO_TELEMETRY_DISABLED=1`, without changing dependencies.

## Content configuration

- `src/data/services.js`: six published service definitions, with distinct symptoms, indicative scope, preparation, cost factors and FAQs.
- `src/pages/ypiresies/[slug].astro`: generates six static pages.
- `src/data/businessInfo.js`: contact fields remain empty. Only enter details confirmed by the owner.
- Contact submission is intentionally disabled; enabling it requires a separately configured and reviewed submission flow. Filling contact details alone does not enable the form.
- Provisional air-conditioner removal/transport is stored separately and excluded from routes, cards and sitemap. Confirm the service and write full content before adding it to the public service list.
- `src/utils/urls.js`: shared base-path and absolute URL helpers. Hosting remains compatible with `/CoolingEnergy/`.

## Confirm before launch

Phone, email, Viber, business address if public, hours, credentials, supported brands/models, exact service procedures, covered villages, travel charges and pricing. No reviews, arrival-time promises or guarantees are asserted. The existing brand assets are retained; decorative appliance artwork is CSS, not a claimed project photo.

`robots.txt` references the existing GitHub Pages address. If the hosting site/base changes later, update that sitemap URL as well. The sitemap itself is generated from the configured site and the six services.

## Validation

Production build passed: seven HTML pages and sitemap. Checked 153 local asset/link references and their target anchors with no missing targets; verified JSON-LD parses, one H1 per page and no unconfigured contact links. Browser review covered desktop/mobile homepage, mobile navigation, direct service URLs, FAQ expansion and disabled contact inputs. No browser console errors were observed during the check.

## September 7 expansion

Added fridge and electric cooker/oven/hob repair pages (eight services total), a /faq/ page with 29 questions, and a /perioxes/ coverage directory. All villages receive equal treatment: there is no dedicated Agios Ioannis section or route. The coverage lists are visible in expandable homepage groups and the directory, and also populate Organization areaServed data. Coverage and travel terms remain subject to confirmation; no fake branch addresses are created.

Restored the nine-brand continuous carousel with a pause button and reduced-motion support. Logos do not imply authorized service. Added a three-card gallery for the owner, team and work; real photos must be supplied. Configure src/data/gallery.js with paths relative to public, accurate alt text and captions.

Validation for this expansion: production build succeeded (11 pages), 332 local link/asset references and anchors passed, JSON-LD parses, and all pages have a single H1 and unique titles. No browser interaction testing performed for this expansion. Existing contact details remain empty and submission remains disabled. Changes are local; no push or deployment performed.

## Carousel repair

The running dev server served current Brands markup with a stale stylesheet containing only the former animate-marquee rules. Restarting via astro dev stop / astro dev --background restored the current CSS and script. If future edits appear partially applied, inspect the served component stylesheet and restart the background server before assuming a source regression.

Carousel improvements: eager logo loading avoids empty incoming tiles; non-shrinking sets/cards retain the exact loop width; a 1600px viewport cap keeps one 1710px brand set wider than the visible strip. Browser verification confirmed running animation, stable position while paused, resumed movement, all 18 original/duplicate images loaded, and no page overflow at 390px and 1920px. Production build passed (11 pages). Local only.

## People and work pages

Homepage gallery cards link to /giorgos-moutos/, /omada/ and /erga/. Shared PeopleLayout provides breadcrumbs and cross-navigation. Edit src/data/peopleAndWork.js to supply approved biography paragraphs, profile photo, named team members and real project records with image arrays/captions. Empty collections show honest coming-soon content; no credentials, biographies or completed jobs are invented. All three routes are in the sitemap. Build passed (14 pages); three routes return HTTP 200 with one H1 and verified homepage links/sitemap entries. Changes remain local.
