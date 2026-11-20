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
