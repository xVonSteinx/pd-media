/* =========================================================
   PD Media – Konfigurator & Seiten-Interaktionen
   ========================================================= */

const CONFIG = {
  brand: 'PD Media',
  email: 'hallo@deine-domain.de',      // Fallback, falls der Server nicht erreichbar ist
  endpoint: '/api/anfrage',             // POST-Endpunkt (siehe server.py)
  // Vorschau-Modus (online ohne Server): nichts wird übertragen, die Bestätigung sagt das offen
  preview: document.querySelector('meta[name="pd-modus"]')?.content === 'vorschau',
  storageKey: 'pdmedia-konfigurator-v1',
  extraPagePrice: 50,                   // Preis je zusätzlicher Unterseite
  includedPages: 5,
  languagePrice: 190,                   // je zusätzlicher Sprache
  monthlyAfter: 29.99,                  // ab Monat 13, jeder Vertrag
  termMonths: 12,                       // Vertragslaufzeit, 1. Jahr inkl. Hosting & Betreuung
  expressSurcharge: 0.15,
};

/* ---------- Icons (Lucide-Stil) ---------- */
const ICONS = {
  check: 'M20 6 9 17l-5-5',
  arrow: 'M5 12h14M12 5l7 7-7 7',
  zap: 'M13 2 3 14h9l-1 8 10-12h-9l1-8z',
  layout: 'M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zM3 9h18M9 21V9',
  refresh: 'M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8M21 3v5h-5M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16M8 16H3v5',
  bag: 'M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0',
  mail: 'M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM22 6l-10 7L2 6',
  calendar: 'M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z',
  pen: 'M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z',
  image: 'M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zM21 15l-5-5L5 21M8.5 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z',
  list: 'M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01',
  star: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z',
  pin: 'M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0zM12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
  message: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z',
  briefcase: 'M4 7h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2zM16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16',
  send: 'M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z',
  lock: 'M5 11h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2zM7 11V7a5 5 0 0 1 10 0v4',
  download: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3',
  globe: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z',
  eye: 'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
  sparkles: 'M12 3l1.9 5.8L20 10l-6.1 1.9L12 18l-1.9-6.1L4 10l6.1-1.2zM19 3v4M21 5h-4',
  search: 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.35-4.35',
  chart: 'M3 3v18h18M7 16l4-4 4 4 5-6',
  share: 'M18 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM6 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM18 22a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98',
  target: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12zM12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
  server: 'M4 2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM4 14h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2zM6 6h.01M6 18h.01',
  shield: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zM9 12l2 2 4-4',
  code: 'M16 18l6-6-6-6M8 6l-6 6 6 6',
  clock: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 6v6l4 2',
  coffee: 'M17 8h1a4 4 0 1 1 0 8h-1M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4zM6 2v2M10 2v2M14 2v2',
  rocket: 'M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09zM12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2zM9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5',
  alert: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 8v4M12 16h.01',
  info: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 16v-4M12 8h.01',
  copy: 'M9 9h11a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H11a2 2 0 0 1-2-2zM5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1',
};
const icon = (name) => `<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="${ICONS[name] || ICONS.check}"/></svg>`;

/* ---------- Helfer ---------- */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const fmt = (n) => Math.round(n).toLocaleString('de-DE');
const eur = (n) => n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const asArr = (v) => (Array.isArray(v) ? v : v ? [v] : []);
const has = (v, x) => asArr(v).includes(x);
const opt = (o) => (typeof o === 'string' ? { v: o, t: o } : o);
const store = {
  get() { try { return JSON.parse(localStorage.getItem(CONFIG.storageKey)); } catch { return null; } },
  set(v) { try { localStorage.setItem(CONFIG.storageKey, JSON.stringify(v)); } catch { /* privat / blockiert */ } },
  clear() { try { localStorage.removeItem(CONFIG.storageKey); } catch { /* egal */ } },
};

/* =========================================================
   Konfigurator – Schritte & Felder
   ========================================================= */
const isShop = (s) => s.projektart === 'shop';

const STEPS = [
  {
    key: 'projekt', label: 'Projekt',
    title: 'Was dürfen wir für Sie bauen?',
    sub: 'Wählen Sie die Art Ihres Projekts – alles Weitere stellen Sie in den nächsten Schritten ein.',
    fields: [
      { id: 'projektart', type: 'cards', label: 'Art des Projekts', required: true, cols: 2, options: [
        { v: 'landing', t: 'Landingpage', d: 'Ein starker One-Pager – ideal für den Start, eine Aktion oder ein einzelnes Angebot.', icon: 'zap', price: 490, base: true },
        { v: 'website', t: 'Unternehmenswebsite', d: 'Mehrere Unterseiten für Leistungen, Team, Referenzen und Kontakt.', icon: 'layout', price: 690, base: true, badge: 'Beliebt' },
        { v: 'relaunch', t: 'Website-Relaunch', d: 'Ihre bestehende Seite – modern, schnell und neu gedacht. Inhalte übernehmen wir.', icon: 'refresh', price: 590, base: true },
        { v: 'shop', t: 'Onlineshop', d: 'Produkte online verkaufen – mit Warenkorb, Zahlungsarten und Versand.', icon: 'bag', price: 1490, base: true },
      ] },
      { id: 'alte_url', type: 'text', label: 'Adresse Ihrer aktuellen Website', placeholder: 'www.ihre-firma.de', showIf: (s) => s.projektart === 'relaunch' },
      { id: 'branche', type: 'chips', label: 'Ihre Branche', options: ['Handwerk', 'Gastronomie', 'Arztpraxis & Therapie', 'Beauty & Friseur', 'Fitness & Sport', 'Einzelhandel', 'Beratung & Kanzlei', 'Immobilien', 'Hotel & Ferienwohnung', 'Verein & Kultur', 'Andere'] },
      { id: 'ziele', type: 'chips', multi: true, label: 'Was soll die Website vor allem erreichen?', hint: 'Mehrfachauswahl', options: ['Mehr Anfragen', 'Bei Google gefunden werden', 'Online-Termine', 'Produkte verkaufen', 'Mitarbeiter finden', 'Professioneller wirken'] },
    ],
  },
  {
    key: 'umfang', label: 'Funktionen',
    title: 'Umfang & Funktionen',
    sub: 'Klicken Sie an, was Ihre Website können soll – der Preis aktualisiert sich live.',
    fields: [
      { id: 'onepager_info', type: 'info', text: 'Landingpage: Alle Inhalte auf einer Seite mit bis zu 6 Abschnitten – plus Impressum & Datenschutz.', showIf: (s) => s.projektart === 'landing' },
      { id: 'seiten', type: 'range', label: 'Anzahl Unterseiten', min: 1, max: 30, unit: 'Seiten',
        hint: () => `${CONFIG.includedPages} inklusive · jede weitere ${CONFIG.extraPagePrice} €`, showIf: (s) => s.projektart && s.projektart !== 'landing' },
      { id: 'produkte', type: 'chips', label: 'Wie viele Produkte möchten Sie verkaufen?', showIf: isShop, options: [
        { v: 'bis50', t: 'bis 50' }, { v: 'bis200', t: 'bis 200', price: 190 }, { v: 'mehr', t: 'über 200', price: 490 },
      ] },
      { id: 'zahlung', type: 'chips', multi: true, label: 'Gewünschte Zahlungsarten', showIf: isShop, options: ['PayPal', 'Kreditkarte', 'Klarna', 'Apple Pay / Google Pay', 'Rechnung', 'Vorkasse'] },
      { id: 'features', type: 'cards', multi: true, small: true, label: 'Funktionen', hint: 'Mehrfachauswahl', options: [
        { v: 'kontakt', t: 'Kontaktformular', icon: 'mail', price: 0 },
        { v: 'maps', t: 'Anfahrt & Karte (DSGVO)', icon: 'pin', price: 0 },
        { v: 'termin', t: 'Online-Terminbuchung', icon: 'calendar', price: 190 },
        { v: 'galerie', t: 'Galerie / Referenzen', icon: 'image', price: 70 },
        { v: 'blog', t: 'Blog / Aktuelles', icon: 'pen', price: 150 },
        { v: 'preisliste', t: 'Speisekarte / Preisliste', icon: 'list', price: 70 },
        { v: 'bewertungen', t: 'Google-Bewertungen anzeigen', icon: 'star', price: 60 },
        { v: 'whatsapp', t: 'WhatsApp-Button', icon: 'message', price: 30 },
        { v: 'karriere', t: 'Karriere / Jobs', icon: 'briefcase', price: 120 },
        { v: 'newsletter', t: 'Newsletter-Anmeldung', icon: 'send', price: 120 },
        { v: 'login', t: 'Kundenbereich mit Login', icon: 'lock', price: 490 },
        { v: 'downloads', t: 'Downloadbereich', icon: 'download', price: 70 },
        { v: 'barrierefrei', t: 'Barrierefreiheit (BFSG)', icon: 'eye', price: 190 },
        { v: 'mehrsprachig', t: 'Mehrsprachigkeit', icon: 'globe', priceLabel: `${CONFIG.languagePrice} € je Sprache` },
      ] },
      { id: 'sprachen', type: 'chips', multi: true, label: 'Welche zusätzlichen Sprachen?', hint: `je ${CONFIG.languagePrice} €`, showIf: (s) => has(s.features, 'mehrsprachig'),
        options: ['Englisch', 'Polnisch', 'Tschechisch', 'Ukrainisch', 'Russisch', 'Französisch', 'Türkisch', 'Arabisch'] },
    ],
  },
  {
    key: 'design', label: 'Design',
    title: 'Design & Inhalte',
    sub: 'Wie soll Ihre Website wirken – und was bringen Sie schon mit?',
    fields: [
      { id: 'stil', type: 'cards', label: 'Welcher Stil passt zu Ihnen?', cols: 4, options: [
        { v: 'minimal', t: 'Modern & klar', swatch: ['#ffffff', '#111827', '#3b82f6'], font: 'Aa', fontStyle: 'font-weight:700' },
        { v: 'elegant', t: 'Elegant & edel', swatch: ['#f5efe6', '#1c1917', '#b08d57'], font: 'Aa', fontStyle: 'font-family:var(--serif);font-style:italic' },
        { v: 'bold', t: 'Mutig & auffällig', swatch: ['#0b0b0f', '#ff4d6d', '#ffd60a'], font: 'Aa', fontStyle: 'font-weight:900;letter-spacing:-.05em' },
        { v: 'warm', t: 'Warm & persönlich', swatch: ['#fff7ed', '#7c2d12', '#84cc16'], font: 'Aa', fontStyle: 'font-family:var(--serif);font-weight:600' },
      ] },
      { id: 'designlevel', type: 'cards', label: 'Design-Niveau', cols: 2, options: [
        { v: 'individuell', t: 'Individuelles Design', d: 'Maßgeschneidert auf Ihre Marke – klar, modern und schnell.', icon: 'layout', price: 0, priceLabel: 'inklusive' },
        { v: 'premium', t: 'Premium-Design', d: 'Mit Animationen, Scroll-Effekten und Details, die im Kopf bleiben.', icon: 'sparkles', price: 290 },
      ] },
      { id: 'logo', type: 'chips', label: 'Logo', options: [
        { v: 'vorhanden', t: 'Habe ich schon' }, { v: 'auffrischen', t: 'Auffrischen lassen', price: 90 }, { v: 'neu', t: 'Neues Logo gewünscht', price: 190 },
      ] },
      { id: 'texte', type: 'chips', label: 'Texte', options: [
        { v: 'selbst', t: 'Liefere ich selbst' }, { v: 'ueberarbeiten', t: 'Überarbeiten lassen', price: 120 }, { v: 'komplett', t: 'Komplett schreiben lassen', price: 290 },
      ] },
      { id: 'fotos', type: 'chips', label: 'Fotos', options: [
        { v: 'vorhanden', t: 'Habe eigene Fotos' }, { v: 'stock', t: 'Lizenzfreie Bilder', price: 50 }, { v: 'shooting', t: 'Fotoshooting vor Ort', price: 290 },
      ] },
      { id: 'vorbilder', type: 'textarea', label: 'Websites, die Ihnen gefallen', hint: 'optional', placeholder: 'z. B. Links zu Seiten, deren Stil Sie mögen – oder was Sie auf keinen Fall wollen …' },
    ],
  },
  {
    key: 'service', label: 'Sichtbarkeit',
    title: 'Sichtbarkeit & Betreuung',
    sub: 'Eine schöne Website bringt nur etwas, wenn sie gefunden wird – und zuverlässig läuft.',
    fields: [
      { id: 'marketing', type: 'cards', multi: true, small: true, label: 'Damit Kunden Sie finden', hint: 'Mehrfachauswahl', options: [
        { v: 'seo', t: 'SEO-Paket für alle Seiten', icon: 'search', price: 150 },
        { v: 'localseo', t: 'Local SEO für Ihre Region', icon: 'target', price: 150 },
        { v: 'gbp', t: 'Google-Unternehmensprofil', icon: 'pin', price: 80 },
        { v: 'analytics', t: 'Besucher-Statistik (DSGVO)', icon: 'chart', price: 50 },
        { v: 'social', t: 'Social-Media-Anbindung', icon: 'share', price: 40 },
        { v: 'ads', t: 'Google Ads einrichten', icon: 'rocket', price: 150 },
      ] },
      { id: 'vertrag_info', type: 'info', text: `Hosting & Betreuung sind im ersten Jahr inklusive: Hosting, Domain, SSL, tägliche Backups und Sicherheits-Updates. Die Laufzeit beträgt ${CONFIG.termMonths} Monate, danach läuft der Vertrag für ${eur(CONFIG.monthlyAfter)} € im Monat weiter.` },
      { id: 'domain', type: 'chips', label: 'Domain', options: ['Habe bereits eine Domain', 'Brauche eine neue Domain', 'Weiß ich nicht'] },
    ],
  },
  {
    key: 'zeit', label: 'Zeitplan',
    title: 'Zeitplan & Budget',
    sub: 'Damit wir realistisch planen und Ihnen ein passendes Angebot machen können.',
    fields: [
      { id: 'zeitrahmen', type: 'cards', label: 'Wann soll die Website online gehen?', cols: 3, options: [
        { v: 'flexibel', t: 'Flexibel', d: 'Kein Zeitdruck – Qualität zuerst.', icon: 'coffee', price: 0, priceLabel: '–' },
        { v: 'normal', t: 'In 4–6 Wochen', d: 'Der bewährte Standard-Fahrplan.', icon: 'calendar', price: 0, priceLabel: '–' },
        { v: 'express', t: 'Express', d: 'So schnell wie möglich – Ihr Projekt hat Vorrang.', icon: 'zap', priceLabel: `+${CONFIG.expressSurcharge * 100} %` },
      ] },
      { id: 'budget', type: 'chips', label: 'Ihr ungefähres Budget', options: ['bis 1.000 €', '1.000 – 2.500 €', '2.500 – 5.000 €', 'über 5.000 €', 'Noch unsicher'] },
    ],
  },
  {
    key: 'kontakt', label: 'Kontakt',
    title: 'Fast geschafft!',
    sub: 'Wohin darf ich Ihr persönliches Angebot schicken? Ich melde mich innerhalb von 24 Stunden.',
    fields: [
      { type: 'row', fields: [
        { id: 'name', type: 'text', label: 'Ihr Name', required: true, autocomplete: 'name', placeholder: 'Max Mustermann' },
        { id: 'firma', type: 'text', label: 'Unternehmen', autocomplete: 'organization', placeholder: 'Mustermann GmbH' },
      ] },
      { type: 'row', fields: [
        { id: 'email', type: 'email', label: 'E-Mail', required: true, autocomplete: 'email', placeholder: 'max@beispiel.de' },
        { id: 'telefon', type: 'tel', label: 'Telefon', autocomplete: 'tel', placeholder: 'für Rückfragen (optional)' },
      ] },
      { id: 'kontaktweg', type: 'chips', label: 'Bevorzugter Kontaktweg', options: ['E-Mail', 'Telefon', 'WhatsApp'] },
      { id: 'nachricht', type: 'textarea', label: 'Noch etwas, das ich wissen sollte?', hint: 'optional', placeholder: 'Ihre Ideen, Fragen oder Besonderheiten …' },
      { id: 'datenschutz', type: 'consent', required: true,
        text: 'Ich stimme zu, dass meine Angaben zur Bearbeitung meiner Anfrage gespeichert und verarbeitet werden. Mehr dazu in der <a href="https://netpd.de/datenschutz" target="_blank" rel="noopener">Datenschutzerklärung</a>.' },
    ],
  },
];

const DEFAULTS = {
  projektart: '', seiten: 5, features: ['kontakt', 'maps'], sprachen: [], zahlung: [],
  designlevel: 'individuell', marketing: [], zeitrahmen: 'normal',
};

const PRESETS = {
  start: { projektart: 'landing', features: ['kontakt', 'maps'], designlevel: 'individuell' },
  business: { projektart: 'website', seiten: 5, features: ['kontakt', 'maps', 'galerie'], designlevel: 'individuell', marketing: ['seo', 'gbp'] },
  premium: { projektart: 'website', seiten: 10, features: ['kontakt', 'maps', 'galerie', 'termin'], designlevel: 'premium', texte: 'ueberarbeiten', marketing: ['seo', 'localseo', 'gbp'] },
};

/* Alle Felder flach (inkl. Felder in Reihen) */
const allFields = (step) => step.fields.flatMap((f) => (f.type === 'row' ? f.fields : [f]));
const FIELD = Object.fromEntries(STEPS.flatMap(allFields).filter((f) => f.id).map((f) => [f.id, f]));
const findOpt = (fieldId, v) => FIELD[fieldId]?.options?.map(opt).find((o) => o.v === v);
const visible = (f, s) => !f.showIf || !!f.showIf(s);

/* =========================================================
   Preisberechnung
   ========================================================= */
function calc(s) {
  const items = [];
  let once = 0;
  const add = (label, price) => { items.push({ label, price }); once += price; };

  const art = findOpt('projektart', s.projektart);
  if (!art) return { items, once: 0, monthly: 0 };
  add(art.t, art.price);

  if (s.projektart !== 'landing') {
    const extra = Math.max(0, (Number(s.seiten) || CONFIG.includedPages) - CONFIG.includedPages);
    if (extra) add(`${extra} zusätzliche Seite${extra > 1 ? 'n' : ''}`, extra * CONFIG.extraPagePrice);
  }
  if (isShop(s)) {
    const p = findOpt('produkte', s.produkte);
    if (p?.price) add(`Shop: ${p.t} Produkte`, p.price);
  }
  asArr(s.features).forEach((v) => {
    if (v === 'mehrsprachig') {
      const n = Math.max(1, asArr(s.sprachen).length);
      add(`Mehrsprachigkeit (${n} Sprache${n > 1 ? 'n' : ''})`, n * CONFIG.languagePrice);
      return;
    }
    const o = findOpt('features', v);
    if (o) add(o.t, o.price || 0);
  });
  const prefix = { logo: 'Logo: ', texte: 'Texte: ' };
  ['designlevel', 'logo', 'texte', 'fotos'].forEach((id) => {
    const o = findOpt(id, s[id]);
    if (o?.price) add(`${prefix[id] || ''}${o.t}`, o.price);
  });
  asArr(s.marketing).forEach((v) => { const o = findOpt('marketing', v); if (o) add(o.t, o.price); });

  if (s.zeitrahmen === 'express') add(`Express-Zuschlag (${CONFIG.expressSurcharge * 100} %)`, Math.round((once * CONFIG.expressSurcharge) / 10) * 10);

  return { items, once, monthly: CONFIG.monthlyAfter };
}

/* =========================================================
   Rendering der Felder
   ========================================================= */
function priceTag(o) {
  if (o.base) return `<span class="opt__price">ab ${fmt(o.price)} €</span>`;
  if (o.priceLabel) return `<span class="opt__price${o.priceLabel === 'inklusive' ? ' is-free' : ''}">${esc(o.priceLabel)}</span>`;
  if (o.price === 0) return '<span class="opt__price is-free">inklusive</span>';
  if (o.price) return `<span class="opt__price">+ ${fmt(o.price)} €</span>`;
  return '';
}

function renderField(f, s) {
  const hidden = visible(f, s) ? '' : ' hidden';
  const req = f.required ? ' <span class="req" aria-hidden="true">*</span>' : '';
  const hint = f.hint ? ` <span class="field__hint" data-hint="${f.id}">${esc(typeof f.hint === 'function' ? f.hint(s) : f.hint)}</span>` : '';
  const label = f.label ? `<div class="field__label" id="lbl-${f.id}">${esc(f.label)}${req}${hint}</div>` : '';
  const error = `<div class="field__error" role="alert">${icon('alert')} <span></span></div>`;
  const wrap = (cls, inner) => `<div class="field ${cls}" data-field="${f.id}"${hidden}>${inner}</div>`;

  switch (f.type) {
    case 'cards': {
      const multi = !!f.multi;
      const cards = f.options.map(opt).map((o) => {
        const checked = multi ? has(s[f.id], o.v) : s[f.id] === o.v;
        const visual = o.swatch
          ? `<div class="swatch">${o.swatch.map((c) => `<i style="--c:${c}"></i>`).join('')}</div><div class="swatch-font" style="${o.fontStyle}">${o.font}</div>`
          : '';
        return `<label class="opt${multi ? ' opt--multi' : ''}">
          <input type="${multi ? 'checkbox' : 'radio'}" name="${f.id}" value="${o.v}"${checked ? ' checked' : ''}>
          <span class="opt__body">
            ${o.badge ? `<span class="opt__badge">${esc(o.badge)}</span>` : ''}
            <span class="opt__check">${icon('check')}</span>
            ${o.icon ? `<span class="opt__head"><span class="opt__ic">${icon(o.icon)}</span>${f.small ? `<span class="opt__title">${esc(o.t)}</span>` : ''}</span>` : ''}
            ${!o.icon || !f.small ? `<span class="opt__title">${esc(o.t)}</span>` : ''}
            ${visual}
            ${o.d ? `<span class="opt__desc">${esc(o.d)}</span>` : ''}
            ${priceTag(o)}
          </span>
        </label>`;
      }).join('');
      const cls = f.small ? 'opts opts--small' : 'opts';
      return wrap('field--cards', `${label}<div class="${cls}" style="--cols:${f.cols || 3}" role="${multi ? 'group' : 'radiogroup'}" aria-labelledby="lbl-${f.id}">${cards}</div>${error}`);
    }
    case 'chips': {
      const multi = !!f.multi;
      const chips = f.options.map(opt).map((o) => {
        const checked = multi ? has(s[f.id], o.v) : s[f.id] === o.v;
        return `<label class="chip"><input type="${multi ? 'checkbox' : 'radio'}" name="${f.id}" value="${esc(o.v)}"${checked ? ' checked' : ''}><span>${esc(o.t)}${o.price ? ` <small>+${fmt(o.price)} €</small>` : ''}</span></label>`;
      }).join('');
      return wrap('field--chips', `${label}<div class="chips" role="${multi ? 'group' : 'radiogroup'}" aria-labelledby="lbl-${f.id}">${chips}</div>${error}`);
    }
    case 'range': {
      const v = s[f.id] ?? f.min;
      const fill = ((v - f.min) / (f.max - f.min)) * 100;
      return wrap('field--range', `${label}
        <div class="range">
          <input type="range" name="${f.id}" min="${f.min}" max="${f.max}" value="${v}" style="--fill:${fill}%" aria-labelledby="lbl-${f.id}">
          <output class="range__out" data-out="${f.id}">${v}<small>${f.unit}</small></output>
        </div>
        <div class="range__scale"><span>${f.min}</span><span>${Math.round((f.min + f.max) / 2)}</span><span>${f.max}+</span></div>`);
    }
    case 'info':
      return wrap('field--info', `<div class="info">${icon('info')}<span>${esc(f.text)}</span></div>`);
    case 'textarea':
      return wrap('field--text', `${label}<textarea class="input" name="${f.id}" id="in-${f.id}" rows="4" placeholder="${esc(f.placeholder || '')}" aria-labelledby="lbl-${f.id}">${esc(s[f.id] || '')}</textarea>${error}`);
    case 'consent':
      return wrap('field--consent', `<label class="consent"><input type="checkbox" name="${f.id}"${s[f.id] ? ' checked' : ''}><span>${f.text}</span></label>${error}`);
    case 'row':
      return `<div class="row">${f.fields.map((x) => renderField(x, s)).join('')}</div>`;
    default: // text, email, tel
      return wrap('field--text', `${label}<input class="input" type="${f.type}" name="${f.id}" id="in-${f.id}" value="${esc(s[f.id] || '')}" placeholder="${esc(f.placeholder || '')}"${f.autocomplete ? ` autocomplete="${f.autocomplete}"` : ''} aria-labelledby="lbl-${f.id}"${f.required ? ' required aria-required="true"' : ''}>${error}`);
  }
}

/* =========================================================
   Konfigurator-Controller
   ========================================================= */
const Configurator = (() => {
  const form = $('#configForm');
  if (!form) return null;
  const host = $('#stepHost');
  const progress = $('#progress');
  const prevBtn = $('#prevBtn');
  const nextBtn = $('#nextBtn');
  const stepCount = $('#stepCount');
  const doneView = $('#doneView');
  const summary = $('#summary');

  const saved = store.get();
  let state = { ...DEFAULTS, ...(saved?.state || {}) };
  delete state.datenschutz;
  let step = Math.min(saved?.step || 0, STEPS.length - 1);
  let maxStep = Math.max(step, saved?.maxStep || 0);
  let lastOnce = 0;

  const persist = () => {
    const { datenschutz, ...rest } = state;
    store.set({ state: rest, step, maxStep });
  };

  function renderProgress() {
    progress.innerHTML = STEPS.map((st, i) => {
      const cls = i === step ? 'is-active' : i <= maxStep ? 'is-done' : '';
      return `<li class="${cls}"><button type="button" data-goto="${i}" ${i <= maxStep && i !== step ? '' : 'tabindex="-1"'} aria-current="${i === step ? 'step' : 'false'}"><span>${i + 1}. ${st.label}</span></button></li>`;
    }).join('');
  }

  function renderStep(dir = 1) {
    const st = STEPS[step];
    host.innerHTML = `<div class="step${dir < 0 ? ' is-back' : ''}">
      <h3 class="step__title">${esc(st.title)}</h3>
      <p class="step__sub">${esc(st.sub)}</p>
      ${st.fields.map((f) => renderField(f, state)).join('')}
      ${st.key === 'kontakt' ? `<dl class="review" id="review">${reviewHtml()}</dl>` : ''}
    </div>`;
    prevBtn.style.visibility = step === 0 ? 'hidden' : '';
    prevBtn.setAttribute('aria-hidden', step === 0);
    setNextLabel();
    stepCount.textContent = `Schritt ${step + 1} von ${STEPS.length}`;
    renderProgress();
  }

  function setNextLabel() {
    nextBtn.innerHTML = step === STEPS.length - 1 ? `Anfrage absenden ${icon('send')}` : `Weiter ${icon('arrow')}`;
  }

  function readInput(name) {
    const els = $$(`[name="${name}"]`, form);
    if (!els.length) return undefined;
    const el = els[0];
    if (el.type === 'checkbox' && els.length === 1 && FIELD[name]?.type === 'consent') return el.checked;
    if (el.type === 'checkbox') return els.filter((e) => e.checked).map((e) => e.value);
    if (el.type === 'radio') return els.find((e) => e.checked)?.value || '';
    if (el.type === 'range') return Number(el.value);
    return el.value;
  }

  function syncVisibility() {
    allFields(STEPS[step]).forEach((f) => {
      const el = $(`[data-field="${f.id}"]`, host);
      if (!el) return;
      const show = visible(f, state);
      if (show && el.hidden) { el.hidden = false; el.classList.remove('reveal-in'); void el.offsetWidth; el.classList.add('reveal-in'); }
      if (!show) el.hidden = true;
      const hint = $(`[data-hint="${f.id}"]`, el);
      if (hint && typeof f.hint === 'function') hint.textContent = f.hint(state);
    });
  }

  function updateSummary() {
    const { items, once, monthly } = calc(state);
    $('#summaryItems').innerHTML = items.map((it) =>
      `<div class="line${it.price ? '' : ' line--free'}"><span>${esc(it.label)}</span><span>${it.price ? `${fmt(it.price)} €` : 'inklusive'}</span></div>`).join('');
    $('#priceMonthly').textContent = state.projektart ? `inkl. 1. Jahr · danach ${eur(monthly)} € / Monat` : '';
    $('#priceMonthlyMobile').textContent = state.projektart ? `danach ${eur(monthly)} € / Monat` : '';
    animateNumber([$('#priceOnce'), $('#priceOnceMobile')], lastOnce, once);
    lastOnce = once;
    const review = $('#review');
    if (review) review.innerHTML = reviewHtml();
  }

  let raf;
  function animateNumber(els, from, to) {
    cancelAnimationFrame(raf);
    if (from === to) { els.forEach((e) => { e.textContent = fmt(to); }); return; }
    const t0 = performance.now();
    const dur = 550;
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / dur);
      const e = 1 - Math.pow(1 - p, 3);
      els.forEach((el) => { el.textContent = fmt(from + (to - from) * e); });
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const big = $('#priceOnce');
    big.classList.remove('bump'); void big.offsetWidth; big.classList.add('bump');
  }

  /* Lesbare Zusammenfassung aller Angaben */
  function answers() {
    const rows = [];
    STEPS.forEach((st) => allFields(st).forEach((f) => {
      if (!f.label || !visible(f, state) || f.type === 'consent') return;
      let v = state[f.id];
      if (v == null || v === '' || (Array.isArray(v) && !v.length)) return;
      if (f.options) v = asArr(v).map((x) => findOpt(f.id, x)?.t || x).join(', ');
      if (f.type === 'range') v = `${v} ${f.unit}`;
      rows.push({ id: f.id, label: f.label, value: String(v) });
    }));
    return rows;
  }

  function reviewHtml() {
    const contact = allFields(STEPS[STEPS.length - 1]).map((f) => f.id);
    const rows = answers().filter((r) => !contact.includes(r.id));
    if (!rows.length) return '';
    return rows.map((r) => `<div><dt>${esc(r.label)}</dt><dd>${esc(r.value)}</dd></div>`).join('');
  }

  function summaryText() {
    const { items, once, monthly } = calc(state);
    const lines = [`Website-Anfrage über ${CONFIG.brand}`, ''];
    answers().forEach((r) => lines.push(`${r.label}: ${r.value}`));
    lines.push('', 'Geschätzte Investition:');
    items.forEach((it) => lines.push(`  • ${it.label}: ${it.price ? `${fmt(it.price)} €` : 'inklusive'}`));
    lines.push(`  = ca. ${fmt(once)} € einmalig, inkl. 1. Jahr Hosting & Betreuung`);
    lines.push(`  Laufzeit ${CONFIG.termMonths} Monate, danach ${eur(monthly)} € / Monat`);
    return lines.join('\n');
  }

  /* Validierung des aktuellen Schritts */
  function validate() {
    let firstBad = null;
    allFields(STEPS[step]).forEach((f) => {
      const el = $(`[data-field="${f.id}"]`, host);
      if (!el || el.hidden) return;
      let msg = '';
      const v = state[f.id];
      if (f.required && (v == null || v === '' || v === false || (Array.isArray(v) && !v.length))) {
        msg = f.type === 'consent' ? 'Bitte stimmen Sie der Datenverarbeitung zu.'
          : f.type === 'cards' || f.type === 'chips' ? 'Bitte wählen Sie eine Option.'
          : `Bitte geben Sie ${f.label === 'E-Mail' ? 'Ihre E-Mail-Adresse' : 'Ihren Namen'} ein.`;
      } else if (f.type === 'email' && v && !/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(v.trim())) {
        msg = 'Bitte prüfen Sie Ihre E-Mail-Adresse.';
      }
      el.classList.toggle('has-error', !!msg);
      const errText = $('.field__error span', el);
      if (errText) errText.textContent = msg;
      if (msg && !firstBad) firstBad = el;
    });
    if (firstBad) {
      firstBad.scrollIntoView({ behavior: 'smooth', block: 'center' });
      const focusable = $('input:not([type=hidden]), textarea', firstBad);
      focusable?.focus({ preventScroll: true });
      return false;
    }
    return true;
  }

  function scrollToTop() {
    const top = $('#config').getBoundingClientRect().top + window.scrollY - 90;
    if (Math.abs(window.scrollY - top) > 120) window.scrollTo({ top, behavior: 'smooth' });
  }

  function go(to) {
    if (to === step || to < 0 || to >= STEPS.length) return;
    const dir = to > step ? 1 : -1;
    step = to;
    maxStep = Math.max(maxStep, step);
    renderStep(dir);
    persist();
    scrollToTop();
  }

  async function submit() {
    nextBtn.disabled = true;
    nextBtn.innerHTML = 'Wird gesendet …';
    $('.form-error', form)?.remove();
    const { items, once, monthly } = calc(state);
    const payload = {
      angaben: state,
      zusammenfassung: summaryText(),
      schaetzung: { einmalig: once, monatlich: monthly, posten: items },
      seite: location.href,
      website_hp: $('#website_hp').value,
    };
    if (CONFIG.preview) { showDone(); return; }
    try {
      const res = await fetch(CONFIG.endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      showDone();
    } catch (err) {
      console.warn('Anfrage konnte nicht gesendet werden:', err);
      nextBtn.disabled = false;
      setNextLabel();
      const box = document.createElement('div');
      box.className = 'form-error';
      box.innerHTML = `Die Anfrage konnte gerade nicht übertragen werden. Sie können sie stattdessen <a href="${mailtoHref()}">per E-Mail senden</a> – alle Angaben sind bereits eingefügt.`;
      $('#configNav').before(box);
    }
  }

  function mailtoHref() {
    const subject = `Website-Anfrage: ${findOpt('projektart', state.projektart)?.t || 'Projekt'}${state.firma ? ` – ${state.firma}` : ''}`;
    return `mailto:${CONFIG.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(summaryText())}`;
  }

  function showDone() {
    const { once, monthly } = calc(state);
    const first = (state.name || '').trim().split(/\s+/)[0];
    form.hidden = true;
    progress.hidden = true;
    doneView.hidden = false;
    doneView.innerHTML = `
      <div class="done__ic">${icon('check')}</div>
      <h3>Vielen Dank${first ? `, ${esc(first)}` : ''}!</h3>
      ${CONFIG.preview
        ? `<p>So sieht Ihre Zusammenstellung aus. Kopieren Sie die Zusammenfassung für Ihre Anfrage – darauf basiert Ihr persönliches Festpreis-Angebot.</p>
           <span class="done__note">${icon('info')} Vorschau-Version: Das Formular überträgt noch keine Anfragen.</span>`
        : `<p>Ihre Anfrage ist eingegangen. Ich sehe mir alles genau an und melde mich innerhalb von 24 Stunden (werktags) mit Ihrem persönlichen Festpreis-Angebot.</p>`}
      <p><strong>Ihre Schätzung: ca. ${fmt(once)} € einmalig</strong><br>inkl. 1. Jahr Hosting & Betreuung · danach ${eur(monthly)} € / Monat</p>
      <div class="done__actions">
        <button type="button" class="btn btn--ghost" id="copyBtn">${icon('copy')} Zusammenfassung kopieren</button>
        <button type="button" class="btn btn--ghost" id="againBtn">${icon('refresh')} Neue Konfiguration</button>
      </div>
      <dl class="review">${reviewHtml()}</dl>`;
    $('#copyBtn').addEventListener('click', (e) => {
      const btn = e.currentTarget;
      const text = summaryText();
      const fallback = () => {
        // Zwischenablage gesperrt → Text zum manuellen Kopieren anzeigen und markieren
        let ta = $('#copyFallback');
        if (!ta) {
          ta = document.createElement('textarea');
          ta.id = 'copyFallback';
          ta.className = 'input';
          ta.readOnly = true;
          ta.rows = 10;
          ta.style.marginTop = '20px';
          btn.closest('.done__actions').after(ta);
        }
        ta.value = text;
        ta.focus();
        ta.select();
        btn.innerHTML = `${icon('copy')} Text markiert – jetzt kopieren`;
      };
      try {
        navigator.clipboard.writeText(text).then(() => { btn.innerHTML = `${icon('check')} Kopiert!`; }, fallback);
      } catch { fallback(); }
    });
    $('#againBtn').addEventListener('click', reset);
    store.clear();
    scrollToTop();
  }

  function reset() {
    state = { ...DEFAULTS };
    step = 0; maxStep = 0;
    store.clear();
    form.hidden = false; progress.hidden = false; doneView.hidden = true;
    nextBtn.disabled = false;
    renderStep(1);
    updateSummary();
    scrollToTop();
  }

  function applyPreset(name) {
    const p = PRESETS[name];
    if (!p) return;
    state = { ...DEFAULTS, ...state, ...p };
    form.hidden = false; progress.hidden = false; doneView.hidden = true;
    step = 1; maxStep = Math.max(maxStep, 1);
    renderStep(1);
    updateSummary();
    persist();
    $('#konfigurator').scrollIntoView({ behavior: 'smooth' });
  }

  /* ---------- Events ---------- */
  const onChange = (e) => {
    const name = e.target.name;
    if (!name || name === 'website_hp') return;
    state[name] = readInput(name);
    if (e.target.type === 'range') {
      const f = FIELD[name];
      e.target.style.setProperty('--fill', `${((e.target.value - f.min) / (f.max - f.min)) * 100}%`);
      $(`[data-out="${name}"]`).innerHTML = `${e.target.value}<small>${f.unit}</small>`;
    }
    // Mehrsprachigkeit ohne Sprache → Englisch vorauswählen
    if (name === 'features' && has(state.features, 'mehrsprachig') && !asArr(state.sprachen).length) state.sprachen = ['Englisch'];
    if (name === 'features' && !has(state.features, 'mehrsprachig')) state.sprachen = [];
    if (name === 'features') $$('[name="sprachen"]', form).forEach((el) => { el.checked = has(state.sprachen, el.value); });
    if (name === 'sprachen' && !asArr(state.sprachen).length && has(state.features, 'mehrsprachig')) {
      state.features = state.features.filter((x) => x !== 'mehrsprachig');
      $$('[name="features"]', form).forEach((el) => { el.checked = has(state.features, el.value); });
    }
    $(`[data-field="${name}"]`, host)?.classList.remove('has-error');
    syncVisibility();
    updateSummary();
    persist();
  };
  form.addEventListener('change', onChange);
  form.addEventListener('input', (e) => { if (e.target.matches('input[type=range], .input')) onChange(e); });
  form.addEventListener('submit', (e) => e.preventDefault());
  form.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.target.matches('input.input')) { e.preventDefault(); nextBtn.click(); }
  });

  nextBtn.addEventListener('click', () => {
    if (!validate()) return;
    if (step < STEPS.length - 1) go(step + 1);
    else submit();
  });
  prevBtn.addEventListener('click', () => go(step - 1));
  progress.addEventListener('click', (e) => {
    const b = e.target.closest('[data-goto]');
    if (!b) return;
    const to = Number(b.dataset.goto);
    if (to <= maxStep) go(to);
  });
  $('#resetBtn').addEventListener('click', reset);

  // Mobile: Preisleiste + ausklappbare Zusammenfassung
  const pricebar = $('#pricebar');
  const toggle = $('#pricebarToggle');
  toggle.addEventListener('click', () => {
    const open = summary.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', open);
    toggle.textContent = open ? 'Schließen' : 'Details';
    if (open) summary.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
  new IntersectionObserver(([en]) => pricebar.classList.toggle('is-visible', en.isIntersecting), { threshold: 0.05 }).observe($('#config'));

  renderStep(1);
  updateSummary();

  return { applyPreset, calc };
})();

/* =========================================================
   Seiten-Interaktionen
   ========================================================= */

// Paketpreise aus derselben Logik wie der Konfigurator → immer konsistent
$$('[data-price-for]').forEach((el) => {
  const p = PRESETS[el.dataset.priceFor];
  el.textContent = fmt(calc({ ...DEFAULTS, ...p }).once);
});
$$('[data-preset]').forEach((b) => b.addEventListener('click', () => Configurator?.applyPreset(b.dataset.preset)));

// Navigation: Hintergrund beim Scrollen, mobiles Menü
const nav = $('#nav');
const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 20);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();
const burger = $('#burger');
const mobileMenu = $('#mobileMenu');
const setMenu = (open) => {
  burger.setAttribute('aria-expanded', open);
  burger.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
  mobileMenu.classList.toggle('is-open', open);
  nav.classList.toggle('menu-open', open);
};
burger.addEventListener('click', () => setMenu(burger.getAttribute('aria-expanded') !== 'true'));
$$('a', mobileMenu).forEach((a) => a.addEventListener('click', () => setMenu(false)));

// Scroll-Reveal
const io = new IntersectionObserver((entries) => {
  entries.forEach((en) => {
    if (!en.isIntersecting) return;
    const el = en.target;
    const siblings = [...el.parentElement.children].filter((c) => c.classList.contains('reveal'));
    el.style.transitionDelay = `${Math.min(siblings.indexOf(el), 5) * 70}ms`;
    el.classList.add('is-in');
    el.classList.remove('is-pending');
    io.unobserve(el);
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
$$('.reveal').forEach((el) => {
  if (el.getBoundingClientRect().top > window.innerHeight) el.classList.add('is-pending');
  io.observe(el);
});

// Hero-Mockup folgt der Maus (3D-Neigung)
const heroVisual = $('#heroVisual');
const mock = $('#mock');
if (heroVisual && matchMedia('(hover: hover) and (pointer: fine)').matches) {
  heroVisual.addEventListener('pointermove', (e) => {
    const r = heroVisual.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    mock.style.setProperty('--ry', `${x * 16 - 4}deg`);
    mock.style.setProperty('--rx', `${-y * 12 + 2}deg`);
  });
  heroVisual.addEventListener('pointerleave', () => { mock.style.removeProperty('--ry'); mock.style.removeProperty('--rx'); });
}

// Lichteffekt auf den Leistungs-Kacheln
$$('.tile').forEach((t) => t.addEventListener('pointermove', (e) => {
  const r = t.getBoundingClientRect();
  t.style.setProperty('--mx', `${e.clientX - r.left}px`);
  t.style.setProperty('--my', `${e.clientY - r.top}px`);
}));

// Vorher/Nachher-Regler
const compare = $('#compare');
const compareRange = $('#compareRange');
if (compare && compareRange) {
  const setPos = (v) => { compareRange.value = v; compare.style.setProperty('--pos', `${v}%`); };
  let touched = false;
  compareRange.addEventListener('input', () => { touched = true; setPos(compareRange.value); });
  // Einmaliger „Wisch“-Hinweis, sobald der Vergleich sichtbar wird
  new IntersectionObserver(([en], obs) => {
    if (!en.isIntersecting) return;
    obs.disconnect();
    const t0 = performance.now();
    const tick = (t) => {
      if (touched) return;
      const p = Math.min(1, (t - t0) / 1600);
      const e = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
      setPos(Math.round(80 - 45 * e));
      if (p < 1) requestAnimationFrame(tick);
    };
    setTimeout(() => requestAnimationFrame(tick), 400);
  }, { threshold: 0.5 }).observe(compare);
}

$('#year').textContent = new Date().getFullYear();
