// Liquidation Auction Center — order list, filters, checkout and contact forms. No framework.
(function () {
  var T = window.__T || {}, L = window.__L || "en", CUR = window.__CUR || "USD", LOC = window.__LOCALE || "en-US", D = window.__D || {};
  var KEY = "lac-list";
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var get = function () { try { return JSON.parse(localStorage.getItem(KEY) || "{}") || {}; } catch (e) { return {}; } };
  var put = function (v) { try { localStorage.setItem(KEY, JSON.stringify(v)); } catch (e) {} };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };
  var rate = D.rate || 1.37;
  function money(usd) {
    var n = CUR === "CAD" ? Math.round(usd * rate) : usd;
    var s = new Intl.NumberFormat(LOC, { style: "currency", currency: CUR, currencyDisplay: "narrowSymbol", maximumFractionDigits: 0 }).format(n);
    return CUR !== "CAD" ? s : (L === "fr" ? s + " CA" : "CA" + s);
  }
  var cookie = function (k) { return (document.cookie.match(new RegExp("(?:^|;\\s*)" + k + "=([A-Za-z0-9]+)")) || [])[1]; };

  // ---- header: count, burger, language menu ----
  function count() {
    var c = get(), n = 0; Object.keys(c).forEach(function (s) { n += c[s]; });
    $$("[data-listcount]").forEach(function (b) { b.textContent = n; b.classList.add("bump"); setTimeout(function () { b.classList.remove("bump"); }, 250); });
    $$("[data-add]").forEach(function (b) { b.classList.toggle("on", !!c[b.getAttribute("data-add")]); });
  }
  count();
  window.addEventListener("storage", count);
  var burger = $("[data-burger]");
  if (burger) burger.addEventListener("click", function () { document.documentElement.classList.toggle("nav-open"); });
  document.addEventListener("click", function (e) { $$("details.langs[open]").forEach(function (d) { if (!d.contains(e.target)) d.open = false; }); });

  var toastEl;
  function toast(msg) {
    if (!toastEl) { toastEl = document.createElement("div"); toastEl.className = "toast"; toastEl.setAttribute("role", "status"); document.body.appendChild(toastEl); }
    toastEl.textContent = msg; toastEl.classList.add("show");
    clearTimeout(toastEl._t); toastEl._t = setTimeout(function () { toastEl.classList.remove("show"); }, 2200);
  }
  function add(slug, qty) {
    var c = get(); c[slug] = Math.min(20, (c[slug] || 0) + (qty || 1)); put(c); count();
  }
  function pageQty(el) {
    var box = el.closest("[data-slug]"), q = box && $("[data-qty]", box);
    var n = q ? parseInt(q.value, 10) : 1; return n >= 1 && n <= 20 ? n : 1;
  }

  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-add]");
    if (b) { e.preventDefault(); add(b.getAttribute("data-add"), b.hasAttribute("data-withqty") ? pageQty(b) : 1); toast("✓ " + (T.added || "Added")); return; }
    var g = e.target.closest("[data-go]");
    if (g) { var box = g.closest("[data-slug]"); if (box) { add(box.getAttribute("data-slug"), pageQty(g)); g.href = g.href.replace(/([?&])add=[^&]*&?/, "$1"); } }
  });

  // ---- listing search ----
  var search = $("[data-search]");
  if (search) search.addEventListener("input", function () {
    var q = search.value.trim().toLowerCase(), n = 0, cards = $$(".shop-main [data-lot]");
    cards.forEach(function (c) { var hit = !q || c.getAttribute("data-q").indexOf(q) >= 0; c.hidden = !hit; if (hit) n++; });
    var shown = $("[data-shown]"); if (shown && T.lotsCount) shown.textContent = T.lotsCount.replace("{n}", n);
    var none = $("[data-none]"); if (none) none.hidden = n > 0;
  });

  // ---- order list / checkout ----
  var listEl = $("[data-list]"), form = $("[data-order]");
  if (listEl && form && D.lots) {
    var params = new URLSearchParams(location.search);
    var addQ = params.get("add");
    if (addQ && D.lots[addQ] && !get()[addQ]) add(addQ, 1);
    if (params.get("mode") === "quote") form.mode.value = "quote";
    if (addQ || params.get("mode")) history.replaceState(null, "", location.pathname);

    var sumEl = $("[data-sum]"), emptyEl = $("[data-empty]"), subEl = $("[data-subtotal]");
    var countrySel = $("[data-country]"), regionSel = $("[data-region]"), paySel = $("[data-pay]"), wireNote = $("[data-wirenote]");
    var subtotal = 0;
    function render() {
      var c = get(), slugs = Object.keys(c).filter(function (s) { return D.lots[s]; });
      subtotal = 0;
      listEl.innerHTML = slugs.map(function (s) {
        var l = D.lots[s], q = c[s]; subtotal += l.p * q;
        return '<div class="line"><a href="' + l.url + '"><img src="' + l.img + '" alt="" width="72" height="54"></a><div><a href="' + l.url + '"><b>' + esc(l.n) + '</b></a><br><span class="small muted">' + (T.lot || "Lot") + " " + l.no + " · ~" + l.u.toLocaleString(LOC) + " " + esc(l.uw) + " · " + money(l.p) +
          '</span></div><input type="number" min="1" max="20" value="' + q + '" data-q="' + s + '" aria-label="Qty"><div class="line-r"><b>' + money(l.p * q) + '</b><button type="button" class="x" data-rm="' + s + '" aria-label="' + esc(T.remove || "Remove") + '">×</button></div></div>';
      }).join("");
      emptyEl.hidden = slugs.length > 0; sumEl.hidden = !slugs.length; form.hidden = !slugs.length;
      subEl.textContent = money(subtotal);
      payments(); count();
    }
    function regions() {
      var ca = countrySel.value === "CA", list = D.regions[ca ? "CA" : "US"], keep = regionSel.value;
      regionSel.innerHTML = list.map(function (r) { return '<option value="' + r + '">' + r + "</option>"; }).join("");
      if (list.indexOf(keep) >= 0) regionSel.value = keep;
      $("[data-regionlabel]").textContent = ca ? D.labels.regionCa : D.labels.region;
      $("[data-ziplabel]").textContent = ca ? D.labels.postal : D.labels.zip;
      $("[data-taxlabel]").textContent = ca ? D.labels.taxIdCa : D.labels.taxId;
    }
    function payments() {
      var ca = countrySel.value === "CA", over = subtotal > D.wireOver;
      var list = over ? ["wire"] : D.pay[ca ? "CA" : "US"], keep = paySel.value;
      paySel.innerHTML = list.map(function (p) { return '<option value="' + p + '">' + esc(D.payNames[p]) + "</option>"; }).join("");
      if (list.indexOf(keep) >= 0) paySel.value = keep;
      wireNote.hidden = !over; if (over) wireNote.textContent = (T.wireOnly || "").replace("{limit}", D.wireLimit);
    }
    function modeLabel() { $("[data-submit]").textContent = form.mode.value === "quote" ? D.labels.submitQuote : D.labels.submitOrder; }

    var cc = cookie("cc"), rc = cookie("rc");
    if (cc === "CA" || cc === "US") countrySel.value = cc;
    regions();
    if (rc && D.regions[countrySel.value].indexOf(rc) >= 0) regionSel.value = rc;
    countrySel.addEventListener("change", function () { regions(); payments(); });
    $$('input[name="mode"]', form).forEach(function (r) { r.addEventListener("change", modeLabel); });
    modeLabel();
    // pay-by: local today … today + 3
    var day = function (o) { var d = new Date(); d.setDate(d.getDate() + o); return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); };
    form.payBy.min = day(0); form.payBy.max = day(3); if (!form.payBy.value || form.payBy.value < day(0) || form.payBy.value > day(3)) form.payBy.value = day(0);
    render();

    listEl.addEventListener("change", function (e) {
      var s = e.target.getAttribute("data-q"); if (!s) return;
      var c = get(), q = parseInt(e.target.value, 10); if (q >= 1) c[s] = Math.min(20, q); else delete c[s]; put(c); render();
    });
    listEl.addEventListener("click", function (e) {
      var s = e.target.getAttribute("data-rm"); if (!s) return; var c = get(); delete c[s]; put(c); render();
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var msg = $("[data-msg]", form), btn = $("[data-submit]", form);
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var body = { lang: L, cur: CUR }; new FormData(form).forEach(function (v, k) { body[k] = v; });
      var c = get(); body.items = Object.keys(c).filter(function (s) { return D.lots[s]; }).map(function (s) { return { slug: s, qty: c[s] }; });
      msg.textContent = ""; msg.className = "form-msg"; btn.disabled = true; btn.textContent = T.sending;
      fetch("/api/order", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) })
        .then(function (r) { return r.json(); })
        .then(function (r) {
          if (!r.ok) throw new Error(r.error || T.error);
          put({}); location.href = "/" + L + "/thanks?n=" + encodeURIComponent(r.orderNumber) + "&m=" + (r.mode || "order");
        })
        .catch(function (x) { msg.textContent = x.message && x.message !== "Server error" ? x.message : T.error; msg.className = "form-msg err"; btn.disabled = false; modeLabel(); });
    });
  }

  // ---- contact ----
  var cf = $("[data-contact]");
  if (cf) cf.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!cf.checkValidity()) { cf.reportValidity(); return; }
    var msg = $("[data-msg]", cf), btn = $("button", cf), body = { lang: L };
    new FormData(cf).forEach(function (v, k) { body[k] = v; });
    btn.disabled = true; btn.textContent = T.sending;
    fetch("/api/contact", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) })
      .then(function (r) { return r.json(); })
      .then(function (r) { if (!r.ok) throw new Error(r.error || T.error); cf.innerHTML = '<p class="form-msg ok">✓ ' + esc(T.contactOk) + "</p>"; })
      .catch(function (x) { msg.textContent = x.message && x.message !== "Server error" ? x.message : T.error; msg.className = "form-msg err"; btn.disabled = false; });
  });
})();
