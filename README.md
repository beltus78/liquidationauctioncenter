# Liquidation Auction Center — liquidationauctioncenter.com

Fixed-price liquidation lots (case packs, gaylords, pallets, truckloads) for resellers in the USA and Canada.
"Auction" is the brand name only: there is no bidding. English `/en/`, French `/fr/` (Quebec visitors land here) and Spanish `/es/`.

**Stack:** Cloudflare Worker (TypeScript, server-rendered HTML, no framework) · D1 database `liquidationauctioncenter` · Cloudflare Email Sending (`EMAIL` binding, no API key) for website emails · Zoho Mail (free) for the sales@ inbox · static files in `public/`.
Deploys automatically from GitHub (`main`) with Cloudflare Workers Builds.

## What happens on an order
1. Buyer adds lots to the **order list** (saved in their browser), picks **Place my order** or **Request a quote first**.
2. Buyer picks a payment method and a pay-by date (today to +3 days):
   - USA: bank wire/ACH, Zelle, Cash App, Apple Pay, Chime · Canada: Interac e-Transfer, wire
   - Over **US$10,000** → bank wire only (enforced in the browser, the server and the database)
3. The order is saved in D1 (`orders`) and two emails go out: one to `sales@`, one to the buyer **with the payment details** (from `src/payments.ts`). Payment details never appear on the website.

## Before launch — fill in
| What | Where |
|---|---|
| Street address, city/state, state of registration, phone (shows call + WhatsApp buttons) | `src/catalog.ts` → `SITE` |
| Bank / Zelle / Cash App / Apple Pay / Chime / Interac details | `src/payments.ts` |
| USD→CAD display rate (currently 1.37) | `src/catalog.ts` → `CAD_RATE` |
| Lot prices and estimated retail | `tools/lots.py` → run `python3 tools/build-data.py` (review `lot-price-review.csv`) |
| Business promises (reply time, ship time, claim window, restocking fee…) | `src/content.ts` |

## Cloudflare setup (one time)
1. **Workers & Pages → Create → Import a repository** → `beltus78/liquidationauctioncenter`, branch `main`. Build command: none. Deploy command: `npx wrangler deploy`.
2. **Settings → Domains & Routes** → add `liquidationauctioncenter.com` and `www.liquidationauctioncenter.com` (www redirects to the apex).
3. **Email Sending** (done): Email Service → Email Sending → liquidationauctioncenter.com is onboarded; the Worker sends through the `EMAIL` binding in `wrangler.jsonc`. A `RESEND_API_KEY` secret is only an optional fallback.
4. **Inbox:** sales@ is a Zoho Mail (Forever Free) mailbox — the domain's MX/SPF/DKIM point to Zoho. Don't turn on Cloudflare Email Routing for the apex (it would replace Zoho's MX).

The D1 database already exists (id in `wrangler.jsonc`) with the tables from `migrations/0001_init.sql`.
New migrations: add `migrations/000N_name.sql` and run `bash deploy.sh` (or `npx wrangler d1 migrations apply liquidationauctioncenter --remote`).

## See orders
Cloudflare dashboard → D1 → `liquidationauctioncenter` → Console:
`SELECT order_number, mode, company, region, country, payment, pay_by, subtotal_usd, created_at FROM orders ORDER BY created_at DESC;`

## Local
`npm install && npx wrangler d1 migrations apply liquidationauctioncenter --local && npm run dev` · type check: `npm run check`
