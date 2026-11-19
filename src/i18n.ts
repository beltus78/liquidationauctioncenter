import { en, type Strings } from "./strings/en";
import { fr } from "./strings/fr";
import { es } from "./strings/es";
import type { Cur } from "./catalog";

export const DICTS = { en, fr, es } satisfies Record<string, Strings>;
export type Lang = keyof typeof DICTS;
export const LANGS = Object.keys(DICTS) as Lang[];
export const isLang = (s: string): s is Lang => s in DICTS;
export const LANG_NAMES: Record<Lang, string> = { en: "English", fr: "Français", es: "Español" };
export const LOCALE: Record<Lang, string> = { en: "en-US", fr: "fr-CA", es: "es-US" };

/** First visit: Quebec → French; otherwise the browser language among en/fr/es; otherwise English. */
export function detectLang(region: string | undefined, country: string | undefined, accept: string | null): Lang {
  const browser = (accept ?? "").split(",").map((p) => p.trim().split(";")[0]!.toLowerCase().split("-")[0]!).filter(isLang);
  if (country === "CA" && region === "QC") return browser.includes("en") && browser[0] === "en" ? "en" : "fr";
  return browser[0] ?? "en";
}

export type T = Strings & { lang: Lang; locale: string; cur: Cur };
export const strings = (lang: Lang, cur: Cur): T => ({ ...DICTS[lang], lang, locale: LOCALE[lang], cur });
export const tk = (t: T, key: string) => (t as unknown as Record<string, string>)[key] ?? key;
export const fill = (s: string, v: Record<string, string | number>) => s.replace(/\{(\w+)\}/g, (_, k: string) => String(v[k] ?? ""));

export function money(n: number, t: T, decimals = false) {
  const s = new Intl.NumberFormat(t.locale, { style: "currency", currency: t.cur, currencyDisplay: "narrowSymbol", minimumFractionDigits: decimals ? 2 : 0, maximumFractionDigits: decimals ? 2 : 0 }).format(n);
  if (t.cur !== "CAD") return s;
  return t.lang === "fr" ? `${s} CA` : `CA${s}`;
}
export const num = (n: number, t: T) => new Intl.NumberFormat(t.locale).format(n);
