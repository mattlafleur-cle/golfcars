// Renders the 1200 x 630 link preview image to src/assets/og-image.png from the site name and tagline.
// Run after changing siteName or tagline: npm run og-image. Uses the self-hosted fonts, so no network is needed.
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import site from '../site.config.mjs';
import content from '../src/content.mjs';
import { esc, markSvg } from '../src/layout.mjs';
import { launch, loadPlaywright } from './playwright.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const font = async (f) => (await readFile(path.join(root, 'src/assets/fonts', f))).toString('base64');

const copy = content(site);
const rows = copy.disciplines.map((d) => `<li><span class="num">${esc(d.number)}</span><span class="name">${esc(d.name)}</span></li>`).join('');
const html = `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face { font-family: 'Big Shoulders Display'; src: url(data:font/woff2;base64,${await font('big-shoulders-display-latin.woff2')}) format('woff2'); font-weight: 500 900; }
@font-face { font-family: 'Libre Franklin'; src: url(data:font/woff2;base64,${await font('libre-franklin-latin.woff2')}) format('woff2'); font-weight: 400 700; }
html, body { margin: 0; }
body { width: 1200px; height: 630px; overflow: hidden; position: relative; color: #f4efe4; font-family: 'Libre Franklin', sans-serif;
  background: repeating-linear-gradient(100deg, #1e4a35 0 110px, #22523b 110px 220px); }
.text { position: absolute; left: 76px; top: 64px; width: 590px; }
.brand { display: flex; align-items: center; gap: 16px; font: 900 34px 'Big Shoulders Display'; letter-spacing: 0.08em; text-transform: uppercase; margin: 0 0 40px; }
.brand .mark rect { fill: #163a29; }
h1 span { display: block; }
h1 { font: 900 80px/0.92 'Big Shoulders Display'; text-transform: uppercase; letter-spacing: 0.01em; margin: 0 0 28px; }
p.tag { font-size: 24px; line-height: 1.4; color: #c6d3c9; margin: 0; }
.domain { margin: 30px 0 0; font: 800 26px 'Big Shoulders Display'; letter-spacing: 0.16em; text-transform: uppercase; color: #f0b429; }
.board { position: absolute; right: 70px; top: 110px; width: 380px; padding: 20px; border-radius: 12px; background: #163a29; box-shadow: 0 0 0 6px #12301f; }
.board p { margin: 0 0 14px; font: 800 18px 'Big Shoulders Display'; letter-spacing: 0.18em; text-transform: uppercase; }
.board ol { list-style: none; margin: 0; padding: 0; display: grid; gap: 10px; }
.board li { display: grid; grid-template-columns: 70px 1fr; border-radius: 5px; overflow: hidden; }
.num { display: grid; place-items: center; background: #1e4a35; color: #f0b429; font: 900 34px 'Big Shoulders Display'; }
.name { padding: 12px 16px; background: #fbf8f1; color: #1d2420; font: 900 38px/1 'Big Shoulders Display'; letter-spacing: 0.05em; text-transform: uppercase; }
</style></head><body>
<div class="text">
  <p class="brand">${markSvg(52)}<span>${esc(site.siteName)}</span></p>
  <h1><span>Grow the</span> <span>business you’ve</span> <span>already built.</span></h1>
  <p class="tag">Business education and leadership coaching for the golf cart industry</p>
  <p class="domain">${esc(site.domain)}</p>
</div>
<div class="board"><p>The four disciplines</p><ol>${rows}</ol></div>
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
