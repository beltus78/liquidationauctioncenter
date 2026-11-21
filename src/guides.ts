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
- Shipping is free to the 48 contiguous US states; our [shipping page](/shipping) explains delivery options and how freight to Canada, Alaska, Hawaii and Puerto Rico is quoted.

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
  {
    slug: "liquidation-lot-profit-cost-per-unit-retail-value",
    title: "How to Work Out Profit on a Liquidation Lot: Cost per Unit, Retail Value and Recovery",
    seoTitle: "Liquidation Lot Profit: Cost per Unit, Retail Value & Recovery",
    description: "How resellers estimate profit on a liquidation lot: landed cost per unit, what estimated retail really means, realistic resale prices and unsellable units.",
    excerpt: "A low lot price is only half the story. This is the simple worksheet experienced resellers use to turn a lot listing into a landed cost per unit and a realistic profit range.",
    published: "2026-11-20",
    body: `Every lot on a liquidation site shows three numbers: the lot price, an estimated retail value and a unit count. New buyers tend to compare the first two and stop there. Experienced resellers ignore the headline gap and work out **what each sellable unit actually costs them once it is on their shelf** — and what it will realistically sell for.

This guide walks through that calculation step by step. It uses no real prices; plug in the numbers from the lot you are looking at.

## Step 1: Start from landed cost, not lot price

The lot price is what you pay us. Your real cost is the **landed cost** — everything you spend until the goods are ready to sell:

- the lot price
- freight to your door (LTL or truckload; see [shipping](/shipping))
- liftgate, residential or appointment fees if your address needs them
- for Canadian buyers, customs brokerage, duty where it applies and GST/HST (see [buying from Canada](/canada))
- your own handling: unloading, testing, cleaning, photographing and listing

Add those together and divide by the unit count. That is your **landed cost per unit**, and it is the number that decides whether a lot is a good buy.

## Step 2: Read "estimated retail" for what it is

Estimated retail is the typical shelf price of the merchandise when new. It is useful for comparing lots of the same kind — a gaylord of returned tools against a pallet of returned tools — but it is **not** what you will sell the items for. Liquidation goods are usually resold below retail, and returned items sell further below retail than sealed overstock.

A practical way to use it: estimate what share of retail you normally achieve in your sales channel for that condition, based on your own past sales. A buyer selling sealed overstock on a marketplace will get a different share than a bin store selling tested returns at a flat price.

## Step 3: Allow for units you cannot sell

Customer returns always include some items that are damaged, incomplete or not worth repairing. Shelf pulls and overstock have far fewer. Be honest about this in your worksheet:

1. Count on a share of units being sold for parts, bundled cheaply or written off.
2. Use your own history with the same condition and category — not a hopeful guess.
3. Price the "good" units on what they sell for after testing, not on their best-case price.

Our lot pages describe each condition — **customer returns**, **new overstock**, **shelf pulls** and **mixed** — so you can match the allowance to the lot. See [how it works](/how-it-works) for what each condition usually means.

## Step 4: Put it together

A simple worksheet for any lot:

1. Landed cost ÷ unit count = landed cost per unit.
2. Expected sellable units = unit count minus your allowance for unsellable units.
3. Expected revenue = sellable units × your realistic average selling price.
4. Expected gross profit = expected revenue − landed cost − marketplace and payment fees.

If the result only works when every unit sells at your best price, the lot is too thin. If it still works with a cautious allowance, it is worth a closer look.

## Step 5: Compare lot sizes on the same basis

Bigger lots usually bring the cost per unit down, but they also bring more freight, more storage and more units to process before you see your money back. Our guide to [lot sizes](/guides/liquidation-lot-sizes-case-pack-gaylord-pallet-truckload) explains the trade-offs. Run the same worksheet for a [gaylord](/lots?type=gaylord), a pallet and a [truckload](/truckloads) of similar goods and compare the landed cost per unit and the time it will take you to sell through.

## Common mistakes

- **Comparing lots by retail value alone.** Two lots with the same estimated retail can have very different condition mixes.
- **Forgetting freight.** On small lots, freight can be a large part of the landed cost.
- **Ignoring your own time.** Testing and listing returned electronics takes far longer than restocking sealed overstock.
- **Buying outside your channel.** A great appliance lot is a poor buy if you have nowhere to sell large items.

## Ask before you buy

If a number on a listing is unclear, ask us. We can tell you what a lot type usually contains and help with a freight estimate before you commit — [request a quote](/order-list?mode=quote) or [contact us](/contact).`,
  },
  {
    slug: "liquidation-auction-vs-fixed-price-lots",
    title: "Liquidation Auctions vs Fixed-Price Lots: Which Is Better for Resellers?",
    seoTitle: "Liquidation Auctions vs Fixed-Price Lots for Resellers",
    description: "Bidding on liquidation auctions or buying fixed-price lots? How price certainty, fees, timing and planning differ, and which suits which reseller.",
    excerpt: "Auctions can look cheaper, fixed-price lots can look simpler. Here is what really changes between the two — total cost, timing, fees and how easy it is to plan your stock.",
    published: "2026-11-20",
    body: `There are two common ways to buy liquidation merchandise in the US and Canada: **bidding on auctions** run by marketplaces and retailers, or **buying lots at a fixed price** from a wholesaler. Despite our name, Liquidation Auction Center sells at fixed prices — there is no bidding. This guide explains the difference honestly so you can choose the right channel for your business, including when an auction might suit you better.

## How liquidation auctions work

On an auction platform, each lot is listed for a set period and buyers place bids. The highest bid wins when the timer ends. Many platforms add a **buyer's premium** or other fees on top of the winning bid, and freight is usually quoted or charged separately.

What auctions do well:

- Occasional bargains when few people bid on a lot.
- Direct access to a single retailer's returns stream on some platforms.

What makes them harder:

- **You don't know the final price** until the auction closes, so planning a budget across several lots is difficult.
- **Fees add up**: premiums, platform fees and freight can change the real cost a lot.
- **Timing is out of your hands** — you may win nothing for weeks, then several lots at once.
- Competitive categories, such as electronics and tools, often attract many bidders.

## How fixed-price lots work

With a fixed-price wholesaler you see a price, choose a lot and either order it or ask for a quote. On our site, each lot shows a "from" price, unit count, estimated retail and cost per unit; you add lots to an [order list](/order-list), choose a payment method and pay-by date, and we confirm availability and the delivered total before you pay. See [how it works](/how-it-works).

What fixed-price buying does well:

- **Price certainty** before you commit, so you can plan cash flow.
- **Repeatable buying**: if a lot type sells well for you, you can order it again.
- **One delivered total** with freight confirmed in writing.

What to keep in mind:

- You will not get the occasional "won it for almost nothing" auction result.
- Popular lot types can sell out between restocks.

## Comparing the true cost

Whichever route you use, compare lots on **landed cost per unit**, not on the headline price or winning bid. For an auction, add the bid, every fee and freight; for a fixed-price lot, add the lot price and freight. Our guide to [working out profit on a lot](/guides/liquidation-lot-profit-cost-per-unit-retail-value) shows the full worksheet.

## Which one suits you?

- **Bin stores and discount shops** that need a steady flow of stock every week usually prefer fixed-price lots, because they can plan deliveries and budget.
- **Marketplace sellers testing a new category** can start with smaller fixed-price lots such as case packs or gaylords — see [lot sizes](/guides/liquidation-lot-sizes-case-pack-gaylord-pallet-truckload) — before committing to bigger loads.
- **Experienced buyers with spare time and storage** sometimes mix both: fixed-price lots for core stock, auctions for opportunistic extras.
- **Exporters and larger resellers** usually want [truckloads](/truckloads) at an agreed price with a confirmed pickup or delivery date.

## Questions to ask any seller

- Is the price final, or are there premiums and fees on top?
- Who arranges freight, and is the freight cost confirmed before payment?
- What condition is the merchandise, and what does that condition usually include?
- What happens if a delivery arrives damaged? (Ours is explained on the [returns and claims](/returns) page.)

If you would like a lot recommended for your channel, [tell us what you sell](/contact) and where you are based.`,
  },
  {
    slug: "home-depot-tool-return-pallets-what-to-expect",
    title: "Home Depot Tool Return Pallets: What's Inside and How to Test Before You Resell",
    seoTitle: "Home Depot Tool Return Pallets: What's Inside & How to Test",
    description: "What Home Depot tool return pallets usually contain, how to sort, test and grade cordless tools and batteries, and how to price returns for resale.",
    excerpt: "Tool returns are one of the most popular liquidation categories in North America. Here is what typically arrives on a Home Depot return pallet and a simple process for testing and grading it.",
    published: "2026-11-20",
    body: `Returned tools from big-box home improvement stores are a favourite with resellers: well-known brands, steady demand from contractors and DIYers, and items that are often barely used. They also need more work than sealed stock, because every unit has to be checked. This guide covers what a **tool return pallet** usually contains and how to process one efficiently.

*Retailer and brand names describe where merchandise was sourced or what it contains. We are not affiliated with or endorsed by these companies.*

## What a tool return pallet usually contains

Contents vary from load to load, but return pallets from home improvement retailers commonly include:

- cordless drills, impact drivers and combo kits
- batteries and chargers, sometimes sold separately
- saws, grinders, sanders and multi-tools
- outdoor power equipment such as trimmers and blowers
- hand tools, tool storage and accessories

Our [tool lots](/lots/tools) show the typical items and the condition for each lot, along with the source — for example [Home Depot lots](/lots?source=homedepot). Exact contents are never guaranteed for return loads.

## Why items come back

Customers return tools for many reasons: they bought the wrong model, the project finished early, the box was opened but the tool never used, or the item was faulty. That is why a return pallet is a **mix** — some units are like new, some need a missing part, and some don't work.

## A simple testing and grading process

1. **Sort on arrival.** Separate sealed boxes, opened-but-complete items, and loose or incomplete tools.
2. **Check batteries first.** Charge every battery with a matching charger and check it holds a charge. Set aside swollen, cracked or damaged batteries — don't charge or sell them.
3. **Power test each tool.** Run every function: speeds, clutch settings, forward and reverse, lights, blade or chuck movement. Listen for grinding and check for burning smells.
4. **Check for completeness.** Compare against the box or the manufacturer's spec sheet: guards, side handles, bits, cases, manuals.
5. **Grade honestly.** A simple scale works well: *New/sealed*, *Open box – complete*, *Used – tested working*, *For parts*.
6. **Record serials** if you plan to resell on marketplaces, so you can match returns from your own customers.

## Pricing returned tools

Price each grade differently. Sealed units usually sell closest to market price; tested open-box items sell below that; tools without batteries ("bare tools") sell to buyers who already own the battery platform. Kits can often be worth more split up — tool, battery and charger listed separately — if your channel supports it.

Before buying, run the numbers with your own expected prices and an allowance for units you can't sell — our [profit worksheet](/guides/liquidation-lot-profit-cost-per-unit-retail-value) shows how.

## Choosing the right lot size

- **Case packs and gaylords** are a good way to try tool returns without committing to a full load.
- **Pallets** suit shops and marketplace sellers with space for testing.
- **Truckloads** suit established resellers and exporters — see [truckloads](/truckloads).

Not sure which fits? Read our guide to [lot sizes](/guides/liquidation-lot-sizes-case-pack-gaylord-pallet-truckload).

## Safety and compliance

Follow the manufacturer's safety instructions when testing. Lithium-ion batteries need care: store them away from heat, don't sell damaged packs, and follow carrier rules if you ship them to your customers.

Ready to look? Browse [tool lots](/lots/tools) or [ask for a quote](/order-list?mode=quote) on a specific lot.`,
  },
  {
    slug: "receiving-liquidation-freight-dock-liftgate-damage-claims",
    title: "Receiving a Liquidation Pallet or Truckload: Dock, Liftgate, Inspection and Damage Claims",
    seoTitle: "Receiving Liquidation Freight: Liftgate, Inspection & Claims",
    description: "Receiving liquidation pallets and truckloads in the US and Canada: delivery types, liftgate, what to check before you sign and how to report freight damage.",
    excerpt: "The few minutes when the truck arrives decide whether a freight problem can be fixed. Here is how to prepare for delivery, inspect pallets and note damage correctly.",
    published: "2026-11-20",
    body: `Buying the right lot is only part of the job. **How you receive it** matters too: the right delivery type avoids extra fees, and a careful inspection before you sign protects you if a pallet arrives damaged. This guide covers LTL pallets and full truckloads delivered across the US and Canada.

## Choose the right delivery type when you order

When you place an order or ask for a quote on our [order list](/order-list), you choose a delivery type. Choose the one that matches your address — a wrong choice can mean a failed delivery or extra charges from the carrier.

- **Business with a loading dock.** The trailer backs up to your dock and pallets are unloaded with a pallet jack or forklift. Usually the simplest and lowest-cost option.
- **Business without a dock (liftgate).** The truck uses a hydraulic liftgate to lower each pallet to the ground. You need a flat, hard surface and a pallet jack to move pallets inside.
- **Residential delivery.** Possible for many pallet orders, but carriers usually add residential and liftgate fees, and large trucks may not reach every street.
- **Pickup.** Collect from the warehouse with your own truck or carrier, by appointment.

Full **truckloads** normally need a loading dock or a forklift able to unload a trailer. See [truckloads](/truckloads) and our [shipping page](/shipping).

## Before the truck arrives

- Make sure someone is available during the delivery window and has the order number.
- Clear a path and space for the pallets.
- Have a pallet jack ready for liftgate deliveries.
- Keep your phone on — drivers often call ahead.

## Inspect before you sign

The driver will ask you to sign the **delivery receipt** (the proof of delivery). Before signing:

1. **Count the pallets** and compare with your order confirmation.
2. **Walk around each pallet.** Look for crushed corners, torn or missing stretch wrap, broken pallet boards, leaking or wet boxes and signs of tipping.
3. **Photograph everything** — each side of each pallet — before it is broken down.
4. **Write any problem on the receipt** before you sign: for example "1 pallet wrap torn, corner crushed". A clean signature with no notes makes later freight claims much harder.

Don't refuse a delivery without contacting us first, unless the freight is obviously destroyed.

## After you unload

- Keep all packaging and pallets until you have checked the contents.
- Check for hidden damage as soon as possible.
- Report any transport damage, missing pallets or a clearly wrong load to us promptly with your order number, photos and a copy of the signed receipt. Our time limits and the full process are on the [returns and claims](/returns) page.

Remember that customer-return lots naturally contain some damaged or non-working items — that is part of the condition, not freight damage. Our guide on [working out profit on a lot](/guides/liquidation-lot-profit-cost-per-unit-retail-value) explains how to allow for them.

## Canadian deliveries

Shipments into Canada also clear customs before final delivery, and your customs broker may need your business details. Our guide to [buying from Canada](/guides/buying-us-liquidation-pallets-from-canada) covers the paperwork.

## Questions?

If you're unsure which delivery type fits your address, tell us when you [request a quote](/order-list?mode=quote) — we'll confirm the delivered total and delivery options before you pay.`,
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
