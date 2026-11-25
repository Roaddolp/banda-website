// Enhance existing profiles; keep native details if JS/dialog is unavailable.
(() => {
  const lineup = document.querySelector('.character-posters');
  const dialog = document.querySelector('#character-spotlight');
  if (!lineup || !dialog || typeof dialog.showModal !== 'function') return;
  const spotlight = window.createBandaSpotlight?.(dialog);
  if (!spotlight) return;

  function openSpotlight(card, button) {
    if (dialog.open) return;
    const portrait = card.querySelector(':scope > img').cloneNode();
    portrait.loading = 'eager';
    dialog.querySelector('.spotlight-art').replaceChildren(portrait);
    dialog.querySelector('#spotlight-name').textContent = card.querySelector('h3').textContent;
    dialog.querySelector('#spotlight-role').textContent = card.querySelector('.character-role').textContent;
    dialog.querySelector('#spotlight-tagline').textContent = card.querySelector('.character-tagline').textContent;
    dialog.querySelector('.spotlight-biography').replaceChildren(card.querySelector('.profile-copy').cloneNode(true));
    spotlight.open(button);
  }

  lineup.querySelectorAll('.character-poster').forEach((card) => {
    const name = card.querySelector('h3').textContent;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'character-trigger';
    button.setAttribute('aria-label', `Explore ${name}'s character spotlight`);
    button.setAttribute('aria-haspopup', 'dialog');
    button.setAttribute('aria-controls', dialog.id);
    const label = document.createElement('span');
    label.className = 'trigger-caption';
    label.textContent = `Explore ${name}`;
    const arrow = document.createElement('span');
    arrow.textContent = '↗';
    arrow.setAttribute('aria-hidden', 'true');
    label.append(arrow);
    button.append(label);
    card.append(button);
    button.addEventListener('click', () => openSpotlight(card, button));
  });
  lineup.classList.add('is-interactive');

})();
