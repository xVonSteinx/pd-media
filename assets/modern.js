/* PD Media – kleine Interaktionen für den modernen Design-Layer */
(() => {
  // Header bekommt beim Scrollen mehr Kontrast
  const header = document.querySelector('header');
  if (header) {
    const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Aktuelle Seite in der Navigation markieren
  const path = location.pathname.replace(/\.html$/, '').replace(/\/$/, '') || '/';
  document.querySelectorAll('nav a[href]').forEach((a) => {
    const href = a.getAttribute('href').replace(/\.html$/, '').replace(/\/$/, '');
    const target = href === '' || href === '#' ? '/' : href;
    if (target === path) a.setAttribute('aria-current', 'page');
  });

  // Inhalte beim Scrollen weich einblenden
  const auto = document.querySelectorAll(
    '.section-header, .creator-card, .creator-tile, .stat-card, .audience-card, .cta-band, .form-wrap, .video-card, .tiktok-embed-wrap'
  );
  auto.forEach((el) => el.classList.add('reveal'));
  let pending = [...document.querySelectorAll('.reveal')];
  pending.forEach((el) => {
    // Geschwister nacheinander erscheinen lassen
    const sibs = el.parentElement ? [...el.parentElement.children].filter((c) => c.classList.contains('reveal')) : [];
    const idx = sibs.indexOf(el);
    if (idx > 0) el.style.setProperty('--reveal-delay', Math.min(idx, 4) * 80 + 'ms');
  });
  // Alles, was im Bild ist ODER schon darüber liegt, einblenden – so bleibt auch
  // beim Springen per Anker oder schnellem Scrollen nichts unsichtbar.
  let ticking = false;
  const sweep = () => {
    ticking = false;
    const limit = window.innerHeight * 0.92;
    pending = pending.filter((el) => {
      if (el.getBoundingClientRect().top < limit) { el.classList.add('in'); return false; }
      return true;
    });
    if (!pending.length) {
      window.removeEventListener('scroll', onScrollReveal);
      window.removeEventListener('resize', onScrollReveal);
    }
  };
  const onScrollReveal = () => { if (!ticking) { ticking = true; requestAnimationFrame(sweep); } };
  window.addEventListener('scroll', onScrollReveal, { passive: true });
  window.addEventListener('resize', onScrollReveal);
  sweep();
})();
