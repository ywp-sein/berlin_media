const bezirke = window.BERLIN_BEZIRKE || [];
const initialStories = window.BERLIN_STORIES || [];
const translations = {
  de: {
    'nav.map': 'Karte erkunden',
    'nav.stories': 'Geschichten',
    'nav.about': 'Unser Ziel',
    'header.cta': 'Erzähl uns deine Geschichte',
    'hero.eyebrow': 'GESCHICHTEN DER HOFFNUNG, VERWURZELT IN BERLIN',
    'hero.title': 'Gute Nachrichten<br />passieren <em>hier.</em>',
    'hero.intro': 'Jede Nachbarschaft trägt eine Geschichte der Hoffnung in sich. Entdecke die kleinen Zeichen, die uns daran erinnern, dass Gutes auch in unserer Stadt entsteht.',
    'hero.ctaPrimary': 'Karte erkunden',
    'hero.ctaSecondary': 'Warum Stepping Stones?',
    'hero.note': 'Geschichten, die Raum für Hoffnung schaffen,<br />Nachbarschaft für Nachbarschaft.',
    'map.eyebrow': 'FINDE EINE GESCHICHTE IN DEINER NÄHE',
    'map.heading': 'Hoffnung hat eine Adresse.',
    'map.text': 'Jeder Pin ist ein Stepping Stone – ein Moment in einer größeren Geschichte der Hoffnung. Folge der Spur von Nachbarschaft zu Nachbarschaft und entdecke, was hier geschieht.',
    'map.label': 'BERLINER GESCHICHTENKARTE',
    'map.resetLabel': 'Ganz Berlin',
    'map.footerLeft': 'Illustrierte Nachbarschaftskarte · nicht maßstabsgerecht',
    'map.footerRight': 'Wähle einen Bereich',
    'stories.eyebrow': 'DIE GESCHICHTEN, DIE WIR TRAGEN',
    'stories.heading': 'Kleine Momente.<br /><em>Lange Wege.</em>',
    'stories.filterAll': 'Alle Nachbarschaften',
    'stories.sampleNote': 'Beispielgeschichten nur zur Anzeige und zum Testen. Ersetze sie vor der Veröffentlichung durch freigegebene Inhalte.',
    'stories.summaryNone': 'Keine Geschichten zum Anzeigen',
    'stories.summarySingle': '{count} Geschichte wird angezeigt',
    'stories.summaryMany': '{count} Geschichten werden angezeigt',
    'stories.showMoreShow': 'Alle Geschichten ansehen',
    'stories.showMoreHide': 'Weniger Geschichten anzeigen',
    'stories.emptyState': 'Noch keine Geschichten in dieser Nachbarschaft. Probiere einen anderen Bereich oder eine andere Suche.',
    'story.card.aria': 'Geschichte {title} von {author} in {ortsteil}, {bezirk} lesen',
    'story.dialog.meta': 'Geschichte geteilt von {author} · {readTime}',
    'story.dialog.footer': 'Gott ist auch hier noch am Werk. ✳',
    'story.emptyTitle': 'Setze den ersten Stepping Stone',
    'story.emptyText': 'Aus {bezirkName} gibt es noch keine Geschichten. Hier kann die erste Geschichte deiner Nachbarschaft beginnen.',
    'story.emptyAuthor': 'Eure Nachbarn',
    'story.emptyLocation': 'Seid die ersten',
    'form.status.added': 'Dein Stepping Stone wurde hinzugefügt. Vielen Dank, dass du Hoffnung teilst.',
    'about.note': 'ein Schritt<br />nach dem anderen',
    'about.eyebrow': 'WARUM STEPPING STONES?',
    'about.heading': 'Eine Geschichte ist nie<br />nur ein <em>einzelner Moment.</em>',
    'about.p1': 'Vor Jahrzehnten wurden in Deutschland Stolpersteine verlegt, um uns zu erinnern – damit Geschichten aus der Vergangenheit auch in der Gegenwart weiterleben.',
    'about.p2': 'Heute wollen wir in unserer Stadt Stepping Stones der Hoffnung setzen. Jeder einzelne zeigt den Weg einer größeren Geschichte: eine Spur aus Begegnungen, Orten, Menschen und Generationen.',
    'about.p3': 'Zusammengenommen erinnern diese Geschichten daran: Gott spricht noch. Gott ist noch am Werk. Gott ist noch hier. Sie helfen uns, seine Gegenwart zu erkennen, Hoffnung für heute zu finden und den nächsten Schritt zu gehen.',
    'about.cta': 'Durch die Geschichten gehen',
    'invite.eyebrow': 'DEINE GESCHICHTE GEHÖRT HIER HER',
    'invite.heading': 'Wie hat Hoffnung<br />auf deiner Straße ausgesehen?',
    'invite.cta': 'Stepping Stone setzen',
    'footer.tagline': 'Teile die guten Nachrichten. Erzähle eine bessere Geschichte.',
    'footer.credit': 'ERSTELLT MIT HOFFNUNG IN BERLIN <b>✳</b> © 2026'
  },
  en: {
    'nav.map': 'Explore the map',
    'nav.stories': 'Stories',
    'nav.about': 'Our heart',
    'header.cta': 'Share your story',
    'hero.eyebrow': 'STORIES OF HOPE, ROOTED IN BERLIN',
    'hero.title': 'Good news is<br />happening <em>here.</em>',
    'hero.intro': 'Every neighborhood holds a story of grace. Find the small signs of hope that remind us God is still at work in our city.',
    'hero.ctaPrimary': 'Explore the map',
    'hero.ctaSecondary': 'Why stepping stones?',
    'hero.note': 'Stories that make room for hope,<br />one neighborhood at a time.',
    'map.eyebrow': 'FIND A STORY NEAR YOU',
    'map.heading': 'Hope has an address.',
    'map.text': 'Every pin is a stepping stone—a moment in a bigger story of grace. Follow the trail from neighborhood to neighborhood and discover what God is doing here.',
    'map.label': 'BERLIN STORY MAP',
    'map.resetLabel': 'All Berlin',
    'map.footerLeft': 'Illustrated neighborhood map · not to scale',
    'map.footerRight': 'Choose an area',
    'stories.eyebrow': 'THE STORIES WE CARRY',
    'stories.heading': 'Small moments.<br /><em>Long journeys.</em>',
    'stories.filterAll': 'All neighborhoods',
    'stories.sampleNote': 'The stories shown are illustrative starter examples. Replace them with community-submitted testimonies before publishing.',
    'stories.summaryNone': 'No stories to display',
    'stories.summarySingle': 'of {count} story is shown',
    'stories.summaryMany': 'of {count} stories are shown',
    'stories.showMoreShow': 'See all stories',
    'stories.showMoreHide': 'Show fewer stories',
    'stories.emptyState': 'No stories found in this neighborhood yet. Try another area or search.',
    'story.card.aria': 'Story {title} by {author} in {ortsteil}, {bezirk}',
    'story.dialog.meta': 'Shared by {author} · {readTime}',
    'story.dialog.footer': 'God is still at work here too. ✳',
    'story.emptyTitle': 'Be the first to add a stepping stone',
    'story.emptyText': 'There are no stories from {bezirkName} yet. This is where your neighborhood’s first story could begin.',
    'story.emptyAuthor': 'Your neighbors',
    'story.emptyLocation': 'Be the first',
    'form.status.added': 'Your stepping stone was added. Thank you for sharing hope.',
    'about.note': 'one step<br />at a time',
    'about.eyebrow': 'WHY STEPPING STONES?',
    'about.heading': 'A story is never<br />just a <em>single moment.</em>',
    'about.p1': 'Decades ago, stumbling stones were placed throughout Germany to help us remember—to keep the stories of the past present as we move forward.',
    'about.p2': 'Today, we want to place stepping stones of hope throughout our city. Each one points to a journey: a trajectory of grace unfolding through people, places, encounters, and generations.',
    'about.p3': 'Together, these testimonies remind us: God is still speaking. God is still at work. God is still here. They help us recognize God\'s presence, find hope for today, and take the next step forward.',
    'about.cta': 'Walk the stories',
    'invite.eyebrow': 'YOUR STORY BELONGS HERE',
    'invite.heading': 'What has hope looked like<br />on your street?',
    'invite.cta': 'Place a stepping stone',
    'footer.tagline': 'Share the good news. Tell a better story.',
    'footer.credit': 'MADE WITH HOPE IN BERLIN <b>✳</b> © 2026'
  }
};
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
const languageButtons = document.querySelectorAll('.lang-btn');
let activeLanguage = 'de';
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

function t(key, replacements = {}) {
  const values = translations[activeLanguage] || translations.de;
  let text = values[key] || translations.de[key] || key;
  Object.entries(replacements).forEach(([name, value]) => {
    text = text.replace(new RegExp(`\\{${name}\\}`, 'g'), value);
  });
  return text;
}

function applyLanguage(lang) {
  activeLanguage = lang;
  document.documentElement.lang = lang;
  const values = translations[lang] || translations.de;

  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const key = element.dataset.i18n;
    const text = values[key];
    if (!text) return;
    element.innerHTML = text;
  });

  const searchPlaceholder = lang === 'de' ? 'Geschichte suchen...' : 'Search for a story...';
  searchInput.placeholder = searchPlaceholder;
  searchInput.setAttribute('aria-label', lang === 'de' ? 'Geschichte suchen' : 'Search for a story');
  filter.setAttribute('aria-label', lang === 'de' ? 'Geschichten nach Nachbarschaft filtern' : 'Filter stories by neighborhood');

  languageButtons.forEach((button) => {
    const isActive = button.dataset.lang === lang;
    button.classList.toggle('is-active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  });

  const showMoreText = showAllStories ? t('stories.showMoreHide') : t('stories.showMoreShow');
  document.querySelector('#show-more').innerHTML = `${showMoreText} <span aria-hidden="true">${showAllStories ? '↑' : '→'}</span>`;
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
    <article class="story-card" data-story-id="${escapeHtml(story.id)}" tabindex="0" role="button" aria-label="${escapeHtml(t('story.card.aria', { title: story.title, author: story.author, ortsteil: story.ortsteil, bezirk: story.bezirk }))}">
      <div class="story-card-top"><span title="${escapeHtml(story.ortsteil)}">${escapeHtml(story.ortsteil.toUpperCase())}</span><span title="${escapeHtml(story.bezirk)}">${escapeHtml(story.bezirk.toUpperCase())}</span></div>
      <h3>${escapeHtml(story.title)}</h3>
      <p>${escapeHtml(story.excerpt)}</p>
      <div class="story-card-bottom"><span class="mini-avatar">${getInitial(story.author)}</span><span>${escapeHtml(story.author)}</span><span class="card-open" aria-hidden="true">↗</span></div>
    </article>`).join('') : `<div class="empty-state">${t('stories.emptyState')}</div>`;

  document.querySelector('#stories-summary').textContent = filtered.length
    ? t(filtered.length === 1 ? 'stories.summarySingle' : 'stories.summaryMany', { count: filtered.length })
    : t('stories.summaryNone');
  const moreButton = document.querySelector('#show-more');
  moreButton.hidden = filtered.length <= 6;
  moreButton.innerHTML = `${showAllStories ? t('stories.showMoreHide') : t('stories.showMoreShow')} <span aria-hidden="true">${showAllStories ? '↑' : '→'}</span>`;
  if (!visible.length) {
    storyGrid.innerHTML = `<div class="empty-state">${t('stories.emptyState')}</div>`;
  }
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
  document.querySelector('#map-count').textContent = `${stories.length} ${stories.length === 1 ? 'GESCHICHTE' : 'GESCHICHTEN'}`;
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
  document.querySelector('#feature-ortsteil').textContent = 'NEUE GESCHICHTE';
  document.querySelector('#feature-bezirk').textContent = bezirkName.toUpperCase();
  document.querySelector('#feature-index').textContent = '—';
  document.querySelector('#feature-title').textContent = t('story.emptyTitle');
  document.querySelector('#feature-excerpt').textContent = t('story.emptyText', { bezirkName });
  document.querySelector('#feature-avatar').textContent = '✳';
  document.querySelector('#feature-author').textContent = t('story.emptyAuthor');
  document.querySelector('#feature-location').textContent = t('story.emptyLocation');
  document.querySelector('#feature-number').textContent = '—';
  document.querySelector('#read-feature').disabled = true;
}

function openStory(id) {
  const story = stories.find((item) => item.id === id);
  if (!story) return;
  const paragraphs = story.body.split(/\n\n+/).map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('');
  document.querySelector('#dialog-content').innerHTML = `
    <div class="eyebrow"><span class="eyebrow-dot"></span> ${activeLanguage === 'de' ? 'EIN STEPPING STONE AUS' : 'A STEPPING STONE FROM'} ${escapeHtml(story.ortsteil.toUpperCase())} · ${escapeHtml(story.bezirk.toUpperCase())}</div>
    <h2 id="dialog-title">${escapeHtml(story.title)}</h2>
    <div class="dialog-meta">${t('story.dialog.meta', { author: story.author, readTime: story.readTime })}</div>
    ${paragraphs}<div class="dialog-end">${t('story.dialog.footer')}</div>`;
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
  document.querySelector('#form-status').textContent = t('form.status.added');
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
applyLanguage(activeLanguage);
renderStories();
selectStory(activeStoryId);

languageButtons.forEach((button) => {
  button.addEventListener('click', () => applyLanguage(button.dataset.lang));
});

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