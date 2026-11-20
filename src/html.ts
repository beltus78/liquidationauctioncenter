import { CATS, LOTS, SITE, TYPES, toCur, type Lot } from "./catalog";
import { LANGS, LANG_NAMES, fill, money, num, tk, type Lang, type T } from "./i18n";

export const esc = (v: unknown) =>
  String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export type Page = {
  t: T; path: string; title: string; description: string; body: string;
  image?: string; jsonLd?: object[]; noindex?: boolean; scriptData?: Record<string, unknown>;
  /** Languages this page exists in (default: all). Guides are English only. */ alts?: Lang[]; ogType?: string; /** Use title as-is (no " | site name" suffix). */ rawTitle?: boolean;
};

export const link = (lang: Lang, path: string) => `/${lang}${path === "/" ? "/" : path}`;
/** Hides "[placeholder]" company details on public pages until the real ones are filled in. */
export const shown = (s: string) => (s.includes("[") ? "" : s);
export type Verify = { google?: string; bing?: string };
let VERIFY: Verify = {};
export const setVerify = (v: Verify) => { VERIFY = v; };

export const MARK = `<svg class="mk" viewBox="0 0 64 64" aria-hidden="true"><rect width="64" height="64" rx="14" fill="#173A2A"/><rect x="3.5" y="3.5" width="57" height="57" rx="11" fill="none" stroke="#C9A24E" stroke-opacity=".5" stroke-width="1.2"/><g fill="#C9A24E"><rect x="11" y="42" width="42" height="4.2" rx="1"/><rect x="12.5" y="46.2" width="7" height="4.4"/><rect x="28.5" y="46.2" width="7" height="4.4"/><rect x="44.5" y="46.2" width="7" height="4.4"/><rect x="11" y="50.6" width="42" height="3.6" rx="1"/></g><g transform="rotate(-28 37 30)"><rect x="35.3" y="6" width="3.4" height="20" rx="1.4" fill="#F3ECDB"/><rect x="26" y="24.5" width="22" height="11" rx="2.4" fill="#F3ECDB"/><rect x="29.6" y="24.5" width="2.2" height="11" fill="#C9A24E"/><rect x="42.2" y="24.5" width="2.2" height="11" fill="#C9A24E"/></g><g stroke="#C9A24E" stroke-width="1.8" stroke-linecap="round" fill="none"><path d="M51.5 33.5l3.4-2.2"/><path d="M52.5 38.4h4"/><path d="M20 37.5l-3.6-1.6"/></g></svg>`;
export const LOGO = `<span class="logo">${MARK}<span class="logo-t"><b>Liquidation</b><b>Auction Center</b></span></span>`;

export const lotTitle = (t: T, l: Lot) => l.title[t.lang];
export const lotName = (t: T, l: Lot) => l.name[t.lang];
export const unitWord = (t: T, l: Lot) => tk(t, `u:${l.unit}`);
export const cpu = (l: Lot) => l.price / l.units;
export const price = (t: T, usd: number, dec = false) => money(toCur(usd, t.cur), t, dec);

/** Catalog card used in every listing. */
export function lotCard(t: T, l: Lot, eager = false) {
  return `<article class="card" data-lot data-cat="${l.cat}" data-type="${l.type}" data-src="${l.source}" data-cond="${l.cond}" data-price="${l.price}" data-cpu="${cpu(l).toFixed(3)}" data-no="${l.no}" data-q="${esc((l.name.en + " " + l.name[t.lang] + " " + tk(t, `src:${l.source}`) + " " + l.no).toLowerCase())}">
<a class="card-img" href="${link(t.lang, `/lot/${l.slug}`)}"><img src="${l.img}-sm.webp" alt="${esc(lotTitle(t, l))}" width="480" height="360"${eager ? "" : ' loading="lazy"'} decoding="async"><span class="tag">${esc(t.lot)} ${l.no}</span><span class="chip c-${l.cond}">${esc(tk(t, `cond:${l.cond}`))}</span></a>
<div class="card-b"><p class="card-k">${esc(tk(t, `src:${l.source}`))} · ${esc(tk(t, `type:${l.type}`))}</p>
<h3 class="card-h"><a href="${link(t.lang, `/lot/${l.slug}`)}">${esc(lotName(t, l))}</a></h3>
<dl class="stats"><div><dt>${esc(t.units)}</dt><dd>~${num(l.units, t)}<small> ${esc(unitWord(t, l))}</small></dd></div><div><dt>${esc(t.estRetail)}</dt><dd>${price(t, l.retail)}</dd></div><div><dt>${esc(t.costUnit)}</dt><dd>${price(t, cpu(l), cpu(l) < 100)}</dd></div></dl>
<div class="card-f"><p class="card-p"><span>${esc(t.from)}</span> <b>${price(t, l.price)}</b></p><button class="add" type="button" data-add="${l.slug}" aria-label="${esc(t.addToList)}: ${esc(lotName(t, l))}">+ <span>${esc(t.addToList)}</span></button></div></div></article>`;
}

export function layout(pg: Page) {
  const { t } = pg;
  const L = t.lang;
  const url = SITE.url + link(L, pg.path);
  const alts = pg.alts ?? LANGS;
  const alternates = alts.map((l) => `<link rel="alternate" hreflang="${l}" href="${SITE.url}${link(l, pg.path)}">`).join("") +
    `<link rel="alternate" hreflang="x-default" href="${SITE.url}${link("en", pg.path)}">`;
  const title = pg.rawTitle || pg.title.includes(SITE.name) ? pg.title : `${pg.title} | ${SITE.name}`;
  const image = pg.image ?? `${SITE.url}/og-default.jpg`;
  const nav: [string, string][] = [["/lots", t.navLots], ["/truckloads", t.navTruckloads], ["/how-it-works", t.navHow], ["/shipping", t.navShipping], ["/faq", t.navFaq], ["/contact", t.navContact]];
  const other = t.cur === "USD" ? "CAD" : "USD";
  const clientT = { lot: t.lot, added: t.added, addToList: t.addToList, remove: t.remove, sending: t.sending, error: t.error, listEmpty: t.listEmpty, contactOk: t.contactOk, lotsCount: t.lotsCount, wireOnly: t.wireOnly, approx: t.approx };
  const tel = SITE.phone.replace(/[^\d+]/g, "");
  return `<!doctype html><html lang="${t.locale}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title><meta name="description" content="${esc(pg.description)}">
${pg.noindex ? `<meta name="robots" content="noindex,follow">` : `<link rel="canonical" href="${url}">${alternates}`}
<meta property="og:site_name" content="${SITE.name}"><meta property="og:type" content="${pg.ogType ?? "website"}"><meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(pg.description)}"><meta property="og:url" content="${url}"><meta property="og:image" content="${esc(image)}">
<meta property="og:locale" content="${t.locale.replace("-", "_")}"><meta name="twitter:card" content="summary_large_image">
${VERIFY.google ? `<meta name="google-site-verification" content="${esc(VERIFY.google)}">` : ""}${VERIFY.bing ? `<meta name="msvalidate.01" content="${esc(VERIFY.bing)}">` : ""}
<meta name="theme-color" content="#0E2219"><link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="preload" href="/fonts/fraunces.woff2" as="font" type="font/woff2" crossorigin><link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/styles.css?v=3">
${(pg.jsonLd ?? []).map((j) => `<script type="application/ld+json">${JSON.stringify(j).replace(/</g, "\\u003c")}</script>`).join("")}
</head><body>
<a class="skip" href="#main">${esc(t.skip)}</a>
<div class="util"><div class="wrap util-in"><span>${esc(t.util)}</span>
<span class="util-r"><a class="cur" href="?cur=${other}" rel="nofollow" title="${esc(t.currency)}"><b>${t.cur}</b> · ${other}</a>
<details class="langs"><summary aria-label="${esc(t.language)}">${L.toUpperCase()} ▾</summary><div class="langs-menu">${LANGS.map((l) => `<a hreflang="${l}" lang="${l}" href="${link(l, pg.path)}"${l === L ? ' aria-current="true"' : ""}>${LANG_NAMES[l]}</a>`).join("")}</div></details></span></div></div>
<header class="hd"><div class="wrap hd-in">
<a href="${link(L, "/")}" class="hd-logo" aria-label="${SITE.name}">${LOGO}</a>
<nav class="hd-nav" aria-label="Main">${nav.map(([p, n]) => `<a href="${link(L, p)}"${pg.path === p ? ' aria-current="page"' : ""}>${esc(n)}</a>`).join("")}</nav>
<a class="hd-list" href="${link(L, "/order-list")}"><span>${esc(t.navList)}</span><b data-listcount>0</b></a>
<button class="burger" type="button" aria-label="Menu" data-burger><i></i><i></i></button>
</div></header>
<main id="main">${pg.body}</main>
<footer class="ft"><div class="wrap">
<div class="ft-top"><p class="ft-big">${esc(t.footerTag)}</p><a class="btn btn-brass" href="${link(L, "/lots")}">${esc(t.ctaBrowse)} →</a></div>
<div class="ft-grid">
<div>${LOGO}<p class="small">${[SITE.company, shown(SITE.address1), shown(SITE.address2)].filter(Boolean).map(esc).join("<br>")}<br><a href="mailto:${SITE.email}">${SITE.email}</a>${SITE.phone ? `<br><a href="tel:${tel}">${esc(SITE.phone)}</a>` : ""}</p></div>
<div><h4>${esc(t.shop_)}</h4>${CATS.map((c) => `<a href="${link(L, `/lots/${c}`)}">${esc(tk(t, `cat:${c}`))}</a>`).join("")}</div>
<div><h4>${esc(t.lotSize)}</h4>${TYPES.map((x) => `<a href="${link(L, `/lots?type=${x}`)}">${esc(tk(t, `type:${x}`))}</a>`).join("")}<a href="${link(L, "/usa")}">${esc(t.usPage)}</a><a href="${link(L, "/canada")}">${esc(t.caPage)}</a></div>
<div><h4>${esc(t.help_)}</h4><a href="${link(L, "/how-it-works")}">${esc(t.navHow)}</a><a href="${link(L, "/shipping")}">${esc(t.navShipping)}</a><a href="${link(L, "/returns")}">${esc(t.returnsTitle)}</a><a href="${link(L, "/faq")}">${esc(t.navFaq)}</a><a href="${link(L, "/about")}">${esc(t.aboutTitle)}</a><a href="/en/guides">${esc(t.guidesLink)}</a><a href="${link(L, "/contact")}">${esc(t.navContact)}</a></div>
<div><h4>${esc(t.legal)}</h4><a href="${link(L, "/terms")}">${esc(t.termsTitle)}</a><a href="${link(L, "/privacy")}">${esc(t.privacyTitle)}</a></div>
</div>
<p class="small ft-tm">${esc(t.tmNote)}</p>
<p class="small ft-copy">© ${new Date().getUTCFullYear()} ${SITE.company}. ${esc(t.rights)}</p></div></footer>
${SITE.phone ? `<a class="wa" href="https://wa.me/${tel.replace("+", "")}" aria-label="${esc(t.whatsapp)}"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.8 14.2c-.2.7-1.4 1.3-2 1.4-.5.1-1.1.1-1.8-.1-2.9-1-4.9-3.9-5-4.1-.2-.2-1.2-1.6-1.2-3s.8-2.2 1-2.5c.3-.3.6-.3.8-.3h.6c.2 0 .4 0 .6.5l.9 2c.1.2.1.4 0 .6l-.4.6-.4.5c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1c.2-.3.4-.2.7-.1l1.9.9c.3.1.5.2.6.3.1.2.1.7-.1 1.3Z"/></svg></a>` : ""}
<script>window.__T=${JSON.stringify(clientT)};window.__L=${JSON.stringify(L)};window.__CUR=${JSON.stringify(t.cur)};window.__LOCALE=${JSON.stringify(t.locale)};${pg.scriptData ? `window.__D=${JSON.stringify(pg.scriptData).replace(/</g, "\\u003c")};` : ""}</script>
<script src="/app.js?v=2" defer></script><script src="/motion.js?v=1" defer></script>
</body></html>`;
}

export const countIn = (f: (l: Lot) => boolean) => LOTS.filter(f).length;
export { fill };
