"""Build src/data-lots.json from tools/lots.py.  Run: python3 tools/build-data.py"""
import json, os, sys
HERE = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, HERE)
from lots import L

TYPE = {"pallet": ("Pallet", "palette", "palé"), "gaylord": ("Gaylord", "gaylord", "gaylord"),
        "casepack": ("Case Pack", "lot de caisses", "lote de cajas"), "truckload": ("Truckload", "camion complet", "camión completo")}
SRC = {"homedepot": "Home Depot", "walmart": "Walmart", "target": "Target", "amazon": "Amazon", "costco": "Costco",
       "kohls": "Kohl's", "qvc": "QVC", "cvs": "CVS", "dollargeneral": "Dollar General"}
COND = {"returns": ("Returns", "retours", "devoluciones"), "overstock": ("Overstock", "surstock", "excedente"),
        "shelfpulls": ("Shelf Pulls", "retraits de rayon", "retirados de estantería"), "mixed": ("Mixed Condition", "état mixte", "condición mixta")}
# share of estimated retail value the lot price represents (typical liquidation recovery)
RATIO = {"returns": 0.22, "overstock": 0.36, "shelfpulls": 0.30, "mixed": 0.25}
HIGH = {"phones"}  # sealed/branded phones recover much closer to retail

# Titles never name a retailer or product brand (Google Merchant Center / trademark safety).
# The lot's source stays a separate fact on the page, not part of the product name.
COND_T = {"returns": ("Customer Returns", "retours clients", "devoluciones de clientes"),
          "overstock": ("New Overstock", "surstock neuf", "excedente nuevo"),
          "shelfpulls": ("Shelf Pulls", "retraits de rayon", "retirados de estantería"),
          "mixed": ("Mixed Condition", "état mixte", "condición mixta")}
def phrase(src, cond, i):
    return COND_T[cond][i]

# Old slug -> new slug (old URLs 301 to the new ones in src/index.ts). Image files keep the old name.
RENAME = json.load(open(os.path.join(HERE, "slug-renames.json")))

def nice(n):
    step = 50 if n < 5000 else 100 if n < 20000 else 500
    return int(round(n / step) * step)

out = []
for no, r in enumerate(L, start=1001):
    slug0, cat, typ, src, cond, units, ukey, price, image, names, items, notes = r
    slug = RENAME.get(slug0, slug0)
    ratio = RATIO[cond]
    if cat in HIGH or (slug.startswith("ps5") and cond == "overstock"): ratio = 0.72 if cond == "overstock" else 0.5
    retail = nice(price / ratio)
    t = TYPE[typ]
    titles = [
        f"{names[0]} {t[0]} — {phrase(src, cond, 0)}",
        f"{names[1]} — {t[1]}, {phrase(src, cond, 1)}",
        f"{names[2]} — {t[2]}, {phrase(src, cond, 2)}",
    ]
    out.append({"no": no, "slug": slug, "cat": cat, "type": typ, "source": src, "cond": cond, "units": units, "unit": ukey,
                "price": price, "retail": retail, "img": f"/lots/{slug0}", "own_photo": image.startswith("p:"),
                "gallery": sum(os.path.exists(os.path.join(HERE, "..", "public", "lots", f"{slug0}-g{i}-md.webp")) for i in range(1, 9)),
                "name": {"en": names[0], "fr": names[1], "es": names[2]},
                "title": {"en": titles[0], "fr": titles[1], "es": titles[2]},
                "items": {"en": items[0], "fr": items[1], "es": items[2]},
                "note": {"en": notes[0], "fr": notes[1], "es": notes[2]}})
json.dump(out, open(os.path.join(HERE, "..", "src", "data-lots.json"), "w"), ensure_ascii=False, indent=1)
with open(os.path.join(HERE, "..", "lot-price-review.csv"), "w") as f:
    f.write("lot,slug,category,type,source,condition,units,unit,price_usd,est_retail_usd,cost_per_unit_usd,title_en\n")
    for o in out:
        f.write(f'{o["no"]},{o["slug"]},{o["cat"]},{o["type"]},{o["source"]},{o["cond"]},{o["units"]},{o["unit"]},{o["price"]},{o["retail"]},{o["price"]/o["units"]:.2f},"{o["title"]["en"]}"\n')
print(len(out), "lots")
