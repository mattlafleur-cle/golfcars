// Page shell and shared components. No copy lives here beyond structural labels (menu, skip link).

export function esc(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export const isExternal = (href) => /^https?:\/\//.test(href);

export function absoluteUrl(site, path) {
  return site.canonicalUrl.replace(/\/$/, '') + path;
}

// Brand mark: a dashed line of play from tee to pin, echoing the Maple Creek Advisors mark.
export function markSvg(size = 32) {
  return `<svg class="mark" width="${size}" height="${size}" viewBox="0 0 32 32" aria-hidden="true" focusable="false"><rect width="32" height="32" rx="7" fill="#1e4a35"/><path d="M7 24 C 9 14, 17 20, 22 10" fill="none" stroke="#f4efe4" stroke-width="2.4" stroke-linecap="round" stroke-dasharray="0.1 4.4"/><circle cx="7" cy="24" r="2.2" fill="#f4efe4"/><circle cx="23" cy="9" r="3.6" fill="#f0b429"/></svg>`;
}

export function statusBadge(site, offering) {
  if (!offering) return '';
  const live = offering.live === true;
  const label = live ? site.statusLabels.live : site.statusLabels.planned;
  return `<span class="status ${live ? 'status-live' : 'status-planned'}">${esc(label)}</span>`;
}

export function bookingButton(site, variant = 'primary') {
  return `<a class="button button-${variant}" href="${esc(site.booking.url)}" data-primary-action>${esc(site.booking.label)}</a>`;
}

export function linkTag(href, label, cls = '') {
  const external = isExternal(href);
  return `<a${cls ? ` class="${cls}"` : ''} href="${esc(href)}">${esc(label)}${external ? '<span class="visually-hidden"> (opens another site)</span>' : ''}</a>`;
}

function header(site, copy, currentPath) {
  const items = copy.nav
    .map((n) => {
      const current = currentPath === n.href || (n.href !== '/' && currentPath.startsWith(n.href));
      return `<li><a href="${esc(n.href)}"${current ? ' aria-current="page"' : ''}>${esc(n.label)}</a></li>`;
    })
    .join('');
  return `<a class="skip-link" href="#main">Skip to main content</a>
<header class="site-header">
  <div class="wrap header-inner">
    <a class="wordmark" href="/">${markSvg(34)}<span>${esc(site.siteName)}</span></a>
    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-nav"><span class="menu-icon" aria-hidden="true"></span><span class="menu-label">Menu</span></button>
    <nav id="site-nav" class="site-nav" aria-label="Main">
      <ul>${items}</ul>
      ${bookingButton(site, 'primary')}
    </nav>
  </div>
</header>`;
}

function footer(site, copy) {
  const year = new Date().getFullYear();
  const owner = site.legalName || site.siteName;
  const pages = copy.nav.map((n) => `<li><a href="${esc(n.href)}">${esc(n.label)}</a></li>`).join('');
  const related = [site.links.advisors, site.links.build]
    .map((l) => `<li>${linkTag(l.url, l.name)}</li>`)
    .join('');
  return `<footer class="site-footer">
  <div class="wrap footer-grid">
    <div class="footer-brand">
      <a class="wordmark wordmark-light" href="/">${markSvg(30)}<span>${esc(site.siteName)}</span></a>
      <p>${esc(copy.footerBlurb)}</p>
    </div>
    <nav class="footer-col" aria-label="Footer">
      <p class="footer-label">Pages</p>
      <ul>${pages}</ul>
    </nav>
    <div class="footer-col">
      <p class="footer-label">Related</p>
      <ul>${related}</ul>
    </div>
  </div>
  <div class="wrap footer-legal">
    <p class="disclosure">${esc(site.footerDisclosure)}</p>
    <p>&copy; ${year} ${esc(owner)}. ${esc(site.location.region)}.</p>
  </div>
</footer>`;
}

export function pageShell({ site, copy, page, body, jsonLd, assets }) {
  const isHome = page.path === '/';
  const canonical = page.notFound ? null : absoluteUrl(site, page.path);
  const noindex = page.notFound || !site.allowIndexing;
  const ogImage = absoluteUrl(site, `/assets/${site.ogImage.src}`);
  const head = [
    '<meta charset="utf-8">',
    '<meta name="viewport" content="width=device-width, initial-scale=1">',
    `<title>${esc(page.title)}</title>`,
    `<meta name="description" content="${esc(page.description)}">`,
    noindex ? '<meta name="robots" content="noindex">' : '',
    canonical ? `<link rel="canonical" href="${esc(canonical)}">` : '',
    '<meta name="theme-color" content="#1e4a35">',
    `<meta property="og:type" content="website">`,
    `<meta property="og:site_name" content="${esc(site.siteName)}">`,
    `<meta property="og:title" content="${esc(isHome ? site.siteName : page.title)}">`,
    `<meta property="og:description" content="${esc(page.description)}">`,
    canonical ? `<meta property="og:url" content="${esc(canonical)}">` : '',
    `<meta property="og:image" content="${esc(ogImage)}">`,
    `<meta property="og:image:width" content="${site.ogImage.width}">`,
    `<meta property="og:image:height" content="${site.ogImage.height}">`,
    `<meta property="og:image:alt" content="${esc(site.ogImage.alt)}">`,
    '<meta name="twitter:card" content="summary_large_image">',
    `<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">`,
    `<link rel="preload" href="/assets/fonts/big-shoulders-display-latin.woff2" as="font" type="font/woff2" crossorigin>`,
    `<link rel="preload" href="/assets/fonts/libre-franklin-latin.woff2" as="font" type="font/woff2" crossorigin>`,
    `<link rel="stylesheet" href="/assets/site.css?v=${assets.css}">`,
    jsonLd ? `<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>` : '',
    `<script src="/assets/site.js?v=${assets.js}" defer></script>`,
  ]
    .filter(Boolean)
    .join('\n');

  return `<!doctype html>
<html lang="en" class="no-js">
<head>
<script>document.documentElement.className = 'js';</script>
${head}
</head>
<body>
${header(site, copy, page.path)}
<main id="main" tabindex="-1">
${body}
</main>
${footer(site, copy)}
</body>
</html>
`;
}
