// Turns the blocks in content.mjs into HTML, and builds structured data for each page.
import { absoluteUrl, bookingButton, esc, heroArt, isExternal, linkTag, pageShell, statusBadge } from './layout.mjs';

const offeringById = (site, id) => site.offerings.find((o) => o.id === id);
const founderById = (site, id) => site.founders.find((f) => f.id === id);

function sectionOpen(block, extra = '') {
  const tone = block.tone ? ` section-${block.tone}` : '';
  return `<section class="section${tone}${extra}"${block.id ? ` id="${esc(block.id)}"` : ''}${block.heading ? ` aria-labelledby="${esc((block.id || 'section') + '-title')}"` : ''}>`;
}

function sectionHead(block, level = 2) {
  const id = `${block.id || 'section'}-title`;
  return `<div class="section-head">
  ${block.eyebrow ? `<p class="eyebrow">${esc(block.eyebrow)}</p>` : ''}
  <h${level} id="${esc(id)}">${esc(block.heading)}</h${level}>
  ${block.intro ? `<p class="section-intro">${esc(block.intro)}</p>` : ''}
</div>`;
}

function statusLine(site, copy, id, { withNote = false } = {}) {
  const offering = offeringById(site, id);
  if (!offering) return '';
  return `<p class="status-line">${statusBadge(site, offering)}${offering.live || !withNote ? '' : ` <span>${esc(copy.plannedNote)}</span>`}</p>`;
}

function photo(founder, cls) {
  if (!founder.photo) return '';
  const p = founder.photo;
  return `<img class="${cls}" src="/assets/${esc(p.src)}" width="${p.width}" height="${p.height}" alt="${esc(p.alt)}" loading="lazy" decoding="async">`;
}

const upcomingEvents = (site) => {
  const today = new Date().toISOString().slice(0, 10);
  return (site.events || []).filter((e) => e.date >= today).sort((a, b) => a.date.localeCompare(b.date));
};

const renderers = {
  hero(block, { site, copy }) {
    const jump = block.jump
      ? `<nav class="jump" aria-label="On this page"><ul>${block.jump.map((j) => `<li><a href="${esc(j.href)}">${esc(j.label)}</a></li>`).join('')}</ul></nav>`
      : '';
    return `<section class="hero${block.art ? ' hero-with-art' : ''}" aria-labelledby="page-title">
  <div class="wrap hero-grid">
    <div class="hero-copy">
      <p class="eyebrow">${esc(block.eyebrow)}</p>
      <h1 id="page-title">${esc(block.title)}</h1>
      <p class="lead">${esc(block.lead)}</p>
      ${block.status ? statusLine(site, copy, block.status, { withNote: true }) : ''}
      <div class="actions">
        ${bookingButton(site, 'primary')}
        ${block.secondary ? `<a class="button button-secondary" href="${esc(block.secondary.href)}">${esc(block.secondary.label)}</a>` : ''}
      </div>
      ${jump}
    </div>
    ${block.art ? `<div class="hero-visual">${heroArt()}</div>` : ''}
  </div>
</section>`;
  },

  audienceStrip(block) {
    const items = block.items
      .map((i) => `<li><a class="audience-link" href="${esc(i.href)}"><span class="audience-title">${esc(i.title)}</span><span class="audience-body">${esc(i.body)}</span></a></li>`)
      .join('');
    return `${sectionOpen(block)}<div class="wrap">${sectionHead(block)}<ul class="audience-strip">${items}</ul></div></section>`;
  },

  grid(block, { site, copy }) {
    let items = block.items.map((i) => `<li class="card"><h3>${esc(i.title)}</h3><p>${esc(i.body)}</p></li>`);
    if (block.showIndustryExperience) {
      for (const f of site.founders) {
        if (f.industryExperience) items.push(`<li class="card"><h3>${esc(f.name)} in the golf car industry</h3><p>${esc(f.industryExperience)}</p></li>`);
      }
    }
    const extras = [];
    if (block.showPlatform && site.learningPlatform) {
      extras.push(`<p class="block-action">${linkTag(site.learningPlatform.url, copy.platformLabel(site.learningPlatform.name), 'button button-secondary')}</p>`);
    }
    if (block.showEvents) {
      const events = upcomingEvents(site);
      if (events.length) {
        const rows = events
          .map((e) => {
            const date = new Date(`${e.date}T12:00:00`).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
            const title = e.url ? linkTag(e.url, e.title) : esc(e.title);
            return `<li><time datetime="${esc(e.date)}">${esc(date)}</time> <span class="event-title">${title}</span>${e.format ? ` <span class="event-meta">${esc(e.format)}${e.location ? `, ${esc(e.location)}` : ''}</span>` : ''}</li>`;
          })
          .join('');
        extras.push(`<h3 class="events-heading">${esc(copy.eventsHeading)}</h3><ul class="events">${rows}</ul>`);
      }
    }
    return `${sectionOpen(block)}<div class="wrap">${sectionHead(block)}${block.status ? statusLine(site, copy, block.status) : ''}<ul class="grid grid-${block.columns || 3}">${items.join('')}</ul>${extras.join('')}</div></section>`;
  },

  list(block) {
    const items = block.items.map((i) => `<li>${esc(i)}</li>`).join('');
    return `${sectionOpen(block)}<div class="wrap split">${sectionHead(block)}<ul class="ticks">${items}</ul></div></section>`;
  },

  prose(block, { site, copy }) {
    const paras = block.paragraphs.map((p) => `<p>${esc(p)}</p>`).join('');
    const links = (block.links || []).map((l) => `<p class="block-action">${linkTag(l.href, l.label, 'text-link')}</p>`).join('');
    return `${sectionOpen(block)}<div class="wrap split">${sectionHead(block)}<div class="prose">${block.status ? statusLine(site, copy, block.status) : ''}${paras}${links}</div></div></section>`;
  },

  offerings(block, { site, copy }) {
    const cards = site.offerings
      .map((o) => {
        const c = copy.offeringCopy[o.id];
        return `<li class="card offering">
  <div class="offering-top">${statusBadge(site, o)}</div>
  <h3>${esc(o.name)}</h3>
  <p>${esc(c.body)}</p>
  <p class="card-link">${linkTag(o.href, c.linkLabel, 'text-link')}</p>
</li>`;
      })
      .join('');
    return `${sectionOpen(block)}<div class="wrap">${sectionHead(block)}<ul class="grid grid-offerings">${cards}</ul><p class="note">${esc(copy.offeringsNote)}</p></div></section>`;
  },

  founders(block, { site }) {
    const people = site.founders
      .map((f) => {
        if (block.variant === 'short') {
          return `<li class="person">${photo(f, 'portrait')}<div><h3>${esc(f.name)}</h3><p class="person-role">${esc(f.role)}</p><p>${esc(f.short)}</p></div></li>`;
        }
        const bio = f.bio.map((p) => `<p>${esc(p)}</p>`).join('');
        const industry = f.industryExperience ? `<p>${esc(f.industryExperience)}</p>` : '';
        return `<li class="person person-full" id="${esc(f.id)}">${photo(f, 'portrait')}<div><h3>${esc(f.name)}</h3><p class="person-role">${esc(f.role)}</p>${bio}${industry}</div></li>`;
      })
      .join('');
    const link = block.link ? `<p class="block-action">${linkTag(block.link.href, block.link.label, 'text-link')}</p>` : '';
    return `${sectionOpen(block)}<div class="wrap">${sectionHead(block)}<ul class="people${block.variant === 'full' ? ' people-full' : ''}">${people}</ul>${link}</div></section>`;
  },

  audiences(block) {
    return block.items
      .map(
        (a, n) => `<section class="section audience${n % 2 ? ' section-soft' : ''}" id="${esc(a.id)}" aria-labelledby="${esc(a.id)}-title">
  <div class="wrap split">
    <div class="section-head">
      <h2 id="${esc(a.id)}-title">${esc(a.title)}</h2>
      <p class="section-intro">${esc(a.body)}</p>
    </div>
    <div>
      <h3 class="list-heading">Where we focus</h3>
      <ul class="ticks">${a.focus.map((f) => `<li>${esc(f)}</li>`).join('')}</ul>
    </div>
  </div>
</section>`,
      )
      .join('\n');
  },

  links(block) {
    const items = block.items
      .map((i) => `<li class="card"><h3>${esc(i.title)}</h3><p>${esc(i.body)}</p><p class="card-link">${linkTag(i.href, i.linkLabel, 'text-link')}</p></li>`)
      .join('');
    return `${sectionOpen(block)}<div class="wrap">${sectionHead(block)}<ul class="grid grid-${Math.min(block.items.length, 4)}">${items}</ul></div></section>`;
  },

  cta(block, { site }) {
    return `<section class="section section-dark cta" aria-labelledby="cta-title">
  <div class="wrap cta-inner">
    <h2 id="cta-title">${esc(block.heading)}</h2>
    <p>${esc(block.body)}</p>
    <div class="actions">${bookingButton(site, 'primary')}<a class="button button-light" href="/contact/">Other ways to reach us</a></div>
  </div>
</section>`;
  },

  contact(block, { site }) {
    const subject = encodeURIComponent(site.emailSubject);
    const emails = site.contacts
      .map((c) => {
        const f = founderById(site, c.founder);
        return `<li class="card contact-card"><h3>Email ${esc(f.name.split(' ')[0])}</h3><p class="person-role">${esc(f.role)}</p><p><a href="mailto:${esc(c.email)}?subject=${subject}">${esc(c.email)}</a></p></li>`;
      })
      .join('');
    const booking = `<div class="card booking-card">
  <h3>Schedule a time</h3>
  <p>Pick a time that works for you${site.booking.length ? ` for a ${esc(site.booking.length)} conversation` : ''}. Josh and Matt will take it from there.</p>
  ${site.booking.isTemporary ? `<p class="small">${esc(site.booking.temporaryNote)}</p>` : ''}
  <div class="actions">${bookingButton(site, 'primary')}</div>
</div>`;
    const include = block.include.map((i) => `<li>${esc(i)}</li>`).join('');
    return `${sectionOpen(block)}<div class="wrap">${sectionHead(block)}
  <div class="contact-grid">${booking}<ul class="contact-emails">${emails}</ul></div>
  ${site.responseTime ? `<p class="note">${esc(site.responseTime)}</p>` : ''}
</div></section>
<section class="section section-soft" id="what-to-include" aria-labelledby="what-to-include-title">
  <div class="wrap split">
    <div class="section-head"><h2 id="what-to-include-title">${esc(block.includeHeading)}</h2><p class="section-intro">A few details help us make the first conversation useful.</p></div>
    <div><ul class="ticks">${include}</ul><p class="note">${esc(block.privacy)}</p><p class="note">${esc(block.where)}</p></div>
  </div>
</section>`;
  },
};

export function structuredData(site, copy, page) {
  const base = site.canonicalUrl.replace(/\/$/, '');
  const orgId = `${base}/#organization`;
  const areaServed = site.location.areasServed.length ? site.location.areasServed : undefined;
  const persons = site.founders.map((f) => {
    const sameAs = site.profiles?.[f.id];
    return {
      '@type': 'Person',
      '@id': `${base}/about/#${f.id}`,
      name: f.name,
      description: f.role,
      worksFor: { '@id': orgId },
      ...(f.photo ? { image: `${base}/assets/${f.photo.src}` } : {}),
      ...(sameAs ? { sameAs: [sameAs] } : {}),
    };
  });
  const services = site.offerings.map((o) => ({
    '@type': 'Service',
    name: `${o.name} for golf car businesses`,
    description: copy.offeringCopy[o.id].body,
    serviceType: o.name,
    url: isExternal(o.href) ? o.href : base + o.href,
    provider: o.provider ? { '@type': 'Organization', name: site.links[o.provider].name, url: site.links[o.provider].url } : { '@id': orgId },
    audience: { '@type': 'BusinessAudience', audienceType: 'Golf car and golf cart businesses' },
    ...(areaServed ? { areaServed } : {}),
  }));
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': orgId,
        name: site.siteName,
        url: `${base}/`,
        description: site.tagline,
        logo: `${base}/assets/${site.ogImage.src}`,
        founder: persons.map((p) => ({ '@id': p['@id'] })),
        knowsAbout: ['Golf car dealership leadership', 'Golf cart dealer training', 'Golf car business coaching', 'Department profitability', 'Floor plan inventory management', 'Seasonal cash planning'],
        ...(areaServed ? { areaServed } : {}),
      },
      { '@type': 'WebSite', '@id': `${base}/#website`, name: site.siteName, url: `${base}/`, publisher: { '@id': orgId } },
      {
        '@type': 'WebPage',
        '@id': `${absoluteUrl(site, page.path)}#webpage`,
        url: absoluteUrl(site, page.path),
        name: page.title,
        description: page.description,
        isPartOf: { '@id': `${base}/#website` },
        about: { '@id': orgId },
      },
      ...persons,
      ...services,
    ],
  };
}

export function renderPages(site, copy, assets) {
  return copy.pages.map((page) => {
    const ctx = { site, copy, page };
    const body = page.blocks
      .map((b) => {
        const render = renderers[b.type];
        if (!render) throw new Error(`Unknown block type "${b.type}" on ${page.path}`);
        return render(b, ctx);
      })
      .join('\n');
    const jsonLd = page.notFound ? null : structuredData(site, copy, page);
    const html = pageShell({ site, copy, page, body, jsonLd, assets });
    const out = page.notFound ? '404.html' : page.path === '/' ? 'index.html' : `${page.path.replace(/^\//, '')}index.html`;
    return { page, out, html };
  });
}
