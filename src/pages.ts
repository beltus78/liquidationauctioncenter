import { BY_SLUG, CAD_RATE, CATS, CA_PROV, CONDS, FEATURED, LOTS, MAX_PAY_DAYS, PAY_CA, PAY_US, SITE, SOURCES, TYPES, US_STATES, WIRE_ONLY_OVER_USD, toCur, type CatSlug, type Lot } from "./catalog";
import { ABOUT, FAQ, HOW, PRIVACY, RETURNS, SHIPPING, TERMS } from "./content";
import { esc, link, lotCard, lotName, lotTitle, price, unitWord, cpu, countIn, type Page } from "./html";
import { fill, money, num, tk, type T } from "./i18n";

const org = () => ({ "@context": "https://schema.org", "@type": "Organization", name: SITE.name, url: SITE.url, email: SITE.email, logo: `${SITE.url}/favicon.svg`, areaServed: ["US", "CA"] });
const crumbs = (t: T, items: [string, string][]) => ({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: items.map(([n, p], i) => ({ "@type": "ListItem", position: i + 1, name: n, item: SITE.url + link(t.lang, p) })) });

// ---------- home ----------
const SPOTS = [{ x: 4, y: 6, w: 52 }, { x: 46, y: 2, w: 46 }, { x: 10, y: 52, w: 44 }, { x: 52, y: 48, w: 44 }];
const STORY: { imgs: string[] }[] = [
  { imgs: ["/photos/warehouse-row.webp", "/photos/ps5-stacks.webp", "/photos/toys-container.webp", "/photos/milwaukee.webp"] },
  { imgs: ["/photos/dewalt-gaylord.webp", "/photos/milwaukee.webp", "/photos/tools-truck.webp", "/lots/loose-dewalt-tools-case-pack-md"] },
  { imgs: ["/photos/electronics.webp", "/photos/ps5-stacks.webp", "/lots/iphone-mixed-generations-case-pack-md", "/lots/ps5-console-case-pack-md"] },
  { imgs: ["/photos/walmart-gm.webp", "/photos/appliances.webp", "/photos/seasonal.webp", "/photos/toys-lego.webp"] },
];
const src = (s: string) => (s.endsWith(".webp") ? s : `${s}.webp`);

function story(t: T) {
  const ch = [
    [t.s1Kicker, t.s1Title, t.s1Text, true],
    [t.s2Kicker, t.s2Title, t.s2Text, false],
    [t.s3Kicker, t.s3Title, t.s3Text, false],
    [t.s4Kicker, t.s4Title, t.s4Text, true],
  ] as const;
  return `<section class="story" data-story style="--n:${ch.length}">
<div class="story-stage"><div class="story-bg" aria-hidden="true"></div><div class="wrap story-in">
<ol class="story-dots" aria-hidden="true">${ch.map((_, i) => `<li data-dot>${String(i + 1).padStart(2, "0")}</li>`).join("")}</ol>
<div class="story-text">${ch.map(([k, h, p, cta], i) => `<div class="chap" data-chap>
${i === 0 ? `<p class="pill">${esc(t.fixedPill)}</p>` : `<p class="kicker">${esc(k)}</p>`}
${i === 0 ? `<h1 class="h-hero">${heroTitle(h)}</h1>` : `<h2 class="h-hero">${heroTitle(h)}</h2>`}<p class="lead">${esc(p)}</p>
${cta ? `<p class="links"><a class="btn btn-brass" href="${link(t.lang, "/lots")}">${esc(t.ctaBrowse)} →</a><a class="btn btn-ghost" href="${link(t.lang, "/order-list")}?mode=quote">${esc(t.ctaQuote)}</a></p>` : ""}</div>`).join("")}</div>
<div class="story-visual"><div class="story-ring" aria-hidden="true"></div>
${STORY.map((c, i) => c.imgs.map((s, j) => { const sp = SPOTS[j]!; return `<div class="fly-pos" style="left:${sp.x}%;top:${sp.y}%;width:${sp.w}%"><span class="fly" data-fly="${i}"><img src="${src(s)}" alt="" width="640" height="480"${i === 0 ? (j < 2 ? ' fetchpriority="high"' : "") : ' loading="lazy"'}><i>${esc(t.lot)} ${1001 + i * 4 + j}</i></span></div>`; }).join("")).join("")}
</div></div><p class="story-hint" aria-hidden="true">↓</p></div></section>`;
}
/** Last sentence of the hero title gets the brass italic treatment. */
function heroTitle(h: string) {
  const m = h.match(/^(.*?[.!?])\s+(.+)$/);
  return m ? `${esc(m[1])} <em>${esc(m[2])}</em>` : esc(h);
}

export function home(t: T): Page {
  const feat = FEATURED.map((s) => BY_SLUG.get(s)!).filter(Boolean);
  const sizes: [string, string, string][] = [["casepack", t.sizeCasepack, t.sizeCasepackD], ["gaylord", t.sizeGaylord, t.sizeGaylordD], ["pallet", t.sizePallet, t.sizePalletD], ["truckload", t.sizeTruckload, t.sizeTruckloadD]];
  const sizeImg: Record<string, string> = { casepack: "/lots/airpods-pro-case-pack-md.webp", gaylord: "/photos/dewalt-gaylord.webp", pallet: "/photos/milwaukee.webp", truckload: "/photos/warehouse-row.webp" };
  const how = [[t.how1t, t.how1d], [t.how2t, t.how2d], [t.how3t, t.how3d], [t.how4t, t.how4d]];
  const why = [[t.why1t, t.why1d], [t.why2t, t.why2d], [t.why3t, t.why3d], [t.why4t, t.why4d]];
  const srcs = SOURCES.filter((s) => s !== "mixed" && s !== "manufacturer");
  return {
    t, path: "/", title: t.metaHome, description: t.metaHomeD, jsonLd: [org(), { "@context": "https://schema.org", "@type": "WebSite", name: SITE.name, url: SITE.url }],
    body: `${story(t)}
<section class="facts"><div class="wrap facts-in" data-stagger>
<div><b data-count="${LOTS.length}">${LOTS.length}</b><span>${esc(t.statLots)}</span></div>
<div><b data-count="${CATS.length}">${CATS.length}</b><span>${esc(t.statCats)}</span></div>
<div><b data-count="2">2</b><span>${esc(t.statCountries)}</span></div>
<div><b data-count="${MAX_PAY_DAYS}">${MAX_PAY_DAYS}</b><span>${esc(t.statDays)}</span></div></div></section>
<section class="wrap sec"><div class="sec-head"><h2 class="h-xl" data-split>${esc(t.featured)}</h2><a class="ul" href="${link(t.lang, "/lots")}">${esc(t.viewAll)} →</a></div>
<div class="grid">${feat.map((l, i) => lotCard(t, l, i < 4)).join("")}</div></section>
<section class="sec paper"><div class="wrap"><div class="sec-head"><h2 class="h-xl" data-split>${esc(t.shopBySize)}</h2></div>
<div class="sizes" data-stagger>${sizes.map(([k, h, d]) => `<a class="size" href="${link(t.lang, k === "truckload" ? "/truckloads" : `/lots?type=${k}`)}"><img src="${sizeImg[k]}" alt="" loading="lazy" width="640" height="480"><span class="size-b"><b>${esc(h)}</b><small>${esc(d)}</small><em>${countIn((l) => l.type === k)} ${esc(t.statLots)} →</em></span></a>`).join("")}</div></div></section>
<section class="wrap sec"><div class="sec-head"><h2 class="h-xl" data-split>${esc(t.shopByCat)}</h2></div>
<ol class="cats" data-stagger>${CATS.map((c, i) => `<li><a href="${link(t.lang, `/lots/${c}`)}"><span class="cats-n">${String(i + 1).padStart(2, "0")}</span><span class="cats-h">${esc(tk(t, `cat:${c}`))}</span><span class="cats-d">${esc(tk(t, `catD:${c}`))}</span><span class="cats-c">${countIn((l) => l.cat === c)}</span></a></li>`).join("")}</ol></section>
<section class="dark"><div class="wrap sec"><p class="kicker">${esc(t.howTitle)}</p><ol class="how" data-stagger>${how.map(([a, b], i) => `<li><span class="how-n">${i + 1}</span><h3>${esc(a)}</h3><p>${esc(b)}</p></li>`).join("")}</ol>
<p><a class="btn btn-brass" href="${link(t.lang, "/how-it-works")}">${esc(t.navHow)} →</a></p></div></section>
<section class="wrap sec split"><div><h2 class="h-xl" data-split>${esc(t.insideTitle)}</h2><p class="lead muted">${esc(t.insideText)}</p>
<ul class="whys" data-stagger>${why.map(([a, b]) => `<li><b>${esc(a)}</b><span>${esc(b)}</span></li>`).join("")}</ul></div>
<div class="mosaic"><img data-reveal="zoom" src="/photos/warehouse-racks.webp" alt="" loading="lazy" width="720" height="960"><img data-reveal="right" src="/photos/tools-truck.webp" alt="" loading="lazy" width="720" height="960"></div></section>
<section class="sec paper"><div class="wrap"><div class="sec-head"><h2 class="h-xl" data-split>${esc(t.shopBySource)}</h2></div>
<div class="srcs" data-stagger>${srcs.map((s) => `<a href="${link(t.lang, `/lots?source=${s}`)}">${esc(tk(t, `src:${s}`))}<small>${countIn((l) => l.source === s)}</small></a>`).join("")}</div>
<p class="small muted">${esc(t.tmNote)}</p></div></section>
<section class="wrap sec region"><div><h2 class="h-xl" data-split>${esc(t.regionTitle)}</h2><p class="lead muted">${esc(t.regionText)}</p>
<p class="links"><a class="ul" href="${link(t.lang, "/usa")}">${esc(t.usPage)} →</a><a class="ul" href="${link(t.lang, "/canada")}">${esc(t.caPage)} →</a></p></div>
${ctaBand(t)}</section>`,
  };
}

const ctaBand = (t: T) => `<div class="band"><h3>${esc(t.ctaBandTitle)}</h3><p>${esc(t.ctaBandText)}</p><p class="links"><a class="btn btn-brass" href="${link(t.lang, "/contact")}">${esc(t.navContact)} →</a>${SITE.phone ? `<a class="ul" href="tel:${SITE.phone.replace(/[^\d+]/g, "")}">${esc(t.callUs)}</a>` : `<a class="ul" href="mailto:${SITE.email}">${SITE.email}</a>`}</p></div>`;

// ---------- listings ----------
type Filters = { cat?: string; type?: string; source?: string; cond?: string; sort?: string };
function pickFilters(url: URL): Filters {
  const g = (k: string, allowed: readonly string[]) => { const v = url.searchParams.get(k) ?? ""; return allowed.includes(v) ? v : undefined; };
  return { cat: g("cat", CATS), type: g("type", TYPES), source: g("source", SOURCES), cond: g("cond", CONDS), sort: g("sort", ["no", "asc", "desc", "cpu"]) };
}
function applyFilters(f: Filters) {
  let r = LOTS.filter((l) => (!f.cat || l.cat === f.cat) && (!f.type || l.type === f.type) && (!f.source || l.source === f.source) && (!f.cond || l.cond === f.cond));
  if (f.sort === "asc") r = r.slice().sort((a, b) => a.price - b.price);
  if (f.sort === "desc") r = r.slice().sort((a, b) => b.price - a.price);
  if (f.sort === "cpu") r = r.slice().sort((a, b) => cpu(a) - cpu(b));
  return r;
}

function listing(t: T, path: string, h1: string, intro: string, f: Filters, lockCat?: CatSlug): Page {
  const items = applyFilters(f);
  const q = (over: Partial<Filters>) => { const m = { ...f, ...over }; const s = new URLSearchParams(); for (const [k, v] of Object.entries(m)) if (v && !(lockCat && k === "cat")) s.set(k, v); const str = s.toString(); return `${link(t.lang, path)}${str ? `?${str}` : ""}`; };
  const group = (label: string, key: keyof Filters, values: readonly string[], prefix: string, count: (v: string) => number) =>
    `<div class="fg"><p class="fg-h">${esc(label)}</p><a href="${q({ [key]: undefined })}"${!f[key] ? ' aria-current="true"' : ""}>${esc(t.filterAll)}</a>${values.filter((v) => count(v) > 0).map((v) => `<a href="${q({ [key]: v })}"${f[key] === v ? ' aria-current="true"' : ""}>${esc(tk(t, `${prefix}:${v}`))} <small>${count(v)}</small></a>`).join("")}</div>`;
  const base = LOTS.filter((l) => !lockCat || l.cat === lockCat);
  const filtered = !!(f.type || f.source || f.cond || (!lockCat && f.cat) || f.sort);
  return {
    t, path, title: h1, description: (intro || t.metaHomeD).slice(0, 300), noindex: filtered,
    jsonLd: [org(), crumbs(t, [[t.navLots, "/lots"], ...(lockCat ? [[h1, path]] as [string, string][] : [])]), { "@context": "https://schema.org", "@type": "ItemList", itemListElement: items.slice(0, 60).map((l, i) => ({ "@type": "ListItem", position: i + 1, url: SITE.url + link(t.lang, `/lot/${l.slug}`), name: lotTitle(t, l) })) }],
    body: `<section class="wrap page-head"><p class="kicker">${esc(t.navLots)}</p><h1 class="h-xl">${esc(h1)}</h1>${intro ? `<p class="lead muted">${esc(intro)}</p>` : ""}</section>
<section class="wrap shop">
<aside class="filters" aria-label="Filters"><input type="search" placeholder="${esc(t.search)}" data-search aria-label="${esc(t.search)}">
${lockCat ? "" : group(t.filterCat, "cat", CATS, "cat", (v) => base.filter((l) => l.cat === v).length)}
${group(t.filterSize, "type", TYPES, "type", (v) => base.filter((l) => l.type === v).length)}
${group(t.filterSource, "source", SOURCES, "src", (v) => base.filter((l) => l.source === v).length)}
${group(t.filterCond, "cond", CONDS, "cond", (v) => base.filter((l) => l.cond === v).length)}
</aside>
<div class="shop-main"><div class="shop-bar"><p data-shown>${esc(fill(t.lotsCount, { n: items.length }))}</p>
<label class="sort">${esc(t.sortBy)} <select data-sort onchange="location.href=this.value">${([["no", t.sortFeatured], ["asc", t.sortPriceAsc], ["desc", t.sortPriceDesc], ["cpu", t.sortCpu]] as const).map(([v, n]) => `<option value="${q({ sort: v === "no" ? undefined : v })}"${(f.sort ?? "no") === v ? " selected" : ""}>${esc(n)}</option>`).join("")}</select></label></div>
${items.length ? `<div class="grid">${items.map((l, i) => lotCard(t, l, i < 6)).join("")}</div>` : `<p class="empty">${esc(t.noResults)} <a class="ul" href="${link(t.lang, path)}">${esc(t.clear)}</a></p>`}
<p class="empty" data-none hidden>${esc(t.noResults)}</p></div></section>`,
  };
}

export const lots = (t: T, url: URL) => { const f = pickFilters(url); return listing(t, "/lots", f.cat ? tk(t, `cat:${f.cat}`) : t.allLots, f.cat ? tk(t, `catD:${f.cat}`) : t.metaHomeD, f); };
export function category(t: T, slug: string, url: URL): Page | null {
  if (!(CATS as readonly string[]).includes(slug)) return null;
  const c = slug as CatSlug;
  return listing(t, `/lots/${c}`, tk(t, `cat:${c}`), tk(t, `catD:${c}`), { ...pickFilters(url), cat: c }, c);
}
export const truckloads = (t: T, url: URL) => listing(t, "/truckloads", t.sizeTruckload, t.sizeTruckloadD, { ...pickFilters(url), type: "truckload" });

// ---------- lot page ----------
function lotDescription(t: T, l: Lot) {
  const items = l.items[t.lang];
  const list = items.slice(0, -1).join(", ") + ({ en: " and ", fr: " et ", es: " y " })[t.lang] + items[items.length - 1];
  const type = tk(t, `type:${l.type}`).toLowerCase();
  const cond = tk(t, `cond:${l.cond}`).toLowerCase();
  const srcName = tk(t, `src:${l.source}`);
  const u = `${num(l.units, t)} ${unitWord(t, l)}`;
  const p = {
    en: `${t.lot} ${l.no} is a ${type} of roughly ${u} (${cond}, ${srcName}). Loads like this usually include ${list}.`,
    fr: `Le ${t.lot.toLowerCase()} ${l.no} est un ${type} d'environ ${u} (${cond}, ${srcName}). Ce type de chargement comprend généralement ${list}.`,
    es: `El ${t.lot.toLowerCase()} ${l.no} es un ${type} de unas ${u} (${cond}, ${srcName}). Este tipo de carga suele incluir ${list}.`,
  }[t.lang];
  return p;
}

export function lot(t: T, slug: string): Page | null {
  const l = BY_SLUG.get(slug);
  if (!l) return null;
  const related = LOTS.filter((x) => x.slug !== l.slug && (x.cat === l.cat)).slice(0, 4);
  const more = related.length < 4 ? related.concat(LOTS.filter((x) => x.slug !== l.slug && x.cat !== l.cat && x.type === l.type).slice(0, 4 - related.length)) : related;
  const title = lotTitle(t, l);
  const desc = `${lotDescription(t, l)} ${t.from} ${price(t, l.price)}.`;
  const usdPrice = l.price;
  return {
    t, path: `/lot/${l.slug}`, title: `${t.lot} ${l.no} · ${title}`, description: desc.slice(0, 300), image: `${SITE.url}${l.img}-md.webp`,
    jsonLd: [org(), crumbs(t, [[t.navLots, "/lots"], [tk(t, `cat:${l.cat}`), `/lots/${l.cat}`], [`${t.lot} ${l.no}`, `/lot/${l.slug}`]]),
      { "@context": "https://schema.org", "@type": "Product", name: title, sku: `LAC-${l.no}`, image: `${SITE.url}${l.img}-md.webp`, description: desc, category: tk(t, `cat:${l.cat}`),
        offers: { "@type": "Offer", price: usdPrice, priceCurrency: "USD", availability: "https://schema.org/InStock", itemCondition: l.cond === "overstock" ? "https://schema.org/NewCondition" : "https://schema.org/UsedCondition", url: SITE.url + link(t.lang, `/lot/${l.slug}`), seller: { "@type": "Organization", name: SITE.name } } }],
    body: `<nav class="wrap crumbs" aria-label="Breadcrumb"><a href="${link(t.lang, "/lots")}">${esc(t.navLots)}</a> / <a href="${link(t.lang, `/lots/${l.cat}`)}">${esc(tk(t, `cat:${l.cat}`))}</a> / <span>${esc(t.lot)} ${l.no}</span></nav>
<section class="wrap pdp">
<div class="pdp-media"><figure class="pdp-img"><img src="${l.img}-md.webp" alt="${esc(title)}" width="960" height="720" fetchpriority="high"><span class="tag tag-lg">${esc(t.lot)} ${l.no}</span></figure></div>
<div class="pdp-info"><p class="kicker">${esc(tk(t, `src:${l.source}`))} · ${esc(tk(t, `type:${l.type}`))} · ${esc(tk(t, `cat:${l.cat}`))}</p>
<h1 class="h-lg">${esc(title)}</h1>
<div class="pdp-price"><p><span>${esc(t.from)}</span> <b>${price(t, l.price)}</b>${t.cur === "CAD" ? ` <small>(${esc(t.approx)} · ${money(l.price, { ...t, cur: "USD" })} USD)</small>` : ""}</p><p class="small muted">${esc(t.priceNote)}</p></div>
<dl class="pdp-stats"><div><dt>${esc(t.units)}</dt><dd>~${num(l.units, t)} ${esc(unitWord(t, l))}</dd></div><div><dt>${esc(t.estRetail)}</dt><dd>${price(t, l.retail)}</dd></div><div><dt>${esc(t.costUnit)}</dt><dd>${price(t, cpu(l), cpu(l) < 100)}</dd></div>
<div><dt>${esc(t.condition)}</dt><dd>${esc(tk(t, `cond:${l.cond}`))}</dd></div><div><dt>${esc(t.source)}</dt><dd>${esc(tk(t, `src:${l.source}`))}</dd></div><div><dt>${esc(t.lotSize)}</dt><dd>${esc(tk(t, `type:${l.type}`))}</dd></div></dl>
<div class="pdp-buy" data-slug="${l.slug}"><label class="qty">${esc(t.qty)} <input type="number" min="1" max="20" value="1" data-qty></label>
<button class="btn btn-forest" type="button" data-add="${l.slug}" data-withqty>${esc(t.addToList)}</button>
<a class="btn btn-brass" href="${link(t.lang, "/order-list")}?add=${l.slug}&mode=order" data-go>${esc(t.orderNow)}</a>
<a class="btn btn-ghost-d" href="${link(t.lang, "/order-list")}?add=${l.slug}&mode=quote" data-go>${esc(t.quoteThis)}</a></div>
<p class="small muted">${esc(t.manifestNote)}</p></div></section>
<section class="wrap pdp-more">
<div><h2 class="h-md">${esc(t.insideLot)}</h2><p>${esc(lotDescription(t, l))}</p><ul class="ticks">${l.items[t.lang].map((x) => `<li>${esc(x[0]!.toUpperCase() + x.slice(1))}</li>`).join("")}</ul></div>
<div><h2 class="h-md">${esc(t.lotNotes)}</h2><p>${esc(l.note[t.lang])}</p><p class="cond-box"><b>${esc(tk(t, `cond:${l.cond}`))}</b> — ${esc(tk(t, `condD:${l.cond}`))}</p><p class="small muted">${esc(t.estNote)}</p></div></section>
<section class="wrap sec"><div class="sec-head"><h2 class="h-xl">${esc(t.related)}</h2></div><div class="grid">${more.map((x) => lotCard(t, x)).join("")}</div></section>`,
  };
}

// ---------- order list / checkout ----------
export function orderList(t: T): Page {
  const opts = (codes: readonly string[]) => codes.map((c) => `<option value="${c}">${c}</option>`).join("");
  const today = new Date().toISOString().slice(0, 10);
  const max = new Date(Date.now() + MAX_PAY_DAYS * 864e5).toISOString().slice(0, 10);
  const lotsData = Object.fromEntries(LOTS.map((l) => [l.slug, { no: l.no, n: lotName(t, l), p: l.price, img: `${l.img}-sm.webp`, u: l.units, uw: unitWord(t, l), url: link(t.lang, `/lot/${l.slug}`) }]));
  const payNames = Object.fromEntries([...PAY_US, ...PAY_CA].map((p) => [p, tk(t, `pay:${p}`)]));
  return {
    t, path: "/order-list", title: t.listTitle, description: t.listTitle, noindex: true,
    scriptData: { lots: lotsData, pay: { US: PAY_US, CA: PAY_CA }, payNames, wireOver: WIRE_ONLY_OVER_USD, rate: CAD_RATE, wireLimit: money(toCur(WIRE_ONLY_OVER_USD, t.cur), t), regions: { US: US_STATES, CA: CA_PROV }, labels: { region: t.region, regionCa: t.regionCa, zip: t.zip, postal: t.postal, taxId: t.taxId, taxIdCa: t.taxIdCa, submitOrder: t.submitOrder, submitQuote: t.submitQuote } },
    body: `<section class="wrap page-head"><h1 class="h-xl">${esc(t.listTitle)}</h1></section>
<section class="wrap checkout">
<div class="co-list"><div data-list></div><p class="empty" data-empty hidden>${esc(t.listEmpty)} <a class="ul" href="${link(t.lang, "/lots")}">${esc(t.listEmptyCta)} →</a></p>
<div class="co-sum" data-sum hidden><p><span>${esc(t.subtotal)}</span><b data-subtotal>—</b></p><p class="small muted">${esc(t.freightLater)}</p></div></div>
<form class="co-form" data-order novalidate>
<fieldset><legend>${esc(t.modeTitle)}</legend><div class="modes">
<label class="mode"><input type="radio" name="mode" value="order" checked><span><b>${esc(t.modeOrder)}</b><small>${esc(t.modeOrderD)}</small></span></label>
<label class="mode"><input type="radio" name="mode" value="quote"><span><b>${esc(t.modeQuote)}</b><small>${esc(t.modeQuoteD)}</small></span></label></div></fieldset>
<fieldset><legend>${esc(t.yourDetails)}</legend><div class="fgrid">
<label>${esc(t.fullName)} *<input name="fullName" required autocomplete="name" maxlength="120"></label>
<label>${esc(t.company)} *<input name="company" required autocomplete="organization" maxlength="160"></label>
<label>${esc(t.email)} *<input name="email" type="email" required autocomplete="email" maxlength="200"></label>
<label>${esc(t.phone)} *<input name="phone" type="tel" required autocomplete="tel" maxlength="40"></label>
<label>${esc(t.buyerType)} *<select name="buyerType" required><option value="reseller">${esc(t.buyerReseller)}</option><option value="bin">${esc(t.buyerBin)}</option><option value="export">${esc(t.buyerExport)}</option><option value="other">${esc(t.buyerOther)}</option></select></label>
<label><span data-taxlabel>${esc(t.taxId)}</span><input name="taxId" maxlength="40"></label></div></fieldset>
<fieldset><legend>${esc(t.delivery)}</legend><div class="fgrid">
<label>${esc(t.country)} *<select name="country" required data-country><option value="US">${esc(t.usa)}</option><option value="CA"${t.cur === "CAD" ? " selected" : ""}>${esc(t.canada)}</option></select></label>
<label><span><span data-regionlabel>${esc(t.region)}</span> *</span><select name="region" required data-region>${opts(US_STATES)}</select></label>
<label class="span2">${esc(t.address)} *<input name="address" required autocomplete="street-address" maxlength="300"></label>
<label>${esc(t.city)} *<input name="city" required autocomplete="address-level2" maxlength="100"></label>
<label><span><span data-ziplabel>${esc(t.zip)}</span> *</span><input name="postal" required autocomplete="postal-code" maxlength="12"></label>
<label class="span2">${esc(t.deliveryType)} *<select name="deliveryType" required><option value="dock">${esc(t.dlvDock)}</option><option value="liftgate">${esc(t.dlvLiftgate)}</option><option value="residential">${esc(t.dlvResidential)}</option><option value="pickup">${esc(t.dlvPickup)}</option></select></label></div></fieldset>
<fieldset><legend>${esc(t.payment)}</legend><div class="fgrid">
<label>${esc(t.payMethod)} *<select name="payment" required data-pay></select></label>
<label>${esc(t.payBy)} *<input name="payBy" type="date" required min="${today}" max="${max}" value="${today}"><small>${esc(t.payByHelp)}</small></label></div>
<p class="small note" data-wirenote hidden></p><p class="small muted">🔒 ${esc(t.payNote)}</p></fieldset>
<label class="span2">${esc(t.notes)}<textarea name="notes" rows="3" maxlength="2000" placeholder="${esc(t.notesPh)}"></textarea></label>
<label class="agree"><input type="checkbox" name="agree" required> <span>${esc(t.agree)} <a class="ul" href="${link(t.lang, "/terms")}" target="_blank">${esc(t.termsTitle)}</a></span></label>
<input type="text" name="website" tabindex="-1" autocomplete="off" class="hp" aria-hidden="true">
<button class="btn btn-brass btn-wide" type="submit" data-submit>${esc(t.submitOrder)}</button><p class="form-msg" data-msg role="status"></p>
</form></section>`,
  };
}

export const thanks = (t: T, n: string, mode: string): Page => ({
  t, path: "/thanks", title: t.thanksTitle, description: t.thanksTitle, noindex: true,
  body: `<section class="wrap narrow sec"><p class="kicker">${esc(n)}</p><h1 class="h-xl">${esc(t.thanksTitle)}</h1><p class="lead">${esc(fill(mode === "quote" ? t.thanksQuote : t.thanksOrder, { n }))}</p>
<h2 class="h-md">${esc(t.thanksNext)}</h2><ol class="steps"><li>${esc(t.thanks1)}</li><li>${esc(t.thanks2)}</li><li>${esc(t.thanks3)}</li></ol>
<p><a class="btn btn-brass" href="${link(t.lang, "/lots")}">${esc(t.ctaBrowse)} →</a></p></section><script>try{localStorage.removeItem("lac-list")}catch(e){}</script>`,
});

// ---------- content pages ----------
const secs = (s: [string, string[]][]) => s.map(([h, ps]) => `<h2 class="h-md">${esc(h)}</h2>${ps.map((p) => `<p>${esc(p)}</p>`).join("")}`).join("");
const textPage = (t: T, path: string, h1: string, intro: string, body: string, extra: object[] = [], aside = ""): Page => ({
  t, path, title: h1, description: (intro || body.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim().slice(0, 280), jsonLd: [org(), ...extra],
  body: `<section class="wrap page-head"><h1 class="h-xl" data-split>${esc(h1)}</h1>${intro ? `<p class="lead muted">${esc(intro)}</p>` : ""}</section><section class="wrap prose-wrap"><div class="prose">${body}</div>${aside}</section>`,
});
const helpAside = (t: T) => `<aside class="prose-aside">${ctaBand(t)}</aside>`;

export const how = (t: T) => textPage(t, "/how-it-works", t.howPageTitle, t.howPageIntro, secs(HOW[t.lang]), [], helpAside(t));
export const shipping = (t: T) => textPage(t, "/shipping", t.shippingTitle, "", secs(SHIPPING[t.lang]), [], helpAside(t));
export const returns = (t: T) => textPage(t, "/returns", t.returnsTitle, "", secs(RETURNS[t.lang]), [], helpAside(t));
export const terms = (t: T) => textPage(t, "/terms", t.termsTitle, "", secs(TERMS[t.lang]));
export const privacy = (t: T) => textPage(t, "/privacy", t.privacyTitle, "", secs(PRIVACY[t.lang]) + `<p>${esc(SITE.company)} · ${esc(SITE.address1)} · ${esc(SITE.address2)} · <a href="mailto:${SITE.email}">${SITE.email}</a></p>`);
export const about = (t: T) => textPage(t, "/about", t.aboutTitle, "", ABOUT[t.lang].map((p) => `<p>${esc(p)}</p>`).join("") + `<figure class="prose-img"><img src="/photos/warehouse-row.webp" alt="" loading="lazy" width="1200" height="700"></figure>`, [], helpAside(t));
export function faq(t: T) {
  const qa = FAQ[t.lang];
  return textPage(t, "/faq", t.faqTitle, "", qa.map(([q, a]) => `<details class="qa"><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join(""),
    [{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: qa.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) }], helpAside(t));
}

export function region(t: T, which: "usa" | "canada"): Page {
  const isCa = which === "canada";
  const h1 = isCa ? t.caPage : t.usPage;
  const intro = isCa
    ? { en: "Fixed-price liquidation pallets, gaylords and truckloads delivered to every Canadian province and territory, with prices in CAD and Interac e-Transfer accepted.", fr: "Palettes, gaylords et camions de liquidation à prix fixe livrés dans chaque province et territoire, prix en CAD et virement Interac accepté.", es: "Palés, gaylords y camiones de liquidación a precio fijo entregados en todas las provincias y territorios de Canadá, con precios en CAD y pago por Interac e-Transfer." }[t.lang]
    : { en: "Fixed-price liquidation pallets, gaylords and truckloads shipped by LTL freight to all 50 states, with dock pickup by appointment.", fr: "Palettes, gaylords et camions de liquidation à prix fixe expédiés en LTL dans les 50 États, avec enlèvement sur rendez-vous.", es: "Palés, gaylords y camiones de liquidación a precio fijo enviados por flete LTL a los 50 estados, con recogida en muelle con cita." }[t.lang];
  const ship = SHIPPING[t.lang].filter((_, i) => (isCa ? [0, 1, 3, 4] : [0, 1, 2, 4]).includes(i));
  const feat = LOTS.filter((l) => FEATURED.includes(l.slug)).slice(0, 4);
  return textPage(t, `/${which}`, h1, intro, secs(ship) + `<p><a class="btn btn-brass" href="${link(t.lang, "/lots")}">${esc(t.ctaBrowse)} →</a></p>`, [], helpAside(t) + `<div class="wrap grid grid-in">${feat.map((l) => lotCard(t, l)).join("")}</div>`);
}

export function contact(t: T): Page {
  return {
    t, path: "/contact", title: t.contactTitle, description: t.contactIntro, jsonLd: [org()],
    body: `<section class="wrap page-head"><h1 class="h-xl" data-split>${esc(t.contactTitle)}</h1><p class="lead muted">${esc(t.contactIntro)}</p></section>
<section class="wrap contact"><form class="co-form" data-contact novalidate><div class="fgrid">
<label>${esc(t.fullName)} *<input name="name" required maxlength="120" autocomplete="name"></label>
<label>${esc(t.email)} *<input name="email" type="email" required maxlength="200" autocomplete="email"></label>
<label>${esc(t.company)}<input name="company" maxlength="160" autocomplete="organization"></label>
<label>${esc(t.phone)}<input name="phone" type="tel" maxlength="40" autocomplete="tel"></label>
<label class="span2">${esc(t.message)} *<textarea name="message" rows="6" required maxlength="3000"></textarea></label></div>
<input type="text" name="website" tabindex="-1" autocomplete="off" class="hp" aria-hidden="true">
<button class="btn btn-brass" type="submit">${esc(t.send)}</button><p class="form-msg" data-msg role="status"></p></form>
<aside class="contact-side"><p><b>${esc(SITE.company)}</b><br>${esc(SITE.address1)}<br>${esc(SITE.address2)}</p><p><a class="ul" href="mailto:${SITE.email}">${SITE.email}</a></p>${SITE.phone ? `<p><a class="ul" href="tel:${SITE.phone.replace(/[^\d+]/g, "")}">${esc(SITE.phone)}</a></p>` : ""}<img src="/photos/warehouse-racks.webp" alt="" loading="lazy" width="600" height="800"></aside></section>`,
  };
}

export const notFound = (t: T): Page => ({
  t, path: "/404", title: t.notFound, description: t.notFoundText, noindex: true,
  body: `<section class="wrap narrow sec"><h1 class="h-xl">${esc(t.notFound)}</h1><p class="lead">${esc(t.notFoundText)}</p><p><a class="btn btn-brass" href="${link(t.lang, "/lots")}">${esc(t.ctaBrowse)} →</a></p></section>`,
});
