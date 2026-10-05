// Mobile menu: opens with the button, moves focus into the menu, and closes with Escape,
// an outside click, or a resize to desktop width. Without JavaScript the menu is always visible.
(() => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.getElementById('site-nav');
  if (!toggle || !nav) return;
  const mobile = window.matchMedia('(max-width: 960px)');

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
