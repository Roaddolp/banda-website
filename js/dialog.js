// Shared modal behavior for character and artwork spotlights. No content lives here.
window.createBandaSpotlight = (dialog) => {
  if (!dialog || typeof dialog.showModal !== 'function') return null;
  const closeButton = dialog.querySelector('.spotlight-close');
  let opener, savedBodyStyle, savedScroll, backdropPress = false;
  closeButton.addEventListener('click', () => dialog.close());
  dialog.addEventListener('keydown', (event) => {
    if (event.key !== 'Tab') return;
    const controls = [...dialog.querySelectorAll('button, a[href], input, select, textarea, [tabindex="0"]')]
      .filter(element => !element.disabled && element.getClientRects().length);
    const first = controls[0], last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });
  // Escape is native. Every closing path restores the page and the exact opener.
  dialog.addEventListener('close', () => {
    document.documentElement.classList.remove('spotlight-open');
    if (savedBodyStyle === null) document.body.removeAttribute('style');
    else document.body.setAttribute('style', savedBodyStyle);
    window.scrollTo({ left: savedScroll.x, top: savedScroll.y, behavior: 'instant' });
    opener?.focus({ preventScroll: true });
    backdropPress = false;
  });
  const outside = event => {
    const rect = dialog.getBoundingClientRect();
    return event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom);
  };
  dialog.addEventListener('pointerdown', event => { backdropPress = outside(event); });
  dialog.addEventListener('click', event => { if (backdropPress && outside(event)) dialog.close(); backdropPress = false; });
  return {
    open(button) {
      if (document.querySelector('dialog[open]')) return;
      opener = button;
      savedScroll = { x: window.scrollX, y: window.scrollY };
      savedBodyStyle = document.body.getAttribute('style');
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      Object.assign(document.body.style, { position: 'fixed', top: `-${savedScroll.y}px`, left: `-${savedScroll.x}px`, width: '100%', paddingRight: `${scrollbarWidth}px` });
      document.documentElement.classList.add('spotlight-open');
      dialog.showModal();
      dialog.scrollTop = 0;
      closeButton.focus({ preventScroll: true });
    }
  };
};
