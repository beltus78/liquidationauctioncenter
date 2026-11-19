import type { PayMethod } from "./catalog";

// ⚠️ PLACEHOLDERS — replace with the real account details before launch.
// These lines are sent ONLY in the buyer's confirmation email; they never appear on the website.
export const PAY_DETAILS: Record<PayMethod, { lines: string[] }> = {
  wire: { lines: ["Bank: [Bank name]", "Account name: Liquidation Auction Center", "Account no.: [Account number]", "ABA / routing (wire): [Routing number]", "SWIFT (Canada & international): [SWIFT/BIC]", "Bank address: [Bank address]"] },
  zelle: { lines: ["Zelle to: [Zelle email or phone]", "Name shown: Liquidation Auction Center"] },
  cashapp: { lines: ["Cash App: [$Cashtag]"] },
  applepay: { lines: ["Apple Pay / Apple Cash to: [phone or email]"] },
  chime: { lines: ["Chime Pay to: [$ChimeSign or phone]"] },
  interac: { lines: ["Interac e-Transfer to: [email]", "Security answer (if asked): your order number", "Auto-deposit: [yes/no]"] },
};
