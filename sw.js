const CACHE_NAME = 'shiga-soccer-v1';
const BASE = '/soccer-Kazuki-Shiga/'; // GitHub Pages用

const ASSETS = [
  BASE,
  BASE + 'index.html',
  BASE + 'css/styles.css',
  BASE + 'js/app.js',
  BASE + 'assets/nagoya.jpg',
  BASE + 'assets/japan.webp'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});
