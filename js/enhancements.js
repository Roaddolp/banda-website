// Shared, optional enhancements. Native links and visible content remain the fallback.
(() => {
  const header = document.querySelector('.site-header');
  const nav = header?.querySelector('nav');
  if (header && nav) {
    const mobile = matchMedia('(max-width: 760px)');
    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'nav-toggle';
    nav.id = 'site-navigation';
    toggle.setAttribute('aria-controls', nav.id);
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation');
    for (let i = 0; i < 3; i++) {
      const line = document.createElement('span');
      line.setAttribute('aria-hidden', 'true');
      toggle.append(line);
    }
    nav.before(toggle);
    header.classList.add('menu-enhanced');
    function setOpen(open, returnFocus = false) {
      header.classList.toggle('menu-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
      nav.inert = mobile.matches && !open;
      if (returnFocus) toggle.focus();
    }
    toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
    nav.addEventListener('click', event => { if (event.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && header.classList.contains('menu-open')) {
        event.preventDefault();
        setOpen(false, true);
      }
    });
    document.addEventListener('pointerdown', event => {
      if (!header.contains(event.target)) setOpen(false);
    });
    mobile.addEventListener('change', () => {
      const focusWasInMenu = nav.contains(document.activeElement);
      const focusWasToggle = document.activeElement === toggle;
      setOpen(false, mobile.matches && focusWasInMenu);
      if (!mobile.matches && focusWasToggle) nav.querySelector('a')?.focus();
    });
    setOpen(false);
  }

  // Both page heroes use the actual header height, including responsive changes.
  const pageHero = document.querySelector('.hero, .products-hero');
  if (pageHero && header) {
    const updateHeaderHeight = () => pageHero.style.setProperty('--hero-header-height', `${header.getBoundingClientRect().height}px`);
    updateHeaderHeight();
    if ('ResizeObserver' in window) new ResizeObserver(updateHeaderHeight).observe(header);
    else window.addEventListener('resize', updateHeaderHeight);
  }

  // Pointer-specific feedback also works when a touchscreen and mouse coexist.
  let press = null, releaseTimer = 0;
  function clearPress() {
    clearTimeout(releaseTimer);
    press?.node.classList.remove('is-touch-pressed');
    press = null;
  }
  document.addEventListener('pointerdown', event => {
    clearPress();
    const touch = event.pointerType === 'touch' || event.pointerType === 'pen';
    document.documentElement.dataset.pointerInput = touch ? 'touch' : 'mouse';
    if (!touch || !event.isPrimary) return;
    const control = event.target.closest('.character-trigger, .category-poster, .work-open, .paper-link');
    if (!control) return;
    const node = control.matches('.character-trigger') ? control.closest('.character-poster') : control;
    press = { node, id: event.pointerId, x: event.clientX, y: event.clientY };
    node.classList.add('is-touch-pressed');
  }, { passive: true });
  document.addEventListener('pointermove', event => {
    if (event.pointerType === 'mouse') document.documentElement.dataset.pointerInput = 'mouse';
    if (press?.id === event.pointerId && Math.hypot(event.clientX - press.x, event.clientY - press.y) > 10) clearPress();
  }, { passive: true });
  document.addEventListener('pointerup', event => {
    if (press?.id === event.pointerId) releaseTimer = setTimeout(clearPress, 120);
  }, { passive: true });
  document.addEventListener('pointercancel', clearPress, { passive: true });
  window.addEventListener('blur', clearPress);
  document.addEventListener('visibilitychange', () => { if (document.hidden) clearPress(); });
  document.addEventListener('keydown', event => {
    if (event.key === 'Tab') {
      document.documentElement.dataset.pointerInput = 'keyboard';
      clearPress();
    }
  });

  if (!('IntersectionObserver' in window)) return;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const selector = '.hero-copy > *, .products-hero-copy > *, .intro-heading, .intro-body > p, .character-poster, .development-heading, .process-copy, .sketch-board, .digital-mount, .elements-mount, .wordmark-finale > *, .product-development-copy > *, .category-poster, .product-development-story, .exhibition-heading > *, .exhibition-gallery, .team-heading, .department, .contact-heading, .contact-action, .works-heading, .work-card, .merch-store-heading, .merch-store-copy';
  const tracked = new Set();
  let enterObserver, exitObserver, changes;
  function stop() {
    enterObserver?.disconnect();
    exitObserver?.disconnect();
    changes?.disconnect();
    tracked.forEach(node => {
      node.removeAttribute('data-reveal');
      node.classList.remove('is-revealed');
      node.style.removeProperty('--reveal-delay');
    });
    tracked.clear();
  }
  function start() {
    stop();
    if (motion.matches) return;
    enterObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('is-revealed');
      });
    }, { threshold: .12 });
    // Reset only after a full exit plus a 160px buffer, avoiding boundary flicker.
    exitObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting && !entry.target.contains(document.activeElement)) {
          entry.target.classList.remove('is-revealed');
        }
      });
    }, { rootMargin: '160px 0px', threshold: 0 });
    function register() {
      // Pagination replaces cards: release detached nodes instead of retaining them.
      tracked.forEach(node => {
        if (!node.isConnected) {
          enterObserver.unobserve(node);
          exitObserver.unobserve(node);
          tracked.delete(node);
        }
      });
      document.querySelectorAll(selector).forEach((node, index) => {
        if (tracked.has(node) || node.closest('dialog')) return;
        tracked.add(node);
        node.setAttribute('data-reveal', '');
        const stagger = node.matches('.character-poster, .category-poster, .work-card')
          ? Math.min([...node.parentElement.children].indexOf(node), 3) : index % 3;
        node.style.setProperty('--reveal-delay', `${stagger * 60}ms`);
        const rect = node.getBoundingClientRect();
        // Never hide content already in view during initial load or filtering.
        if (rect.bottom > 0 && rect.top < innerHeight) node.classList.add('is-revealed');
        enterObserver.observe(node);
        exitObserver.observe(node);
      });
    }
    register();
    const gallery = document.querySelector('#works-grid');
    if (gallery) {
      changes = new MutationObserver(() => { try { register(); } catch { stop(); } });
      changes.observe(gallery, { childList: true });
    }
  }
  document.addEventListener('focusin', event => {
    event.target.closest('[data-reveal]')?.classList.add('is-revealed');
  });
  function startSafely() {
    try { start(); } catch { stop(); }
  }
  motion.addEventListener('change', startSafely);
  startSafely();
})();
