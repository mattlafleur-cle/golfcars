// Turns the blocks in content.mjs into HTML, and builds structured data for each page.
import { absoluteUrl, bookingButton, esc, isExternal, linkTag, pageShell, statusBadge } from './layout.mjs';

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
  if (!offering || !site.showOfferingStatus) return '';
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

// Learning platform link and upcoming events. Both render nothing until set in site.config.mjs.
function extrasFor(block, site, copy) {
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
  return extras.join('');
}

// Leaderboard panel in the Home hero: the four tracks of the curriculum.
function board(copy) {
  const rows = copy.disciplines
    .map((d) => `<li><a href="/curriculum/#${esc(d.id)}"><span class="board-num">${esc(d.number)}</span><span class="board-name">${esc(d.name)}</span></a></li>`)
    .join('');
  return `<nav class="board" aria-label="The four tracks of the curriculum">
  <p class="board-title"><span>The curriculum: four tracks</span><span class="board-flag" aria-hidden="true"></span></p>
  <ol>${rows}</ol>
  <p class="board-foot">${copy.disciplines.reduce((n, d) => n + d.modules.length, 0)} modules for dealers, builders, service shops, and golf facility fleets</p>
</nav>`;
}

const trackOf = (copy, id) => copy.disciplines.find((d) => d.id === id);
const guideOf = (copy, slug) => copy.guides.find((g) => g.slug === slug);

const renderers = {
  hero(block, { site, copy }) {
    const jump = block.jump
      ? `<nav class="jump" aria-label="On this page"><ul>${block.jump.map((j) => `<li><a href="${esc(j.href)}">${esc(j.label)}</a></li>`).join('')}</ul></nav>`
      : '';
    return `<section class="hero${block.board ? ' hero-with-board' : ''}${block.compact ? ' hero-compact' : ''}" aria-labelledby="page-title">
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
    ${block.board ? board(copy) : ''}
  </div>
</section>`;
  },

  statement(block) {
    const paras = block.paragraphs.map((p) => `<p>${esc(p)}</p>`).join('');
    return `${sectionOpen(block, ' statement')}<div class="wrap statement-inner">
  <p class="eyebrow">${esc(block.eyebrow)}</p>
  <h2 id="${esc(block.id)}-title">${esc(block.heading)}</h2>
  <div class="statement-body">${paras}</div>
</div></section>`;
  },

  pillars(block, { copy }) {
    const cards = copy.disciplines
      .map(
        (d) => `<li class="pillar">
  <p class="pillar-num" aria-hidden="true">${esc(d.number)}</p>
  <h3>${esc(d.name)} <span class="visually-hidden">track</span></h3>
  <p class="pillar-promise">${esc(d.promise)}</p>
  <p class="pillar-count">${d.modules.length} modules</p>
  <ul class="pillar-list">${d.modules.map((m) => `<li>${esc(m.title)}</li>`).join('')}</ul>
  <p class="card-link"><a class="text-link" href="/curriculum/#${esc(d.id)}">Explore the ${esc(d.name.toLowerCase())} track</a></p>
</li>`,
      )
      .join('');
    return `${sectionOpen(block)}<div class="wrap">${sectionHead(block)}<ol class="pillars">${cards}</ol></div></section>`;
  },

  tracks(block, { copy }) {
    return copy.disciplines
      .map((d, n) => {
        const guide = guideOf(copy, d.guide);
        const modules = d.modules
          .map((m, i) => `<li class="module"><p class="module-code">${esc(d.number)}.${i + 1}</p><h3>${esc(m.title)}</h3><p>${esc(m.body)}</p></li>`)
          .join('');
        return `<section class="section track${n % 2 ? ' section-soft' : ''}" id="${esc(d.id)}" aria-labelledby="${esc(d.id)}-title">
  <div class="wrap">
    <div class="track-head">
      <p class="discipline-num" aria-hidden="true">${esc(d.number)}</p>
      <div>
        <p class="eyebrow">Track ${esc(String(n + 1))} of ${copy.disciplines.length}</p>
        <h2 id="${esc(d.id)}-title">${esc(d.name)}</h2>
        <p class="pillar-promise">${esc(d.promise)}</p>
        <p class="section-intro">${esc(d.intro)}</p>
      </div>
    </div>
    <ol class="modules">${modules}</ol>
    <div class="track-foot">
      <div class="signs">
        <p class="list-heading">You will recognize the need when</p>
        <ul class="signs-list">${d.signs.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
      </div>
      ${guide ? `<a class="guide-card" href="/guides/${esc(guide.slug)}/"><span class="guide-kicker">Free field guide</span><span class="guide-title">${esc(guide.title)}</span><span class="guide-more">Read the guide</span></a>` : ''}
    </div>
  </div>
</section>`;
      })
      .join('\n');
  },

  steps(block) {
    const items = block.items
      .map((i) => `<li class="step"><p class="step-num" aria-hidden="true">${esc(i.number)}</p><h3>${esc(i.title)}</h3><p>${esc(i.body)}</p><p class="card-link"><a class="text-link" href="${esc(i.href)}">${esc(i.linkLabel)}</a></p></li>`)
      .join('');
    return `${sectionOpen(block)}<div class="wrap">${sectionHead(block)}<ol class="steps">${items}</ol></div></section>`;
  },

  paths(block, { copy }) {
    const list = block.limit ? copy.paths.slice(0, block.limit) : copy.paths;
    const cards = list
      .map((p) => {
        const steps = p.steps
          .map(([track, title]) => {
            const d = trackOf(copy, track);
            return `<li><a href="/curriculum/#${esc(track)}"><span class="path-track">${esc(d.name)}</span><span class="path-module">${esc(title)}</span></a></li>`;
          })
          .join('');
        return `<li class="card path" id="path-${esc(p.id)}"><h3>${esc(p.role)}</h3><p>${esc(p.summary)}</p><ol class="path-steps">${steps}</ol></li>`;
      })
      .join('');
    const link = block.link ? `<p class="block-action"><a class="text-link" href="${esc(block.link.href)}">${esc(block.link.label)}</a></p>` : '';
    return `${sectionOpen(block)}<div class="wrap">${sectionHead(block)}<ul class="grid grid-3 paths">${cards}</ul>${link}</div></section>`;
  },

  guideList(block, { copy }) {
    const cards = copy.guides
      .map((g) => {
        const d = trackOf(copy, g.track);
        return `<li class="card guide-item"><p class="guide-kicker">${esc(d.number)} ${esc(d.name)} track</p><h3><a href="/guides/${esc(g.slug)}/">${esc(g.title)}</a></h3><p>${esc(g.summary)}</p><p class="card-link"><a class="text-link" href="/guides/${esc(g.slug)}/" aria-hidden="true" tabindex="-1">Read the guide</a></p></li>`;
      })
      .join('');
    const more = block.full ? '' : `<p class="block-action"><a class="text-link" href="/guides/">All field guides</a></p>`;
    return `${sectionOpen(block)}<div class="wrap">${sectionHead(block)}<ul class="grid grid-${block.full ? 2 : 4} guides">${cards}</ul>${more}</div></section>`;
  },

  article(block, { copy }) {
    const g = block.guide;
    const d = trackOf(copy, g.track);
    const body = g.sections
      .map((sec) => {
        const paras = (sec.paragraphs || []).map((p) => `<p>${esc(p)}</p>`).join('');
        const list = sec.list ? `<ul class="ticks">${sec.list.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>` : '';
        return `<h2>${esc(sec.heading)}</h2>${paras}${list}`;
      })
      .join('');
    const others = copy.guides.filter((x) => x.slug !== g.slug);
    return `<section class="section article-section" aria-label="Guide">
  <div class="wrap article-grid">
    <article class="article">${body}</article>
    <aside class="article-aside">
      <div class="takeaways">
        <h2>Key takeaways</h2>
        <ul class="ticks">${g.takeaways.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
      </div>
      <div class="aside-track">
        <p class="guide-kicker">From the ${esc(d.name)} track</p>
        <p>${esc(d.promise)}</p>
        <p><a class="text-link" href="/curriculum/#${esc(d.id)}">See all ${d.modules.length} modules</a></p>
      </div>
      <div class="aside-more">
        <p class="guide-kicker">More field guides</p>
        <ul>${others.map((o) => `<li><a href="/guides/${esc(o.slug)}/">${esc(o.title)}</a></li>`).join('')}</ul>
      </div>
    </aside>
  </div>
</section>`;
  },

  program(block, { site, copy }) {
    const paras = (block.paragraphs || []).map((p) => `<p>${esc(p)}</p>`).join('');
    const list = block.list ? `<h3 class="list-heading">${esc(block.listHeading)}</h3><ul class="ticks">${block.list.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>` : '';
    const links = (block.links || []).map((l) => `<p class="block-action">${linkTag(l.href, l.label, 'text-link')}</p>`).join('');
    return `${sectionOpen(block, ' program')}<div class="wrap split">${sectionHead(block)}<div class="prose">${paras}${list}${links}${extrasFor(block, site, copy)}</div></div></section>`;
  },

  questions(block) {
    const items = block.items.map((q) => `<li>${esc(q)}</li>`).join('');
    const a = block.action;
    return `${sectionOpen(block)}<div class="wrap">${sectionHead(block)}<ol class="questions">${items}</ol>
  <div class="questions-action"><a class="button button-secondary" href="${esc(a.href)}">${esc(a.label)}</a><p class="small">${esc(a.note)}</p></div>
</div></section>`;
  },

  scorecard(block, { copy }) {
    const sc = copy.scorecard;
    let n = 0;
    const areas = sc.areas
      .map((area) => {
        const d = copy.disciplines.find((x) => x.id === area.id);
        const items = area.statements
          .map((statement) => {
            n += 1;
            const name = `q${n}`;
            const choices = sc.choices
              .map((c) => `<label class="choice"><input type="radio" name="${name}" value="${c.value}"><span>${esc(c.label)}</span></label>`)
              .join('');
            return `<fieldset class="sc-item"><legend><span class="sc-n">${n}.</span> ${esc(statement)}</legend><div class="choices">${choices}</div></fieldset>`;
          })
          .join('');
        const guide = guideOf(copy, d.guide);
        return `<section class="sc-area" aria-labelledby="sc-${esc(area.id)}-title" data-area="${esc(area.id)}" data-name="${esc(d.name)}" data-next="${esc(area.nextStep)}" data-track-href="/curriculum/#${esc(d.id)}" data-guide-href="/guides/${esc(guide.slug)}/" data-guide-title="${esc(guide.title)}">
  <h2 id="sc-${esc(area.id)}-title"><span class="discipline-num" aria-hidden="true">${esc(d.number)}</span> ${esc(d.name)}</h2>
  ${items}
</section>`;
      })
      .join('');
    const bands = esc(JSON.stringify(sc.bands));
    return `<section class="section" id="${esc(block.id)}" aria-label="Scorecard">
  <div class="wrap scorecard-grid">
    <div class="scorecard" data-scorecard data-total="${n}" data-bands="${bands}">${areas}</div>
    <aside class="sc-results" aria-labelledby="sc-results-title">
      <h2 id="sc-results-title">Your results</h2>
      <p class="sc-progress" data-progress aria-live="polite">Answer all ${n} statements to see your results.</p>
      <ul class="sc-bars">${copy.disciplines.map((d) => `<li data-bar="${esc(d.id)}"><span class="sc-bar-label">${esc(d.name)}</span><span class="sc-bar"><span class="sc-bar-fill"></span></span><span class="sc-bar-value">0%</span></li>`).join('')}</ul>
      <div class="sc-summary" data-summary hidden aria-live="polite">
        <p class="sc-band" data-band></p>
        <p data-band-body></p>
        <h3>Where to start</h3>
        <p data-focus></p>
        <ul class="sc-links"><li><a data-track-link href="/curriculum/">Explore the curriculum</a></li><li><a data-guide-link href="/guides/">Read the field guides</a></li></ul>
        <div class="actions"><a class="button button-primary" href="/contact/">Talk through your results</a><button class="button button-secondary" type="button" data-reset>Start over</button></div>
      </div>
      <noscript><p class="small">Scoring needs JavaScript. You can still use the statements as a checklist: count 2 points for Consistently, 1 for Sometimes, and 0 for Not yet. Each discipline has 8 points available.</p></noscript>
    </aside>
  </div>
</section>`;
  },

  shows(block, { site, copy }) {
    const attending = (site.shows || []).filter((s) => s.attending);
    if (!attending.length) return '';
    const sc = copy.showsCopy;
    const cards = attending
      .map((s) => `<li class="card show-card"><h3>${esc(s.name)}</h3><p class="show-dates">${esc(s.dates)}</p><p>${esc(s.place)}</p><p class="card-link">${linkTag(s.url, sc.linkLabel(s.name), 'text-link')}</p></li>`)
      .join('');
    return `${sectionOpen({ ...block, heading: sc.heading }, ' shows')}<div class="wrap">${sectionHead({ id: block.id, eyebrow: sc.eyebrow, heading: sc.heading, intro: sc.intro })}<ul class="grid grid-2">${cards}</ul><div class="actions block-action">${bookingButton(site, 'primary')}</div></div></section>`;
  },

  audienceStrip(block) {
    const items = block.items
      .map((i) => `<li><a class="audience-link" href="${esc(i.href)}"><span class="audience-title">${esc(i.title)}</span><span class="audience-body">${esc(i.body)}</span></a></li>`)
      .join('');
    return `${sectionOpen(block)}<div class="wrap">${sectionHead(block)}<ul class="audience-strip">${items}</ul></div></section>`;
  },

  grid(block, { site, copy }) {
    const items = block.items.map((i) => `<li class="card"><h3>${esc(i.title)}</h3><p>${esc(i.body)}</p></li>`);
    if (block.showIndustryExperience) {
      for (const f of site.founders) {
        if (f.industryExperience) items.push(`<li class="card"><h3>${esc(f.name)} in the golf car industry</h3><p>${esc(f.industryExperience)}</p></li>`);
      }
    }
    return `${sectionOpen(block)}<div class="wrap">${sectionHead(block)}${block.status ? statusLine(site, copy, block.status) : ''}<ul class="grid grid-${block.columns || 3}">${items.join('')}</ul>${extrasFor(block, site, copy)}</div></section>`;
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
  ${site.showOfferingStatus ? `<div class="offering-top">${statusBadge(site, o)}</div>` : ''}
  <h3>${esc(o.name)}</h3>
  <p>${esc(c.body)}</p>
  <p class="card-link">${linkTag(o.href, c.linkLabel, 'text-link')}</p>
</li>`;
      })
      .join('');
    return `${sectionOpen(block)}<div class="wrap">${sectionHead(block)}<ul class="grid grid-offerings">${cards}</ul><p class="note">${esc(copy.offeringsNote)}</p>${extrasFor(block, site, copy)}</div></section>`;
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
      <h3 class="list-heading">What the curriculum covers</h3>
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
    name: `${o.name} for golf cart businesses`,
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
        ...(site.parent ? { parentOrganization: { '@type': 'Organization', name: site.links[site.parent].name, url: site.links[site.parent].url } } : {}),
        knowsAbout: ['Golf cart dealer training', 'Golf car business coaching', 'Golf cart dealership leadership', 'Golf cart sales process', 'Service department productivity', 'Department profitability', 'Floor plan inventory management', 'Golf course cart fleet management'],
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
    const guide = page.blocks.find((b) => b.type === 'article')?.guide;
    if (jsonLd && guide) {
      jsonLd['@graph'].push({
        '@type': 'Article',
        headline: guide.title,
        description: guide.description,
        url: absoluteUrl(site, page.path),
        author: { '@id': `${site.canonicalUrl.replace(/\/$/, '')}/#organization` },
        publisher: { '@id': `${site.canonicalUrl.replace(/\/$/, '')}/#organization` },
        isPartOf: { '@id': `${site.canonicalUrl.replace(/\/$/, '')}/#website` },
      });
    }
    const html = pageShell({ site, copy, page, body, jsonLd, assets });
    const out = page.notFound ? '404.html' : page.path === '/' ? 'index.html' : `${page.path.replace(/^\//, '')}index.html`;
    return { page, out, html };
  });
}
