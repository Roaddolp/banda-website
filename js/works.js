// Local, source-locked collection data. Only one category and six works render at once.
(() => {
  const data = window.BANDA_WORKS;
  const section = document.querySelector('#creative-works');
  if (!data || !section) return;
  const grid = section.querySelector('#works-grid');
  const filters = section.querySelector('.works-filters');
  const collectionTitle = section.querySelector('#works-collection-title');
  const status = section.querySelector('#works-status');
  const pagination = section.querySelector('.works-pagination');
  const previous = section.querySelector('#works-previous');
  const next = section.querySelector('#works-next');
  const dialog = document.querySelector('#artwork-spotlight');
  const spotlight = window.createBandaSpotlight?.(dialog);
  const pageSize = 6;
  const categoryFromURL = () => {
    const requested = new URLSearchParams(location.search).get('category');
    return data.categories.some(category => category.id === requested) ? requested : 'keychains';
  };
  let activeCategory = categoryFromURL();
  let currentPage = 1;

  const categoryInfo = id => data.categories.find(category => category.id === id);
  const make = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };
  function imageFor(item, view, small = false) {
    const image = document.createElement('img');
    image.src = small ? (view.thumbnail || view.src) : view.src;
    if (small && view.thumbnail) {
      image.srcset = `${view.thumbnail} ${view.thumbnailWidth}w, ${view.src} ${view.width}w`;
      image.sizes = '(max-width: 560px) 85vw, (max-width: 1000px) 43vw, 30vw';
    }
    image.alt = `${item.title} — ${view.label.toLowerCase()} artwork`;
    image.width = view.width;
    image.height = view.height;
    image.loading = small ? 'lazy' : 'eager';
    image.decoding = 'async';
    return image;
  }
  function openArtwork(item, opener) {
    if (!spotlight) return;
    dialog.querySelector('#artwork-title').textContent = item.title;
    dialog.querySelector('#artwork-category').textContent = categoryInfo(item.category).label;
    dialog.querySelector('.artwork-specification').textContent = item.specification;
    dialog.querySelector('.artwork-specification').hidden = !item.specification;
    dialog.querySelector('.artwork-description').textContent = item.description;
    const viewControls = dialog.querySelector('.artwork-views');
    viewControls.replaceChildren();
    function showView(index) {
      dialog.querySelector('.spotlight-art').replaceChildren(imageFor(item, item.views[index]));
      [...viewControls.children].forEach((button, i) => button.setAttribute('aria-pressed', String(index === i)));
    }
    item.views.forEach((view, index) => {
      const button = make('button', '', view.label);
      button.type = 'button';
      button.addEventListener('click', () => showView(index));
      viewControls.append(button);
    });
    viewControls.hidden = item.views.length < 2;
    showView(0);
    spotlight.open(opener);
  }
  function render() {
    const category = categoryInfo(activeCategory);
    const items = data.items.filter(item => item.category === activeCategory);
    const pages = Math.ceil(items.length / pageSize);
    const start = (currentPage - 1) * pageSize;
    collectionTitle.textContent = category.label;
    grid.replaceChildren();
    items.slice(start, start + pageSize).forEach((item, index) => {
      const card = make('article', 'work-card');
      const button = make('button', 'work-open');
      button.dataset.workId = item.id;
      button.type = 'button';
      button.setAttribute('aria-label', `Explore ${item.title}`);
      if (spotlight) button.setAttribute('aria-haspopup', 'dialog');
      const artwork = make('span', 'work-artwork');
      artwork.append(imageFor(item, item.views[0], true));
      const heading = make('span', 'work-label', item.title);
      heading.append(make('span', 'work-arrow', '↗'));
      heading.lastChild.setAttribute('aria-hidden', 'true');
      button.append(artwork, heading);
      button.addEventListener('click', () => openArtwork(item, button));
      card.append(button);
      // Keep original descriptions available without native dialog support.
      if (!spotlight) card.append(make('p', 'work-fallback-description', item.description));
      grid.append(card);
    });
    status.textContent = `${category.label} · ${items.length} designs · Showing ${start + 1}–${Math.min(start + pageSize, items.length)}`;
    section.querySelector('#works-page').textContent = `Page ${currentPage} of ${pages}`;
    pagination.hidden = pages === 1;
    previous.disabled = currentPage === 1;
    next.disabled = currentPage === pages;
    filters.querySelectorAll('button').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.category === activeCategory)));
    document.querySelectorAll('[data-discover]').forEach(link => {
      if (link.dataset.discover === activeCategory) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
  }
  function navigateToCollection(target) {
    target.focus({ preventScroll: true });
    target.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
  }
  data.categories.forEach(category => {
    const button = filters.querySelector(`[data-collection="${category.id}"]`);
    button.disabled = false;
    button.dataset.category = category.id;
    button.setAttribute('aria-controls', 'works-grid');
    button.addEventListener('click', () => {
      if (activeCategory === category.id) return;
      activeCategory = category.id;
      currentPage = 1;
      const url = new URL(location.href);
      url.searchParams.set('category', activeCategory);
      history.pushState(null, '', url);
      render();
    });
  });
  window.addEventListener('popstate', () => {
    activeCategory = categoryFromURL();
    currentPage = 1;
    render();
  });
  previous.addEventListener('click', () => { currentPage--; render(); navigateToCollection(collectionTitle); });
  next.addEventListener('click', () => { currentPage++; render(); navigateToCollection(collectionTitle); });
  render();
})();
