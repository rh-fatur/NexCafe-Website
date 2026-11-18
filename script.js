// Editable website copy lives in assets/data/content.js.
(function applyEditableCopy() {
  const copy = window.NEXCAFE_CONTENT;
  if (!copy) return;
  const bindings = [
    [".hero-description", "heroDescription"],
    [".story-lead", "storyLead"],
    [".newsletter-note", "newsletterNote"],
    [".drawer-footnote", "drawerFootnote"],
    [".auth-local-note", "authLocalNote"],
    [".mobile-table-help", "mobileTableHelp"],
    [".checkout-disclaimer", "checkoutDisclaimer"],
    [".payment-disclaimer", "paymentDisclaimer"],
    [".empty-copy", "emptyOrders"]
  ];
  bindings.forEach(([selector, key]) => {
    const node = document.querySelector(selector);
    if (node && typeof copy[key] === "string") node.textContent = copy[key];
  });
})();

/* NexCafe — website kafe */
"use strict";

const $ = (selector, root=document) => root.querySelector(selector);
const $$ = (selector, root=document) => [...root.querySelectorAll(selector)];
const rupiah = value => new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",maximumFractionDigits:0}).format(value);
const safe = value => String(value ?? "").replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));

const svgIcon = (name, size=18) => {
  const paths = {
    moon:'<path d="M20.8 13.2A8.6 8.6 0 0 1 10.8 3.2 8.7 8.7 0 1 0 20.8 13.2Z"/>',
    sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/>',
    menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',
    close:'<path d="m6 6 12 12M18 6 6 18"/>',
    bag:'<path d="M5 8h14l1 13H4L5 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',
    heart:'<path d="M20.8 8.8c0 5.1-8.8 10-8.8 10s-8.8-4.9-8.8-10A4.8 4.8 0 0 1 12 6.3a4.8 4.8 0 0 1 8.8 2.5Z"/>',
    sliders:'<path d="M4 7h9m4 0h3M4 17h3m4 0h9"/><circle cx="15" cy="7" r="2"/><circle cx="9" cy="17" r="2"/>',
    search:'<circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 4 4"/>',
    coffee:'<path d="M4 9h13v6a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V9Z"/><path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17M8 3v3m5-3v3"/>',
    sparkle:'<path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z"/><path d="m19 15 .8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z"/>',
    arrow:'<path d="M7 17 17 7M8 7h9v9"/>',
    dining:'<path d="M3 3v7a3 3 0 0 0 6 0V3M6 3v18M16 3v7m0-7c3 2 3 7 0 9v9"/>',
    takeaway:'<path d="M5 8h14l1 13H4L5 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',
    qris:'<path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h2v2h-2zM18 14h2v6h-6v-2"/>',
    cash:'<rect x="3" y="6" width="18" height="12" rx="2"/><circle cx="12" cy="12" r="3"/><path d="M6 9h.01M18 15h.01"/>',
    wallet:'<rect x="3" y="6" width="18" height="14" rx="2"/><path d="M3 9h18M16 14h2"/>',
    bank:'<path d="m3 9 9-6 9 6M5 10v8m5-8v8m4-8v8m5-8v8M3 21h18M2 18h20"/>',
    card:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h4"/>',
    pepper:'<path d="M14 4c1-2 4-2 5 0-2 1-3 2-3 4 0 2 3 3 2 6-1 4-4 7-8 7-3 0-5-2-5-5 0-4 4-6 6-8 1-1 2-2 3-4Z"/><path d="M14 4c0-2 1-3 3-3"/>',
    plate:'<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><path d="M2 4v6m2-6v6m-2-3h2m16-3v16"/>'
  };
  return `<svg class="ui-icon" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${paths[name] || paths.sparkle}</svg>`;
};
const loadJSON = (key, fallback) => { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } };
const saveJSON = (key, value) => { try { localStorage.setItem(key, JSON.stringify(value)); } catch {} };

let cart = loadJSON("nexcafe_cart", []);
let user = loadJSON("nexcafe_user", null);
let orders = loadJSON("nexcafe_orders", []);
let points = Number(localStorage.getItem("nexcafe_points") || 0);
let cafeOpen = true;
const { categories, quickFilters, products, articles, reviewSummary, reviews, vouchers, tables: floorTables, payMethods, media = {} } = window.NEXCAFE_DATA;
function hydrateMedia() {
  $$("img[data-media]").forEach(img => { const url = media[img.dataset.media]; if (url) img.src = url; });
}
hydrateMedia();
const kindOf = p => p.options || (p.category === "Minuman" ? "drink" : (p.category === "Makanan" || p.spicy) ? "spice" : "none");
const catLabel = id => (categories.find(c => c.id === id) || {label:id}).label;
/* ===== Diskon: tambahkan discount:20 pada menu di menu.js. product.price = harga akhir, product.basePrice = harga asli ===== */
products.forEach(p => { p.basePrice = p.price; if (p.discount) p.price = Math.round(p.basePrice * (100 - p.discount) / 100); });
const priceHTML = p => p.discount ? `<span class="price-old">${rupiah(p.basePrice)}</span><span class="price-now">${rupiah(p.price)}</span>` : rupiah(p.price);
document.querySelectorAll("[data-price-for]").forEach(el => { const p = products.find(x => x.id === el.dataset.priceFor); if (p) el.innerHTML = priceHTML(p); });

/* ===== Foto menu: semua tautan/kata kunci ada di assets/images/menu/images.js ===== */
const MENU_IMAGES = window.NEXCAFE_MENU_IMAGES || {};
const PHOTO_CACHE_KEY = "nexcafe_menu_photos_v1";
const photoCache = (() => { try { return JSON.parse(localStorage.getItem(PHOTO_CACHE_KEY) || "{}"); } catch { return {}; } })();
const photoSig = entry => (entry.q || []).join("|");
const savePhotoCache = () => { try { localStorage.setItem(PHOTO_CACHE_KEY, JSON.stringify(photoCache)); } catch {} };
const usedPhotos = new Set();
products.forEach(p => {
  const entry = MENU_IMAGES[p.id] || {};
  const cached = photoCache[p.id];
  p.image = entry.url || (cached && cached.sig === photoSig(entry) ? cached.url : "");
  if (p.image) usedPhotos.add(p.image);
});
/* Foto kartu memakai ukuran lebih kecil (hemat data di HP); Wikimedia menyediakan ukuran thumbnail sesuai permintaan. */
function photoSized(url, width) {
  return /^https:\/\/upload\.wikimedia\.org\/.*\/thumb\//.test(url || "") ? url.replace(/\/\d+px-([^/]+)$/, `/${width}px-$1`) : url;
}
const imgOf = item => (products.find(p => p.id === item.id)?.image) || item.image || "";
const PHOTO_SKIP = /(map|logo|icon|flag|diagram|chart|poster|sign|stamp|cover|book|menu|price|stall|warung|vendor|seller|street|market|shop|truck|cart|kitchen|chef|people|crowd|restaurant)/i;
async function findPhoto(queries) {
  for (const q of queries) {
    const words = q.toLowerCase().split(/\s+/).filter(w => w.length > 2);
    const api = "https://commons.wikimedia.org/w/api.php?action=query&format=json&origin=*&generator=search&gsrnamespace=6&gsrlimit=20&gsrsearch="
      + encodeURIComponent(q + " filetype:bitmap") + "&prop=imageinfo&iiprop=url|size|mime&iiurlwidth=900";
    let data;
    try { const res = await fetch(api); if (!res.ok) continue; data = await res.json(); } catch { continue; }
    const found = Object.values(data.query?.pages || {}).map(pg => ({ pg, info: pg.imageinfo?.[0] }))
      .filter(x => x.info && x.info.mime === "image/jpeg" && x.info.width >= 700 && x.info.height >= 450 && x.info.thumburl)
      .filter(x => { const t = x.pg.title.toLowerCase().replace(/[_\-.]+/g, " "); return words.every(w => t.includes(w)); })
      .filter(x => !usedPhotos.has(x.info.thumburl))
      .map(x => ({ url: x.info.thumburl, score: (x.pg.index || 99) + (PHOTO_SKIP.test(x.pg.title) ? 20 : 0) + (x.info.height > x.info.width * 1.3 ? 15 : 0) }))
      .sort((a, b) => a.score - b.score);
    if (found.length) return found[0].url;
  }
  return "";
}
let photoRefreshTimer;
function refreshPhotoViews() {
  clearTimeout(photoRefreshTimer);
  photoRefreshTimer = setTimeout(() => { renderMenu(); updateCart(); }, 250);
}
async function resolveFromWikipedia() {
  const todo = products.filter(p => !p.image && (MENU_IMAGES[p.id]?.wiki || []).length);
  const titles = [...new Set(todo.flatMap(p => MENU_IMAGES[p.id].wiki))];
  if (!titles.length) return;
  const lead = {};
  for (const lang of ["en", "id"]) {
    for (let i = 0; i < titles.length; i += 40) {
      const batch = titles.slice(i, i + 40);
      try {
        const res = await fetch(`https://${lang}.wikipedia.org/w/api.php?action=query&format=json&origin=*&redirects=1&prop=pageimages&piprop=thumbnail&pithumbsize=900&titles=${encodeURIComponent(batch.join("|"))}`);
        if (!res.ok) continue;
        const q = (await res.json()).query || {};
        const alias = {}; [...(q.normalized || []), ...(q.redirects || [])].forEach(x => { alias[x.from] = x.to; });
        const bySource = {}; Object.values(q.pages || {}).forEach(pg => { if (pg.thumbnail) bySource[pg.title] = pg.thumbnail.source; });
        batch.forEach(t => { let k = t; for (let n = 0; n < 3 && alias[k]; n++) k = alias[k]; const src = bySource[k]; if (src && !/\.svg|flag|map|logo/i.test(src) && !lead[`${lang}:${t}`]) lead[`${lang}:${t}`] = src; });
      } catch {}
    }
  }
  todo.forEach(p => {
    const entry = MENU_IMAGES[p.id];
    for (const t of entry.wiki) for (const lang of ["en", "id"]) {
      const src = lead[`${lang}:${t}`];
      if (src && !usedPhotos.has(src)) { usedPhotos.add(src); p.image = src; photoCache[p.id] = { url: src, sig: photoSig(entry) }; return; }
    }
  });
  savePhotoCache(); refreshPhotoViews();
}
async function resolveMenuPhotos() {
  await resolveFromWikipedia();
  const queue = products.filter(p => !p.image);
  const worker = async () => {
    while (queue.length) {
      const p = queue.shift(), entry = MENU_IMAGES[p.id] || {};
      if (!entry.q || !entry.q.length) continue;
      const url = await findPhoto(entry.q);
      if (!url || usedPhotos.has(url)) continue;
      usedPhotos.add(url); p.image = url;
      photoCache[p.id] = { url, sig: photoSig(entry) }; savePhotoCache();
      refreshPhotoViews();
    }
  };
  await Promise.all([worker(), worker(), worker()]);
}
let menuLimit = 12;
let menuPageSize = 6;
let menuCols = 2;
let menuPage = 1;
let menuFilterSig = "";
function renderFilters() {
  const categoryMarkup = [{id:"Semua",label:"Semua",emoji:""}, ...categories].map(c => `<button class="filter-button ${activeCategory === c.id ? "active" : ""}" data-category="${safe(c.id)}" aria-pressed="${activeCategory === c.id}">${c.id === "Semua" ? svgIcon("sparkle",14) : svgIcon(/minum/i.test(c.id) ? "coffee" : "bag",14)} ${safe(c.label)} <span>${c.id === "Semua" ? products.length : products.filter(p => p.category === c.id).length}</span></button>`).join("");
  ["#categoryFilters", "#desktopCategoryFilters"].forEach(selector => { const el=$(selector); if(el) el.innerHTML=categoryMarkup; });
  const quickMarkup = [{id:"Semua",label:"Semua menu"}, ...quickFilters].map(q => `<button class="quick-filter ${activeQuickFilter === q.id ? "active" : ""}" data-quick="${safe(q.id)}" aria-pressed="${activeQuickFilter === q.id}">${safe(q.label)}</button>`).join("");
  ["#quickFilters", "#desktopQuickFilters"].forEach(selector => { const el=$(selector); if(el) el.innerHTML=quickMarkup; });
  const quickLabels = {featured:"Best seller",pedas:"Pedas",noncoffee:"Non-coffee",favorit:"Favorit"};
  const selected = [];
  if(activeQuickFilter !== "Semua") selected.push(quickLabels[activeQuickFilter] || activeQuickFilter);
  if(advancedFilters.minPrice) selected.push("Min " + rupiah(Number(advancedFilters.minPrice)));
  if(advancedFilters.maxPrice) selected.push("Maks " + rupiah(Number(advancedFilters.maxPrice)));
  if(Number(advancedFilters.minRating||0)>0) selected.push("Rating " + advancedFilters.minRating + "+");
  if(advancedFilters.sort !== "default") selected.push("Urut: " + ({"price-low":"Termurah","price-high":"Termahal",rating:"Rating",name:"Nama A–Z"}[advancedFilters.sort] || "Rekomendasi"));
  const summary = $("#mobileFilterSummary"); if(summary) summary.textContent=selected.length ? selected.join(" · ") : "Semua menu";
  const sheetMap = {sheetFeatured:advancedFilters.featured,sheetSpicy:advancedFilters.spicy,sheetNonCoffee:advancedFilters.nonCoffee,sheetFavorite:advancedFilters.favorite};
  Object.entries(sheetMap).forEach(([id,value])=>{const el=$("#"+id);if(el)el.checked=value;});
  ["filterMinPrice","filterMaxPrice"].forEach((id,i)=>{const el=$("#"+id);if(el)el.value=i===0?advancedFilters.minPrice:advancedFilters.maxPrice;});
  ["desktopSort","mobileSort"].forEach(id=>{const el=$("#"+id);if(el)el.value=advancedFilters.sort;});
  ["desktopMinRating","mobileMinRating"].forEach(id=>{const el=$("#"+id);if(el)el.value=advancedFilters.minRating||"0";});
  const desktopChecks={desktopFeatured:advancedFilters.featured,desktopSpicy:advancedFilters.spicy,desktopNonCoffee:advancedFilters.nonCoffee,desktopFavorite:advancedFilters.favorite};
  Object.entries(desktopChecks).forEach(([id,value])=>{const el=$("#"+id);if(el)el.checked=value;});
  [["desktopMinPrice",advancedFilters.minPrice],["desktopMaxPrice",advancedFilters.maxPrice]].forEach(([id,value])=>{const el=$("#"+id);if(el)el.value=value||"";});
}
function renderReviews() {
  $("#reviewScore").textContent = String(reviewSummary.score).replace(".", ",");
  $("#reviewCount").textContent = `dari ${reviewSummary.count.toLocaleString("id-ID")} ulasan`;
  $("#reviewsGrid").innerHTML = reviews.map(r => `<figure class="review-card"><span class="stars" aria-label="Rating ${r.rating} dari 5">${"★".repeat(r.rating)}${"☆".repeat(5 - r.rating)}</span><p>${safe(r.text)}</p><footer><strong>${safe(r.name)}</strong> · ${safe(r.item)}</footer></figure>`).join("");
}
let activeCategory = "Semua";
let activeQuickFilter = "Semua";
let advancedFilters = {featured:false, spicy:false, nonCoffee:false, favorite:false, minPrice:"", maxPrice:"", sort:"default", minRating:"0"};
let activeTableArea = "Indoor";
let activeDetailProduct = null;
let currentOrder = null;
let countdownInterval = null;
let remainingSeconds = 15 * 60;
let trackerStage = 0;
let toastTimeout = null;
let favorites = loadJSON("nexcafe_favorites", []);
let lastCartCount = cart.reduce((s, i) => s + i.qty, 0);
let lastFocus = null;
let appliedVoucher = null;
function voucherDiscount() {
  const v = appliedVoucher; if (!v) return 0;
  const sub = subtotal(); if (sub < v.min || (v.member && !user)) return 0;
  const base = sub - bundleDiscount();
  return Math.max(0, Math.min(v.flat || Math.round(base * v.pct), v.cap || Infinity, base));
}
function renderVoucherUI() {
  const line = $("#cartVoucherLine"); if (!line) return;
  const d = voucherDiscount();
  line.classList.toggle("hidden", d <= 0);
  $("#cartVoucherLabel").textContent = appliedVoucher ? `Voucher ${appliedVoucher.code}` : "Voucher";
  $("#cartVoucherAmt").textContent = `− ${rupiah(d)}`;
  const msg = $("#voucherMsg");
  if (appliedVoucher) msg.innerHTML = (d > 0 ? `✓ ${safe(appliedVoucher.desc)}` : `Kode ${appliedVoucher.code} butuh syarat belanja/member yang belum terpenuhi.`) + ` <button class="text-button" data-voucher-remove type="button">Lepas</button>`;
  else msg.textContent = "";
}
const RATING_KEY = "nexcafe_ratings";
const userRatings = () => loadJSON(RATING_KEY, {});
function ratingInfo(p) {
  let h = 0; for (const c of p.id) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  const base = 4.3 + (h % 6) / 10, n = 20 + (h % 180), mine = userRatings()[p.id] || 0;
  return mine ? {avg:(base * n + mine) / (n + 1), count:n + 1, mine} : {avg:base, count:n, mine:0};
}
function ratingLine(p) { const r = ratingInfo(p); return `<span class="rating-line" aria-label="Rating ${r.avg.toFixed(1)} dari 5">★ ${r.avg.toFixed(1)} <small>(${r.count})</small></span>`; }
function renderDetailRating() {
  const p = activeDetailProduct, box = $("#detailRating"); if (!p || !box) return;
  const r = ratingInfo(p);
  box.innerHTML = `<div class="rating-line">★ <strong>${r.avg.toFixed(1)}</strong> <small>(${r.count} rating)</small></div><div class="pd-rate"><span>${r.mine ? "Rating kamu" : "Beri rating"}</span><div class="stars-input" role="group" aria-label="Beri rating">${[1,2,3,4,5].map(n => `<button type="button" data-rate="${n}" class="${n <= r.mine ? "on" : ""}" aria-label="${n} bintang">★</button>`).join("")}</div></div>`;
}
let checkoutSel = {type:"Makan di sini", table:null, method:"QRIS"};
function takenTables() { const t = new Set(["T3","T5","T9","T12"]); orders.forEach(o => { if (o.table && (o.trackerStage || 0) < 2) t.add(o.table); }); return t; }
function updateGenLabel() { const b = $("#generateQR"); if (b) b.innerHTML = (checkoutSel.method === "QRIS" ? "Buat kode QR" : checkoutSel.method === "Tunai" ? "Buat pesanan" : "Lanjut bayar") + " <span>↗</span>"; }

function renderSeatMap(taken = takenTables()) {
  const map = $("#floorPlan"); if (!map) return;
  const tables = floorTables.filter(t => t.area === activeTableArea);
  const free = tables.filter(t => !taken.has(t.id)).length;
  const chairs = n => Array.from({length:n}, () => "<i></i>").join("");
  const deco = activeTableArea === "Indoor"
    ? '<div class="sm-deco sm-bar">KASIR &amp; BAR</div><div class="sm-deco sm-door">PINTU</div>'
    : '<div class="sm-deco sm-bar">TERAS &amp; TAMAN</div>';
  map.innerHTML = deco + tables.map(t => {
    const tk = taken.has(t.id), sel = checkoutSel.table === t.id;
    return `<button type="button" class="seat-table seats-${t.seats} ${tk ? "taken" : ""} ${sel ? "sel" : ""}" style="left:${t.x}%;top:${t.y}%" data-table="${t.id}" ${tk ? "disabled" : ""} aria-pressed="${sel}" aria-label="Meja ${t.id}, ${t.seats} kursi${tk ? ", terisi" : ""}"><span class="st-chairs">${chairs(Math.ceil(t.seats/2))}</span><span class="st-top"><b>${t.id}</b></span><span class="st-chairs">${chairs(Math.floor(t.seats/2))}</span></button>`;
  }).join("");
  $$("[data-table-area]").forEach(btn => { const on = btn.dataset.tableArea === activeTableArea; btn.classList.toggle("active", on); btn.setAttribute("aria-pressed", String(on)); });
  const chosen = floorTables.find(t => t.id === checkoutSel.table);
  $("#tableChosen").textContent = chosen
    ? `Meja ${chosen.id} dipilih · ${chosen.seats} kursi · ${chosen.area}`
    : (free ? `Ketuk meja yang kosong · ${free} tersedia di ${activeTableArea}` : `Semua meja di ${activeTableArea} sedang terisi, coba area lain.`);
}
$("#tableAreaTabs").addEventListener("click", e => {
  const btn = e.target.closest("[data-table-area]"); if (!btn) return;
  activeTableArea = btn.dataset.tableArea; renderSeatMap();
});
function refreshCheckoutOptions() {
  const pay = $("#payOptions"); if (!pay) return;
  $$('input[name="orderType"]').forEach(r => r.checked = r.value === checkoutSel.type);
  $("#tablePicker").classList.toggle("hidden", checkoutSel.type !== "Makan di sini");
  const taken = takenTables(); if (taken.has(checkoutSel.table)) checkoutSel.table = null;
  renderSeatMap(taken);
  pay.innerHTML = payMethods.map(m => `<label class="opt payment-option"><input type="radio" name="payMethod" value="${m[0]}" ${checkoutSel.method === m[0] ? "checked" : ""}><span class="payment-option-icon">${svgIcon(m[1],20)}</span><span class="payment-option-copy"><strong>${m[2]}</strong><small>${m[3]}</small></span></label>`).join("");
  updateGenLabel();
}
function renderHistory() {
  $("#historyList").innerHTML = orders.length ? orders.map(o => `<div class="history-order"><div class="ho-top"><strong>${safe(o.id)}</strong><span class="order-status">${safe(o.status || "")}</span></div><small>${safe(o.date)} · ${safe(o.type || "-")}${o.table ? " · Meja " + safe(o.table) : ""} · ${safe(o.method || "QRIS")}</small><ul>${o.items.map(i => `<li><span>${safe(i.name)} ×${i.qty}</span><button type="button" class="text-button" data-rateitem="${safe(i.id)}">★ Beri rating</button></li>`).join("")}</ul><div class="ho-bottom"><strong>${rupiah(o.total)}</strong><button type="button" class="button button-outline" data-reorder="${safe(o.id)}">Pesan lagi</button></div></div>`).join("") : `<p class="empty-copy">Belum ada pesanan.</p>`;
}

function toast(message) {
  const el = $("#toast");
  el.textContent = message;
  el.classList.add("show");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => el.classList.remove("show"), 2600);
}

function renderMenu() {
  const query = $("#menuSearch").value.trim().toLocaleLowerCase("id");
  const minPrice = advancedFilters.minPrice === "" ? null : Number(advancedFilters.minPrice);
  const maxPrice = advancedFilters.maxPrice === "" ? null : Number(advancedFilters.maxPrice);
  const validPriceRange = (minPrice === null || (Number.isFinite(minPrice) && minPrice >= 0)) && (maxPrice === null || (Number.isFinite(maxPrice) && maxPrice >= 0)) && (minPrice === null || maxPrice === null || minPrice <= maxPrice);
  let filtered = products.filter(product => validPriceRange &&
    (activeCategory === "Semua" || product.category === activeCategory) &&
    (activeQuickFilter === "Semua" ||
      (activeQuickFilter === "featured" && product.featured) ||
      (activeQuickFilter === "pedas" && product.spicy) ||
      (activeQuickFilter === "noncoffee" && product.nonCoffee) ||
      (activeQuickFilter === "favorit" && favorites.includes(product.id))) &&
    (!advancedFilters.featured || product.featured) &&
    (!advancedFilters.spicy || product.spicy) &&
    (!advancedFilters.nonCoffee || product.nonCoffee) &&
    (!advancedFilters.favorite || favorites.includes(product.id)) &&
    (!advancedFilters.minPrice || product.price >= Number(advancedFilters.minPrice)) &&
    (!advancedFilters.maxPrice || product.price <= Number(advancedFilters.maxPrice)) &&
    (!Number(advancedFilters.minRating || 0) || ratingInfo(product).avg >= Number(advancedFilters.minRating)) &&
    `${product.name} ${product.description} ${product.category} ${product.tag}`.toLocaleLowerCase("id").includes(query)
  );
  const sort=advancedFilters.sort;
  if(sort==="price-low") filtered.sort((a,b)=>a.price-b.price);
  else if(sort==="price-high") filtered.sort((a,b)=>b.price-a.price);
  else if(sort==="rating") filtered.sort((a,b)=>ratingInfo(b).avg-ratingInfo(a).avg);
  else if(sort==="name") filtered.sort((a,b)=>a.name.localeCompare(b.name,"id"));
  $("#resultCount").textContent = `${filtered.length} dari ${products.length} menu`;
  $("#menuGrid").setAttribute("aria-label", `Daftar ${filtered.length} menu`);
  $("#noResults").classList.toggle("hidden", filtered.length !== 0);
  const sig = JSON.stringify([query, activeCategory, activeQuickFilter, advancedFilters]);
  if (sig !== menuFilterSig) { menuFilterSig = sig; menuPage = 1; }
  applyCatalogLayout();
  const totalPages = Math.max(1, Math.ceil(filtered.length / menuPageSize));
  menuPage = Math.min(Math.max(1, menuPage), totalPages);
  const shown = filtered.slice((menuPage - 1) * menuPageSize, menuPage * menuPageSize);
  $("#menuMore").classList.add("hidden");
  $("#catalogPager").classList.toggle("hidden", totalPages <= 1);
  $("#catalogPageInfo").textContent = `${menuPage} / ${totalPages}`;
  $("#catalogPrev").disabled = menuPage <= 1;
  $("#catalogNext").disabled = menuPage >= totalPages;
  $("#menuGrid").innerHTML = shown.map((product, index) => {
    const isFav = favorites.includes(product.id);
    return `
    <article class="menu-card ${product.discount ? "is-promo" : ""}" style="animation-delay:${index*40}ms" data-detail="${product.id}" tabindex="0" aria-label="Lihat detail ${safe(product.name)}">
      <div class="menu-card-image">
        <img src="${photoSized(product.image, 640)}" alt="${safe(product.name)}" data-emoji="${product.emoji}" loading="lazy" decoding="async">
        ${product.discount ? `<span class="disc-badge">-${product.discount}%</span>` : ""}<button class="fav-button ${isFav ? "active" : ""}" data-fav="${product.id}" type="button" aria-label="${isFav ? "Hapus dari favorit" : "Tambah ke favorit"}" aria-pressed="${isFav}">${svgIcon("heart",17)}</button>
        <button class="quick-add" data-quickadd="${product.id}" type="button" aria-label="Tambah ${safe(product.name)} ke keranjang">+ Keranjang</button>
      </div>
      <div class="menu-card-info"><h3>${safe(product.name)}</h3><div class="menu-card-meta">${ratingLine(product)}<strong class="menu-card-price ${product.discount ? "has-discount" : ""}">${priceHTML(product)}</strong></div></div>
    </article>`;
  }).join("");
}

function goMenuPage(delta) {
  menuPage += delta;
  renderMenu();
  const top = document.querySelector(".menu-result-line");
  if (top) top.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
}
$("#catalogPrev").addEventListener("click", () => goMenuPage(-1));
$("#catalogNext").addEventListener("click", () => goMenuPage(1));


document.addEventListener("keydown", event => {
  const card = event.target.closest("[data-detail]");
  if (!card || (event.key !== "Enter" && event.key !== " ") || event.target !== card) return;
  event.preventDefault();
  openProductDetail(card.dataset.detail);
});

let productHistory = false;
window.addEventListener("popstate", () => {
  if (!productHistory) return;
  productHistory = false;
  const modal = $("#productModal");
  if (modal.classList.contains("open")) closeModal(modal);
});
function openProductDetail(id) {
  if (!productHistory) { try { history.pushState({ nexProduct: true }, ""); productHistory = true; } catch {} }
  const product = products.find(item => item.id === id);
  if (!product) return;
  activeDetailProduct = product;
  $("#detailImage").dataset.fb = "";
  $("#detailImage").src = product.image;
  $("#detailImage").alt = product.name;
  $("#detailCategory").textContent = `${catLabel(product.category).toUpperCase()} · ${product.tag}`;
  $("#productModalTitle").innerHTML = `${safe(product.name)}`;
  $("#detailDescription").textContent = product.description;
  $("#detailPrice").innerHTML = priceHTML(product) + (product.discount ? ` <span class="disc-badge">-${product.discount}%</span>` : "");
  renderDetailRating();
  const isDrink = kindOf(product) === "drink";
  $("#drinkOptions").classList.toggle("hidden", !isDrink);
  $("#foodOptions").classList.toggle("hidden", kindOf(product) !== "spice");
  $("#productNote").value = "";
  $("#sugarLevel").value = "Normal";
  $("#iceLevel").value = "Normal ice";
  $("#spiceLevel").value = "Level 1";
  openModal("productModal");
}
function cartCount() { return cart.reduce((sum, item) => sum + item.qty, 0); }
function subtotal() { return cart.reduce((sum, item) => sum + item.price * item.qty, 0); }
function bundleDiscount() {
  const hasFood = cart.some(item => kindOf(item) === "spice");
  const hasDrink = cart.some(item => kindOf(item) === "drink");
  if (!hasFood || !hasDrink) return 0;
  const food = cart.filter(item => kindOf(item) === "spice").reduce((sum, item) => sum + item.price * item.qty, 0);
  const drink = cart.filter(item => kindOf(item) === "drink").reduce((sum, item) => sum + item.price * item.qty, 0);
  return Math.round(Math.min(food, drink) * .10);
}
function tax() { return Math.round((subtotal() - bundleDiscount() - voucherDiscount()) * .05); }
function total() { return subtotal() - bundleDiscount() - voucherDiscount() + tax(); }

function addToCart(id, customization = {}) {
  const product = products.find(item => item.id === id);
  if (!product) return;
  if (!requireAuth("Masuk dulu untuk menambahkan menu ke keranjang.", () => addToCart(id, customization))) return;
  const options = {
    sugar: customization.sugar || "",
    ice: customization.ice || "",
    spice: customization.spice || "",
    note: (customization.note || "").trim()
  };
  const cartKey = [id, options.sugar, options.ice, options.spice, options.note].join("|");
  const existing = cart.find(item => (item.cartKey || item.id) === cartKey);
  if (existing) existing.qty += 1;
  else cart.push({...product, cartKey, customization: options, qty:1, note: options.note});
  saveJSON("nexcafe_cart", cart);
  updateCart();
  const button = $(`[data-add="${id}"]`);
  if (button) {
    const old = button.textContent;
    button.textContent = "✓ Ditambahkan";
    button.classList.add("added");
    setTimeout(() => { if (button.isConnected) { button.textContent = old; button.classList.remove("added"); } }, 1000);
  }
  closeAllModals();
  toast(`${product.name} ditambahkan ke tas`);
}
function updateCart() {
  const count = cartCount();
  $("#cartCount").textContent = count;
  $("#drawerCount").textContent = count;
  const badge = $("#cartCount");
  if (count > lastCartCount) { badge.classList.remove("animate-pop"); void badge.offsetWidth; badge.classList.add("animate-pop"); }
  lastCartCount = count;
  $("#miniCart").classList.toggle("hidden", count === 0);
  $("#miniCartText").textContent = `${count} Item · ${rupiah(total())}`;
  $("#miniCartTotal").textContent = rupiah(total());
  tweenMoney($("#cartSubtotal"), subtotal());
  $("#cartTax").textContent = rupiah(tax());
  tweenMoney($("#cartTotal"), total());
  $("#cartItems").innerHTML = cart.length ? cart.map(item => `
    <div class="cart-row">
      <img src="${imgOf(item)}" alt="${safe(item.name)}">
      <div><h3>${safe(item.name)}</h3><p>${rupiah(item.price)} / item</p><small class="cart-custom-note">${safe([item.customization?.sugar,item.customization?.ice,item.customization?.spice,item.customization?.note].filter(Boolean).join(" · "))}</small>
        <div class="quantity-control"><button data-qty="${safe(item.cartKey || item.id)}" data-change="-1" aria-label="Kurangi ${safe(item.name)}">−</button><span>${item.qty}</span><button data-qty="${safe(item.cartKey || item.id)}" data-change="1" aria-label="Tambah ${safe(item.name)}">+</button><button class="remove-item" data-remove="${safe(item.cartKey || item.id)}">Hapus</button></div>
      </div><strong class="cart-row-price">${rupiah(item.price*item.qty)}</strong>
    </div>`).join("") : `<div class="cart-empty">Tasmu masih kosong.<br><small>Tambahkan menu favoritmu dulu, ya.</small></div>`;
  $("#cartDiscountLine").classList.toggle("hidden", bundleDiscount() <= 0);
  renderVoucherUI();
  $("#cartDiscount").textContent = `− ${rupiah(bundleDiscount())}`;
  $("#checkoutButton").disabled = !cart.length;
  $("#checkoutButton").style.opacity = cart.length ? "1" : ".45";
  saveJSON("nexcafe_cart", cart);
}

function openCart() {
  $("#overlay").classList.add("open");
  $("#cartDrawer").classList.add("open");
  $("#cartDrawer").setAttribute("aria-hidden","false");
  document.body.classList.add("drawer-open");
}
function closeCart() {
  $("#overlay").classList.remove("open");
  $("#cartDrawer").classList.remove("open");
  $("#cartDrawer").setAttribute("aria-hidden","true");
  document.body.classList.remove("drawer-open");
}
function openModal(id) {
  closeCart();
  if(!$(".modal-wrap.open")) lastFocus = document.activeElement;
  $$(".modal-wrap.open").forEach(modal => { modal.classList.remove("open"); modal.setAttribute("aria-hidden","true"); });
  const modal = document.getElementById(id);
  modal.classList.add("open");
  modal.setAttribute("aria-hidden","false");
  document.body.classList.add("modal-open");
  (id === "authModal" && !user ? (modal.querySelector("#signupPanel:not([hidden]) #signupName") || modal.querySelector("#loginEmail")) : modal.querySelector("[data-close-modal]"))?.focus();
}
function closeModal(modal) {
  if (modal.id === "productModal" && productHistory) { productHistory = false; try { history.back(); } catch {} }
  if (modal.id === "authModal") pendingAuthAction = null;
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden","true");
  if (modal.id === "qrModal") clearInterval(countdownInterval);
  if (!$(".modal-wrap.open")) { document.body.classList.remove("modal-open"); lastFocus?.focus?.(); }
}
function closeAllModals() {
  $$(".modal-wrap.open").forEach(modal => closeModal(modal));
}
function updateProfile() {
  $("#profileName").textContent = user?.name || "Guest Member";
  $("#profileEmail").textContent = user?.email || "Masuk untuk menyimpan profilmu";
  $("#profileAvatar").textContent = (user?.name || "G").trim().charAt(0).toUpperCase();
  $("#loyaltyPoints").innerHTML = `${points} <small>pts</small>`;
  const tiers = [[25,"Master Roaster"],[10,"Coffee Enthusiast"],[0,"Brew Apprentice"]];
  $("#tierBadge").textContent = tiers.find(t => points >= t[0])[1];
  const progressPoints = points % 10;
  $("#loyaltyFill").style.width = progressPoints * 10 + "%";
  $("#loyaltyBar").setAttribute("aria-valuenow", String(progressPoints));
  $("#loyaltyLabel").textContent = `${progressPoints}/10 poin menuju minuman gratis`;
  $("#savedAddress").textContent = getAddress() || "Belum ada alamat tersimpan.";
  $("#profileAuthButton").innerHTML = user ? "Keluar dari akun <span>↗</span>" : "Masuk / Daftar <span>↗</span>";
  $("#orderHistory").innerHTML = orders.length ? orders.slice(0,4).map(order => `
    <div class="order-row"><div><strong>${safe(order.id)}</strong><small>${safe(order.items.map(item=>`${item.name} ×${item.qty}`).join(", "))}</small><small>${safe(order.date)}</small></div><span><strong>${rupiah(order.total)}</strong><small class="order-status">${safe((order.status || "PEMBAYARAN DITERIMA") + " · " + ["DITERIMA","DISIAPKAN","SIAP"][order.trackerStage || 0])}</small></span></div>`).join("") : `<p class="empty-copy">Belum ada pesanan. Menu favoritmu mungkin menunggu di sini.</p>`;
  updateLiveStatus();
}
function openAuth() {
  if (user) {
    if (confirm("Keluar dari akun NexCafe?")) {
      user = null;
      saveJSON("nexcafe_user", null);
      updateProfile();
      toast("Kamu sudah keluar dari akun.");
    }
  } else {
    $("#authIntro").textContent = AUTH_INTRO_DEFAULT;
    setAuthMode("login");
    openModal("authModal");
  }
}
const AUTH_INTRO_DEFAULT = $("#authIntro").textContent;
let pendingAuthAction = null;
/* Login hanya diminta saat dibutuhkan; setelah masuk, aksi tadi dilanjutkan otomatis. */
function requireAuth(message, resume) {
  if (user) return true;
  pendingAuthAction = resume || null;
  setAuthMode(storedAccounts.length ? "login" : "signup");
  $("#authIntro").textContent = message;
  openModal("authModal");
  return false;
}
function signIn(name, email) {
  const resume = pendingAuthAction; pendingAuthAction = null;
  user = {name:name.trim(), email:email.trim()};
  saveJSON("nexcafe_user", user);
  document.body.classList.remove("auth-required");
  updateProfile();
  closeAllModals();
  toast(`Selamat datang, ${user.name}!`);
  if (resume) setTimeout(resume, 350);
}
function setAuthMode(mode) {
  const signup = mode === "signup";
  $("#loginPanel").hidden = signup;
  $("#signupPanel").hidden = !signup;
  $("#loginPanel").classList.toggle("hidden", signup);
  $("#signupPanel").classList.toggle("hidden", !signup);
  $("#showLoginTab").classList.toggle("active", !signup);
  $("#showSignupTab").classList.toggle("active", signup);
  $("#showLoginTab").setAttribute("aria-selected", String(!signup));
  $("#showSignupTab").setAttribute("aria-selected", String(signup));
  $("#authTitle").innerHTML = signup ? 'Buat akun <em>NexCafe.</em>' : 'Selamat datang <em>kembali.</em>';
  $("#authIntro").textContent = signup ? "Buat akun untuk menyimpan profil dan melihat riwayat pesanan di perangkat ini." : "Masuk untuk melanjutkan pengalaman NexCafe.";
}
async function passwordDigest(password, salt) {
  if (!window.crypto?.subtle || !window.crypto?.getRandomValues || !window.TextEncoder) {
    throw new Error("Penyimpanan password aman tidak didukung browser ini. Coba buka website melalui browser modern atau localhost.");
  }
  const bytes = new TextEncoder().encode(`${salt}:${password}`);
  const digest = await window.crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(digest)].map(value => value.toString(16).padStart(2, "0")).join("");
}
function getAccounts() {
  const list = loadJSON("nexcafe_accounts", []);
  return Array.isArray(list) ? list : [];
}
function normalizedEmail(value) { return value.trim().toLowerCase(); }
async function handleSignup(event) {
  event.preventDefault();
  const name = $("#signupName").value.trim();
  const email = normalizedEmail($("#signupEmail").value);
  const password = $("#signupPassword").value;
  const confirmation = $("#signupPasswordConfirm").value;
  if (name.length < 2) return toast("Nama harus terdiri dari minimal 2 karakter.");
  if (password.length < 8) return toast("Gunakan password minimal 8 karakter.");
  if (password !== confirmation) return toast("Konfirmasi password belum cocok.");
  const accounts = getAccounts();
  if (accounts.some(account => normalizedEmail(account.email) === email)) {
    setAuthMode("login");
    $("#loginEmail").value = email;
    return toast("Email ini sudah terdaftar. Silakan masuk.");
  }
  try {
    const saltBytes = window.crypto.getRandomValues(new Uint8Array(16));
    const salt = [...saltBytes].map(value => value.toString(16).padStart(2, "0")).join("");
    const passwordHash = await passwordDigest(password, salt);
    accounts.push({name, email, passwordHash, salt, createdAt: new Date().toISOString()});
    saveJSON("nexcafe_accounts", accounts);
    signIn(name, email);
    if (cart.length) { renderCheckoutSummary(); openModal("checkoutModal"); }
  } catch (error) {
    toast(error.message || "Akun belum bisa dibuat. Coba lagi.");
  }
}
async function handleLogin(event) {
  event.preventDefault();
  const email = normalizedEmail($("#loginEmail").value);
  const password = $("#loginPassword").value;
  const account = getAccounts().find(item => normalizedEmail(item.email) === email);
  if (!account) return toast("Akun belum ditemukan. Periksa email atau buat akun baru.");
  try {
    const passwordHash = await passwordDigest(password, account.salt || "nexcafe-legacy");
    if (passwordHash !== account.passwordHash) return toast("Email atau password belum cocok.");
    signIn(account.name, account.email);
    if (cart.length) { renderCheckoutSummary(); openModal("checkoutModal"); }
  } catch (error) {
    toast(error.message || "Tidak bisa masuk. Coba lagi.");
  }
}

function makeOrderId() {
  return "NC" + Date.now().toString().slice(-8) + Math.floor(Math.random()*90+10);
}
function renderCheckoutSummary() {
  refreshCheckoutOptions();
  $("#checkoutSummary").innerHTML = cart.map(item => `<div class="checkout-summary-row"><span>${safe(item.name)} × ${item.qty}</span><strong>${rupiah(item.price*item.qty)}</strong></div>`).join("") +
    `<div class="checkout-summary-row"><span>Subtotal</span><span>${rupiah(subtotal())}</span></div>${bundleDiscount() ? `<div class="checkout-summary-row"><span>Paket Hemat Ngopi (10%)</span><span>− ${rupiah(bundleDiscount())}</span></div>` : ""}${voucherDiscount() ? `<div class="checkout-summary-row"><span>Voucher ${appliedVoucher.code}</span><span>− ${rupiah(voucherDiscount())}</span></div>` : ""}<div class="checkout-summary-row"><span>Pajak layanan (5%)</span><span>${rupiah(tax())}</span></div><div class="checkout-summary-row total"><span>Total</span><strong>${rupiah(total())}</strong></div>`;
}
function makeMockQR(seedText) {
  // Pola QR dekoratif lokal untuk alur fiksi; bukan kode QRIS yang dapat dipindai.
  const size=29, cell=8, seed=[...seedText].reduce((a,c)=>((a*31+c.charCodeAt(0))>>>0),7);
  const finder=(x,y,ox,oy)=>x>=ox&&x<ox+7&&y>=oy&&y<oy+7&&
    (x===ox||x===ox+6||y===oy||y===oy+6||(x>=ox+2&&x<=ox+4&&y>=oy+2&&y<=oy+4));
  let rects="";
  for(let y=0;y<size;y++) for(let x=0;x<size;x++){
    const inFinder=finder(x,y,0,0)||finder(x,y,size-7,0)||finder(x,y,0,size-7);
    let v=((Math.imul(x+13,y+17)+seed+(x*y*7))>>>0)%11<5;
    if(inFinder) v=true;
    if((x<8&&y<8)||(x>=size-8&&y<8)||(x<8&&y>=size-8)){
      v=finder(x,y,0,0)||finder(x,y,size-7,0)||finder(x,y,0,size-7);
    }
    if(v) rects+=`<rect x="${x*cell}" y="${y*cell}" width="${cell}" height="${cell}"/>`;
  }
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size*cell} ${size*cell}"><rect width="100%" height="100%" fill="#fffaf3"/><g fill="#2C221E">${rects}</g></svg>`;
  return "data:image/svg+xml;charset=utf-8,"+encodeURIComponent(svg);
}
function startQR() {
  if (!cart.length) return toast("Keranjangmu masih kosong.");
  if (checkoutSel.type === "Makan di sini" && !checkoutSel.table) return toast("Pilih meja dulu, ya.");
  currentOrder = {
    id: makeOrderId(),
    createdAt: new Date(),
    date: new Intl.DateTimeFormat("id-ID",{dateStyle:"medium",timeStyle:"short"}).format(new Date()),
    items: cart.map(item => ({id:item.id,name:item.name,price:item.price,qty:item.qty,note:item.note || "",customization:item.customization || {}})),
    note: $("#orderNote").value.trim(),
    subtotal: subtotal(),
    discount: bundleDiscount(),
    tax: tax(),
    total: total(),
    status: "MENUNGGU PEMBAYARAN",
    type: checkoutSel.type, table: checkoutSel.type === "Makan di sini" ? checkoutSel.table : null, method: checkoutSel.method,
    voucher: voucherDiscount(), voucherCode: voucherDiscount() ? appliedVoucher.code : ""
  };
  if (checkoutSel.method === "Tunai") { remainingSeconds = 900; confirmPayment(); return; }
  const isQR = currentOrder.method === "QRIS";
  $("#qrTitle").innerHTML = isQR ? 'Scan & <em>settle.</em>' : 'Selesaikan <em>pembayaran.</em>';
  $(".qr-card .modal-intro").textContent = isQR
    ? "Tampilan kode pembayaran untuk pesanan ini akan muncul di bawah."
    : "Ikuti detail metode pembayaran yang kamu pilih untuk melanjutkan pesanan.";
  $("#qrImage").classList.toggle("hidden", !isQR); $("#payInstruction").classList.toggle("hidden", isQR);
  if (isQR) $("#qrImage").src = makeMockQR(currentOrder.id);
  else $("#payInstruction").innerHTML = currentOrder.method === "Transfer Bank" ? `<small>VIRTUAL ACCOUNT · NEXCAFE</small><strong>8808 ${currentOrder.id.replace(/\D/g,"").padStart(12,"0").slice(-12)}</strong><p>Gunakan nomor virtual account ini pada menu transfer bank pilihanmu.</p><button type="button" class="text-button copy-va" data-copy-va>Salin nomor rekening</button>` : currentOrder.method === "E-wallet" ? `<small>PEMBAYARAN E-WALLET</small><strong>Pilih aplikasi favoritmu</strong><div class="wallet-brands"><span>GoPay</span><span>OVO</span><span>DANA</span></div><p>Pilih aplikasi yang biasa kamu gunakan. Pada alur fiktif ini, saldo tidak akan terpotong.</p>` : `<small>PEMBAYARAN KARTU</small><strong>Kartu debit atau kredit</strong><p>Pembayaran kartu pada alur kafe ini dicatat untuk simulasi dan tidak diproses oleh terminal nyata.</p>`;
  $("#qrOrderNumber").textContent = `ORDER #${currentOrder.id}`;
  $("#qrTotal").textContent = rupiah(currentOrder.total);
  remainingSeconds = 15*60;
  updateCountdown();
  clearInterval(countdownInterval);
  countdownInterval = setInterval(() => {
    remainingSeconds -= 1;
    updateCountdown();
    if (remainingSeconds <= 0) {
      clearInterval(countdownInterval);
      $("#simulatePayment").disabled = true;
      $("#simulatePayment").textContent = "Waktu pembayaran berakhir";
      toast("Waktu pembayaran habis. Silakan buat pesanan baru.");
    }
  },1000);
  openModal("qrModal");
}
function updateCountdown() {
  const min = Math.floor(Math.max(0,remainingSeconds)/60).toString().padStart(2,"0");
  const sec = (Math.max(0,remainingSeconds)%60).toString().padStart(2,"0");
  $("#countdownTimer").textContent = `${min}:${sec}`;
}
function confirmPayment() {
  if (!currentOrder || remainingSeconds <= 0) return toast("Waktu pembayaran berakhir.");
  clearInterval(countdownInterval);
  const cashPending = currentOrder.method === "Tunai";
  currentOrder.status = cashPending ? "MENUNGGU PEMBAYARAN DI KASIR" : "PEMBAYARAN DITERIMA · SIMULASI";
  currentOrder.trackerStage = 0;
  orders.unshift({...currentOrder, date:currentOrder.date});
  saveJSON("nexcafe_orders",orders);
  if (!cashPending) { points += Math.max(1,Math.floor(currentOrder.total/10000)); try { localStorage.setItem("nexcafe_points",String(points)); } catch {} }
  cart = []; appliedVoucher = null; checkoutSel.table = null;
  saveJSON("nexcafe_cart",cart);
  $("#orderNote").value = "";
  updateCart();
  updateProfile();
  trackerStage = 0;
  renderReceipt();
  openModal("receiptModal");
  toast(cashPending ? "Pesanan dicatat. Pembayaran dilakukan di kasir." : "Pembayaran simulasi berhasil dikonfirmasi.");
}
function renderReceipt() {
  if (!currentOrder) return;
  $(".paid-stamp").textContent = currentOrder.method === "Tunai" ? "PESANAN DICATAT · BAYAR DI KASIR" : "PEMBAYARAN DITERIMA · SIMULASI";
  $("#receiptContent").innerHTML = `
    <div class="receipt-meta"><span>NO. TRANSAKSI</span><strong>${safe(currentOrder.id)}</strong></div>
    <div class="receipt-meta"><span>TANGGAL / WAKTU</span><span>${safe(currentOrder.date)}</span></div>
    <div class="receipt-meta"><span>JENIS</span><span>${safe(currentOrder.type || "-")}${currentOrder.table ? " · Meja " + safe(currentOrder.table) : ""}</span></div><div class="receipt-meta"><span>PEMBAYARAN</span><span>${safe(currentOrder.method || "QRIS")}</span></div>
    <div class="receipt-items">${currentOrder.items.map(item=>`<div class="receipt-item"><span>${safe(item.name)} × ${item.qty}<br><small>${rupiah(item.price)} / item${item.customization && Object.values(item.customization).filter(Boolean).length ? " · "+safe(Object.values(item.customization).filter(Boolean).join(" · ")) : ""}</small></span><strong>${rupiah(item.price*item.qty)}</strong></div>`).join("")}</div>
    <div class="price-line"><span>Subtotal</span><strong>${rupiah(currentOrder.subtotal)}</strong></div>
    ${currentOrder.discount ? `<div class="price-line"><span>Paket Hemat Ngopi</span><strong>− ${rupiah(currentOrder.discount)}</strong></div>` : ""}
    ${currentOrder.voucher ? `<div class="price-line"><span>Voucher ${safe(currentOrder.voucherCode)}</span><strong>− ${rupiah(currentOrder.voucher)}</strong></div>` : ""}<div class="price-line"><span>Pajak layanan (5%)</span><strong>${rupiah(currentOrder.tax)}</strong></div>
    <div class="receipt-total"><span>Total</span><strong>${rupiah(currentOrder.total)}</strong></div>
    <p class="receipt-note"><strong>Catatan:</strong> ${safe(currentOrder.note || "—")}<br><small>Simpan struk ini sebagai referensi pesananmu.</small></p>`;
  updateTrackerUI();
}
function updateTrackerUI() {
  const ready = currentOrder?.type === "Bawa pulang" ? "Siap diambil di kasir" : `Siap diantar ke meja ${currentOrder?.table || ""}`;
  const stages = [currentOrder?.method === "Tunai" ? "Pesanan diterima · bayar di kasir" : "Pesanan diterima","Sedang disiapkan",ready];
  $("#trackerStatus").textContent = stages[trackerStage];
  $("#trackerProgress").style.width = `${trackerStage*50}%`;
  $$(".tracker-steps span").forEach((step,index)=>step.classList.toggle("complete",index<=trackerStage));
  $("#advanceOrder").textContent = trackerStage >= 2 ? "Pesanan siap — kembali ke beranda ↗" : "Perbarui status pesanan →";
}
function advanceTracker() {
  if (trackerStage < 2) {
    trackerStage += 1;
    if (currentOrder) {
      const saved = orders.find(order=>order.id===currentOrder.id);
      if (saved) saved.trackerStage = trackerStage;
      saveJSON("nexcafe_orders",orders);
      updateProfile();
    }
    updateTrackerUI();
    toast(["","Barista sedang menyiapkan pesananmu.","Pesanan siap diantar atau diambil!"][trackerStage]);
  } else {
    closeAllModals();
    document.body.classList.remove("modal-open");
    location.hash = "#home";
  }
}
function downloadReceipt() {
  if (!currentOrder) return;
  const html = `<!doctype html><html lang="id"><head><meta charset="utf-8"><title>Struk ${safe(currentOrder.id)}</title><style>body{font:14px Arial,sans-serif;max-width:520px;margin:35px auto;padding:25px;color:#2C221E}h1{font:32px Georgia;text-align:center}p{color:#786b62}.row{display:flex;justify-content:space-between;gap:15px;margin:12px 0}.line{border-top:1px dashed #bbb;padding-top:12px}.stamp{border:1px solid #8A9A86;color:#63785e;display:inline-block;padding:6px 12px;letter-spacing:2px}small{color:#82766e}</style></head><body><center><h1>NexCafe</h1><p>COFFEE · FOOD · STORIES</p><span class="stamp">${safe(currentOrder.status)}</span></center><hr><div class="row"><span>Nomor transaksi</span><strong>${safe(currentOrder.id)}</strong></div><div class="row"><span>Tanggal</span><span>${safe(currentOrder.date)}</span></div><div class="row"><span>Jenis</span><span>${safe(currentOrder.type||"-")}${currentOrder.table?" · Meja "+safe(currentOrder.table):""}</span></div><div class="row"><span>Pembayaran</span><span>${safe(currentOrder.method||"QRIS")}</span></div><hr>${currentOrder.items.map(item=>`<div class="row"><span>${safe(item.name)} × ${item.qty}</span><strong>${rupiah(item.price*item.qty)}</strong></div>`).join("")}<hr><div class="row"><span>Subtotal</span><span>${rupiah(currentOrder.subtotal)}</span></div>${currentOrder.discount ? `<div class="row"><span>Paket Hemat Ngopi</span><span>− ${rupiah(currentOrder.discount)}</span></div>` : ""}${currentOrder.voucher?`<div class="row"><span>Voucher ${safe(currentOrder.voucherCode)}</span><span>− ${rupiah(currentOrder.voucher)}</span></div>`:""}<div class="row"><span>Pajak layanan (5%)</span><span>${rupiah(currentOrder.tax)}</span></div><div class="row line"><strong>Total</strong><strong>${rupiah(currentOrder.total)}</strong></div><p>Catatan: ${safe(currentOrder.note || "—")}</p><hr><p><small>Terima kasih telah memesan di NexCafe.</small></p><script>window.print()<\/script></body></html>`;
  const blob = new Blob([html],{type:"text/html;charset=utf-8"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `Struk-${currentOrder.id}.html`;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(()=>URL.revokeObjectURL(url),1000);
}
function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  try { localStorage.setItem("nexcafe_theme",theme); } catch {}
  $("#themeToggle").innerHTML = svgIcon(theme === "dark" ? "sun" : "moon",18);
  $("#themeToggle").setAttribute("aria-label",theme === "dark" ? "Aktifkan tema terang" : "Aktifkan tema gelap");
}
function setupReveal() {
  const elements = $$(".reveal");
  elements.forEach(el => { const sibs = [...el.parentElement.children].filter(c => c.classList.contains("reveal")); el.style.transitionDelay = (Math.min(sibs.indexOf(el), 4) * 90) + "ms"; });
  if (!("IntersectionObserver" in window)) {
    elements.forEach(element=>element.classList.add("visible"));
    return;
  }
  const observer = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },{threshold:.12,rootMargin:"0px 0px -30px 0px"});
  elements.forEach(element=>observer.observe(element));
}
function closeMobileNav() {
  const nav = $("#mainNav"), button = $("#mobileMenuButton");
  nav?.classList.remove("open");
  document.body.classList.remove("nav-open");
  button?.setAttribute("aria-expanded", "false");
  if (button) { button.innerHTML = svgIcon("menu", 20); button.setAttribute("aria-label", "Buka navigasi"); }
}
function setupNav() {
  // Explicit scrolling avoids hash navigation being swallowed by mobile drawer/layout styles.
  $$(".nav-link, .brand[href^='#'], a[href^='#home'], a[href^='#menu'], a[href^='#story'], a[href^='#journal'], a[href^='#profile']").forEach(link => {
    if (link.dataset.navBound === "true") return;
    link.dataset.navBound = "true";
    link.addEventListener("click", event => {
      const href = link.getAttribute("href");
      if (!href || !href.startsWith("#")) return;
      if (href === "#profile") { event.preventDefault(); closeMobileNav(); openModal("profileModal"); return; }
      const target = $(href);
      if (!target) return;
      event.preventDefault();
      closeMobileNav();
      $$(".nav-link").forEach(item => item.classList.toggle("active", item.getAttribute("href") === href));
      history.replaceState(null, "", href);
      target.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
    });
  });
  const sections = $$("main section[id]");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if ($(`.nav-link[href="#${entry.target.id}"]`)) $$(".nav-link").forEach(item => item.classList.toggle("active", item.getAttribute("href") === `#${entry.target.id}`));
        }
      });
    }, { rootMargin: "-30% 0px -60% 0px" });
    sections.forEach(section => observer.observe(section));
  }
}

document.addEventListener("click",event=>{
  const fav = event.target.closest("[data-fav]");
  if(fav) { event.preventDefault(); event.stopPropagation(); toggleFavorite(fav.dataset.fav); return; }
  const quick = event.target.closest("[data-quickadd]");
  if(quick) { event.preventDefault(); event.stopPropagation(); const p = products.find(x => x.id === quick.dataset.quickadd); if(p) addToCart(p.id, {sugar:kindOf(p)==="drink"?"Normal":"",ice:kindOf(p)==="drink"?"Normal ice":"",spice:kindOf(p)==="spice"?"Level 1":""}); return; }
  const article = event.target.closest("[data-article]");
  if(article) { openArticle(article.dataset.article); return; }
  const detail = event.target.closest("[data-detail]");
  if(detail) { event.preventDefault(); openProductDetail(detail.dataset.detail); return; }
  const add = event.target.closest("[data-add]");
  if(add) addToCart(add.dataset.add);
  const qty = event.target.closest("[data-qty]");
  if(qty){
    const item = cart.find(entry=>(entry.cartKey || entry.id)===qty.dataset.qty);
    if(item){item.qty += Number(qty.dataset.change);if(item.qty<=0)cart=cart.filter(entry=>(entry.cartKey || entry.id)!==qty.dataset.qty);updateCart();}
  }
  const remove = event.target.closest("[data-remove]");
  if(remove){cart=cart.filter(item=>(item.cartKey || item.id)!==remove.dataset.remove);updateCart();toast("Menu dihapus dari tas.");}
  if(event.target.closest("[data-close-modal]")) closeModal(event.target.closest(".modal-wrap"));
});
$("#cartOpen").addEventListener("click",openCart);
$("#cartClose").addEventListener("click",closeCart);
$("#overlay").addEventListener("click",closeCart);
$("#menuSearch").addEventListener("input",()=>{menuLimit=12;renderMenu();});
$("#productOptionsForm").addEventListener("submit", event => {
  event.preventDefault();
  if (!activeDetailProduct) return;
  const customization = {
    sugar: kindOf(activeDetailProduct) === "drink" ? $("#sugarLevel").value : "",
    ice: kindOf(activeDetailProduct) === "drink" ? $("#iceLevel").value : "",
    spice: kindOf(activeDetailProduct) === "spice" ? $("#spiceLevel").value : "",
    note: $("#productNote").value
  };
  addToCart(activeDetailProduct.id, customization);
});
$("#detailOrderNow").addEventListener("click", () => {
  if (!activeDetailProduct) return;
  const customization = {
    sugar: kindOf(activeDetailProduct) === "drink" ? $("#sugarLevel").value : "",
    ice: kindOf(activeDetailProduct) === "drink" ? $("#iceLevel").value : "",
    spice: kindOf(activeDetailProduct) === "spice" ? $("#spiceLevel").value : "",
    note: $("#productNote").value
  };
  if (!requireAuth("Masuk dulu untuk memesan.", () => $("#detailOrderNow").click())) return;
  addToCart(activeDetailProduct.id, customization);
  renderCheckoutSummary();
  openModal("checkoutModal");
});
document.addEventListener("click", e => {
  const quick=e.target.closest("[data-quick]");
  if(quick){activeQuickFilter=quick.dataset.quick;menuLimit=12;renderFilters();renderMenu();return;}
  const category=e.target.closest("[data-category]");
  if(category){activeCategory=category.dataset.category;menuLimit=12;renderFilters();renderMenu();return;}
});
function openFilterSheet(){const overlay=$("#filterSheetOverlay");overlay.classList.add("active");overlay.setAttribute("aria-hidden","false");document.body.classList.add("sheet-open");$("#filterSheet").focus();}
function closeFilterSheet(){const overlay=$("#filterSheetOverlay");overlay.classList.remove("active");overlay.setAttribute("aria-hidden","true");document.body.classList.remove("sheet-open");$("#mobileFilterOpen")?.focus();}
$("#mobileFilterOpen").addEventListener("click",openFilterSheet);
$("#filterSheetOverlay").addEventListener("click",e=>{if(e.target===$("#filterSheetOverlay")||e.target.closest("[data-close-filter]"))closeFilterSheet();});
$("#applySheetFilters").addEventListener("click",()=>{
  advancedFilters={featured:$("#sheetFeatured").checked,spicy:$("#sheetSpicy").checked,nonCoffee:$("#sheetNonCoffee").checked,favorite:$("#sheetFavorite").checked,minPrice:$("#filterMinPrice").value,maxPrice:$("#filterMaxPrice").value,sort:$("#mobileSort").value,minRating:$("#mobileMinRating").value};
  activeQuickFilter="Semua";menuLimit=12;renderFilters();renderMenu();closeFilterSheet();
});
$("#clearSheetFilters").addEventListener("click",()=>{advancedFilters={featured:false,spicy:false,nonCoffee:false,favorite:false,minPrice:"",maxPrice:"",sort:"default",minRating:"0"};activeQuickFilter="Semua";activeCategory="Semua";menuLimit=12;renderFilters();renderMenu();});
$("#desktopSort").addEventListener("change",e=>{advancedFilters.sort=e.target.value;renderFilters();renderMenu();});
$("#desktopMinRating").addEventListener("change",e=>{advancedFilters.minRating=e.target.value;renderFilters();renderMenu();});
$("#mobileMinRating").addEventListener("change",e=>{advancedFilters.minRating=e.target.value;});
["desktopFeatured","desktopSpicy","desktopNonCoffee","desktopFavorite"].forEach(id=>$("#"+id).addEventListener("change",()=>{
  advancedFilters.featured=$("#desktopFeatured").checked;advancedFilters.spicy=$("#desktopSpicy").checked;advancedFilters.nonCoffee=$("#desktopNonCoffee").checked;advancedFilters.favorite=$("#desktopFavorite").checked;
  activeQuickFilter="Semua";menuLimit=12;renderFilters();renderMenu();
}));
["desktopMinPrice","desktopMaxPrice"].forEach(id=>$("#"+id).addEventListener("change",()=>{advancedFilters.minPrice=$("#desktopMinPrice").value;advancedFilters.maxPrice=$("#desktopMaxPrice").value;renderFilters();renderMenu();}));
$("#resetFilters").addEventListener("click",()=>{advancedFilters={featured:false,spicy:false,nonCoffee:false,favorite:false,minPrice:"",maxPrice:"",sort:"default",minRating:"0"};activeQuickFilter="Semua";activeCategory="Semua";$("#menuSearch").value="";menuLimit=12;renderFilters();renderMenu();});
$("#checkoutButton").addEventListener("click",()=>{
  if(!cart.length)return;
  if(!requireAuth("Masuk dulu untuk melanjutkan pemesanan.", () => $("#checkoutButton").click())) return;
  renderCheckoutSummary();
  openModal("checkoutModal");
});
$("#signupForm").addEventListener("submit", handleSignup);
$("#loginForm").addEventListener("submit", handleLogin);
$("#showLoginTab").addEventListener("click", () => setAuthMode("login"));
$("#showSignupTab").addEventListener("click", () => setAuthMode("signup"));
$("#loginToSignup").addEventListener("click", () => setAuthMode("signup"));
$("#signupToLogin").addEventListener("click", () => setAuthMode("login"));
$("#profileAuthButton").addEventListener("click",openAuth);
$("#generateQR").addEventListener("click",startQR);
$("#simulatePayment").addEventListener("click",()=>{
  if (!currentOrder || remainingSeconds <= 0) return toast("Waktu pembayaran berakhir.");
  if (currentOrder.method !== "Tunai") toast("Status pembayaran simulasi diperbarui.");
  confirmPayment();
});
document.addEventListener("click", async e=>{
  const copy=e.target.closest("[data-copy-va]");
  if(!copy || !currentOrder) return;
  const va=`8808 ${currentOrder.id.replace(/\\D/g,"").padStart(12,"0").slice(-12)}`;
  try { await navigator.clipboard.writeText(va); toast("Nomor virtual account disalin."); }
  catch { toast(va); }
});
$("#downloadReceipt").addEventListener("click",downloadReceipt);
$("#advanceOrder").addEventListener("click",advanceTracker);
$("#backHome").addEventListener("click",()=>{closeAllModals();location.hash="#home";});
$("#themeToggle").addEventListener("click",()=>setTheme(document.documentElement.dataset.theme==="dark"?"light":"dark"));
$("#mobileMenuButton").setAttribute("aria-controls","mainNav");
$("#mobileMenuButton").setAttribute("aria-expanded","false");
$("#mobileMenuButton").addEventListener("click",()=>{
  const nav=$("#mainNav");
  const opened = !nav.classList.contains("open");
  if (opened) { nav.classList.add("open"); document.body.classList.add("nav-open"); }
  else closeMobileNav();
  $("#mobileMenuButton").innerHTML=svgIcon(opened?"close":"menu",20);
  $("#mobileMenuButton").setAttribute("aria-expanded",String(opened));
  $("#mobileMenuButton").setAttribute("aria-label",opened?"Tutup navigasi":"Buka navigasi");
});
document.addEventListener("click", event => {
  // composedPath: ikon tombol diganti saat diklik, jadi event.target bisa sudah lepas dari DOM.
  const inside = event.composedPath().some(node => node.id === "mainNav" || node.id === "mobileMenuButton");
  if (document.body.classList.contains("nav-open") && !inside) closeMobileNav();
});
document.addEventListener("keydown",event=>{
  if(event.key==="Escape"){closeCart();closeAllModals();closeFilterSheet();closeMobileNav();}
  if(event.key==="Tab"){
    const activeSheet=$("#filterSheetOverlay.active #filterSheet");
    const activeModal=$(".modal-wrap.open");
    const container=activeSheet||activeModal;
    if(!container)return;
    const focusable=$$("button:not([disabled]),a[href],input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex='-1'])",container).filter(el=>el.offsetParent!==null);
    if(!focusable.length)return;
    const first=focusable[0],last=focusable[focusable.length-1];
    if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
    else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
  }
});
window.addEventListener("storage",event=>{
  if(["nexcafe_cart","nexcafe_orders","nexcafe_user","nexcafe_points","nexcafe_favorites"].includes(event.key)){
    cart=loadJSON("nexcafe_cart",[]);orders=loadJSON("nexcafe_orders",[]);user=loadJSON("nexcafe_user",null);points=Number(localStorage.getItem("nexcafe_points")||0);favorites=loadJSON("nexcafe_favorites",[]);updateCart();updateProfile();renderMenu();
  }
});

/* ===== NexCafe v2 — editorial additions ===== */

function updateLiveStatus(){
  const hour = new Date().getHours();
  const isOpen = cafeOpen && hour >= 8 && hour < 22;
  const el = $("#liveStatus");
  if(el) el.innerHTML = `<span class="live-dot ${isOpen ? "" : "off"}"></span>${isOpen ? "BUKA SEKARANG" : "TUTUP"} · 08.00—22.00`;
}

function toggleFavorite(id){
  if (!requireAuth("Masuk dulu untuk menyimpan menu favorit.", () => toggleFavorite(id))) return;
  const wasFav = favorites.includes(id);
  favorites = wasFav ? favorites.filter(f => f !== id) : [...favorites, id];
  saveJSON("nexcafe_favorites", favorites);
  renderMenu();
  toast(wasFav ? "Dihapus dari favorit." : "Ditambahkan ke favorit ♥");
}

function openArticle(id){
  const article = articles.find(a => a.id === id);
  if(!article) return;
  $("#journalImage").src = article.image;
  $("#journalImage").alt = article.title;
  $("#journalMeta").innerHTML = `<span>${safe(article.tag)}</span><span>${safe(article.read)} READ</span>`;
  $("#journalTitle").textContent = article.title;
  $("#journalBody").innerHTML = article.body.map(p => `<p>${safe(p)}</p>`).join("");
  openModal("journalModal");
}

$$(".gallery-image").forEach(box => {
  box.style.cursor = "zoom-in";
  box.addEventListener("click", () => {
    const img = box.querySelector("img");
    if(!img) return;
    $("#lightboxImage").src = img.src;
    $("#lightboxImage").alt = img.alt;
    $("#lightboxCaption").textContent = box.querySelector("span")?.textContent || img.alt;
    openModal("lightboxModal");
  });
});

$("#newsletterForm")?.addEventListener("submit", event => {
  event.preventDefault();
  const input = event.target.querySelector("input");
  const email = input.value.trim();
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){ toast("Email belum valid. Coba lagi, ya."); return; }
  event.target.reset();
  toast("Terima kasih! Surat dari NexCafe akan segera datang.");
});

window.addEventListener("scroll", () => {
  const doc = document.documentElement;
  const max = doc.scrollHeight - doc.clientHeight;
  const pct = max > 0 ? (doc.scrollTop / max) * 100 : 0;
  const bar = $("#scrollProgress");
  if(bar) bar.style.width = pct + "%";
}, { passive: true });

setTheme(localStorage.getItem("nexcafe_theme") || "light");
renderMenu();
updateCart();
updateProfile();
setupReveal();
setupNav();
updateLiveStatus();
setInterval(updateLiveStatus, 60000);


/* ===== NexCafe v3 — aksesibilitas & profil ===== */
function getAddress(){ try { return localStorage.getItem("nexcafe_address"); } catch { return null; } }
document.addEventListener("keydown", e => {
  if ((e.key === "Enter" || e.key === " ") && e.target.matches("[role='button'][tabindex]")) { e.preventDefault(); e.target.click(); return; }
  if (e.key === "Tab") {
    const card = $(".modal-wrap.open .modal-card"); if (!card) return;
    const f = $$("button,input,select,textarea,a[href]", card).filter(x => !x.disabled && x.offsetParent !== null);
    if (!f.length) return;
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
});
$("#editAddress").addEventListener("click", () => {
  const v = prompt("Alamat pengiriman:", getAddress() || "");
  if (v === null) return;
  try { localStorage.setItem("nexcafe_address", v.trim()); } catch {}
  updateProfile(); toast("Alamat disimpan.");
});
renderFilters(); renderReviews();
$("#menuMore").addEventListener("click", () => { menuLimit += 12; renderMenu(); });
$("#miniCart").addEventListener("click", () => openCart());
updateProfile();


/* ===== NexCafe v4 — meja, bayar, voucher, rating, riwayat ===== */
function applyVoucher(raw) {
  const code = (raw || "").trim().toUpperCase(), v = vouchers.find(x => x.code === code), msg = $("#voucherMsg");
  if (!v) { msg.textContent = "Kode tidak ditemukan."; return; }
  if (v.member && !user) { msg.textContent = "Masuk dulu untuk memakai voucher member."; return; }
  if (subtotal() < v.min) { msg.textContent = `Minimal belanja ${rupiah(v.min)} untuk kode ${v.code}.`; return; }
  appliedVoucher = v; $("#voucherInput").value = ""; updateCart(); toast(`Voucher ${v.code} dipakai.`);
}
$("#voucherApply").addEventListener("click", () => applyVoucher($("#voucherInput").value));
$("#voucherInput").addEventListener("keydown", e => { if (e.key === "Enter") { e.preventDefault(); applyVoucher(e.target.value); } });
$("#openHistory").addEventListener("click", () => { renderHistory(); openModal("historyModal"); });
document.addEventListener("change", e => {
  if (e.target.name === "orderType") { checkoutSel.type = e.target.value; if (checkoutSel.type !== "Makan di sini") checkoutSel.table = null; refreshCheckoutOptions(); }
  if (e.target.name === "payMethod") { checkoutSel.method = e.target.value; updateGenLabel(); }
});
document.addEventListener("click", e => {
  const t = e.target.closest("[data-table]");
  if (t && !t.disabled) { checkoutSel.table = t.dataset.table; refreshCheckoutOptions(); $(`[data-table="${checkoutSel.table}"]`)?.focus(); return; }
  const vc = e.target.closest("[data-voucher]"); if (vc) { applyVoucher(vc.dataset.voucher); return; }
  if (e.target.closest("[data-voucher-remove]")) { appliedVoucher = null; updateCart(); return; }
  const rb = e.target.closest("[data-rate]");
  if (rb && activeDetailProduct) { const m = userRatings(); m[activeDetailProduct.id] = Number(rb.dataset.rate); saveJSON(RATING_KEY, m); renderDetailRating(); renderMenu(); $(`[data-rate="${rb.dataset.rate}"]`)?.focus(); toast("Terima kasih atas ratingmu!"); return; }
  const ri = e.target.closest("[data-rateitem]"); if (ri) { closeAllModals(); openProductDetail(ri.dataset.rateitem); return; }
  const ro = e.target.closest("[data-reorder]");
  if (ro) { const o = orders.find(x => x.id === ro.dataset.reorder); if (!o) return; o.items.forEach(i => { for (let k = 0; k < i.qty; k++) addToCart(i.id, i.customization || {}); }); openCart(); }
});
document.addEventListener("error", e => {
  const im = e.target; if (!im || im.tagName !== "IMG" || im.dataset.fb) return; im.dataset.fb = "1";
  const t = (im.alt || "NexCafe").slice(0, 30).replace(/[<>&]/g, "");
  im.src = "data:image/svg+xml," + encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'><rect width='400' height='300' fill='#e9dfd2'/><g fill='none' stroke='#8a9a86' stroke-width='7' stroke-linecap='round' stroke-linejoin='round'><ellipse cx='200' cy='126' rx='72' ry='48'/><ellipse cx='200' cy='126' rx='53' ry='31'/><path d='M117 180h166'/></g><text x='200' y='225' font-size='17' font-family='sans-serif' fill='#5C5046' text-anchor='middle'>${t}</text></svg>`);
}, true);
renderMenu(); updateCart(); resolveMenuPhotos();

// First visit requires sign-up/sign-in. Validate persisted sessions so stale browser data
// cannot silently skip the welcome screen after an account/session mismatch.
const storedAccounts = getAccounts();
if (user && (!user.email || !storedAccounts.some(account => normalizedEmail(account.email) === normalizedEmail(user.email)))) {
  user = null;
  saveJSON("nexcafe_user", null);
}
// Pengunjung boleh menjelajah dulu; login baru diminta saat memesan, memasukkan ke keranjang, atau menyukai menu.
document.body.classList.remove("auth-required");
setAuthMode(storedAccounts.length ? "login" : "signup");

// Keep the floating mobile cart from covering the footer content.
(() => {
  const footer = document.querySelector('.site-footer');
  if (!footer || !('IntersectionObserver' in window)) return;
  const footerObserver = new IntersectionObserver(entries => {
    document.body.classList.toggle('footer-visible', entries.some(entry => entry.isIntersecting));
  }, { threshold: 0.02 });
  footerObserver.observe(footer);
})();

/* ===== Mikro-interaksi: ripple, magnetic, counter-up ===== */
function prefersReducedMotion() { return matchMedia("(prefers-reduced-motion: reduce)").matches; }
function formatCount(v, decimals) { return v.toLocaleString("id-ID", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }); }

function animateCount(el, to, decimals = 0, duration = 1400) {
  if (prefersReducedMotion()) { el.textContent = formatCount(to, decimals); return; }
  const start = performance.now();
  const tick = now => {
    const p = Math.min((now - start) / duration, 1), eased = 1 - Math.pow(1 - p, 3);
    el.textContent = formatCount(to * eased, decimals);
    if (p < 1) requestAnimationFrame(tick); else el.textContent = formatCount(to, decimals);
  };
  requestAnimationFrame(tick);
}

/* Total keranjang berubah halus, bukan loncat */
function tweenMoney(el, to) {
  const from = Number(el.dataset.v ?? to);
  el.dataset.v = to;
  if (prefersReducedMotion() || from === to) { el.textContent = rupiah(to); return; }
  cancelAnimationFrame(el._raf);
  const start = performance.now();
  const tick = now => {
    const p = Math.min((now - start) / 450, 1), eased = 1 - Math.pow(1 - p, 3);
    el.textContent = rupiah(Math.round(from + (to - from) * eased));
    if (p < 1) el._raf = requestAnimationFrame(tick);
  };
  el._raf = requestAnimationFrame(tick);
}

(function setupMicroInteractions() {
  /* Statistik hero: angka diambil dari data asli, dihitung naik saat terlihat */
  const stat = {
    menu: products.length,
    rating: products.reduce((s, p) => s + ratingInfo(p).avg, 0) / products.length,
    promo: products.filter(p => p.discount).length
  };
  const counters = $$(".hero-stats .count");
  counters.forEach(el => { el.dataset.to = stat[el.dataset.stat]; el.textContent = formatCount(Number(el.dataset.to), Number(el.dataset.decimals || 0)); });
  if ("IntersectionObserver" in window && !prefersReducedMotion()) {
    counters.forEach(el => { el.textContent = formatCount(0, Number(el.dataset.decimals || 0)); });
    const io = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target; animateCount(el, Number(el.dataset.to), Number(el.dataset.decimals || 0)); io.unobserve(el);
    }), { threshold: .6 });
    counters.forEach(el => io.observe(el));
  }

  /* Ripple pada tombol (sentuh maupun mouse) */
  document.addEventListener("pointerdown", e => {
    if (prefersReducedMotion()) return;
    const el = e.target.closest(".button, .quick-add, .area-tab, .catalog-arrow, #voucherApply");
    if (!el || el.disabled) return;
    const r = el.getBoundingClientRect(), d = Math.max(r.width, r.height) * 2;
    const dot = document.createElement("span");
    dot.className = "ripple-span";
    dot.style.cssText = `width:${d}px;height:${d}px;left:${e.clientX - r.left - d / 2}px;top:${e.clientY - r.top - d / 2}px`;
    el.appendChild(dot);
    dot.addEventListener("animationend", () => dot.remove());
  }, { passive: true });

  /* Magnetic: hanya untuk mouse, pada tombol utama di hero */
  if (matchMedia("(hover: hover) and (pointer: fine)").matches && !prefersReducedMotion()) {
    $$(".hero-actions .button").forEach(btn => {
      btn.classList.add("magnetic");
      btn.addEventListener("pointermove", e => {
        const r = btn.getBoundingClientRect();
        btn.style.transform = `translate3d(${(e.clientX - r.left - r.width / 2) * .3}px, ${(e.clientY - r.top - r.height / 2) * .3}px, 0)`;
      });
      btn.addEventListener("pointerleave", () => { btn.style.transform = ""; });
    });
  }
})();

/* ===== Responsif adaptif: kondisi layar dibaca otomatis, layout menyesuaikan ===== */
function catalogLayout() {
  const grid = $("#menuGrid");
  const width = grid.clientWidth || grid.parentElement.clientWidth || 320;
  const minCard = width < 800 ? 170 : 250;
  const cols = Math.max(2, Math.min(4, Math.floor((width + 16) / (minCard + 16))));
  return { cols, size: cols * (cols === 2 ? 3 : 2) };
}
/* Jumlah kolom dan kartu per halaman mengikuti lebar area katalog; posisi halaman dijaga saat layar berubah. */
function applyCatalogLayout() {
  const { cols, size } = catalogLayout();
  if (size !== menuPageSize) {
    const firstIndex = (menuPage - 1) * menuPageSize;
    menuPageSize = size;
    menuPage = Math.floor(firstIndex / menuPageSize) + 1;
  }
  menuCols = cols;
  const grid = $("#menuGrid");
  grid.style.setProperty("--cols", cols);
  grid.dataset.cols = cols;
}

(function adaptiveViewport() {
  const root = document.documentElement;
  let baseHeight = window.innerHeight, lastLandscape = innerWidth > innerHeight;
  const breakpoint = w => (w < 480 ? "xs" : w < 768 ? "sm" : w < 1024 ? "md" : w < 1440 ? "lg" : "xl");
  function apply() {
    const w = root.clientWidth, h = window.innerHeight, landscape = w > h;
    if (landscape !== lastLandscape) { lastLandscape = landscape; baseHeight = h; }
    baseHeight = Math.max(baseHeight, h);
    const vv = window.visualViewport, vh = vv ? vv.height : h;
    root.dataset.bp = breakpoint(w);
    root.dataset.orient = landscape ? "landscape" : "portrait";
    root.dataset.short = h <= 520 ? "true" : "false";
    root.dataset.input = matchMedia("(pointer: coarse)").matches ? "touch" : "mouse";
    root.style.setProperty("--vvh", vh + "px");
    /* Keyboard layar terbuka: tinggi tampilan menyusut drastis di perangkat sentuh */
    document.body.classList.toggle("kb-open", matchMedia("(pointer: coarse)").matches && vh < baseHeight * 0.75);
  }
  apply();
  addEventListener("resize", apply);
  addEventListener("orientationchange", () => setTimeout(apply, 250));
  window.visualViewport?.addEventListener("resize", apply);

  /* Katalog dihitung ulang saat lebar areanya berubah (rotasi, resize, buka/tutup panel) */
  if ("ResizeObserver" in window) {
    let frame = 0, lastWidth = 0;
    new ResizeObserver(entries => {
      const width = Math.round(entries[0].contentRect.width);
      if (width === lastWidth) return;
      lastWidth = width;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const { cols, size } = catalogLayout();
        if (cols !== menuCols || size !== menuPageSize) renderMenu();
      });
    }).observe($("#menuGrid"));
  }
})();
