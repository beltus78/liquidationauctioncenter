# Notes for AI agents
- Plain Cloudflare Worker, no framework. Pages: `src/pages.ts`; layout and lot card: `src/html.ts`; routing, forms, emails: `src/index.ts`.
- UI text lives in `src/strings/{en,fr,es}.ts` (same keys in all three — `en.ts` exports the type). Long copy: `src/content.ts`.
- Catalog data is generated: edit `tools/lots.py`, run `python3 tools/build-data.py` → `src/data-lots.json`. Lot images: `public/lots/{slug}-sm.webp|-md.webp`.
- Lot names and descriptions must stay different from the owner's other pallet sites (Best Liquidation Center, Liquidation Pallets Wholesales, Wholesale Pallets Liquidators).
- Scroll animations: `public/motion.js` + the motion block at the end of `public/styles.css` (data-story / data-chap / data-fly / data-split / data-stagger / data-reveal / data-count).
- Payment rules exist in three places — keep them in sync: `src/catalog.ts` (allowedPay), `public/app.js`, `migrations` CHECK.
- Never put payment account details in page HTML; they belong in `src/payments.ts` (emails only).
- Run `npm run check` before committing. Bump `?v=` on styles.css/app.js in `src/html.ts` after changing them.
