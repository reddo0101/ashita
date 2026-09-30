// My PACE の埋め込みページ用の service worker。
// Chrome が「アプリとしてインストール」できるようにするための最小限の部品。
// 中身はいつも通信で取りに行く（古い中身を出さない）。つながらない時だけ、短いお知らせを出す。
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', (e) => {
  if (e.request.mode !== 'navigate') return; // ページを開く時だけ受け持つ（アイコンなどはそのまま）
  e.respondWith(fetch(e.request).catch(() => new Response(
    '<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">' +
    '<body style="margin:0;background:#08080a;color:#f4f4f5;font:18px/1.6 sans-serif;padding:24px">' +
    '<p>通信がつながっていません。つながったら開き直してください。</p></body>',
    { headers: { 'Content-Type': 'text/html; charset=utf-8' } })));
});
