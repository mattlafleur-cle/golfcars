// Renders the 1200 x 630 link preview image to src/assets/og-image.png from the site name and tagline.
// Run after changing siteName or tagline: npm run og-image. Uses the self-hosted fonts, so no network is needed.
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import site from '../site.config.mjs';
import { esc, heroArt, markSvg } from '../src/layout.mjs';
import { launch, loadPlaywright } from './playwright.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const font = async (f) => (await readFile(path.join(root, 'src/assets/fonts', f))).toString('base64');

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face { font-family: 'Bricolage Grotesque'; src: url(data:font/woff2;base64,${await font('bricolage-grotesque-latin.woff2')}) format('woff2'); font-weight: 500 700; }
@font-face { font-family: 'Public Sans'; src: url(data:font/woff2;base64,${await font('public-sans-latin.woff2')}) format('woff2'); font-weight: 400 700; }
html, body { margin: 0; }
body { width: 1200px; height: 630px; overflow: hidden; position: relative; color: #f4efe4; font-family: 'Public Sans', sans-serif;
  background: repeating-linear-gradient(100deg, #1e4a35 0 110px, #22523b 110px 220px); }
.text { position: absolute; left: 80px; top: 80px; width: 640px; }
.brand { display: flex; align-items: center; gap: 18px; font: 650 30px 'Bricolage Grotesque'; letter-spacing: -0.01em; margin: 0 0 56px; }
.brand .mark rect { fill: #163a29; }
h1 { font: 650 64px/1.04 'Bricolage Grotesque'; letter-spacing: -0.025em; margin: 0 0 28px; }
p.tag { font-size: 27px; line-height: 1.4; color: #c6d3c9; margin: 0; }
.domain { position: absolute; left: 80px; bottom: 64px; font: 600 22px 'Bricolage Grotesque'; letter-spacing: 0.12em; text-transform: uppercase; color: #f0b429; }
.art { position: absolute; right: 64px; top: 75px; width: 400px; }
.art svg { width: 100%; height: auto; display: block; border-radius: 18px; box-shadow: 0 0 0 2px rgba(198, 211, 201, 0.35), 0 24px 48px -24px rgba(0, 0, 0, 0.5); }
</style></head><body>
<div class="text">
  <p class="brand">${markSvg(56)}<span>${esc(site.siteName)}</span></p>
  <h1>Stronger leaders and healthier numbers for golf car businesses.</h1>
  <p class="tag">${esc(site.tagline.replace(/\.$/, ''))}</p>
</div>
<p class="domain">${esc(site.domain)}</p>
<div class="art">${heroArt()}</div>
</body></html>`;

const playwright = loadPlaywright();
const browser = await launch(playwright);
const page = await browser.newPage({ viewport: { width: site.ogImage.width, height: site.ogImage.height } });
await page.setContent(html, { waitUntil: 'load' });
await page.evaluate(() => document.fonts.ready);
const out = path.join(root, 'src/assets', site.ogImage.src);
await page.screenshot({ path: out });
await browser.close();
console.log(`Wrote ${path.relative(root, out)}`);
