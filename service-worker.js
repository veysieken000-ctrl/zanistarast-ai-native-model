const CACHE_NAME = "zanistarast-core-v1";

const CORE_ASSETS = [
  "./",
  "./index.html",
  "./paper.html",
  "./graph.html",
  "./speech.html",
  "./repositories.html",
  "./announcements.html",
  "./css/style.css",
  "./components/navbar.html"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(CORE_ASSETS))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request);
    })
  );
});


