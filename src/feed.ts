// Google Merchant Center product feed: /feeds/google-us.xml (fetched daily by Merchant Center).
// Titles come from src/data-lots.json, which never names a retailer or product brand.
// Lots that Google often flags as counterfeit or restricted when sold below retail (sealed phones,
// consoles, designer fragrance, branded sneakers, trading cards, satellite kits, mystery lots) stay
// on the website but are left out of the feed.
import { LOTS, SITE, type Lot } from "./catalog";

export const FEED_EXCLUDE = new Set([1011, 1012, 1013, 1019, 1022, 1023, 1024, 1025, 1026, 1040, 1043, 1044, 1045, 1053, 1055, 1075]);

const CAT_PT: Record<string, string> = {
  tools: "Hardware > Tools", electronics: "Electronics", phones: "Electronics > Communications", appliances: "Home & Garden > Household Appliances",
  toys: "Toys & Games", apparel: "Apparel & Accessories", beauty: "Health & Beauty", home: "Home & Garden", grocery: "Food, Beverages & Tobacco", general: "Business & Industrial > Retail",
};
const TYPE_W: Record<string, string> = { casepack: "case pack", gaylord: "gaylord box", pallet: "pallet", truckload: "truckload" };
const COND_W: Record<string, string> = { returns: "customer returns", overstock: "new overstock", shelfpulls: "shelf pulls", mixed: "mixed condition" };

const x = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function desc(l: Lot) {
  const items = l.items.en;
  const list = items.slice(0, -1).join(", ") + " and " + items[items.length - 1];
  const unit = l.unit === "pallets" ? "pallets" : "units";
  return `Wholesale liquidation ${TYPE_W[l.type]} of about ${l.units.toLocaleString("en-US")} ${unit} (${COND_W[l.cond]}). ` +
    `Loads like this usually include ${list}. ${l.note.en} ` +
    `Sold as one lot to resellers and businesses; contents vary from load to load and are not guaranteed. Freight is quoted to your address before payment. Ships within the United States and Canada.`;
}

export function googleFeed(): Response {
  const items = LOTS.filter((l) => !FEED_EXCLUDE.has(l.no)).map((l) => {
    const imgs = Array.from({ length: l.gallery }, (_, i) => `${SITE.url}${l.img}-g${i + 1}-md.webp`).slice(0, 10);
    // Overstock and shelf pulls are unused stock; returns and mixed loads are sold as used.
    const cond = l.cond === "overstock" || l.cond === "shelfpulls" ? "new" : "used";
    return `<item>
<g:id>LAC-${l.no}</g:id>
<g:title>${x(l.title.en)}</g:title>
<g:description>${x(desc(l))}</g:description>
<g:link>${SITE.url}/en/lot/${l.slug}</g:link>
<g:image_link>${SITE.url}${l.img}-md.webp</g:image_link>
${imgs.map((u) => `<g:additional_image_link>${u}</g:additional_image_link>`).join("\n")}
<g:availability>in_stock</g:availability>
<g:price>${l.price.toFixed(2)} USD</g:price>
<g:condition>${cond}</g:condition>
<g:identifier_exists>no</g:identifier_exists>
<g:is_bundle>yes</g:is_bundle>
<g:product_type>${x(CAT_PT[l.cat] ?? "Business & Industrial")} &gt; Liquidation ${x(TYPE_W[l.type]!)}</g:product_type>
</item>`;
  });
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0"><channel>
<title>${x(SITE.name)}</title><link>${SITE.url}</link><description>Wholesale liquidation lots</description>
${items.join("\n")}
</channel></rss>`;
  return new Response(body, { headers: { "content-type": "application/xml; charset=utf-8", "cache-control": "public, max-age=3600" } });
}
