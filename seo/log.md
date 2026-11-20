# SEO log — liquidationauctioncenter.com

Automated SEO tasks (daily health check, Tue/Fri guide, monthly report) append dated entries here.
Guides already published (don't repeat these topics):
- liquidation-lot-sizes-case-pack-gaylord-pallet-truckload — lot sizes compared
- buying-us-liquidation-pallets-from-canada — Canada: freight, customs broker, CUSMA, GST/HST, Interac

## 2026-11-20 — SEO onboarding
- Added buyer guides: /en/guides and /en/guides/<slug> (English only; /fr/ and /es/ guide URLs 301 to /en/). Source: src/guides.ts. Article + BreadcrumbList JSON-LD, English-only hreflang, listed in sitemap-en.xml with lastmod.
- Fixed: /truckloads was noindex (treated as a filtered view) although it is in the sitemap — now indexable.
- Fixed: home title (96 → ~61 chars) and descriptions over 160 chars in en/fr/es; descriptions now clipped at 160 on a word boundary; short category descriptions extended.
- Lot pages: "Lot N ·" removed from <title> (kept in H1); long titles drop the site-name suffix.
- Placeholder company details ("[Street address]" etc.) hidden from the public footer/contact until real ones are set in src/catalog.ts SITE.
- Optional env vars for verification meta tags: GOOGLE_SITE_VERIFICATION, BING_SITE_VERIFICATION.
- IndexNow key file: /56798b12585e43048e92d02c341c7e41.txt (used to ping Bing/Yandex with new URLs).
- Open (needs Beltus): real address and state of registration; Terms/Privacy still show placeholders.

## 2026-11-20 — Four more buyer guides (catch-up with the older sites)
- Added 4 guides (now 6, same level as Best Liquidation Center): liquidation-lot-profit-cost-per-unit-retail-value (landed cost per unit, est. retail, unsellable allowance); liquidation-auction-vs-fixed-price-lots (auctions vs fixed price — honest about "Auction" being the brand name only); home-depot-tool-return-pallets-what-to-expect (sorting, battery/tool testing, grading, pricing); receiving-liquidation-freight-dock-liftgate-damage-claims (delivery types, inspection, noting damage on the receipt).
- Topics chosen not to overlap Best Liquidation Center's guides (how to buy, returns vs overstock vs shelf pulls, electronics, tools bulk, clothing, toys, shoes). All internal links checked (200), all in sitemap-en.xml, descriptions 140–160 chars, seoTitles ≤ 65.
- Next candidates: Apple/phone case packs (IMEI, activation lock), appliance pallets (freight + testing), bin store stocking, Quebec/French-language buying notes.
- Search Console: domain property sc-domain:liquidationauctioncenter.com verified (DNS TXT google-site-verification in Cloudflare — don't remove it); /sitemap.xml submitted 2026-11-20 (first status "Couldn't fetch" is normal for a new property; the sitemap serves 200 to Googlebot). IndexNow pinged for the guides index + 4 new guides (HTTP 200).
- 2026-11-20: real business address added (1601 Spring St, Greensboro, NC 27403) — footer, contact, privacy, emails, Organization JSON-LD (PostalAddress + telephone).
- 2026-11-20: lot photo galleries — 244 extra photos (up to 4 per lot) drawn from the owner's other pallet sites, re-cropped and colour-adjusted so files differ; near-duplicates and wrong-product matches removed by hand. Product JSON-LD now lists all images.
