-- Allow PayPal as a payment method (SQLite can't alter a CHECK constraint, so the table is rebuilt).
CREATE TABLE orders_new (
  id TEXT PRIMARY KEY,
  order_number TEXT NOT NULL UNIQUE,
  mode TEXT NOT NULL CHECK (mode IN ('order','quote')),
  lang TEXT NOT NULL,
  currency TEXT NOT NULL CHECK (currency IN ('USD','CAD')),
  full_name TEXT NOT NULL,
  company TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  buyer_type TEXT NOT NULL,
  tax_id TEXT,
  country TEXT NOT NULL CHECK (country IN ('US','CA')),
  region TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  postal TEXT NOT NULL,
  delivery_type TEXT NOT NULL,
  payment TEXT NOT NULL CHECK (payment IN ('paypal','wire','zelle','cashapp','applepay','chime','interac')),
  pay_by TEXT NOT NULL,
  notes TEXT,
  items TEXT NOT NULL,
  subtotal_usd REAL NOT NULL CHECK (subtotal_usd <= 10000 OR payment = 'wire'),
  status TEXT NOT NULL DEFAULT 'new',
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
);
INSERT INTO orders_new SELECT * FROM orders;
DROP TABLE orders;
ALTER TABLE orders_new RENAME TO orders;
CREATE INDEX orders_created ON orders (created_at);
