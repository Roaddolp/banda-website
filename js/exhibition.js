// Autoplay, pointer dragging and keyboard browsing share one scroll position.
(() => {
  const gallery = document.querySelector('.exhibition-marquee');
  if (!gallery) return;
  const viewport = gallery.querySelector('.exhibition-marquee-viewport');
  const track = gallery.querySelector('.exhibition-marquee-track');
  const controls = gallery.querySelector('.exhibition-marquee-controls');
  const toggle = gallery.querySelector('#exhibition-toggle');
  const icon = toggle.querySelector('.marquee-toggle-icon');
  const status = gallery.querySelector('#exhibition-announcement');
  const error = gallery.querySelector('.exhibition-error');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const speed = 24;
  let paused = motion.matches, visible = false, started = false, ready = false;
  let group, cycleWidth = 0, frame = 0, lastTime = 0, position = 0;
  let drag = null;
  const wrap = value => ((value % cycleWidth) + cycleWidth) % cycleWidth;
  function showPosition(value) {
    if (!cycleWidth) return;
    position = wrap(value);
    // Keep the real group between identical copies: either boundary can wrap invisibly.
    viewport.scrollLeft = cycleWidth + position;
  }
  function canMove() { return ready && visible && !paused && !motion.matches && !document.hidden && cycleWidth > viewport.clientWidth; }
  function tick(now) {
    frame = 0;
    if (!canMove()) { lastTime = 0; return; }
    const seconds = lastTime ? Math.min((now - lastTime) / 1000, .05) : 0;
    lastTime = now;
    // Equal groups include the last-to-first gap, so modulo replaces identical pixels.
    // Retain fractional progress even on browsers that round scrollLeft to pixels.
    showPosition(position + speed * seconds);
    frame = requestAnimationFrame(tick);
  }
  function sync() {
    cancelAnimationFrame(frame);
    frame = 0;
    lastTime = 0;
    gallery.classList.toggle('is-reduced', motion.matches);
    toggle.disabled = motion.matches;
    icon.textContent = paused || motion.matches ? '▶' : '⏸';
    toggle.setAttribute('aria-label', motion.matches ? 'Photo movement paused for reduced motion' : paused ? 'Play photo movement' : 'Pause photo movement');
    if (canMove()) frame = requestAnimationFrame(tick);
  }
  function setPaused(value, announce = false) {
    const changed = paused !== value;
    paused = value;
    sync();
    if (announce && changed) status.textContent = paused ? 'Photo movement paused.' : 'Photo movement playing.';
  }
  function measure() {
    if (!group) return;
    const width = group.getBoundingClientRect().width;
    if (width > 0 && width !== cycleWidth) {
      const phase = cycleWidth ? position / cycleWidth : 0;
      cycleWidth = width;
      showPosition(phase * cycleWidth);
    }
    sync();
  }
  toggle.addEventListener('click', () => setPaused(!paused, true));
  viewport.addEventListener('dragstart', event => event.preventDefault());
  viewport.addEventListener('pointerdown', event => {
    if (!ready || !event.isPrimary || event.button !== 0) return;
    setPaused(true, true);
    drag = { id: event.pointerId, x: event.clientX, y: event.clientY, lastX: event.clientX, locked: false };
  });
  viewport.addEventListener('pointermove', event => {
    if (!drag || event.pointerId !== drag.id) return;
    if (!drag.locked) {
      const dx = event.clientX - drag.x, dy = event.clientY - drag.y;
      if (Math.abs(dx) < 6 || Math.abs(dx) <= Math.abs(dy)) return;
      drag.locked = true;
      viewport.setPointerCapture(event.pointerId);
      gallery.classList.add('is-dragging');
    }
    event.preventDefault();
    showPosition(position - (event.clientX - drag.lastX));
    drag.lastX = event.clientX;
  });
  function endDrag(event) {
    if (!drag || (event.pointerId !== undefined && event.pointerId !== drag.id)) return;
    if (viewport.hasPointerCapture(drag.id)) viewport.releasePointerCapture(drag.id);
    drag = null;
    gallery.classList.remove('is-dragging');
  }
  window.addEventListener('pointerup', endDrag);
  window.addEventListener('pointercancel', endDrag);
  // Touch transfers implicit capture from the image to the viewport. Ignore that child's event.
  viewport.addEventListener('lostpointercapture', event => { if (event.target === viewport) endDrag(event); });
  window.addEventListener('blur', endDrag);
  // Horizontal wheel/trackpad input also pauses and rebases into the middle copy.
  viewport.addEventListener('scroll', () => {
    if (ready && paused && !drag) showPosition(viewport.scrollLeft - cycleWidth);
  }, { passive: true });
  viewport.addEventListener('focusin', () => setPaused(true));
  viewport.addEventListener('wheel', event => { if (event.deltaX || event.shiftKey) setPaused(true); }, { passive: true });
  viewport.addEventListener('keydown', event => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    setPaused(true);
    if (event.key === 'Home') showPosition(0);
    else if (event.key === 'End') showPosition(Math.max(0, cycleWidth - viewport.clientWidth));
    else showPosition(position + (event.key === 'ArrowRight' ? 1 : -1) * Math.max(100, viewport.clientWidth * .4));
  });
  document.addEventListener('visibilitychange', sync);
  motion.addEventListener('change', () => { if (motion.matches) paused = true; sync(); measure(); });
  async function initialize() {
    if (started) return;
    started = true;
    try {
      const response = await fetch(gallery.dataset.manifest);
      if (!response.ok) throw new Error('Manifest unavailable');
      const data = await response.json();
      const photos = [...data.images].sort((a, b) => a.sequence - b.sequence);
      if (!photos.length || photos.some(photo => !photo.src || !photo.alt || !photo.width || !photo.height)) throw new Error('Invalid photos');
      group = document.createElement('div');
      group.className = 'exhibition-marquee-group';
      group.setAttribute('role', 'list');
      const images = photos.map((photo, index) => {
        // Prepared mobile copies cover the row's maximum 320px photo height.
        const source = photo.mobile || photo;
        const item = document.createElement('figure');
        item.className = 'exhibition-marquee-photo';
        item.dataset.photoSequence = String(photo.sequence);
        item.setAttribute('role', 'listitem');
        const image = new Image(source.width, source.height);
        image.alt = photo.alt;
        image.loading = 'eager';
        image.fetchPriority = index < 4 ? 'high' : 'low';
        image.decoding = 'async';
        image.draggable = false;
        image.src = source.src;
        item.append(image);
        group.append(item);
        return image;
      });
      await Promise.all(images.map(image => image.decode()));
      const clone = group.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      clone.inert = true;
      clone.querySelectorAll('img').forEach(image => { image.alt = ''; image.setAttribute('aria-hidden', 'true'); });
      track.replaceChildren(clone.cloneNode(true), group, clone);
      gallery.classList.add('is-enhanced');
      ready = true;
      controls.hidden = false;
      measure();
      if ('ResizeObserver' in window) {
        const resize = new ResizeObserver(measure);
        resize.observe(group);
        resize.observe(viewport);
      } else window.addEventListener('resize', measure);
    } catch {
      error.textContent = 'Automatic movement is unavailable. You can still scroll through the photographs.';
      error.hidden = false;
    }
  }
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => { visible = entries.some(entry => entry.isIntersecting); if (visible) initialize(); sync(); }, { rootMargin: '300px 0px' }).observe(viewport);
  } else { visible = true; initialize(); }
})();
