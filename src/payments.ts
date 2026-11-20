import type { PayMethod } from "./catalog";

// ⚠️ PLACEHOLDERS — replace with the real account details before launch.
// These lines are sent ONLY in the buyer's confirmation email; they never appear on the website.
export const PAY_DETAILS: Record<PayMethod, { lines: string[] }> = {
  wire: { lines: ["Bank: [Bank name]", "Account name: Liquidation Auction Center", "Account no.: [Account number]", "ABA / routing (wire): [Routing number]", "SWIFT (Canada & international): [SWIFT/BIC]", "Bank address: [Bank address]"] },
  paypal: { lines: ["PayPal: we will email you a PayPal invoice for the confirmed delivered total (lots + freight).", "Pay it with your PayPal account or any debit/credit card — no PayPal account needed.", "Invoices only come from our PayPal business account in the name Liquidation Auction Center."] },
  zelle: { lines: ["Zelle to: [Zelle email or phone]", "Name shown: Liquidation Auction Center"] },
  cashapp: { lines: ["Cash App: [$Cashtag]"] },
  applepay: { lines: ["Apple Pay / Apple Cash to: [phone or email]"] },
  chime: { lines: ["Chime Pay to: [$ChimeSign or phone]"] },
  interac: { lines: ["Interac e-Transfer to: [email]", "Security answer (if asked): your order number", "Auto-deposit: [yes/no]"] },
};
