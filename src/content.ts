// Long-form page content in English, French and Spanish.
// ⚠️ Operational promises (reply times, shipping days, claim window, inspections) — confirm they match how you work.
import type { Lang } from "./i18n";

type Sec = [heading: string, paragraphs: string[]];
type QA = [q: string, a: string];

export const HOW: Record<Lang, Sec[]> = {
  en: [
    ["1. Browse lots with real numbers", ["Every lot shows its lot number, approximate unit count, estimated retail value, cost per unit, condition and where the merchandise comes from. Prices are fixed, and shipping is free in the contiguous US.", "Prices show in US dollars, or in Canadian dollars if you're browsing from Canada. Switch currency any time in the header."]],
    ["2. Build your order list", ["Add one lot or many. You can mix categories and lot sizes, for example a tool pallet, a toy gaylord and a case pack of AirPods, in one shipment."]],
    ["3. Order now or ask for a quote", ["Choose “Place my order” to reserve the lots at the listed prices, or “Request a quote first” if you'd like us to confirm availability and delivery before you commit.", "Either way, you pick your payment method and the date you'll pay by, today or within the next 3 days. Orders over $10,000 are paid by bank wire."]],
    ["4. We confirm your order", ["Within one business day we email your total and delivery date (shipping is free in the contiguous US; freight to Canada, Alaska, Hawaii and Puerto Rico is quoted), or a pickup time at our dock, with payment instructions for the method you chose. Payment details are never shown on the website, only in that email."]],
    ["5. Pay, ship, resell", ["Once payment clears, lots are wrapped, photographed and shipped within 2–5 business days. You get the tracking (PRO) number by email. Check your lots when they arrive and tell us within 48 hours if anything is materially different from the listing."]],
  ],
  fr: [
    ["1. Des lots avec de vrais chiffres", ["Chaque lot affiche son numéro, le nombre approximatif d'unités, la valeur de détail estimée, le coût par unité, l'état et la provenance de la marchandise. Les prix sont fixes et la livraison est gratuite dans les États-Unis contigus.", "Les prix s'affichent en dollars américains, ou en dollars canadiens si vous naviguez depuis le Canada. Changez de devise à tout moment dans l'en-tête."]],
    ["2. Composez votre liste", ["Ajoutez un ou plusieurs lots. Vous pouvez combiner catégories et tailles (par exemple une palette d'outils, un gaylord de jouets et un lot d'AirPods) dans un même envoi."]],
    ["3. Commandez ou demandez une soumission", ["Choisissez « Passer ma commande » pour réserver les lots aux prix affichés, ou « Demander d'abord une soumission » si vous voulez que nous confirmions la disponibilité et la livraison avant de vous engager.", "Dans les deux cas, vous choisissez votre mode de paiement et la date de paiement, aujourd'hui ou dans les 3 jours suivants. Les commandes de plus de 10 000 $ US se paient par virement bancaire."]],
    ["4. Nous confirmons votre commande", ["En un jour ouvrable, nous vous envoyons par courriel votre total et la date de livraison (livraison gratuite dans les États-Unis contigus ; transport soumis pour le Canada, l'Alaska, Hawaï et Porto Rico) ou un créneau d'enlèvement, avec les instructions de paiement. Les coordonnées de paiement n'apparaissent jamais sur le site."]],
    ["5. Payez, recevez, revendez", ["Dès réception du paiement, les lots sont emballés, photographiés et expédiés sous 2 à 5 jours ouvrables. Vous recevez le numéro de suivi (PRO) par courriel. Vérifiez vos lots à l'arrivée et signalez-nous sous 48 heures toute différence importante avec la fiche."]],
  ],
  es: [
    ["1. Lotes con cifras reales", ["Cada lote muestra su número, el número aproximado de unidades, el valor estimado en tienda, el costo por unidad, la condición y el origen de la mercancía. Los precios son fijos y el envío es gratis en EE. UU. continental.", "Los precios aparecen en dólares estadounidenses, o en dólares canadienses si navegas desde Canadá. Cambia de moneda cuando quieras en el encabezado."]],
    ["2. Arma tu lista de pedido", ["Agrega uno o varios lotes. Puedes combinar categorías y tamaños (por ejemplo un palé de herramientas, un gaylord de juguetes y un lote de AirPods) en un solo envío."]],
    ["3. Pide ya o solicita cotización", ["Elige «Hacer mi pedido» para apartar los lotes a los precios publicados, o «Pedir cotización primero» si quieres que confirmemos disponibilidad y entrega antes de comprometerte.", "En ambos casos eliges el método de pago y la fecha en que pagarás: hoy o dentro de los próximos 3 días. Los pedidos de más de 10 000 USD se pagan por transferencia bancaria."]],
    ["4. Confirmamos tu pedido", ["En un día hábil te enviamos por correo tu total y la fecha de entrega (envío gratis en EE. UU. continental; flete cotizado a Canadá, Alaska, Hawái y Puerto Rico) o un horario de recogida, con las instrucciones de pago del método elegido. Los datos de pago nunca aparecen en el sitio."]],
    ["5. Paga, recibe y revende", ["Cuando se acredita el pago, los lotes se envuelven, se fotografían y se envían en 2 a 5 días hábiles. Recibes el número de rastreo (PRO) por correo. Revisa tus lotes al llegar y avísanos en 48 horas si algo es muy distinto a la ficha."]],
  ],
};

export const SHIPPING: Record<Lang, Sec[]> = {
  en: [
    ["Where we deliver", ["All 50 US states, Puerto Rico and every Canadian province and territory. Pallets and gaylords travel by LTL freight; truckloads travel as a full truckload (FTL) on a 53-ft trailer."]],
    ["Free shipping in the contiguous US", ["Standard shipping is free on every lot delivered to the 48 contiguous US states: LTL for case packs, gaylords and pallets, full truckload for truckloads. The price you see is the price you pay for the merchandise and the freight.", "Freight to Alaska, Hawaii, Puerto Rico and Canada is quoted per order, based on the number of pallets and the destination. Your quote or order confirmation shows the exact amount before you pay."]],
    ["Delivery types", ["Business with a loading dock: included in free shipping. Business without a dock or residential delivery: a liftgate truck lowers the pallet to the ground (optional, extra fee shown in your confirmation). Dock pickup: collect at our warehouse by appointment with your own truck or carrier; you'll need a vehicle that can take a 48×40-inch pallet."]],
    ["Shipping to Canada", ["Cross-border loads ship with a commercial invoice and the paperwork your broker needs. Duties, GST/HST and customs brokerage are the buyer's responsibility and are estimated in your quote. Most merchandise is US-sourced; ask us about country of origin for specific lots."]],
    ["Timing", ["Lots ship within 2–5 business days after payment clears. Typical LTL transit is 2–7 business days in the continental US and 4–10 business days to Canada. Truckloads are scheduled with you directly."]],
    ["When it arrives", ["Count pallets and note visible damage on the delivery receipt before you sign. Take photos. Report any problem within 48 hours as described in our Returns & arrival claims policy."]],
  ],
  fr: [
    ["Où nous livrons", ["Dans les 50 États américains, à Porto Rico et dans chaque province et territoire du Canada. Palettes et gaylords voyagent en LTL ; les camions complets en charge complète (FTL) sur remorque de 53 pi."]],
    ["Livraison gratuite dans les États-Unis contigus", ["La livraison standard est gratuite pour tout lot livré dans les 48 États contigus : LTL pour les lots de caisses, gaylords et palettes, charge complète pour les camions. Le prix affiché comprend la marchandise et le transport.", "Le transport vers l'Alaska, Hawaï, Porto Rico et le Canada est soumis pour chaque commande selon le nombre de palettes et la destination. Votre soumission ou confirmation indique le montant exact avant paiement."]],
    ["Types de livraison", ["Entreprise avec quai : compris dans la livraison gratuite. Entreprise sans quai ou résidence : un camion à hayon descend la palette au sol (en option, supplément indiqué dans votre confirmation). Enlèvement : à notre entrepôt sur rendez-vous, avec votre camion ou transporteur ; prévoyez un véhicule pouvant prendre une palette de 48 × 40 po."]],
    ["Livraison au Canada", ["Les envois transfrontaliers partent avec une facture commerciale et les documents dont votre courtier a besoin. Les droits, la TPS/TVH et le courtage sont à la charge de l'acheteur et estimés dans la soumission. La plupart des marchandises proviennent des États-Unis ; demandez-nous le pays d'origine d'un lot précis."]],
    ["Délais", ["Les lots partent 2 à 5 jours ouvrables après réception du paiement. Le transit LTL est en général de 2 à 7 jours ouvrables aux États-Unis continentaux et de 4 à 10 jours ouvrables vers le Canada. Les camions complets sont planifiés avec vous."]],
    ["À la réception", ["Comptez les palettes et notez tout dommage visible sur le bon de livraison avant de signer. Prenez des photos. Signalez tout problème sous 48 heures selon notre politique de retours et réclamations."]],
  ],
  es: [
    ["A dónde entregamos", ["A los 50 estados de EE. UU., Puerto Rico y todas las provincias y territorios de Canadá. Palés y gaylords viajan por flete LTL; los camiones completos como carga completa (FTL) en tráiler de 53 pies."]],
    ["Envío gratis en EE. UU. continental", ["El envío estándar es gratis en todo lote entregado en los 48 estados contiguos de EE. UU.: LTL para lotes de cajas, gaylords y palés, carga completa para camiones. El precio que ves incluye la mercancía y el flete.", "El flete a Alaska, Hawái, Puerto Rico y Canadá se cotiza por pedido según la cantidad de palés y el destino. Tu cotización o confirmación muestra el monto exacto antes de pagar."]],
    ["Tipos de entrega", ["Negocio con muelle: incluido en el envío gratis. Negocio sin muelle o domicilio: un camión con rampa elevadora baja el palé al suelo (opcional, costo extra indicado en tu confirmación). Recogida: en nuestro almacén con cita, con tu camión o transportista; necesitas un vehículo para un palé de 48×40 pulgadas."]],
    ["Envíos a Canadá", ["Los envíos transfronterizos salen con factura comercial y los documentos que necesita tu agente aduanal. Aranceles, GST/HST y agenciamiento corren por cuenta del comprador y se estiman en la cotización. La mayoría de la mercancía es de origen estadounidense; pregúntanos el país de origen de un lote específico."]],
    ["Tiempos", ["Los lotes salen de 2 a 5 días hábiles después de acreditado el pago. El tránsito LTL típico es de 2 a 7 días hábiles en EE. UU. continental y de 4 a 10 días hábiles a Canadá. Los camiones completos se programan contigo."]],
    ["Al recibir", ["Cuenta los palés y anota cualquier daño visible en el comprobante de entrega antes de firmar. Toma fotos. Reporta cualquier problema en 48 horas según nuestra política de devoluciones y reclamos."]],
  ],
};

export const RETURNS: Record<Lang, Sec[]> = {
  en: [
    ["Lots are sold as described", ["Liquidation merchandise is sold by the lot, in the condition stated on the listing (customer returns, overstock, shelf pulls or mixed). Unit counts are approximate and individual items are not guaranteed to work, be complete or be in retail packaging unless the listing says so.", "All sales are final: we don't accept returns or exchanges. The only exception is an arrival claim, described below."]],
    ["Arrival claims (48 hours)", ["If a lot arrives materially different from its listing (wrong category, far fewer units than stated, or a pallet missing from the shipment), email us within 48 hours of delivery with your order number, photos of the pallet as delivered and a short description.", "We review every claim within two business days and will offer a replacement lot, a partial credit or a refund, depending on the case."]],
    ["Freight damage", ["Note visible damage on the carrier's delivery receipt before signing and photograph it. Without a note on the receipt, carriers usually refuse damage claims."]],
    ["What isn't covered", ["Individual defective, used or incomplete items within a returns or mixed lot; normal variation in brands, sizes and colours; change of mind after payment; and lots resold or broken down before a claim is reported."]],
    ["Cancellations", ["You can cancel free of charge before payment. After payment and before the lot ships, cancellations may incur a restocking fee of up to 15%. Shipped lots can't be cancelled."]],
  ],
  fr: [
    ["Lots vendus tels que décrits", ["La marchandise de liquidation est vendue par lot, dans l'état indiqué sur la fiche (retours clients, surstock, retraits de rayon ou état mixte). Le nombre d'unités est approximatif ; le fonctionnement, l'intégralité et l'emballage d'origine de chaque article ne sont pas garantis sauf mention contraire.", "Toutes les ventes sont finales : nous n'acceptons ni retours ni échanges. Seule exception : une réclamation à l'arrivée, décrite ci-dessous."]],
    ["Réclamations à l'arrivée (48 heures)", ["Si un lot arrive nettement différent de sa fiche (mauvaise catégorie, beaucoup moins d'unités qu'indiqué ou palette manquante), écrivez-nous sous 48 heures avec votre numéro de commande, des photos de la palette livrée et une brève description.", "Nous examinons chaque réclamation sous deux jours ouvrables et proposons un lot de remplacement, un crédit partiel ou un remboursement selon le cas."]],
    ["Dommages de transport", ["Notez tout dommage visible sur le bon du transporteur avant de signer et photographiez-le. Sans mention sur le bon, les transporteurs refusent généralement les réclamations."]],
    ["Exclusions", ["Les articles défectueux, usagés ou incomplets dans un lot de retours ou mixte ; les variations normales de marques, tailles et couleurs ; un changement d'avis après paiement ; et les lots revendus ou défaits avant la réclamation."]],
    ["Annulations", ["Annulation gratuite avant paiement. Après paiement et avant expédition, des frais de remise en stock jusqu'à 15 % peuvent s'appliquer. Un lot expédié ne peut pas être annulé."]],
  ],
  es: [
    ["Lotes vendidos según su descripción", ["La mercancía de liquidación se vende por lote, en la condición indicada en la ficha (devoluciones, excedente, retirados de estantería o mixta). El número de unidades es aproximado; no se garantiza que cada artículo funcione, esté completo o en su empaque original salvo que la ficha lo diga.", "Todas las ventas son finales: no aceptamos devoluciones ni cambios. La única excepción es un reclamo a la llegada, descrito abajo."]],
    ["Reclamos de llegada (48 horas)", ["Si un lote llega muy distinto a su ficha (otra categoría, muchas menos unidades de las indicadas o un palé faltante), escríbenos dentro de las 48 horas posteriores a la entrega con tu número de pedido, fotos del palé tal como llegó y una breve descripción.", "Revisamos cada reclamo en dos días hábiles y ofrecemos un lote de reemplazo, un crédito parcial o un reembolso según el caso."]],
    ["Daños en el flete", ["Anota cualquier daño visible en el comprobante del transportista antes de firmar y tómale fotos. Sin esa nota, los transportistas suelen rechazar los reclamos."]],
    ["Qué no se cubre", ["Artículos individuales defectuosos, usados o incompletos dentro de un lote de devoluciones o mixto; variaciones normales de marcas, tallas y colores; cambio de opinión después del pago; y lotes revendidos o separados antes de reportar el reclamo."]],
    ["Cancelaciones", ["Puedes cancelar sin costo antes de pagar. Después del pago y antes del envío puede aplicarse un cargo de reabastecimiento de hasta 15 %. Los lotes enviados no se pueden cancelar."]],
  ],
};

export const FAQ: Record<Lang, QA[]> = {
  en: [
    ["Is this an auction? Do I have to bid?", "No. Despite the name, every lot has a fixed price. There's no bidding, no buyer's premium and no account to create."],
    ["Do I need a business or resale certificate?", "We sell to businesses and resellers. A resale certificate (US) or GST/HST number (Canada) is optional on the form, but adding it helps with sales-tax exemption where it applies."],
    ["What's the difference between returns, overstock and shelf pulls?", "Customer returns were bought and sent back: many are like new, some need testing or parts. Overstock is new, unsold stock, usually sealed. Shelf pulls are unsold items pulled from stores, mostly unused with box wear."],
    ["Is the estimated retail value guaranteed?", "No. It's an estimate based on typical MSRP for that kind of load, to help you judge margin. Manifested lots list the retail value of each item."],
    ["Can I get a manifest or more photos?", "Yes, for most lots. Ask in the notes field or contact us and we'll send what's available for that lot."],
    ["How do I pay?", "All buyers can pay by PayPal — with a PayPal account or any debit/credit card, no account needed — via a PayPal invoice we email once your delivered total is confirmed. US buyers can also pay by bank wire/ACH, Zelle, Cash App, Apple Pay or Chime; Canadian buyers by Interac e-Transfer or bank wire. Orders over $10,000 USD are wire only. You choose the method and pay-by date (max. 3 days) at checkout; payment details come by email."],
    ["Do you ship to Canada?", "Yes, to every province and territory. Prices can be shown in CAD; duties, GST/HST and brokerage are estimated in your quote and paid by the buyer."],
    ["Can I pick up?", "Yes. Choose dock pickup at checkout and we'll book an appointment once your order is paid."],
    ["Is there a minimum order?", "No. You can buy a single case pack, and shipping is free to the contiguous US on every order."],
    ["What if my lot arrives wrong?", "Email us within 48 hours with photos. If it's materially different from the listing, we'll replace, credit or refund it."],
  ],
  fr: [
    ["Est-ce une vente aux enchères ? Dois-je miser ?", "Non. Malgré le nom, chaque lot a un prix fixe. Pas d'enchères, pas de frais d'acheteur et aucun compte à créer."],
    ["Faut-il une entreprise ou un certificat de revente ?", "Nous vendons aux entreprises et revendeurs. Le certificat de revente (É.-U.) ou le numéro TPS/TVH (Canada) est facultatif, mais il aide à appliquer l'exonération de taxe lorsque c'est possible."],
    ["Quelle différence entre retours, surstock et retraits de rayon ?", "Les retours clients ont été achetés puis rapportés : beaucoup sont comme neufs, certains demandent des tests ou des pièces. Le surstock est du stock neuf invendu, généralement scellé. Les retraits de rayon sont des invendus retirés des magasins, surtout inutilisés avec usure de boîte."],
    ["La valeur de détail estimée est-elle garantie ?", "Non. C'est une estimation fondée sur le PDSF habituel de ce type de chargement, pour vous aider à juger la marge. Les lots avec manifeste indiquent la valeur de chaque article."],
    ["Puis-je obtenir un manifeste ou plus de photos ?", "Oui, pour la plupart des lots. Demandez-le dans les notes ou contactez-nous."],
    ["Comment payer ?", "Tous les acheteurs peuvent payer par PayPal — avec un compte PayPal ou n'importe quelle carte de débit/crédit, sans compte — au moyen d'une facture PayPal envoyée par courriel une fois le total livré confirmé. Aux États-Unis : aussi virement bancaire/ACH, Zelle, Cash App, Apple Pay ou Chime. Au Canada : aussi virement Interac ou virement bancaire. Au-delà de 10 000 $ US, virement uniquement. Vous choisissez le mode et la date de paiement (3 jours max.) ; les coordonnées arrivent par courriel."],
    ["Livrez-vous au Canada ?", "Oui, dans chaque province et territoire. Les prix peuvent s'afficher en CAD ; droits, TPS/TVH et courtage sont estimés dans la soumission et payés par l'acheteur."],
    ["Puis-je venir chercher ma commande ?", "Oui. Choisissez l'enlèvement au quai et nous fixons un rendez-vous après paiement."],
    ["Y a-t-il un minimum de commande ?", "Non. Vous pouvez acheter un seul lot de caisses. La livraison est gratuite dans les États-Unis contigus pour toute commande."],
    ["Et si mon lot n'est pas conforme ?", "Écrivez-nous sous 48 heures avec des photos. S'il diffère nettement de sa fiche, nous le remplaçons, le créditons ou le remboursons."],
  ],
  es: [
    ["¿Es una subasta? ¿Tengo que pujar?", "No. Pese al nombre, cada lote tiene precio fijo. No hay pujas, ni comisión de comprador, ni cuenta que crear."],
    ["¿Necesito una empresa o certificado de reventa?", "Vendemos a negocios y revendedores. El certificado de reventa (EE. UU.) o el número GST/HST (Canadá) es opcional, pero ayuda a aplicar la exención de impuestos cuando corresponde."],
    ["¿Qué diferencia hay entre devoluciones, excedente y retirados de estantería?", "Las devoluciones se compraron y se regresaron: muchas están como nuevas y otras necesitan pruebas o piezas. El excedente es mercancía nueva sin vender, casi siempre sellada. Los retirados de estantería son artículos sin vender sacados de tienda, casi sin uso y con desgaste en la caja."],
    ["¿El valor estimado en tienda está garantizado?", "No. Es una estimación basada en el precio de lista habitual de ese tipo de carga, para ayudarte a calcular el margen. Los lotes con manifiesto indican el valor de cada artículo."],
    ["¿Puedo recibir un manifiesto o más fotos?", "Sí, en la mayoría de los lotes. Pídelo en las notas o contáctanos."],
    ["¿Cómo pago?", "Todos los compradores pueden pagar con PayPal — con cuenta PayPal o con cualquier tarjeta de débito/crédito, sin cuenta — mediante una factura de PayPal que enviamos por correo cuando confirmamos el total entregado. En EE. UU. también: transferencia/ACH, Zelle, Cash App, Apple Pay o Chime. En Canadá también: Interac e-Transfer o transferencia bancaria. Más de 10 000 USD, solo transferencia. Eliges el método y la fecha de pago (máx. 3 días); los datos llegan por correo."],
    ["¿Envían a Canadá?", "Sí, a todas las provincias y territorios. Los precios pueden mostrarse en CAD; aranceles, GST/HST y agenciamiento se estiman en la cotización y los paga el comprador."],
    ["¿Puedo recoger?", "Sí. Elige recogida en muelle y programamos una cita después del pago."],
    ["¿Hay pedido mínimo?", "No. Puedes comprar un solo lote de cajas. El envío es gratis en EE. UU. continental en todos los pedidos."],
    ["¿Y si mi lote llega mal?", "Escríbenos en 48 horas con fotos. Si es muy distinto a la ficha, lo reemplazamos, damos crédito o reembolsamos."],
  ],
};

export const ABOUT: Record<Lang, string[]> = {
  en: [
    "Liquidation Auction Center supplies resellers across the United States and Canada with returns, overstock and shelf-pull merchandise by the case pack, gaylord, pallet and truckload.",
    "We took the auction out of liquidation. Instead of bidding against other buyers and paying a premium on top, you see a fixed price, the unit count, an estimated retail value and the cost per unit before you decide.",
    "Our buyers run bin stores, discount shops, flea-market booths, online stores and export businesses. We work in English, French and Spanish, quote in US or Canadian dollars, and help first-time buyers choose a sensible mix.",
  ],
  fr: [
    "Liquidation Auction Center approvisionne les revendeurs des États-Unis et du Canada en retours, surstock et retraits de rayon, par lot de caisses, gaylord, palette ou camion complet.",
    "Nous avons retiré l'enchère de la liquidation. Au lieu de miser contre d'autres acheteurs et de payer une prime, vous voyez un prix fixe, le nombre d'unités, une valeur de détail estimée et le coût par unité avant de décider.",
    "Nos clients exploitent des magasins à bacs, des magasins à rabais, des kiosques de marché, des boutiques en ligne et des entreprises d'exportation. Nous travaillons en français, en anglais et en espagnol, en dollars américains ou canadiens.",
  ],
  es: [
    "Liquidation Auction Center surte a revendedores de Estados Unidos y Canadá con devoluciones, excedentes y retirados de estantería por lote de cajas, gaylord, palé y camión completo.",
    "Quitamos la subasta de la liquidación. En lugar de pujar contra otros compradores y pagar una comisión extra, ves un precio fijo, las unidades, un valor estimado en tienda y el costo por unidad antes de decidir.",
    "Nuestros clientes tienen tiendas de contenedores, tiendas de descuento, puestos de mercadillo, tiendas en línea y negocios de exportación. Atendemos en español, inglés y francés, en dólares estadounidenses o canadienses.",
  ],
};

export const TERMS: Record<Lang, Sec[]> = {
  en: [
    ["Who we sell to", ["Liquidation Auction Center sells wholesale to businesses and resellers in the United States and Canada. By ordering you confirm you are buying for business or resale."]],
    ["Prices and orders", ["Lot prices are fixed and include standard shipping within the 48 contiguous US states; freight elsewhere, taxes and duties are extra. CAD prices are approximate conversions for convenience; your confirmation states the final amount. An order or quote request is confirmed only when we email a confirmation with the delivered total. We may decline or cancel an order if a lot has sold or a listing contains an obvious error."]],
    ["Payment", ["You choose a payment method and a pay-by date (today or within 3 days). Accepted methods: PayPal (PayPal balance or debit/credit card, paid through a PayPal invoice), bank wire/ACH, Zelle, Cash App, Apple Pay and Chime (USA), and Interac e-Transfer (Canada). Orders over $10,000 USD are payable by bank wire only. Payment instructions are sent only by email from our domain; never pay details received from any other address. Unpaid reservations are released after the pay-by date."]],
    ["Condition and title", ["Lots are sold by the lot in the condition described, without warranty of individual items beyond what the listing states. Title and risk pass to the buyer when the shipment is handed to the carrier or collected at our dock."]],
    ["Claims", ["Arrival claims must be reported within 48 hours of delivery, as described in our Returns & arrival claims policy. Our liability is limited to the price paid for the affected lot."]],
    ["Brands and resale", ["Retailer and brand names describe the origin or contents of merchandise; we are not affiliated with them. Buyers are responsible for complying with resale, recall, labelling and import rules in their jurisdiction."]],
    ["Company", ["These terms are offered by Liquidation Auction Center, 1601 Spring St, Greensboro, NC 27403, United States. Email: sales@liquidationauctioncenter.com · Phone / text: +1 (828) 344-8110 · WhatsApp: +1 (407) 378-0429."]],
  ],
  fr: [
    ["Clientèle", ["Liquidation Auction Center vend en gros aux entreprises et revendeurs des États-Unis et du Canada. En commandant, vous confirmez acheter pour une entreprise ou pour la revente."]],
    ["Prix et commandes", ["Les prix des lots sont fixes et comprennent la livraison standard dans les 48 États contigus ; le transport ailleurs, les taxes et les droits sont en sus. Les prix en CAD sont des conversions approximatives ; votre confirmation indique le montant final. Une commande ou une demande n'est confirmée qu'à réception de notre courriel indiquant le total livré. Nous pouvons refuser ou annuler une commande si un lot est vendu ou si une fiche contient une erreur manifeste."]],
    ["Paiement", ["Vous choisissez un mode et une date de paiement (aujourd'hui ou dans les 3 jours). Modes acceptés : PayPal (solde PayPal ou carte de débit/crédit, au moyen d'une facture PayPal), virement bancaire/ACH, Zelle, Cash App, Apple Pay et Chime (États-Unis) et virement Interac (Canada). Au-delà de 10 000 $ US, paiement par virement bancaire uniquement. Les instructions de paiement ne sont envoyées que par courriel depuis notre domaine ; ne payez jamais selon des coordonnées reçues d'une autre adresse. Les réservations impayées sont libérées après la date choisie."]],
    ["État et transfert de propriété", ["Les lots sont vendus dans l'état décrit, sans garantie des articles individuels au-delà de la fiche. La propriété et les risques passent à l'acheteur à la remise au transporteur ou à l'enlèvement au quai."]],
    ["Réclamations", ["Les réclamations doivent être faites sous 48 heures après livraison, selon notre politique de retours et réclamations. Notre responsabilité se limite au prix payé pour le lot concerné."]],
    ["Marques et revente", ["Les noms de détaillants et de marques indiquent la provenance ou le contenu ; nous ne leur sommes pas affiliés. L'acheteur doit respecter les règles de revente, de rappel, d'étiquetage et d'importation de sa juridiction."]],
    ["Entreprise", ["Ces conditions sont proposées par Liquidation Auction Center, 1601 Spring St, Greensboro, NC 27403, États-Unis. Courriel : sales@liquidationauctioncenter.com · Téléphone / texto : +1 (828) 344-8110 · WhatsApp : +1 (407) 378-0429."]],
  ],
  es: [
    ["A quién vendemos", ["Liquidation Auction Center vende al mayoreo a negocios y revendedores de Estados Unidos y Canadá. Al hacer un pedido confirmas que compras para un negocio o para reventa."]],
    ["Precios y pedidos", ["Los precios de los lotes son fijos e incluyen el envío estándar en los 48 estados contiguos de EE. UU.; el flete a otras zonas, impuestos y aranceles son aparte. Los precios en CAD son conversiones aproximadas; tu confirmación indica el monto final. Un pedido o solicitud solo queda confirmado cuando enviamos el correo con el total entregado. Podemos rechazar o cancelar un pedido si el lote ya se vendió o si la ficha tiene un error evidente."]],
    ["Pago", ["Eliges un método y una fecha de pago (hoy o dentro de 3 días). Métodos aceptados: PayPal (saldo PayPal o tarjeta de débito/crédito, mediante una factura de PayPal), transferencia/ACH, Zelle, Cash App, Apple Pay y Chime (EE. UU.) e Interac e-Transfer (Canadá). Los pedidos de más de 10 000 USD se pagan solo por transferencia bancaria. Las instrucciones de pago solo se envían por correo desde nuestro dominio; nunca pagues con datos recibidos de otra dirección. Las reservas sin pagar se liberan después de la fecha elegida."]],
    ["Condición y propiedad", ["Los lotes se venden en la condición descrita, sin garantía de artículos individuales más allá de la ficha. La propiedad y el riesgo pasan al comprador al entregar el envío al transportista o al recogerlo en el muelle."]],
    ["Reclamos", ["Los reclamos de llegada deben reportarse dentro de las 48 horas posteriores a la entrega, según nuestra política. Nuestra responsabilidad se limita al precio pagado por el lote afectado."]],
    ["Marcas y reventa", ["Los nombres de minoristas y marcas indican el origen o contenido; no estamos afiliados a ellos. El comprador debe cumplir las normas de reventa, retiro de productos, etiquetado e importación de su jurisdicción."]],
    ["Empresa", ["Estas condiciones las ofrece Liquidation Auction Center, 1601 Spring St, Greensboro, NC 27403, Estados Unidos. Correo: sales@liquidationauctioncenter.com · Teléfono / SMS: +1 (828) 344-8110 · WhatsApp: +1 (407) 378-0429."]],
  ],
};

export const PRIVACY: Record<Lang, Sec[]> = {
  en: [
    ["What we collect", ["The details you enter in our order, quote and contact forms (name, company, email, phone, delivery address, optional tax ID, notes) and the lots you request. We don't use advertising trackers or sell personal information."]],
    ["Why", ["To answer your request, quote freight, process your order and payment, arrange delivery and keep the business records the law requires."]],
    ["Who sees it", ["Our team, our email provider (Resend) and hosting provider (Cloudflare), and the freight carrier or customs broker handling your shipment."]],
    ["How long", ["Order records are kept for 7 years for tax purposes; unanswered quote requests and messages are deleted after 24 months."]],
    ["Your choices", ["Email us to access, correct or delete your information. Canadian buyers have rights under PIPEDA; California residents under the CCPA. We'll respond within 30 days."]],
    ["Cookies", ["We use only essential cookies to remember your language, currency and order list. No analytics or advertising cookies."]],
  ],
  fr: [
    ["Ce que nous recueillons", ["Les renseignements saisis dans nos formulaires de commande, de soumission et de contact (nom, entreprise, courriel, téléphone, adresse de livraison, numéro fiscal facultatif, notes) et les lots demandés. Nous n'utilisons pas de traceurs publicitaires et ne vendons pas de renseignements personnels."]],
    ["Pourquoi", ["Pour répondre à votre demande, soumettre le transport, traiter votre commande et votre paiement, organiser la livraison et conserver les registres exigés par la loi."]],
    ["Qui y a accès", ["Notre équipe, notre fournisseur de courriel (Resend) et d'hébergement (Cloudflare), ainsi que le transporteur ou le courtier en douane de votre envoi."]],
    ["Durée", ["Les dossiers de commande sont conservés 7 ans à des fins fiscales ; les demandes et messages sans suite sont supprimés après 24 mois."]],
    ["Vos droits", ["Écrivez-nous pour consulter, corriger ou supprimer vos renseignements. Les acheteurs canadiens sont protégés par la LPRPDE et, au Québec, par la Loi 25. Réponse sous 30 jours."]],
    ["Témoins", ["Seuls des témoins essentiels mémorisent votre langue, votre devise et votre liste. Aucun témoin analytique ou publicitaire."]],
  ],
  es: [
    ["Qué recopilamos", ["Los datos que ingresas en nuestros formularios de pedido, cotización y contacto (nombre, empresa, correo, teléfono, dirección de entrega, ID fiscal opcional, notas) y los lotes que solicitas. No usamos rastreadores publicitarios ni vendemos datos personales."]],
    ["Para qué", ["Para responder tu solicitud, cotizar el flete, procesar tu pedido y pago, organizar la entrega y conservar los registros que exige la ley."]],
    ["Quién los ve", ["Nuestro equipo, nuestro proveedor de correo (Resend) y de hosting (Cloudflare), y el transportista o agente aduanal de tu envío."]],
    ["Por cuánto tiempo", ["Los registros de pedidos se guardan 7 años por motivos fiscales; las solicitudes y mensajes sin respuesta se eliminan a los 24 meses."]],
    ["Tus derechos", ["Escríbenos para consultar, corregir o eliminar tus datos. Los compradores canadienses tienen derechos bajo PIPEDA; los residentes de California bajo la CCPA. Respondemos en 30 días."]],
    ["Cookies", ["Solo usamos cookies esenciales para recordar tu idioma, moneda y lista de pedido. Sin cookies analíticas ni publicitarias."]],
  ],
};
