// Native cross-page anchors remain the fallback; same-page links scroll without reloading.
const sameDocumentPath = path => path.replace(/index\.html$/, '');
document.querySelectorAll('a[href]').forEach(link => {
  link.addEventListener('click', event => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || link.target || link.hasAttribute('download')) return;
    const url = new URL(link.href, location.href);
    if (!url.hash || url.origin !== location.origin || sameDocumentPath(url.pathname) !== sameDocumentPath(location.pathname) || url.search !== location.search) return;
    let id;
    try { id = decodeURIComponent(url.hash.slice(1)); } catch { return; }
    const target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
    if (location.hash !== url.hash) history.pushState(null, '', url.hash);
    target.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
  });
});

// On the homepage, indicate the section occupying the reading area.
// Product pages keep their existing page-level active state.
if (document.querySelector('.hero#home')) {
  const nav = document.querySelector('.site-header nav');
  const sections = ['home', 'introduction', 'development', 'exhibition', 'about', 'contact'].map(id => document.getElementById(id)).filter(Boolean);
  const links = [...nav.querySelectorAll('a')];
  let frame = 0;
  function updateSection() {
    frame = 0;
    let current = sections[0];
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= innerHeight * .25) current = section;
    }
    if (scrollY + innerHeight >= document.documentElement.scrollHeight - 2) current = sections.at(-1);
    const active = links.find(link => {
      const url = new URL(link.href);
      return current.id === 'home' ? url.pathname.endsWith('/index.html') && !url.hash : url.hash === `#${current.id}`;
    });
    links.forEach(link => {
      if (link === active) link.setAttribute('aria-current', current.id === 'home' ? 'page' : 'location');
      else link.removeAttribute('aria-current');
    });
  }
  const schedule = () => { if (!frame) frame = requestAnimationFrame(updateSection); };
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  window.addEventListener('hashchange', schedule);
  window.addEventListener('load', schedule);
  document.fonts?.ready.then(schedule);
  updateSection();
}
