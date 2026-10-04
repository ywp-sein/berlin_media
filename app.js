const bezirke = window.BERLIN_BEZIRKE || [];
const initialStories = window.BERLIN_STORIES || [];
const bezirkPositions = {
  Mitte: [320, 222],
  'Friedrichshain-Kreuzberg': [405, 310],
  Pankow: [400, 125],
  'Charlottenburg-Wilmersdorf': [215, 214],
  Spandau: [108, 213],
  'Steglitz-Zehlendorf': [165, 327],
  'Tempelhof-Schöneberg': [284, 344],
  Neukölln: [357, 417],
  'Treptow-Köpenick': [505, 389],
  'Marzahn-Hellersdorf': [586, 244],
  Lichtenberg: [472, 238],
  Reinickendorf: [280, 108]
};
const legacyLocations = {
  Charlottenburg: { bezirk: 'Charlottenburg-Wilmersdorf', ortsteil: 'Charlottenburg' },
  Moabit: { bezirk: 'Mitte', ortsteil: 'Moabit' },
  Wedding: { bezirk: 'Mitte', ortsteil: 'Wedding' },
  Mitte: { bezirk: 'Mitte', ortsteil: 'Mitte' },
  Pankow: { bezirk: 'Pankow', ortsteil: 'Pankow' },
  Friedrichshain: { bezirk: 'Friedrichshain-Kreuzberg', ortsteil: 'Friedrichshain' },
  Tiergarten: { bezirk: 'Mitte', ortsteil: 'Tiergarten' },
  Kreuzberg: { bezirk: 'Friedrichshain-Kreuzberg', ortsteil: 'Kreuzberg' },
  Schöneberg: { bezirk: 'Tempelhof-Schöneberg', ortsteil: 'Schöneberg' },
  Neukölln: { bezirk: 'Neukölln', ortsteil: 'Neukölln' }
};

const storyGrid = document.querySelector('#story-grid');
const filter = document.querySelector('#ortsteil-filter');
const form = document.querySelector('#story-form');
const formOrtsteil = form.elements.ortsteil;
const searchInput = document.querySelector('#story-search');
const mapPins = document.querySelector('#map-pins');
let stories = loadStories();
let activeStoryId = stories[0]?.id;
let showAllStories = false;
let activeBezirkFilter = 'all';

function normalizeStory(story) {
  if (story.bezirk && story.ortsteil) return story;
  const location = legacyLocations[story.district];
  return location ? { ...story, ...location, isLocal: true } : null;
}

function loadStories() {
  try {
    const saved = JSON.parse(localStorage.getItem('berlin-media-stories') || '[]');
    if (Array.isArray(saved)) {
      return [...saved.map(normalizeStory).filter(Boolean), ...initialStories];
    }
  } catch (error) {
    console.warn('Saved stories could not be loaded.', error);
  }
  return [...initialStories];
}

function saveStories() {
  const addedStories = stories.filter((story) => story.isLocal);
  try {
    localStorage.setItem('berlin-media-stories', JSON.stringify(addedStories));
  } catch (error) {
    console.warn('Stories could not be saved in this browser.', error);
  }
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[character]);
}

function initializeLocations() {
  bezirke.forEach((bezirk) => {
    bezirk.ortsteile.forEach((ortsteil) => {
      const option = document.createElement('option');
      option.value = ortsteil;
      option.textContent = ortsteil;
      filter.append(option);

      const formOption = option.cloneNode(true);
      formOption.dataset.bezirk = bezirk.name;
      formOrtsteil.append(formOption);
    });
  });
}

function getInitial(name) {
  return escapeHtml(name.trim().charAt(0).toUpperCase() || '?');
}

function renderStories() {
  const query = searchInput.value.trim().toLocaleLowerCase();
  const selectedOrtsteil = filter.value;
  const filtered = stories.filter((story) => {
    const ortsteilMatches = selectedOrtsteil === 'all' || story.ortsteil === selectedOrtsteil;
    const bezirkMatches = activeBezirkFilter === 'all' || story.bezirk === activeBezirkFilter;
    const queryMatches = !query || `${story.title} ${story.author} ${story.bezirk} ${story.ortsteil} ${story.excerpt}`.toLocaleLowerCase().includes(query);
    return ortsteilMatches && bezirkMatches && queryMatches;
  });
  const visible = showAllStories ? filtered : filtered.slice(0, 6);

  storyGrid.innerHTML = visible.length ? visible.map((story) => `
    <article class="story-card" data-story-id="${escapeHtml(story.id)}" tabindex="0" role="button" aria-label="Read ${escapeHtml(story.title)} by ${escapeHtml(story.author)} in ${escapeHtml(story.ortsteil)}, ${escapeHtml(story.bezirk)}">
      <div class="story-card-top"><span title="${escapeHtml(story.ortsteil)}">${escapeHtml(story.ortsteil.toUpperCase())}</span><span title="${escapeHtml(story.bezirk)}">${escapeHtml(story.bezirk.toUpperCase())}</span></div>
      <h3>${escapeHtml(story.title)}</h3>
      <p>${escapeHtml(story.excerpt)}</p>
      <div class="story-card-bottom"><span class="mini-avatar">${getInitial(story.author)}</span><span>${escapeHtml(story.author)}</span><span class="card-open" aria-hidden="true">↗</span></div>
    </article>`).join('') : '<div class="empty-state">No stories found in this neighborhood yet. Try another area or search.</div>';

  document.querySelector('#stories-summary').textContent = filtered.length
    ? `Showing ${Math.min(visible.length, filtered.length)} of ${filtered.length} stor${filtered.length === 1 ? 'y' : 'ies'}`
    : 'No stories to show';
  const moreButton = document.querySelector('#show-more');
  moreButton.hidden = filtered.length <= 6;
  moreButton.innerHTML = showAllStories ? 'Show fewer stories <span aria-hidden="true">↑</span>' : 'See all stories <span aria-hidden="true">→</span>';
}

function renderMapPins() {
  const totals = Object.fromEntries(bezirke.map((bezirk) => [bezirk.name, 0]));
  mapPins.innerHTML = stories.map((story) => {
    const [baseX, baseY] = bezirkPositions[story.bezirk] || bezirkPositions.Mitte;
    const offset = totals[story.bezirk]++;
    const angle = offset * 2.4;
    const radius = offset ? 12 + Math.floor(offset / 7) * 5 : 0;
    const x = baseX + Math.cos(angle) * radius;
    const y = baseY + Math.sin(angle) * radius;
    const selected = story.id === activeStoryId;
    return `<g class="map-pin${selected ? ' is-selected' : ''}${story.isLocal ? ' is-new' : ''}" data-story-id="${escapeHtml(story.id)}" role="button" tabindex="0" aria-label="${escapeHtml(story.title)} in ${escapeHtml(story.ortsteil)}, ${escapeHtml(story.bezirk)}">
      <circle class="pin-shadow" cx="${x}" cy="${y + 2}" r="8" />
      <circle class="pin-ring" cx="${x}" cy="${y}" r="8" />
      <circle class="pin-dot" cx="${x}" cy="${y}" r="6" />
    </g>`;
  }).join('');
  document.querySelector('#map-count').textContent = `${stories.length} ${stories.length === 1 ? 'STORY' : 'STORIES'}`;
  document.querySelector('#key-count').textContent = stories.length;
}

function selectStory(id) {
  const story = stories.find((item) => item.id === id);
  if (!story) return;
  if (activeBezirkFilter !== 'all' && activeBezirkFilter !== story.bezirk) {
    activeBezirkFilter = 'all';
    filter.value = 'all';
    renderStories();
  }
  activeStoryId = story.id;
  document.querySelector('#feature-ortsteil').textContent = story.ortsteil.toUpperCase();
  document.querySelector('#feature-bezirk').textContent = story.bezirk.toUpperCase();
  document.querySelector('#feature-index').textContent = `${String(stories.indexOf(story) + 1).padStart(2, '0')} / ${String(stories.length).padStart(2, '0')}`;
  document.querySelector('#feature-title').textContent = story.title;
  document.querySelector('#feature-excerpt').textContent = story.excerpt;
  document.querySelector('#feature-avatar').textContent = story.author.trim().charAt(0).toUpperCase() || '?';
  document.querySelector('#feature-author').textContent = story.author;
  document.querySelector('#feature-location').textContent = `${story.ortsteil}, ${story.bezirk} · ${story.readTime}`;
  document.querySelector('#feature-number').textContent = String(stories.indexOf(story) + 1).padStart(2, '0');
  renderMapPins();
  document.querySelectorAll('.district').forEach((shape) => shape.classList.toggle('is-active', shape.dataset.bezirk === story.bezirk));
  const readButton = document.querySelector('#read-feature');
  readButton.dataset.storyId = story.id;
  readButton.disabled = false;
}

function showEmptyBezirk(bezirkName) {
  document.querySelector('#feature-ortsteil').textContent = 'NEW STORY';
  document.querySelector('#feature-bezirk').textContent = bezirkName.toUpperCase();
  document.querySelector('#feature-index').textContent = '—';
  document.querySelector('#feature-title').textContent = 'Place the first stepping stone';
  document.querySelector('#feature-excerpt').textContent = `There are no stories from ${bezirkName} yet. Your neighborhood's story can begin here.`;
  document.querySelector('#feature-avatar').textContent = '✳';
  document.querySelector('#feature-author').textContent = 'Your neighbors';
  document.querySelector('#feature-location').textContent = 'Be the first to share';
  document.querySelector('#feature-number').textContent = '—';
  document.querySelector('#read-feature').disabled = true;
}

function openStory(id) {
  const story = stories.find((item) => item.id === id);
  if (!story) return;
  const paragraphs = story.body.split(/\n\n+/).map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('');
  document.querySelector('#dialog-content').innerHTML = `
    <div class="eyebrow"><span class="eyebrow-dot"></span> A STEPPING STONE FROM ${escapeHtml(story.ortsteil.toUpperCase())} · ${escapeHtml(story.bezirk.toUpperCase())}</div>
    <h2 id="dialog-title">${escapeHtml(story.title)}</h2>
    <div class="dialog-meta">A story shared by ${escapeHtml(story.author)} · ${escapeHtml(story.readTime)}</div>
    ${paragraphs}<div class="dialog-end">God is still at work here. ✳</div>`;
  document.querySelector('#story-dialog').showModal();
}

function chooseBezirk(bezirkName) {
  activeBezirkFilter = bezirkName;
  filter.value = 'all';
  showAllStories = false;
  renderStories();
  document.querySelectorAll('.district').forEach((shape) => shape.classList.toggle('is-active', shape.dataset.bezirk === bezirkName));
  const firstStory = stories.find((story) => story.bezirk === bezirkName);
  if (firstStory) selectStory(firstStory.id);
  else showEmptyBezirk(bezirkName);
}

function addStory(event) {
  event.preventDefault();
  const formData = new FormData(form);
  const author = String(formData.get('author')).trim();
  const ortsteil = String(formData.get('ortsteil'));
  const bezirk = formOrtsteil.selectedOptions[0]?.dataset.bezirk;
  const title = String(formData.get('title')).trim();
  const body = String(formData.get('body')).trim();
  const location = bezirke.find((item) => item.name === bezirk);
  if (!location || !location.ortsteile.includes(ortsteil)) return;

  const story = {
    id: `local-${Date.now()}`, author, bezirk, ortsteil, title,
    excerpt: body.length > 145 ? `${body.slice(0, 142).trimEnd()}…` : body,
    body, readTime: `${Math.max(1, Math.ceil(body.split(/\s+/).length / 170))} min read`,
    date: 'Just shared', isLocal: true
  };
  stories.unshift(story);
  saveStories();
  form.reset();
  document.querySelector('#form-status').textContent = 'Your stepping stone has been added. Thank you for sharing hope.';
  showAllStories = true;
  filter.value = 'all';
  activeBezirkFilter = 'all';
  searchInput.value = '';
  selectStory(story.id);
  renderStories();
  window.setTimeout(() => {
    document.querySelector('#form-dialog').close();
    document.querySelector('#form-status').textContent = '';
    document.querySelector('#map').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 950);
}

initializeLocations();
renderStories();
selectStory(activeStoryId);

document.querySelectorAll('[data-open-form]').forEach((button) => button.addEventListener('click', () => document.querySelector('#form-dialog').showModal()));
form.addEventListener('submit', addStory);
document.querySelector('#read-feature').addEventListener('click', (event) => openStory(event.currentTarget.dataset.storyId));
document.querySelector('#show-more').addEventListener('click', () => { showAllStories = !showAllStories; renderStories(); });
searchInput.addEventListener('input', () => { showAllStories = false; renderStories(); });
filter.addEventListener('change', () => {
  activeBezirkFilter = 'all';
  showAllStories = false;
  renderStories();
  document.querySelectorAll('.district').forEach((shape) => shape.classList.remove('is-active'));
});
document.querySelector('#reset-map').addEventListener('click', () => {
  filter.value = 'all';
  activeBezirkFilter = 'all';
  searchInput.value = '';
  showAllStories = false;
  document.querySelectorAll('.district').forEach((shape) => shape.classList.remove('is-active'));
  renderStories();
  selectStory(stories[0]?.id);
});

storyGrid.addEventListener('click', (event) => {
  const card = event.target.closest('[data-story-id]');
  if (card) openStory(card.dataset.storyId);
});
storyGrid.addEventListener('keydown', (event) => {
  if ((event.key === 'Enter' || event.key === ' ') && event.target.matches('[data-story-id]')) {
    event.preventDefault();
    openStory(event.target.dataset.storyId);
  }
});
mapPins.addEventListener('click', (event) => {
  const pin = event.target.closest('[data-story-id]');
  if (pin) selectStory(pin.dataset.storyId);
});
mapPins.addEventListener('keydown', (event) => {
  if ((event.key === 'Enter' || event.key === ' ') && event.target.matches('[data-story-id]')) {
    event.preventDefault();
    selectStory(event.target.dataset.storyId);
  }
});
document.querySelector('.district-shapes').addEventListener('click', (event) => {
  const shape = event.target.closest('[data-bezirk]');
  if (shape) chooseBezirk(shape.dataset.bezirk);
});
document.querySelector('.district-shapes').addEventListener('keydown', (event) => {
  if ((event.key === 'Enter' || event.key === ' ') && event.target.matches('[data-bezirk]')) {
    event.preventDefault();
    chooseBezirk(event.target.dataset.bezirk);
  }
});
document.querySelector('#menu-toggle').addEventListener('click', (event) => {
  const button = event.currentTarget;
  const isOpen = button.getAttribute('aria-expanded') === 'true';
  button.setAttribute('aria-expanded', String(!isOpen));
  document.querySelector('.main-nav').classList.toggle('is-open', !isOpen);
});
document.querySelectorAll('.main-nav a').forEach((link) => link.addEventListener('click', () => {
  document.querySelector('.main-nav').classList.remove('is-open');
  document.querySelector('#menu-toggle').setAttribute('aria-expanded', 'false');
}));