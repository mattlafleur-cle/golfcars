// Browser test. Renders every page at desktop and phone widths with Playwright, saves full-page
// screenshots to screenshots/, and fails on console errors, failed requests, horizontal scrolling,
// a broken mobile menu, or a broken skip link. Run with: npm run screenshots
import { spawn } from 'node:child_process';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import site from '../site.config.mjs';
import content from '../src/content.mjs';
import { launch, loadPlaywright } from './playwright.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const copy = content(site);
const port = 4179;
const origin = `http://localhost:${port}`;
const pages = [...copy.pages.filter((p) => !p.notFound).map((p) => p.path), '/does-not-exist/'];
const viewports = [
  { name: 'desktop', width: 1366, height: 900 },
  { name: 'phone', width: 390, height: 844 },
];
const problems = [];
const fail = (msg) => problems.push(msg);

const server = spawn(process.execPath, [path.join(root, 'scripts/serve.mjs'), String(port)], { stdio: ['ignore', 'pipe', 'inherit'] });
await new Promise((resolve) => server.stdout.once('data', resolve));
await mkdir(path.join(root, 'screenshots'), { recursive: true });

const playwright = loadPlaywright();
const browser = await launch(playwright);
const active = (page) => page.evaluate(() => {
  const el = document.activeElement;
  return { id: el?.id || '', cls: String(el?.className || ''), text: (el?.textContent || '').trim(), href: el?.getAttribute?.('href') || '' };
});

try {
  for (const vp of viewports) {
    const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
    const page = await context.newPage();
    page.on('console', (m) => {
      if (m.type() !== 'error') return;
      // The intentional 404 page logs its own 404 response; that is expected.
      if (page.url().includes('does-not-exist') && /404/.test(m.text())) return;
      fail(`${vp.name} ${page.url()}: console error: ${m.text()}`);
    });
    page.on('pageerror', (e) => fail(`${vp.name} ${page.url()}: script error: ${e.message}`));
    page.on('requestfailed', (r) => fail(`${vp.name}: failed request ${r.url()}`));
    page.on('request', (r) => {
      if (!r.url().startsWith(origin) && !r.url().startsWith('data:')) fail(`${vp.name}: third-party request to ${r.url()}`);
    });

    for (const p of pages) {
      await page.goto(origin + p, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      // Scroll through the page so lazy-loaded images load before checking them.
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += window.innerHeight) { window.scrollTo({ top: y, behavior: 'instant' }); await new Promise((r) => setTimeout(r, 60)); }
        await Promise.all([...document.images].map((i) => (i.complete ? null : new Promise((r) => { i.onload = i.onerror = r; }))));
        window.scrollTo({ top: 0, behavior: 'instant' });
      });
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      if (overflow > 0) fail(`${vp.name} ${p}: horizontal scrolling of ${overflow}px`);
      const broken = await page.evaluate(() => [...document.images].filter((i) => !i.complete || i.naturalWidth === 0).map((i) => i.src));
      if (broken.length) fail(`${vp.name} ${p}: images did not load: ${broken.join(', ')}`);
      const slug = p === '/' ? 'home' : p.replace(/\//g, '');
      await page.screenshot({ path: path.join(root, 'screenshots', `${slug}-${vp.name}.png`), fullPage: true });
    }

    // Skip link: first Tab reaches it, Enter moves focus to main content.
    await page.goto(`${origin}/coaching/`, { waitUntil: 'networkidle' });
    await page.keyboard.press('Tab');
    let a = await active(page);
    if (!a.cls.includes('skip-link')) fail(`${vp.name}: first Tab landed on "${a.text}", expected the skip link`);
    const skipVisible = await page.evaluate(() => document.querySelector('.skip-link').getBoundingClientRect().top >= 0);
    if (!skipVisible) fail(`${vp.name}: skip link is not visible when focused`);
    await page.keyboard.press('Enter');
    a = await active(page);
    if (a.id !== 'main') fail(`${vp.name}: skip link moved focus to "${a.id || a.text}", expected main`);

    if (vp.name === 'desktop') {
      if (await page.locator('.menu-toggle').isVisible()) fail('desktop: menu button should be hidden');
      if (!(await page.locator('#site-nav').isVisible())) fail('desktop: navigation should be visible');
    }

    // Scorecard: answers score in the browser and name the weakest discipline.
    await page.goto(`${origin}/scorecard/`, { waitUntil: 'networkidle' });
    if (await page.locator('[data-summary]').isVisible()) fail(`${vp.name}: scorecard summary visible before answering`);
    const total = Number(await page.getAttribute('[data-scorecard]', 'data-total'));
    for (let q = 1; q <= total; q++) {
      const value = q > total - 4 ? '0' : '2'; // strong everywhere except the last discipline
      await page.check(`input[name="q${q}"][value="${value}"]`);
    }
    if (!(await page.locator('[data-summary]').isVisible())) fail(`${vp.name}: scorecard summary did not appear after answering everything`);
    const focus = await page.textContent('[data-focus]');
    const lastArea = copy.disciplines[copy.disciplines.length - 1].name;
    if (!focus.startsWith(`${lastArea} scored lowest at 0%`)) fail(`${vp.name}: scorecard focus reads "${focus}"`);
    const band = await page.textContent('[data-band]');
    if (band !== copy.scorecard.bands[copy.scorecard.bands.length - 1].label) fail(`${vp.name}: scorecard band reads "${band}" for a 75% score`);
    await page.screenshot({ path: path.join(root, 'screenshots', `scorecard-done-${vp.name}.png`), fullPage: true });
    await page.click('[data-reset]');
    if (await page.locator('[data-summary]').isVisible()) fail(`${vp.name}: Start over did not reset the scorecard`);
    if ((await page.locator('[data-scorecard] input:checked').count()) !== 0) fail(`${vp.name}: Start over left answers checked`);
    // Keyboard: Tab reaches a choice, and Space selects it.
    await page.focus('input[name="q1"][value="0"]');
    await page.keyboard.press('Space');
    if (!(await page.isChecked('input[name="q1"][value="0"]'))) fail(`${vp.name}: Space did not select a scorecard choice`);

    if (vp.name === 'phone') {
      await page.goto(`${origin}/`, { waitUntil: 'networkidle' });
      if (await page.locator('#site-nav').isVisible()) fail('phone: navigation is visible before the menu is opened');
      await page.keyboard.press('Tab'); // skip link
      await page.keyboard.press('Tab'); // wordmark
      await page.keyboard.press('Tab'); // menu button
      a = await active(page);
      if (!a.cls.includes('menu-toggle')) fail(`phone: third Tab landed on "${a.text}", expected the menu button`);
      await page.keyboard.press('Enter');
      if ((await page.getAttribute('.menu-toggle', 'aria-expanded')) !== 'true') fail('phone: Enter did not open the menu');
      if (!(await page.locator('#site-nav').isVisible())) fail('phone: menu did not become visible');
      a = await active(page);
      if (a.text !== copy.nav[0].label) fail(`phone: focus after opening is "${a.text}", expected "${copy.nav[0].label}"`);
      // Every menu item, including the primary action, is reachable by Tab.
      for (let i = 1; i < copy.nav.length; i++) await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      a = await active(page);
      if (a.href !== site.booking.url) fail(`phone: last menu stop is "${a.text}", expected the primary action`);
      await page.screenshot({ path: path.join(root, 'screenshots', 'menu-open-phone.png') });
      await page.keyboard.press('Escape');
      a = await active(page);
      if ((await page.getAttribute('.menu-toggle', 'aria-expanded')) !== 'false' || !a.cls.includes('menu-toggle')) fail('phone: Escape did not close the menu and return focus to the button');
      if (await page.locator('#site-nav').isVisible()) fail('phone: menu still visible after Escape');
      // Space also toggles it, as a native button should.
      await page.keyboard.press(' ');
      if ((await page.getAttribute('.menu-toggle', 'aria-expanded')) !== 'true') fail('phone: Space did not open the menu');
      await page.keyboard.press('Escape');
    }
    await context.close();
  }
} finally {
  await browser.close();
  server.kill();
}

if (problems.length) {
  console.error(`Browser test found ${problems.length} problem(s):\n- ${problems.join('\n- ')}`);
  process.exit(1);
}
console.log(`Browser test passed: ${pages.length} pages at ${viewports.length} widths, mobile menu and skip link work from the keyboard. Screenshots are in screenshots/.`);
