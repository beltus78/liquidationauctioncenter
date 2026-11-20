# Notes for AI agents
- Plain Cloudflare Worker, no framework. Pages: `src/pages.ts`; layout and lot card: `src/html.ts`; routing, forms, emails: `src/index.ts`.
- UI text lives in `src/strings/{en,fr,es}.ts` (same keys in all three — `en.ts` exports the type). Long copy: `src/content.ts`.
- Catalog data is generated: edit `tools/lots.py`, run `python3 tools/build-data.py` → `src/data-lots.json`. Lot images: `public/lots/{slug}-sm.webp|-md.webp`.
- Lot names and descriptions must stay different from the owner's other pallet sites (Best Liquidation Center, Liquidation Pallets Wholesales, Wholesale Pallets Liquidators).
- Scroll animations: `public/motion.js` + the motion block at the end of `public/styles.css` (data-story / data-chap / data-fly / data-split / data-stagger / data-reveal / data-count).
- Payment rules exist in three places — keep them in sync: `src/catalog.ts` (allowedPay), `public/app.js`, `migrations` CHECK.
- Never put payment account details in page HTML; they belong in `src/payments.ts` (emails only).
- Run `npm run check` before committing. Bump `?v=` on styles.css/app.js in `src/html.ts` after changing them.

## SEO (automated tasks run on this repo)
- Deploys from `main` (Cloudflare Workers Builds). There is no `cloudflare` branch here.
- Buyer guides: `src/guides.ts` (format notes at the top). English only, at `/en/guides/<slug>`. Internal links in guide bodies are written without the language prefix. New guides: append to `GUIDES` with `published: "YYYY-MM-DD"`.
- Real internal URLs (prefix /en, /fr or /es): `/`, `/lots`, `/lots/<cat>` (cats in `src/catalog.ts` CATS), `/lots?type=casepack|gaylord|pallet|truckload`, `/lot/<slug>` (slugs in `src/data-lots.json`), `/truckloads`, `/how-it-works`, `/shipping`, `/returns`, `/faq`, `/about`, `/contact`, `/usa`, `/canada`, `/order-list?mode=quote`, `/guides`.
- Sitemaps: `/sitemap.xml` → `/sitemap-{en,fr,es}.xml` (guides only in `sitemap-en.xml`). Filtered listing views are noindex on purpose.
- Log every SEO change in `seo/log.md`. IndexNow key: `56798b12585e43048e92d02c341c7e41` (file in `public/`).
- Never: prices in guide text, guaranteed lot contents/condition, fake reviews, changing payment rules, contact or company details, URLs.
