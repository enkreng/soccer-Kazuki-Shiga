const CACHE_NAME = 'shiga-soccer-v2';
const BASE = '/soccer-Kazuki-Shiga/'; // リポジトリ名に合わせる

const ASSETS = [
  BASE,
  BASE + 'index.html',
  BASE + 'style.css',
  BASE + 'sw.js',
  BASE + 'script.js',
  BASE + 'manifest.json',
  BASE + 'assets/nagoya.jpg',
  BASE + 'assets/japan.webp',
  BASE + 'assets/icon.png'
];

// インストール時にキャッシュ
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

// アクティベート時に古いキャッシュ削除
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// フェッチ時にキャッシュ優先
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request)
        .then(response => {
          return caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, response.clone());
            return response;
          });
        })
        .catch(() => {
          // オフライン時の fallback
          if(event.request.destination === 'document') {
            return caches.match(BASE + 'index.html');
          }
        });
    })
  );
});
