/* Public static files only. HTML and model data prefer the current published version. */
const CACHE_PREFIX = 'zanistarast-ai-native-model-';
const CACHE_NAME = CACHE_PREFIX + 'v04-20261122';
const CORE_ASSETS = [
  './', './index.html', './paper.html', './graph.html', './speech.html',
  './repositories.html', './announcements.html', './css/style.css',
  './components/navbar.html', './js/translations.js', './js/tags.js',
  './js/zanistarast-formal-client.js', './css/evrenin-sistemi.css',
  './js/evrenin-sistemi.js', './graph/evrenin-sistemi.json',
  './graph/evrenin-sistemi.svg', './docs/evrenin-sistemi.md',
  './docs/evrenin-sistemi-v04.pdf', './ai-discovery.json'
];
const staticPaths = new Set(CORE_ASSETS.map(path => new URL(path, self.location).pathname));
const scopePath = new URL('./', self.location).pathname;

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(CORE_ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key =>
    key === 'zanistarast-core-v1' || (key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME)
  ).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin || !url.pathname.startsWith(scopePath) || url.search) return;
  const publicNavigation = request.mode === 'navigate' && (url.pathname.endsWith('.html') || url.pathname === scopePath);
  if (!staticPaths.has(url.pathname) && !publicNavigation) return;
  const fresh = publicNavigation || url.pathname.endsWith('.json') || url.pathname.endsWith('/navbar.html');
  event.respondWith(caches.open(CACHE_NAME).then(async cache => {
    const network = async () => {
      const response = await fetch(request);
      if (!response.ok) throw new Error('Static file unavailable');
      await cache.put(request, response.clone());
      return response;
    };
    if (fresh) {
      try { return await network(); }
      catch { return await cache.match(request) || new Response('Çevrimdışı kopya bulunamadı.', {status:503, headers:{'Content-Type':'text/plain; charset=utf-8'}}); }
    }
    return await cache.match(request) || network();
  }));
});


