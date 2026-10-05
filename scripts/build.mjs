// Builds the static site into dist/. No dependencies: Node's standard library only.
import { createHash } from 'node:crypto';
import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import site from '../site.config.mjs';
import content from '../src/content.mjs';
import { renderPages } from '../src/pages.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const copy = content(site);

const hash = async (file) => createHash('sha256').update(await readFile(path.join(root, 'src/assets', file))).digest('hex').slice(0, 10);

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });
await cp(path.join(root, 'src/assets'), path.join(dist, 'assets'), {
  recursive: true,
  filter: (src) => !src.endsWith('.md'),
});

const assets = { css: await hash('site.css'), js: await hash('site.js') };
const built = renderPages(site, copy, assets);
for (const { out, html } of built) {
  const file = path.join(dist, out);
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, html);
}

const base = site.canonicalUrl.replace(/\/$/, '');
const pages = built.filter((b) => !b.page.notFound);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((b) => `  <url><loc>${base}${b.page.path}</loc></url>`).join('\n')}
</urlset>
`;
await writeFile(path.join(dist, 'sitemap.xml'), sitemap);

// Crawling stays allowed even while indexing is off, so search engines can read each page's noindex.
await writeFile(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${base}/sitemap.xml\n`);

const status = (o) => (o.live ? site.statusLabels.live : site.statusLabels.planned);
const llms = `# ${site.siteName}

> ${site.tagline}

${copy.footerBlurb} It serves owners, general managers, and leaders of golf car dealers and dealer groups; manufacturers, builders, and upfitters; service and repair shops; parts and accessory businesses; rental, fleet, and resort operators; and golf course and community fleet managers.

## The curriculum: four tracks

${copy.disciplines.map((d) => `- ${d.name}: ${d.promise}`).join('\n')}

Each track has six modules:

${copy.disciplines.map((d) => `- ${d.name}: ${d.modules.map((m) => m.title).join('; ')}`).join('\n')}

## Field guides

${copy.guides.map((g) => `- [${g.title}](${base}/guides/${g.slug}/): ${g.summary}`).join('\n')}

A free, browser-only dealer scorecard is at ${base}/scorecard/.

## Programs

${site.offerings.map((o) => `- ${o.name}${site.showOfferingStatus ? ` (${status(o)})` : ''}: ${copy.offeringCopy[o.id].body}`).join('\n')}

No prices are published. Start with a conversation.

## Shows

${(site.shows || []).filter((s) => s.attending).map((s) => `- ${s.name}, ${s.dates}, ${s.place}`).join('\n') || '- None announced.'}

## Founders

${site.founders.map((f) => `- ${f.name}, ${f.role.toLowerCase()}. ${f.short}`).join('\n')}

## Pages

${pages.map((b) => `- [${b.page.title}](${base}${b.page.path}): ${b.page.description}`).join('\n')}

## Contact

- ${site.booking.label}: ${site.booking.url}
${site.contacts.map((c) => `- ${site.founders.find((f) => f.id === c.founder).name}: ${c.email}`).join('\n')}

${site.footerDisclosure}
`;
await writeFile(path.join(dist, 'llms.txt'), llms);
await writeFile(path.join(dist, 'CNAME'), `${site.domain}\n`);
await writeFile(path.join(dist, '.nojekyll'), '');

console.log(`Built ${built.length} pages into dist/ (indexing ${site.allowIndexing ? 'on' : 'off'}).`);
