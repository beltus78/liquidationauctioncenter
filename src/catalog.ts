import LOTS_JSON from "./data-lots.json";

// ⚠️ Placeholders — replace before launch (also used in emails and legal pages).
export const SITE = {
  name: "Liquidation Auction Center",
  domain: "liquidationauctioncenter.com",
  url: "https://liquidationauctioncenter.com",
  company: "Liquidation Auction Center",
  address1: "[Street address]",
  address2: "[City, State ZIP]",
  stateOfReg: "[State of registration]",
  email: "sales@liquidationauctioncenter.com",
  phone: "+1 (450) 485-9006",
};

export type Lang3 = { en: string; fr: string; es: string };
export type Lot = {
  no: number; slug: string; cat: CatSlug; type: LotType; source: string; cond: Cond; units: number; unit: string;
  price: number; retail: number; img: string; own_photo: boolean;
  name: Lang3; title: Lang3; items: { en: string[]; fr: string[]; es: string[] }; note: Lang3;
};

export const CATS = ["tools", "electronics", "phones", "appliances", "toys", "apparel", "beauty", "home", "grocery", "general"] as const;
export type CatSlug = (typeof CATS)[number];
export const TYPES = ["casepack", "gaylord", "pallet", "truckload"] as const;
export type LotType = (typeof TYPES)[number];
export const CONDS = ["returns", "overstock", "shelfpulls", "mixed"] as const;
export type Cond = (typeof CONDS)[number];
export const SOURCES = ["homedepot", "walmart", "target", "amazon", "costco", "kohls", "qvc", "cvs", "dollargeneral", "manufacturer", "mixed"] as const;

export const LOTS = (LOTS_JSON as Lot[]).slice().sort((a, b) => a.no - b.no);
export const BY_SLUG = new Map(LOTS.map((l) => [l.slug, l]));
export const FEATURED = ["milwaukee-m18-fuel-kits-pallet", "ps5-console-pallet", "premium-electronics-gaylord", "toy-gaylord-lego-star-wars", "instant-pot-vacuum-mix-pallet", "walmart-general-merchandise-pallet", "iphone-mixed-generations-case-pack", "shoebox-mixed-footwear-pallet"];

// ---------- money ----------
export const CAD_RATE = 1.37; // USD → CAD for display only (approximate); update when the rate moves
export type Cur = "USD" | "CAD";
export const toCur = (usd: number, cur: Cur) => (cur === "CAD" ? Math.round(usd * CAD_RATE) : usd);

// ---------- order rules (shared with the browser script) ----------
export const MAX_PAY_DAYS = 3;
export const WIRE_ONLY_OVER_USD = 10000;
export const PAY_US = ["wire", "zelle", "cashapp", "applepay", "chime"] as const;
export const PAY_CA = ["interac", "wire"] as const;
export type PayMethod = (typeof PAY_US)[number] | (typeof PAY_CA)[number];
export function allowedPay(country: "US" | "CA", subtotalUsd: number): PayMethod[] {
  if (subtotalUsd > WIRE_ONLY_OVER_USD) return ["wire"];
  return country === "CA" ? [...PAY_CA] : [...PAY_US];
}

export const US_STATES = ["AL","AK","AZ","AR","CA","CO","CT","DE","DC","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY","PR"];
export const CA_PROV = ["AB","BC","MB","NB","NL","NS","NT","NU","ON","PE","QC","SK","YT"];
