// Automated checks for the built site in dist/. Run with `npm run check` (builds first).
// Exits with an error, and blocks deployment, if any check fails.
import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import site from '../site.config.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const failures = [];
const fail = (check, msg) => failures.push(`[${check}] ${msg}`);
const counts = {};
const ran = (check) => (counts[check] = (counts[check] || 0) + 1);

async function walk(dir, { skip = [] } = {}) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (skip.includes(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full, { skip })));
    else out.push(full);
  }
  return out;
}
const rel = (file) => path.relative(root, file);
const decode = (s) => s.replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
const visibleText = (html) =>
  decode(html.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ');
const attr = (tag, name) => {
  const m = tag.match(new RegExp(`\\s${name}="([^"]*)"`));
  return m ? decode(m[1]) : null;
};

const distFiles = await walk(dist);
const htmlFiles = distFiles.filter((f) => f.endsWith('.html'));
const pages = new Map();
for (const f of htmlFiles) pages.set(f, await readFile(f, 'utf8'));
const urlFor = (file) => {
  const r = path.relative(dist, file).split(path.sep).join('/');
  return r === 'index.html' ? '/' : r === '404.html' ? '/404.html' : `/${r.replace(/index\.html$/, '')}`;
};
const idsIn = (html) => new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));

// 1. Internal links and anchors ------------------------------------------------------------
async function resolveInternal(href, fromFile) {
  const [pathPart, hash] = href.split('#');
  const clean = pathPart.split('?')[0];
  let target;
  if (clean === '') target = fromFile;
  else {
    const abs = clean.startsWith('/') ? path.join(dist, clean) : path.join(path.dirname(fromFile), clean);
    target = abs;
    try {
      if ((await stat(abs)).isDirectory()) target = path.join(abs, 'index.html');
    } catch {
      return { error: `missing target ${clean}` };
    }
  }
  try {
    await stat(target);
  } catch {
    return { error: `missing target ${clean}` };
  }
  if (hash && target.endsWith('.html')) {
    const html = pages.get(target) ?? (await readFile(target, 'utf8'));
    if (!idsIn(html).has(hash)) return { error: `missing anchor #${hash} in ${urlFor(target)}` };
  }
  return {};
}

for (const [file, html] of pages) {
  for (const m of html.matchAll(/\s(href|src)="([^"]+)"/g)) {
    const href = decode(m[2]);
    if (/^(https?:)?\/\//.test(href)) {
      if (href.startsWith('http://')) fail('links', `${urlFor(file)}: insecure link ${href}`);
      continue;
    }
    if (href.startsWith('mailto:')) {
      if (!/^mailto:[^@\s]+@[^@\s]+\.[a-z]{2,}(\?.*)?$/i.test(href)) fail('links', `${urlFor(file)}: malformed ${href}`);
      continue;
    }
    if (href.startsWith('data:')) continue;
    ran('links');
    const { error } = await resolveInternal(href, file);
    if (error) fail('links', `${urlFor(file)}: ${href}: ${error}`);
  }
}

// 2. Headings: one h1, no skipped levels -----------------------------------------------------
for (const [file, html] of pages) {
  ran('headings');
  const levels = [...html.matchAll(/<h([1-6])[\s>]/g)].map((m) => Number(m[1]));
  const h1s = levels.filter((l) => l === 1).length;
  if (h1s !== 1) fail('headings', `${urlFor(file)}: ${h1s} h1 elements, expected 1`);
  if (levels[0] !== 1) fail('headings', `${urlFor(file)}: first heading is h${levels[0]}, expected h1`);
  for (let i = 1; i < levels.length; i++) {
    if (levels[i] > levels[i - 1] + 1) fail('headings', `${urlFor(file)}: h${levels[i - 1]} is followed by h${levels[i]}`);
  }
}

// 3. Titles and descriptions --------------------------------------------------------------
const seen = { title: new Map(), description: new Map() };
for (const [file, html] of pages) {
  ran('meta');
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1];
  const description = html.match(/<meta name="description" content="([^"]*)"/)?.[1];
  if (!title) fail('meta', `${urlFor(file)}: missing title`);
  if (!description) fail('meta', `${urlFor(file)}: missing meta description`);
  if (description && (description.length < 70 || description.length > 170)) fail('meta', `${urlFor(file)}: description is ${description.length} characters; keep it between 70 and 170`);
  for (const [kind, value] of [['title', title], ['description', description]]) {
    if (!value) continue;
    if (seen[kind].has(value)) fail('meta', `${urlFor(file)}: ${kind} duplicates ${seen[kind].get(value)}`);
    seen[kind].set(value, urlFor(file));
  }
  for (const prop of ['og:title', 'og:description', 'og:image']) {
    if (!html.includes(`property="${prop}"`)) fail('meta', `${urlFor(file)}: missing ${prop}`);
  }
  const noindex = html.includes('<meta name="robots" content="noindex">');
  const shouldNoindex = !site.allowIndexing || file.endsWith('404.html');
  if (noindex !== shouldNoindex) fail('meta', `${urlFor(file)}: noindex is ${noindex}, expected ${shouldNoindex} (allowIndexing is ${site.allowIndexing})`);
}

// 4. Images: alt text and dimensions that match the file -------------------------------------
function imageSize(buf) {
  if (buf.slice(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  if (buf[0] === 0xff && buf[1] === 0xd8) {
    let i = 2;
    while (i < buf.length) {
      if (buf[i] !== 0xff) { i++; continue; }
      const marker = buf[i + 1];
      const len = buf.readUInt16BE(i + 2);
      if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) return { width: buf.readUInt16BE(i + 7), height: buf.readUInt16BE(i + 5) };
      i += 2 + len;
    }
  }
  return null;
}
for (const [file, html] of pages) {
  for (const [tag] of html.matchAll(/<img\b[^>]*>/g)) {
    ran('images');
    const src = attr(tag, 'src');
    const alt = attr(tag, 'alt');
    const width = Number(attr(tag, 'width'));
    const height = Number(attr(tag, 'height'));
    if (!alt || alt.trim().length < 5) fail('images', `${urlFor(file)}: ${src} needs descriptive alt text`);
    if (!width || !height) fail('images', `${urlFor(file)}: ${src} needs width and height`);
    try {
      const size = imageSize(await readFile(path.join(dist, src)));
      if (size && (size.width !== width || size.height !== height)) fail('images', `${urlFor(file)}: ${src} is ${size.width}x${size.height} but declared ${width}x${height}`);
    } catch {
      fail('images', `${urlFor(file)}: ${src} not found`);
    }
  }
}
{
  ran('images');
  const og = imageSize(await readFile(path.join(dist, 'assets', site.ogImage.src)));
  if (!og || og.width !== 1200 || og.height !== 630) fail('images', `link preview image must be 1200x630, found ${og?.width}x${og?.height}`);
}

// 5. Primary action and footer disclosure on every page --------------------------------------
for (const [file, html] of pages) {
  ran('primary action');
  const main = html.split('<main')[1]?.split('</main>')[0] || '';
  const re = new RegExp(`<a [^>]*href="${site.booking.url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[^>]*>${site.booking.label}</a>`);
  if (!re.test(html)) fail('primary action', `${urlFor(file)}: no "${site.booking.label}" link to the booking page`);
  if (!re.test(main)) fail('primary action', `${urlFor(file)}: the primary action is not in the main content`);
  ran('disclosure');
  const footer = html.split('<footer')[1] || '';
  if (!footer.includes(site.footerDisclosure)) fail('disclosure', `${urlFor(file)}: footer disclosure missing or changed`);
}

// 6. Language: banned words, manufacturer names, prices, forms, tracking ---------------------
const banned = [
  'guru', 'synergy', 'unlock', 'game-changing', 'game changer', 'revolutionize', 'world-class', 'cutting-edge', 'best-in-class',
  'guarantee', 'guaranteed', 'skyrocket', '10x', 'secret sauce', 'growth hack', 'ninja', 'rockstar', 'disrupt', 'leverage',
  'leveraging', 'seamless', 'robust', 'holistic', 'transformative', 'delve', 'crucial', 'navigate the complexities',
  'rapidly evolving', 'coming soon', 'proven system', 'testimonial', 'award-winning', 'certified', 'industry-leading', 'next level',
];
const brands = [/\bClub\s*Car\b/i, /\bE-?Z-?GO\b/i, /\bYamaha\b/i, /\bICON\b/, /\bEvolution\b/, /\bGaria\b/i, /\bPolaris\b/i, /\bGEM\b/, /\bKandi\b/i,
  /\bAdvanced\s+EV\b/i, /\bStar\s+EV\b/i, /\bBintelli\b/i, /\bTomberlin\b/i, /\bDenago\b/i, /\bCushman\b/i, /\bTextron\b/i, /\bMadjax\b/i];
const textFiles = distFiles.filter((f) => /\.(html|txt|xml)$/.test(f));
for (const file of textFiles) {
  ran('language');
  const raw = await readFile(file, 'utf8');
  const text = file.endsWith('.html') ? visibleText(raw) : raw;
  const lower = text.toLowerCase();
  for (const word of banned) {
    if (new RegExp(`(^|[^a-z])${word.replace(/[-]/g, '[- ]?')}([^a-z]|$)`).test(lower)) fail('language', `${rel(file)}: banned phrase "${word}"`);
  }
  for (const re of brands) if (re.test(text)) fail('language', `${rel(file)}: manufacturer or brand name matching ${re}`);
  if (!site.pricesApproved && /\$\s?\d/.test(text)) fail('language', `${rel(file)}: a dollar amount appears but prices are not approved`);
  if (file.endsWith('.html')) {
    if (/<form\b/i.test(raw)) fail('language', `${rel(file)}: contains a form; no form ships until a provider is connected and tested`);
    for (const m of raw.matchAll(/<script[^>]*\ssrc="([^"]+)"/g)) if (/^(https?:)?\/\//.test(m[1])) fail('language', `${rel(file)}: third-party script ${m[1]}`);
    for (const m of raw.matchAll(/<link[^>]*\shref="(https?:\/\/[^"]+)"/g)) if (!m[0].includes('rel="canonical"')) fail('language', `${rel(file)}: third-party resource ${m[1]}`);
  }
}

// 7. Dashes: no em dashes or en dashes anywhere in the site or the repository ---------------
const repoFiles = (await walk(root, { skip: ['.git', 'node_modules', 'screenshots'] })).filter((f) => /\.(html|txt|xml|md|mjs|js|css|json|yml|yaml|svg)$/.test(f) || path.basename(f) === 'CNAME');
const dashChars = new RegExp('[\\u2013\\u2014]|&(m|n)dash;|&#82(11|12);|&#x201[34];', 'i');
for (const file of repoFiles) {
  ran('dashes');
  const raw = await readFile(file, 'utf8');
  raw.split('\n').forEach((line, i) => {
    if (dashChars.test(line)) fail('dashes', `${rel(file)}:${i + 1}: em dash or en dash`);
  });
}

// 8. Excluded firm name: only the one temporary email address may contain it ---------------
// The patterns are split so this file does not match itself.
const allowedAddress = 'matt@' + 'forest' + 'city.pro';
const excluded = new RegExp('fores' + 't[\\s_.-]*ci' + 'ty', 'i');
for (const file of repoFiles) {
  ran('excluded name');
  const raw = (await readFile(file, 'utf8')).split(allowedAddress).join('');
  raw.split('\n').forEach((line, i) => {
    if (excluded.test(line)) fail('excluded name', `${rel(file)}:${i + 1}: the excluded firm name appears outside the allowed temporary address`);
  });
}

// 9. Contrast of key color pairs (WCAG 2.2 AA) ---------------------------------------------
const css = await readFile(path.join(root, 'src/assets/site.css'), 'utf8');
const tokens = Object.fromEntries([...css.split(':root {')[1].split('}')[0].matchAll(/--([\w-]+):\s*(#[0-9a-f]{6})/gi)].map((m) => [m[1], m[2]]));
const lum = (hex) => {
  const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
const ratio = (a, b) => {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
};
// [foreground, background, minimum, what it is]. 4.5 for text, 3 for large text, focus rings, and UI parts.
const pairs = [
  ['ink', 'sand', 4.5, 'body text'],
  ['ink-muted', 'sand', 4.5, 'secondary text'],
  ['ink-muted', 'sand-deep', 4.5, 'secondary text on soft bands, planned badge'],
  ['ink-muted', 'card', 4.5, 'card text'],
  ['fairway', 'sand', 4.5, 'links'],
  ['fairway', 'card', 4.5, 'links in cards'],
  ['fairway', 'sand-deep', 4.5, 'links on soft bands'],
  ['flag-ink', 'sand', 4.5, 'eyebrows and link hover'],
  ['flag-ink', 'sand-deep', 4.5, 'eyebrows on soft bands'],
  ['flag-ink', 'card', 4.5, 'roles in cards'],
  ['fairway-deep', 'flag', 4.5, 'primary button'],
  ['fairway-deep', 'flag-deep', 4.5, 'primary button hover'],
  ['on-dark', 'fairway', 4.5, 'text on dark bands'],
  ['on-dark', 'fairway-stripe', 4.5, 'text on dark band stripes'],
  ['on-dark-muted', 'fairway', 4.5, 'secondary text on dark bands'],
  ['on-dark-muted', 'fairway-stripe', 4.5, 'secondary text on dark band stripes'],
  ['flag', 'fairway', 4.5, 'eyebrows on dark bands'],
  ['flag', 'fairway-stripe', 4.5, 'eyebrows on dark band stripes'],
  ['on-dark', 'fairway-deep', 4.5, 'footer links'],
  ['on-dark-muted', 'fairway-deep', 4.5, 'footer text'],
  ['flag', 'fairway-deep', 4.5, 'footer labels'],
  ['on-dark', 'fairway-soft', 4.5, 'reserve: text on soft green'],
  ['fairway-deep', 'sand', 3, 'focus ring on light backgrounds'],
  ['flag', 'fairway', 3, 'focus ring on dark backgrounds'],
  ['fairway', 'sand', 3, 'secondary button border'],
];
for (const [fg, bg, min, what] of pairs) {
  ran('contrast');
  if (!tokens[fg] || !tokens[bg]) { fail('contrast', `missing color token --${fg} or --${bg}`); continue; }
  const r = ratio(tokens[fg], tokens[bg]);
  if (r < min) fail('contrast', `--${fg} on --${bg} (${what}) is ${r.toFixed(2)}:1, needs ${min}:1`);
}

// 10. Structured data -----------------------------------------------------------------------
const required = { Organization: ['name', 'url'], Person: ['name'], Service: ['name', 'provider'], WebSite: ['name', 'url'], WebPage: ['url', 'name'], Article: ['headline', 'author', 'url'] };
for (const [file, html] of pages) {
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  if (file.endsWith('404.html')) continue;
  ran('structured data');
  if (blocks.length !== 1) { fail('structured data', `${urlFor(file)}: expected one JSON-LD block, found ${blocks.length}`); continue; }
  let data;
  try {
    data = JSON.parse(blocks[0][1]);
  } catch (e) {
    fail('structured data', `${urlFor(file)}: invalid JSON (${e.message})`);
    continue;
  }
  if (data['@context'] !== 'https://schema.org') fail('structured data', `${urlFor(file)}: @context must be https://schema.org`);
  const graph = data['@graph'] || [];
  const ids = new Set(graph.map((n) => n['@id']).filter(Boolean));
  const json = JSON.stringify(data);
  for (const node of graph) {
    const need = required[node['@type']];
    if (!need) { fail('structured data', `${urlFor(file)}: unexpected type ${node['@type']}`); continue; }
    for (const key of need) if (!node[key]) fail('structured data', `${urlFor(file)}: ${node['@type']} is missing ${key}`);
  }
  for (const m of json.matchAll(/\{"@id":"([^"]+)"\}/g)) if (!ids.has(m[1])) fail('structured data', `${urlFor(file)}: reference ${m[1]} does not resolve`);
  for (const m of json.matchAll(/"(?:url|image|logo)":"([^"]+)"/g)) if (!m[1].startsWith('https://')) fail('structured data', `${urlFor(file)}: non-absolute URL ${m[1]}`);
  if (!site.location.streetAddress && /"address"/.test(json)) fail('structured data', `${urlFor(file)}: address present but none is approved`);
  if (!site.location.phone && /"telephone"/.test(json)) fail('structured data', `${urlFor(file)}: telephone present but none is approved`);
  if (!site.pricesApproved && /"(offers|price|priceRange)"/.test(json)) fail('structured data', `${urlFor(file)}: price data present but prices are not approved`);
}

// 11. Sitemap, robots, CNAME ------------------------------------------------------------------
{
  ran('sitemap');
  const base = site.canonicalUrl.replace(/\/$/, '');
  const sitemap = await readFile(path.join(dist, 'sitemap.xml'), 'utf8');
  const listed = new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]));
  const expected = new Set(htmlFiles.filter((f) => !f.endsWith('404.html')).map((f) => base + urlFor(f)));
  for (const url of expected) if (!listed.has(url)) fail('sitemap', `missing ${url}`);
  for (const url of listed) if (!expected.has(url)) fail('sitemap', `lists ${url}, which is not a built page`);
  const robots = await readFile(path.join(dist, 'robots.txt'), 'utf8');
  if (!robots.includes(`Sitemap: ${base}/sitemap.xml`)) fail('sitemap', 'robots.txt does not point to the sitemap');
  const cname = (await readFile(path.join(dist, 'CNAME'), 'utf8')).trim();
  if (cname !== site.domain) fail('sitemap', `CNAME is "${cname}", expected ${site.domain}`);
  const llms = await readFile(path.join(dist, 'llms.txt'), 'utf8').catch(() => '');
  if (!llms.startsWith(`# ${site.siteName}`)) fail('sitemap', 'llms.txt missing or malformed');
}

// Report ------------------------------------------------------------------------------------
const summary = Object.entries(counts).map(([k, v]) => `${k} (${v})`).join(', ');
if (failures.length) {
  console.error(`Checks failed (${failures.length}):\n- ${failures.join('\n- ')}`);
  process.exit(1);
}
console.log(`All checks passed across ${pages.size} pages: ${summary}.`);
