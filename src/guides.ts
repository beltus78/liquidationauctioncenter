// Buyer guides (SEO articles). English only — served at /en/guides and /en/guides/<slug>;
// other languages redirect there. The automated SEO task appends new guides to GUIDES.
//
// Body format (simple markdown): "## " / "### " headings, blank line between paragraphs,
// "- " bullet lists, "1. " numbered lists, **bold**, [text](/path). Internal paths are written
// WITHOUT the language prefix (e.g. /lots/tools, /how-it-works) — the renderer adds /en.
// Every internal link must point to a page that exists (see src/index.ts route()).
// Never write prices, guaranteed contents/condition, invented statistics or reviews.

export type Guide = {
  slug: string;
  title: string; // H1
  seoTitle?: string; // full <title> used as-is, ≤ 65 chars (otherwise the H1 + " | Liquidation Auction Center")
  description: string; // meta description, 140–160 chars
  excerpt: string; // 1–2 sentences for the guides index
  published: string; // YYYY-MM-DD
  updated?: string; // YYYY-MM-DD
  body: string;
};

export const GUIDES: Guide[] = [
  {
    slug: "liquidation-lot-sizes-case-pack-gaylord-pallet-truckload",
    title: "Case Pack, Gaylord, Pallet or Truckload? How to Choose a Liquidation Lot Size",
    seoTitle: "Liquidation Lot Sizes: Case Pack, Gaylord, Pallet or Truckload",
    description: "Case packs, gaylords, pallets and truckloads compared: unit counts, freight, storage and risk, so resellers can pick the right liquidation lot size.",
    excerpt: "The same merchandise can be bought four ways. Here is how unit count, freight, storage space and risk change as lots get bigger — and which size suits which kind of reseller.",
    published: "2026-11-20",
    body: `Most liquidation buyers start by choosing a category — tools, electronics, toys — and only later realise that the **size of the lot** matters just as much. The same returned power tools can arrive as a small carton, a tall gaylord box, a wrapped pallet or a full trailer. Each format changes what you pay per unit, what freight costs, how much room you need and how much risk you carry.

This guide walks through the four lot sizes we sell and who each one fits best.

## The four formats at a glance

- **Case pack** — a sealed master carton or small box of similar items. Easiest to store and the lowest total spend.
- **Gaylord** — a large corrugated box (usually around 48 × 40 inches at the base) packed loose on a pallet. Holds many smaller or mixed items.
- **Pallet** — merchandise stacked and shrink-wrapped on a standard 48 × 40-inch pallet, often still in retail boxes.
- **Truckload** — a full 53-foot trailer, typically 22–26 pallets, for buyers with warehouse space and steady sales channels.

Every lot on our [catalogue](/lots) shows the approximate unit count, the estimated retail value and the cost per unit, so you can compare formats side by side.

## Case packs: the low-risk starting point

Case packs suit new resellers, eBay and Facebook Marketplace sellers, and anyone testing a category before committing. Because the items are usually similar (for example one model of earbuds or one tool line), it is easier to research resale prices before you buy.

What to weigh:

- Cost per unit is usually higher than in a pallet or truckload of the same goods.
- Freight per unit is higher too, although a carton can often travel by parcel or be combined with other lots.
- Fewer units means less room for one or two defective items to be absorbed.

## Gaylords: volume without the full pallet stack

A gaylord is the classic "mystery box" format for smaller merchandise — phone accessories, cosmetics, small kitchen items, toys. Items are packed loose, so you get a high piece count in one footprint.

What to weigh:

- Sorting takes time. Plan space and hours to open, test, clean and list items.
- Contents are mixed by nature, so expect variety in brands, sizes and condition.
- A gaylord ships as one pallet space, which keeps freight predictable.

Browse current [gaylord lots](/lots?type=gaylord) to see typical unit counts.

## Pallets: the reseller workhorse

Pallets are the format most store owners, flea-market vendors and bin-store operators buy repeatedly. Larger items — appliances, power tool kits, home goods — usually come this way.

What to weigh:

- Cost per unit drops noticeably compared with case packs.
- You need a way to receive a pallet: a loading dock, a forklift or pallet jack, or a liftgate delivery.
- Buying two or more pallets on the same shipment usually lowers freight per pallet. Our [shipping page](/shipping) explains how freight is quoted.

## Truckloads: lowest cost per unit, highest commitment

Truckloads are for established buyers who move volume every week — bin stores, discount retailers, exporters and wholesalers who split loads for smaller resellers. See current [truckload lots](/truckloads).

What to weigh:

- The biggest total spend, and the most units to sell before your cash comes back.
- You need dock access and warehouse space for 20+ pallets.
- Delivery is scheduled directly with you as a full truckload (FTL) shipment.

## How to choose: four questions

1. **How fast do you sell?** Buy a size you can turn into cash within your normal cycle — a month is a common target for smaller sellers.
2. **Where will it go?** Measure your storage space and check how you can receive freight before you order.
3. **How much sorting can you handle?** Loose gaylords take more labour than boxed pallets of a single product line.
4. **Do you know the category?** Start small in a category you have not sold before; scale up in categories you know.

## Condition still matters at every size

Lot size does not change what is inside. Customer returns, overstock and shelf pulls behave differently whatever the format — returns need testing, overstock is usually new. Every lot page states its condition type, and our [how it works](/how-it-works) page explains what each one means. Liquidation stock is sold as described and without guarantees on individual items, so price your resale plan with some allowance for units you cannot sell.

## Ready to compare lots?

Filter the [full catalogue](/lots) by lot size and category, add the lots you want to your order list and either check out with a fixed price or [request a quote](/order-list?mode=quote) if you want freight priced first. Questions about which size fits your business? [Contact us](/contact) and we will help you choose.`,
  },
  {
    slug: "buying-us-liquidation-pallets-from-canada",
    title: "Buying US Liquidation Pallets from Canada: Freight, Customs, GST/HST and Payment",
    seoTitle: "Buying US Liquidation Pallets in Canada: Customs & GST/HST",
    description: "A practical guide for Canadian resellers buying liquidation pallets from US suppliers: freight, customs brokers, GST/HST, CAD pricing and Interac payment.",
    excerpt: "Most liquidation stock in North America comes from US retailers. Here is what Canadian buyers should plan for — freight, the customs broker, GST/HST and paying in a way that suits you.",
    published: "2026-11-20",
    body: `Canada has a fast-growing community of liquidation resellers — bin stores in Ontario, flea-market vendors in Quebec, online sellers in Alberta and BC. Most of the supply, though, comes from US retailers and their return centres. Buying across the border is very doable, but it adds a few steps that domestic US buyers never think about.

This guide covers what to plan for when you order liquidation lots from the US and have them delivered to a Canadian address.

## 1. Prices: USD versus CAD

Liquidation lots are usually priced in US dollars. On our site, visitors in Canada see prices converted to Canadian dollars for convenience; the exact amount you pay is confirmed in your order or quote confirmation. When you compare suppliers, make sure you compare like for like — one site's CAD price against another's, or both in USD.

## 2. Freight across the border

Pallets and gaylords usually travel to Canada by **LTL (less-than-truckload) freight**, and full trailers as **FTL**. Cross-border freight costs more than a domestic US shipment, so a few habits make a real difference:

- **Combine lots.** Two or three pallets on one shipment usually cost less per pallet than the same pallets sent separately.
- **Know your delivery type.** A business with a loading dock gets the lowest rate. Residential delivery or a site without a dock needs a liftgate truck, which adds a fee.
- **Expect longer transit.** Cross-border LTL typically takes several business days longer than a domestic US delivery. Our [shipping page](/shipping) lists our current estimates.

## 3. Customs and the customs broker

Every commercial shipment entering Canada has to be declared to the Canada Border Services Agency (CBSA). In practice, most buyers use a **customs broker** — often arranged through the freight carrier — who files the paperwork and pays duties and taxes on your behalf, then bills you.

What the broker needs from the seller:

- A **commercial invoice** describing the goods, their value and country of origin.
- The buyer's name, address and, for businesses, the CRA **business number** with an import-export account.

We send cross-border lots with a commercial invoice and the details your broker needs. Brokerage fees, duties and taxes are paid by the buyer, and we estimate them in your quote so they are not a surprise.

## 4. Duties: does CUSMA apply?

Goods that qualify as originating under CUSMA (the Canada–United States–Mexico Agreement) can often enter Canada duty-free. But liquidation stock is made all over the world — a pallet of US-returned electronics may be manufactured in Asia — and the trade agreement looks at where goods were made, not where they were bought. Ask about country of origin for the specific lot, and let your broker confirm the duty treatment before you commit to a large order.

## 5. GST, HST, QST and PST

GST is charged on most goods imported into Canada, normally collected through the broker when the shipment clears. How the provincial portion works — HST in participating provinces, QST in Quebec, PST in BC, Saskatchewan and Manitoba — depends on your province and whether your business is registered. If you buy to resell, input tax credits may allow a registered business to recover GST/HST paid. Your accountant can confirm what applies to you; for budgeting, include the tax in your landed cost from the start.

Our checkout includes a GST/HST number field for Canadian businesses so your details appear on the paperwork.

## 6. Paying for a cross-border order

Wire transfer works from any Canadian bank but can carry fees on both sides. Many Canadian buyers prefer **Interac e-Transfer** for smaller orders. On our site, Canadian buyers can choose Interac e-Transfer or wire; orders over a set amount are paid by wire only. Payment instructions are sent by email with your confirmation, and you choose a pay-by date within three days.

## 7. Work out your landed cost

Before ordering, add everything up so your resale plan is realistic:

- Lot price (in CAD)
- Freight to your door
- Brokerage fee
- Any duty that applies
- GST (and any provincial tax you cannot recover)

Divide the total by the approximate unit count and you have a **landed cost per unit** you can compare against local resale prices.

## Start with lots that travel well

Dense, boxed merchandise — power tools, small appliances, sealed electronics — tends to carry its cross-border freight better than bulky low-value goods. Browse our [Canada page](/canada) or the full [catalogue](/lots), add lots to your order list and [request a quote](/order-list?mode=quote) to see freight to your postal code before you pay. Questions about a specific lot's origin or paperwork? [Contact us](/contact).

*This guide is general information, not tax or customs advice. Rules change; confirm current requirements with the CBSA, a licensed customs broker or your accountant.*`,
  },
];

export const GUIDE_BY = new Map(GUIDES.map((g) => [g.slug, g]));
export const guidesNewestFirst = () => GUIDES.slice().sort((a, b) => b.published.localeCompare(a.published) || a.title.localeCompare(b.title));

const esc = (v: unknown) => String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

function inline(s: string, href: (p: string) => string) {
  return esc(s)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/(^|[^*])\*([^*]+)\*(?!\*)/g, "$1<em>$2</em>")
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, text: string, u: string) => {
      const raw = u.replace(/&amp;/g, "&");
      const ext = /^https?:\/\//.test(raw);
      return `<a href="${esc(ext ? raw : href(raw))}"${ext ? ' rel="noopener" target="_blank"' : ""}>${text}</a>`;
    });
}

/** Tiny markdown renderer for guide bodies (see format notes at the top). */
export function renderMd(src: string, href: (p: string) => string) {
  const out: string[] = [];
  let para: string[] = [];
  let list: { tag: "ul" | "ol"; items: string[] } | null = null;
  const flushP = () => { if (para.length) { out.push(`<p>${inline(para.join(" "), href)}</p>`); para = []; } };
  const flushL = () => { if (list) { out.push(`<${list.tag}>${list.items.map((i) => `<li>${inline(i, href)}</li>`).join("")}</${list.tag}>`); list = null; } };
  for (const raw of src.split("\n")) {
    const l = raw.trim();
    if (!l) { flushP(); flushL(); continue; }
    const h = l.match(/^(#{2,3}) (.+)$/);
    if (h) { flushP(); flushL(); out.push(`<h${h[1]!.length}>${inline(h[2]!, href)}</h${h[1]!.length}>`); continue; }
    const ul = l.match(/^- (.+)$/);
    const ol = l.match(/^\d+\. (.+)$/);
    if (ul || ol) {
      flushP();
      const tag = ul ? "ul" : "ol";
      if (list && list.tag !== tag) flushL();
      list ??= { tag, items: [] };
      list.items.push((ul ?? ol)![1]!);
      continue;
    }
    flushL();
    para.push(l);
  }
  flushP(); flushL();
  return out.join("");
}

/** Internal links used in a guide body (for checks). */
export const linksIn = (body: string) => [...body.matchAll(/\]\((\/[^)\s]*)\)/g)].map((m) => m[1]!);
