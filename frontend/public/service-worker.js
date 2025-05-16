const CACHE_NAME = 'comradetrends-cache-v1.1.3.8';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/ComradeTrendsLogo192.png',
  '/icons/ComradeTrendsLogo512.png'
];

// Install event - caching assets
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Install');

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Caching app shell');
        return cache.addAll(urlsToCache);
      })
  );

  self.skipWaiting();
});

// Activate event - cleaning old caches
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activate');

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[Service Worker] Removing old cache', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );

  self.clients.claim();
});

// Fetch event - respond from cache first, then network
self.addEventListener('fetch', (event) => {
  console.log('[Service Worker] Fetch', event.request.url);

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
      .catch(() => {
        // You can show a fallback page here if needed
      })
  );
});
