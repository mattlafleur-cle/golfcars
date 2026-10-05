// Mobile menu: opens with the button, moves focus into the menu, and closes with Escape,
// an outside click, or a resize to desktop width. Without JavaScript the menu is always visible.
(() => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.getElementById('site-nav');
  if (!toggle || !nav) return;
  const mobile = window.matchMedia('(max-width: 1100px)');

  const setOpen = (open, { returnFocus = false } = {}) => {
    toggle.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
    if (open) {
      const first = nav.querySelector('a');
      if (first) first.focus();
    } else if (returnFocus) {
      toggle.focus();
    }
  };

  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') setOpen(false, { returnFocus: true });
  });

  document.addEventListener('click', (event) => {
    if (toggle.getAttribute('aria-expanded') === 'true' && !nav.contains(event.target) && !toggle.contains(event.target)) setOpen(false);
  });

  // Close the menu when focus leaves it with Tab, so it never covers the page behind it.
  nav.addEventListener('focusout', (event) => {
    if (mobile.matches && event.relatedTarget && !nav.contains(event.relatedTarget) && event.relatedTarget !== toggle) setOpen(false);
  });

  mobile.addEventListener('change', (event) => {
    if (!event.matches) setOpen(false);
  });
})();

// Dealer scorecard: scores answers in the browser only. Nothing is sent, stored, or tracked.
(() => {
  const card = document.querySelector('[data-scorecard]');
  if (!card) return;
  const total = Number(card.dataset.total);
  const bands = JSON.parse(card.dataset.bands);
  const areas = [...card.querySelectorAll('[data-area]')];
  const progress = document.querySelector('[data-progress]');
  const summary = document.querySelector('[data-summary]');
  const percent = (points, max) => Math.round((points / max) * 100);

  const update = () => {
    let answered = 0;
    let points = 0;
    const results = areas.map((area) => {
      const sets = [...area.querySelectorAll('fieldset')];
      let areaPoints = 0;
      let done = 0;
      for (const set of sets) {
        const checked = set.querySelector('input:checked');
        if (checked) { done += 1; areaPoints += Number(checked.value); }
      }
      answered += done;
      points += areaPoints;
      const pct = percent(areaPoints, sets.length * 2);
      const bar = document.querySelector(`[data-bar="${area.dataset.area}"]`);
      bar.querySelector('.sc-bar-fill').style.width = `${done === sets.length ? pct : 0}%`;
      bar.querySelector('.sc-bar-value').textContent = done === sets.length ? `${pct}%` : `${done} of ${sets.length}`;
      return { name: area.dataset.name, next: area.dataset.next, pct };
    });

    if (answered < total) {
      progress.textContent = `${answered} of ${total} answered.`;
      summary.hidden = true;
      return;
    }
    const overall = percent(points, total * 2);
    const band = bands.filter((b) => overall >= b.min).pop();
    const lowest = results.reduce((low, r) => (r.pct < low.pct ? r : low), results[0]);
    progress.textContent = `All ${total} answered. Overall score: ${overall}%.`;
    summary.querySelector('[data-band]').textContent = band.label;
    summary.querySelector('[data-band-body]').textContent = band.body;
    summary.querySelector('[data-focus]').textContent = `${lowest.name} scored lowest at ${lowest.pct}%. ${lowest.next}`;
    summary.hidden = false;
  };

  card.addEventListener('change', update);
  document.querySelector('[data-reset]')?.addEventListener('click', () => {
    for (const input of card.querySelectorAll('input:checked')) input.checked = false;
    update();
    card.querySelector('input')?.focus();
  });
  update();
})();
