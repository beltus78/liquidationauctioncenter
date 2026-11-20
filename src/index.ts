import { BY_SLUG, CATS, CA_PROV, LOTS, MAX_PAY_DAYS, SITE, US_STATES, allowedPay, toCur, type Cur, type PayMethod } from "./catalog";
import { LANGS, detectLang, isLang, money, strings, tk, type Lang, type T } from "./i18n";
import { esc, layout, link, setVerify } from "./html";
import { GUIDES } from "./guides";
import { PAY_DETAILS } from "./payments";
import * as P from "./pages";

export interface Env {
  ASSETS: Fetcher;
  DB: D1Database;
  EMAIL?: SendEmail; // Cloudflare Email Sending binding
  RESEND_API_KEY?: string; // optional fallback
  SALES_EMAIL: string;
  GOOGLE_SITE_VERIFICATION?: string;
  BING_SITE_VERIFICATION?: string;
  EMAIL_FROM: string;
}
type CF = { country?: string; regionCode?: string };
const cfOf = (req: Request) => ((req as Request & { cf?: CF }).cf ?? {}) as CF;
const cookieOf = (req: Request, k: string) => req.headers.get("cookie")?.match(new RegExp(`(?:^|;\\s*)${k}=([A-Za-z]{2,3})`))?.[1];
const YEAR = 31536000;

const html = (body: string, lang: Lang, cur: Cur, status = 200) => new Response(body, {
  status,
  headers: {
    "content-type": "text/html; charset=utf-8",
    "cache-control": "private, max-age=120", // varies by currency cookie
    "content-language": lang,
    "set-cookie": `lang=${lang}; Path=/; Max-Age=${YEAR}; SameSite=Lax; Secure`,
    "x-cur": cur,
  },
});
const json = (data: unknown, status = 200) => new Response(JSON.stringify(data), { status, headers: { "content-type": "application/json" } });

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    const url = new URL(req.url);
    if (url.hostname.startsWith("www.")) { url.hostname = url.hostname.slice(4); return Response.redirect(url.toString(), 301); }
    const path = url.pathname;
    setVerify({ google: env.GOOGLE_SITE_VERIFICATION, bing: env.BING_SITE_VERIFICATION });

    if (path === "/api/order" && req.method === "POST") return order(req, env);
    if (path === "/api/contact" && req.method === "POST") return contactMsg(req, env);
    if (path === "/robots.txt") return new Response(`User-agent: *\nAllow: /\nDisallow: /api/\nDisallow: /*/order-list\nDisallow: /*/thanks\nSitemap: ${SITE.url}/sitemap.xml\n`, { headers: { "content-type": "text/plain" } });
    if (path === "/sitemap.xml") return sitemapIndex();
    const sm = path.match(/^\/sitemap-([a-z]{2})\.xml$/);
    if (sm && isLang(sm[1]!)) return sitemap(sm[1]);

    // Currency switch: ?cur=USD|CAD sets a cookie, then back to the clean URL.
    const curQ = url.searchParams.get("cur");
    if (curQ === "USD" || curQ === "CAD") {
      url.searchParams.delete("cur");
      return new Response(null, { status: 302, headers: { location: url.pathname + url.search, "set-cookie": `cur=${curQ}; Path=/; Max-Age=${YEAR}; SameSite=Lax; Secure`, "cache-control": "no-store" } });
    }

    const cf = cfOf(req);
    const [, first, ...rest] = path.split("/");
    if (!first || !isLang(first)) {
      if (first && /\.[a-z0-9]+$/i.test(path)) return env.ASSETS.fetch(req); // static files
      const c = cookieOf(req, "lang");
      const lang = c && isLang(c) ? c : detectLang(cf.regionCode, cf.country, req.headers.get("accept-language"));
      return new Response(null, { status: 302, headers: { location: `/${lang}${path === "/" ? "/" : path}${url.search}`, vary: "Accept-Language, Cookie", "cache-control": "no-store" } });
    }

    const lang = first;
    // Guides exist in English only.
    if (lang !== "en" && rest[0] === "guides") return Response.redirect(new URL(`/en/${rest.join("/")}`, url).toString(), 301);
    const cc = cookieOf(req, "cur");
    const cur: Cur = cc === "USD" || cc === "CAD" ? cc : cf.country === "CA" ? "CAD" : "USD";
    const t = strings(lang, cur);
    const sub = "/" + rest.join("/");
    const page = route(t, sub, url);
    const res = page ? html(layout(page), lang, cur) : html(layout(P.notFound(t)), lang, cur, 404);
    if (cf.country) res.headers.append("set-cookie", `cc=${cf.country === "CA" ? "CA" : "US"}; Path=/; Max-Age=86400; SameSite=Lax; Secure`);
    if (cf.regionCode && /^[A-Z0-9]{2,3}$/.test(cf.regionCode)) res.headers.append("set-cookie", `rc=${cf.regionCode}; Path=/; Max-Age=86400; SameSite=Lax; Secure`);
    return res;
  },
};

function route(t: T, sub: string, url: URL) {
  const s = sub.replace(/\/+$/, "") || "/";
  switch (s) {
    case "/": return P.home(t);
    case "/lots": return P.lots(t, url);
    case "/truckloads": return P.truckloads(t, url);
    case "/order-list": return P.orderList(t);
    case "/how-it-works": return P.how(t);
    case "/shipping": return P.shipping(t);
    case "/returns": return P.returns(t);
    case "/faq": return P.faq(t);
    case "/about": return P.about(t);
    case "/contact": return P.contact(t);
    case "/terms": return P.terms(t);
    case "/privacy": return P.privacy(t);
    case "/usa": return P.region(t, "usa");
    case "/canada": return P.region(t, "canada");
    case "/guides": return t.lang === "en" ? P.guides(t) : null;
    case "/thanks": return P.thanks(t, (url.searchParams.get("n") ?? "").replace(/[^A-Z0-9-]/g, "").slice(0, 30), url.searchParams.get("m") === "quote" ? "quote" : "order");
  }
  let m;
  if ((m = s.match(/^\/lots\/([a-z]+)$/))) return P.category(t, m[1]!, url);
  if ((m = s.match(/^\/lot\/([a-z0-9-]+)$/))) return P.lot(t, m[1]!);
  if ((m = s.match(/^\/guides\/([a-z0-9-]+)$/)) && t.lang === "en") return P.guide(t, m[1]!);
  return null;
}

// ---------- sitemap ----------
const PATHS = () => ["/", "/lots", "/truckloads", "/how-it-works", "/shipping", "/returns", "/faq", "/about", "/contact", "/usa", "/canada", "/terms", "/privacy",
  ...CATS.map((c) => `/lots/${c}`), ...LOTS.map((l) => `/lot/${l.slug}`)];
const xml = (body: string) => new Response(`<?xml version="1.0" encoding="UTF-8"?>${body}`, { headers: { "content-type": "application/xml", "cache-control": "public, max-age=3600" } });
const sitemapIndex = () => xml(`<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${LANGS.map((l) => `<sitemap><loc>${SITE.url}/sitemap-${l}.xml</loc></sitemap>`).join("")}</sitemapindex>`);
const sitemap = (lang: Lang) => xml(`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${PATHS().map((p) => `<url><loc>${SITE.url}${link(lang, p)}</loc>${LANGS.map((l) => `<xhtml:link rel="alternate" hreflang="${l}" href="${SITE.url}${link(l, p)}"/>`).join("")}<xhtml:link rel="alternate" hreflang="x-default" href="${SITE.url}${link("en", p)}"/></url>`).join("")}${lang === "en" ? guideUrls() : ""}</urlset>`);

// Guides are English only: no alternates, lastmod = published/updated date.
const guideUrls = () => [`<url><loc>${SITE.url}/en/guides</loc><lastmod>${GUIDES.map((g) => g.updated ?? g.published).sort().at(-1)}</lastmod></url>`,
  ...GUIDES.map((g) => `<url><loc>${SITE.url}/en/guides/${g.slug}</loc><lastmod>${g.updated ?? g.published}</lastmod></url>`)].join("");

// ---------- forms ----------
class UserError extends Error {}
const MSG = {
  required: { en: "Please fill in all required fields.", fr: "Veuillez remplir tous les champs obligatoires.", es: "Complete todos los campos obligatorios." },
  long: { en: "One of the fields is too long.", fr: "Un des champs est trop long.", es: "Uno de los campos es demasiado largo." },
  email: { en: "Please enter a valid email address.", fr: "Veuillez entrer une adresse courriel valide.", es: "Introduzca un correo electrónico válido." },
  region: { en: "Please choose your state or province.", fr: "Veuillez choisir votre province ou État.", es: "Elija su estado o provincia." },
  pay: { en: "Please choose a payment method available for your country and order total.", fr: "Choisissez un mode de paiement offert pour votre pays et ce montant.", es: "Elija un método de pago disponible para su país y el total del pedido." },
  payBy: { en: "The pay-by date must be today or within the next 3 days.", fr: "La date de paiement doit être aujourd'hui ou dans les 3 prochains jours.", es: "La fecha de pago debe ser hoy o dentro de los próximos 3 días." },
  empty: { en: "Your order list is empty.", fr: "Votre liste est vide.", es: "Su lista está vacía." },
  item: { en: "Your list contains an item that is no longer available.", fr: "Votre liste contient un lot qui n'est plus offert.", es: "Su lista contiene un lote que ya no está disponible." },
  agree: { en: "Please accept the terms of sale.", fr: "Veuillez accepter les conditions de vente.", es: "Acepte las condiciones de venta." },
} satisfies Record<string, Record<Lang, string>>;
type Msg = keyof typeof MSG;

function validator(lang: Lang) {
  const fail = (k: Msg) => { throw new UserError(MSG[k][lang]); };
  const str = (v: unknown, max: number, required = true) => {
    const s = typeof v === "string" ? v.trim() : "";
    if (required && !s) fail("required");
    if (s.length > max) fail("long");
    return s;
  };
  const email = (v: unknown) => { const s = str(v, 200).toLowerCase(); if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)) fail("email"); return s; };
  return { fail, str, email };
}
const ymd = (d: Date) => d.toISOString().slice(0, 10);
function validPayBy(s: string) {
  const now = new Date();
  const lo = new Date(now); lo.setUTCDate(lo.getUTCDate() - 1); // buyer time zones behind UTC
  const hi = new Date(now); hi.setUTCDate(hi.getUTCDate() + MAX_PAY_DAYS + 1);
  return /^\d{4}-\d{2}-\d{2}$/.test(s) && s >= ymd(lo) && s <= ymd(hi);
}
const langOf = (d: Record<string, unknown>): Lang => (typeof d["lang"] === "string" && isLang(d["lang"]) ? d["lang"] : "en");

async function order(req: Request, env: Env) {
  let lang: Lang = "en";
  try {
    const d = (await req.json()) as Record<string, unknown>;
    lang = langOf(d);
    if (d["website"]) return json({ ok: true, orderNumber: "LAC-OK" }); // bot trap
    const v = validator(lang);
    const country = v.str(d["country"], 2) === "CA" ? "CA" : "US";
    const o = {
      mode: d["mode"] === "quote" ? "quote" : "order",
      full_name: v.str(d["fullName"], 120), company: v.str(d["company"], 160), email: v.email(d["email"]), phone: v.str(d["phone"], 40),
      buyer_type: ["reseller", "bin", "export", "other"].includes(String(d["buyerType"])) ? String(d["buyerType"]) : "other",
      tax_id: v.str(d["taxId"], 40, false) || null,
      country, region: v.str(d["region"], 3), address: v.str(d["address"], 300), city: v.str(d["city"], 100), postal: v.str(d["postal"], 12).toUpperCase(),
      delivery_type: ["dock", "liftgate", "residential", "pickup"].includes(String(d["deliveryType"])) ? String(d["deliveryType"]) : "dock",
      payment: v.str(d["payment"], 10) as PayMethod, pay_by: v.str(d["payBy"], 10), notes: v.str(d["notes"], 2000, false) || null,
      currency: d["cur"] === "CAD" ? "CAD" : "USD" as Cur,
    };
    if (!d["agree"]) v.fail("agree");
    if (!(country === "CA" ? CA_PROV : US_STATES).includes(o.region)) v.fail("region");
    if (!validPayBy(o.pay_by)) v.fail("payBy");
    const raw = Array.isArray(d["items"]) ? (d["items"] as { slug: unknown; qty: unknown }[]) : [];
    if (!raw.length || raw.length > 100) v.fail("empty");
    const items = raw.map((i) => {
      const l = BY_SLUG.get(String(i.slug)); const qty = Math.floor(Number(i.qty));
      if (!l || !(qty >= 1 && qty <= 20)) v.fail("item");
      return { no: l!.no, slug: l!.slug, name: l!.title.en, qty, unit_price_usd: l!.price, line_usd: l!.price * qty };
    });
    const subtotal_usd = items.reduce((s, l) => s + l.line_usd, 0);
    if (!allowedPay(country, subtotal_usd).includes(o.payment)) v.fail("pay");

    const order_number = `LAC-${ymd(new Date()).slice(2).replace(/-/g, "")}-${crypto.getRandomValues(new Uint32Array(1))[0]!.toString(36).slice(0, 5).toUpperCase()}`;
    await env.DB.prepare(`INSERT INTO orders (id, order_number, mode, lang, currency, full_name, company, email, phone, buyer_type, tax_id, country, region, address, city, postal, delivery_type, payment, pay_by, notes, items, subtotal_usd)
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`).bind(crypto.randomUUID(), order_number, o.mode, lang, o.currency, o.full_name, o.company, o.email, o.phone, o.buyer_type, o.tax_id,
      o.country, o.region, o.address, o.city, o.postal, o.delivery_type, o.payment, o.pay_by, o.notes, JSON.stringify(items), subtotal_usd).run();

    const t = strings(lang, o.currency);
    const isQuote = o.mode === "quote";
    const m = (usd: number) => money(toCur(usd, o.currency), t);
    const table = `<table cellpadding="6" style="border-collapse:collapse;font-size:14px;width:100%">${items.map((l) => `<tr style="border-bottom:1px solid #E7DFC9"><td>${esc(t.lot)} ${l.no}</td><td>${esc(BY_SLUG.get(l.slug)!.title[lang])}</td><td>× ${l.qty}</td><td align="right">${esc(m(l.line_usd))}</td></tr>`).join("")}</table>
<p><b>${esc(t.subtotal)}:</b> ${esc(m(subtotal_usd))}${o.currency === "CAD" ? ` (${esc(money(subtotal_usd, { ...t, cur: "USD" }))} USD)` : ""}<br><span style="color:#5B6B60">${esc(t.freightLater)}</span></p>`;
    const rows: [string, unknown][] = [["Number", order_number], ["Type", isQuote ? "QUOTE REQUEST" : "ORDER"], ["Name", o.full_name], ["Company", o.company], ["Email", o.email], ["Phone", o.phone],
      ["Buyer type", o.buyer_type], [country === "CA" ? "GST/HST no." : "Resale / tax ID", o.tax_id], ["Ship to", `${o.address}, ${o.city}, ${o.region} ${o.postal}, ${country}`], ["Delivery", o.delivery_type],
      ["Payment", tk(strings("en", "USD"), `pay:${o.payment}`)], ["Will pay by", o.pay_by], ["Currency shown", o.currency], ["Notes", o.notes], ["Site language", lang]];
    const pay = PAY_DETAILS[o.payment];
    const payBlock = `<div style="background:#F3ECDB;border-left:4px solid #C9A24E;padding:14px 16px;margin:18px 0"><p style="margin:0 0 6px"><b>${esc(t.payment)}: ${esc(tk(t, `pay:${o.payment}`))}</b> · ${esc(t.payBy)} ${esc(o.pay_by)}</p>
${pay.lines.map((x) => `<p style="margin:0 0 4px">${esc(x)}</p>`).join("")}<p style="margin:8px 0 0;font-size:13px">${esc(PAY_REF[lang].replace("{n}", order_number))}</p>
<p style="margin:6px 0 0;font-size:13px">${esc(PAY_WAIT[lang])}</p></div>`;
    await Promise.all([
      sendEmail(env, env.SALES_EMAIL, `${isQuote ? "Quote request" : "New order"} ${order_number} — ${o.company} (${o.region}, ${country}) ${money(subtotal_usd, strings("en", "USD"))}`, mail(isQuote ? "New quote request" : "New order", fields(rows) + table), o.email),
      sendEmail(env, o.email, `${t.thanksTitle} — ${order_number} · ${SITE.name}`, mail(t.thanksTitle, `<p>${esc((isQuote ? t.thanksQuote : t.thanksOrder).replace("{n}", order_number))}</p>${table}${payBlock}`, lang), env.SALES_EMAIL),
    ]);
    return json({ ok: true, orderNumber: order_number, mode: o.mode });
  } catch (e) {
    if (e instanceof UserError) return json({ ok: false, error: e.message }, 400);
    console.error(e);
    return json({ ok: false, error: "Server error" }, 500);
  }
}
const PAY_REF: Record<Lang, string> = { en: "Put {n} in the payment memo or reference.", fr: "Indiquez {n} dans la note ou la référence du paiement.", es: "Indique {n} en el concepto o referencia del pago." };
const PAY_WAIT: Record<Lang, string> = {
  en: "Please wait for our email confirming the delivered total (lots + freight) before sending payment.",
  fr: "Attendez notre courriel confirmant le total livré (lots + transport) avant d'envoyer le paiement.",
  es: "Espere nuestro correo con el total entregado (lotes + flete) antes de enviar el pago.",
};

async function contactMsg(req: Request, env: Env) {
  let lang: Lang = "en";
  try {
    const d = (await req.json()) as Record<string, unknown>;
    lang = langOf(d);
    if (d["website"]) return json({ ok: true });
    const v = validator(lang);
    const m = { name: v.str(d["name"], 120), email: v.email(d["email"]), company: v.str(d["company"], 160, false) || null, phone: v.str(d["phone"], 40, false) || null, message: v.str(d["message"], 3000) };
    await env.DB.prepare("INSERT INTO contact_messages (id, lang, name, email, company, phone, message) VALUES (?,?,?,?,?,?,?)").bind(crypto.randomUUID(), lang, m.name, m.email, m.company, m.phone, m.message).run();
    await sendEmail(env, env.SALES_EMAIL, `Website message from ${m.name}${m.company ? ` (${m.company})` : ""}`, mail("New contact message", fields([["Name", m.name], ["Email", m.email], ["Company", m.company], ["Phone", m.phone], ["Language", lang], ["Message", m.message]])), m.email);
    return json({ ok: true });
  } catch (e) {
    if (e instanceof UserError) return json({ ok: false, error: e.message }, 400);
    console.error(e);
    return json({ ok: false, error: "Server error" }, 500);
  }
}

const fields = (rows: [string, unknown][]) => rows.filter(([, v]) => v != null && v !== "").map(([k, v]) => `<p style="margin:0 0 6px"><b>${esc(k)}:</b> ${esc(v)}</p>`).join("");
const mail = (title: string, body: string, lang = "en") => `<!doctype html><html lang="${lang}"><body style="margin:0;background:#F3ECDB;font-family:Arial,Helvetica,sans-serif;color:#15281E">
<div style="max-width:620px;margin:0 auto;background:#fff"><div style="background:#173A2A;padding:18px 24px"><p style="margin:0;font:700 18px Georgia,serif;color:#F3ECDB">Liquidation <span style="color:#C9A24E">Auction Center</span></p></div>
<div style="padding:24px"><h1 style="font:600 22px Georgia,serif;margin:0 0 14px">${esc(title)}</h1>${body}<hr style="border:none;border-top:1px solid #E7DFC9;margin:22px 0">
<p style="font-size:12px;color:#5B6B60">${esc(SITE.company)} · ${esc(SITE.address1)} · ${esc(SITE.address2)} · ${SITE.email}</p></div></div></body></html>`;

async function sendEmail(env: Env, to: string, subject: string, htmlBody: string, replyTo?: string) {
  const text = htmlBody.replace(/<(br|\/p|\/tr|\/h1|hr)[^>]*>/gi, "\n").replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/\n{3,}/g, "\n\n").trim();
  const m = env.EMAIL_FROM.match(/^(.*?)\s*<([^>]+)>$/);
  const from = m ? { name: m[1]!.trim(), email: m[2]!.trim() } : env.EMAIL_FROM;
  if (env.EMAIL) {
    try {
      await env.EMAIL.send({ from, to, subject, html: htmlBody, text, ...(replyTo ? { replyTo } : {}) });
      return true;
    } catch (e) { console.error(`Email Sending failed (${(e as { code?: string }).code ?? "?"}): ${(e as Error).message} — ${subject}`); if (!env.RESEND_API_KEY) return false; }
  }
  if (!env.RESEND_API_KEY) { console.warn(`Email not sent (no EMAIL binding or RESEND_API_KEY): ${subject}`); return false; }
  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST", headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "content-type": "application/json" },
      body: JSON.stringify({ from: env.EMAIL_FROM, to: [to], subject, html: htmlBody, text, ...(replyTo ? { reply_to: replyTo } : {}) }),
    });
    if (!r.ok) console.error(`Resend ${r.status}: ${await r.text()}`);
    return r.ok;
  } catch (e) { console.error(e); return false; }
}

